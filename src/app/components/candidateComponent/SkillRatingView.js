import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_RATING, EMPTY_ARRAY } from '../../constants';
import tickImg from '../../assets/images/tick.svg';
import { getRating } from '../../formatter/commonBootstrap';
import ratingColor from '../../helpers/colorCode';
import getTopThreeSkills, {
  getMoreSkillsRating,
} from '../../helpers/topThreeSkills';
import UI from '../../constants/ui';
import MoreSkillsPopoverComponent from '../moreSkillsAndRating/MoreSkillsPopoverComponent';

/**
Canidates
Summary (Number will not visible)
Top 3 (Assessement + Skill)
(Assessement + Skill) | Rating | Blue tick

Detail
All Assessement
Assessement | Rating Blue tick | Test Date

All Skill
Complete skill view


Jobs
Summary (Number will not visible)
Skill | Rating

Detail
Skill | Rating | Experience

Component Names
CompleteSkillView
SkillRatingView (+Blue tick)
SkillRatingExpTestDateView (+Blue tick)
 */

function SkillRatingView(props) {
  const { skills, isAll } = props;

  const updatedSkills = useMemo(
    () => (isAll ? skills : getTopThreeSkills(skills)),
    [isAll, skills]
  );

  const updatedSkillsForPopover = useMemo(
    () => getMoreSkillsRating(skills),
    [skills]
  );

  return (
    <div>
      {updatedSkills.map((skillRating, index) => (
        <div className={`row ${index > 0 && 'mt-2'}`} key={index}>
          <div className="col-3">{skillRating.name}</div>

          {skillRating.rating !== DEFAULT_RATING && (
            <div className="col">
              <span className={ratingColor(skillRating.rating)}>
                {getRating(skillRating.rating)}
              </span>

              {skillRating.visibility && (
                <img src={tickImg} alt={UI.ALT_BLUETICK} className="ms-2" />
              )}
            </div>
          )}
        </div>
      ))}
      {updatedSkillsForPopover.length > 0 && (
        <MoreSkillsPopoverComponent skills={updatedSkillsForPopover} />
      )}
    </div>
  );
}

SkillRatingView.propTypes = {
  skills: PropTypes.array,
  isAll: PropTypes.bool,
};

SkillRatingView.defaultProps = {
  skills: EMPTY_ARRAY,
  isAll: false,
};

export default SkillRatingView;
