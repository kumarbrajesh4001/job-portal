import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import UI from '../../constants/ui';

function RemarkDialog(props) {
  const {
    isDialogOpen,
    onRemarkSubmit,
    onRemarkClose,
    onRemarkChange,
    remarkTitle,
    remark,
  } = props;

  return (
    isDialogOpen && (
      <MuiDialog open={isDialogOpen} onClose={onRemarkClose}>
        <DialogTitle id="alert-dialog-title">
          {`${remarkTitle} ${UI.REMARK}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextareaAutosize
              minRows={3}
              aria-label="candidate remark"
              placeholder={UI.REMARK_PLACEHOLDER}
              className="skillView"
              value={remark}
              onChange={onRemarkChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onRemarkClose}>
            {UI.CLOSE}
          </Button>
          <Button
            variant="contained"
            onClick={onRemarkSubmit}
            disabled={!remark}
          >
            {UI.SUBMIT}
          </Button>
        </DialogActions>
      </MuiDialog>
    )
  );
}

RemarkDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  onRemarkSubmit: PropTypes.func,
  onRemarkClose: PropTypes.func,
  onRemarkChange: PropTypes.func,
  remark: PropTypes.string,
  remarkTitle: PropTypes.string,
};

RemarkDialog.defaultProps = {
  isDialogOpen: false,
  onRemarkSubmit: noop,
  onRemarkClose: noop,
  onRemarkChange: noop,
  remark: undefined,
  remarkTitle: undefined,
};

export default RemarkDialog;
