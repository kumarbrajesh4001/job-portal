/* eslint-disable prefer-template */
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import classNames from 'classnames';
import FormControlLabel from '@mui/material/FormControlLabel';
import { yupResolver } from '@hookform/resolvers/yup';

import { getEducationList } from '../../../formatter/commonBootstrap';

import CandidateEducationView from '../../../components/candidateComponent/CandidateEducationView';
import Select from '../../../components/select';
import EditDeleteList from '../../../components/editDeleteList';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../constants';

import VALIDATION_VALUES from '../../../constants/validationValues';
import getSanitizedValues from '../../../helpers/emptyFieldsValidation';
import GeoAutoLocation from '../../../components/geoLocation';
import { getDateInMMYY, getDateInYYMMDD } from '../../../formatter/date';
import EDUCATION_SCHEMA from './candidateEducation.schema';
import { DEFAULT_EDUCATION, SCORE_TYPE } from './candidateEducation.constants';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import {
  DISABLED_FUTURE_DATE_AND_MONTH_FORMAT,
  MONTH_YEAR,
} from '../../../constants/datepicker';
import PortalDatePicker from '../../../components/portalDatePicker';
import UI from '../../../constants/ui';

function CandidateEducation(props) {
  const { setEducationList, educationList } = props;
  const [editIndex, setEditIndex] = useState(-1);
  const [dateShowHide, setDateShowHide] = useState(false);
  const [locations, setLocations] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: DEFAULT_EDUCATION,
    resolver: yupResolver(EDUCATION_SCHEMA),
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('city', locations);
  }, [locations]);

  useEffect(() => {
    if (dateShowHide) {
      setValue('to', '');
    }
  }, [dateShowHide]);

  const addEducation = () => {
    const education = getValues();
    if (education?.degree && education?.college) {
      reset(DEFAULT_EDUCATION);
      const fromDate = education.from;
      if (fromDate) {
        education.from = getDateInYYMMDD(fromDate);
      }
      const toDate = education.to;
      if (toDate) {
        education.to = getDateInYYMMDD(toDate);
      }
      const sanitizedData = getSanitizedValues(education);
      setEducationList([...educationList, sanitizedData]);
      setLocations(undefined);
      setDateShowHide(false);
    }
  };

  const editEducation = () => {
    const updatedEducationList = [...educationList];
    const education = getValues();
    const fromDate = education.from;
    const toDate = education.to;
    if (fromDate) {
      education.from = getDateInYYMMDD(fromDate);
    }
    if (toDate) {
      education.to = getDateInYYMMDD(toDate);
    }
    updatedEducationList[editIndex] = getSanitizedValues(education);
    setEducationList(updatedEducationList);
    setDateShowHide(false);
    setLocations(undefined);
    reset(DEFAULT_EDUCATION);
    setEditIndex(-1);
  };

  const updateEducation = () => {
    if (editIndex > -1) {
      editEducation();
    } else {
      addEducation();
    }
  };

  const handleEdit = (index) => {
    const education = educationList[index] || EMPTY_OBJECT;
    const fromDate = education.from;
    const toDate = education.to;
    if (fromDate) {
      education.from = getDateInMMYY(fromDate);
    }
    if (toDate) {
      education.to = getDateInMMYY(toDate);
    }
    if (education.atpresent) {
      setDateShowHide(true);
    }

    setLocations(education.city);
    reset(education);
    setEditIndex(index);
  };

  return (
    <>
      <span className="subtitle-1-bold">
        {UI.EDUCATION}
        <Box component="span" sx={{ color: '#d32f2f' }}>
          *
        </Box>
      </span>
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="top"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={6}>
          <div className="row ">
            {/* Degree */}
            <div className="col-md-12">
              <label htmlFor="degree" className="form-label col-12">
                {UI.DEGREE}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <Select
                  inputId="degree"
                  name="degree"
                  control={control}
                  options={getEducationList()}
                  isRequired
                />
              </label>
              {errors.degree && (
                <span className="mandatory">{errors.degree.message}</span>
              )}
            </div>

            {/* College/University */}
            <div className="col-md-12">
              <label htmlFor="college" className="form-label col-12">
                {UI.COLLEGE_UNIVERSITY}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <input
                  {...register('college', {
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
                  id="college"
                  placeholder={UI.COLLEGE}
                  className="form-control"
                />
              </label>
              {errors.college && (
                <span className="mandatory">{errors.college.message}</span>
              )}
            </div>
            {/* Course */}
            <div className="col-md-12">
              <label htmlFor="course" className="form-label col-12">
                {UI.COURSE}
                <input
                  {...register('course', {
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
                  id="course"
                  name="course"
                  type="text"
                  placeholder={UI.COURSE}
                  className="form-control "
                />
              </label>
              {errors.course && (
                <span className="mandatory">{errors.course.message}</span>
              )}
            </div>
            {/*  City */}
            <div className="col-md-12">
              <span htmlFor="educountry" className="form-label col-12">
                {UI.CITY}
                <GeoAutoLocation
                  setLocations={setLocations}
                  locations={locations}
                  inputId="educountry"
                />
              </span>
            </div>
            {/*  From */}
            <div className="col-md-6 mt-1">
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
            <div className="col-md-6 mt-1">
              <label
                htmlFor="to"
                className={classNames('form-label col-12', {
                  'color-AAAAAA': dateShowHide,
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
                  isDisabled={dateShowHide}
                />
              </label>
            </div>
            {/*  At present */}
            <div className="col-md-12 mb-2  d-flex justify-content-end  ">
              <div className="form-check">
                <label className="form-check-label" htmlFor="atpresent">
                  {UI.AT_PRESENT}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register('atpresent')}
                    id="atpresent"
                    onChange={(check) => setDateShowHide(check.target.checked)}
                  />
                </label>
              </div>
            </div>
            <Controller
              name="scoreType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  onChange={(e) => {
                    setValue('pct', undefined);
                    setValue('cgpa', undefined);
                    onChange(e);
                  }}
                  value={value}
                >
                  <div className="col d-flex justify-content-between">
                    <div className="col-md-5">
                      <FormControlLabel
                        value={SCORE_TYPE.PERCENTAGE}
                        control={<Radio />}
                        label={UI.PERCENTAGE}
                      />
                      <input
                        min={VALIDATION_VALUES.ZERO_VALUE}
                        max={VALIDATION_VALUES.MAX_PCT_VALUE_100}
                        disabled={
                          getValues('scoreType') + '' === SCORE_TYPE.CGPA
                        }
                        {...register('pct')}
                        id="percentage"
                        type="number"
                        placeholder={UI.ENTER}
                        className="form-control"
                      />
                      {errors.pct && (
                        <span className="mandatory">{errors.pct.message}</span>
                      )}
                    </div>
                    <div className="col-md-5">
                      <FormControlLabel
                        value={SCORE_TYPE.CGPA}
                        control={<Radio />}
                        label={UI.CGPA}
                      />
                      <input
                        min={VALIDATION_VALUES.ZERO_VALUE}
                        max={VALIDATION_VALUES.MAX_VALUE_10}
                        disabled={
                          getValues('scoreType') + '' === SCORE_TYPE.PERCENTAGE
                        }
                        {...register('cgpa')}
                        id="cgpa"
                        type="number"
                        placeholder={UI.ENTER_CGPA}
                        className="form-control"
                      />
                      {errors.cgpa && (
                        <span className="mandatory">{errors.cgpa.message}</span>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              )}
            />

            {/* BTN */}
            <div className="col-md-12 mt-4">
              <button
                type="button"
                onClick={handleSubmit(updateEducation)}
                className="btn btn-primary"
              >
                {editIndex > -1 ? UI.UPDATE : UI.ADD}
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <EditDeleteList
            component={CandidateEducationView}
            onEdit={handleEdit}
            list={educationList}
            setList={setEducationList}
          />
        </Grid>
      </Grid>
    </>
  );
}
CandidateEducation.propTypes = {
  setEducationList: PropTypes.func,
  educationList: PropTypes.array,
};

CandidateEducation.defaultProps = {
  setEducationList: noop,
  educationList: EMPTY_ARRAY,
};

export default CandidateEducation;
