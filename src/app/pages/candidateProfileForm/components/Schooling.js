import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getSchoolClassList } from '../../../formatter/commonBootstrap';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../constants';
import Select from '../../../components/select';
import getSanitizedValues from '../../../helpers/emptyFieldsValidation';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';
import GeoAutoLocation from '../../../components/geoLocation';
import UI from '../../../constants/ui';
import SchoolingView from '../../../components/candidateComponent/SchoolingView';
import EditDeleteList from '../../../components/editDeleteList';

const SCHOOLING = {
  name: null,
  city: null,
  board: null,
  candidateClass: null,
  pct: null,
};
const SCHOOL_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .nullable()
    .min(
      VALIDATION_VALUES.MIN_VALUE,
      ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE
    )
    .max(
      VALIDATION_VALUES.MAX_VALUE_64,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
    ),

  board: yup
    .string()
    .required(ERROR_MESSAGE.REQ_ERROR_MSG)
    .nullable()
    .min(
      VALIDATION_VALUES.MIN_VALUE,
      ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE
    )
    .max(
      VALIDATION_VALUES.MAX_VALUE_64,
      ERROR_MESSAGE.MAX_ERROR_MSG + VALIDATION_VALUES.MAX_VALUE_64
    ),
  candidateClass: yup.number().required(ERROR_MESSAGE.REQ_ERROR_MSG).nullable(),

  pct: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .nullable()
    .min(
      VALIDATION_VALUES.ZERO_VALUE,
      ERROR_MESSAGE.MIN_VALUE_MSG + VALIDATION_VALUES.ZERO_VALUE
    )
    .max(
      VALIDATION_VALUES.MAX_PCT_VALUE_100,
      ERROR_MESSAGE.MAX_VALUE_MSG + VALIDATION_VALUES.MAX_PCT_VALUE_100
    )
    .typeError(ERROR_MESSAGE.NUMERIC_VALIDATION_MESSAGE),
});
function Schooling(props) {
  const { setSchooling, schooling } = props;

  const [editIndex, setEditIndex] = useState(-1);

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
    defaultValues: SCHOOLING,
    resolver: yupResolver(SCHOOL_SCHEMA),
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('city', locations);
  }, [locations]);

  const addSchooling = () => {
    const school = getValues();

    if (school?.name && school?.board && school?.candidateClass) {
      reset(SCHOOLING);
      const sanitizedData = getSanitizedValues(school);
      setSchooling([...schooling, sanitizedData]);
      setLocations(undefined);
    }
  };

  const editSchool = () => {
    const updatedSchool = [...schooling];

    const school = getValues();

    updatedSchool[editIndex] = getSanitizedValues(school);
    setSchooling(updatedSchool);

    setLocations(undefined);

    reset(SCHOOLING);
    setEditIndex(-1);
  };

  const updateSchool = () => {
    if (editIndex > -1) {
      editSchool();
    } else {
      addSchooling();
    }
  };

  const handleEdit = (index) => {
    const school = schooling[index];
    setLocations(school.city);
    reset(school);
    setEditIndex(index);
  };

  return (
    <>
      <span className="subtitle-1-bold">{UI.SCHOOLING}</span>
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="top"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={6}>
          <div className="row ">
            <div className="col-md-12">
              <label htmlFor="name" className="form-label col-12">
                {UI.SCHOOL_NAME}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <input
                  {...register('name')}
                  name="name"
                  id="name"
                  type="text"
                  placeholder={UI.SCHOOL_NAME}
                  className="form-control"
                />
                {errors.name && (
                  <span className="mandatory">{errors.name.message}</span>
                )}
              </label>
            </div>

            <div className="col-md-12">
              <label htmlFor="candidateClass" className="form-label col-12">
                {UI.CLASS_NAME}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <Select
                  inputId="candidateClass"
                  name="candidateClass"
                  control={control}
                  options={getSchoolClassList()}
                  isRequired
                />{' '}
                {errors.candidateClass && (
                  <span className="mandatory">
                    {errors.candidateClass.message}
                  </span>
                )}
              </label>
            </div>

            <div className="col-md-12">
              <label htmlFor="board" className="form-label col-12">
                {UI.BOARD}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <input
                  {...register('board')}
                  name="board"
                  id="board"
                  type="text"
                  placeholder={UI.BOARD}
                  className="form-control "
                />
                {errors.board && (
                  <span className="mandatory">{errors.board.message}</span>
                )}
              </label>
            </div>

            <div className="col-md-12">
              <label htmlFor="schoolingCountry" className="form-label col-12">
                {UI.CITY}
                <GeoAutoLocation
                  setLocations={setLocations}
                  locations={locations}
                  inputId="schoolingCountry"
                />
              </label>
            </div>

            <div className="col-md-6 ">
              <label htmlFor="pct" className="form-label col-12">
                {UI.PERCENTAGE}
                <input
                  name="pct"
                  id="pct"
                  {...register('pct', {
                    min: 0,
                    max: 100,
                    valueAsNumber: true,
                  })}
                  type="number"
                  min={1}
                  max={100}
                  placeholder={UI.PERCENTAGE}
                  className="form-control "
                />{' '}
                {errors.pct && (
                  <span className="mandatory">{errors.pct.message}</span>
                )}
              </label>
            </div>
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit(updateSchool)}
              >
                {editIndex > -1 ? UI.UPDATE : UI.ADD}
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <EditDeleteList
            component={SchoolingView}
            onEdit={handleEdit}
            list={schooling}
            setList={setSchooling}
          />
        </Grid>
      </Grid>
    </>
  );
}
Schooling.propTypes = {
  schooling: PropTypes.array,
  setSchooling: PropTypes.func,
  control: PropTypes.object,
};

Schooling.defaultProps = {
  schooling: EMPTY_ARRAY,
  setSchooling: noop,
  control: EMPTY_OBJECT,
};

export default Schooling;
