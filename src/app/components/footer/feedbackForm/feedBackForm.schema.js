import * as yup from 'yup';

import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';
import REGEX_PATTERN from '../../../constants/regex';

const FEEDBACK_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .nullable()
    .min(
      VALIDATION_VALUES.MIN_VALUE,
      ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE
    )
    .max(
      VALIDATION_VALUES.MAX_VALUE_64,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
    ),
  email: yup
    .string()
    .nullable()
    .email(ERROR_MESSAGE.VALID_EMAIL)
    .required(ERROR_MESSAGE.REQ_ERROR_MSG),
  phone: yup
    .string()
    .nullable()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .matches(REGEX_PATTERN.PHONE_NUMBER, ERROR_MESSAGE.PHONE_VALIDATION_MESSAGE)
    .min(
      VALIDATION_VALUES.MAX_VALUE_10,
      ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_10
    )
    .max(
      VALIDATION_VALUES.MAX_VALUE_15,
      ERROR_MESSAGE.MAX_VALUE_MSG + VALIDATION_VALUES.MAX_VALUE_15
    ),
  comments: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .nullable()
    .max(
      VALIDATION_VALUES.MAX_VALUE_2048,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_2048
    ),
});

export default FEEDBACK_SCHEMA;
