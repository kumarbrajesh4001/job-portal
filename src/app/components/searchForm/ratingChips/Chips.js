import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Chip from '@mui/material/Chip';

import { EMPTY_OBJECT } from '../../../constants';
import { CHIPS_COLOR, CHIPS_VARIANT } from './ratingChips.constant';

function Chips(props) {
  const { setRatingId, ratingObj } = props;
  const [color, setColor] = useState(CHIPS_COLOR.DEFAULT);
  const [variant, setVariant] = useState(CHIPS_VARIANT.OUTLINED);

  useEffect(() => {
    if (ratingObj.id === ratingObj.selectedRatingId) {
      setColor(CHIPS_COLOR.PRIMARY);
      setVariant(CHIPS_VARIANT.FILLED);
    } else {
      setColor(CHIPS_COLOR.DEFAULT);
      setVariant(CHIPS_VARIANT.OUTLINED);
    }
  }, [ratingObj]);

  const hadleClick = useCallback(() => {
    setRatingId(ratingObj.id);
  }, [ratingObj]);

  return (
    <Chip
      size="small"
      variant={variant}
      label={ratingObj.value}
      className="mx-1 my-1"
      color={color}
      onClick={hadleClick}
    />
  );
}

Chips.propTypes = {
  setRatingId: PropTypes.func,
  ratingObj: PropTypes.object,
};

Chips.defaultProps = {
  setRatingId: noop,
  ratingObj: EMPTY_OBJECT,
};
export default Chips;
