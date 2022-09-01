import React from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import { getCandidateType } from '../../formatter/employerBootstrap';
import { getRelativeTime } from '../../formatter/date';
import DEFAULT_ACTION_STATE from './candidates.constants';
import { getDateWRTPage, getLastEmpStateId } from './candidates.helper';
import { EMPTY_OBJECT } from '../../constants';
import PAGE_TYPE from '../../constants/pageType';
import TypeStatusAndTime from '../../components/typeStatusAndTime';

function CandidatesTypeStatusAndTime(props) {
  const { candidate, pageType } = props;

  return (
    <div className="d-flex justify-content-between">
      {getDateWRTPage(candidate, pageType)}

      <TypeStatusAndTime
        condition={DEFAULT_ACTION_STATE !== getLastEmpStateId(candidate)}
        label={getCandidateType(getLastEmpStateId(candidate))}
        value={getRelativeTime(last(candidate?.empstate)?.date)}
      />
    </div>
  );
}

CandidatesTypeStatusAndTime.propTypes = {
  candidate: PropTypes.object,
  pageType: PropTypes.number,
};
CandidatesTypeStatusAndTime.defaultProps = {
  candidate: EMPTY_OBJECT,
  pageType: PAGE_TYPE.DEFAULT_PAGE,
};

export default CandidatesTypeStatusAndTime;
