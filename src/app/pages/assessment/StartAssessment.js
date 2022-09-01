import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import {
  EMPTY_OBJECT,
  FIRST_QUESTION_NUMBER,
  EMPTY_ARRAY,
} from '../../constants';
import { postRequest, getRequest } from '../../services';

import {
  getTerminateAssessment,
  getAssessmentSubmit,
  getFlipQuestion,
  getQuestions,
  getAssessmentStart,
} from '../../constants/apiUrls';
import QuestionPage from './QuestionPage';
import SubmitedAssessment from './SubmitedAssessment';
import { CommonSkeleton } from '../../components/skeleton';
import { getSkill } from '../../formatter/commonBootstrap';
import TestSummary from './TestSummary';
import TestActions from './TestActions';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import UI from '../../constants/ui';

function StartAssessment() {
  const [searchParams] = useSearchParams();
  const [testStartTime, setTestStartTime] = useState(0);
  const [techId, setTechId] = useState(0);

  const [startTestResponse, setStartTestResponse] = useState(EMPTY_OBJECT);

  const [isLoading, setIsLoading] = useState(false);

  const [questionResponse, setQuestionResponse] = useState(EMPTY_OBJECT);
  const [submitAssessmentResponse, setSubmitAssessmentResponse] = useState();
  const [spentTimeOnQuestion, setSpentTimeOnQuestion] = useState(0);

  const [isTimeUp, setIsTimeUp] = useState(false);

  const [opensnackbar, setSnackbarOpen] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const handleEndAssessment = () => {
    setIsLoading(true);
    getRequest(getTerminateAssessment(startTestResponse.assessmentId))
      .then(() => window.close())
      .catch((error) =>
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        })
      )
      .finally(() => setIsLoading(false));
  };

  const handleSubmitAssessment = () => {
    setIsLoading(true);
    getRequest(getAssessmentSubmit(startTestResponse.assessmentId))
      .then(setSubmitAssessmentResponse)
      .catch((error) => {
        handleEndAssessment();
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const fetchQuestion = (assessmentId, quesNo, payload) => {
    setIsLoading(true);

    postRequest(getQuestions(assessmentId, quesNo), payload)
      .then((response) => {
        setQuestionResponse(response);
        if (quesNo === 0) {
          handleSubmitAssessment();
        }
      })
      .catch((error) =>
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        })
      )
      .finally(() => setIsLoading(false));
  };

  const fetchFlipQuestion = (payload) => {
    setIsLoading(true);
    postRequest(getFlipQuestion(startTestResponse.assessmentId), payload)
      .then(setQuestionResponse)
      .catch((error) =>
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: 'error',
        })
      )
      .finally(() => setIsLoading(false));
  };

  const handleNextQuestion = (selectedOption) => {
    const payload = {
      questionid: questionResponse.questionId,
      quesNo: questionResponse.quesNo,
      response: selectedOption,
      rtime: spentTimeOnQuestion,
      etime: testStartTime,
    };

    let nextQuesNo;
    if (questionResponse.quesremaining === 0) {
      nextQuesNo = 0;
    } else {
      nextQuesNo = questionResponse.quesNo + 1;
    }
    fetchQuestion(startTestResponse.assessmentId, nextQuesNo, payload);
  };

  const handleFlipQuestion = () => {
    const flipRequestPayload = {
      questionid: questionResponse.questionId,
      quesNo: questionResponse.quesNo,
      response: 0,
      rtime: spentTimeOnQuestion,
      etime: testStartTime,
    };
    fetchFlipQuestion(flipRequestPayload);
  };

  useEffect(() => {
    const techIdParam = +searchParams.get('techId');
    let testStartTimeIntervalId = 0;
    setTechId(techIdParam);

    getRequest(getAssessmentStart(techIdParam)).then((res) => {
      setStartTestResponse(res);
      fetchQuestion(res.assessmentId, FIRST_QUESTION_NUMBER);
      testStartTimeIntervalId = setInterval(() => {
        setTestStartTime((time) => {
          if (time >= startTestResponse.totaltime) {
            setIsTimeUp(true);
            clearInterval(testStartTimeIntervalId);
            return time;
          }
          return time + 1;
        });
      }, 1000);
    });

    return () => {
      clearInterval(testStartTimeIntervalId);
    };
  }, EMPTY_ARRAY);

  return (
    <div className="container mt-5">
      <div>
        {submitAssessmentResponse ? (
          <SubmitedAssessment
            submitAssessmentResponse={submitAssessmentResponse}
          />
        ) : (
          <div>
            <div className="d-flex justify-content-between my-2">
              <div className="headline-4-bold color-000000 ">{`${getSkill(
                +techId
              )} ${UI.ASSESSMENT}`}</div>

              <TestActions
                startTestResponse={startTestResponse}
                questionResponse={questionResponse}
                isTimeUp={isTimeUp}
                onSubmitAssessment={handleSubmitAssessment}
                onEndAssessment={handleEndAssessment}
                isLoading={isLoading}
              />
            </div>

            {isEmpty(questionResponse) ? (
              <CommonSkeleton />
            ) : (
              <>
                <TestSummary
                  startTestResponse={startTestResponse}
                  testStartTime={testStartTime}
                  questionResponse={questionResponse}
                  spentTimeOnQuestion={spentTimeOnQuestion}
                />
                <QuestionPage
                  key={questionResponse.questionId}
                  questionResponse={questionResponse}
                  techId={techId}
                  setSpentTimeOnQuestion={setSpentTimeOnQuestion}
                  getNextQuestion={handleNextQuestion}
                  getFlipQuestion={handleFlipQuestion}
                  startTestResponse={startTestResponse}
                  isTimeUp={isTimeUp}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        )}
      </div>

      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}

export default StartAssessment;
