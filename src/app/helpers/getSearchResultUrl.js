import URL from '../constants/urls';

const getSearchResultUrl = (isEmployer) =>
  isEmployer ? URL.FIND_CANDIDATES_SEARCHES : URL.FIND_JOBS_SEARCHES;

export default getSearchResultUrl;
