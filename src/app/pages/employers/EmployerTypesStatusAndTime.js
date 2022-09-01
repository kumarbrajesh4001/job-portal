import React from 'react';
import PropTypes from 'prop-types';
import CANDIDATE_TYPE from '../../constants/candidateType';
import { getCandidateType } from '../../formatter/candidateBootstrap';
import { getRelativeTime } from '../../formatter/date';
import {
  getLastCandOrEmpStateId,
  getLastCandStateDate,
} from './employers.helper';
import { EMPTY_OBJECT } from '../../constants';
import TypeStatusAndTime from '../../components/typeStatusAndTime';

function EmployerTypesStatusAndTime(props) {
  const { employer } = props;

  return (
    <div className="d-flex justify-content-between">
      <TypeStatusAndTime
        condition={getLastCandOrEmpStateId(employer) !== CANDIDATE_TYPE.NEW}
        label={getCandidateType(getLastCandOrEmpStateId(employer))}
        value={getRelativeTime(getLastCandStateDate(employer))}
      />
    </div>
  );
}

EmployerTypesStatusAndTime.propTypes = {
  employer: PropTypes.object,
};

EmployerTypesStatusAndTime.defaultProps = {
  employer: EMPTY_OBJECT,
};

export default EmployerTypesStatusAndTime;
