import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import UI from '../../constants/ui';
import { getFormattedDate } from '../../formatter/date';
import ratingColor from '../../helpers/colorCode';
import { getRating } from '../../formatter/commonBootstrap';
import { DEFAULT_RATING, EMPTY_ARRAY } from '../../constants';
import styles from './assessment.module.css';

function AttemptsHistory(props) {
  const { assessmentHistory, isLoading } = props;

  return (
    <div
      className={`px-3 ${isLoading && 'text-center'} ${
        styles.attemptHistoryWidth
      }`}
    >
      {isLoading ? (
        <CircularProgress size="1rem" color="inherit" />
      ) : (
        <div className={styles.attemptyHistoryPopOver}>
          <Divider className="mb-2" />
          <div className="d-flex justify-content-between subtitle-2-bold color-000000">
            <div>{UI.DATE}</div>
            <div>{UI.RATING}</div>
          </div>

          {assessmentHistory?.map((completedAssessment, index) => (
            <div className="d-flex justify-content-between my-1" key={index}>
              <div>{getFormattedDate(completedAssessment.testlmd)}</div>
              {completedAssessment.rating ? (
                <div className={ratingColor(completedAssessment.rating)}>
                  {completedAssessment.rating === DEFAULT_RATING
                    ? UI.NOT_PASSED
                    : getRating(completedAssessment.rating)}
                </div>
              ) : (
                <div className="color-AAAAAA">{UI.NO_RESULT}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
AttemptsHistory.propTypes = {
  assessmentHistory: PropTypes.array,
  isLoading: PropTypes.bool,
};

AttemptsHistory.defaultProps = {
  assessmentHistory: EMPTY_ARRAY,
  isLoading: false,
};

export default AttemptsHistory;
