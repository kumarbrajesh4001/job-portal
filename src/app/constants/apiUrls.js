import ASSET_TYPE from './assets';

const UPLOAD_URL = {
  CANDIDATE_RESUME_UPLOAD_URL: '/file/candidate/resume/upload',
  CANDIDATE_PHOTO_UPLOAD_URL: '/file/candidate/photo/upload',
  CANDIDATE_IDPROOF_UPLOAD_URL: '/file/candidate/idproof/upload',
  EMPLOYER_LOGO_UPLOAD_URL: '/file/employer/logo/upload',
};
//
export const API_URL = {
  LOGIN: '/api/v1/login',
  JOB_COUNT: '/search/jobcount',
  CANDIDATE_COUNT: '/search/candidatecount',
  CANDIDATE_REGISTER: '/candidate',
  EMPLOYER_PROFILE: '/employer/self/profile',
  DELETE_FILE: '/file/delete?file=',
  PHOTO_PRE: '/api/v1/file/download?file=',
  RESUME_PRE: '/api/v1/file/candidate/resume/download?file=',
  ID_PROOF_PRE: '/api/v1/file/candidate/idproof/download?file=',
  CANDIDATE_SELF_PROFILE: '/candidate/self/profile',
  ASSESSMENT_START: '/assessment/start',
  AVAILABLE_ASSESSMENT: '/common/assessments',
  COMPLETE_ASSESSMENT: '/candidate/assessments',
  GUIDELINE: '/assessment/guideline',
  CREDENTIAL: '/credential',
  PRE_ASSESSMENT_CHECK: '/candidate/preassessmentcheck',
  POINTS: '/txn/points',
  HISTORY: '/txn/history',
  COUPON: '/txn/coupon/apply',
  PAYMENT_UPDATE: '/txn/payment/update',
  FEEDBACK: '/common/feedback',
};

export const getAssessmentHistory = (techId) =>
  `/candidate/${techId}/assessments`;

export const getCompleteAssessment = (state) =>
  `/candidate/assessments?state=${state}`;

export const getPostJobUrl = (currentJobId, jobPostMode) =>
  `/employer/job/${currentJobId}/action/${jobPostMode}`;

export const getEmployerJobData = (jobId) => `/employer/job/${jobId}`;

export const getFileUploadUrl = (requestMaker) => {
  switch (requestMaker) {
    case ASSET_TYPE.RESUME:
      return UPLOAD_URL.CANDIDATE_RESUME_UPLOAD_URL;
    case ASSET_TYPE.PHOTO:
      return UPLOAD_URL.CANDIDATE_PHOTO_UPLOAD_URL;
    case ASSET_TYPE.ID_PROOF:
      return UPLOAD_URL.CANDIDATE_IDPROOF_UPLOAD_URL;
    case ASSET_TYPE.LOGO:
      return UPLOAD_URL.EMPLOYER_LOGO_UPLOAD_URL;
    default:
      return undefined;
  }
};

export const getCouponUrl = (couponCode) =>
  `${API_URL.COUPON}?code=${couponCode}`;

export const getAvailableAssessment = (type, category) =>
  `${API_URL.AVAILABLE_ASSESSMENT}?type=${type}&category=${category}`;

export const getAccept = (assessmentId, isVisible) =>
  `/candidate/assessment/${assessmentId}/accept?accept=${isVisible}`;

export const getPreUnlockCheck = (candidateId) =>
  `/employer/candidate/${candidateId}/preunlockcheck`;

export const getAssessmentStart = (techId) =>
  `${API_URL.ASSESSMENT_START}?techId=${techId}`;

export const getGuideline = (techId) => `${API_URL.GUIDELINE}?techId=${techId}`;

export const getTerminateAssessment = (assessmentId) =>
  `/assessment/${assessmentId}/terminate`;

export const getAssessmentSubmit = (assessmentId) =>
  `/assessment/${assessmentId}/submit`;

export const getFlipQuestion = (assessmentId) =>
  `/assessment/${assessmentId}/flip`;

export const getQuestions = (assessmentId, requestQuesNo) =>
  `/assessment/${assessmentId}/ques/${requestQuesNo}`;

export const getTxnTokenUrl = (product, amount) =>
  `txn/token/generate?product=${product}&amount=${amount}`;

export const getPaytmScriptUrl = (mid) =>
  `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${mid}.js`;

export const getGoogleMapScriptUrl = (KEY) =>
  `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places`;
