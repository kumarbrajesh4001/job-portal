import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import { useFormContext } from 'react-hook-form';
import MultiSelect from '../../../components/multiSelect';
import Select from '../../../components/select';
import VALIDATION_VALUES from '../../../constants/validationValues';
import {
  getOtherBenifitList,
  getPayBenifitList,
  getOtherBenifit,
  getPayBenifit,
} from '../../../formatter/commonBootstrap';
import { getShiftList } from '../../../formatter/employerBootstrap';
import { EMPTY_ARRAY } from '../../../constants';
import { DISABLED_PAST_DATE_AND_DATE_MONTH_FORMAT } from '../../../constants/datepicker';
import PortalDatePicker from '../../../components/portalDatePicker';
import UI from '../../../constants/ui';

function OtherDetails(props) {
  const { payBenefits, setPayBenefits, otherBenefits, setOtherBenefits } =
    props;
  const {
    formState: { errors },
    register,
    control,
    setValue,
    getValues,
  } = useFormContext();

  const [isNoOfOpeningDisabled, setIsNoOfOpeningDisabled] = useState(
    getValues('alwaysopen')
  );
  useEffect(() => {
    setValue('paybenefits', payBenefits);
  }, [payBenefits]);

  useEffect(() => {
    setValue('otherbenefits', otherBenefits);
  }, [otherBenefits]);

  const onChangeHandler = (e) => {
    setValue('openings', undefined);
    setIsNoOfOpeningDisabled(e.target.checked);
  };

  return (
    <div div className="row ">
      <div className="col-md-12 ">
        <div className="row">
          {/*  Shift */}
          <div className="col-md-6 mb-4 mt-1 ">
            <span htmlFor="shift" className="form-label">
              {UI.SHIFT}
              <Select
                inputId="shift"
                name="shift"
                control={control}
                options={getShiftList()}
              />
            </span>
          </div>
          {/* Number of openings */}
          <div className="col-md-6 mt-1">
            <label htmlFor="noofopening" className="form-label col-12">
              {UI.NUMBER_OF_OPENINGS}
              {!getValues('alwaysopen') && (
                <Box component="span" sx={{ color: '#d32f2f' }}>
                  *
                </Box>
              )}
              <label
                className="form-check-label float-end"
                htmlFor="alwaysopen"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  {...register('alwaysopen', {
                    require: false,
                    onChange: onChangeHandler,
                  })}
                  id="alwaysopen"
                />{' '}
                {UI.ALWAYS_HIRING}
              </label>
              <input
                disabled={isNoOfOpeningDisabled}
                {...register('openings', {
                  valueAsNumber: true,
                  require: !isNoOfOpeningDisabled,
                  min: {
                    value: VALIDATION_VALUES.MIN_VALUE,
                  },
                })}
                type="number"
                min={VALIDATION_VALUES.MIN_VALUE}
                placeholder={UI.ENTER_OPENING}
                className="form-control "
                id="openings"
              />
              <div className="field_space">
                {errors.openings && (
                  <span className="mandatory">{errors.openings.message}</span>
                )}
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="col-md-12 ">
        <div className="row ">
          {/* Start date */}
          <div className="col-md-4 " style={{ marginBottom: '21px' }}>
            <label htmlFor="startdate" className="form-label col-12">
              {UI.START_DATE}
              <br />
              <PortalDatePicker
                control={control}
                name="startdate"
                id="startdate"
                error={errors.startdate}
                config={DISABLED_PAST_DATE_AND_DATE_MONTH_FORMAT}
              />
            </label>
          </div>
          {/* Job deadline */}
          <div className="col-md-4 " style={{ marginBottom: '21px' }}>
            <label htmlFor="jobdeadline" className="form-label col-12">
              {UI.JOB_DEADLINE}
              <br />
              <PortalDatePicker
                control={control}
                name="jobdeadline"
                id="jobdeadline"
                error={errors.jobdeadline}
                config={DISABLED_PAST_DATE_AND_DATE_MONTH_FORMAT}
              />
            </label>
          </div>
          {/* Job expires on */}
          <div className="col-md-4 " style={{ marginBottom: '21px' }}>
            <label htmlFor="jobexpires" className="form-label col-12">
              {UI.JOB_EXPIRES_ON}
              <br />
              <PortalDatePicker
                control={control}
                name="jobexpires"
                id="jobexpires"
                error={errors.jobexpires}
                config={DISABLED_PAST_DATE_AND_DATE_MONTH_FORMAT}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            {/*   Pay benefits */}
            <div className="col-md-12 " style={{ marginBottom: '21px' }}>
              <span htmlFor="paybenefits" className="form-label col-12">
                {UI.PAY_BENEFITS}
                <MultiSelect
                  id="paybenefits"
                  name="paybenefits"
                  control={control}
                  setChipLabel={getPayBenifit}
                  setValues={setPayBenefits}
                  values={payBenefits}
                  options={getPayBenifitList()}
                />
              </span>
            </div>
          </div>
          <div className="col-md-6 ">
            {/*  Other benefits: */}
            <div className="col-md-12">
              <label htmlFor="otherbenefits" className="form-label col-12">
                {UI.OTHER_BENEFITS}
                <MultiSelect
                  id="otherbenefits"
                  name="otherbenefits"
                  control={control}
                  setChipLabel={getOtherBenifit}
                  setValues={setOtherBenefits}
                  values={otherBenefits}
                  options={getOtherBenifitList()}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
OtherDetails.propTypes = {
  payBenefits: PropTypes.array,
  setPayBenefits: PropTypes.func,
  otherBenefits: PropTypes.array,
  setOtherBenefits: PropTypes.func,
};

OtherDetails.defaultProps = {
  payBenefits: EMPTY_ARRAY,
  setPayBenefits: noop,
  otherBenefits: EMPTY_ARRAY,
  setOtherBenefits: noop,
};

export default OtherDetails;
