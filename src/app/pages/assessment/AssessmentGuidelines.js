import React from 'react';
import PropTypes from 'prop-types';
import UI from '../../constants/ui';
import { EMPTY_ARRAY } from '../../constants';

function AssessmentGuidelines(props) {
  const { guidelines, isGuidelines } = props;

  return (
    <div className="card-border pb-2 px-3">
      {isGuidelines && (
        <div className="mt-3 pt-3 mb-2 subtitle-1-bold color-1F2830">
          {UI.GENERAL_INSTRUCTION}
        </div>
      )}

      <ul>
        {guidelines?.map((guideline, index) => (
          <li className="body-1 color-5B5B5B mt-3" key={index}>
            {guideline}
          </li>
        ))}
      </ul>
    </div>
  );
}

AssessmentGuidelines.propTypes = {
  guidelines: PropTypes.array,
  isGuidelines: PropTypes.bool,
};

AssessmentGuidelines.defaultProps = {
  guidelines: EMPTY_ARRAY,
  isGuidelines: false,
};

export default AssessmentGuidelines;
