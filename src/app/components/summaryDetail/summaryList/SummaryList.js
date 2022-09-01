import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import cx from 'classnames';
import SortIcon from '@mui/icons-material/Sort';
import Pagination from '@mui/material/Pagination';

import Summary from '../summary';
import { DEFAULT_COUNT, EMPTY_ARRAY } from '../../../constants';
import Content from '../../content';
import PAGE_TYPE from '../../../constants/pageType';
import SORT_BY from '../../../constants/sortBy';
import UI from '../../../constants/ui';

const sortByClass = 'caption sort-by';
function SummaryList({
  selectedPage,
  pagination,
  sortingBy,
  count,
  list,
  onSelect,
  selectedId,
  onAction,
  summaryView,
  pageType,
  isMyProfileActivity,
  sortBy,
}) {
  const handleSortBy = (event) => {
    const sortByValue = +event.target.id;
    sortingBy(sortByValue);
  };

  return (
    <div className="col-md-5">
      <Content condition={list.length}>
        <div className="d-flex justify-content-between align-items-center">
          <span className="caption">
            {UI.PAGE} {(selectedPage - 1) * 10 + 1} -
            {(selectedPage - 1) * 10 + 1 + list.length - 1} {UI.OF} {count}{' '}
            {UI.RESULTS}
          </span>

          <div>
            <span className="caption">
              <SortIcon /> {UI.SORT_BY}
            </span>

            <button
              type="button"
              id={SORT_BY.RELEVANCE}
              className={cx(sortByClass, {
                'sort-by-selected': sortBy === SORT_BY.RELEVANCE,
                'color-D7D7D7': sortBy === SORT_BY.RELEVANCE,
              })}
              onClick={handleSortBy}
              disabled={sortBy === SORT_BY.RELEVANCE}
            >
              {UI.RELEVANCE}
            </button>

            <button
              type="button"
              id={SORT_BY.DATE}
              className={cx(sortByClass, {
                'sort-by-selected': sortBy === SORT_BY.DATE,
                'color-D7D7D7': sortBy === SORT_BY.DATE,
              })}
              onClick={handleSortBy}
              disabled={sortBy === SORT_BY.DATE}
            >
              {UI.DATE}
            </button>
          </div>
        </div>
      </Content>
      {list.map((item) => {
        const isActive = item.id === selectedId;
        return (
          <Summary
            item={item}
            key={item.id}
            isActive={isActive}
            onSelect={onSelect}
            onAction={onAction}
            summaryView={summaryView}
            pageType={pageType}
            isMyProfileActivity={isMyProfileActivity}
          />
        );
      })}
      <Content condition={Math.ceil(count / 10) > 1}>
        <Pagination
          count={Math.ceil(count / 10)}
          className="justify-content-center d-flex mt-3 caption color-1F2830"
          onChange={(_, page) => pagination(page)}
          page={selectedPage}
        />
      </Content>
    </div>
  );
}
SummaryList.propTypes = {
  selectedPage: PropTypes.number,
  pagination: PropTypes.func,
  sortingBy: PropTypes.func,
  count: PropTypes.number,
  list: PropTypes.array,
  onSelect: PropTypes.func,
  selectedId: PropTypes.string,
  onAction: PropTypes.func,
  summaryView: PropTypes.func.isRequired,
  pageType: PropTypes.number,
  isMyProfileActivity: PropTypes.bool,
  sortBy: PropTypes.number,
};

SummaryList.defaultProps = {
  selectedPage: PAGE_TYPE.DEFAULT_SELECTED_PAGE,
  pagination: noop,
  sortingBy: noop,
  count: DEFAULT_COUNT,
  list: EMPTY_ARRAY,
  onSelect: noop,
  selectedId: undefined,
  onAction: noop,
  pageType: PAGE_TYPE.DEFAULT_PAGE,
  isMyProfileActivity: false,
  sortBy: SORT_BY.RELEVANCE,
};
export default SummaryList;
