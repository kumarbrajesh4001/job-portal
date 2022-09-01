import React, { useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import JobDetail from './jobDetail';

import {
  EMPTY_ARRAY,
  DEFAULT_CONTEXT_ID,
  DEFAULT_SELECTED_PAGE,
  DEFAULT_COUNT,
} from '../../constants';

import JobSummary from './jobSummary';
import {
  updateJobsSummary,
  updateCandStateInJobDetail,
  getJob,
} from './jobs.helper';
import SummaryDetail from '../../components/summaryDetail';

import { getJobDetail } from './jobs.service';

import ACTIONS from '../../constants/summaryDetail.actionTypes';

import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';

import LoginDialog from '../loginDialog';
import { getUrlAndRedirect } from '../../helpers/getRedirectUrl';
import STATUS_CODE from '../../constants/statusCode';
import URL from '../../constants/urls';

function Jobs(props) {
  const {
    selectedPage,
    paginationRequestToServer,
    sortByRequestToServer,
    jobsSummary,
    count,
    updateSearchResponseCards,
    pageType,
    isSummarySkeletonShow,
    isMyProfileActivity,
    isModalShow,
    setLoggedInUserRole,
  } = props;
  const [jobDetail, setJobDetail] = useState();

  const [opensnackbar, setSnackbarOpen] = useState();

  const [isDetailSkeletonShow, setIsDetailSkeletonShow] = useState();
  // TODO: remove
  const [isLoginDialogVisible, setIsLoginDialogVisible] = useState(false);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const handleCloseLoginDialog = () => {
    setIsLoginDialogVisible(false);
  };

  const onAction = ({ type, payload }) => {
    if (type === ACTIONS.ON_ACTION) {
      const { action, selectedId } = payload;
      const job = getJob(jobsSummary, selectedId);
      updateJobsSummary(
        jobsSummary,
        action.id,
        job,
        pageType,
        isMyProfileActivity,
        setSnackbarOpen
      )
        .then(([updatedJobs, updatedJobDetail]) => {
          updateSearchResponseCards(updatedJobs);
          if (updatedJobDetail) {
            setJobDetail(updatedJobDetail);
          }
        })
        .catch((error) => {
          if (error.code === STATUS_CODE.USER_NOT_LOGGED_IN) {
            getUrlAndRedirect(URL.LOGIN);
          }
        });
    } else if (type === ACTIONS.ON_SELECT) {
      const { selectedId } = payload;

      const job = getJob(jobsSummary, selectedId);

      if (selectedId) {
        setIsDetailSkeletonShow(true);
        getJobDetail(job, pageType).then((jobDetailResponse) => {
          const updatedJobDetail = updateCandStateInJobDetail(
            jobsSummary,
            jobDetailResponse
          );
          setJobDetail(updatedJobDetail);
          setIsDetailSkeletonShow(false);
        });
      } else {
        setJobDetail();
      }
    } else if (type === ACTIONS.ON_PAGE_CHANGE) {
      const { page } = payload;
      paginationRequestToServer(page);
    } else if (type === ACTIONS.ON_SORT_BY) {
      const { sortBy } = payload;
      sortByRequestToServer(sortBy);
    }
  };

  return (
    <>
      <SummaryDetail
        selectedPage={selectedPage}
        list={jobsSummary}
        onAction={onAction}
        count={count}
        detail={jobDetail}
        summaryView={JobSummary}
        detailView={JobDetail}
        pageType={pageType}
        isSummarySkeletonShow={isSummarySkeletonShow}
        isDetailSkeletonShow={isDetailSkeletonShow}
        isMyProfileActivity={isMyProfileActivity}
        isModalShow={isModalShow}
      />
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
      <LoginDialog
        setLoggedInUserRole={setLoggedInUserRole}
        isDialogOpen={isLoginDialogVisible}
        onDialogClose={handleCloseLoginDialog}
      />
    </>
  );
}

Jobs.propTypes = {
  paginationRequestToServer: PropTypes.func,
  sortByRequestToServer: PropTypes.func,
  selectedPage: PropTypes.number,
  jobsSummary: PropTypes.array,
  updateSearchResponseCards: PropTypes.func,
  count: PropTypes.number,
  pageType: PropTypes.number,
  isMyProfileActivity: PropTypes.bool,
  isSummarySkeletonShow: PropTypes.bool,
  isModalShow: PropTypes.bool,
  setLoggedInUserRole: PropTypes.func,
};

Jobs.defaultProps = {
  paginationRequestToServer: noop,
  sortByRequestToServer: noop,
  selectedPage: DEFAULT_SELECTED_PAGE,
  jobsSummary: EMPTY_ARRAY,
  updateSearchResponseCards: noop,
  count: DEFAULT_COUNT,
  pageType: DEFAULT_CONTEXT_ID,
  isMyProfileActivity: false,
  isSummarySkeletonShow: false,
  isModalShow: false,
  setLoggedInUserRole: noop,
};

export default Jobs;
