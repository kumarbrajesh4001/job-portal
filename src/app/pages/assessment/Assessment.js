import React from 'react';

import CompleteAssessment from './CompleteAssessment';
import AvailableAssessment from './AvailableAssessment';

function Assessment() {
  return (
    <div className="container my-1">
      <CompleteAssessment />
      <AvailableAssessment />
    </div>
  );
}

export default Assessment;
