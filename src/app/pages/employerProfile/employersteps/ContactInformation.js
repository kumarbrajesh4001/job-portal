import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import noop from 'lodash/noop';
import { Box, Grid } from '@mui/material';
import GeoAutoLocation from '../../../components/geoLocation';
import REGEX from '../../../constants/regex';
import ERROR_MESSAGE from '../../../constants/errorMsgs';
import VALIDATION_VALUES from '../../../constants/validationValues';
import { EMPTY_OBJECT } from '../../../constants';
import UI from '../../../constants/ui';

function ContactInformation(props) {
  const { locations, setLocations } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="top"
      spacing={2}
    >
      <Grid item xs={12} md={6}>
        {/* Contact Name: */}
        <div>
          <label
            htmlFor="contactperson"
            className=" form-label col-12 subtitle-1"
          >
            {UI.CONTACT_NAME}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
            <input
              id="contactperson"
              type="text"
              placeholder={UI.CONTACT_NAME}
              className="form-control"
              {...register('contactperson', {
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
          </label>
          <div className="field_space">
            {errors.contactperson && (
              <p className="mandatory">{errors.contactperson.message}</p>
            )}
          </div>
        </div>
        {/* Contact Number: */}
        <div className="mt-1">
          <label
            htmlFor="contactnumber"
            className=" form-label col-12 subtitle-1"
          >
            {UI.CONTACT_NUMBER}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
            <input
              id="contactnumber"
              type="number"
              placeholder={UI.CONTACT_NUMBER}
              maxLength={VALIDATION_VALUES.MAX_VALUE_15}
              className="form-control"
              {...register('contactnumber', {
                pattern: {
                  value: REGEX.NUMERIC_FORMAT,
                  message: ERROR_MESSAGE.NUMERIC_VALIDATION_MESSAGE,
                },
                required: ERROR_MESSAGE.REQ_ERROR_MSG,
                minLength: {
                  value: VALIDATION_VALUES.MIN_VALUE,
                  message:
                    ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE,
                },

                maxLength: {
                  value: VALIDATION_VALUES.MAX_VALUE_15,
                  message:
                    ERROR_MESSAGE.MAX_ERROR_MSG +
                    VALIDATION_VALUES.MAX_VALUE_15,
                },
              })}
            />
          </label>
          <div className="field_space">
            {errors.contactnumber && (
              <p className="mandatory">{errors.contactnumber.message}</p>
            )}
          </div>
        </div>
        {/* city */}
        <div>
          <span htmlFor="city" className=" form-label col-12 subtitle-1">
            {UI.CITY}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
            <GeoAutoLocation
              setLocations={setLocations}
              locations={locations}
              inputId="city"
              error={errors?.city?.shortname}
            />
          </span>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Role: */}
        <div>
          <label
            htmlFor="contactrole"
            className=" form-label col-12 subtitle-1"
          >
            {UI.ROLE}
            <Box component="span" sx={{ color: '#d32f2f' }}>
              *
            </Box>
            <input
              id="contactrole"
              type="text"
              placeholder={UI.ROLE_PLACEHOLDER}
              className="form-control"
              {...register('contactrole', {
                required: ERROR_MESSAGE.REQ_ERROR_MSG,
                minLength: {
                  value: VALIDATION_VALUES.MIN_VALUE,
                  message:
                    ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE,
                },

                maxLength: {
                  value: VALIDATION_VALUES.MAX_VALUE_128,
                  message:
                    ERROR_MESSAGE.MAX_ERROR_MSG +
                    VALIDATION_VALUES.MAX_VALUE_128,
                },
              })}
            />
          </label>
          <div className="field_space">
            {errors.contactrole && (
              <p className="mandatory">{errors.contactrole.message}</p>
            )}
          </div>
        </div>
        {/* address */}
        <div className="mb-1 mt-1">
          <label htmlFor="address" className=" form-label col-12 subtitle-1">
            {UI.ADDRESS}
            <input
              id="address"
              type="text"
              placeholder={UI.COMPANY_ADDRESS}
              className="form-control"
              {...register('address', {
                minLength: {
                  value: VALIDATION_VALUES.MIN_VALUE,
                  message:
                    ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE,
                },
                maxLength: {
                  value: VALIDATION_VALUES.MAX_VALUE_128,
                  message:
                    ERROR_MESSAGE.MAX_ERROR_MSG +
                    VALIDATION_VALUES.MAX_VALUE_128,
                },
              })}
            />
          </label>
          <div className="field_space">
            {errors.address && (
              <span className="mandatory">{errors.address.message}</span>
            )}
          </div>
        </div>
        {/*  Website */}
        <div>
          <label htmlFor="website" className=" form-label col-12 subtitle-1">
            {UI.WEBSITE}
            <input
              {...register('website', {
                minLength: {
                  value: VALIDATION_VALUES.MIN_VALUE,
                  message:
                    ERROR_MESSAGE.MIN_ERROR_MSG + VALIDATION_VALUES.MIN_VALUE,
                },
                maxLength: {
                  value: VALIDATION_VALUES.MAX_VALUE_1024,
                  message:
                    ERROR_MESSAGE.MAX_ERROR_MSG +
                    VALIDATION_VALUES.MAX_VALUE_1024,
                },
              })}
              placeholder={UI.WWW_EXAMPLE_COM}
              type="url"
              className="form-control"
              id="website"
              aria-describedby="basic-addon3"
            />
          </label>
          <div className="field_space">
            {errors.website && (
              <span className="mandatory">{errors.website.message}</span>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
ContactInformation.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  locations: PropTypes.object,
  setLocations: PropTypes.func,
};

ContactInformation.defaultProps = {
  locations: EMPTY_OBJECT,
  setLocations: noop,
  register: noop,
  errors: EMPTY_OBJECT,
};

export default ContactInformation;
