/* eslint-disable no-use-before-define */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import CandidateDetail from './candidateDetail';

import {
  updateCandidatesSummary,
  updateEmpStateInCandidateDetail,
} from './candidates.helper';
import {
  EMPTY_ARRAY,
  DEFAULT_SELECTED_PAGE,
  DEFAULT_COUNT,
  EMPTY_OBJECT,
} from '../../constants';
import SummaryDetail from '../../components/summaryDetail';
import CandidateSummary from './candidateSummary';
import { getCandidateDetail } from './candidates.service';
import ACTIONS from '../../constants/summaryDetail.actionTypes';
import PAGE_TYPE from '../../constants/pageType';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import LoginDialog from '../loginDialog';
import CANDIDATE_TYPE from '../../constants/candidateType';
import { getRequest } from '../../services';
import UnlockCandidateDialog from './UnlockCandidateDialog';
import { getPreUnlockCheck } from '../../constants/apiUrls';
import STATUS_CODE from '../../constants/statusCode';
import UI from '../../constants/ui';
import BuyCreditPointsDialog from '../payment/buyPoints';
import RemarkDialog from './RemarkDialog';
import CANDIDATES_ACTION_TYPES from './candidates.actionType';
import { getCandidateTypeAction } from '../../formatter/candidateBootstrap';

/**
 * Cases for Unlock candidate-
 * Unlock confirmation
 * Buy points
 * Remark submit
 *
 * Unlock candidate -> If not logged in -> Open Logged in dialog
 *                  -> Open Unlock confirmation dialog
 * Unlock confirmation -> If don't have enough points -> Open buy points dialog
 *                     -> Open remark dialog
 * Remark dialog -> Submit the Remark with action
 * @param {*} props
 * @returns
 */
function Candidates(props) {
  const {
    selectedPage,
    paginationRequestToServer,
    sortByRequestToServer,
    candidatesSummary,
    updateSearchResponseCards,
    count,
    pageType,
    isSummarySkeletonShow,
    isModalShow,
    setLoggedInUserRole,
  } = props;
  const [candidateDetail, setCandidateDetail] = useState();

  const [opensnackbar, setSnackbarOpen] = useState();

  const [isDetailSkeletonShow, setIsDetailSkeletonShow] = useState();
  // TODO: remove
  const [isLoginDialogVisible, setIsLoginDialogVisible] = useState(false);
  const [isUnlockDialogVisible, setIsUnlockDialogVisible] = useState(false);
  const [isBuyPointsDialogOpen, setIsBuyPointsDialogOpen] = useState(false);
  const [isRemarkDialogOpen, setIsRemarkDialogOpen] = useState(false);
  const [selectedIdAction, setSelectedIdAction] = useState();
  const [selectedActionDetail, setSelectedActionDetail] = useState();
  const [remark, setRemark] = useState();

  const [preUnlockCheckResponse, setPreUnlockCheckResponse] =
    useState(EMPTY_OBJECT);

  const candidateStatusName = useMemo(
    () => getCandidateTypeAction(selectedActionDetail?.id),
    [selectedActionDetail]
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const makeSubAction = (subActionType, params) => {
    onAction({
      type: ACTIONS.ON_SUB_ACTION,
      payload: { subActionType, params },
    });
  };

  const onAction = ({ type, payload }) => {
    if (type === ACTIONS.ON_ACTION) {
      const { action, selectedId } = payload;
      setSelectedIdAction(selectedId);
      setSelectedActionDetail(action);
      if (action.id === CANDIDATE_TYPE.UNLOCK && !isRemarkDialogOpen) {
        getRequest(getPreUnlockCheck(selectedId))
          .then((response) => {
            makeSubAction(CANDIDATES_ACTION_TYPES.UNLOCK_DIALOG_OEPN, {
              response,
            });
          })
          .catch((error) => {
            if (error.code === STATUS_CODE.USER_NOT_LOGGED_IN) {
              makeSubAction(CANDIDATES_ACTION_TYPES.LOGGED_IN_DIALOG_OEPN);
            }
          });
      } else if (action.remark && !isRemarkDialogOpen) {
        makeSubAction(CANDIDATES_ACTION_TYPES.REMARK_DIALOG_OEPN);
      } else {
        updateCandidatesSummary(
          candidatesSummary,
          action.id,
          selectedId,
          pageType,
          setSnackbarOpen,
          remark
        )
          .then(([updatedCandidates, updatedCandidateDetail]) => {
            updateSearchResponseCards(updatedCandidates);
            if (updatedCandidateDetail) {
              setCandidateDetail(updatedCandidateDetail);
            }
          })
          .catch((error) => {
            if (error.code === STATUS_CODE.USER_NOT_LOGGED_IN) {
              makeSubAction(CANDIDATES_ACTION_TYPES.LOGGED_IN_DIALOG_OEPN);
            }
          })
          .finally(() => setRemark(undefined));
      }
    } else if (type === ACTIONS.ON_SELECT) {
      const { selectedId } = payload;
      if (selectedId) {
        setIsDetailSkeletonShow(true);
        getCandidateDetail(selectedId).then((candidateDetailResponse) => {
          const updatedCandidateDetail = updateEmpStateInCandidateDetail(
            candidatesSummary,
            candidateDetailResponse
          );
          setCandidateDetail(updatedCandidateDetail);
          setIsDetailSkeletonShow(false);
        });
      } else {
        setCandidateDetail();
      }
    } else if (type === ACTIONS.ON_PAGE_CHANGE) {
      const { page } = payload;
      paginationRequestToServer(page);
    } else if (type === ACTIONS.ON_SORT_BY) {
      const { sortBy } = payload;
      sortByRequestToServer(sortBy);
    } else if (type === ACTIONS.ON_SUB_ACTION) {
      handleSubAction(payload);
    }
  };

  const handleSubAction = (payload) => {
    const { subActionType, params } = payload;
    SUB_ACTION_HANDLER[subActionType](params);
  };

  const makeAction = () => {
    onAction({
      type: ACTIONS.ON_ACTION,
      payload: {
        action: selectedActionDetail,
        selectedId: selectedIdAction,
      },
    });
  };

  const handleRemarkDialogOpen = () => {
    setIsRemarkDialogOpen(true);
  };

  const handleRemarkDialogClose = () => {
    setIsRemarkDialogOpen(false);
  };

  const handleRemarkDialogSubmit = () => {
    makeAction();
    setIsRemarkDialogOpen(false);
  };

  const handleBuyPointsDialogOpen = () => {
    setIsBuyPointsDialogOpen(true);
  };

  const handleBuyPointsDialogClose = () => {
    setIsBuyPointsDialogOpen(false);
    setPreUnlockCheckResponse(EMPTY_OBJECT);
  };

  const handleBuyPointsDialogSuccess = () => {
    makeAction();
    setIsBuyPointsDialogOpen(false);
    setPreUnlockCheckResponse(EMPTY_OBJECT);
  };

  const handleUnlockDialogOpen = ({ response }) => {
    setPreUnlockCheckResponse(response);
    setIsUnlockDialogVisible(true);
    setIsBuyPointsDialogOpen(false);
  };

  const handleUnlockDialogClose = () => {
    setIsUnlockDialogVisible(false);
    setPreUnlockCheckResponse(EMPTY_OBJECT);
  };

  const handleUnlockDialogConfirm = () => {
    handleUnlockDialogClose();
    const actionType = preUnlockCheckResponse.allowed
      ? CANDIDATES_ACTION_TYPES.REMARK_DIALOG_OEPN
      : CANDIDATES_ACTION_TYPES.BUY_POINTS_DIALOG_OEPN;

    makeSubAction(actionType);
  };

  const handleLoggedInDialogOpen = () => {
    setIsLoginDialogVisible(true);
  };

  const handleLoggedInDialogClose = () => {
    setIsLoginDialogVisible(false);
  };

  const SUB_ACTION_HANDLER = {
    [CANDIDATES_ACTION_TYPES.REMARK_DIALOG_OEPN]: handleRemarkDialogOpen,
    [CANDIDATES_ACTION_TYPES.REMARK_DIALOG_CLOSE]: handleRemarkDialogClose,
    [CANDIDATES_ACTION_TYPES.REMARK_DIALOG_SUBMIT]: handleRemarkDialogSubmit,
    [CANDIDATES_ACTION_TYPES.BUY_POINTS_DIALOG_OEPN]: handleBuyPointsDialogOpen,
    [CANDIDATES_ACTION_TYPES.BUY_POINTS_DIALOG_CLOSE]:
      handleBuyPointsDialogClose,
    [CANDIDATES_ACTION_TYPES.BUY_POINTS_DIALOG_SUCCESS]:
      handleBuyPointsDialogSuccess,
    [CANDIDATES_ACTION_TYPES.UNLOCK_DIALOG_OEPN]: handleUnlockDialogOpen,
    [CANDIDATES_ACTION_TYPES.UNLOCK_DIALOG_CLOSE]: handleUnlockDialogClose,
    [CANDIDATES_ACTION_TYPES.UNLOCK_DIALOG_CONFIRM]: handleUnlockDialogConfirm,
    [CANDIDATES_ACTION_TYPES.LOGGED_IN_DIALOG_OEPN]: handleLoggedInDialogOpen,
    [CANDIDATES_ACTION_TYPES.LOGGED_IN_DIALOG_CLOSE]: handleLoggedInDialogClose,
  };

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
  };

  return (
    <>
      <SummaryDetail
        selectedPage={selectedPage}
        list={candidatesSummary}
        onAction={onAction}
        count={count}
        detail={candidateDetail}
        summaryView={CandidateSummary}
        detailView={CandidateDetail}
        pageType={pageType}
        isSummarySkeletonShow={isSummarySkeletonShow}
        isDetailSkeletonShow={isDetailSkeletonShow}
        isModalShow={isModalShow}
      />

      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
      <LoginDialog
        setLoggedInUserRole={setLoggedInUserRole}
        isDialogOpen={isLoginDialogVisible}
        onDialogClose={handleLoggedInDialogClose}
      />

      <UnlockCandidateDialog
        isDialogOpen={isUnlockDialogVisible}
        primaryAction={handleUnlockDialogConfirm}
        secondaryAction={handleUnlockDialogClose}
        content={preUnlockCheckResponse.msg}
        primaryLabel={preUnlockCheckResponse.allowed ? 'Yes' : UI.BUY_POINTS}
        secondaryLabel={preUnlockCheckResponse.allowed ? 'No' : 'Close'}
      />

      {isBuyPointsDialogOpen && (
        <BuyCreditPointsDialog
          isDialogOpen={isBuyPointsDialogOpen}
          onCloseBuyPointDialog={handleBuyPointsDialogClose}
          onSuccessTransaction={handleBuyPointsDialogSuccess}
        />
      )}

      {isRemarkDialogOpen && (
        <RemarkDialog
          isDialogOpen={isRemarkDialogOpen}
          onRemarkSubmit={handleRemarkDialogSubmit}
          onRemarkClose={handleRemarkDialogClose}
          remark={remark}
          onRemarkChange={handleRemarkChange}
          remarkTitle={candidateStatusName}
        />
      )}
    </>
  );
}

Candidates.propTypes = {
  paginationRequestToServer: PropTypes.func,
  sortByRequestToServer: PropTypes.func,
  selectedPage: PropTypes.number,
  candidatesSummary: PropTypes.array,
  updateSearchResponseCards: PropTypes.func,
  count: PropTypes.number,
  pageType: PropTypes.number,
  isSummarySkeletonShow: PropTypes.bool,
  isModalShow: PropTypes.bool,
  setLoggedInUserRole: PropTypes.func,
};

Candidates.defaultProps = {
  paginationRequestToServer: noop,
  sortByRequestToServer: noop,
  selectedPage: DEFAULT_SELECTED_PAGE,
  candidatesSummary: EMPTY_ARRAY,
  updateSearchResponseCards: noop,
  count: DEFAULT_COUNT,
  pageType: PAGE_TYPE.DEFAULT_PAGE,
  isSummarySkeletonShow: false,
  isModalShow: false,
  setLoggedInUserRole: noop,
};

export default Candidates;
