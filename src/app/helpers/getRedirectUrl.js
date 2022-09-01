import { EMPTY_OBJECT } from '../constants';
import LOGIN_TYPE from '../constants/loginType';
import URL from '../constants/urls';

function getRedirectUrl(currentUrl) {
  const { pathname, search } = window.location || EMPTY_OBJECT;
  return `${currentUrl}?redirectTo=${encodeURIComponent(pathname + search)}`;
}

export const getUrlAndRedirect = (currentUrl) => {
  const redirectUrl = getRedirectUrl(currentUrl);
  window.location.href = redirectUrl;
};

export const getDefaultUrlBasedOnRoleAndStatus = (
  loggedInUserRole,
  profileupdated
) => {
  let navigateUrl = URL.LOGIN;
  if (loggedInUserRole === LOGIN_TYPE.CANDIDATE) {
    if (profileupdated) {
      navigateUrl = URL.MY_JOBS;
    } else {
      navigateUrl = URL.CANDIDATE_PROFILE;
    }
  } else if (loggedInUserRole === LOGIN_TYPE.EMPLOYER) {
    if (profileupdated) {
      navigateUrl = URL.FIND_CANDIDATES;
    } else {
      navigateUrl = URL.EMPLOYER_PROFILE;
    }
  }

  return navigateUrl;
};

export const getDefaultHomeUrl = (loggedInUserRole) => {
  if (loggedInUserRole === LOGIN_TYPE.EMPLOYER) {
    return URL.FIND_CANDIDATES;
  }
  return URL.FIND_JOBS;
};

export default getRedirectUrl;
