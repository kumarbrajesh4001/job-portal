import { getCandidateTypeList } from '../../formatter/employerBootstrap';
import CANDIDATE_TYPE from '../../constants/candidateType';
import UI from '../../constants/ui';

export const getCandidatesTypeList = () =>
  getCandidateTypeList()
    .filter(
      (item) =>
        item.id === CANDIDATE_TYPE.UNLOCK ||
        item.id === CANDIDATE_TYPE.SHORTLISTED ||
        item.id === CANDIDATE_TYPE.NOT_SUITABLE
    )
    .map((candidateTypeItem) => {
      if (candidateTypeItem.id === CANDIDATE_TYPE.UNLOCK) {
        return { ...candidateTypeItem, value: UI.ALL };
      }
      return candidateTypeItem;
    });

// Unlocked, Interviewed, Offered, Accepted, Rejected, Hired, Rejected by me
export const getCandidateTypeForUnlocked = () =>
  getCandidateTypeList().reduce((candidateTypes, item) => {
    if (
      item.id === CANDIDATE_TYPE.UNLOCK ||
      item.id === CANDIDATE_TYPE.INTERVIEWED ||
      item.id === CANDIDATE_TYPE.ACCEPTED_BY_CANDIDATE ||
      item.id === CANDIDATE_TYPE.REJECTED_BY_EMPLOYER ||
      item.id === CANDIDATE_TYPE.HIRED ||
      item.id === CANDIDATE_TYPE.REJECTED_BY_CANDIDATE ||
      item.id === CANDIDATE_TYPE.BLOCKED_BY_EMPLOYER
    ) {
      candidateTypes.push(item);
    }
    return candidateTypes;
  }, []);
