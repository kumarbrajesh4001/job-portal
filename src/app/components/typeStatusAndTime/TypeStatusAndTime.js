import PropTypes from 'prop-types';
import Content from '../content';

function TypeStatusAndTime(props) {
  const { label, value, condition, isThreeStatus } = props;

  const typeStatusCss =
    'border-radius caption color-1F2830 background-D7D7D7 ps-1 pe-1';

  return (
    <Content condition={condition}>
      <div className={typeStatusCss}>
        {isThreeStatus ? (
          <div className="text-center">
            <div>{label} </div>
            <div>{value}</div>
          </div>
        ) : (
          <>
            <span> {label} </span>
            {label && value && <span className="mx-1">-</span>}
            <span>{value}</span>
          </>
        )}
      </div>
    </Content>
  );
}

TypeStatusAndTime.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  condition: PropTypes.any,
  isThreeStatus: PropTypes.bool,
};

TypeStatusAndTime.defaultProps = {
  label: undefined,
  value: undefined,
  condition: undefined,
  isThreeStatus: false,
};

export default TypeStatusAndTime;
