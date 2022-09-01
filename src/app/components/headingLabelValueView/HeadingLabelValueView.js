import PropTypes from 'prop-types';
import Content from '../content';

function HeadingLabelValueView(props) {
  const { label, children, condition } = props;

  return (
    <Content condition={condition}>
      <div className="mt-3 mb-1 subtitle-1-bold">{label}</div>
      {children}
    </Content>
  );
}

HeadingLabelValueView.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  condition: PropTypes.bool,
};

HeadingLabelValueView.defaultProps = {
  label: undefined,
  children: undefined,
  condition: true,
};

export default HeadingLabelValueView;
