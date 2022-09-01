import ASSET_TYPE from './assets';

const EMPLOYER_LOGO_SIZE = 102400;
const CANDIDATE_PROFILE_PHOTO_SIZE = 102400;
const CANDIDATE_ID_PROOF_SIZE = 102400;
const CANDIDATE_RESUME_SIZE = 1048576;

const getFileSize = (requestMaker) => {
  switch (requestMaker) {
    case ASSET_TYPE.RESUME:
      return CANDIDATE_RESUME_SIZE;
    case ASSET_TYPE.PHOTO:
      return CANDIDATE_PROFILE_PHOTO_SIZE;
    case ASSET_TYPE.ID_PROOF:
      return CANDIDATE_ID_PROOF_SIZE;
    case ASSET_TYPE.LOGO:
      return EMPLOYER_LOGO_SIZE;
    default:
      return undefined;
  }
};

export const getFileSizeForDisplay = (requestMaker) =>
  getFileSize(requestMaker) / 1024;

export default getFileSize;
