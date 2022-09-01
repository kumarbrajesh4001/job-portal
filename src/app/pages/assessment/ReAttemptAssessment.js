import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import reattemptImage from './images/reattempt.svg';
import disabledReattemptImage from './images/disabledReattempt.svg';
import UI from '../../constants/ui';
import { DEFAULT_RATING, EMPTY_OBJECT } from '../../constants';
import ASSESSMENT_STATE from '../../constants/assessmentState';

function ReAttemptAssessment(props) {
  const { onRestartTest, onHandleVisibility, completedAssessment } = props;

  return (
    <>
      <div>
        <Button
          onClick={onRestartTest(completedAssessment.id)}
          disabled={!!completedAssessment.nextattempt}
          startIcon={
            <img
              src={
                completedAssessment.nextattempt
                  ? disabledReattemptImage
                  : reattemptImage
              }
              alt={UI.RE_ATTEMPT}
            />
          }
        >
          <span
            className={
              completedAssessment.nextattempt ? 'color-AAAAAA' : 'color-1D8FF2'
            }
          >
            {UI.RE_ATTEMPT}
          </span>
        </Button>
      </div>

      <FormControlLabel
        sx={{ marginLeft: 0 }}
        control={<Switch checked={completedAssessment.visibility} />}
        label={
          <span
            className={`button ${
              completedAssessment.state === ASSESSMENT_STATE.TERMINATED ||
              completedAssessment.state === ASSESSMENT_STATE.EXPIRED ||
              completedAssessment.rating === DEFAULT_RATING
                ? 'color-AAAAAA'
                : 'color-1D8FF2'
            }`}
          >
            {UI.SHOW_TO_EMPLOYER}
          </span>
        }
        labelPlacement="start"
        onChange={() =>
          onHandleVisibility(
            completedAssessment.assessmentId,
            completedAssessment.visibility
          )
        }
        disabled={
          completedAssessment.state === ASSESSMENT_STATE.TERMINATED ||
          completedAssessment.state === ASSESSMENT_STATE.EXPIRED ||
          completedAssessment.rating === DEFAULT_RATING
        }
      />
    </>
  );
}

ReAttemptAssessment.propTypes = {
  onRestartTest: PropTypes.func,
  onHandleVisibility: PropTypes.func,
  completedAssessment: PropTypes.object,
};

ReAttemptAssessment.defaultProps = {
  onRestartTest: noop,
  onHandleVisibility: noop,
  completedAssessment: EMPTY_OBJECT,
};

export default ReAttemptAssessment;
