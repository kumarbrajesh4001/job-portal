import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { EMPTY_ARRAY } from '../../constants';
import ERROR_MESSAGE from '../../constants/errorMsgs';
import getUniqueList from '../../helpers/uniqueList';

function MultiInput(props) {
  const { setValue, value, maxLength } = props;
  const [inputValue, setInputValue] = useState('');
  return (
    <Autocomplete
      multiple
      freeSolo
      id="tags-standard"
      options={[]}
      value={value}
      inputValue={inputValue}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        const options = newInputValue.split(',');

        if (options.length > 1) {
          const allOptions = value.concat(options);
          const uniqueList = getUniqueList(allOptions);
          setValue(uniqueList);
          setInputValue('');
        } else {
          setInputValue(newInputValue);
        }
      }}
      onBlur={() => {
        if (inputValue !== '') {
          const uniqueList = getUniqueList([...value, inputValue]);
          setInputValue('');
          setValue(uniqueList);
        }
      }}
      renderInput={(params) => (
        <TextField
          variant="outlined"
          {...params}
          inputProps={{ ...params.inputProps, maxLength }}
          placeholder={ERROR_MESSAGE.MULTIPLE_VALUES_MESSAGE}
        />
      )}
    />
  );
}
MultiInput.propTypes = {
  value: PropTypes.array,
  setValue: PropTypes.func,
  maxLength: PropTypes.number,
};

MultiInput.defaultProps = {
  value: EMPTY_ARRAY,
  setValue: noop,

  maxLength: ERROR_MESSAGE.MAX_VALUE_64,
};

export default MultiInput;
