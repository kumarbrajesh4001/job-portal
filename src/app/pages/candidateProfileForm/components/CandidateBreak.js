import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import EditDeleteList from '../../../components/editDeleteList';
import BreakView from '../../../components/candidateComponent/BreakView';
import { EMPTY_ARRAY } from '../../../constants';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';
import getSanitizedValues from '../../../helpers/emptyFieldsValidation';
import { getDateInMMYY, getDateInYYMMDD } from '../../../formatter/date';
import UI from '../../../constants/ui';
import PortalDatePicker from '../../../components/portalDatePicker';
import {
  DISABLED_FUTURE_DATE_AND_MONTH_FORMAT,
  MONTH_YEAR,
} from '../../../constants/datepicker';

const DEFAULT_BREAK = {
  reason: '',
  from: '',
  to: '',
  visibility: true,
};

const BREAK_PROPS = { isVisibility: true };

function CandidateBreak(props) {
  const { setBreaks, breaks } = props;
  const [editIndex, setEditIndex] = useState(-1);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: DEFAULT_BREAK,
  });

  const addBreak = () => {
    const breakData = getValues();
    if (breakData?.reason) {
      const fromDate = breakData.from;
      if (fromDate) {
        breakData.from = getDateInYYMMDD(fromDate);
      }
      const toDate = breakData.to;
      if (toDate) {
        breakData.to = getDateInYYMMDD(toDate);
      }
      const sanitizedData = getSanitizedValues(breakData);
      setBreaks([...breaks, sanitizedData]);
    }
    reset(DEFAULT_BREAK);
  };

  const editBreak = () => {
    const updatedBreak = [...breaks];
    const editedBreakData = getValues();
    const fromDate = editedBreakData.from;
    const toDate = editedBreakData.to;
    if (fromDate) {
      editedBreakData.from = getDateInYYMMDD(fromDate);
    }
    if (toDate) {
      editedBreakData.to = getDateInYYMMDD(toDate);
    }
    updatedBreak[editIndex] = getSanitizedValues(editedBreakData);
    setBreaks(updatedBreak);
    setEditIndex(-1);
    reset(DEFAULT_BREAK);
  };

  const updateBreak = () => {
    if (editIndex > -1) {
      editBreak();
    } else {
      addBreak();
    }
  };

  const handleEdit = (index) => {
    const breakData = breaks[index];
    const fromDate = breakData.from;
    const toDate = breakData.to;
    if (fromDate) {
      breakData.from = getDateInMMYY(fromDate);
    }
    if (toDate) {
      breakData.to = getDateInMMYY(toDate);
    }
    reset(breakData);
    setEditIndex(index);
  };

  return (
    <>
      <span className="subtitle-1-bold">{UI.BREAK}</span>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="top"
        sx={{ mb: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={6}>
          <div className="row  ">
            <div className="col-md-12">
              <label htmlFor="reason" className="form-label col-12">
                {UI.REASON}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <input
                  {...register('reason', {
                    required: ERROR_MESSAGE.REQ_ERROR_MSG,
                    minLength: {
                      value: VALIDATION_VALUES.MIN_VALUE,
                      message:
                        ERROR_MESSAGE.MIN_ERROR_MSG +
                        VALIDATION_VALUES.MIN_VALUE,
                    },
                    maxLength: {
                      value: VALIDATION_VALUES.MAX_VALUE_128,
                      message:
                        ERROR_MESSAGE.MAX_ERROR_MSG +
                        VALIDATION_VALUES.MAX_VALUE_128,
                    },
                  })}
                  id="reason"
                  type="text"
                  placeholder={UI.ENTER_A_REASON}
                  className="form-control"
                />
              </label>
              {errors.reason && (
                <span className="mandatory">{errors.reason.message}</span>
              )}
            </div>
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
              {errors.from && (
                <span className="mandatory">{errors.from.message}</span>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="to" className="form-label col-12">
                {UI.TO}
                <br />
                <PortalDatePicker
                  control={control}
                  fields={MONTH_YEAR}
                  name="to"
                  id="to"
                  error={errors.to}
                  config={DISABLED_FUTURE_DATE_AND_MONTH_FORMAT}
                />
              </label>
              {errors.to && (
                <span className="mandatory">{errors.to.message}</span>
              )}
            </div>
            <div className="col-md-12 mt-1">
              <div className="form-check">
                <label className="form-check-label" htmlFor="breakVisibility">
                  {UI.VISIBILITY}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register('visibility')}
                    id="breakVisibility"
                  />
                </label>
              </div>
            </div>
            <div className="col-md-12 mt-2">
              <button
                type="button"
                onClick={handleSubmit(updateBreak)}
                className="btn btn-primary"
              >
                {editIndex > -1 ? UI.UPDATE : UI.ADD}
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <EditDeleteList
            component={BreakView}
            onEdit={handleEdit}
            list={breaks}
            setList={setBreaks}
            config={BREAK_PROPS}
          />
        </Grid>
      </Grid>
    </>
  );
}

CandidateBreak.propTypes = {
  setBreaks: PropTypes.func,
  breaks: PropTypes.array,
};

CandidateBreak.defaultProps = {
  setBreaks: noop,
  breaks: EMPTY_ARRAY,
};

export default CandidateBreak;
