import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import UI from '../../constants/ui';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  disableScrollLock: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function MultiSelect({
  name,
  options,
  setChipLabel,
  setValues,
  values,
  control,
  ...rest
}) {
  const handleChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    const optionsSelected =
      typeof value === 'string' ? value.split(',') : value;
    setValues(optionsSelected);
  }, EMPTY_ARRAY);

  const handleDelete = useCallback(
    (e, value) => {
      const selectedValuesOfArray = [...values]; // make a separate copy of the array
      const index = selectedValuesOfArray.indexOf(value);
      if (index !== -1) {
        selectedValuesOfArray.splice(index, 1);
        setValues(selectedValuesOfArray);
      }
    },
    [values]
  );

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={() => (
          <Select
            {...rest}
            displayEmpty
            // id="multiple-checkbox"
            multiple
            value={values}
            onChange={handleChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return UI.SELECT_OPTION;
              }
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={setChipLabel(value)}
                      clickable
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onDelete={(e) => handleDelete(e, value)}
                    />
                  ))}
                </Box>
              );
            }}
            MenuProps={MenuProps}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <Checkbox checked={values.indexOf(option.id) > -1} />
                <ListItemText primary={option.value} />
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}

MultiSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  control: PropTypes.object,
  setValues: PropTypes.func,
  setChipLabel: PropTypes.func,
  values: PropTypes.array,
};

MultiSelect.defaultProps = {
  name: undefined,
  options: EMPTY_ARRAY,
  control: EMPTY_OBJECT,
  setValues: noop,
  setChipLabel: noop,
  values: EMPTY_ARRAY,
};

export default MultiSelect;
