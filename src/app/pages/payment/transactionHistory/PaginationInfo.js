import React from 'react';
import PropTypes from 'prop-types';
import UI from '../../../constants/ui';
import { DEFAULT_SELECTED_PAGE, PAGINATION_ROWS } from '../../../constants';

function PaginationInfo(props) {
  const { totalCount, selectedPage, currentPageCount } = props;

  return (
    <div className="caption mt-3 mb-1 ms-3">
      {UI.PAGE} {(selectedPage - 1) * PAGINATION_ROWS + 1} -
      {(selectedPage - 1) * PAGINATION_ROWS + 1 + currentPageCount - 1} {UI.OF}{' '}
      {totalCount} {UI.RESULTS}
    </div>
  );
}

PaginationInfo.propTypes = {
  totalCount: PropTypes.number,
  currentPageCount: PropTypes.number,
  selectedPage: PropTypes.number,
};

PaginationInfo.defaultProps = {
  totalCount: 0,
  currentPageCount: 0,
  selectedPage: DEFAULT_SELECTED_PAGE,
};

export default PaginationInfo;
