/* eslint-disable react/prop-types */
import { useMemo } from 'react';

import PropTypes from 'prop-types';
import { DEFAULT_RATING, EMPTY_ARRAY } from '../../constants';
import { getExperience, getRating } from '../../formatter/commonBootstrap';
import ratingColor from '../../helpers/colorCode';
import tickImg from '../../assets/images/tick.svg';
import UI from '../../constants/ui';
import getTopThreeSkills from '../../helpers/topThreeSkills';
import ComponentListView from '../componentListView';
import { getRelativeTime } from '../../formatter/date';

function SkillsAndRating(props) {
  const { item: skillRating } = props;
  return (
    <div className="row skillView">
      <div className="col-3 col-md-4">{skillRating.name}</div>

      {skillRating.rating !== DEFAULT_RATING && (
        <div className="col">
          <span className={`${ratingColor(skillRating.rating)}`}>
            {getRating(skillRating.rating)}
          </span>

          {skillRating.visibility && (
            <img src={tickImg} alt={UI.ALT_BLUETICK} className="ms-2" />
          )}
        </div>
      )}
      {skillRating.testlmd && (
        <div className="col">{getRelativeTime(skillRating.testlmd)}</div>
      )}
      {skillRating.exp && (
        <div className="col">{getExperience(skillRating.exp)}</div>
      )}
    </div>
  );
}
function SkillsAndRatingView(props) {
  const { skills, isAll } = props;

  const updatedSkills = useMemo(
    () => (isAll ? skills : getTopThreeSkills(skills)),
    [isAll, skills]
  );
  return (
    <div>
      <ComponentListView items={updatedSkills} component={SkillsAndRating} />
    </div>
  );
}

SkillsAndRatingView.propTypes = {
  skills: PropTypes.array,
  isAll: PropTypes.bool,
};

SkillsAndRatingView.defaultProps = {
  skills: EMPTY_ARRAY,
  isAll: false,
};

export default SkillsAndRatingView;
