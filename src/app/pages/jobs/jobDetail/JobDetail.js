import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import { noop } from 'lodash';
import { BsDot } from 'react-icons/bs';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Link } from '@mui/material';

import URL from '../../../constants/urls';
// import { BsBookmarkStar, BsDot } from 'react-icons/bs';
// import Button from '@mui/material/Button';
import { EMPTY_ARRAY, EMPTY_OBJECT, OTHER_SALARY_ID } from '../../../constants';
import Content from '../../../components/content';
import LabelValueView from '../../../components/labelValueView';
import HeadingLabelValueView from '../../../components/headingLabelValueView';
import {
  getJobType,
  getSalary,
  getShift,
  getWorkLocation,
} from '../../../formatter/candidateBootstrap';
import {
  getEducation,
  getPayBenifit,
  getOtherBenifit,
  getExperience,
} from '../../../formatter/commonBootstrap';
import { getJobActions } from '../jobs.helper';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import { API_URL } from '../../../constants/apiUrls';
import { getFormattedDate } from '../../../formatter/date';
import ActionMenu from '../../../components/actionMenu';
import getPluralize from '../../../helpers/plural';
import JobTypeStatusAndTime from '../JobTypeStatusAndTime';
import { getFormattedCurrencyRangePerAnnum } from '../../../formatter/number';
import SkillRatingExpTestDateView from '../../../components/candidateComponent/SkillRatingExpTestDateView';
import UI from '../../../constants/ui';

function JobDetail(props) {
  const { detail: jobDetail, onAction, isMyProfileActivity } = props;

  const [jobActions, setJobActions] = useState(EMPTY_ARRAY);

  const [searchParams] = useSearchParams();
  const employerIdParam = searchParams.get('employerId');

  useEffect(() => {
    const updatedJobActions = getJobActions(jobDetail, isMyProfileActivity);
    setJobActions(updatedJobActions);
  }, [jobDetail]);

  return (
    <>
      <div className="px-4 pt-3 pb-2">
        <div className="d-flex justify-content-between">
          <div>
            {jobDetail?.logo ? (
              <img
                src={`${API_URL.PHOTO_PRE}${jobDetail?.logo}`}
                alt={UI.ALT_LOGO}
                className="logo-detail-size logo"
              />
            ) : (
              <span className="justify-content-center d-flex logo-detail-size logo-text logo">
                {getPrefixAndUpperName(jobDetail?.employer)}
              </span>
            )}
          </div>
          <div>
            <ActionMenu actions={jobActions} onAction={onAction} />
          </div>
        </div>

        <div className="row mt-2">
          <Content condition={jobDetail?.title}>
            <div className="col-12  headline-5-bold">{jobDetail.title}</div>
          </Content>
          <Content condition={jobDetail?.employer}>
            {employerIdParam ? (
              <div className="col-12  subtitle-1 color-5B5B5B">
                {jobDetail.employer}
              </div>
            ) : (
              <Link
                as={NavLink}
                to={`${URL.EMPLOYER_DETAILS}?employerId=${jobDetail.employerid}`}
                target="_blank"
              >
                {jobDetail.employer}
              </Link>
            )}
          </Content>
        </div>

        <div className="row">
          {/* <Button variant="contained" size="large" fullWidth>
            Apply
          </Button> */}
          {/* <span className={`button color-F25C05 p-1`}>
            <BsBookmarkStar /> Save
          </span> */}
          <div className="text-end my-md-0 my-1">
            <Content condition={jobDetail?.jobtype}>
              <span className="subtitle-1 color-1F2830">
                {getJobType(jobDetail.jobtype)}
              </span>
            </Content>

            <Content condition={jobDetail.worklocation}>
              <span className="subtitle-1 color-1F2830">
                <BsDot /> {getWorkLocation(jobDetail.worklocation)}
              </span>
            </Content>
          </div>
        </div>

        <JobTypeStatusAndTime
          job={jobDetail}
          isMyProfileActivity={isMyProfileActivity}
        />
      </div>
      <Divider />

      <div className="row px-4 pb-4">
        <HeadingLabelValueView label={UI.JOB_DETAILS}>
          <LabelValueView
            condition={jobDetail.description}
            label={UI.JOB_DESCRIPTION}
            value={jobDetail.description}
            isValueHTML
          />

          <LabelValueView
            condition={jobDetail.worklocation}
            label={UI.WORK_LOCATION}
            value={getWorkLocation(jobDetail.worklocation)}
          />

          <LabelValueView
            condition={jobDetail.jobtype}
            label={UI.JOB_TYPE}
            value={getJobType(jobDetail.jobtype)}
          />

          <LabelValueView
            condition={jobDetail?.joblocations?.length}
            label={getPluralize(UI.LOCATION, jobDetail?.joblocations?.length)}
            value={jobDetail?.joblocations?.map((location, index, arr) => (
              <span key={index} className="body-1 color-1F2830">
                {location.shortname}
                {index < arr.length - 1 && ', '}
              </span>
            ))}
          />

          <LabelValueView
            condition={jobDetail?.salary}
            label={UI.SALARY}
            value={
              jobDetail?.salary?.id !== OTHER_SALARY_ID
                ? getSalary(jobDetail?.salary?.id)
                : getFormattedCurrencyRangePerAnnum(
                    jobDetail?.salary?.min,
                    jobDetail?.salary?.max
                  )
            }
          />

          <LabelValueView
            condition={jobDetail?.education}
            label={UI.MINIMUM_QUALIFICATION}
            value={getEducation(jobDetail?.education)}
          />
        </HeadingLabelValueView>

        <HeadingLabelValueView label={UI.SKILLS_AND_EXPERIENCE}>
          <LabelValueView
            condition={jobDetail?.exp}
            label={UI.OVERALL_EXPERIENCE}
            value={getExperience(jobDetail?.exp)}
          />

          <LabelValueView
            condition={jobDetail?.skills?.length}
            label={getPluralize(UI.SKILL, jobDetail.skills.length)}
          >
            <SkillRatingExpTestDateView skills={jobDetail.skills} isAll />
          </LabelValueView>
        </HeadingLabelValueView>

        <HeadingLabelValueView label={UI.OTHER_DETAILS}>
          <LabelValueView
            condition={jobDetail.shift}
            label={UI.SHIFT}
            value={getShift(jobDetail.shift)}
          />

          <LabelValueView
            condition={jobDetail.openings > 0}
            label={getPluralize(UI.NUMBER_OF_OPENING, jobDetail.openings)}
            value={jobDetail.openings}
          />
          <LabelValueView
            condition={jobDetail?.alwaysopen}
            label={UI.ALWAYS_HIRING}
            value={UI.YES}
          />

          <LabelValueView
            condition={jobDetail?.startdate}
            label={UI.START_DATE}
            value={getFormattedDate(jobDetail.startdate)}
          />

          <LabelValueView
            condition={jobDetail?.jobdeadline}
            label={UI.JOB_DEADLINE}
            value={getFormattedDate(jobDetail.jobdeadline)}
          />

          <LabelValueView
            condition={jobDetail?.jobexpires}
            label={UI.JOB_EXPIRES_ON}
            value={getFormattedDate(jobDetail.jobexpires)}
          />

          <LabelValueView
            condition={jobDetail?.paybenefits?.length}
            label={UI.PAY_BENEFITS}
            value={jobDetail?.paybenefits?.map(getPayBenifit).join(', ')}
          />

          <LabelValueView
            condition={jobDetail?.otherbenefits?.length}
            label={UI.OTHER_BENEFITS}
            value={jobDetail?.otherbenefits?.map(getOtherBenifit)?.join(', ')}
          />

          <LabelValueView
            condition={jobDetail?.prerequisites?.length}
            label={UI.PRE_REQUISITES}
            value={jobDetail?.prerequisites?.join(', ')}
          />
        </HeadingLabelValueView>

        <HeadingLabelValueView
          condition={!!jobDetail?.contactperson}
          label={UI.CONTACT_DETAILS}
        >
          <LabelValueView
            condition={jobDetail?.contactperson}
            label={UI.CONTACT_PERSON}
            value={jobDetail?.contactperson}
          />

          <LabelValueView
            condition={jobDetail?.contactrole}
            label={UI.ROLE}
            value={jobDetail?.contactrole}
          />
        </HeadingLabelValueView>
      </div>
    </>
  );
}
JobDetail.propTypes = {
  detail: PropTypes.object,
  onAction: PropTypes.func,
  isMyProfileActivity: PropTypes.bool,
};

JobDetail.defaultProps = {
  detail: EMPTY_OBJECT,
  onAction: noop,
  isMyProfileActivity: false,
};

export default JobDetail;
