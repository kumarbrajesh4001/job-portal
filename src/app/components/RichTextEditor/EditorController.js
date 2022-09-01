import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import RichTextEditor from './RichTextEditor';
import VALIDATION_VALUES from '../../constants/validationValues';
import ERROR_MESSAGE from '../../constants/errorMsgs';
import { EMPTY_OBJECT } from '../../constants';

function EditorController(props) {
  const { name, control, toolbarOptions, error } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        minLength: {
          value: VALIDATION_VALUES.MIN_VALUE,
          message: ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE,
        },
        maxLength: {
          value: VALIDATION_VALUES.MAX_VALUE_10240,
          message:
            ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_10240,
        },
      }}
      render={({ field: { value, onChange } }) => (
        <div>
          <RichTextEditor
            onChange={onChange}
            value={value}
            toolbarOptions={toolbarOptions}
          />
          <FormHelperText error>{error.message}</FormHelperText>
        </div>
      )}
    />
  );
}
EditorController.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  toolbarOptions: PropTypes.object,
  error: PropTypes.object,
};
EditorController.defaultProps = {
  name: undefined,
  control: EMPTY_OBJECT,
  toolbarOptions: EMPTY_OBJECT,
  error: EMPTY_OBJECT,
};
export default EditorController;
