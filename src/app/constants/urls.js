const URL = {
  HOME: '/',
  FIND_JOBS: '/find-jobs',
  SEO_FIND_JOBS: '/find-jobs/:skillsAndLocations',
  FIND_JOBS_SEARCHES: '/find-jobs/searches',
  FIND_CANDIDATES: '/find-candidates',
  SEO_FIND_CANDIDATES: '/find-candidates/:skillsAndLocations',
  FIND_CANDIDATES_SEARCHES: '/find-candidates/searches',
  POST_JOB: '/postjob',
  CANDIDATE_PROFILE: '/candidate-profile-form',
  FOR_EMPLOYER: '/company-profile',
  POSTED_JOBS: '/postedjobs',
  JOB_STATUS: '/job-status',
  EMPLOYER_PROFILE: '/employer',
  EMPLOYER_DETAILS: '/employer-details',
  PAYMENT: '/payment',
  MY_CANDIDATES: '/my-candidates',
  MY_JOBS: '/my-jobs',
  My_Profile_Activity: '/my-profile-Activity',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verifyemail',
  CONFIRM_EMAIL: '/confirmemail',
  FORGOT_PASSWORD: '/forgotpassword',
  RESEND_EMAIL: '/resendemail',
  UPDATE_PASSWORD: '/updatepassword',
  CHANGE_PASSWORD: '/changepassword',
  CONFIRM: '/confirm',
  GUIDELINES: '/guidelines',
  ASSESSMENT: '/assessment',
  START_ASSESSMENT: '/startassessment',
};
export default URL;

const URL_TYPE = {
  CANDIDATE: 1,
  EMPLOYER: 2,
  COMMON: 3,
  PUBLIC: 4,
};

export const ROLES_TYPES = {
  CANDIDATE: [URL_TYPE.CANDIDATE],
  EMPLOYER: [URL_TYPE.EMPLOYER],
  COMMON: [URL_TYPE.CANDIDATE, URL_TYPE.EMPLOYER],
  PUBLIC: [URL_TYPE.PUBLIC],
};
