import getSanitizedValues from '../../helpers/emptyFieldsValidation';
import { FRESHER_ID } from '../../constants';
import getProfileCompletitionPercentage from '../../helpers/getProfileCompletitionPercentage';

function requestDTO(
  formData,
  educationList,
  skills,
  tools,
  certifications,
  jobs,
  breaks,
  language,
  community,
  schooling,
  isFresher,
  city,
  candidateKeyList
) {
  const completeFormData = {
    ...formData,

    education: educationList,
    skills,
    tools,
    certifications,
    jobs,
    city,
    breaks,
    lang: language,
    community,
    schooling,
    jobexp: isFresher ? FRESHER_ID : formData.jobexp,
  };
  const sanitizedValues = getSanitizedValues(completeFormData);
  const profilepct = getProfileCompletitionPercentage(
    candidateKeyList,
    sanitizedValues
  );
  return {
    ...sanitizedValues,
    profilepct,
  };
}

export default requestDTO;
