import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import URL from '../../constants/urls';
import getRedirectUrl, {
  getDefaultUrlBasedOnRoleAndStatus,
} from '../../helpers/getRedirectUrl';
import STORAGE_KEY from '../../constants/storageKey';
import { getLoginDetailFromSession } from '../../helpers/sessionDetails';

function PrivateRoute(props) {
  const { role, roleTypes, children } = props;
  if (role && !roleTypes.includes(role)) {
    const profileupdated = getLoginDetailFromSession()?.profileupdated;
    const navigateUrl = getDefaultUrlBasedOnRoleAndStatus(role, profileupdated);
    return <Navigate to={navigateUrl} replace />;
  }

  if (!role || !roleTypes.includes(role)) {
    const redirectUrl = getRedirectUrl(URL.LOGIN);
    // TODO: Better
    localStorage.removeItem(STORAGE_KEY.SESSION_DETAILS);
    window.dispatchEvent(new Event('storage'));
    return <Navigate to={redirectUrl} replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  role: PropTypes.number,
  roleTypes: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
};

PrivateRoute.defaultProps = {
  role: undefined,
};

export default PrivateRoute;
