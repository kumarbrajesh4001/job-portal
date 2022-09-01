import React, { useEffect, useState, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Container,
  Grid,
  Button,
  Slider,
  CircularProgress,
} from '@mui/material';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import requestDTO from './candidateProfileForm.helper';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import { EMPTY_ARRAY, FRESHER_ID } from '../../constants';
import { API_URL } from '../../constants/apiUrls';
import { getRequest, putRequest } from '../../services';
import { getFileSizeForDisplay } from '../../constants/fileSizes';
import { fileUploader, isFileSizeInLimit } from '../../helpers/fileUploader';
import {
  ACTIVE_STEPS_CANDIDATE,
  STEP_FOR_CANDIDATE_PROFILE,
} from './constant/cadidateProfile.steps';
import {
  JobDescription,
  PersonalInformation,
  OtherImportantThings,
  CandidateBreak,
  CandidateCertifications,
  CandidateEducation,
  CandidateJobsHistory,
  CandidateSkills,
  CandidateTools,
  Schooling,
} from './components';
import ERROR_MESSAGE from '../../constants/errorMsgs';
import CANDIDATE_PROFILE_SCHEMA from './CandidateProfile.schema';
import { getRelativeTime } from '../../formatter/date';
import { getCandidateKeyList } from '../../formatter/profilepct';
import getProfileCompletitionPercentage from '../../helpers/getProfileCompletitionPercentage';
import ASSET_TYPE from '../../constants/assets';

import UI from '../../constants/ui';
import CustomStepper from '../../components/stepper/CustomStepper';
import { portalScrollTop } from '../../utils/scroll';
import useMobileDevice from '../../hooks/useMobileDevice';
import StickyButtonForBackAndNext from '../../components/stickyButtonForBackAndNext';

function CandidateProfileForm() {
  const [educationList, setEducationList] = useState();
  const [skills, setSkills] = useState();
  const [tools, setTools] = useState();
  const [certifications, setCertifications] = useState();
  const [jobs, setJobs] = useState();
  const [breaks, setBreaks] = useState();
  const [language, setLanguage] = useState();
  const [community, setCommunity] = useState();
  const [schooling, setSchooling] = useState();
  const [expShowHide, setExpShowHide] = useState(false);
  const [isFresher, setIsFresher] = useState(false);
  const [city, setCity] = useState();
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnyJobLocation, setIsAnyJobLocation] = useState();
  const [jobLocations, setJobLocations] = useState();
  const [opensnackbar, setSnackbarOpen] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const isMobileDevice = useMobileDevice();
  const [profileCompletionPercentage, setProfileCompletionPercentage] =
    useState(0);
  const methods = useForm({
    resolver: yupResolver(CANDIDATE_PROFILE_SCHEMA),
    mode: 'onChange',
  });

  const {
    setValue,
    reset,
    trigger,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const candidateKeyList = useMemo(() => getCandidateKeyList(), EMPTY_ARRAY);

  const getAndSetCompletionPercentage = (formValues) => {
    const profileCompletitionPercentage = getProfileCompletitionPercentage(
      candidateKeyList,
      formValues
    );

    setProfileCompletionPercentage(profileCompletitionPercentage);
  };

  const updateForm = (res) => {
    if (res.id) {
      if (res.jobexp === FRESHER_ID || res.fresher) {
        res.jobexp = undefined;
        setIsFresher(true);
      }
      reset(res);
      setEducationList(res.education);
      setSkills(res.skills);
      setTools(res.tools);
      setCertifications(res.certifications);
      setJobs(res.jobs);
      setBreaks(res.breaks);
      setLanguage(res.lang);
      setCommunity(res.community);
      setSchooling(res.schooling);
      setIsAnyJobLocation(res.anyjoblocation);
      if (res.anyjoblocation === true) {
        setIsAnyJobLocation(true);
      } else {
        setJobLocations(res.joblocations);
      }
      setCity(res.city);

      if (res?.expSalary?.any === true) {
        setExpShowHide(true);
        setValue('expSalary.salary', undefined);
      }
    }
  };

  useEffect(() => {
    getRequest(API_URL.CANDIDATE_SELF_PROFILE).then((res) => {
      updateForm(res);
      getAndSetCompletionPercentage(res);
    });
  }, EMPTY_ARRAY);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };
  useEffect(() => {
    if (isAnyJobLocation) {
      setJobLocations(EMPTY_ARRAY);
    }
  }, [isAnyJobLocation]);

  useEffect(() => {
    setValue('community', community);
  }, [community]);

  useEffect(() => {
    setValue('schooling', schooling);
  }, [schooling]);

  useEffect(() => {
    setValue('joblocations', jobLocations, { shouldValidate: true });
  }, [jobLocations]);

  useEffect(() => {
    setValue('city', city);
  }, [city]);

  useEffect(() => {
    setValue('skills', skills, { shouldValidate: true });
  }, [skills]);

  useEffect(() => {
    setValue('education', educationList, { shouldValidate: true });
  }, [educationList]);

  useEffect(() => {
    setValue('tools', tools, { shouldValidate: true });
  }, [tools]);

  const uploadFile = (event) => {
    const requestMaker = event.target.name;
    const file = event.target.files[0];
    let fileSizeFitForServer;
    if (file && requestMaker) {
      fileSizeFitForServer = isFileSizeInLimit(file, requestMaker);
    }
    if (!file || !requestMaker) {
      return;
    }

    if (fileSizeFitForServer) {
      setIsFileUploading(true);
      fileUploader(requestMaker, file)
        .then((res) => {
          setValue(requestMaker, res.msg);
          if (requestMaker === ASSET_TYPE.RESUME) {
            setValue('rud', new Date().getTime());
          }
          setSnackbarOpen({
            setopen: true,
            message: res.detailedMsg,
            severity: 'success',
          });
        })
        .catch((error) => {
          setSnackbarOpen({
            setopen: true,
            message: error.detailedMsg,
            severity: 'error',
          });
        })
        .finally(() => setIsFileUploading(false));
    } else {
      setSnackbarOpen({
        setopen: true,
        message: `${ERROR_MESSAGE.FILE_SIZE_MESSAGE} ${getFileSizeForDisplay(
          requestMaker
        )}${ERROR_MESSAGE.FILE_SIZE_EXT}`,
        severity: 'error',
      });
    }
  };

  const onDelete = (name, fileName) => {
    getRequest(`${API_URL.DELETE_FILE}${fileName}`)
      .then((res) => {
        setValue(name, undefined);
        setSnackbarOpen({
          setopen: true,
          message: res.detailedMsg,
          severity: 'success',
        });
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      });
  };
  const getFormValues = () =>
    requestDTO(
      getValues(),
      educationList,
      skills,
      tools,
      certifications,
      jobs,
      breaks,
      language,
      community,
      schooling,
      isFresher,
      city,
      candidateKeyList
    );

  const onSubmit = () => {
    const requestPayload = getFormValues();
    setIsLoading(true);
    setProfileCompletionPercentage(requestPayload.profilepct);
    putRequest(API_URL.CANDIDATE_SELF_PROFILE, requestPayload)
      .then((res) => {
        setValue('lmd', new Date().getTime());
        updateForm(res);
        setSnackbarOpen({
          setopen: true,
          message: res.msg,
          severity: 'success',
        });
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const onChangeFresher = (event) => {
    const isChecked = event.target.checked;
    setValue('fresher', isChecked, { shouldValidate: true });
    setValue('jobexp', undefined, { shouldValidate: true });
    setIsFresher(isChecked);
  };

  const onChangeSalary = (event) => {
    const isChecked = event.target.checked;
    setValue(
      'expSalary',
      { negotiable: undefined, salary: null, any: isChecked },
      { shouldValidate: true }
    );
    setExpShowHide(isChecked);
  };

  const onChangeOpenToWork = (event) => {
    const isChecked = event.target.checked;
    setIsAnyJobLocation(isChecked);
    setValue('anyjoblocation', isChecked, { shouldValidate: true });
    if (isChecked) {
      setJobLocations(EMPTY_ARRAY);
    }
  };

  // ////////////////////Start slider code /////////////////////////

  const handleValidateCurrentPage = async (selectedActiveStep) => {
    const { validationFields } = STEP_FOR_CANDIDATE_PROFILE[activeStep];
    const isValidFields = await trigger(validationFields);

    if (isValidFields) {
      getAndSetCompletionPercentage(getFormValues());
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
      case ACTIVE_STEPS_CANDIDATE.PERSONAL_INFORMATION:
        return (
          <PersonalInformation
            isFileUploading={isFileUploading}
            setCity={setCity}
            city={city}
            onChange={uploadFile}
            onDelete={onDelete}
          />
        );
      case ACTIVE_STEPS_CANDIDATE.JOB_DESCRIPTION:
        return (
          <JobDescription
            onChangeFresher={onChangeFresher}
            isFresher={isFresher}
            expShowHide={expShowHide}
            onChangeSalary={onChangeSalary}
            setJobLocations={setJobLocations}
            jobLocations={jobLocations}
            onChangeOpenToWork={onChangeOpenToWork}
            isAnyJobLocation={isAnyJobLocation}
          />
        );

      case ACTIVE_STEPS_CANDIDATE.SKILLS:
        return <CandidateSkills setSkills={setSkills} skills={skills} />;
      case ACTIVE_STEPS_CANDIDATE.EDUCATION:
        return (
          <CandidateEducation
            setEducationList={setEducationList}
            educationList={educationList}
          />
        );
      case ACTIVE_STEPS_CANDIDATE.JOB_HISTORY:
        return <CandidateJobsHistory jobs={jobs} setJobs={setJobs} />;
      case ACTIVE_STEPS_CANDIDATE.TOOLS:
        return <CandidateTools setTools={setTools} tools={tools} />;
      case ACTIVE_STEPS_CANDIDATE.CERTIFICATIONS:
        return (
          <CandidateCertifications
            setCertifications={setCertifications}
            certifications={certifications}
          />
        );
      case ACTIVE_STEPS_CANDIDATE.BREAK:
        return <CandidateBreak breaks={breaks} setBreaks={setBreaks} />;
      case ACTIVE_STEPS_CANDIDATE.SCHOOLING:
        return <Schooling setSchooling={setSchooling} schooling={schooling} />;
      case ACTIVE_STEPS_CANDIDATE.OTHER:
        return (
          <OtherImportantThings
            setCommunity={setCommunity}
            community={community}
            setLanguage={setLanguage}
            language={language}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#fafdff', mt: 1 }}>
      <FormProvider {...methods}>
        <div className={classNames('row', { 'mb-5': isMobileDevice })}>
          <div className="col-md-6 mb-2 ">
            <span className="headline-4-bold">{UI.PROFILE}</span>
            <br />
            <span className="body-2">
              {UI.CANDIDATE_COMPLETE_PROFILE_AND_INCREASE}
            </span>
          </div>
          <div className="col-md-6 mt-1 ">
            <div className=" d-flex justify-content-end">
              <Button
                disabled={!isValid || isLoading || isFileUploading}
                size="large"
                onClick={handleSubmit(onSubmit)}
                type="button"
                variant="contained"
                startIcon={
                  (isLoading || isFileUploading) && (
                    <CircularProgress size="1rem" color="inherit" />
                  )
                }
              >
                {UI.UPDATE_PROFILE}
              </Button>
            </div>
            <div className="d-flex justify-content-end mt-1">
              <span className="body-2">
                {UI.YOUR_PROFILE_UPDATED} {getRelativeTime(getValues('lmd'))}
              </span>
            </div>
          </div>
          <div className="col-md-12 ">
            <Grid container>
              <Grid item xs={12} md={3}>
                <span className="d-flex justify-content-end px-2 pe-3">
                  {profileCompletionPercentage}%
                </span>
                <div className="mx-2 me-4">
                  <Slider
                    sx={{
                      cursor: 'auto',
                      color: 'green',

                      '& .MuiSlider-thumb': {
                        '&:hover, &.Mui-focusVisible': {
                          boxShadow: 'none',
                        },
                        '&.Mui-active': {
                          boxShadow: 'none',
                        },
                      },

                      height: 8,
                    }}
                    value={profileCompletionPercentage}
                    defaultValue={0}
                    step={1}
                    min={0}
                    max={100}
                  />
                </div>
                <CustomStepper
                  onValidatedCurrentPage={handleValidateCurrentPage}
                  tabsName={STEP_FOR_CANDIDATE_PROFILE}
                  activeStep={activeStep}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <div className="profile_form_box  mb-4">
                  <form className="row d-flex justify-content-center">
                    {getComponent(activeStep)}
                    <StickyButtonForBackAndNext
                      totalNumberOfSteps={STEP_FOR_CANDIDATE_PROFILE.length}
                      handleNext={handleNext}
                      handleBack={handleBack}
                      activeStep={activeStep}
                    />
                  </form>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

        <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
      </FormProvider>
    </Container>
  );
}

export default CandidateProfileForm;
