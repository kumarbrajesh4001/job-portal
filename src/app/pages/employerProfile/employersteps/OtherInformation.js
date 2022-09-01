import React from 'react';
import { Box, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import noop from 'lodash/noop';
import Select from '../../../components/select';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import UI from '../../../constants/ui';
import VALIDATION_VALUES from '../../../constants/validationValues';

import {
  getCompanySizeList,
  getCompanyStageList,
  getEngineerSizeList,
  getFundingSizeList,
} from '../../../formatter/commonBootstrap';

import { getHearAboutSizeList } from '../../../formatter/employerBootstrap';
import { EMPTY_ARRAY } from '../../../constants';
import AutoSuggestion from '../../../components/autoSuggestion';

function OtherInformation(props) {
  const { isOtherHear, techstacks, setTechStacks, onHearAboutChange } = props;

  const {
    register,
    control,

    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="top"
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          {/* Company size */}
          <div className="col-md-12 mb-3">
            <span
              htmlFor="companysize"
              className=" form-label col-12 subtitle-1"
            >
              {UI.COMPANY_SIZE}
              <Select
                inputId="companysize"
                name="companysize"
                control={control}
                options={getCompanySizeList()}
              />
            </span>
          </div>
          <div className="col-md-12 mb-3">
            <span
              htmlFor="companystage"
              className=" form-label col-12 subtitle-1"
            >
              {UI.COMPANY_STAGE}
              <Select
                inputId="companystage"
                name="companystage"
                control={control}
                options={getCompanyStageList()}
              />
            </span>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="col-md-12 mb-3">
            <span htmlFor="funding" className=" form-label col-12 subtitle-1">
              {UI.FUNDING}
              <Select
                inputId="funding"
                name="funding"
                control={control}
                options={getFundingSizeList()}
              />
            </span>
          </div>
          {/* Engineers size */}
          <div className="col-md-12 mb-3">
            <span
              htmlFor="engineersize"
              className=" form-label col-12 subtitle-1"
            >
              {UI.ENGINEERS_SIZE}
              <Select
                inputId="engineersize"
                name="engineersize"
                control={control}
                options={getEngineerSizeList()}
              />
            </span>
          </div>
        </Grid>
      </Grid>

      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="top"
        spacing={2}
      >
        <Grid item xs={12} md={12}>
          {/* Technology stack */}
          <div className="col-md-12 mb-1">
            <span
              htmlFor="technologystack"
              className="form-label col-12 subtitle-1"
            >
              {UI.TECHNOLOGY_STACK}
              <AutoSuggestion
                id="technologystack"
                name="technologystack"
                setValues={setTechStacks}
                values={techstacks}
                placeholder={ERROR_MESSAGE.MULTIPLE_VALUES_MESSAGE}
                control={control}
                isMulti
              />
            </span>
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          {/* How did you hear about us? */}

          <div className="row  ">
            <div className="col-md-6 ">
              <label
                htmlFor="hearaboutus"
                className=" form-label col-12 subtitle-1 "
              >
                {UI.HOW_DID_YOU_HEAR_ABOUT_US}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <Select
                  inputId="hearaboutus"
                  name="hearaboutus"
                  control={control}
                  options={getHearAboutSizeList()}
                  onChange={onHearAboutChange}
                  isRequired
                />

                {errors.hearaboutus && (
                  <span className="mandatory">
                    {errors.hearaboutus.message}
                  </span>
                )}
              </label>
            </div>
            <div className="col-md-6">
              {isOtherHear && (
                <label
                  htmlFor="hearothers"
                  className=" form-label col-12 subtitle-1"
                >
                  {UI.PLEASE_MENTION_HERE}
                  <Box component="span" sx={{ color: '#d32f2f' }}>
                    *
                  </Box>
                  <input
                    {...register('hearothers', {
                      maxLength: {
                        value: VALIDATION_VALUES.MAX_VALUE_64,
                        message:
                          ERROR_MESSAGE.MAX_ERROR_MSG +
                          VALIDATION_VALUES.MAX_VALUE_64,
                      },
                    })}
                    placeholder={UI.HEAROTHERS}
                    type="text"
                    className="form-control"
                    id="hearothers"
                    aria-describedby="basic-addon3"
                  />

                  {errors.hearothers && (
                    <span className="mandatory">
                      {errors.hearothers.message}
                    </span>
                  )}
                </label>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={12} mb={4}>
          <label htmlFor="linkedin">{UI.LINKEDIN}</label>
          <TextField
            id="linkedin"
            {...register('linkedin')}
            type="url"
            name="linkedin"
            fullWidth
            placeholder={UI.LINKEDIN_LINK}
            size="small"
            error={!!errors.linkedin?.message}
            helperText={errors.linkedin?.message}
          />
          <label htmlFor="facebook" className="mt-2">
            {UI.FACEBOOK}
          </label>
          <TextField
            id="facebook"
            {...register('facebook')}
            type="url"
            name="facebook"
            fullWidth
            placeholder={UI.FACEBOOK_LINK}
            size="small"
            error={!!errors.facebook?.message}
            helperText={errors.facebook?.message}
          />
          <label htmlFor="twitter" className="mt-2">
            {UI.TWITTER}
          </label>
          <TextField
            id="twitter"
            {...register('twitter')}
            type="url"
            name="twitter"
            fullWidth
            placeholder={UI.TWITTER_LINK}
            size="small"
            error={!!errors.twitter?.message}
            helperText={errors.twitter?.message}
          />
        </Grid>
      </Grid>
    </>
  );
}
OtherInformation.propTypes = {
  isOtherHear: PropTypes.bool,
  onHearAboutChange: PropTypes.func,
  techstacks: PropTypes.array,
  setTechStacks: PropTypes.func,
};
OtherInformation.defaultProps = {
  isOtherHear: false,
  onHearAboutChange: noop,
  techstacks: EMPTY_ARRAY,
  setTechStacks: noop,
};

export default OtherInformation;
