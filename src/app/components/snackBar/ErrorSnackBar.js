import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { EMPTY_OBJECT } from '../../constants';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function ErrorSnackBar(props) {
  const { opensnackbar, handleClose } = props;

  return (
    <Snackbar
      open={opensnackbar.setopen}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      {opensnackbar.message && (
        <Alert
          onClose={handleClose}
          severity={opensnackbar.severity}
          sx={{ width: '100%' }}
        >
          {opensnackbar.message}
        </Alert>
      )}
    </Snackbar>
  );
}

ErrorSnackBar.propTypes = {
  opensnackbar: PropTypes.object,
  handleClose: PropTypes.func,
};

ErrorSnackBar.defaultProps = {
  opensnackbar: EMPTY_OBJECT,
  handleClose: noop,
};

export default ErrorSnackBar;
