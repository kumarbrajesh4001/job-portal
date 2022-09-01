import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function TermAndConditionDialog(props) {
  const { termAndConditionDialogOpen, onHandleDialogClose, children } = props;

  return (
    <Dialog
      maxWidth="xl"
      open={termAndConditionDialogOpen}
      onClose={onHandleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="justify-content-end d-flex my-1 me-1">
        <IconButton onClick={onHandleDialogClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {children}
    </Dialog>
  );
}

TermAndConditionDialog.propTypes = {
  termAndConditionDialogOpen: PropTypes.bool,
  onHandleDialogClose: PropTypes.func,
  children: PropTypes.any,
};

TermAndConditionDialog.defaultProps = {
  termAndConditionDialogOpen: false,
  onHandleDialogClose: noop,
  children: undefined,
};

export default TermAndConditionDialog;
