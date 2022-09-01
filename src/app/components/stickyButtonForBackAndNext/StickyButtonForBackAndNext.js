import { Button } from '@mui/material';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import UI from '../../constants/ui';
import useMobileDevice from '../../hooks/useMobileDevice';

function StickyButtonForBackAndNext(props) {
  const isMobileDevice = useMobileDevice();
  const { activeStep, totalNumberOfSteps, handleNext, handleBack } = props;

  const nextStepBtn = () =>
    activeStep < totalNumberOfSteps - 1 && (
      <Button
        type="button"
        fullWidth
        size="large"
        variant={isMobileDevice ? 'text' : 'contained'}
        onClick={handleNext}
      >
        {UI.NEXT}
      </Button>
    );

  const backStepBtn = () =>
    activeStep !== 0 && (
      <Button
        size="large"
        fullWidth
        variant={isMobileDevice ? 'text' : 'outlined'}
        onClick={handleBack}
      >
        {UI.BACK}
      </Button>
    );

  const verticalDivider = useMemo(
    () =>
      activeStep > 0 &&
      activeStep < totalNumberOfSteps - 1 && (
        <span className="verticalDivider"> </span>
      ),
    [activeStep]
  );

  return isMobileDevice ? (
    <div className="shadow-lg z-index-1 bottom-0 position-fixed card-border background-ffffff">
      <div className="d-flex justify-content-center stickyBtnHeightForAllProfile">
        {backStepBtn()}
        {verticalDivider}
        {nextStepBtn()}
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-between mt-4 mb-2 px-4">
      <div className="col-6 col-md-2">{backStepBtn()}</div>
      <div className="col-6 col-md-2 d-flex justify-content-end">
        {nextStepBtn()}
      </div>
    </div>
  );
}

StickyButtonForBackAndNext.propTypes = {
  activeStep: PropTypes.number,
  totalNumberOfSteps: PropTypes.number,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};
StickyButtonForBackAndNext.defaultProps = {
  activeStep: 0,
  totalNumberOfSteps: 0,
  handleNext: noop,
  handleBack: noop,
};
export default StickyButtonForBackAndNext;
