import React from 'react';
import ReactSelect from 'react-select';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import UI from '../../constants/ui';
import { createOptions } from '../../helpers/createOption';
import ERROR_MESSAGE from '../../constants/errorMsgs';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';

const customStyles = {
  placeholder: (provided) => ({
    ...provided,
    color: '#bcbcbc', // TODO will check if bette option
  }),
};

function Select({
  name,
  options,
  control,
  onChange: updatedOnChange,
  isRequired,
  isClearableHidden,
  ...rest
}) {
  const updatedOptions = createOptions(options);

  return (
    <Controller
      name={name}
      control={control}
      rules={
        isRequired
          ? {
              required: ERROR_MESSAGE.REQ_ERROR_MSG,
            }
          : {
              required: false,
            }
      }
      render={({ field: { value, onChange, onBlur } }) => (
        <ReactSelect
          styles={customStyles}
          {...rest}
          isClearable={!isClearableHidden}
          options={updatedOptions}
          placeholder={UI.SELECT_OPTION}
          onChange={(option) => {
            const updatedValue = option?.value ? option.value : null;
            onChange(updatedValue);
            updatedOnChange?.(updatedValue);
          }}
          onBlur={onBlur}
          value={
            updatedOptions.find((option) => value === option?.value) || null
          }
          defaultValue={updatedOptions.find(
            (option) => value === option?.value
          )}
        />
      )}
    />
  );
}

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  control: PropTypes.object,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  isClearableHidden: PropTypes.bool,
};

Select.defaultProps = {
  name: undefined,
  options: EMPTY_ARRAY,
  control: EMPTY_OBJECT,
  onChange: noop,
  isRequired: false,
  isClearableHidden: false,
};

export default Select;
