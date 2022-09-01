import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import { EMPTY_ARRAY } from '../../../constants';

function StepperView(props) {
  const { onValidatedCurrentPage, activeStep, tabsName } = props;
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
        {tabsName.map((value, index) => (
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

StepperView.propTypes = {
  onValidatedCurrentPage: PropTypes.func,
  activeStep: PropTypes.number,
  tabsName: PropTypes.array,
};

StepperView.defaultProps = {
  onValidatedCurrentPage: noop,
  activeStep: 0,
  tabsName: EMPTY_ARRAY,
};
export default StepperView;
