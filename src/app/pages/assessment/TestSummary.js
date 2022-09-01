import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useSearchParams } from 'react-router-dom';
import { CommonSkeleton } from '../../components/skeleton';
import { secondToMintute } from '../../formatter/date';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import styles from './assessment.module.css';
import UI from '../../constants/ui';
import PortalPopover from '../../components/portalPopover';
import AssessmentGuidelines from './AssessmentGuidelines';
import getAssessmentGuidelines from './assessment.service';

function TestSummary(props) {
  const {
    startTestResponse,
    testStartTime,
    questionResponse,
    spentTimeOnQuestion,
  } = props;

  const [isGuideLineSkeletonShow, setIsGuideLineSkeletonShow] = useState(false);
  const [guidelines, setGuidelines] = useState(EMPTY_ARRAY);

  const [anchorEl, setAnchorEl] = useState(null);

  const [searchParams] = useSearchParams();
  const techIdParam = searchParams.get('techId');

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsGuideLineSkeletonShow(true);
    getAssessmentGuidelines(techIdParam)
      .then(setGuidelines)
      .finally(() => setIsGuideLineSkeletonShow(false));
  }, EMPTY_ARRAY);

  return (
    <>
      <div className="mt-3">
        <Button
          className="border-0 border-bottom border-primary"
          onClick={handlePopoverOpen}
        >
          <HelpOutlineIcon />

          <span className="subtitle-2 color-1D8FF2 ms-1">
            {UI.READ_TO_INSTRUCTIONS}
          </span>
        </Button>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <div>
          <span className="subtitle-2 color-000000">
            {UI.NUMBER_OF_QUESTIONS} :
          </span>
          <span className="subtitle-1-bold color-000000 ms-2">
            {questionResponse.quesNo} / {startTestResponse.totalques}
          </span>
        </div>
        <div className="d-flex">
          <div className="subtitle-2 color-000000">
            {UI.TIME_SPENT_ON_THIS_QUESTION}:
          </div>
          <div className={`subtitle-2 color-1D8FF2 ms-2 ${styles.time}`}>
            {secondToMintute(spentTimeOnQuestion)}
          </div>
        </div>
        <div className="subtitle-2 color-000000 d-flex align-content-center">
          <div>
            <WatchLaterOutlinedIcon /> {UI.REMANING_TIME}:
          </div>
          <div className={`ms-2 ${styles.time}`}>
            {secondToMintute(startTestResponse.totaltime - testStartTime)}
          </div>
        </div>
      </div>

      <PortalPopover
        portalPopoverOpen={anchorEl}
        onClosePortalPopover={handlePopoverClose}
        title={UI.GENERAL_INSTRUCTION}
        isLeft
      >
        {isGuideLineSkeletonShow ? (
          <CommonSkeleton />
        ) : (
          <AssessmentGuidelines guidelines={guidelines} />
        )}
      </PortalPopover>
    </>
  );
}

TestSummary.propTypes = {
  startTestResponse: PropTypes.object,
  testStartTime: PropTypes.number,
  questionResponse: PropTypes.object,
  spentTimeOnQuestion: PropTypes.number,
};

TestSummary.defaultProps = {
  startTestResponse: EMPTY_OBJECT,
  testStartTime: 0,
  questionResponse: EMPTY_OBJECT,
  spentTimeOnQuestion: 0,
};

export default TestSummary;
