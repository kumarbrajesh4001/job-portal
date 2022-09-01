import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import EditDeleteList from '../../../components/editDeleteList';
import CertificationsView from '../../../components/candidateComponent/CertificationsView';
import { EMPTY_ARRAY } from '../../../constants';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';
import getSanitizedValues from '../../../helpers/emptyFieldsValidation';
import { getDateInMMYY, getDateInYYMMDD } from '../../../formatter/date';
import PortalDatePicker from '../../../components/portalDatePicker';
import {
  DISABLED_FUTURE_DATE_AND_MONTH_FORMAT,
  MONTH_YEAR,
} from '../../../constants/datepicker';
import UI from '../../../constants/ui';

const DEFAULT_CERTIFICATIONS = {
  name: '',
  desc: '',
  date: '',
  duration: null,
};

function CandidateCertifications(props) {
  const { setCertifications, certifications } = props;
  const [editIndex, setEditIndex] = useState(-1);
  const {
    register,
    getValues,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_CERTIFICATIONS,
  });

  const addCertification = () => {
    const certification = getValues();
    if (certification?.name) {
      const { date } = certification;
      if (date) {
        certification.date = getDateInYYMMDD(date);
      }
      const sanitizedData = getSanitizedValues(certification);
      setCertifications([...certifications, sanitizedData]);
    }
    reset(DEFAULT_CERTIFICATIONS);
  };

  const editCertification = () => {
    const updatedCertifications = [...certifications];
    const editedCertData = getValues();
    const { date } = editedCertData;
    if (date) {
      editedCertData.date = getDateInYYMMDD(date);
    }
    updatedCertifications[editIndex] = getSanitizedValues(editedCertData);
    setCertifications(updatedCertifications);
    reset(DEFAULT_CERTIFICATIONS);
    setEditIndex(-1);
  };

  const updateCertifications = () => {
    if (editIndex > -1) {
      editCertification();
    } else {
      addCertification();
    }
  };

  const handleEdit = (index) => {
    const certification = certifications[index];
    const { date } = certification;
    if (date) {
      certification.date = getDateInMMYY(date);
    }
    reset(certification);
    setEditIndex(index);
  };

  return (
    <>
      <span className="subtitle-1-bold">{UI.CERTIFICATIONS}</span>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="top"
        sx={{ mb: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={6}>
          <div className="row">
            {/* Name */}
            <div className="col-md-12">
              <label htmlFor="name" className="form-label col-12">
                {UI.NAME}
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
                <input
                  {...register('name', {
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
                  id="name"
                  name="name"
                  type="text"
                  placeholder={UI.NAME}
                  className="form-control "
                />
              </label>
              {errors.name && (
                <span className="mandatory">{errors.name.message}</span>
              )}
            </div>
            {/*  Description */}
            <div className="col-md-12">
              <label htmlFor="certifications" className="form-label col-12">
                {UI.DESCRIPTION}
                <textarea
                  {...register('desc', {
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
                  type="text"
                  placeholder={UI.DESCRIPTION}
                  className="form-control "
                  id="certifications"
                />
              </label>
              {errors.desc && (
                <span className="mandatory">{errors.desc.message}</span>
              )}
            </div>
            {/*  Date */}
            <div className="col-md-12">
              <label htmlFor="date" className="form-label col-12">
                {UI.DATE} <br />
                <PortalDatePicker
                  control={control}
                  fields={MONTH_YEAR}
                  name="date"
                  id="date"
                  error={errors.date}
                  config={DISABLED_FUTURE_DATE_AND_MONTH_FORMAT}
                />
              </label>
              {errors.date && (
                <span className="mandatory">{errors.date.message}</span>
              )}
            </div>
            {/*  Validity in months */}
            <div className="col-md-12">
              <label htmlFor="duration" className="form-label col-12">
                {UI.VALIDITY_IN_MONTHS}
                <input
                  {...register('duration', {
                    valueAsNumber: true,
                    min: 1,
                  })}
                  type="number"
                  placeholder={UI.IN_MONTH}
                  className="form-control "
                  id="duration"
                  name="duration"
                  min={1}
                />
              </label>
            </div>
            {/* 'Update' and {UI.ADD} button */}
            <div className="col-md-12 mt-2 ">
              <button
                type="button"
                onClick={handleSubmit(updateCertifications)}
                className="btn btn-primary"
              >
                {editIndex > -1 ? UI.UPDATE : UI.ADD}
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <EditDeleteList
            component={CertificationsView}
            onEdit={handleEdit}
            list={certifications}
            setList={setCertifications}
          />
        </Grid>
      </Grid>
    </>
  );
}
CandidateCertifications.propTypes = {
  setCertifications: PropTypes.func,
  certifications: PropTypes.array,
};

CandidateCertifications.defaultProps = {
  setCertifications: noop,
  certifications: EMPTY_ARRAY,
};
export default CandidateCertifications;
