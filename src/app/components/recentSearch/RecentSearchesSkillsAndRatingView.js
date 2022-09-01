import PropTypes from 'prop-types';
import ConstructionIcon from '@mui/icons-material/Construction';
import { DEFAULT_RATING, EMPTY_ARRAY } from '../../constants';
import { getRating } from '../../formatter/commonBootstrap';
import ratingColor from '../../helpers/colorCode';
import UI from '../../constants/ui';

function RecentSearchesSkillsAndRatingView(props) {
  const { skills } = props;

  return (
    <span>
      <ConstructionIcon />
      {skills.map((skillRating, index) => (
        <span className="mt-1 mx-1" key={index}>
          <span>{skillRating.name}</span>
          {skillRating.id && (
            <>
              {' - '}
              <span className={`${ratingColor(skillRating.rating)}`}>
                {skillRating.rating === DEFAULT_RATING
                  ? UI.ANY
                  : getRating(skillRating.rating)}
              </span>
            </>
          )}
        </span>
      ))}
    </span>
  );
}

RecentSearchesSkillsAndRatingView.propTypes = {
  skills: PropTypes.array,
};

RecentSearchesSkillsAndRatingView.defaultProps = {
  skills: EMPTY_ARRAY,
};

export default RecentSearchesSkillsAndRatingView;
