import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import { Container, Button, Slider, Grid } from '@mui/material';
import { getRequest, putRequest } from '../../services';

import requestDTO from './employerProfile.helper';
import { EMPTY_ARRAY, HEAR_OTHER_ID } from '../../constants';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import { API_URL } from '../../constants/apiUrls';
import {
  CompanyInformation,
  ContactInformation,
  OtherInformation,
} from './employersteps';

import { fileUploader, isFileSizeInLimit } from '../../helpers/fileUploader';
import { getFileSizeForDisplay } from '../../constants/fileSizes';

import ERROR_MESSAGE from '../../constants/errorMsgs';
import {
  ACTIVE_STEPS_EMPLOYER,
  STEPS_FOR_EMPLOYER_PROFILES,
} from './constant/employerProfile.steps';
import EMPLOYER_PROFILE_SCHEMA from './employersteps/employer.schema';
import { getRelativeTime } from '../../formatter/date';
import getProfileCompletitionPercentage from '../../helpers/getProfileCompletitionPercentage';
import { getEmployerKeyList } from '../../formatter/profilepct';

import CustomStepper from '../../components/stepper';
import UI from '../../constants/ui';
import { portalScrollTop } from '../../utils/scroll';
import useMobileDevice from '../../hooks/useMobileDevice';
import StickyButtonForBackAndNext from '../../components/stickyButtonForBackAndNext';

function EmployerProfile() {
  const isMobileDevice = useMobileDevice();
  // For vertical slide Bar start functions
  const [activeStep, setActiveStep] = useState(0);
  const [profileCompletionPercentage, setProfileCompletionPercentage] =
    useState(0);

  // For vertical slide Bar end  functions

  const [techstacks, setTechStacks] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [logoIsLoading, setLogoIsLoading] = useState(false);
  const [isOtherHear, setIsOtherHear] = useState(false);
  const [locations, setLocations] = useState();
  const [opensnackbar, setSnackbarOpen] = useState();

  const methods = useForm({
    resolver: yupResolver(EMPLOYER_PROFILE_SCHEMA),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    setValue,
    reset,
    getValues,
    trigger,
    formState: { isValid },
  } = methods;

  const employerKeyList = useMemo(() => getEmployerKeyList(), EMPTY_ARRAY);

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
    requestDTO(getValues(), techstacks, employerKeyList);

  const getAndSetCompletionPercentage = (formValues) => {
    const profileCompletitionPercentage = getProfileCompletitionPercentage(
      employerKeyList,
      formValues
    );

    setProfileCompletionPercentage(profileCompletitionPercentage);
  };

  const updateForm = (res) => {
    if (res.id) {
      reset(res);
      setTechStacks(res.techstack);
      setLocations(res.city);
      setIsOtherHear(res.hearaboutus === HEAR_OTHER_ID);
    }
  };

  useEffect(() => {
    getRequest(API_URL.EMPLOYER_PROFILE).then((res) => {
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
    setValue('city', locations, { shouldValidate: true });
  }, [locations]);

  const onHearAboutChange = useCallback((value) => {
    if (value !== HEAR_OTHER_ID) {
      setValue('hearaboutus', value);
    }
    setIsOtherHear(value === HEAR_OTHER_ID);
  }, EMPTY_ARRAY);

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
      setLogoIsLoading(true);
      fileUploader(requestMaker, file)
        .then((res) => {
          setValue(requestMaker, res.msg);
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
        .finally(() => setLogoIsLoading(false));
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

  // Handle Submit
  const onSubmit = () => {
    const requestPayload = getFormValues();

    setIsLoading(true);
    setProfileCompletionPercentage(requestPayload.profilepct);

    putRequest(API_URL.EMPLOYER_PROFILE, requestPayload)
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

  const handleValidateCurrentPage = async (selectedActiveStep) => {
    const { validationFields } = STEPS_FOR_EMPLOYER_PROFILES[activeStep];
    const isValidFields = await trigger(validationFields);

    if (isValidFields) {
      getAndSetCompletionPercentage(getFormValues());
      setActiveStep(selectedActiveStep);
    }
    return isValidFields;
  };

  const handleBack = () => {
    getAndSetCompletionPercentage(getFormValues());
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
      case ACTIVE_STEPS_EMPLOYER.COMPANY_INFORMATION:
        return (
          <CompanyInformation
            onChange={uploadFile}
            onDelete={onDelete}
            logoIsLoading={logoIsLoading}
          />
        );
      case ACTIVE_STEPS_EMPLOYER.CONTACT_INFORMATION:
        return (
          <ContactInformation
            locations={locations}
            setLocations={setLocations}
          />
        );
      case ACTIVE_STEPS_EMPLOYER.OTHER_INFORMATION:
        return (
          <OtherInformation
            isOtherHear={isOtherHear}
            setTechStacks={setTechStacks}
            techstacks={techstacks}
            onHearAboutChange={onHearAboutChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container sx={{ backgroundColor: '#fafdff', mt: 1 }}>
      <FormProvider {...methods}>
        <div className={classNames('row', { 'mb-5': isMobileDevice })}>
          <div className="col-md-6 mb-2">
            <span className="headline-4-bold">{UI.COMPANY_PROFILE}</span> <br />
            <span className="body-2">
              {UI.EMPLOYER_COMPLETE_PROFILE_AND_INCREASE}
            </span>
          </div>
          <div className="col-md-6 mt-1 ">
            <div className=" d-flex justify-content-end">
              <Button
                disabled={!isValid || isLoading}
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                startIcon={
                  isLoading && <CircularProgress size="1rem" color="inherit" />
                }
              >
                {UI.UPDATE_PROFILE}
              </Button>
            </div>
            <div className="d-flex justify-content-end mt-1">
              <p className="body-2">
                {UI.YOUR_PROFILE_UPDATED} {getRelativeTime(getValues('lmd'))}
              </p>
            </div>
          </div>

          <div className="col-md-12 ">
            <Grid container>
              <Grid item xs={12} md={3}>
                <span className="d-flex justify-content-end px-2">
                  {profileCompletionPercentage}%
                </span>
                <div className="mx-2">
                  <Slider
                    sx={{
                      color: 'green',
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
                  activeStep={activeStep}
                  tabsName={STEPS_FOR_EMPLOYER_PROFILES}
                  onValidatedCurrentPage={handleValidateCurrentPage}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <div className="profile_form_box  mb-4">
                  <form className="row d-flex justify-content-center">
                    {getComponent(activeStep)}
                    <StickyButtonForBackAndNext
                      totalNumberOfSteps={STEPS_FOR_EMPLOYER_PROFILES.length}
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
      </FormProvider>
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </Container>
  );
}

export default EmployerProfile;
