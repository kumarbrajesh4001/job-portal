import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import Login from '../loginRegisterFlow/login';

function LoginDialog(props) {
  const { isDialogOpen, onDialogClose, setLoggedInUserRole } = props;
  return (
    <Dialog open={isDialogOpen} onClose={onDialogClose}>
      <DialogContent>
        <Login setLoggedInUserRole={setLoggedInUserRole} />
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  onDialogClose: PropTypes.func,
  setLoggedInUserRole: PropTypes.func,
};

LoginDialog.defaultProps = {
  isDialogOpen: false,
  onDialogClose: noop,
  setLoggedInUserRole: noop,
};

export default LoginDialog;
