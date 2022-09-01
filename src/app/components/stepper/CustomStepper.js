import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import TabsView from './tabsView';
import StepperView from './stepperView';
import useMobileDevice from '../../hooks/useMobileDevice';
import { EMPTY_ARRAY } from '../../constants';

function CustomStepper(props) {
  const { activeStep, tabsName, onValidatedCurrentPage } = props;

  const isMobileDevice = useMobileDevice();

  const Component = useMemo(
    () => (isMobileDevice ? TabsView : StepperView),
    [isMobileDevice, TabsView, StepperView]
  );

  return (
    <Component
      tabsName={tabsName}
      activeStep={activeStep}
      onValidatedCurrentPage={onValidatedCurrentPage}
    />
  );
}

CustomStepper.propTypes = {
  activeStep: PropTypes.number,
  tabsName: PropTypes.array,
  onValidatedCurrentPage: PropTypes.func,
};

CustomStepper.defaultProps = {
  activeStep: 0,
  tabsName: EMPTY_ARRAY,
  onValidatedCurrentPage: noop,
};
export default CustomStepper;
