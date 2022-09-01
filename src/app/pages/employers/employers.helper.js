import last from 'lodash/last';
import { getCandidateStateMachineForCandidate } from '../../formatter/stateMachine';
import CANDIDATE_TYPE from '../../constants/candidateType';
import { getCandidateTypeActionMapping } from '../../formatter/candidateBootstrap';
import {
  getEmployerDetail,
  updateCandidateStateService,
} from './employers.services';

const getCandidateNextStateIdsActions = (state) =>
  getCandidateStateMachineForCandidate(state)?.next;

export const getLastCandOrEmpStateId = (employer) => {
  let state;
  if (typeof employer.candstate === 'object') {
    state = employer.candstate.state;
  } else {
    state = last(employer.candstate)?.state;
  }
  if (!state) {
    if (typeof employer.candstate === 'object') {
      state = employer.empstate.state;
    } else {
      state = last(employer.empstate)?.state;
    }
  }
  return state;
};

export const getLastCandStateDate = (employer) => {
  let date;
  if (typeof employer.candstate === 'object') {
    date = employer.candstate.date;
  } else {
    date = last(employer.candstate)?.date;
  }
  return date;
};

export const getCandidateActions = (employer) => {
  const state = getLastCandOrEmpStateId(employer);
  return getCandidateNextStateIdsActions(state)?.map((stateId) => ({
    id: stateId,
    ...getCandidateTypeActionMapping(stateId),
  }));
};

const updateDetailInEmployerList = (list, employerDetail) =>
  list.map((item) => {
    if (item.id === employerDetail.id) {
      return { ...employerDetail };
    }
    return item;
  });

const deleteEmployerDetailInEmployerList = (list, employerId) =>
  list.filter((cand) => cand.id !== employerId);

export const updateEmployersSummary = (list, stateId, employerId, pageType) =>
  new Promise((resolve, reject) => {
    updateCandidateStateService(stateId, employerId)
      .then(() => {
        if (
          CANDIDATE_TYPE.DELETED_BY_CANDIDATE === stateId ||
          CANDIDATE_TYPE.NOT_SUITABLE === stateId
        ) {
          resolve([deleteEmployerDetailInEmployerList(list, employerId)]);
        } else {
          getEmployerDetail(employerId, pageType)
            .then((employerDetail) => {
              resolve([
                updateDetailInEmployerList(list, employerDetail),
                employerDetail,
              ]);
            })
            .catch(reject);
        }
      })
      .catch(reject);
  });

export const updateCandStateInEmployerDetail = (list, employerDetail) => {
  const candstate = list.find(
    (item) => item.id === employerDetail.id
  )?.candstate;
  return { ...employerDetail, candstate };
};
