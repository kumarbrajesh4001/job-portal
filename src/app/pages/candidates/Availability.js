import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_OBJECT } from '../../constants';
import { getJoiningDate } from '../../formatter/commonBootstrap';
import Content from '../../components/content';
import UI from '../../constants/ui';

function Availability(props) {
  const { candidate } = props;

  return (
    <Content condition={candidate?.joining}>
      <span className="availability color-5B5B5B border-radius">
        {UI.AVAILABILITY} - {getJoiningDate(candidate.joining)}
      </span>
    </Content>
  );
}

Availability.propTypes = {
  candidate: PropTypes.object,
};
Availability.defaultProps = {
  candidate: EMPTY_OBJECT,
};

export default Availability;
