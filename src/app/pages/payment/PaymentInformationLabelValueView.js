import PropTypes from 'prop-types';
import Content from '../../components/content';
import UI from '../../constants/ui';
import useMobileDevice from '../../hooks/useMobileDevice';

function PaymentInformationLabelValueView(props) {
  const { label, value, condition } = props;

  const isMobileDevice = useMobileDevice();

  return (
    <Content condition={condition}>
      <div className={`mb-2  ${isMobileDevice && 'd-flex flex-wrap'}`}>
        <div className="body-1 color-5B5B5B me-1 mb-1"> {label}:</div>

        {label !== UI.MESSAGE ? (
          <span className="body-1 color-1F2830">{value}</span>
        ) : (
          value
        )}
      </div>
    </Content>
  );
}

PaymentInformationLabelValueView.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  condition: PropTypes.any,
};

PaymentInformationLabelValueView.defaultProps = {
  label: undefined,
  value: undefined,
  condition: undefined,
};

export default PaymentInformationLabelValueView;
