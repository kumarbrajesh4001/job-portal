import { memo } from 'react';
import PropTypes from 'prop-types';
import isFalsyValue from '../../helpers/isFalsyValue';

function Content(props) {
  const { condition, children } = props;
  return isFalsyValue(condition) ? null : children;
}
Content.propTypes = {
  condition: PropTypes.any,
  children: PropTypes.any,
};
Content.defaultProps = {
  condition: undefined,
  children: undefined,
};
export default memo(Content);
