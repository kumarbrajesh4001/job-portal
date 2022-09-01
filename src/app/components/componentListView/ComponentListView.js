import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './componentListView.module.css';
import { EMPTY_ARRAY } from '../../constants';
import Content from '../content';

function ComponentListView(props) {
  const { items, component: Component } = props;
  return (
    <Content condition={items.length}>
      {items.map((item, index) => (
        <div
          key={index}
          className={classNames('d-flex', { 'mt-2': index > 0 })}
        >
          <div className={`me-2 ${styles.numbering}`}>{index + 1}.</div>
          <Component item={item} />
        </div>
      ))}
    </Content>
  );
}

ComponentListView.propTypes = {
  items: PropTypes.array,
  component: PropTypes.any,
};

ComponentListView.defaultProps = {
  items: EMPTY_ARRAY,
  component: undefined,
};

export default ComponentListView;
