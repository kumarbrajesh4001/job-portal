/* eslint-disable no-nested-ternary */
import URL from '../../constants/urls';
import LOGIN_TYPE from '../../constants/loginType';

const getCurrentHomeUrl = (loggedInUser) =>
  loggedInUser === LOGIN_TYPE.EMPLOYER ? URL.FIND_CANDIDATES : URL.FIND_JOBS;

export const getFirstPathName = (pathname) => {
  const firstPathName = pathname?.split('/')?.[1];
  if (firstPathName) {
    return `/${firstPathName}`;
  }
  return '/';
};

export default getCurrentHomeUrl;
