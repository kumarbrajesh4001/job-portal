import { DEFAULT_CONTEXT_ID } from '../../constants';
import { getRequest, postRequest } from '../../services';

export const updateJobStateService = (stateId, job, isMyProfileActivity) => {
  let response;
  if (isMyProfileActivity) {
    response = postRequest(
      `/candidate/employer/${job.employerid}/action/${stateId}`
    );
  } else {
    response = getRequest(
      `/candidate/job/${job.id}/action/${stateId}?employerId=${job.employerid}`
    );
  }
  return response;
};

export const getJobDetail = (job, context = DEFAULT_CONTEXT_ID) =>
  getRequest(
    `/employer/job/${job.id}?context=${context}&employerId=${job.employerid}`
  );

export const getPostedJob = (employerId, page, sortby) =>
  getRequest(
    `/employer/published/job?employerId=${employerId}&page=${page}&sortby=${sortby}`
  );
