import { DEFAULT_CONTEXT_ID } from '../../constants';
import { getRequest, postRequest } from '../../services';

export const updateCandidateStateService = (stateId, employerId) =>
  postRequest(`/candidate/employer/${employerId}/action/${stateId}`);

export const getEmployerDetail = (employerId, context = DEFAULT_CONTEXT_ID) =>
  getRequest(`/employer/${employerId}?context=${context}`);
