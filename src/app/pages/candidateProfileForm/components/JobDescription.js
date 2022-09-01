import React from 'react';
import { Box, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { EMPTY_ARRAY } from '../../../constants';
import Select from '../../../components/select';
import GeoAutoLocation from '../../../components/geoLocation';
import {
  getJobTypeList,
  getShiftList,
  getWorkLocationList,
} from '../../../formatter/candidateBootstrap';
import { getJoiningDateList } from '../../../formatter/commonBootstrap';
import UI from '../../../constants/ui';
import { getFormattedCurrencyPerAnnum } from '../../../formatter/number';

function JobDescription(props) {
  const {
    onChangeOpenToWork,
    setJobLocations,
    isAnyJobLocation,
    jobLocations,
    expShowHide,
    onChangeSalary,
    isFresher,
    onChangeFresher,
  } = props;

  const {
    formState: { errors },
    register,
    control,
    watch,
  } = useFormContext();

  const expSalary = watch('expSalary.salary', 0);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="top"
      spacing={2}
    >
      <Grid item xs={12} md={6}>
        {/* Preferred job description */}
        <div>
          <span className="subtitle-1-bold ">
            {UI.DESIRED_JOBS}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
          </span>
          <div className="row p-2  mb-2">
            <div className="col-12 mb-2 ">
              <div className="form-check ">
                <label className="form-check-label" htmlFor="anyjoblocation">
                  {UI.OPEN_TO_WORK_AT_ANY_LOCATION}
                  {isAnyJobLocation ? (
                    <Box component="span" sx={{ color: '#d32f2f' }}>
                      *
                    </Box>
                  ) : null}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register('anyjoblocation')}
                    id="anyjoblocation"
                    onChange={onChangeOpenToWork}
                  />
                </label>
              </div>
            </div>
            {/* joblocations */}
            <div className="col-md-12">
              <span htmlFor="joblocations" className="form-label col-12">
                {UI.JOB_LOCATIONS}
                {isAnyJobLocation ? null : (
                  <Box component="span" sx={{ color: '#d32f2f' }}>
                    *
                  </Box>
                )}
                <GeoAutoLocation
                  setLocations={setJobLocations}
                  locations={jobLocations}
                  inputId="joblocations"
                  isDisabled={isAnyJobLocation}
                  placeholder={UI.SEARCH_CITY}
                  error={errors.joblocations}
                  isMulti
                />
              </span>
            </div>
            {/* jobtype */}
            <div className="col-md-12">
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
                  isClearableHidden
                />
              </label>
            </div>
            {/* loctype */}
            <div className="col-md-12">
              <label htmlFor="loctype" className="form-label col-12">
                {UI.WORK_LOCATION}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <Select
                  inputId="loctype"
                  name="loctype"
                  control={control}
                  options={getWorkLocationList()}
                  isRequired
                  isClearableHidden
                />
              </label>
            </div>
            {/* expSalary */}
            <div>
              <span className="subtitle-1-bold">{UI.EXPECTED_SALARY}</span>
              {/* As per industry standards */}
              <div className="col-md-12 py-2">
                <div className="form-check ">
                  <label className="form-check-label" htmlFor="expSalary">
                    {UI.ANY_SALARY}
                    {expShowHide ? (
                      <Box component="span" sx={{ color: '#d32f2f' }}>
                        *
                      </Box>
                    ) : null}
                    <input
                      className="form-check-input "
                      type="checkbox"
                      {...register('expSalary.any')}
                      id="expSalary"
                      onChange={onChangeSalary}
                    />
                  </label>
                </div>
              </div>
              {/* Desired min salary (annually) */}
              <div className="col-md-10 col-10 py-2 ">
                <label htmlFor="salary">
                  {UI.DESIRED_SALARY}
                  {expShowHide ? null : (
                    <Box component="span" sx={{ color: '#d32f2f' }}>
                      *
                    </Box>
                  )}
                </label>

                <div className="input-group">
                  <input
                    id="salary"
                    type="number"
                    placeholder={UI.ENTER_DESIRED_SALARY}
                    {...register('expSalary.salary', {
                      disabled: expShowHide,
                    })}
                    className="form-control"
                    aria-label="Desired CTC"
                  />
                </div>
                {errors.expSalary ? (
                  <span className="mandatory">
                    {errors.expSalary.salary.message}
                  </span>
                ) : (
                  <span className="color-1F2830 caption ms-1">
                    {getFormattedCurrencyPerAnnum(expSalary)}
                  </span>
                )}
              </div>
              {/* Negotiable */}
              <div className="col-md-12 py-2">
                <div className="form-check col-md-12">
                  <label
                    className="form-check-label"
                    htmlFor="expNegotiableSalary"
                  >
                    {UI.NEGOTIABLE}
                    <input
                      className="form-check-input"
                      type="checkbox"
                      {...register('expSalary.negotiable', {
                        disabled: expShowHide,
                      })}
                      id="expNegotiableSalary"
                      disabled={expShowHide}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={6} mt={9}>
        {/* Experience  */}
        <div>
          <span className="subtitle-1-bold">Experience</span>
          {/* jobexp */}
          <div className="col-md-12 py-2">
            <div className="form-check ">
              <label className="form-check-label" htmlFor="fresher">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="fresher"
                  {...register('fresher', {
                    onChange: onChangeFresher,
                  })}
                />
                {UI.ARE_YOU_A_FRESHER}
                {isFresher && (
                  <Box component="span" sx={{ color: '#d32f2f' }}>
                    *
                  </Box>
                )}
              </label>
            </div>
          </div>

          {/* Work experience */}
          <div className="col-md-12 ">
            <label htmlFor="jobexp" className="form-label col-12">
              {UI.WORK_EXPERIENCE_IN_YEAR}
              {isFresher ? null : (
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
              )}
              <input
                id="jobexp"
                type="number"
                placeholder={UI.IN_YEAR}
                className="form-control"
                {...register('jobexp', {
                  disabled: isFresher,
                })}
              />
            </label>
            {errors.jobexp && (
              <span className="mandatory">{errors.jobexp.message}</span>
            )}
          </div>
          {/* shift */}
          <div className="col-md-12 py-2">
            <label htmlFor="shift" className="form-label col-12">
              {UI.SHIFT}
              <Select
                inputId="shift"
                name="shift"
                control={control}
                options={getShiftList()}
              />
            </label>
          </div>
          {/* joining */}
          <div className="col-md-12 py-2">
            <label htmlFor="joining" className="form-label col-12">
              {UI.WHEN_CAN_YOU_JOIN}
              <Box component="span" sx={{ color: '#d32f2f' }}>
                *
              </Box>
              <Select
                inputId="joining"
                name="joining"
                control={control}
                options={getJoiningDateList()}
                isRequired
              />
            </label>
            {errors.joining && (
              <span className="mandatory">{errors.joining.message}</span>
            )}
          </div>
          {/* relocate */}
          <div className="col-md-12 py-2">
            <div className="form-check">
              <label htmlFor="relocate" className="form-label col-12">
                {UI.WILLINGNESS_TO_RELOCATE}
                <input
                  className="form-check-input"
                  type="checkbox"
                  {...register('relocate')}
                  id="relocate"
                />
              </label>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
JobDescription.propTypes = {
  onChangeOpenToWork: PropTypes.func,
  setJobLocations: PropTypes.func,
  isAnyJobLocation: PropTypes.bool,
  jobLocations: PropTypes.array,
  onChangeSalary: PropTypes.func,
  expShowHide: PropTypes.bool,
  isFresher: PropTypes.bool,
  onChangeFresher: PropTypes.func,
};

JobDescription.defaultProps = {
  onChangeOpenToWork: PropTypes.func,
  setJobLocations: noop,
  isAnyJobLocation: false,
  jobLocations: EMPTY_ARRAY,
  onChangeSalary: noop,
  expShowHide: false,
  isFresher: false,
  onChangeFresher: noop,
};
export default JobDescription;
