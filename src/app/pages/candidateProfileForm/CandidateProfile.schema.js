import * as yup from 'yup';
import { EMPTY_OBJECT } from '../../constants';
import ERROR_MESSAGE from '../../constants/errorMsgs';
import REGEX_PATTERN from '../../constants/regex';

import VALIDATION_VALUES from '../../constants/validationValues';

const CANDIDATE_PROFILE_SCHEMA = yup.object().shape({
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
  passport: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_64,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
    ),
  email: yup
    .string()
    .email(ERROR_MESSAGE.VALID_EMAIL)
    .required(ERROR_MESSAGE.REQ_ERROR_MSG),
  mobile: yup
    .string()
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
  city: yup.object().shape({
    shortname: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG),
  }),
  dob: yup
    .date()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .typeError(ERROR_MESSAGE.INVALID_DATE)
    .nullable(),
  gender: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  joining: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  jobtype: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  loctype: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  joblocations: yup.array().when('anyjoblocation', {
    is: false,
    then: yup
      .array()
      .transform((value) => (Array.isArray(value) ? value : undefined))
      .min(VALIDATION_VALUES.MIN_VALUE, ERROR_MESSAGE.REQ_ERROR_MSG)
      .required(ERROR_MESSAGE.REQ_ERROR_MSG)
      .nullable(),
  }),
  expSalary: yup
    .object()
    .default(EMPTY_OBJECT)
    .shape({
      salary: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? undefined : value))
        .when('any', {
          is: false,
          then: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? undefined : value))
            .min(
              VALIDATION_VALUES.ZERO_VALUE,
              ERROR_MESSAGE.MIN_VALUE_MSG + VALIDATION_VALUES.ZERO_VALUE
            )
            .max(
              VALIDATION_VALUES.MAX_POSITIVE_INTEGER_VALUE,
              ERROR_MESSAGE.MAX_VALUE_MSG +
                VALIDATION_VALUES.MAX_POSITIVE_INTEGER_VALUE
            )
            .required(ERROR_MESSAGE.REQ_ERROR_MSG),
        }),
    }),
  jobexp: yup.number().when('fresher', {
    is: false,
    then: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .nullable()
      .min(
        VALIDATION_VALUES.DECIMAL_ONE,
        ERROR_MESSAGE.MIN_VALUE_MSG + VALIDATION_VALUES.DECIMAL_ONE
      )
      .max(
        VALIDATION_VALUES.MAX_PCT_VALUE_100,
        ERROR_MESSAGE.MAX_VALUE_MSG + VALIDATION_VALUES.MAX_PCT_VALUE_100
      )
      .typeError(ERROR_MESSAGE.NUMERIC_VALIDATION_MESSAGE)
      .required(ERROR_MESSAGE.REQ_ERROR_MSG),
  }),
  address: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_128,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_128
    ),
  about: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1048576,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1048576
    ),
  achievements: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_10240,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_10240
    ),

  acadexcellence: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_10240,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_10240
    ),
  patents: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_10240,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_10240
    ),
  projects: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_10240,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_10240
    ),
  hobbies: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1024,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1024
    ),
  profile: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1024,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1024
    ),
  skills: yup
    .array()
    .min(VALIDATION_VALUES.MIN_VALUE)
    .required(ERROR_MESSAGE.REQ_ERROR_MSG),
  education: yup
    .array()
    .min(VALIDATION_VALUES.MIN_VALUE)
    .required(ERROR_MESSAGE.REQ_ERROR_MSG),
  linkedin: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1024,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1024
    ),
  github: yup
    .string()
    .max(
      VALIDATION_VALUES.MAX_VALUE_1024,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_1024
    ),
});

export default CANDIDATE_PROFILE_SCHEMA;
