import React from 'react';
import { Button, Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import noop from 'lodash';
import TAB_STYLE from './tabsView.constant';
import { EMPTY_ARRAY } from '../../../constants';

function TabsView(props) {
  const { tabsName, activeStep, onValidatedCurrentPage } = props;

  const step = (item, index) => (
    <span>
      <Button onClick={() => onValidatedCurrentPage(index)} style={TAB_STYLE}>
        <span className="color-000000">{item.label}</span>
        {item.required && <span className="color-FF0000">*</span>}
      </Button>
    </span>
  );

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Tabs
        value={activeStep}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="scrollable prevent tabs"
      >
        {tabsName.map((item, index) => (
          <Tab
            label={item.label}
            key={index}
            component={() => step(item, index)}
          />
        ))}
      </Tabs>
    </Box>
  );
}

TabsView.propTypes = {
  tabsName: PropTypes.array,
  activeStep: PropTypes.number,
  onValidatedCurrentPage: PropTypes.func,
};

TabsView.defaultProps = {
  tabsName: EMPTY_ARRAY,
  activeStep: 0,
  onValidatedCurrentPage: noop,
};

export default TabsView;
