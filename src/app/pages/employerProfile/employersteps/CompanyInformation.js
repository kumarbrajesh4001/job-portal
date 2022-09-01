import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import noop from 'lodash/noop';
import BusinessIcon from '@mui/icons-material/Business';
import { API_URL } from '../../../constants/apiUrls';
import REGEX from '../../../constants/regex';
import VALIDATION_VALUES from '../../../constants/validationValues';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import { EditorController } from '../../../components/RichTextEditor';
import { toolbarOptions } from '../../../constants/toolbar.constants';
import PortalDatePicker from '../../../components/portalDatePicker';
import {
  DISABLED_FUTURE_DATE_AND_MONTH_FORMAT,
  MONTH_YEAR,
} from '../../../constants/datepicker';
import UI from '../../../constants/ui';

const Input = styled('input')({
  display: 'none',
});
function CompanyInformation(props) {
  const { onChange, logoIsLoading, onDelete } = props;

  const {
    getValues,
    setFocus,
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const logo = getValues('logo');
  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-end"
        sx={{ mb: 3 }}
      >
        <Grid item xs={6} md={2}>
          {logo ? (
            <img
              src={API_URL.PHOTO_PRE + logo}
              className="photo-in-upload-profile logo"
              alt={UI.ALT_Employer_Logo}
            />
          ) : (
            <BusinessIcon
              sx={{
                borderRadius: '50%',
                backgroundColor: 'gray',
                width: '6.25rem',
                height: '6.25rem',
                p: 3,
              }}
            />
          )}
        </Grid>
        <Grid item xs={6} md={10}>
          <label htmlFor="logo">
            <Input
              accept="image/*"
              onChange={onChange}
              name="logo"
              id="logo"
              type="file"
            />
            <Button
              size="large"
              variant="outlined"
              sx={{ ml: 1, mb: 1 }}
              component="span"
              disabled={logoIsLoading}
              startIcon={
                logoIsLoading && (
                  <CircularProgress size="1rem" color="inherit" />
                )
              }
            >
              {logo ? UI.CHANGE : UI.ADD}&nbsp;{UI.LOGO}
            </Button>
          </label>
          {logo && (
            <Button
              color="error"
              size="large"
              variant="outlined"
              sx={{ ml: 1, mb: 1 }}
              component="span"
              onClick={() => onDelete('logo', logo)}
              disabled={logoIsLoading}
              startIcon={
                logoIsLoading && (
                  <CircularProgress size="1rem" color="inherit" />
                )
              }
            >
              {UI.REMOVE_LOGO}
            </Button>
          )}
        </Grid>
      </Grid>
      {/* Company Name: */}
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label col-12 subtitle-1">
            {UI.COMPANY_NAME}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
            <input
              id="name"
              type="text"
              placeholder={UI.COMPANY_NAME}
              className={`form-control `}
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
                    ERROR_MESSAGE.MAX_ERROR_MSG +
                    VALIDATION_VALUES.MAX_VALUE_64,
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

        <div className="col-md-6">
          {/* Email Id */}

          <label htmlFor="email" className=" form-label col-12 subtitle-1">
            {UI.COMPANY_EMAIL_ID}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
            <input
              disabled
              id="email"
              type="text"
              placeholder={UI.COMPANY_EMAIL_ID}
              className={`form-control `}
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
        <div className="col-md-12">
          {/* Company Tagline */}

          <label htmlFor="tagline" className=" form-label col-12 subtitle-1">
            {UI.COMPANY_TAGLINE}
            <input
              id="tagline"
              type="text"
              placeholder={UI.COMPANY_TAGLINE}
              className="form-control"
              {...register('tagline', {
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
            />
            <div className="field_space">
              {errors.tagline && (
                <span className="mandatory">{errors.tagline.message}</span>
              )}
            </div>
          </label>
        </div>
        <div className="col-md-12">
          {/* Company Brief: */}

          <label htmlFor="brief" className=" form-label col-12 subtitle-1">
            {UI.COMPANY_BRIEF}
            <EditorController
              name="brief"
              control={control}
              toolbarOptions={toolbarOptions}
              error={errors.brief}
            />
          </label>
        </div>
        <div className="col-md-6">
          {/* GSTIN */}

          <label htmlFor="gst" className=" form-label col-12 subtitle-1">
            {UI.GSTIN}
            <input
              id="gst"
              {...register('gst', {
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
              placeholder={UI.GST_NO}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
            <div className="field_space">
              {errors.gst && (
                <span className="mandatory">{errors.gst.message}</span>
              )}
            </div>
          </label>
        </div>
        <div className="col-md-6">
          {/*  Founded on */}
          <div>
            <label htmlFor="founded" className=" form-label col-12 subtitle-1">
              {UI.FOUNDED_ON}
              <br />
              <PortalDatePicker
                control={control}
                fields={MONTH_YEAR}
                name="founded"
                id="founded"
                error={errors.founded}
                config={DISABLED_FUTURE_DATE_AND_MONTH_FORMAT}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

CompanyInformation.propTypes = {
  onChange: PropTypes.func,
  onDelete: PropTypes.func,

  logoIsLoading: PropTypes.bool,
};

CompanyInformation.defaultProps = {
  onChange: noop,
  onDelete: noop,

  logoIsLoading: false,
};

export default CompanyInformation;
