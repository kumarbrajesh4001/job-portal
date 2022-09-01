import React, { useState, useEffect } from 'react';
import last from 'lodash/last';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import SkillRatingView from '../../../components/candidateComponent/SkillRatingView';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../constants';
import getActionItems from '../postedJobs.helper';
import ActionMenu from '../../../components/actionMenu';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import { API_URL } from '../../../constants/apiUrls';
import UI from '../../../constants/ui';
import Content from '../../../components/content';
import MatchingAndAppliedCount from '../MatchingAndAppliedCount';
import JobCommonSummaryDetail from '../../jobs/JobCommonSummaryDetail';

export default function PostedJobSummary({ item: job, onAction }) {
  const [jobActions, setJobActions] = useState(EMPTY_ARRAY);

  useEffect(() => {
    const updatedJobActions = getActionItems(last(job.states).state);
    setJobActions(updatedJobActions);
  }, [job]);

  return (
    <>
      <div className="d-flex">
        <div className="me-3">
          {job?.logo ? (
            <img
              src={`${API_URL.PHOTO_PRE}${job.logo}`}
              alt={UI.ALT_LOGO}
              className="logo-summary-size logo"
            />
          ) : (
            <span className="justify-content-center d-flex logo-summary-size logo-text">
              {getPrefixAndUpperName(job?.employer)}
            </span>
          )}
        </div>

        <div className="col text-truncate">
          <Content condition={job?.title}>
            <span className="ps-4 ps-md-0 headline-5-bold">{job.title}</span>
          </Content>
          <Content condition={job?.employer}>
            <div className="ps-4 ps-md-0 subtitle-1 color-5B5B5B">
              {job.employer}
            </div>
          </Content>
        </div>
        <div>
          <ActionMenu actions={jobActions} onAction={onAction} />
        </div>
      </div>

      <JobCommonSummaryDetail job={job} />

      <Content condition={job?.skills}>
        <div className="mt-3">
          <SkillRatingView skills={job.skills} />
        </div>
      </Content>

      <MatchingAndAppliedCount job={job} />
    </>
  );
}

PostedJobSummary.propTypes = {
  item: PropTypes.object,
  onAction: PropTypes.func,
};

PostedJobSummary.defaultProps = {
  item: EMPTY_OBJECT,
  onAction: noop,
};
