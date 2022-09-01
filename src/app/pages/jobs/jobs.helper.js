import last from 'lodash/last';

import DEFAULT_ACTION_STATE from './jobs.constants';
import JOB_TYPE from '../../constants/jobType';
import Content from '../../components/content';
import {
  getCandidateJobStateAction,
  getCandidateJobState,
} from '../../formatter/candidateBootstrap';

import {
  getCandidateStateMachine,
  getCandidateStateMachineForCandidate,
} from '../../formatter/stateMachine';
import { getRelativeTime } from '../../formatter/date';
import { getJobDetail, updateJobStateService } from './jobs.service';
import { getCandidateTypeActionMapping } from '../../formatter/employerBootstrap';

const getJobNextStateIdsActions = (state, myProfileActivity) => {
  let nextStates;
  if (myProfileActivity) {
    nextStates = getCandidateStateMachineForCandidate(state)?.next;
  } else {
    nextStates = getCandidateStateMachine(state)?.next;
  }
  return nextStates;
};

export const getLastEmpStateId = (job, myProfileActivity, isAutoApplied) => {
  let id;
  if (myProfileActivity) {
    id = last(job?.empstate)?.state;
    if (isAutoApplied) {
      id = last(job?.candstate)?.state;
    }
  } else {
    id = last(job?.candstate)?.state || DEFAULT_ACTION_STATE;
  }
  return id;
};

export const getJobActions = (job, isMyProfileActivity) => {
  let isAutoApplied;
  let state;
  state = getLastEmpStateId(job, isMyProfileActivity, isAutoApplied);

  if (!state) {
    isAutoApplied = true;
    state = getLastEmpStateId(job, isMyProfileActivity, isAutoApplied);
  }

  let jobNextStateIdsActions;
  if (isMyProfileActivity) {
    jobNextStateIdsActions = getJobNextStateIdsActions(
      state,
      isMyProfileActivity
    )?.map((stateId) => {
      if (isAutoApplied) {
        return { id: stateId, action: getCandidateJobStateAction(stateId) };
      }
      return { id: stateId, ...getCandidateTypeActionMapping(stateId) };
    });
  } else {
    jobNextStateIdsActions = getJobNextStateIdsActions(
      state,
      isMyProfileActivity
    )?.map((stateId) => ({
      id: stateId,
      action: getCandidateJobStateAction(stateId),
    }));
  }
  return jobNextStateIdsActions;
};

const updateDetailInJobList = (list, jobDetail) =>
  list.map((item) => {
    if (item.id === jobDetail.id) {
      return { ...jobDetail };
    }
    return item;
  });

const deleteJobDetailInJobList = (list, candidateId) =>
  list.filter((cand) => cand.id !== candidateId);

export const getJob = (jobs, jobId) => jobs.find((job) => job.id === jobId);

export const updateJobsSummary = (
  list,
  stateId,
  job,
  pageType,
  isMyProfileActivity,
  setSnackbarOpen
) =>
  new Promise((resolve, reject) => {
    updateJobStateService(stateId, job, isMyProfileActivity)
      .then(() => {
        if (JOB_TYPE.NOT_SUITABLE === stateId) {
          resolve([deleteJobDetailInJobList(list, job.id)]);
        } else {
          getJobDetail(job, pageType)
            .then((jobDetail) => {
              resolve([updateDetailInJobList(list, jobDetail), jobDetail]);
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

export const updateCandStateInJobDetail = (list, jobDetail) => {
  const candstate = list.find((item) => item.id === jobDetail.id)?.candstate;
  return { ...jobDetail, candstate };
};

const pageType = [
  JOB_TYPE.MATCHING,
  JOB_TYPE.SHORTLISTED,
  JOB_TYPE.NOT_SUITABLE,
];

export const getDateWRTPage = (job, jobType) => {
  const ENUM_JOBTYPE = pageType.find((joType) => joType === jobType);
  const jobStateWRTPage = job?.empstate?.find(
    (jo) => jo.state === jobType
  )?.state;
  const date = job?.empstate?.find((jo) => jo.state === jobType)?.date;
  return (
    <Content
      condition={
        jobType === ENUM_JOBTYPE && getLastEmpStateId(job) !== ENUM_JOBTYPE
      }
    >
      {getCandidateJobState(jobStateWRTPage)}-
      {date ? getRelativeTime(date) : null}
    </Content>
  );
};
