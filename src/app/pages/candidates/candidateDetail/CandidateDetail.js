import React, { useState, useEffect, useMemo, useRef } from 'react';
import Divider from '@mui/material/Divider';
import { head, noop, throttle } from 'lodash';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { BsDot, BsDownload } from 'react-icons/bs';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  getJobType,
  getShift,
  getWorkLocation,
} from '../../../formatter/candidateBootstrap';
import { getGender, getJoiningDate } from '../../../formatter/commonBootstrap';
import Mask from '../../../components/mask';
import { API_URL } from '../../../constants/apiUrls';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../constants';
import Content from '../../../components/content';
import {
  getCandidateActions,
  getIsCandidateLocked,
} from '../candidates.helper';
import CandidateEducationView from '../../../components/candidateComponent/CandidateEducationView';
import BreakView from '../../../components/candidateComponent/BreakView';
import CertificationsView from '../../../components/candidateComponent/CertificationsView';
import JobHistory from '../../../components/candidateComponent/jobHistoryView';
import getPluralize from '../../../helpers/plural';
import CompleteSkillView from '../../../components/candidateComponent/CompleteSkillView';
import ToolsView from '../../../components/candidateComponent/ToolsView';
import SchoolingView from '../../../components/candidateComponent/SchoolingView';
import ActionMenu from '../../../components/actionMenu';
// import ListView from '../../../components/listView';
import { downloadFile } from '../../../services';
import { getFileName } from '../../../helpers/general';
import UI from '../../../constants/ui';
import PAGE_TYPE from '../../../constants/pageType';
import CandidatesTypeStatusAndTime from '../CandidatesTypeStatusAndTime';
import {
  DETAIL_BADGE_HEIGHT,
  DETAIL_BADGE_WIDTH,
} from '../candidates.constants';
import Availability from '../Availability';
import HeadingLabelValueView from '../../../components/headingLabelValueView';
import LabelValueView from '../../../components/labelValueView';
import SkillRatingExpTestDateView from '../../../components/candidateComponent/SkillRatingExpTestDateView';
import ListView from '../../../components/listView/ListView';
import ComponentListView from '../../../components/componentListView';

import JobType from '../JobType';
import Remark from '../../../components/remark';
import { getFormattedDate } from '../../../formatter/date';

function CandidateDetail(props) {
  const { detail: candidate, onAction, pageType } = props;
  const [candidateActions, setCandidateActions] = useState(EMPTY_ARRAY);
  const [detailHeight, setDetailHeight] = useState(EMPTY_OBJECT);
  const headerDetailRef = useRef();

  const handleScroll = (elementHeightFromTop) =>
    function (e) {
      const {
        target: { scrollTop, id },
      } = e;

      if (id === 'headerDetailRef') {
        return;
      }
      const newHeight = scrollTop > 180 ? 180 : scrollTop;
      const summaryHeight = {
        height1: `calc(${newHeight}px + 100vh - ${elementHeightFromTop}px)`,
      };
      setDetailHeight(summaryHeight);
    };

  useEffect(() => {
    const updatedCandidateActions = getCandidateActions(candidate);
    setCandidateActions(updatedCandidateActions);
  }, [candidate]);

  useEffect(() => {
    const elementHeightFromTop =
      parseInt(headerDetailRef.current.getBoundingClientRect().top, 10) + 50;
    const rootElement = document.getElementById('root');
    const trottleScrollHandle = throttle(handleScroll(elementHeightFromTop));
    rootElement.addEventListener('scroll', trottleScrollHandle, 100);
    const summaryHeight = {
      height1: `calc(100vh - ${elementHeightFromTop}px)`,
    };
    setDetailHeight(summaryHeight);
    return () => {
      rootElement.removeEventListener('scroll', trottleScrollHandle);
    };
  }, EMPTY_ARRAY);

  const isCandidateLocked = useMemo(
    () => getIsCandidateLocked(candidate),
    [candidate]
  );

  return (
    <>
      <div className="py-2 px-3">
        <div
          className={classNames('d-flex justify-content-between', {
            'mt-2': !candidate?.badges,
          })}
        >
          <div className="align-self-center d-flex">
            {isCandidateLocked ? (
              <span className="justify-content-center d-flex logo-detail-size background-D7D7D7 logo">
                <LockOutlinedIcon />
              </span>
            ) : (
              <span>
                {candidate?.photo ? (
                  <img
                    src={`${API_URL.PHOTO_PRE}${candidate?.photo}`}
                    alt={UI.ALT_LOGO}
                    className="logo-detail-size logo"
                  />
                ) : (
                  <span className="justify-content-center d-flex logo-detail-size logo-text logo">
                    {getPrefixAndUpperName(candidate?.name)}
                  </span>
                )}
              </span>
            )}
          </div>

          <div>
            <ActionMenu actions={candidateActions} onAction={onAction} />
            <div className="mt-1">
              {candidate?.badges?.map((badge, index) => (
                <Tooltip key={index} title={badge.tooltip.join(', ')}>
                  <img
                    src={badge.icon}
                    alt={UI.ALT_BADGE}
                    width={DETAIL_BADGE_HEIGHT}
                    height={DETAIL_BADGE_WIDTH}
                    className="ms-3"
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        <div>
          {isCandidateLocked ? (
            <Mask />
          ) : (
            <div
              className={classNames('headline-5-bold color-1F2830', {
                'mt-2': !candidate?.badges,
              })}
            >
              {candidate.name}
            </div>
          )}
          <div className="subtitle-1 color-5B5B5B mt-2">
            <Content condition={candidate?.jobs?.length}>
              <span>
                {head(candidate?.jobs)?.title}
                {head(candidate?.jobs)?.company && (
                  <>
                    <BsDot />
                    {head(candidate?.jobs)?.company}
                  </>
                )}
              </span>
              {head(candidate?.jobs)?.city.shortname && (
                <span> - {head(candidate?.jobs)?.city.shortname}</span>
              )}
            </Content>
          </div>
        </div>

        <Content condition={!isCandidateLocked}>
          <div className="text-primary mt-2">
            <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
          </div>
          <div className="row mt-2">
            <div className="col-5 col-md-4 align-self-center">
              {candidate.mobile}
            </div>

            <div className="col-7 col-md-4 d-flex justify-content-md-center justify-content-end">
              <Button startIcon={<BsDownload />}>
                <a
                  className="button"
                  role="button"
                  tabIndex={0}
                  href="#"
                  onClick={() => {
                    downloadFile(
                      `${API_URL.RESUME_PRE + candidate.resume}&candidateid=${
                        candidate.id
                      }`,
                      getFileName(candidate.resume)
                    );
                  }}
                >
                  {UI.DOWNLOAD_RESUME}
                </a>
              </Button>
            </div>

            <div className="col-md-4 col-12 mt-md-0 mt-1 align-self-center">
              <JobType candidate={candidate} />
              <Availability candidate={candidate} />
            </div>
          </div>
        </Content>

        <div className="mt-2">
          <CandidatesTypeStatusAndTime
            candidate={candidate}
            isCandidateLocked={isCandidateLocked}
            pageType={pageType}
          />
        </div>
        <div className="d-md-flex justify-content-md-between">
          <Content condition={isCandidateLocked}>
            <div className="caption color-F25C05 mt-2">
              <span> {UI.REQUIRES}</span> <span> {candidate.value}</span>
              <span className="ms-1">
                {getPluralize(UI.POINT, candidate.value)} {UI.TO_UNLOCK}
              </span>
            </div>

            <div>
              <JobType candidate={candidate} />
              <Availability candidate={candidate} />
            </div>
          </Content>
        </div>

        <Remark state={candidate} />
      </div>

      <Divider />
      <div
        className="overflow-auto pb-2 px-3"
        id="headerDetailRef"
        style={detailHeight}
        ref={headerDetailRef}
      >
        <LabelValueView
          condition={candidate?.about}
          label={UI.ABOUT}
          value={candidate.about}
          isValueHTML
        />
        <HeadingLabelValueView label={UI.DESIRED_JOBS}>
          <LabelValueView
            condition={candidate?.jobtype}
            label={UI.JOB_TYPE}
            value={getJobType(candidate.jobtype)}
          />

          <LabelValueView
            condition={candidate?.loctype}
            label={UI.WORK_LOCATION}
            value={getWorkLocation(candidate.loctype)}
          />

          <LabelValueView
            condition={candidate?.shift}
            label={UI.SHIFT}
            value={getShift(candidate.shift)}
          />

          <LabelValueView
            condition={candidate?.joining}
            label={UI.AVAILABILITY}
            value={getJoiningDate(candidate.joining)}
          />

          <LabelValueView
            condition={candidate?.relocate || !candidate?.relocate}
            label={UI.WILLINGNESS_TO_RELOCATE}
            value={candidate.relocate ? UI.YES : UI.NO}
          />
        </HeadingLabelValueView>
        <HeadingLabelValueView
          label={UI.ASSESSMENT}
          condition={!!candidate?.assessments?.length}
        >
          <div className="mt-2">
            <SkillRatingExpTestDateView skills={candidate.assessments} isAll />
          </div>
        </HeadingLabelValueView>

        <HeadingLabelValueView
          label={UI.SKILLS}
          condition={!!candidate?.skills?.length}
        >
          <LabelValueView
            condition={candidate?.skills?.length}
            value={
              <ComponentListView
                items={candidate.skills}
                component={CompleteSkillView}
              />
            }
          />
        </HeadingLabelValueView>
        <HeadingLabelValueView
          label={UI.EDUCATION}
          condition={!!candidate?.education?.length}
        >
          <LabelValueView
            condition={candidate?.education?.length}
            value={
              <ComponentListView
                items={candidate.education}
                component={CandidateEducationView}
              />
            }
          />
        </HeadingLabelValueView>
        <HeadingLabelValueView
          label={UI.WORK_EXPERIENCE}
          condition={!!candidate?.jobs?.length}
        >
          <LabelValueView
            condition={candidate?.jobs?.length}
            value={
              <ComponentListView
                items={candidate.jobs}
                component={JobHistory}
              />
            }
          />
        </HeadingLabelValueView>
        <HeadingLabelValueView
          label={UI.BREAK}
          condition={!!candidate?.breaks?.find((visible) => visible.visibility)}
        >
          <LabelValueView
            condition
            value={
              <ComponentListView
                items={candidate?.breaks?.filter(
                  (breakItem) => breakItem.visibility
                )}
                component={BreakView}
              />
            }
          />
        </HeadingLabelValueView>
        <HeadingLabelValueView
          label={UI.TOOLS}
          condition={!!candidate?.tools?.length}
        >
          <LabelValueView
            condition={candidate?.tools?.length}
            value={
              <ComponentListView
                items={candidate.tools}
                component={ToolsView}
              />
            }
          />
        </HeadingLabelValueView>
        <HeadingLabelValueView
          label={UI.CERTIFICATIONS}
          condition={!!candidate?.certifications?.length}
        >
          <LabelValueView
            condition={candidate?.certifications?.length}
            value={
              <ComponentListView
                items={candidate.certifications}
                component={CertificationsView}
              />
            }
          />
        </HeadingLabelValueView>
        <HeadingLabelValueView
          label={UI.SCHOOLING}
          condition={!!candidate?.schooling?.length}
        >
          <LabelValueView
            condition={candidate?.schooling?.length}
            value={
              <ComponentListView
                items={candidate.schooling}
                component={SchoolingView}
              />
            }
          />
        </HeadingLabelValueView>
        <HeadingLabelValueView
          label={UI.OTHER_DETAILS}
          condition={
            !!(
              candidate?.achievements ||
              candidate?.acadexcellence ||
              candidate.community?.length ||
              candidate?.patents ||
              candidate?.projects ||
              candidate?.hobbies ||
              candidate?.lang?.length ||
              candidate?.profile ||
              candidate?.linkedin ||
              candidate?.github
            )
          }
        >
          <LabelValueView
            condition={candidate?.achievements}
            label={UI.ACHIEVEMENTS}
            value={candidate.achievements}
            isValueHTML
          />

          <LabelValueView
            condition={candidate?.acadexcellence}
            label={UI.ACADEMIC_EXCELLENCE}
            value={candidate.acadexcellence}
            isValueHTML
          />

          <LabelValueView
            condition={candidate?.community?.length}
            label={UI.OPEN_SOURCE_COMMUNITY_CONTRIBUTION}
            value={
              isCandidateLocked ? (
                <Mask />
              ) : (
                <div className="mt-2">
                  <ComponentListView
                    items={candidate.community}
                    component={ListView}
                  />
                </div>
              )
            }
          />

          <LabelValueView
            condition={candidate?.patents}
            label={UI.PATENTS}
            value={candidate.patents}
            isValueHTML
          />

          <LabelValueView
            condition={candidate?.projects}
            label={UI.PROJECTS}
            value={candidate.projects}
            isValueHTML
          />

          <LabelValueView
            condition={candidate?.hobbies}
            label={UI.HOBBIES}
            value={candidate.hobbies}
            isValueHTML
          />

          <LabelValueView
            condition={candidate?.lang?.length}
            label={UI.LANGUAGE}
            value={candidate.lang?.join(', ')}
          />

          <LabelValueView
            condition={candidate?.profile}
            label={UI.ONLINE_PROFILE_URL}
            value={
              isCandidateLocked ? (
                <Mask />
              ) : (
                <a
                  href={candidate.profile}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {candidate.profile}
                </a>
              )
            }
          />

          <LabelValueView
            condition={candidate?.linkedin}
            label={UI.LINKEDIN}
            value={
              isCandidateLocked ? (
                <Mask />
              ) : (
                <a
                  href={candidate.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {candidate.linkedin}
                </a>
              )
            }
          />

          <LabelValueView
            condition={candidate?.github}
            label={UI.GITHUB}
            value={
              isCandidateLocked ? (
                <Mask />
              ) : (
                <a
                  href={candidate.github}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {candidate.github}
                </a>
              )
            }
          />
        </HeadingLabelValueView>
        <HeadingLabelValueView
          label={UI.PERSONAL_INFORMATION}
          condition={
            !!(
              candidate?.about ||
              candidate?.gender ||
              candidate?.dob ||
              candidate?.city?.name ||
              candidate?.address ||
              candidate?.passport
            )
          }
        >
          <LabelValueView
            condition={candidate?.gender}
            label={UI.GENDER}
            value={getGender(candidate.gender)}
          />

          <LabelValueView
            condition={candidate?.dob}
            label={UI.DATE_OF_BIRTH}
            value={getFormattedDate(candidate.dob)}
          />

          <LabelValueView
            condition={candidate?.city?.name}
            label={UI.CITY}
            value={candidate.city?.name}
          />
          <LabelValueView
            condition={candidate?.address}
            label={UI.ADDRESS}
            value={isCandidateLocked ? <Mask /> : candidate?.address}
          />

          <LabelValueView
            condition={candidate?.passport}
            label={UI.PASSPORT_NUMBER}
            value={isCandidateLocked ? <Mask /> : candidate?.passport}
          />
        </HeadingLabelValueView>
      </div>
    </>
  );
}

CandidateDetail.propTypes = {
  detail: PropTypes.object,
  onAction: PropTypes.func,
  pageType: PropTypes.number,
};

CandidateDetail.defaultProps = {
  detail: EMPTY_OBJECT,
  onAction: noop,
  pageType: PAGE_TYPE.DEFAULT_PAGE,
};

export default CandidateDetail;
