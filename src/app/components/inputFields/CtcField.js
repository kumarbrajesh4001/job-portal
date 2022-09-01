import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';
import { noop } from 'lodash';

const NumberFormatCustom = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₹"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function FormattedInputs(props) {
  const { setCtc, ctc, fullWidth } = props;

  const handleChange = (event) => {
    const formattedCtc = new Intl.NumberFormat('en-IN').format(
      event.target.value
    );
    setCtc(formattedCtc);
  };

  return (
    <TextField
      fullWidth={fullWidth}
      value={ctc}
      onChange={handleChange}
      name="numberformat"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      variant="outlined"
      size="small"
    />
  );
}
FormattedInputs.propTypes = {
  setCtc: PropTypes.func,
  ctc: PropTypes.string,
  fullWidth: PropTypes.bool,
};

FormattedInputs.defaultProps = {
  setCtc: noop,
  ctc: undefined,
  fullWidth: false,
};
export default FormattedInputs;
