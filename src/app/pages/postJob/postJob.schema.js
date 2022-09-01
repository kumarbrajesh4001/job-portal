import * as yup from 'yup';
import { OTHER_SALARY_ID } from '../../constants';
import ERROR_MESSAGE from '../../constants/errorMsgs';
import VALIDATION_VALUES from '../../constants/validationValues';
import { isNotRemoteLoc } from './postJob.helper';

const POST_JOB_SCHEMA = yup.object().shape({
  title: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG),

  description: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG),
  exp: yup.number().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  jobtype: yup.number().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  worklocation: yup.number().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  education: yup.number().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),

  salary: yup.object().shape({
    id: yup.number().required(ERROR_MESSAGE.REQ_ERROR_MSG),
    min: yup.number().when('id', {
      is: OTHER_SALARY_ID,
      then: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? undefined : value))
        .min(
          VALIDATION_VALUES.ZERO_VALUE,
          ERROR_MESSAGE.MIN_VALUE_MSG + VALIDATION_VALUES.ZERO_VALUE
        )
        .typeError(ERROR_MESSAGE.NUMERIC_VALIDATION_MESSAGE)
        .required(ERROR_MESSAGE.REQ_ERROR_MSG),
    }),
    max: yup.number().when('id', {
      is: OTHER_SALARY_ID,
      then: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? undefined : value))
        .min(
          VALIDATION_VALUES.ZERO_VALUE,
          ERROR_MESSAGE.MIN_VALUE_MSG + VALIDATION_VALUES.ZERO_VALUE
        )
        .typeError(ERROR_MESSAGE.NUMERIC_VALIDATION_MESSAGE)
        .required(ERROR_MESSAGE.REQ_ERROR_MSG),
    }),
  }),
  skills: yup
    .array()
    .min(VALIDATION_VALUES.MIN_VALUE, ERROR_MESSAGE.REQ_ERROR_MSG)
    .required(ERROR_MESSAGE.REQ_ERROR_MSG),
  openings: yup.number().when('alwaysopen', {
    is: false,
    then: yup
      .number()
      .min(1, ERROR_MESSAGE.MIN_VALUE_MSG + 1)
      .typeError(ERROR_MESSAGE.NUMERIC_VALIDATION_MESSAGE)
      .required(ERROR_MESSAGE.REQ_ERROR_MSG),
  }),

  joblocations: yup.array().when('worklocation', {
    is: (value) => isNotRemoteLoc(value),
    then: yup
      .array()
      .transform((value) => (Array.isArray(value) ? value : undefined))
      .min(1, ERROR_MESSAGE.MIN_SHOULD_MSG + 1)
      .required(ERROR_MESSAGE.REQ_ERROR_MSG)
      .nullable(),
  }),
});

export default POST_JOB_SCHEMA;
