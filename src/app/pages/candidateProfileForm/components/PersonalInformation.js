import React, { useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { CircularProgress, Button, Box, Tooltip, Link } from '@mui/material';

import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { EditorController } from '../../../components/RichTextEditor';
import { EMPTY_OBJECT } from '../../../constants';
import { API_URL } from '../../../constants/apiUrls';
import VALIDATION_VALUES from '../../../constants/validationValues';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import REGEX from '../../../constants/regex';
import styles from '../CandidateProfileForm.module.css';
import GeoAutoLocation from '../../../components/geoLocation';
import Select from '../../../components/select';
import { getGenderList } from '../../../formatter/commonBootstrap';
import UploadFile from './UploadFile';
import { toolbarOptions } from '../../../constants/toolbar.constants';
import PortalDatePicker from '../../../components/portalDatePicker';
import { DISABLED_FUTURE_DATE_AND_DATE_MONTH_FORMAT } from '../../../constants/datepicker';
import UI from '../../../constants/ui';
import URL from '../../../constants/urls';
import COMMON_STYLE from '../../../constants/commonStyle';
import useMobileDevice from '../../../hooks/useMobileDevice';
import { portalScrollTop } from '../../../utils/scroll';
import BadgesInformationView from './BadgesInformationView';

const Input = styled('input')({
  display: 'none',
});
function PersonalInformation(props) {
  const isMobileDevice = useMobileDevice();
  const { onChange, setCity, city, isFileUploading, onDelete } = props;

  const {
    formState: { errors },
    register,
    setFocus,
    control,
    getValues,
  } = useFormContext();

  const photo = getValues('photo');
  const badges = getValues('badges');

  useEffect(() => {
    if (isMobileDevice) {
      portalScrollTop(0);
    } else {
      setFocus('name');
    }
  }, [setFocus, isMobileDevice]);

  const resumeUrl = useMemo(() => getValues('resume'), [getValues('resume')]);

  const candidateId = useMemo(() => getValues('id'), [getValues('id')]);

  const idProofUrl = useMemo(
    () => getValues('idproof'),
    [getValues('idproof')]
  );

  return (
    <div className="row">
      <div className="col-md-6 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            {photo ? (
              <img
                src={API_URL.PHOTO_PRE + photo}
                className="photo-in-upload-profile logo"
                alt={UI.ALT_CANDIDATE_PROFILE}
              />
            ) : (
              <AccountCircleIcon
                sx={{
                  borderRadius: '50%',
                  backgroundColor: 'gray',
                  width: '6.25rem',
                  height: '6.25rem',
                  p: 3,
                }}
              />
            )}
          </div>
          <div className="d-flex">
            <div className="align-self-end d-xl-flex">
              <div className="m-2">
                <label htmlFor="photo">
                  <Input
                    accept="image/*"
                    onChange={onChange}
                    name="photo"
                    id="photo"
                    type="file"
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    disabled={isFileUploading}
                    startIcon={
                      isFileUploading && (
                        <CircularProgress size="1rem" color="inherit" />
                      )
                    }
                  >
                    {photo ? UI.CHANGE : UI.ADD}&nbsp;{UI.PHOTO}
                  </Button>
                </label>
              </div>
              {photo && (
                <div className="m-2">
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => onDelete('photo', photo)}
                    disabled={isFileUploading}
                    startIcon={
                      isFileUploading && (
                        <CircularProgress size="1rem" color="inherit" />
                      )
                    }
                  >
                    <span className="text-nowrap">{UI.REMOVE_PHOTO}</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 mt-3">
        <div className="subtitle-1-bold">
          {UI.EARNED_BADGES}{' '}
          <span>
            <BadgesInformationView />
          </span>
        </div>
        {badges ? (
          <div className="d-flex overflow-hidden">
            {badges.map((values, index) => (
              <div key={index} className="p-2 text-center">
                <Tooltip title={values.tooltip.join(', ')} placement="bottom">
                  <img
                    src={values.icon}
                    alt={UI.ALT_BADGE}
                    style={COMMON_STYLE.BADGE_ICON}
                  />
                </Tooltip>
                <div className="body-2-bold mt-2 text-center">
                  {values.rating}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Link as={NavLink} to={URL.ASSESSMENT} underline="none">
            <span className="subtitle-2 color-1D8FF2">
              {UI.GIVE_YOUR_ASSESSMENTS_AND_GET_BADGES}
            </span>
          </Link>
        )}
      </div>
      <div className="col-md-6 mt-3">
        {/* name */}
        <label htmlFor="name" className="form-label col-12">
          {UI.FULL_NAME}
          <Box component="span" sx={{ color: '#d32f2f' }}>
            *
          </Box>
          <input
            id="name"
            type="text"
            placeholder={UI.FULL_NAME}
            className={`form-control  ${errors.email && styles.dynamic}`}
            {...register('name', {
              required: ERROR_MESSAGE.REQ_ERROR_MSG,
              minLength: {
                value: VALIDATION_VALUES.MIN_VALUE,
                message:
                  ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE,
              },
              maxLength: {
                value: VALIDATION_VALUES.MAX_VALUE_64,
                message:
                  ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64,
              },
              pattern: {
                value: REGEX.NAME_FORMAT,
                message: ERROR_MESSAGE.NAME_VALIDATION_MESSAGE,
              },
            })}
          />
          <div className="field_space">
            {errors.name && (
              <span className="mandatory">{errors.name.message}</span>
            )}
          </div>
        </label>
      </div>
      <div className="col-md-6 mt-3">
        {/* email */}
        <div className="col-md-12 ">
          <label htmlFor="email" className="form-label col-12">
            {UI.EMAIL}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
            <input
              disabled
              id="email"
              type="email"
              placeholder={UI.EMAIL}
              className={`form-control  ${errors.email && styles.dynamic}`}
              {...register('email', {
                required: ERROR_MESSAGE.REQ_ERROR_MSG,
                pattern: {
                  value: REGEX.EMAIL_FORMAT,
                  message: ERROR_MESSAGE.EMAIL_VALIDATION,
                },
              })}
            />
            <div className="field_space">
              {errors.email && (
                <span className="mandatory">{errors.email.message}</span>
              )}
            </div>
          </label>
        </div>
      </div>
      <div className="col-md-6">
        {/* mobile */}
        <label htmlFor="mobile" className="form-label col-12 ">
          {UI.MOBILE}
          <Box component="span" sx={{ color: '#d32f2f' }}>
            *
          </Box>
          <input
            id="mobile"
            type="number"
            placeholder={UI.MOBILE_NUMBER}
            maxLength={VALIDATION_VALUES.MAX_VALUE_15}
            className="form-control"
            {...register('mobile', {
              pattern: {
                value: REGEX.NUMERIC_FORMAT,
                message: ERROR_MESSAGE.NUMERIC_VALIDATION_MESSAGE,
              },
              required: ERROR_MESSAGE.REQ_ERROR_MSG,
              minLength: {
                value: VALIDATION_VALUES.MIN_VALUE,
                message:
                  ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE,
              },
              maxLength: {
                value: VALIDATION_VALUES.MAX_VALUE_15,
                message:
                  ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_15,
              },
            })}
          />
          <div className="field_space">
            {errors.mobile && (
              <span className="mandatory">{errors.mobile.message}</span>
            )}
          </div>
        </label>
      </div>
      <div className="col-md-6">
        {/* Gender */}

        <label htmlFor="gender" className="form-label col-12">
          {UI.GENDER}
          <Box component="span" sx={{ color: '#d32f2f' }}>
            *
          </Box>
          <Select
            inputId="gender"
            name="gender"
            control={control}
            options={getGenderList()}
            isRequired
          />
          <div className="field_space">
            {errors.gender && (
              <span className="mandatory">{errors.gender.message}</span>
            )}
          </div>
        </label>
      </div>
      <div className="col-md-12">
        {/* about */}
        <label htmlFor="about" className="form-label col-12">
          {UI.ABOUT}
          <EditorController
            name="about"
            control={control}
            toolbarOptions={toolbarOptions}
            error={errors.about}
          />
        </label>
      </div>

      <div className="col-md-6">
        {/*  Upload resume */}
        <UploadFile
          htmlFor="resume"
          id="resume"
          downloadTitle={UI.DOWNLOAD_RESUME}
          deleteTitle={UI.DELETE_RESUME}
          name="resume"
          label={UI.RESUME}
          accept=".docx, .pdf"
          onChange={onChange}
          uploadedTime={getValues('rud')}
          isLoading={isFileUploading}
          onDelete={onDelete}
          downloadPath={`${API_URL.RESUME_PRE}${resumeUrl}&candidateid=${candidateId}`}
          fileName={resumeUrl}
          supportedFormats={UI.DOCX_PDF_FILE_STR}
        />
      </div>
      <div className="col-md-6">
        {/* Id Proof */}
        <UploadFile
          htmlFor="idproof"
          id="idproof"
          name="idproof"
          label={UI.ID_PROOF}
          downloadTitle={UI.DOWNLOAD_ID_PROOF}
          deleteTitle={UI.DELETE_ID_PROOF}
          accept=".png,.jpg,.jpeg"
          onChange={onChange}
          isLoading={isFileUploading}
          onDelete={onDelete}
          downloadPath={`${API_URL.ID_PROOF_PRE}${idProofUrl}&candidateid=${candidateId}`}
          fileName={idProofUrl}
          supportedFormats={UI.PNG_JPG_FILE_STR}
        />
      </div>
      <div className="col-md-6 mt-2">
        {/* city */}

        <label htmlFor="city" className="form-label col-12">
          {UI.CITY}
          <Box component="span" sx={{ color: '#d32f2f' }}>
            *
          </Box>
          <GeoAutoLocation
            setLocations={setCity}
            locations={city}
            inputId="city"
            error={errors?.city?.shortname}
          />
        </label>
      </div>
      <div className="col-md-6 mt-2">
        {/* dob */}

        <label htmlFor="dob" className="form-label col-12">
          {UI.DATE_OF_BIRTH}
          <Box component="span" sx={{ color: '#d32f2f' }}>
            *
          </Box>
          <br />
          <PortalDatePicker
            control={control}
            name="dob"
            id="dob"
            error={errors.dob}
            config={DISABLED_FUTURE_DATE_AND_DATE_MONTH_FORMAT}
          />
        </label>
      </div>
      <div className="col-md-12">
        {/* address */}
        <div className="col-md-12">
          <label htmlFor="address" className="form-label col-12">
            {UI.ADDRESS}
            <textarea
              rows="2"
              id="address"
              placeholder={UI.ENTER_YOUR_ADDRESS}
              className="form-control"
              {...register('address', {
                minLength: {
                  value: VALIDATION_VALUES.MIN_VALUE,
                  message:
                    ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE,
                },
                maxLength: {
                  value: VALIDATION_VALUES.MAX_VALUE_128,
                  message:
                    ERROR_MESSAGE.MAX_ERROR_MSG +
                    VALIDATION_VALUES.MAX_VALUE_128,
                },
              })}
            />
            <div className="field_space">
              {errors.address && (
                <span className="mandatory">{errors.address.message}</span>
              )}
            </div>
          </label>
        </div>

        {/* Passport number */}
        <div className="col-md-6">
          <label htmlFor="passport" className="form-label col-12">
            {UI.PASSPORT_NUMBER}
            <input
              {...register('passport', {
                minLength: {
                  value: VALIDATION_VALUES.MIN_VALUE,
                  message:
                    ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE,
                },
                maxLength: {
                  value: VALIDATION_VALUES.MAX_VALUE_64,
                  message:
                    ERROR_MESSAGE.MAX_ERROR_MSG +
                    VALIDATION_VALUES.MAX_VALUE_64,
                },
              })}
              type="text"
              placeholder={UI.PASSPORT_NUMBER}
              className="form-control "
              id="passport"
            />
            <div className="field_space">
              {errors.passport && (
                <span className="mandatory">{errors.passport.message}</span>
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
PersonalInformation.propTypes = {
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  setCity: PropTypes.func,
  city: PropTypes.object,
  isFileUploading: PropTypes.bool,
};

PersonalInformation.defaultProps = {
  onChange: noop,
  onDelete: noop,
  setCity: noop,
  city: EMPTY_OBJECT,
  isFileUploading: false,
};
export default PersonalInformation;
