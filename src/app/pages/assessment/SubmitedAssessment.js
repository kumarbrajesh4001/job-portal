import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import congratulationsImage from './images/congratulations.png';
import lessRating from './images/lessRating.png';
import { DEFAULT_RATING, EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import { getRating } from '../../formatter/commonBootstrap';
import { getRequest } from '../../services';
import { getAccept } from '../../constants/apiUrls';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import ratingColor from '../../helpers/colorCode';
import UI from '../../constants/ui';

function SubmitedAssessment(props) {
  const { submitAssessmentResponse } = props;

  const [checked, setChecked] = useState(true);

  const [opensnackbar, setSnackbarOpen] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const handleVisibility = () => {
    const isVisible = !checked;
    setChecked(isVisible);
    getRequest(getAccept(submitAssessmentResponse.assessmentId, isVisible))
      .then()
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      });
  };

  useEffect(() => {
    if (submitAssessmentResponse.rating !== DEFAULT_RATING) {
      getRequest(getAccept(submitAssessmentResponse.assessmentId, checked))
        .then()
        .catch((error) => {
          setSnackbarOpen({
            setopen: true,
            message: error.msg,
            severity: 'error',
          });
        });
    }
  }, EMPTY_ARRAY);

  return (
    <div className="container card-border  p-3 mt-5">
      <div className="justify-content-center d-flex">
        {submitAssessmentResponse.rating === DEFAULT_RATING ? (
          <img src={lessRating} alt={UI.ALT_LESS_RATING} />
        ) : (
          <img src={congratulationsImage} alt={UI.ALT_CONGRATULATIONS} />
        )}
      </div>
      <div className="justify-content-center d-flex mt-3">
        <div className="subtitle-1 color-000000">{UI.SUBMIT_SUCCESSFUL}</div>
      </div>

      <div className="justify-content-center d-flex mt-4">
        <div>
          {submitAssessmentResponse.rating === DEFAULT_RATING ? (
            <div className="color-F25C05 w-75 m-auto">
              {UI.YOUR_SCORE_IS_VERY_LESS}
            </div>
          ) : (
            <>
              <div className="subtitle-1-bold color-1F2830">
                {UI.YOUR_SKILL_RATING}:
              </div>
              <div
                className={`headline-5-bold mt-2 text-center ${ratingColor(
                  submitAssessmentResponse.rating
                )}`}
              >
                {getRating(submitAssessmentResponse.rating)}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="justify-content-center d-flex mt-4">
        {submitAssessmentResponse.rating !== DEFAULT_RATING && (
          <span className="button color-1D8FF2">
            {UI.SHOW_TO_EMPLOYER}
            <Switch checked={checked} onChange={handleVisibility} />
          </span>
        )}

        <Button
          variant="contained"
          onClick={() => {
            window.close();
          }}
          className="ms-5"
        >
          {UI.CLOSE}
        </Button>
      </div>
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}

SubmitedAssessment.propTypes = { submitAssessmentResponse: PropTypes.object };
SubmitedAssessment.defaultProps = { submitAssessmentResponse: EMPTY_OBJECT };

export default SubmitedAssessment;
