import PropTypes from 'prop-types';

function ListView(props) {
  const { item } = props;
  return <div className="col-8">{item}</div>;
}

ListView.propTypes = {
  item: PropTypes.string,
};

ListView.defaultProps = {
  item: undefined,
};

export default ListView;
