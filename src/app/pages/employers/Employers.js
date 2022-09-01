import React, { useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { EMPTY_ARRAY, DEFAULT_COUNT } from '../../constants';

import EmployerSummary from './employerSummary';
import EmployerDetail from './employerDetail';
import SummaryDetail from '../../components/summaryDetail';

import { getEmployerDetail } from './employers.services';
import ACTIONS from '../../constants/summaryDetail.actionTypes';
import {
  updateCandStateInEmployerDetail,
  updateEmployersSummary,
} from './employers.helper';
import PAGE_TYPE from '../../constants/pageType';

function Employers(props) {
  const {
    selectedPage,
    paginationRequestToServer,
    sortByRequestToServer,
    employerSummary,
    updateSearchResponseCards,
    count,
    pageType,
    isSummarySkeletonShow,
  } = props;

  const [employerDetail, setEmployerDetail] = useState();

  const [isDetailSkeletonShow, setIsDetailSkeletonShow] = useState();

  const onAction = ({ type, payload }) => {
    if (type === ACTIONS.ON_ACTION) {
      const { action, selectedId } = payload;

      updateEmployersSummary(
        employerSummary,
        action.id,
        selectedId,
        pageType
      ).then(([updatedEmployers, updatedEmployerDetail]) => {
        updateSearchResponseCards(updatedEmployers);
        if (updatedEmployerDetail) {
          setEmployerDetail(updatedEmployerDetail);
        }
      });
    } else if (type === ACTIONS.ON_SELECT) {
      const { selectedId } = payload;
      if (selectedId) {
        setIsDetailSkeletonShow(true);
        getEmployerDetail(selectedId).then((employerDetailResponse) => {
          const updatedEmployerDetail = updateCandStateInEmployerDetail(
            employerSummary,
            employerDetailResponse
          );
          setEmployerDetail(updatedEmployerDetail);
          setIsDetailSkeletonShow(false);
        });
      } else {
        setEmployerDetail();
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
    <SummaryDetail
      selectedPage={selectedPage}
      list={employerSummary}
      onAction={onAction}
      count={count}
      detail={employerDetail}
      summaryView={EmployerSummary}
      detailView={EmployerDetail}
      pageType={pageType}
      isSummarySkeletonShow={isSummarySkeletonShow}
      isDetailSkeletonShow={isDetailSkeletonShow}
    />
  );
}

Employers.propTypes = {
  employerSummary: PropTypes.array,
  updateSearchResponseCards: PropTypes.func,
  count: PropTypes.number,
  pageType: PropTypes.number,
  selectedPage: PropTypes.number,
  paginationRequestToServer: PropTypes.func,
  sortByRequestToServer: PropTypes.func,
  isSummarySkeletonShow: PropTypes.bool,
};

Employers.defaultProps = {
  employerSummary: EMPTY_ARRAY,
  updateSearchResponseCards: noop,
  count: DEFAULT_COUNT,
  pageType: PAGE_TYPE.DEFAULT_PAGE,
  selectedPage: PAGE_TYPE.DEFAULT_PAGE,
  paginationRequestToServer: noop,
  sortByRequestToServer: noop,
  isSummarySkeletonShow: false,
};

export default Employers;
