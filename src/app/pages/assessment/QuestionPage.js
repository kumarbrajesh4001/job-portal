import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CircularProgress from '@mui/material/CircularProgress';
import codeFormatter from './assessment.helper';
import { getSkill } from '../../formatter/commonBootstrap';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import FlipConfirmation from './dialogs/FlipConfirmation';
import UI from '../../constants/ui';

function QuestionPage(props) {
  const {
    questionResponse,
    techId,
    getNextQuestion,
    setSpentTimeOnQuestion,
    getFlipQuestion,
    startTestResponse,
    isTimeUp,
    isLoading,
  } = props;
  const [value, setValue] = useState();
  const [helperText, setHelperText] = useState();

  const [isFlipDialogOpen, setIsFlipDialogOpen] = useState(false);

  const handleFlipConfirmationAction = () => {
    setIsFlipDialogOpen(true);
  };

  const handleFlipConfirmationClose = () => {
    setIsFlipDialogOpen(false);
  };

  const handleFlipConfirmation = () => {
    handleFlipConfirmationClose();
    getFlipQuestion();
  };

  useEffect(() => {
    setSpentTimeOnQuestion(0);
  }, EMPTY_ARRAY);

  useEffect(() => {
    const counter = setInterval(
      () =>
        setSpentTimeOnQuestion((timer) => {
          if (isTimeUp) {
            clearInterval(counter);
            return timer;
          }
          return timer + 1;
        }),
      1000
    );
    return () => {
      clearInterval(counter);
    };
  }, [isTimeUp]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) {
      setHelperText(UI.PLEASE_SELECT_AN_ANY_OPTION);
    }
  };

  const codeFormatterString = useMemo(
    () => codeFormatter(questionResponse.question),
    [questionResponse]
  );

  return (
    <div>
      <div className="row quesBorder mt-3 p-4">
        <div className="col">
          <span className="subtitle-1-bold color-1F2830">
            Q {questionResponse?.quesNo}.
          </span>

          <span className="ms-2 subtitle-1-bold color-1F2830">
            {codeFormatterString.startString}
            {codeFormatterString.formattedString && (
              <SyntaxHighlighter
                language={getSkill(techId)?.toLowerCase()}
                style={docco}
                showLineNumbers
              >
                {codeFormatterString.formattedString}
              </SyntaxHighlighter>
            )}
            {codeFormatterString.lastString}
          </span>

          <div className="mt-3 mb-1 subtitle-2 color-5B5B5B">
            ({UI.APPROX_TIME}:{questionResponse.qtime} {UI.SEC})
          </div>

          <form onSubmit={handleSubmit}>
            <FormControl error={helperText} variant="standard">
              <RadioGroup name="quiz" value={value}>
                {questionResponse.options?.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={index + 1}
                    className="subtitle-1 color-1F2830"
                    control={
                      <Radio
                        key={index}
                        onClick={(event) => {
                          setValue(+event.target.value);
                          setHelperText('');
                        }}
                        size="small"
                      />
                    }
                    label={option}
                  />
                ))}
              </RadioGroup>
              <FormHelperText className="fs-6">{helperText}</FormHelperText>
            </FormControl>

            <div className="row">
              <div className="col justify-content-end d-flex">
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  onClick={() => {
                    if (value) {
                      getNextQuestion(value);
                    }
                  }}
                  startIcon={
                    isLoading && (
                      <CircularProgress size="1rem" color="inherit" />
                    )
                  }
                  disabled={isLoading}
                >
                  {`${
                    questionResponse.quesremaining === 0
                      ? UI.SAVE_SUBMIT
                      : UI.SAVE_NEXT
                  }`}
                </Button>
                <Button
                  disabled={isLoading || questionResponse.flipremaining === 0}
                  onClick={handleFlipConfirmationAction}
                  className="mx-4 color-000000 text-transform"
                  startIcon={
                    isLoading && (
                      <CircularProgress size="1rem" color="inherit" />
                    )
                  }
                >
                  {UI.FLIP_THIS_QUESTIONS}
                </Button>
                <div className="mt-2">
                  <span className=" subtitle-2 color-000000">
                    <ListAltIcon /> {UI.FLIP_QUESTIONS}:
                  </span>
                  <span className="subtitle-1-bold color-000000 ms-2">
                    {startTestResponse.flipques -
                      questionResponse.flipremaining}
                    /{startTestResponse.flipques}
                  </span>
                </div>
                <FlipConfirmation
                  isDialogOpen={isFlipDialogOpen}
                  primaryAction={handleFlipConfirmation}
                  secondaryAction={handleFlipConfirmationClose}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

QuestionPage.propTypes = {
  questionResponse: PropTypes.object,
  techId: PropTypes.number,
  getNextQuestion: PropTypes.func,
  setSpentTimeOnQuestion: PropTypes.func,
  getFlipQuestion: PropTypes.func,
  startTestResponse: PropTypes.object,
  isTimeUp: PropTypes.bool,
  isLoading: PropTypes.bool,
};

QuestionPage.defaultProps = {
  questionResponse: EMPTY_OBJECT,
  techId: 0,
  getNextQuestion: noop,
  setSpentTimeOnQuestion: noop,
  getFlipQuestion: noop,
  startTestResponse: EMPTY_OBJECT,
  isTimeUp: false,
  isLoading: false,
};

export default QuestionPage;
