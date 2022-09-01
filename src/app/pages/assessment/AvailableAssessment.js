import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import getPluralize from '../../helpers/plural';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import { getRequest } from '../../services';
import { getAvailableAssessment, API_URL } from '../../constants/apiUrls';
import URL from '../../constants/urls';
import addPadding from '../../formatter/addPadding';
import { getAssessmentCategoryList } from '../../formatter/commonBootstrap';
import StartAssessmentDialog from './dialogs/StartAssessmentDialog';
import UI from '../../constants/ui';

function AvailableAssessment() {
  const [availableAssessment, setAvailableAssessment] = useState(EMPTY_ARRAY);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [preAssessmentCheckResponse, setPreAssessmentCheckResponse] =
    useState(EMPTY_OBJECT);
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);
  const [selectedStartTestTechId, setSelectedStartTestTechId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType] = useState(0);

  const [opensnackbar, setSnackbarOpen] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  useEffect(() => {
    getRequest(getAvailableAssessment(selectedType, selectedCategory))
      .then(setAvailableAssessment)
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      });
  }, [selectedCategory, selectedType]);

  const startTest = (techId) => {
    window.open(
      `${URL.GUIDELINES}?techId=${techId}`,
      URL.GUIDELINES,
      'width=auto,height=auto'
    );
  };

  const handlePreAssessmentCheck = (techId) => {
    setSelectedStartTestTechId(techId);
    setIsLoading(true);
    getRequest(API_URL.PRE_ASSESSMENT_CHECK)
      .then((response) => {
        setIsStartDialogOpen(true);
        setPreAssessmentCheckResponse(response);
      })
      .finally(() => setIsLoading(false));
  };

  const handleStartConfirmationClose = () => {
    setIsStartDialogOpen(false);
  };

  const handleStartConfirmation = () => {
    handleStartConfirmationClose();
    startTest(selectedStartTestTechId);
  };

  return (
    <div className="my-1">
      <div className="mt-4 headline-5-bold color-000000 ">
        {UI.AVAILABLE}
        <span className="ms-1">
          {getPluralize(UI.ASSESSMENT, availableAssessment?.length)}
        </span>
      </div>

      <div className="row mt-4">
        <div className="col-sm-1 mb-2 mb-md-0 mt-md-2 body-2 color-5B5B5B">
          {UI.SKILL_TYPE}:
        </div>
        <div className="col-sm-11">
          <Stack
            className="body-2 color-5B5B5B"
            direction="row"
            sx={{ flexWrap: 'wrap' }}
          >
            {getAssessmentCategoryList()?.map((category, index) => (
              <Chip
                className="me-2 mb-md-0 mb-2"
                label={category.value}
                variant={
                  category.id === selectedCategory ? undefined : 'outlined'
                }
                color={category.id === selectedCategory ? 'primary' : undefined}
                onClick={() => {
                  if (selectedCategory === category.id) {
                    setSelectedCategory(0);
                  } else {
                    setSelectedCategory(category.id);
                  }
                }}
                key={index}
              />
            ))}
          </Stack>
        </div>
      </div>

      <div className="justify-content-end d-flex subtitle-2">
        <span className="color-5B5B5B">
          {UI.TOTAL}
          <span className="mx-1">
            {getPluralize(
              UI.ASSESSMENT,
              availableAssessment?.length
            ).toLowerCase()}
          </span>
          {UI.FOUND}:
        </span>
        <span className="ms-1 color-1F2830">
          {addPadding(availableAssessment?.length)}
        </span>
      </div>
      {availableAssessment?.length === 0 ? (
        <div className="headline-4 text-center my-5 color-000000">
          {UI.NO_RESULT_FOUND}
        </div>
      ) : (
        <div className="row mt-4">
          {availableAssessment?.map((assessment, index) => (
            <div className="col-sm-4 mb-3" key={index}>
              <div className="card-border px-4 py-3">
                <div className="fs-4 headline-5-bold color-000000">
                  {assessment?.dispName}
                </div>
                <Tooltip title={assessment?.description}>
                  <div className="body-2 color-5B5B5B mt-2 text-truncate">
                    {assessment?.description}
                  </div>
                </Tooltip>
                <div className="subtitle-2 color-5B5B5B mt-2">
                  <span> {UI.QUESTIONS}:</span>
                  <span className="ms-1 subtitle-1-bold color-000000">
                    {assessment.ques}
                  </span>
                </div>

                <div className="mt-2">
                  <span className="subtitle-2 color-5B5B5B"> {UI.TIME}:</span>
                  <span className="ms-1 subtitle-1-bold color-000000">
                    {assessment.time / 60} {UI.MIN}
                  </span>
                </div>

                <Button
                  className="mt-2 button color-1D8FF2"
                  variant="outlined"
                  fullWidth
                  onClick={() => handlePreAssessmentCheck(assessment.techId)}
                  disabled={!assessment.ques || isLoading}
                  startIcon={
                    isLoading && (
                      <CircularProgress size="1rem" color="inherit" />
                    )
                  }
                >
                  {UI.START_TEST}
                </Button>
                <div className="justify-content-center d-flex mt-1 caption color-5B5B5B ">
                  {assessment.ques ? (
                    <span>
                      {UI.REQUIRES} {assessment.value}{' '}
                      {getPluralize(UI.POINT, assessment.value)}
                    </span>
                  ) : (
                    <span>{UI.APPLICABLE_WHEN_PROFILE_IS_UPDATED}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <StartAssessmentDialog
        isDialogOpen={isStartDialogOpen}
        primaryAction={handleStartConfirmation}
        secondaryAction={handleStartConfirmationClose}
        content={preAssessmentCheckResponse.msg}
        primaryLabel={preAssessmentCheckResponse.allowed ? UI.YES : ''}
        secondaryLabel={preAssessmentCheckResponse.allowed ? UI.NO : UI.CLOSE}
      />

      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}

export default AvailableAssessment;
