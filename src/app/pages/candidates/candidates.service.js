import { DEFAULT_CONTEXT_ID } from '../../constants';
import { getRequest, postRequest } from '../../services';
import isStringEmpty from '../../helpers/isStringEmpty';

const makeRequestDTO = (remark) => {
  if (!isStringEmpty(remark)) {
    return { remark };
  }
  return undefined;
};

export const updateCandidateStateService = (stateId, candidateId, remark) =>
  postRequest(
    `/employer/candidate/${candidateId}/action/${stateId}`,
    makeRequestDTO(remark)
  );

export const getCandidateDetail = (candidateId, context = DEFAULT_CONTEXT_ID) =>
  getRequest(`/candidate/${candidateId}?context=${context}`);
