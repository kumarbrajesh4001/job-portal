import React from 'react';
import PropTypes from 'prop-types';
import { BsDot } from 'react-icons/bs';
import Content from '../../components/content';
import { getJobType } from '../../formatter/candidateBootstrap';
import { JOB_TYPE_ANY } from './candidates.constants';
import { EMPTY_OBJECT } from '../../constants';

function JobType(props) {
  const { candidate } = props;

  return (
    <Content condition={candidate?.jobtype !== JOB_TYPE_ANY}>
      <span className="availability color-5B5B5B border-radius">
        {getJobType(candidate?.jobtype)}
        <BsDot className="mx-1" />
      </span>
    </Content>
  );
}

JobType.propTypes = {
  candidate: PropTypes.object,
};
JobType.defaultProps = {
  candidate: EMPTY_OBJECT,
};

export default JobType;
