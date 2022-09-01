import React from 'react';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { STEP_FOR_CANDIDATE_PROFILE } from '../constant/cadidateProfile.steps';

function CandidateStepper(props) {
  const { activeStep, onValidateCurrentPage } = props;

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
        {STEP_FOR_CANDIDATE_PROFILE.map((value, index) => (
          <Step
            sx={{ mt: 2 }}
            onClick={() => {
              onValidateCurrentPage(index);
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
CandidateStepper.propTypes = {
  activeStep: PropTypes.number,
  onValidateCurrentPage: PropTypes.func,
};
CandidateStepper.defaultProps = {
  activeStep: null,
  onValidateCurrentPage: noop,
};
export default CandidateStepper;
