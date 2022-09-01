import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';
import { EMPTY_OBJECT } from '../../constants';

function PortalDatePicker(props) {
  const { control, fields, name, error, config, id, isDisabled } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            disabled={isDisabled}
            {...config}
            views={fields}
            value={field.value ? field.value : null}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                id={id}
                fullWidth
                size="small"
                {...params}
                error={!!error.message}
                helperText={error.message}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}
PortalDatePicker.propTypes = {
  control: PropTypes.object,
  fields: PropTypes.array,
  name: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.object,
  config: PropTypes.object,
  isDisabled: PropTypes.bool,
};

PortalDatePicker.defaultProps = {
  control: EMPTY_OBJECT,
  fields: undefined,
  name: undefined,
  id: undefined,
  error: EMPTY_OBJECT,
  config: EMPTY_OBJECT,
  isDisabled: false,
};

export default PortalDatePicker;
