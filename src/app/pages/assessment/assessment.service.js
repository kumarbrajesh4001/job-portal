import { getGuideline } from '../../constants/apiUrls';
import { getRequest } from '../../services';

const getAssessmentGuidelines = (techIdParam) =>
  getRequest(getGuideline(techIdParam));

export default getAssessmentGuidelines;
