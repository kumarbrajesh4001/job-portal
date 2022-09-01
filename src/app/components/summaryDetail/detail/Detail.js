import React from 'react';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { noop } from 'lodash';
import PropTypes from 'prop-types';

import { EMPTY_OBJECT } from '../../../constants';
import useMobileDevice from '../../../hooks/useMobileDevice';
import PAGE_TYPE from '../../../constants/pageType';

function Detail(props) {
  const {
    detail,
    onAction,
    onClose,
    detailView: DetailView,
    isMyProfileActivity,
    pageType,
  } = props;
  const isMobileDevice = useMobileDevice();

  return (
    <div className="col-md-7">
      <div className="position-sticky top-0 text-left py-md-2">
        <div className="text-black bg-white  border rounded-3 text-left">
          {isMobileDevice && (
            <IconButton className="pull-right" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
          <DetailView
            detail={detail}
            onAction={onAction}
            isMyProfileActivity={isMyProfileActivity}
            pageType={pageType}
          />
        </div>
      </div>
    </div>
  );
}

Detail.propTypes = {
  detail: PropTypes.object,
  onAction: PropTypes.func,
  onClose: PropTypes.func,
  detailView: PropTypes.func.isRequired,
  isMyProfileActivity: PropTypes.bool,
  pageType: PropTypes.number,
};

Detail.defaultProps = {
  detail: EMPTY_OBJECT,
  onAction: noop,
  onClose: noop,
  isMyProfileActivity: false,
  pageType: PAGE_TYPE.DEFAULT_PAGE,
};

export default Detail;
