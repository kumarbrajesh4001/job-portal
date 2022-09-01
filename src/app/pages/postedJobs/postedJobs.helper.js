/* eslint-disable no-nested-ternary */
import last from 'lodash/last';
import { EMPTY_ARRAY, DEFAULT_CONTEXT_ID } from '../../constants';
import JOB_STATE from '../../constants/jobState';
import { getJobStateActions } from '../../formatter/employerBootstrap';
import { getJobStateMachine } from '../../formatter/stateMachine';
import DEFAULT_ACTION_STATE from './postedJobs.constant';
import { getRequest, postRequest } from '../../services';
import URL from '../../constants/urls';
import EMPLOYER_JOB_ACTION_NAME from '../../constants/employerJobActionName';

import CANDIDATE_TYPE from '../../constants/candidateType';

export const setMatchingAndAppliedCount = (
  jobId,
  setAppliedCount,
  setMatchingCount
) => {
  postRequest(
    `/search/candidatecount?jobid=${jobId}&type=${CANDIDATE_TYPE.MATCHING}&key=${jobId}`
  ).then((response) => {
    setMatchingCount(response.count);
  });
  postRequest(
    `/search/candidatecount?jobid=${jobId}&type=${CANDIDATE_TYPE.APPLIED}&key=${jobId}`
  ).then((response) => {
    setAppliedCount(response.count);
  });
};

const getJobNextStateIdsActions = (state) => getJobStateMachine(state)?.next;

export const getLastEmpStateId = (job) =>
  last(job?.candstate)?.state || DEFAULT_ACTION_STATE;

export const getJobActions = (job) => {
  const state = getLastEmpStateId(job);
  return getJobNextStateIdsActions(state)?.map((stateId) => ({
    id: stateId,
    action: getJobState(stateId),
  }));
};

const removeSameStatusAction = (smstate) => {
  const foundSameState = smstate?.next?.indexOf(smstate?.state);
  if (foundSameState > -1) {
    const updatedStates = [...smstate.next];
    updatedStates.splice(foundSameState, 1);
    return updatedStates;
  }
  return smstate?.next;
};

const getActionItems = (currentState) => {
  const smstate = getJobStateMachine(currentState);
  const state = smstate?.state;
  let actions = EMPTY_ARRAY;
  if (state === JOB_STATE.DRAFT) {
    actions = [
      ...actions,
      { id: JOB_STATE.EDIT, action: EMPLOYER_JOB_ACTION_NAME.EDIT },
    ];
  } else if (state === JOB_STATE.PUBLISHED) {
    actions = [
      ...actions,
      { id: JOB_STATE.EDIT, action: EMPLOYER_JOB_ACTION_NAME.EDIT },
      { id: JOB_STATE.REPOST, action: EMPLOYER_JOB_ACTION_NAME.REPOST },
    ];
  } else if (state === JOB_STATE.FILLED || state === JOB_STATE.EXPIRED) {
    actions = [
      ...actions,
      { id: JOB_STATE.REPOST, action: EMPLOYER_JOB_ACTION_NAME.REPOST },
    ];
  }
  const nextActions = removeSameStatusAction(smstate);
  const nextActionsDisplay =
    nextActions?.map((actionId) => {
      const actionValue = getJobStateActions(actionId);
      return { id: actionId, action: actionValue };
    }) || EMPTY_ARRAY;

  actions = [...actions, ...nextActionsDisplay];
  return actions;
};

export default getActionItems;

export const updateJobStateInJobDetail = (list, jobDetail) => {
  const candstate = list.find((item) => item.id === jobDetail.id)?.candstate;
  return { ...jobDetail, candstate };
};

export const getJob = (jobs, jobId) => jobs.find((job) => job.id === jobId);

export const getJobDetail = (job, context = DEFAULT_CONTEXT_ID) =>
  getRequest(`/employer/job/${job.id}?context=${context}`);

const updateDetailInJobList = (list, jobDetail) =>
  list.map((item) => {
    if (item.id === jobDetail.id) {
      return { ...jobDetail };
    }
    return item;
  });

const deleteJobDetailInJobList = (list, candidateId) =>
  list.filter((cand) => cand.id !== candidateId);

const updateJobStateService = (stateId, job) =>
  postRequest(`/employer/job/${job.id}/action/${stateId}`);

export const updateJobsSummary = (
  list,
  stateId,
  job,
  setSnackbarOpen,
  navigate
) =>
  new Promise((resolve) => {
    if (
      JOB_STATE.EDIT === stateId ||
      JOB_STATE.REPOST === stateId ||
      JOB_STATE.DRAFT === stateId
    ) {
      const action =
        JOB_STATE.EDIT === stateId
          ? EMPLOYER_JOB_ACTION_NAME.EDIT
          : JOB_STATE.REPOST === stateId
          ? EMPLOYER_JOB_ACTION_NAME.REPOST
          : EMPLOYER_JOB_ACTION_NAME.DRAFT;
      const POST_JOB_URL = `${URL.POST_JOB}?jobId=${job.id}&action=${action}`;
      navigate(POST_JOB_URL);
    } else {
      updateJobStateService(stateId, job).then(() => {
        getJobDetail(job)
          .then((jobDetail) => {
            if (JOB_STATE.DELETE === stateId) {
              resolve([deleteJobDetailInJobList(list, job.id)]);
            } else {
              resolve([updateDetailInJobList(list, jobDetail), jobDetail]);
            }
          })
          .catch((error) => {
            setSnackbarOpen({
              setopen: true,
              message: error.msg,
              severity: 'info',
            });
          });
      });
    }
  });
