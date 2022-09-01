import PropTypes from 'prop-types';

import Error from '../../pages/error';

function PublicRoute(props) {
  const { role, children } = props;
  if (role) {
    return <Error />;
  }

  return children;
}

PublicRoute.propTypes = {
  role: PropTypes.number,
  children: PropTypes.node.isRequired,
};

PublicRoute.defaultProps = {
  role: undefined,
};

export default PublicRoute;
