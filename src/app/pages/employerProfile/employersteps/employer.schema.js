/* eslint-disable no-loss-of-precision */

import * as yup from 'yup';
import { HEAR_OTHER_ID } from '../../../constants';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import REGEX_PATTERN from '../../../constants/regex';
import VALIDATION_VALUES from '../../../constants/validationValues';

const EMPLOYER_PROFILE_SCHEMA = yup.object().shape({
  // CompanyInformation
  name: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
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
    .email(ERROR_MESSAGE.VALID_EMAIL)
    .required(ERROR_MESSAGE.REQ_ERROR_MSG),
  tagline: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_64,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
    ),
  gst: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_64,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
    ),
  brief: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1048576,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1048576
    ),

  // ContactInformation
  contactperson: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .min(
      VALIDATION_VALUES.MIN_VALUE,
      ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE
    )
    .max(
      VALIDATION_VALUES.MAX_VALUE_64,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
    ),
  contactrole: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .min(
      VALIDATION_VALUES.MIN_VALUE,
      ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE
    )
    .max(
      VALIDATION_VALUES.MAX_VALUE_128,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_128
    ),
  contactnumber: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .matches(REGEX_PATTERN.PHONE_NUMBER, ERROR_MESSAGE.PHONE_VALIDATION_MESSAGE)
    .min(
      VALIDATION_VALUES.MAX_VALUE_10,
      ERROR_MESSAGE.MIN_VALUE_MSG + VALIDATION_VALUES.MAX_VALUE_10
    )
    .max(
      VALIDATION_VALUES.MAX_VALUE_15,
      ERROR_MESSAGE.MAX_VALUE_MSG + VALIDATION_VALUES.MAX_VALUE_15
    ),
  city: yup.object().shape({
    shortname: yup.string().required(),
  }),
  address: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_128,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_128
    ),
  website: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1024,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1024
    ),

  // OtherInformation
  linkedin: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1024,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1024
    ),
  facebook: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1024,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1024
    ),
  twitter: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1024,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1024
    ),

  hearaboutus: yup.number().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  hearothers: yup.string().when('hearaboutus', {
    is: HEAR_OTHER_ID,
    then: yup
      .string()
      .required(ERROR_MESSAGE.REQ_ERROR_MSG)
      .max(
        VALIDATION_VALUES.MAX_VALUE_64,
        ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
      ),
  }),
});

export default EMPLOYER_PROFILE_SCHEMA;
