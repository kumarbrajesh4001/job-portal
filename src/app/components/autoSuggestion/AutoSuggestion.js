import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import debounce from 'lodash/debounce';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import KEYCODES from '../../constants/keyCodes';
import { getRequest } from '../../services';
import isStringEmpty from '../../helpers/isStringEmpty';
import getUniqueList from '../../helpers/uniqueList';
import VALIDATION_VALUES from '../../constants/validationValues';

function AutoSuggestion(props) {
  const {
    id,
    values,
    maxLength,
    setValues,
    placeholder,
    isMulti,
    isRequired,
    name,
    control,
  } = props;
  const [keywordsTextFieldValue, setKeywordsTextFieldValue] = useState('');
  const [dataAutosuggest, setDataAutosuggest] = useState(EMPTY_ARRAY);
  const [searchKey, setSearchKey] = useState('');

  const onChange = useCallback(
    (e, valueFromAutoSuggestion) => {
      if (!valueFromAutoSuggestion) {
        setValues('');
      } else {
        setValues(valueFromAutoSuggestion);
      }
    },
    [values]
  );

  useEffect(() => {
    if (values && !isMulti) {
      setKeywordsTextFieldValue(values);
    } else {
      setKeywordsTextFieldValue('');
    }
  }, [values, isMulti]);

  const isMultiField = useMemo(
    () =>
      isMulti
        ? {
            multiple: true,
            value: values,
          }
        : { value: keywordsTextFieldValue },
    [isMulti, values, keywordsTextFieldValue]
  );

  useEffect(() => {
    if (!isStringEmpty(searchKey)) {
      getRequest(`/autosuggest/tech?q=${searchKey}`).then((tech) => {
        setDataAutosuggest(tech);
      });
    }
  }, [searchKey]);

  const debouncedSetSearchKey = useCallback(
    debounce(setSearchKey, 200),
    EMPTY_ARRAY
  );

  const onInputChange = (event, newInputValue) => {
    if (!newInputValue.includes(',')) {
      setKeywordsTextFieldValue(newInputValue);
      debouncedSetSearchKey(newInputValue);
      if (!isMulti) {
        setValues(newInputValue);
      }
    }
    if (isMulti) {
      const options = newInputValue.split(',');
      if (options.length > 1) {
        const allOptions = values.concat(options);
        const uniqueList = getUniqueList(allOptions);
        setValues(uniqueList);
        setKeywordsTextFieldValue('');
      } else {
        setKeywordsTextFieldValue(newInputValue);
      }
    }
  };

  return (
    <Stack spacing={3}>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            {...isMultiField}
            id={id}
            freeSolo
            size="small"
            onChange={onChange}
            options={dataAutosuggest?.map((option) => option?.dispName)}
            onInputChange={onInputChange}
            inputValue={keywordsTextFieldValue}
            name={name}
            renderInput={(params) => (
              <TextField
                {...params}
                required={isRequired}
                error={!!error} // TODO: ADD
                // helperText={error?.message} // TODO: ADD
                variant="outlined"
                inputProps={{ ...params.inputProps, maxLength }}
                placeholder={placeholder}
                onKeyDown={(e) => {
                  if (isMulti) {
                    if (e.keyCode === KEYCODES.COMMA_CODE && e.target.value) {
                      setValues(values.concat(e.target.value));
                    }
                  }
                }}
              />
            )}
          />
        )}
      />
    </Stack>
  );
}

AutoSuggestion.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  values: PropTypes.array,
  setValues: PropTypes.func,
  maxLength: PropTypes.number,
  isMulti: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  control: PropTypes.object,
};

AutoSuggestion.defaultProps = {
  id: undefined,
  placeholder: undefined,
  values: EMPTY_ARRAY,
  setValues: noop,
  maxLength: VALIDATION_VALUES.MAX_VALUE_64,
  isMulti: false,
  isRequired: false,
  name: undefined,
  control: EMPTY_OBJECT,
};

export default AutoSuggestion;
