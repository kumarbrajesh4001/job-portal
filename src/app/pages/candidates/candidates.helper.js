import last from 'lodash/last';
import some from 'lodash/some';
import concat from 'lodash/concat';
import compact from 'lodash/compact';
import { getCandidateTypeMachine } from '../../formatter/stateMachine';
import DEFAULT_ACTION_STATE from './candidates.constants';
import CANDIDATE_TYPE from '../../constants/candidateType';
import {
  getCandidateType,
  getCandidateTypeActionMapping,
} from '../../formatter/candidateBootstrap';
import { getRelativeTime } from '../../formatter/date';
import {
  getCandidateDetail,
  updateCandidateStateService,
} from './candidates.service';
import TypeStatusAndTime from '../../components/typeStatusAndTime';

const getCandidateNextStateIdsActions = (state) =>
  getCandidateTypeMachine(state)?.next;

export const getLastEmpStateId = (candidate) =>
  last(candidate?.empstate)?.state || DEFAULT_ACTION_STATE;

export const getCandidateActions = (candidate) => {
  const state = getLastEmpStateId(candidate);
  return getCandidateNextStateIdsActions(state)?.map((stateId) => ({
    id: stateId,
    ...getCandidateTypeActionMapping(stateId),
  }));
};

export const getSkillsRatingsView = (assessmentSkills, candidateSkills) =>
  compact(concat(assessmentSkills, candidateSkills));

const updateDetailInCandidateList = (list, candidateDetail) =>
  list.map((item) => {
    if (item.id === candidateDetail.id) {
      return { ...candidateDetail };
    }
    return item;
  });

const deleteCandidateDetailInCandidateList = (list, candidateId) =>
  list.filter((cand) => cand.id !== candidateId);

export const updateCandidatesSummary = (
  list,
  stateId,
  candidateId,
  pageType,
  setSnackbarOpen,
  remark
) =>
  new Promise((resolve, reject) => {
    updateCandidateStateService(stateId, candidateId, remark)
      .then(() => {
        if (
          CANDIDATE_TYPE.DELETED_BY_EMPLOYER === stateId ||
          CANDIDATE_TYPE.NOT_SUITABLE === stateId
        ) {
          resolve([deleteCandidateDetailInCandidateList(list, candidateId)]);
        } else {
          getCandidateDetail(candidateId, pageType)
            .then((candidateDetail) => {
              resolve([
                updateDetailInCandidateList(list, candidateDetail),
                candidateDetail,
              ]);
            })
            .catch((error) => {
              setSnackbarOpen({
                setopen: true,
                message: error.msg,
                severity: 'info',
              });
            });
        }
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'info',
        });
        reject(error);
      });
  });

export const updateEmpStateInCandidateDetail = (list, candidateDetail) => {
  const empstate = list.find(
    (item) => item.id === candidateDetail.id
  )?.empstate;
  return { ...candidateDetail, empstate };
};

export const getIsCandidateLocked = (candidate) =>
  !some(candidate.empstate, ['state', CANDIDATE_TYPE.UNLOCK]);

const pageType = [
  CANDIDATE_TYPE.APPLIED,
  CANDIDATE_TYPE.UNLOCK,
  CANDIDATE_TYPE.SHORTLISTED,
  CANDIDATE_TYPE.NOT_SUITABLE,
];

export const getDateWRTPage = (candidate, candidateType) => {
  const ENUM_CANDIDATETYPE = pageType.find(
    (candType) => candType === candidateType
  );
  const candidateStateWRTPage = candidate?.empstate?.find(
    (cand) => cand.state === candidateType
  )?.state;
  const date = candidate?.empstate?.find(
    (cand) => cand.state === candidateType
  )?.date;
  return (
    <TypeStatusAndTime
      condition={
        candidateType === ENUM_CANDIDATETYPE &&
        getLastEmpStateId(candidate) !== ENUM_CANDIDATETYPE
      }
      label={getCandidateType(candidateStateWRTPage)}
      value={date ? getRelativeTime(date) : null}
    />
  );
};
