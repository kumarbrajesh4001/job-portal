/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import classNames from 'classnames';
import EditDeleteList from '../../../components/editDeleteList';
import JobHistoryView from '../../../components/candidateComponent/jobHistoryView';
import { EMPTY_ARRAY } from '../../../constants';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';
import getSanitizedValues from '../../../helpers/emptyFieldsValidation';
import GeoAutoLocation from '../../../components/geoLocation';
import { getDateInMMYY, getDateInYYMMDD } from '../../../formatter/date';
import PortalDatePicker from '../../../components/portalDatePicker';
import { getFormattedCurrencyPerAnnum } from '../../../formatter/number';
import {
  DISABLED_FUTURE_DATE_AND_MONTH_FORMAT,
  MONTH_YEAR,
} from '../../../constants/datepicker';
import UI from '../../../constants/ui';

const DEFAULT_JOBS = {
  title: '',
  company: '',
  from: '',
  to: '',
  city: '',
  country: '',
  roles: '',
  ctc: '',
  atpresent: null,
};

function CandidateJobsHistory(props) {
  const { setJobs, jobs } = props;
  const [editIndex, setEditIndex] = useState(-1);
  const [isToDateDisabled, setIsToDateDisabled] = useState(false);

  const [locations, setLocations] = useState();

  const {
    register,
    getValues,
    reset,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_JOBS,
  });

  const candidateCtc = watch('ctc', 0);

  useEffect(() => {
    setValue('city', locations);
  }, [locations]);
  useEffect(() => {
    if (isToDateDisabled) {
      setValue('to', '');
    }
  }, [isToDateDisabled]);
  const addJob = () => {
    const job = getValues();
    if (job?.title) {
      reset(DEFAULT_JOBS);
      const fromDate = job.from;
      if (fromDate) {
        job.from = getDateInYYMMDD(fromDate);
      }
      const toDate = job.to;
      if (toDate) {
        job.to = getDateInYYMMDD(toDate);
      }
      const sanitizedData = getSanitizedValues(job);
      setJobs([...jobs, sanitizedData]);
      setLocations(undefined);
      setIsToDateDisabled(false);
    }
  };

  const editJob = () => {
    const updatedjobs = [...jobs];
    const editedJobData = getValues();
    const fromDate = editedJobData.from;
    const toDate = editedJobData.to;
    if (fromDate) {
      editedJobData.from = getDateInYYMMDD(fromDate);
    }
    if (toDate) {
      editedJobData.to = getDateInYYMMDD(toDate);
    }
    updatedjobs[editIndex] = getSanitizedValues(editedJobData);
    setJobs(updatedjobs);
    setIsToDateDisabled(false);
    setLocations(undefined);
    reset(DEFAULT_JOBS);
    setEditIndex(-1);
  };

  const updateJobsHistory = () => {
    if (editIndex > -1) {
      editJob();
    } else {
      addJob();
    }
  };

  const handleEdit = (index) => {
    const job = jobs[index];
    const fromDate = job.from;
    const toDate = job.to;
    if (fromDate) {
      job.from = getDateInMMYY(fromDate);
    }
    if (toDate) {
      job.to = getDateInMMYY(toDate);
    }
    if (job.atpresent) {
      setIsToDateDisabled(true);
    }
    setLocations(job.city);
    reset(job);
    setEditIndex(index);
  };

  return (
    <>
      <div>
        <span className="subtitle-1-bold">{UI.WORK_EXPERIENCE}</span>
      </div>
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="top"
        sx={{ mb: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={6}>
          <div className="row ">
            {/* Job title */}
            <div className="col-md-12  ">
              <label htmlFor="title" className="form-label col-12   ">
                {UI.JOB_TITLE}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <input
                  {...register('title', {
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                    minLength: {
                      value: VALIDATION_VALUES.MIN_VALUE,
                      message:
                        ERROR_MESSAGE.MIN_ERROR_MSG +
                        VALIDATION_VALUES.MIN_VALUE,
                    },
                    maxLength: {
                      value: VALIDATION_VALUES.MAX_VALUE_64,
                      message:
                        ERROR_MESSAGE.MAX_ERROR_MSG +
                        VALIDATION_VALUES.MAX_VALUE_64,
                    },
                  })}
                  id="title"
                  name="title"
                  type="text"
                  placeholder={UI.TITLE}
                  className="form-control "
                />
              </label>
              {errors.title && (
                <span className="mandatory">{errors.title.message}</span>
              )}
            </div>
            {/* Company name */}
            <div className="col-md-12  ">
              <label htmlFor="company" className="form-label col-12">
                {UI.COMPANY_NAME}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <input
                  {...register('company', {
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                    minLength: {
                      value: VALIDATION_VALUES.MIN_VALUE,
                      message:
                        ERROR_MESSAGE.MIN_ERROR_MSG +
                        VALIDATION_VALUES.MIN_VALUE,
                    },
                    maxLength: {
                      value: VALIDATION_VALUES.MAX_VALUE_64,
                      message:
                        ERROR_MESSAGE.MAX_ERROR_MSG +
                        VALIDATION_VALUES.MAX_VALUE_64,
                    },
                  })}
                  id="company"
                  name="company"
                  type="text"
                  placeholder={UI.COMPANY}
                  className="form-control "
                />
              </label>
              {errors.company && (
                <span className="mandatory">{errors.company.message}</span>
              )}
            </div>
            {/* From */}
            <div className="col-md-6">
              <label htmlFor="from" className="form-label col-12">
                {UI.FROM}
                <br />
                <PortalDatePicker
                  control={control}
                  fields={MONTH_YEAR}
                  name="from"
                  id="from"
                  error={errors.from}
                  config={DISABLED_FUTURE_DATE_AND_MONTH_FORMAT}
                />
              </label>
            </div>
            {/* To */}
            <div className="col-md-6">
              <label
                htmlFor="to"
                className={classNames('form-label col-12', {
                  'color-AAAAAA': isToDateDisabled,
                })}
              >
                {UI.TO}
                <br />
                <PortalDatePicker
                  control={control}
                  fields={MONTH_YEAR}
                  name="to"
                  id="to"
                  error={errors.to}
                  config={DISABLED_FUTURE_DATE_AND_MONTH_FORMAT}
                  isDisabled={isToDateDisabled}
                />
              </label>
            </div>
            {/*  At present */}
            <div className="col-md-12 mb-2 d-flex justify-content-end  mt-2">
              <div className="form-check">
                <label className="form-check-label" htmlFor="atpresent">
                  {UI.AT_PRESENT}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register('atpresent')}
                    id="atpresent"
                    onChange={(check) =>
                      setIsToDateDisabled(check.target.checked)
                    }
                  />
                </label>
              </div>
            </div>
            {/* CTC */}
            <div className="col-md-12">
              <label htmlFor="ctc" className="form-label col-12">
                {UI.CTC}
              </label>
              <div className="input-group">
                <input
                  id="ctc"
                  name="ctc"
                  type="number"
                  placeholder={UI.CTC_PLACEHOLDER}
                  min={VALIDATION_VALUES.MIN_VALUE}
                  {...register('ctc', {
                    max: {
                      value: VALIDATION_VALUES.MAX_SALARY_VALUE,
                      message:
                        ERROR_MESSAGE.MAX_SALARY_MSG +
                        VALIDATION_VALUES.MAX_SALARY_VALUE,
                    },
                  })}
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                />
              </div>
              {errors.ctc ? (
                <span className="mandatory">{errors.ctc.message}</span>
              ) : candidateCtc ? (
                <span className="color-1F2830 caption ms-1">
                  {getFormattedCurrencyPerAnnum(candidateCtc)}
                </span>
              ) : (
                ''
              )}
            </div>
            {/* City */}
            <div className="col-md-12 mt-2">
              <label htmlFor="jobscountry" className="form-label col-12">
                {UI.CITY}
                <GeoAutoLocation
                  setLocations={setLocations}
                  locations={locations}
                  inputId="jobscountry"
                />
              </label>
            </div>
            {/*  Roles/Responbilities */}
            <div className="col-md-12">
              <label htmlFor="roles" className="form-label col-12">
                {UI.ROLES_RESPONBILITIES}
                <textarea
                  rows={4}
                  {...register('roles', {
                    minLength: {
                      value: VALIDATION_VALUES.MIN_VALUE,
                      message:
                        ERROR_MESSAGE.MIN_ERROR_MSG +
                        VALIDATION_VALUES.MIN_VALUE,
                    },
                    maxLength: {
                      value: VALIDATION_VALUES.MAX_VALUE_1024,
                      message:
                        ERROR_MESSAGE.MAX_ERROR_MSG +
                        VALIDATION_VALUES.MAX_VALUE_1024,
                    },
                  })}
                  id="roles"
                  type="text"
                  placeholder={UI.ROLES_RESPONBILITIES}
                  className="form-control "
                />
                {errors.roles && (
                  <span className="mandatory">{errors.roles.message}</span>
                )}
              </label>
            </div>
            {/*   {/* 'Update' and {UI.ADD} button */}
            <div className="col-md-12 mt-2">
              <button
                type="button"
                onClick={handleSubmit(updateJobsHistory)}
                className="btn btn-primary"
              >
                {editIndex > -1 ? UI.UPDATE : UI.ADD}
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <EditDeleteList
            component={JobHistoryView}
            onEdit={handleEdit}
            list={jobs}
            setList={setJobs}
          />
        </Grid>
      </Grid>
    </>
  );
}
CandidateJobsHistory.propTypes = {
  setJobs: PropTypes.func,
  jobs: PropTypes.array,
};

CandidateJobsHistory.defaultProps = {
  setJobs: noop,
  jobs: EMPTY_ARRAY,
};

export default CandidateJobsHistory;
