import React from 'react';
import PropTypes from 'prop-types';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useNavigate } from 'react-router-dom';
import getTotalAvailablePoints from '../../helpers/totalAvailablePoints';
import URL from '../../constants/urls';
import { EMPTY_OBJECT } from '../../constants';
import { getFormattedNumber } from '../../formatter/number';
import useMobileDevice from '../../hooks/useMobileDevice';
import UI from '../../constants/ui';

export default function AvailablePoints(props) {
  const { points } = props;
  const isMobileDevice = useMobileDevice();
  const navigate = useNavigate();

  return (
    <span
      className="cursorPointer rounded-pill p-2 d-flex align-items-center background-F3F3F3"
      onClick={() => {
        navigate(URL.PAYMENT);
      }}
    >
      <CardGiftcardIcon sx={{ color: '#F2B807' }} />
      <span className="ms-1">
        {!isMobileDevice && UI.CREDIT_POINTS}{' '}
        {getFormattedNumber(getTotalAvailablePoints(points))}
      </span>
    </span>
  );
}

AvailablePoints.propTypes = {
  points: PropTypes.object,
};
AvailablePoints.defaultProps = {
  points: EMPTY_OBJECT,
};
