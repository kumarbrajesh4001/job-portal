import * as yup from 'yup';

import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';

const EDUCATION_SCHEMA = yup.object().shape({
  college: yup.string().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  degree: yup.number().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),
  course: yup.string().nullable(),
  pct: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .min(VALIDATION_VALUES.ZERO_VALUE)
    .max(VALIDATION_VALUES.MAX_PCT_VALUE_100),
  cgpa: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .min(VALIDATION_VALUES.ZERO_VALUE)
    .max(VALIDATION_VALUES.MAX_VALUE_10),
});

export default EDUCATION_SCHEMA;
