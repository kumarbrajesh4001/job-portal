import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function PortalPopover(props) {
  const { portalPopoverOpen, onClosePortalPopover, children, title, isLeft } =
    props;

  const open = Boolean(portalPopoverOpen);

  return (
    <Popover
      open={open}
      anchorEl={portalPopoverOpen}
      onClose={onClosePortalPopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: isLeft ? 'left' : 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: isLeft ? 'left' : 'right',
      }}
    >
      <div className="d-flex justify-content-between px-3 py-2">
        <div className="subtitle-1-bold color-1F2830 align-self-center">
          {title}
        </div>

        <IconButton onClick={onClosePortalPopover}>
          <CloseIcon />
        </IconButton>
      </div>
      {children}
    </Popover>
  );
}

PortalPopover.propTypes = {
  portalPopoverOpen: PropTypes.object,
  onClosePortalPopover: PropTypes.func,
  children: PropTypes.any,
  title: PropTypes.string,
  isLeft: PropTypes.bool,
};

PortalPopover.defaultProps = {
  portalPopoverOpen: undefined,
  onClosePortalPopover: noop,
  children: undefined,
  title: undefined,
  isLeft: false,
};

export default PortalPopover;
