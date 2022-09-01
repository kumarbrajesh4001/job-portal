import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getDefaultUrlBasedOnRoleAndStatus } from '../../helpers/getRedirectUrl';
import { getLoginDetailFromSession } from '../../helpers/sessionDetails';

function ProtectedRoute(props) {
  const { role, roleTypes, children } = props;
  if (role && !roleTypes.includes(role)) {
    const profileupdated = getLoginDetailFromSession()?.profileupdated;
    const navigateUrl = getDefaultUrlBasedOnRoleAndStatus(role, profileupdated);
    return <Navigate to={navigateUrl} replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  role: PropTypes.number,
  roleTypes: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
};

ProtectedRoute.defaultProps = {
  role: undefined,
};

export default ProtectedRoute;
