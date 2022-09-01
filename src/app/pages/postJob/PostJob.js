import React, { useState, useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import last from 'lodash/last';
import { Container, Grid, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  EMPTY_ARRAY,
  OTHER_SALARY_ID,
  REMOTE_ID,
  SALARY_AS_PER_INDUSTRY_STANDARD,
} from '../../constants';

import { getRequest, postRequest } from '../../services';
import { getMinSalary, getMaxSalary } from '../../formatter/employerBootstrap';

import JOB_STATE from '../../constants/jobState';
import URL from '../../constants/urls';
import NEW_JOB_ID from './constant/postJob.constant';
import { requestDTO } from './postJob.helper';
import getQueryParams from '../../helpers/getQueryParams';
import SkillsRatingsExp from '../../components/candidateComponent/SkillsRatingsExp';
import getObjectFromStr from '../../helpers/getObjectFromStr';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import { getPostJobUrl, getEmployerJobData } from '../../constants/apiUrls';
import EMPLOYER_JOB_ACTION_NAME from '../../constants/employerJobActionName';
import Content from '../../components/content';

import { JobDetails, SkillsAndExperience, OtherDetails } from './component';
import {
  ACTIVE_STEPS_POST_JOB,
  STEPS_FOR_JOB_POSTS,
} from './constant/postJob.steps';
import POST_JOB_SCHEMA from './postJob.schema';
import UI from '../../constants/ui';
import CustomStepper from '../../components/stepper';
import { portalScrollTop } from '../../utils/scroll';
import useMobileDevice from '../../hooks/useMobileDevice';
import StickyButtonForBackAndNext from '../../components/stickyButtonForBackAndNext';

function PostJob() {
  const navigate = useNavigate();
  const isMobileDevice = useMobileDevice();
  const { jobId, action, recentSearch } = getQueryParams();
  const [activeStep, setActiveStep] = useState(0);
  const [skillWithRatingList, setSkillWithRatingList] = useState();
  const [isOtherSalary, setIsOtherSalary] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(NEW_JOB_ID);
  const [locations, setLocations] = useState();
  const [payBenefits, setPayBenefits] = useState(EMPTY_ARRAY);
  const [otherBenefits, setOtherBenefits] = useState(EMPTY_ARRAY);
  const [isEnableJobLoc, setIsEnableJobLoc] = useState(false);
  const [isDraftButtonShow, setIsDraftButtonShow] = useState(true);
  // const [preRequisiteList, setPreRequisiteList] = useState();

  const methods = useForm({
    resolver: yupResolver(POST_JOB_SCHEMA),
    mode: 'onChange',
  });

  const {
    setFocus,
    handleSubmit,
    getValues,
    setValue,
    reset,
    trigger,
    formState: { isValid },
  } = methods;

  const [opensnackbar, setSnackbarOpen] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  useEffect(() => {
    if (jobId) {
      getRequest(getEmployerJobData(jobId))
        .then((jobDetail) => {
          reset(jobDetail);
          setIsOtherSalary(jobDetail.salary.id === OTHER_SALARY_ID);
          setLocations(jobDetail.joblocations);
          setSkillWithRatingList(jobDetail.skills);
          setCurrentJobId(jobId);
          setPayBenefits(jobDetail.paybenefits);
          setOtherBenefits(jobDetail.paybenefits);
          if (
            last(jobDetail.states)?.state === JOB_STATE.PUBLISHED &&
            action === EMPLOYER_JOB_ACTION_NAME.EDIT
          ) {
            setIsDraftButtonShow(false);
          }
        })
        .catch(() => {});
    } else {
      setValue('alwaysopen', true);
      setValue('salary.id', SALARY_AS_PER_INDUSTRY_STANDARD);
      setValue('salary.min', SALARY_AS_PER_INDUSTRY_STANDARD);
      setValue('salary.max', SALARY_AS_PER_INDUSTRY_STANDARD);
    }
  }, [jobId]);

  useEffect(() => {
    const recentSearchObj = getObjectFromStr(recentSearch);
    setLocations(recentSearchObj.location);
    setSkillWithRatingList(recentSearchObj.skill);
  }, [recentSearch]);

  useEffect(() => {
    setValue('skills', skillWithRatingList, { shouldValidate: true });
  }, [skillWithRatingList]);

  useEffect(() => {
    setValue('joblocations', locations, { shouldValidate: true });
  }, [locations]);

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  const onSalaryChange = useCallback((value) => {
    setValue('salary.id', value);
    if (value !== OTHER_SALARY_ID) {
      setValue('salary.min', getMinSalary(value));
      setValue('salary.max', getMaxSalary(value));
    } else if (value === OTHER_SALARY_ID) {
      setValue('salary.min', '');
      setValue('salary.max', '');
    }
    setIsOtherSalary(value === OTHER_SALARY_ID);
  });

  const onWorkLocationChange = useCallback((value) => {
    const isRemote = value === REMOTE_ID;
    setIsEnableJobLoc(isRemote);
    if (isRemote) {
      setLocations(EMPTY_ARRAY);
    }
  }, EMPTY_ARRAY);

  const makeRequest = (currentJobState, jobPostMode) => {
    const values = getValues();
    if (currentJobState === NEW_JOB_ID) {
      values.id = undefined;
    }
    const requestPayload = requestDTO(values);

    postRequest(getPostJobUrl(currentJobState, jobPostMode), requestPayload)
      .then(() => {
        setSnackbarOpen({
          setopen: true,
          message: UI.JOB_UPDATED_SUCCESSFULLY,
          severity: 'success',
        });
        navigate(URL.POSTED_JOBS);
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      });
  };

  const middleWareMakeRequest = (jobPostMode) => {
    if (action === EMPLOYER_JOB_ACTION_NAME.REPOST) {
      makeRequest(NEW_JOB_ID, jobPostMode);
    } else {
      makeRequest(currentJobId, jobPostMode);
    }
  };

  const handleSaveAsDraft = () => {
    middleWareMakeRequest(JOB_STATE.DRAFT);
  };

  const handlePublish = () => {
    middleWareMakeRequest(JOB_STATE.PUBLISHED);
  };

  const handleValidateCurrentPage = async (selectedActiveStep) => {
    const { validationFields } = STEPS_FOR_JOB_POSTS[activeStep];
    const isValidFields = await trigger(validationFields);
    if (isValidFields) {
      setActiveStep(selectedActiveStep);
    }
    return isValidFields;
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    portalScrollTop(0);
  };

  const handleNext = async () => {
    const isValidFields = await handleValidateCurrentPage(activeStep);
    if (isValidFields) {
      setActiveStep(activeStep + 1);
      portalScrollTop(0);
    }
  };

  const getComponent = (step) => {
    switch (step) {
      case ACTIVE_STEPS_POST_JOB.JOB_DETAILS:
        return (
          <JobDetails
            onSalaryChange={onSalaryChange}
            isOtherSalary={isOtherSalary}
            locations={locations}
            setLocations={setLocations}
            isEnableJobLoc={isEnableJobLoc}
            onWorkLocationChange={onWorkLocationChange}
          />
        );
      case ACTIVE_STEPS_POST_JOB.SKILLS_AND_EXPERIENCE:
        return (
          <SkillsAndExperience
            SkillsRatingsExp={SkillsRatingsExp}
            setSkillWithRatingList={setSkillWithRatingList}
            skillWithRatingList={skillWithRatingList}
          />
        );
      case ACTIVE_STEPS_POST_JOB.OTHER_DETAILS:
        return (
          <OtherDetails
            payBenefits={payBenefits}
            otherBenefits={otherBenefits}
            setPayBenefits={setPayBenefits}
            setOtherBenefits={setOtherBenefits}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ backgroundColor: '#fafdff' }}>
        <FormProvider {...methods}>
          <div className={isMobileDevice && 'mb-5'}>
            <div className="d-md-flex justify-content-between align-items-center">
              <div className="my-2">
                <span className="headline-4-bold">{UI.POST_JOB}</span>
                <div className="body-2">{UI.POST_JOBS_PROFILE_MSG}</div>
              </div>
              <div className="text-end">
                <Content condition={isDraftButtonShow}>
                  <Button
                    disabled={!isValid}
                    sx={{ mr: 2 }}
                    onClick={handleSubmit(handleSaveAsDraft)}
                    type="button"
                    variant="outlined"
                    size="large"
                  >
                    {UI.SAVE_AS_DRAFT}
                  </Button>
                </Content>
                <Button
                  disabled={!isValid}
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit(handlePublish)}
                >
                  {UI.POST_JOB}
                </Button>
              </div>
            </div>

            <Grid container mt={2}>
              <Grid item xs={12} md={3}>
                <CustomStepper
                  activeStep={activeStep}
                  tabsName={STEPS_FOR_JOB_POSTS}
                  onValidatedCurrentPage={handleValidateCurrentPage}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <div className="profile_form_box  mb-4">
                  <form className="row d-flex justify-content-center">
                    {getComponent(activeStep)}
                    <StickyButtonForBackAndNext
                      totalNumberOfSteps={STEPS_FOR_JOB_POSTS.length}
                      handleNext={handleNext}
                      handleBack={handleBack}
                      activeStep={activeStep}
                    />
                  </form>
                </div>
              </Grid>
            </Grid>
          </div>
        </FormProvider>
        <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
      </Container>
    </div>
  );
}

export default PostJob;
