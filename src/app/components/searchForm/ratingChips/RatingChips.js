import { useState, useMemo, useEffect } from 'react';

import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Chips from './Chips';

import { getRatingList } from '../../../formatter/commonBootstrap';
import {
  DEFAULT_RATING,
  DEFAULT_RATING_NAME,
  EMPTY_ARRAY,
} from '../../../constants';
import getUpdatedChipsData from './ratingChips.helper';

function RatingChips(props) {
  const { ratingId, setRatingId } = props;

  const [chipsData, setChipsData] = useState(EMPTY_ARRAY);
  const ratingList = useMemo(() => {
    const ratings = getRatingList();
    if (ratings) {
      ratings.unshift({ id: DEFAULT_RATING, value: DEFAULT_RATING_NAME });
    }
    return ratings;
  }, EMPTY_ARRAY);

  useEffect(() => {
    const updatedChips = getUpdatedChipsData(ratingId, ratingList);
    setChipsData(updatedChips);
  }, [ratingId]);

  return (
    <div>
      <span className="body-2 color-5B5B5B me-1">Skill level:</span>

      {chipsData?.map((ratingObj, index) => (
        <Chips key={index} setRatingId={setRatingId} ratingObj={ratingObj} />
      ))}
    </div>
  );
}

RatingChips.propTypes = {
  ratingId: PropTypes.number,
  setRatingId: PropTypes.func,
};

RatingChips.defaultProps = {
  ratingId: DEFAULT_RATING,
  setRatingId: noop,
};
export default RatingChips;
