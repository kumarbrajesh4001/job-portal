import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CircularProgress from '@mui/material/CircularProgress';
import { EMPTY_OBJECT } from '../../constants';
import SubmitAssessment from './dialogs/SubmitAssessment';
import TimeUpAssessment from './dialogs/TimeUpAssessment';
import InMidSubmitAssessment from './dialogs/InMidSubmitAssessment';
import EndAssessment from './dialogs/EndAssessment';
import UI from '../../constants/ui';

function TestActions(props) {
  const {
    onSubmitAssessment,
    onEndAssessment,
    isTimeUp,
    startTestResponse,
    questionResponse,
    isLoading,
  } = props;
  const [open, setOpen] = useState(false);

  const [isSubmitAssessmentDialogOpen, setIsSubmitAssessmentDialogOpen] =
    useState(false);

  const [isEndTestDialogOpen, setIsEndTestDialogOpen] = useState(false);
  const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false);
  const [isMidSubmitDialogOpen, setIsMidEndDialogOpen] = useState(false);

  const anchorRef = useRef(null);

  useEffect(() => {
    if (isTimeUp) {
      setIsTimeUpDialogOpen(true);
    }
  }, [isTimeUp]);

  const handleActionsToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleEndAssessmentAction = () => {
    setIsEndTestDialogOpen(true);
  };

  const handleSubmitAsessementAction = () => {
    if (
      questionResponse &&
      startTestResponse.totaltime !== questionResponse.quesNo
    ) {
      setIsMidEndDialogOpen(true);
    } else {
      setIsSubmitAssessmentDialogOpen(true);
    }
  };

  const handleEndAssessmentClose = () => {
    setIsEndTestDialogOpen(false);
  };

  const handleEndAssessment = () => {
    onEndAssessment();
    setIsEndTestDialogOpen(false);
  };

  const handleSubmitAssessmentClose = () => {
    setIsSubmitAssessmentDialogOpen(false);
  };

  const handleSubmitAssessment = () => {
    handleSubmitAssessmentClose();
    onSubmitAssessment();
  };

  const handleTimeupAssessmentClose = () => {
    setIsTimeUpDialogOpen(false);
    onEndAssessment();
  };

  const handleInMidSubmitAssessmentClose = () => {
    setIsMidEndDialogOpen(false);
  };

  return (
    <div>
      <EndAssessment
        isDialogOpen={isEndTestDialogOpen}
        primaryAction={handleEndAssessment}
        secondaryAction={handleEndAssessmentClose}
      />

      <TimeUpAssessment
        isDialogOpen={isTimeUpDialogOpen}
        primaryAction={onSubmitAssessment}
        secondaryAction={handleTimeupAssessmentClose}
      />
      <InMidSubmitAssessment
        isDialogOpen={isMidSubmitDialogOpen}
        primaryAction={onSubmitAssessment}
        secondaryAction={handleInMidSubmitAssessmentClose}
        remainingQuesions={
          startTestResponse.totalques - questionResponse.quesNo + 1
        }
      />
      <SubmitAssessment
        isDialogOpen={isSubmitAssessmentDialogOpen}
        primaryAction={handleSubmitAssessment}
        secondaryAction={handleSubmitAssessmentClose}
      />
      <ButtonGroup
        ref={anchorRef}
        className={classNames({ 'button-submit': !isEmpty(questionResponse) })}
        disabled={isEmpty(questionResponse)}
      >
        <Button
          onClick={handleSubmitAsessementAction}
          className="button"
          sx={{ color: '#ffffff' }}
          startIcon={
            isLoading && <CircularProgress size="1rem" color="inherit" />
          }
          disabled={isLoading}
        >
          {UI.SUBMIT}
        </Button>
        <Button
          size="small"
          onClick={handleActionsToggle}
          sx={{ color: '#ffffff' }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  <MenuItem
                    selected
                    value="End_Test"
                    onClick={handleEndAssessmentAction}
                    startIcon={
                      isLoading && (
                        <CircularProgress size="1rem" color="inherit" />
                      )
                    }
                    disabled={isLoading}
                  >
                    {UI.END_TEST}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

TestActions.propTypes = {
  startTestResponse: PropTypes.object,
  questionResponse: PropTypes.object,
  onSubmitAssessment: PropTypes.func,
  onEndAssessment: PropTypes.func,
  isTimeUp: PropTypes.bool,
  isLoading: PropTypes.bool,
};

TestActions.defaultProps = {
  startTestResponse: EMPTY_OBJECT,
  questionResponse: EMPTY_OBJECT,
  onSubmitAssessment: noop,
  onEndAssessment: noop,
  isTimeUp: false,
  isLoading: false,
};

export default TestActions;
