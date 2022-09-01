import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

// import { BsBookmarkStar } from 'react-icons/bs';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../constants';
import Content from '../../../components/content';
import { getJobActions } from '../jobs.helper';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import ActionMenu from '../../../components/actionMenu';
import { API_URL } from '../../../constants/apiUrls';
import JobCommonSummaryDetail from '../JobCommonSummaryDetail';
import JobTypeStatusAndTime from '../JobTypeStatusAndTime';
import UI from '../../../constants/ui';
import SkillRatingView from '../../../components/candidateComponent/SkillRatingView';

function JobSummary(props) {
  const { onAction, item: job, isMyProfileActivity } = props;

  const [jobActions, setJobActions] = useState(EMPTY_ARRAY);

  useEffect(() => {
    const updatedJobActions = getJobActions(job, isMyProfileActivity);
    setJobActions(updatedJobActions);
  }, [job]);

  return (
    <>
      <div className="d-flex">
        <div className="me-1 me-md-3">
          {job?.logo ? (
            <img
              src={`${API_URL.PHOTO_PRE}${job.logo}`}
              alt={UI.ALT_LOGO}
              className="logo-summary-size logo"
            />
          ) : (
            <span className="justify-content-center d-flex logo-summary-size logo-text logo">
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

      <JobTypeStatusAndTime
        job={job}
        isMyProfileActivity={isMyProfileActivity}
      />
    </>
  );
}

JobSummary.propTypes = {
  item: PropTypes.object,
  onAction: PropTypes.func,
  isMyProfileActivity: PropTypes.bool,
};

JobSummary.defaultProps = {
  item: EMPTY_OBJECT,
  onAction: noop,
  isMyProfileActivity: false,
};

export default JobSummary;
