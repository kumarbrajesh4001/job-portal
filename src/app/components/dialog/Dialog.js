import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

function Dialog(props) {
  const {
    isDialogOpen,
    onDialogClose,
    title,
    content,
    primaryLabel,
    primaryAction,
    secondaryLabel,
    secondaryAction,
    isLoading,
  } = props;
  return (
    <MuiDialog open={isDialogOpen} onClose={onDialogClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {secondaryLabel && (
          <Button onClick={secondaryAction}>{secondaryLabel}</Button>
        )}
        {primaryLabel && (
          <Button
            variant="contained"
            // autoFocus will check later
            onClick={primaryAction}
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress size="1rem" color="inherit" />
            }
          >
            {primaryLabel}
          </Button>
        )}
      </DialogActions>
    </MuiDialog>
  );
}

Dialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  onDialogClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  primaryLabel: PropTypes.string,
  primaryAction: PropTypes.func,
  secondaryLabel: PropTypes.string,
  secondaryAction: PropTypes.func,
};

Dialog.defaultProps = {
  isDialogOpen: false,
  isLoading: false,
  onDialogClose: noop,
  title: undefined,
  content: undefined,
  primaryLabel: undefined,
  primaryAction: noop,
  secondaryLabel: undefined,
  secondaryAction: noop,
};

export default Dialog;
