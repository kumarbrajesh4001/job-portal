import getSanitizedValues from '../../helpers/emptyFieldsValidation';
import { getLoginDetailFromSession } from '../../helpers/sessionDetails';
import { REMOTE_ID } from '../../constants';

export const requestDTO = (formData) => {
  const sanitizedValues = getSanitizedValues(formData);
  return {
    ...sanitizedValues,
    employerid: getLoginDetailFromSession().entityId,
    employer: getLoginDetailFromSession().name,
  };
};

export const isNotRemoteLoc = (value) => value !== REMOTE_ID && value !== '';
