/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import Content from '../content';

function LabelValueView(props) {
  const { label, value, children, condition, isCompact, isValueHTML } = props;
  return isCompact ? (
    <Content condition={condition}>
      <div className="my-1 body-2 color-5B5B5B">{label}</div>
      <div className="body-1 color-1F2830">{value}</div>
    </Content>
  ) : (
    <Content condition={condition}>
      <div className="mt-3">
        <div className="body-1 color-5B5B5B"> {label}</div>
        {value ? (
          isValueHTML ? (
            <div dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <div className="body-1 color-1F2830 mt-1">{value}</div>
          )
        ) : (
          children
        )}
      </div>
    </Content>
  );
}

LabelValueView.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  children: PropTypes.any,
  condition: PropTypes.any,
  isValueHTML: PropTypes.bool,
  isCompact: PropTypes.bool,
};

LabelValueView.defaultProps = {
  label: undefined,
  value: undefined,
  children: undefined,
  condition: undefined,
  isValueHTML: false,
  isCompact: false,
};

export default LabelValueView;
