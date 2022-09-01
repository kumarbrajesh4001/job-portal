/* eslint-disable no-nested-ternary */
import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import { useFormContext } from 'react-hook-form';
import GeoAutoLocation from '../../../components/geoLocation';
import Select from '../../../components/select';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';
import {
  getJobTypeList,
  getSalaryList,
  getWorkLocationList,
} from '../../../formatter/employerBootstrap';
import { EMPTY_ARRAY } from '../../../constants';
import { getEducationList } from '../../../formatter/commonBootstrap';
import { EditorController } from '../../../components/RichTextEditor';
import { toolbarOptions } from '../../../constants/toolbar.constants';
import UI from '../../../constants/ui';
import { getFormattedCurrencyPerAnnum } from '../../../formatter/number';

function JobDetails(props) {
  const {
    locations,
    setLocations,
    isEnableJobLoc,
    onWorkLocationChange,
    isOtherSalary,
    onSalaryChange,
  } = props;

  const {
    formState: { errors },
    register,
    control,
    watch,
  } = useFormContext();

  const minSalary = watch('salary.min', 0);
  const maxSalary = watch('salary.max', 0);

  return (
    <div className="row">
      <div className="col-md-12 col-12">
        {/* Job Title */}
        <label htmlFor="title" className="form-label  col-12">
          {UI.JOB_TITLE}
          <Box component="span" sx={{ color: '#d32f2f' }}>
            *
          </Box>
          <input
            id="title"
            type="text"
            placeholder={UI.JOB_TITLE}
            className={`form-control `}
            {...register('title', {
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
            })}
          />
          <div className="field_space">
            {errors.title && (
              <span className="mandatory">{errors.title.message}</span>
            )}
          </div>
        </label>
        {/* Job Description: */}
        <label htmlFor="description" className="form-label col-12">
          {UI.JOB_DESCRIPTION}
          <Box component="span" sx={{ color: '#d32f2f' }}>
            *
          </Box>
          <EditorController
            name="description"
            control={control}
            toolbarOptions={toolbarOptions}
            error={errors.description}
          />
        </label>
        <div className="col-md-12 col-12">
          <div className="row">
            {/* Work location Work From */}
            <div className="col-md-6 col-12">
              <label htmlFor="worklocation" className="form-label col-12">
                {UI.WORK_LOCATION}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <Select
                  inputId="worklocation"
                  name="worklocation"
                  control={control}
                  options={getWorkLocationList()}
                  onChange={onWorkLocationChange}
                  isRequired
                />
                <div className="field_space mt-2">
                  {errors.worklocation && (
                    <p className="mandatory">{errors.worklocation.message}</p>
                  )}
                </div>
              </label>
            </div>
            {/* joblocations */}
            <div className="col-md-6 col-12">
              <label htmlFor="joblocations" className="form-label col-12">
                {!isEnableJobLoc ? (
                  <>
                    {UI.JOB_LOCATIONS}
                    <Box component="span" sx={{ color: '#d32f2f' }}>
                      *
                    </Box>
                  </>
                ) : (
                  <span className="text-muted">{UI.JOB_LOCATIONS}</span>
                )}
                <GeoAutoLocation
                  setLocations={setLocations}
                  locations={locations}
                  inputId="joblocations"
                  isDisabled={isEnableJobLoc}
                  error={errors?.joblocations}
                  isMulti
                />
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-12">
          <div className="row">
            <div className="col-md-6 col-12">
              {/* Job type */}
              <label htmlFor="jobtype" className="form-label col-12">
                {UI.JOB_TYPE}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <Select
                  inputId="jobtype"
                  name="jobtype"
                  control={control}
                  options={getJobTypeList()}
                  isRequired
                />
                <div className="field_space">
                  {errors.jobtype && (
                    <span className="mandatory">{errors.jobtype.message}</span>
                  )}
                </div>
              </label>
            </div>
            <div className="col-md-6 col-12">
              {/* Minimum qualification , Education */}
              <label htmlFor="education" className="form-label col-12">
                {UI.MINIMUM_QUALIFICATION}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <Select
                  inputId="education"
                  name="education"
                  control={control}
                  options={getEducationList()}
                  isRequired
                />
                <div className=" field_space ">
                  {errors.education && (
                    <span className="mandatory">
                      {errors.education.message}
                    </span>
                  )}
                </div>
              </label>
            </div>

            {/* Salary */}
            <div className="col-md-6 col-12">
              <label htmlFor="salary" className="form-label col-12">
                {UI.SALARY}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <Select
                  inputId="salary"
                  name="salary.id"
                  control={control}
                  options={getSalaryList()}
                  onChange={onSalaryChange}
                  isRequired
                  isClearableHidden
                />
                {errors.salary?.id && (
                  <span className="mandatory">{errors.salary.id.message}</span>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-12 mt-3">
        <div className="row">
          <div className="col-md-6 col-12">
            {/* Minimum */}
            {isOtherSalary && (
              <label htmlFor="minimum" className="form-label col-12">
                {UI.MINIMUM_SALARY}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <input
                  {...register('salary.min', {
                    valueAsNumber: true,
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                  })}
                  min="1"
                  id="minimum"
                  type="number"
                  placeholder={UI.MINIMUM_SALARY}
                  className="form-control"
                />
                <div className="field_space">
                  {errors.salary?.min ? (
                    <span className="mandatory">
                      {errors.salary.min.message}
                    </span>
                  ) : minSalary ? (
                    <span className="color-1F2830 caption ms-1">
                      {getFormattedCurrencyPerAnnum(minSalary)}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </label>
            )}
          </div>
          <div className="col-md-6 col-12">
            {/* Maximum */}
            {isOtherSalary && (
              <label htmlFor="maximum" className="form-label col-12">
                {UI.MAXMIMUM_SALARY}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <input
                  {...register('salary.max', {
                    valueAsNumber: true,
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                  })}
                  min="1"
                  id="maximum"
                  type="number"
                  placeholder={UI.MAXMIMUM_SALARY}
                  className="form-control"
                />
                <div className="field_space">
                  {errors.salary?.max ? (
                    <span className="mandatory">
                      {errors.salary.max.message}
                    </span>
                  ) : maxSalary ? (
                    <span className="color-1F2830 caption ms-1">
                      {getFormattedCurrencyPerAnnum(maxSalary)}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
JobDetails.propTypes = {
  onSalaryChange: PropTypes.func,
  locations: PropTypes.array,
  setLocations: PropTypes.func,
  isOtherSalary: PropTypes.bool,
  isEnableJobLoc: PropTypes.bool,
  onWorkLocationChange: PropTypes.func,
};

JobDetails.defaultProps = {
  onSalaryChange: noop,
  locations: EMPTY_ARRAY,
  setLocations: noop,
  isOtherSalary: false,
  isEnableJobLoc: false,
  onWorkLocationChange: noop,
};

export default JobDetails;
