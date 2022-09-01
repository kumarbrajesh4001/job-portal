import { getCandidateJobStateList } from '../../formatter/candidateBootstrap';
import CANDIDATE_JOB_STATES from '../../constants/candidateJobStates';

const getCandidateJobsStateList = () => {
  const candidateJobStateList = getCandidateJobStateList()?.filter(
    (item) =>
      item.id === CANDIDATE_JOB_STATES.MATCHING ||
      item.id === CANDIDATE_JOB_STATES.SHORTLISTED ||
      item.id === CANDIDATE_JOB_STATES.NOT_SUITABLE
  );

  const matching = candidateJobStateList.pop();
  candidateJobStateList.unshift(matching);
  return candidateJobStateList;
};

export default getCandidateJobsStateList;
