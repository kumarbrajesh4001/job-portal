import { getCandidateTypeList } from '../../formatter/employerBootstrap';
import { getRequest } from '../../services';

export const getCandidatesTypeList = () =>
  getCandidateTypeList().filter((item) => item.id > 2 && item.id < 5);

export const getJobData = (jobId, setJobTitle) => {
  getRequest(`/employer/job/${jobId}`).then((response) => {
    setJobTitle(response?.title);
  });
};

export const getRedirectUrl = (jobId, candidateType) =>
  `?jobId=${jobId}&candidateType=${candidateType}`;
