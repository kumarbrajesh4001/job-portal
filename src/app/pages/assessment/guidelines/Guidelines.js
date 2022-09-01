/* eslint-disable no-restricted-globals */
/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import noop from 'lodash/noop';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styles from '../assessment.module.css';
import { getSkill } from '../../../formatter/commonBootstrap';
import { CommonSkeleton } from '../../../components/skeleton';
import { EMPTY_ARRAY } from '../../../constants';
import URL from '../../../constants/urls';

import UI from '../../../constants/ui';
import getFooterFromBootstrapById from '../../../formatter/footerBootstrap';
import AssessmentGuidelines from '../AssessmentGuidelines';
import TermAndConditionDialog from '../TermAndConditionDialog';
import getAssessmentGuidelines from '../assessment.service';

function Guidelines(props) {
  const { setHideForAssess, setShowFooter } = props;
  const [startButtonDisabled, setStartButtonDisabled] = useState(true);
  const [isGuideLineSkeletonShow, setIsGuideLineSkeletonShow] = useState(false);
  const [guidelines, setGuidelines] = useState(EMPTY_ARRAY);
  const [termAndConditionDialogOpen, setTermAndConditionDialogOpen] =
    useState(false);
  const [searchParams] = useSearchParams();
  const techIdParam = searchParams.get('techId');
  const navigate = useNavigate();

  useEffect(() => {
    setIsGuideLineSkeletonShow(true);
    getAssessmentGuidelines(techIdParam)
      .then(setGuidelines)
      .finally(() => setIsGuideLineSkeletonShow(false));
  }, EMPTY_ARRAY);

  useEffect(() => {
    setHideForAssess(true);
    setShowFooter(false);
  }, EMPTY_ARRAY);

  const startTest = () => {
    navigate(`${URL.START_ASSESSMENT}${location.search}`);
  };

  const handleDialogOpen = () => {
    setTermAndConditionDialogOpen(true);
  };

  const handleDialogClose = () => {
    setTermAndConditionDialogOpen(false);
  };

  const termAndCondition = useMemo(() => {
    const { terms } = getFooterFromBootstrapById();
    return terms;
  }, EMPTY_ARRAY);

  const termAndConditionUrl = `${termAndCondition.url}&output=embed`;

  return (
    <div className="container background-ffffff p-3 mt-5">
      <div className="headline-4-bold color-000000">
        {`${getSkill(+techIdParam)} ${UI.ASSESSMENT_INSTRUCTION}`}
      </div>
      {isGuideLineSkeletonShow ? (
        <CommonSkeleton />
      ) : (
        <>
          <AssessmentGuidelines guidelines={guidelines} isGuidelines />

          <div className="mt-3 card-border p-4">
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() => {
                      setStartButtonDisabled((changeValue) =>
                        changeValue ? false : true
                      );
                    }}
                  />
                }
                label={
                  <div>
                    <span className="body-1 color-000000">
                      {UI.GUIDELINE_INSTRACTION}
                    </span>

                    <span
                      className="color-1D8FF2 cursorPointer ms-1"
                      onClick={handleDialogOpen}
                    >
                      <u>{UI.TERMS_CONDITIONS}</u>
                    </span>
                  </div>
                }
              />
            </div>
            <div className="mt-4 justify-content-center d-flex">
              <Button
                size="large"
                sx={{ mr: 1 }}
                onClick={() => {
                  window.close();
                }}
              >
                {UI.CLOSE}
              </Button>

              <Button
                variant="contained"
                size="large"
                onClick={startTest}
                disabled={startButtonDisabled}
              >
                {UI.START}
              </Button>
            </div>
          </div>
        </>
      )}
      <TermAndConditionDialog
        termAndConditionDialogOpen={termAndConditionDialogOpen}
        onHandleDialogClose={handleDialogClose}
      >
        <iframe
          title={UI.TERM_AND_CONDITIONS}
          src={termAndConditionUrl}
          className={styles.term_and_condition}
        />
      </TermAndConditionDialog>
    </div>
  );
}

Guidelines.propTypes = {
  setHideForAssess: PropTypes.func,
  setShowFooter: PropTypes.func,
};
Guidelines.defaultProps = {
  setHideForAssess: noop,
  setShowFooter: noop,
};

export default Guidelines;
