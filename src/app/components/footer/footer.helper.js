import {
  CANDIDATE_FOOTER,
  EMPLOYER_FOOTER,
  PUBLIC_FOOTER,
} from './footer.constants';
import LOGIN_TYPE from '../../constants/loginType';
import UI from '../../constants/ui';
import URL_ID from '../../constants/footerUrlIds';

const getCommonNavigation = (footerFromBootstrapById) => ({
  heading: UI.MY_COMPANY_NAME,
  columns: [
    {
      ...footerFromBootstrapById[URL_ID.ABOUT],
    },
    {
      ...footerFromBootstrapById[URL_ID.PRIVACY],
    },
    {
      ...footerFromBootstrapById[URL_ID.TERMS],
    },
    {
      ...footerFromBootstrapById[URL_ID.FAQ],
    },
    {
      ...footerFromBootstrapById[URL_ID.FEEDBACK],
    },
  ],
});

const getSocialNavigation = (footerFromBootstrapById) => ({
  heading: UI.SOCIAL,
  columns: [
    {
      ...footerFromBootstrapById[URL_ID.LINKEDIN],
    },
    {
      ...footerFromBootstrapById[URL_ID.FACEBOOK],
    },
    {
      ...footerFromBootstrapById[URL_ID.TWITTER],
    },
    {
      ...footerFromBootstrapById[URL_ID.INSTAGRAM],
    },
  ],
});

const getFooterConfig = (footerFromBootstrapById, loggedInUserRole) => {
  const commonNavigation = getCommonNavigation(footerFromBootstrapById);
  const socialNavigation = getSocialNavigation(footerFromBootstrapById);

  let CONFIG = [commonNavigation];

  if (loggedInUserRole === LOGIN_TYPE.CANDIDATE) {
    CONFIG = [...CONFIG, ...CANDIDATE_FOOTER];
  } else if (loggedInUserRole === LOGIN_TYPE.EMPLOYER) {
    CONFIG = [...CONFIG, ...EMPLOYER_FOOTER];
  } else {
    CONFIG = [...CONFIG, ...PUBLIC_FOOTER];
  }

  CONFIG = [...CONFIG, socialNavigation];
  return CONFIG;
};

export default getFooterConfig;
