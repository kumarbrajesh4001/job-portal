import React from 'react';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { STEPS_FOR_EMPLOYER_PROFILES } from '../constant/employerProfile.steps';

function EmployerStepper(props) {
  const { activeStep, onValidatedCurrentPage } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {STEPS_FOR_EMPLOYER_PROFILES.map((value, index) => (
          <Step
            sx={{ mt: 2 }}
            onClick={() => {
              onValidatedCurrentPage(index);
            }}
            key={value.label}
          >
            <StepLabel>
              <Typography sx={{ cursor: 'pointer' }}>
                {value.label}
                {value.required ? (
                  <Box component="span" sx={{ color: '#d32f2f' }}>
                    *
                  </Box>
                ) : null}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
EmployerStepper.propTypes = {
  onValidatedCurrentPage: PropTypes.func,
  activeStep: PropTypes.number,
};
EmployerStepper.defaultProps = {
  onValidatedCurrentPage: noop,
  activeStep: null,
};
export default EmployerStepper;
