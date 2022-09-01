import getSanitizedValues from '../../helpers/emptyFieldsValidation';
import getProfileCompletitionPercentage from '../../helpers/getProfileCompletitionPercentage';

function requestDTO(formData, techstacks, employerKeyList) {
  const completeFormData = {
    ...formData,
    techstack: techstacks,
  };
  const sanitizedValues = getSanitizedValues(completeFormData);
  const profilepct = getProfileCompletitionPercentage(
    employerKeyList,
    sanitizedValues
  );
  return {
    ...sanitizedValues,
    profilepct,
  };
}
export default requestDTO;
