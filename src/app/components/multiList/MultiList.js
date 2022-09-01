import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { EMPTY_ARRAY } from '../../constants';
import ERROR_MESSAGE from '../../constants/errorMsgs';
import EditDeleteList from '../editDeleteList';
import ListView from '../listView';

function MultiList(props) {
  const { setList, list = EMPTY_ARRAY, minLength, maxLength } = props;
  const [inputField, setInputField] = useState();
  const [editIndex, setEditIndex] = useState(-1);

  const add = useCallback(() => {
    const updatedList = [...list, inputField];
    setInputField('');
    setList(updatedList);
  }, [inputField, list, setList]);

  const edit = useCallback(() => {
    const updatedList = [...list];
    updatedList[editIndex] = inputField;
    setInputField('');
    setEditIndex(-1);
    setList(updatedList);
  }, [inputField, list, setList, editIndex]);

  const onChange = useCallback((e) => {
    setInputField(e.target.value);
  }, EMPTY_ARRAY);

  const handleKeyPressUp = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        if (editIndex > -1) {
          edit();
        } else {
          add();
        }
      }
    },
    [inputField]
  );

  const handleEdit = useCallback(
    (index) => {
      const item = list[index];
      setInputField(item);
      setEditIndex(index);
    },
    [list]
  );

  return (
    <div className="row g-1">
      <div className="input-group">
        <input
          type="text"
          minLength={minLength}
          maxLength={maxLength}
          className="form-control col-10"
          value={inputField}
          placeholder="Type here..."
          onChange={onChange}
          onKeyUp={handleKeyPressUp}
        />
        {editIndex > -1 ? (
          <button className="btn btn-primary" type="button" onClick={edit}>
            <i className="fa fa-edit" />
          </button>
        ) : (
          <button
            className="btn btn-primary"
            type="button"
            onClick={add}
            disabled={!inputField}
          >
            <i className="fa fa-plus" />
          </button>
        )}
      </div>
      <EditDeleteList
        component={ListView}
        onEdit={handleEdit}
        list={list}
        setList={setList}
      />
    </div>
  );
}
MultiList.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

MultiList.defaultProps = {
  list: EMPTY_ARRAY,
  setList: noop,
  minLength: ERROR_MESSAGE.MIN_VALUE,
  maxLength: ERROR_MESSAGE.MAX_VALUE_128,
};
export default MultiList;
