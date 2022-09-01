/* eslint-disable no-nested-ternary */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import Dialog from '@mui/material/Dialog';
import SummaryList from './summaryList';
import Detail from './detail';
import useMobileDevice from '../../hooks/useMobileDevice';
import { DEFAULT_COUNT, EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import ACTIONS from '../../constants/summaryDetail.actionTypes';
import getSelectedId from './summaryDetail.helper';
import PAGE_TYPE from '../../constants/pageType';
import ResultNotFound from '../resultNotFound';
import Content from '../content';
import { SummarySkeleton, DetailSkeleton } from '../skeleton';
import SORT_BY from '../../constants/sortBy';
import styles from './summaryDetail.module.css';

function SummaryDetail(props) {
  const {
    selectedPage,
    count,
    list,
    onAction,
    detail,
    summaryView,
    detailView,
    pageType,
    isSummarySkeletonShow,
    isDetailSkeletonShow,
    isMyProfileActivity,
    isModalShow,
  } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [sortBy, setSortBy] = useState(SORT_BY.RELEVANCE);

  const isMobileDevice = useMobileDevice();
  const onSelect = (id) => {
    setSelectedId(id);

    if (isMobileDevice) {
      setIsDialogOpen(true);
    }
  };

  useEffect(() => {
    const updatedSelectedId = getSelectedId(list, selectedId);
    setSelectedId(updatedSelectedId);
  }, [list, selectedId]);

  useEffect(() => {
    onAction({
      type: ACTIONS.ON_SELECT,
      payload: { selectedId },
    });
  }, [selectedId]);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleAction = (action) => {
    onAction({
      type: ACTIONS.ON_ACTION,
      payload: { action, selectedId },
    });
  };

  const pagination = (page) => {
    window.scrollTo(0, 0);
    onAction({
      type: ACTIONS.ON_PAGE_CHANGE,
      payload: { page },
    });
  };

  const sortingBy = (sortByValue) => {
    setSortBy(sortByValue);
    window.scrollTo(0, 0);
    onAction({
      type: ACTIONS.ON_SORT_BY,
      payload: { sortBy: sortByValue },
    });
  };

  return (
    <div className="position-relative">
      <div className={`container ${isModalShow ? '' : 'mt-3'}`}>
        <div className="row">
          {isSummarySkeletonShow ? (
            <SummarySkeleton />
          ) : (
            <>
              <SummaryList
                selectedPage={selectedPage}
                pagination={pagination}
                sortingBy={sortingBy}
                count={count}
                list={list}
                onSelect={onSelect}
                selectedId={selectedId}
                onAction={handleAction}
                summaryView={summaryView}
                pageType={pageType}
                isMyProfileActivity={isMyProfileActivity}
                sortBy={sortBy}
              />

              <Content condition={!count}>
                <ResultNotFound />
              </Content>
            </>
          )}
          {(isDetailSkeletonShow || isSummarySkeletonShow) && count !== 0 ? (
            isMobileDevice ? (
              <Dialog fullScreen open={isDialogOpen}>
                <DetailSkeleton />
              </Dialog>
            ) : (
              <DetailSkeleton />
            )
          ) : (
            !isEmpty(detail) &&
            (isMobileDevice ? (
              <Dialog fullScreen open={isDialogOpen}>
                <Detail
                  detail={detail}
                  onAction={handleAction}
                  onClose={handleClose}
                  detailView={detailView}
                  isMyProfileActivity={isMyProfileActivity}
                  pageType={pageType}
                />
              </Dialog>
            ) : (
              <Detail
                detail={detail}
                onAction={handleAction}
                detailView={detailView}
                isMyProfileActivity={isMyProfileActivity}
                pageType={pageType}
              />
            ))
          )}
        </div>
      </div>
      <Content condition={isModalShow && count !== 0}>
        <div className={styles.modalWindow} />
      </Content>
    </div>
  );
}
SummaryDetail.propTypes = {
  count: PropTypes.number,
  selectedPage: PropTypes.number,
  list: PropTypes.array,
  onAction: PropTypes.func,
  summaryView: PropTypes.func.isRequired,
  detailView: PropTypes.func.isRequired,
  detail: PropTypes.object,
  pageType: PropTypes.number,
  isSummarySkeletonShow: PropTypes.bool,
  isDetailSkeletonShow: PropTypes.bool,
  isMyProfileActivity: PropTypes.bool,
  isModalShow: PropTypes.bool,
};
SummaryDetail.defaultProps = {
  count: DEFAULT_COUNT,
  selectedPage: PAGE_TYPE.DEFAULT_SELECTED_PAGE,
  list: EMPTY_ARRAY,
  onAction: noop,
  detail: EMPTY_OBJECT,
  pageType: PAGE_TYPE.DEFAULT_PAGE,
  isSummarySkeletonShow: true,
  isDetailSkeletonShow: true,
  isMyProfileActivity: false,
  isModalShow: false,
};

export default SummaryDetail;
