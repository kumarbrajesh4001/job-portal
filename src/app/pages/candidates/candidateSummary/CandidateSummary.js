import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { noop, head } from 'lodash';
import { BsDot } from 'react-icons/bs';
import Tooltip from '@mui/material/Tooltip';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Mask from '../../../components/mask/Mask';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../constants';
import {
  getCandidateActions,
  getIsCandidateLocked,
} from '../candidates.helper';
import Content from '../../../components/content';
import { API_URL } from '../../../constants/apiUrls';
import getPrefixAndUpperName from '../../../helpers/ prefixAndUpperName';
import ActionMenu from '../../../components/actionMenu';
import PAGE_TYPE from '../../../constants/pageType';
import UI from '../../../constants/ui';
import SummarySkillsRating from '../SummarySkillsRating';
import CandidatesTypeStatusAndTime from '../CandidatesTypeStatusAndTime';
import {
  SUMMARY_BADGE_HEIGHT,
  SUMMARY_BADGE_WIDTH,
} from '../candidates.constants';
import Availability from '../Availability';
import Remark from '../../../components/remark';

function CandidateSummary(props) {
  const { onAction, item: candidate, pageType } = props;
  const [candidateActions, setCandidateActions] = useState(EMPTY_ARRAY);

  useEffect(() => {
    const updatedCandidateActions = getCandidateActions(candidate);
    setCandidateActions(updatedCandidateActions);
  }, [candidate]);

  const isCandidateLocked = useMemo(
    () => getIsCandidateLocked(candidate),
    [candidate]
  );

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          {candidate.badges?.map((badge, index) => (
            <Tooltip key={index} title={badge.tooltip.join(', ')}>
              <img
                src={badge.icon}
                alt={UI.ALT_BADGE}
                width={SUMMARY_BADGE_HEIGHT}
                height={SUMMARY_BADGE_WIDTH}
                className="me-2 mb-2"
              />
            </Tooltip>
          ))}

          <div className="d-flex align-items-center">
            <div className="me-2">
              {isCandidateLocked ? (
                <span className="justify-content-center d-flex logo-summary-size background-D7D7D7 logo">
                  <LockOutlinedIcon />
                </span>
              ) : (
                <span>
                  {candidate.photo ? (
                    <img
                      src={`${API_URL.PHOTO_PRE}${candidate.photo}`}
                      alt={UI.ALT_LOGO}
                      className="logo-summary-size logo"
                    />
                  ) : (
                    <span className="justify-content-center d-flex logo-summary-size logo-text logo">
                      {getPrefixAndUpperName(candidate.name)}
                    </span>
                  )}
                </span>
              )}
            </div>

            <div className="text-truncate">
              {isCandidateLocked ? (
                <div className={candidate.jobs?.length ? 'mb-1' : 'mb-3'}>
                  <Mask />
                </div>
              ) : (
                <div
                  className={`headline-5-bold color-1F2830 ${
                    candidate.jobs?.length ? 'mb-1' : 'mb-3'
                  }`}
                >
                  {candidate.name}
                </div>
              )}

              <div className="subtitle-1 color-5B5B5B">
                <Content condition={candidate.jobs?.length}>
                  <div>
                    {head(candidate.jobs)?.title}
                    {head(candidate.jobs)?.company && (
                      <>
                        <BsDot />
                        {head(candidate.jobs)?.company}
                      </>
                    )}
                  </div>
                </Content>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ActionMenu actions={candidateActions} onAction={onAction} />
        </div>
      </div>

      <SummarySkillsRating candidate={candidate} />

      <div className="d-flex justify-content-end">
        <Availability candidate={candidate} />
      </div>

      <div className="mt-1">
        <CandidatesTypeStatusAndTime
          candidate={candidate}
          pageType={pageType}
        />
      </div>
      <Remark state={candidate} />
    </>
  );
}

CandidateSummary.propTypes = {
  item: PropTypes.object,
  onAction: PropTypes.func,
  pageType: PropTypes.number,
};

CandidateSummary.defaultProps = {
  item: EMPTY_OBJECT,
  onAction: noop,
  pageType: PAGE_TYPE.DEFAULT_PAGE,
};

export default CandidateSummary;
