import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import last from 'lodash/last';
import { Button } from '@mui/material';
import URL from '../../constants/urls';
import JOB_STATE from '../../constants/jobState';
import { setMatchingAndAppliedCount } from './postedJobs.helper';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import { getFormattedDate } from '../../formatter/date';
import { getJobState } from '../../formatter/employerBootstrap';
import { DEFAULT_COUNT } from './postedJobs.constant';
import UI from '../../constants/ui';
import CANDIDATE_TYPE from '../../constants/candidateType';
import TypeStatusAndTime from '../../components/typeStatusAndTime';

function MatchingAndAppliedCount(props) {
  const { job } = props;

  const [appliedCount, setAppliedCount] = useState(DEFAULT_COUNT);
  const [matchingCount, setMatchingCount] = useState(DEFAULT_COUNT);

  const jobLastState = last(job?.states);

  const navigate = useNavigate();
  const redirectToJobCandidate = (jobId, candidateType) => {
    navigate(`${URL.JOB_STATUS}?jobId=${jobId}&candidateType=${candidateType}`);
  };

  useEffect(() => {
    if (jobLastState.state === JOB_STATE.PUBLISHED) {
      setMatchingAndAppliedCount(job?.id, setAppliedCount, setMatchingCount);
    }
  }, EMPTY_ARRAY);

  const handleMatchingCandidates = (jobId) => {
    redirectToJobCandidate(jobId, CANDIDATE_TYPE.MATCHING);
  };

  const handleAppliedCandidates = (jobId) => {
    redirectToJobCandidate(jobId, CANDIDATE_TYPE.APPLIED);
  };

  const isStatusDraft = useMemo(
    () => jobLastState.state === JOB_STATE.DRAFT,
    [jobLastState.state]
  );

  return (
    <>
      {jobLastState.state === JOB_STATE.PUBLISHED ? (
        <div className="d-flex mt-2 justify-content-between">
          <Button
            variant="text"
            onClick={(event) => {
              handleMatchingCandidates(job?.id);
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            {UI.MATCHING_CANDIDATES}:&nbsp;{matchingCount}
          </Button>
          <Button
            variant="text"
            onClick={(event) => {
              handleAppliedCandidates(job.id);
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            {UI.APPLIED_CANDIDATES}:&nbsp;{appliedCount}
          </Button>
        </div>
      ) : (
        ''
      )}
      <div className="mt-2 d-flex justify-content-between">
        <TypeStatusAndTime
          condition={job?.states}
          label={UI.STATUS}
          value={getJobState(last(job.states)?.state)}
          isThreeStatus={!isStatusDraft}
        />

        {isStatusDraft ? (
          ''
        ) : (
          <TypeStatusAndTime
            condition={job?.states}
            label={UI.PUBLISHED}
            value={getFormattedDate(
              job.states.find(
                (stateObj) => stateObj.state === JOB_STATE.PUBLISHED
              )?.date
            )}
            isThreeStatus={!isStatusDraft}
          />
        )}

        <TypeStatusAndTime
          condition={job?.states}
          label={UI.UPDATED}
          value={getFormattedDate(last(job.states)?.date)}
          isThreeStatus={!isStatusDraft}
        />
      </div>
    </>
  );
}
MatchingAndAppliedCount.propTypes = {
  job: PropTypes.object,
};
MatchingAndAppliedCount.defaultProps = {
  job: EMPTY_OBJECT,
};
export default MatchingAndAppliedCount;
