import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import { EMPTY_OBJECT, EMP_STATE } from '../../constants';
import JOB_STATE from '../../constants/jobState';
import JOB_TYPE from '../../constants/jobType';
import UI from '../../constants/ui';
import { getCandidateJobState } from '../../formatter/candidateBootstrap';
import { getRelativeTime } from '../../formatter/date';
import {
  getJobState,
  getCandidateType,
} from '../../formatter/employerBootstrap';
import TypeStatusAndTime from '../../components/typeStatusAndTime';

function JobTypeStatusAndTime(props) {
  const { job, isMyProfileActivity } = props;

  const lastEmpState = useMemo(() => last(job.empstate), [job]);
  const lastCandState = useMemo(() => last(job.candstate), [job]);
  const jobLastState = useMemo(() => last(job?.states), [job]);
  const candAppliedState = useMemo(
    () =>
      job.candstate?.find((stateObj) => stateObj.state === JOB_TYPE.APPLIED),
    [job]
  );

  return (
    <div className="d-flex justify-content-between mt-2">
      <TypeStatusAndTime
        condition={candAppliedState?.state}
        label={getCandidateJobState(candAppliedState?.state)}
        value={getRelativeTime(candAppliedState?.date)}
        isThreeStatus={
          isMyProfileActivity &&
          lastEmpState?.state &&
          lastEmpState?.state !== EMP_STATE
        }
      />

      <TypeStatusAndTime
        condition={
          isMyProfileActivity && jobLastState?.state !== JOB_STATE.PUBLISHED
        }
        label={getJobState(jobLastState?.state)}
        value={getRelativeTime(jobLastState?.date)}
        isThreeStatus={
          isMyProfileActivity &&
          lastEmpState?.state &&
          lastEmpState?.state !== EMP_STATE
        }
      />

      <TypeStatusAndTime
        condition={
          isMyProfileActivity &&
          lastEmpState?.state &&
          lastEmpState?.state !== EMP_STATE
        }
        label={getCandidateType(lastEmpState?.state || EMP_STATE)}
        value={getRelativeTime(lastEmpState?.date)}
        isThreeStatus={
          isMyProfileActivity &&
          lastEmpState?.state &&
          lastEmpState?.state !== EMP_STATE
        }
      />

      <TypeStatusAndTime
        condition={
          lastCandState?.state &&
          lastCandState?.state !== JOB_TYPE.APPLIED &&
          lastCandState?.state !== JOB_TYPE.NEW
        }
        label={getCandidateJobState(lastCandState?.state)}
        value={getRelativeTime(lastCandState?.date)}
      />

      <TypeStatusAndTime
        condition={!isMyProfileActivity && jobLastState?.date}
        label={UI.POSTED}
        value={getRelativeTime(jobLastState?.date)}
      />
    </div>
  );
}

JobTypeStatusAndTime.propTypes = {
  job: PropTypes.object,

  isMyProfileActivity: PropTypes.bool,
};

JobTypeStatusAndTime.defaultProps = {
  job: EMPTY_OBJECT,

  isMyProfileActivity: false,
};

export default JobTypeStatusAndTime;
