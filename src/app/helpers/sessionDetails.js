import STORAGE_KEY from '../constants/storageKey';

export const getLoginDetailFromSession = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY.SESSION_DETAILS));

export const setLoginDetailInSession = (sessionDetails) => {
  localStorage.setItem(
    STORAGE_KEY.SESSION_DETAILS,
    JSON.stringify(sessionDetails)
  );
};
