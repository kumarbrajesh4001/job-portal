import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from 'lodash';

import { EMPTY_OBJECT } from '../../../constants';
import PAGE_TYPE from '../../../constants/pageType';

function Summary(props) {
  const {
    item,
    isActive,
    onSelect,
    onAction,
    summaryView: SummaryView,
    pageType,
    isMyProfileActivity,
  } = props;

  const handleSelect = () => {
    onSelect(item.id);
  };

  const containerClassName = classNames(
    'px-3 pt-3 pb-2 text-black bg-white border mb-3 rounded-3 cursorPointer mt-1',
    { 'border-primary': isActive }
  );

  return (
    <div className={containerClassName} onClick={handleSelect}>
      <SummaryView
        onAction={onAction}
        item={item}
        pageType={pageType}
        isMyProfileActivity={isMyProfileActivity}
      />
    </div>
  );
}

Summary.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool,
  onSelect: PropTypes.func,
  onAction: PropTypes.func,
  summaryView: PropTypes.func.isRequired,
  pageType: PropTypes.number,
  isMyProfileActivity: PropTypes.bool,
};

Summary.defaultProps = {
  item: EMPTY_OBJECT,
  isActive: false,
  onSelect: noop,
  onAction: noop,
  pageType: PAGE_TYPE.DEFAULT_PAGE,
  isMyProfileActivity: false,
};

export default Summary;
