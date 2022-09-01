import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import DefaultElementComponent from '../defaultElementComponent';
import styles from './editDeleteList.module.css';

function EditDeleteList(props) {
  const { list, setList, onEdit, component: Component, config } = props;

  const handleDelete = (event) => {
    const index = event.target.id;
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
    onEdit(-1);
  };

  const handleEdit = (event) => {
    const index = event.target.id;
    onEdit(index);
  };
  return list?.map((item, index) => (
    <div key={index} className="border background-ffffff">
      <div className="row m-2 position-relative">
        <Component item={item} {...config} />
        <div className="d-flex justify-content-end position-absolute pe-0">
          <div>
            <i
              id={index}
              onClick={handleEdit}
              className="fa fa-edit color-F25C05"
            />
          </div>
          <div>
            <i
              id={index}
              onClick={handleDelete}
              className="fa fa-trash color-F25C05 ms-2"
            />
          </div>
          <div className={styles.blankSpace} />
        </div>
      </div>
    </div>
  ));
}

EditDeleteList.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
  onEdit: PropTypes.func,
  component: PropTypes.elementType,
  config: PropTypes.object,
};

EditDeleteList.defaultProps = {
  list: EMPTY_ARRAY,
  setList: noop,
  onEdit: noop,
  component: DefaultElementComponent(),
  config: EMPTY_OBJECT,
};

export default EditDeleteList;
