import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import DialogActions from '@mui/material/DialogActions';
import { useForm } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import VALIDATION_VALUES from '../../../constants/validationValues';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import REGEX from '../../../constants/regex';
import UI from '../../../constants/ui';
import { getFormattedNumber } from '../../../formatter/number';

const inputProps = { step: 100, min: 0 };
function BuyCreditPoints(props) {
  const { onHandleDisplayPriceDetails } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const amountforBuyPoints = watch('amountforBuyPoints', 0);

  return (
    <>
      <DialogContent>
        <label htmlFor="amount" className="subtitle-1 color-000000">
          {UI.AMOUNT}
        </label>
        <div>
          <TextField
            autoFocus
            {...register('amountforBuyPoints', {
              pattern: {
                value: REGEX.AMOUNT_FORMAT_IN_100_MULTIPLE,
                message: ERROR_MESSAGE.AMOUNT_IN_100_MULTIPLE_ERROR_MSG,
              },
              required: ERROR_MESSAGE.REQ_ERROR_MSG,
              min: {
                value: VALIDATION_VALUES.MAX_PCT_VALUE_100,
                message:
                  ERROR_MESSAGE.MIN_VALUE_MSG +
                  VALIDATION_VALUES.MAX_PCT_VALUE_100,
              },
              max: {
                value: VALIDATION_VALUES.MAX_POSITIVE_INTEGER_VALUE,
                message:
                  ERROR_MESSAGE.MAX_AMOUNT_ERROR_MSG +
                  VALIDATION_VALUES.MAX_POSITIVE_INTEGER_VALUE,
              },
            })}
            placeholder={UI.ENTER_AMOUNT}
            id="amount"
            variant="outlined"
            size="small"
            type="number"
            fullWidth
            error={!!errors.amountforBuyPoints?.message}
            helperText={
              errors.amountforBuyPoints?.message
                ? errors.amountforBuyPoints?.message
                : `${UI.POINTS_WILL_BE_ADDED}: ${
                    amountforBuyPoints > 0
                      ? getFormattedNumber(amountforBuyPoints / 100)
                      : 0
                  }`
            }
            inputProps={inputProps}
          />
        </div>
        <label htmlFor="discount" className="subtitle-1 color-000000 mt-2 mb-1">
          {UI.APPLY_DISCOUNT_CODE}
          <span className="ms-1 caption color-AAAAAA">{UI.OPTIONAL}</span>
        </label>

        <TextField
          {...register('discountCode', {
            maxLength: {
              value: VALIDATION_VALUES.MAX_VALUE_40,
              message:
                ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_40,
            },
          })}
          fullWidth
          placeholder={UI.PLACEHOLDER_DISCOUNT_CODE}
          id="discount"
          size="small"
          error={!!errors.discountCode?.message}
        />
        <FormHelperText error>
          <span> </span>
          {errors.discountCode?.message}
        </FormHelperText>

        <div className="mt-2">
          <Button onClick={handleSubmit()} variant="outlined" type="button">
            {UI.APPLY_BUTTON}
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmit(onHandleDisplayPriceDetails)}
        >
          {UI.BUTTON_NEXT}
        </Button>
      </DialogActions>
    </>
  );
}

BuyCreditPoints.propTypes = {
  onHandleDisplayPriceDetails: PropTypes.func,
};

BuyCreditPoints.defaultProps = {
  onHandleDisplayPriceDetails: noop,
};

export default BuyCreditPoints;
