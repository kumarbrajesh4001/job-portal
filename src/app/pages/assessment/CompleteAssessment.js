import React, { useEffect, useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
  DEFAULT_RATING,
  DEFAULT_COMPLETE_ASSESSMENT_STATE,
  EMPTY_ARRAY,
} from '../../constants';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import { getRequest } from '../../services';
import {
  getAccept,
  getAssessmentHistory,
  getCompleteAssessment,
} from '../../constants/apiUrls';
import URL from '../../constants/urls';
import getPluralize from '../../helpers/plural';
import {
  getAssessmentStateList,
  getAssessmentState,
  getRating,
} from '../../formatter/commonBootstrap';
import addPadding from '../../formatter/addPadding';
import ratingColor from '../../helpers/colorCode';
import ReAttemptAssessment from './ReAttemptAssessment';
import useMobileDevice from '../../hooks/useMobileDevice';
import UI from '../../constants/ui';
import ASSESSMENT_STATE from '../../constants/assessmentState';
import { getFormattedDateTime } from '../../formatter/date';
import PortalPopover from '../../components/portalPopover';
import AttemptsHistory from './AttemptsHistory';

export default function CompleteAssessment() {
  const [completedAssessmentList, setCompletedAssessmentList] =
    useState(EMPTY_ARRAY);

  const isMobileDevice = useMobileDevice();
  const [isLoading, setIsLoading] = useState(false);
  const [opensnackbar, setSnackbarOpen] = useState();
  const [selectedState, setSelectedState] = useState(
    DEFAULT_COMPLETE_ASSESSMENT_STATE
  );
  const [attemptsHistoryOpen, setAttemptsHistoryOpen] = useState(null);

  const [assessmentHistory, setAssessmentHistory] = useState(EMPTY_ARRAY);

  const openAttemptsHistory = (techId) => (event) => {
    setIsLoading(true);
    getRequest(getAssessmentHistory(techId))
      .then((res) => {
        setAssessmentHistory(res);
      })
      .finally(() => setIsLoading(false));

    setAttemptsHistoryOpen(attemptsHistoryOpen ? null : event?.currentTarget);
  };

  const closeAttemptsHistory = () => {
    setAttemptsHistoryOpen(null);
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const fetchCompletedAssessmentList = () => {
    getRequest(getCompleteAssessment(selectedState))
      .then(setCompletedAssessmentList)
      .catch((error) =>
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        })
      );
  };

  useEffect(() => fetchCompletedAssessmentList(), [selectedState]);

  const changeVisibilty = (assessmentId, acceptVisibilty) => {
    setCompletedAssessmentList(
      completedAssessmentList.map((cv) => {
        if (cv.assessmentId === assessmentId) {
          return { ...cv, visibility: acceptVisibilty };
        }
        return cv;
      })
    );
  };

  const handleVisibility = (assessmentId, isVisible) => {
    getRequest(getAccept(assessmentId, !isVisible)).then(() => {
      changeVisibilty(assessmentId, !isVisible);
    });
  };

  const restartTest = (techId) => () => {
    window.open(
      `${URL.GUIDELINES}?techId=${techId}`,
      URL.GUIDELINES,
      'width=auto,height=auto'
    );
  };

  return (
    <div>
      <div className="mt-4 headline-5-bold color-000000">
        {UI.MY}
        <span className="ms-1">
          {getPluralize(UI.ASSESSMENT, completedAssessmentList.length)}
        </span>
      </div>

      <Stack
        className="body-2 color-5B5B5B mt-4"
        direction="row"
        sx={{ flexWrap: 'wrap' }}
      >
        {getAssessmentStateList()?.map(
          (state, index) =>
            state.id > 2 && (
              <Chip
                className="me-2 mb-md-0 mb-2"
                label={state.value}
                variant={state.id === selectedState ? undefined : 'outlined'}
                color={state.id === selectedState ? 'primary' : undefined}
                onClick={() => {
                  if (selectedState === state.id) {
                    setSelectedState(DEFAULT_COMPLETE_ASSESSMENT_STATE);
                  } else {
                    setSelectedState(state.id);
                  }
                }}
                key={index}
              />
            )
        )}
      </Stack>

      <div
        className={`justify-content-end d-flex subtitle-2 ${
          isMobileDevice && 'mt-2'
        }`}
      >
        <span className="color-5B5B5B">
          {getPluralize(UI.ASSESSMENT, completedAssessmentList.length)}
          <span className="ms-1">{UI.COMPLETE}:</span>
        </span>
        <span className="ms-1 color-1F2830">
          {addPadding(completedAssessmentList.length)}
        </span>
      </div>

      {completedAssessmentList.length === 0 ? (
        <div className="headline-4 text-center my-5 color-000000">
          {UI.NO_RESULT_FOUND}
        </div>
      ) : (
        <div className="row mt-4">
          {completedAssessmentList?.map((completedAssessment, index) => (
            <div className="col-sm-4 mb-3" key={index}>
              <div className="card-border px-4 py-3">
                <div className="d-flex justify-content-between">
                  <span className="headline-5-bold color-000000 mb-2">
                    {completedAssessment.name}
                  </span>
                  <IconButton
                    onClick={openAttemptsHistory(completedAssessment.id)}
                  >
                    <HistoryIcon />
                  </IconButton>
                </div>

                <Tooltip title={completedAssessment?.description}>
                  <div className="body-2 color-5B5B5B text-truncate">
                    {completedAssessment?.description}
                  </div>
                </Tooltip>

                {completedAssessment.rating && (
                  <div className="mt-2">
                    <span className="body-2 color-5B5B5B">
                      {UI.SKILL_RATING}:
                    </span>

                    <span
                      className={`body-2-bold ms-1 ${ratingColor(
                        completedAssessment.rating
                      )}`}
                    >
                      {completedAssessment.rating === DEFAULT_RATING
                        ? UI.NEED_IMPROVEMENT
                        : getRating(completedAssessment.rating)}
                    </span>
                  </div>
                )}

                {completedAssessment.state === ASSESSMENT_STATE.TERMINATED && (
                  <div className="color-EB0000 mt-2">
                    {getAssessmentState(completedAssessment.state)}
                  </div>
                )}

                {completedAssessment.state === ASSESSMENT_STATE.EXPIRED && (
                  <div className="color-EB0000 mt-2">
                    {getAssessmentState(completedAssessment.state)}
                  </div>
                )}
                {completedAssessment.validity && (
                  <div className="mt-2">
                    <span className="body-2 color-5B5B5B">{UI.VALIDITY}:</span>

                    <span className="body-2 color-5B5B5B ms-1">
                      {completedAssessment.validity}{' '}
                      {getPluralize(UI.DAY, completedAssessment.validity)}
                    </span>
                  </div>
                )}

                <div className="mt-2">
                  {completedAssessment.nextattempt ? (
                    <>
                      <span className="body-2 color-5B5B5B">
                        {UI.NEXT_ATTEMPT}:
                      </span>
                      <span className="body-2 color-5B5B5B ms-1">
                        {getFormattedDateTime(completedAssessment.nextattempt)}
                      </span>
                    </>
                  ) : (
                    <>&nbsp;</>
                  )}
                </div>

                <div className="mt-2 d-xxl-flex justify-content-lg-between">
                  <ReAttemptAssessment
                    onHandleVisibility={handleVisibility}
                    onRestartTest={restartTest}
                    completedAssessment={completedAssessment}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <PortalPopover
        portalPopoverOpen={attemptsHistoryOpen}
        onClosePortalPopover={closeAttemptsHistory}
        title={UI.ATTEMPTS_HISTORY}
        isLoading={isLoading}
      >
        <AttemptsHistory
          isLoading={isLoading}
          assessmentHistory={assessmentHistory}
        />
      </PortalPopover>

      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}
