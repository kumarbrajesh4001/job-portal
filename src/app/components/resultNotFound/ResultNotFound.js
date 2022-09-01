import { Link } from '@mui/material';
import React from 'react';
import resultNotFound from '../../assets/images/resultNotFound.png';
import UI from '../../constants/ui';

function ResultNotFound() {
  return (
    <div className="container mt-5">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          src={resultNotFound}
          alt={UI.NO_RESULT_FOUND}
          className="img-fluid"
        />
        <h4 className="headline-4 text-center">
          {UI.NO_MATCHING_RESULT_FOUND}
        </h4>
        <Link
          component="button"
          href="/"
          underline="none"
          className="button color-1D8FF2"
          target="_blank"
        >
          {UI.CHANGE_YOUR_PREFERENCES}
        </Link>
      </div>
    </div>
  );
}
export default ResultNotFound;
