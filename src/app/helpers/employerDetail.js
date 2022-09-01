import STORAGE_KEY from '../constants/storageKey';

export const getEmployerDetailFromSession = () => {
  const employerDetail = JSON.parse(
    localStorage.getItem(STORAGE_KEY.EMPLOYER_DETAILS)
  );
  return employerDetail;
};

export const setEmployerDetailInSession = (employerDetail) => {
  localStorage.setItem(
    STORAGE_KEY.EMPLOYER_DETAILS,
    JSON.stringify(employerDetail)
  );
};
