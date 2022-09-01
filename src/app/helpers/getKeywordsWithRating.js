import compact from 'lodash/compact';
import { DEFAULT_RATING, DEFAULT_RATING_NAME } from '../constants';
import { getRating } from '../formatter/commonBootstrap';

const getRatingDisplay = (skill) => {
  if (skill.id) {
    if (skill.rating === DEFAULT_RATING) {
      return DEFAULT_RATING_NAME;
    }
    return getRating(skill.rating);
  }
  return undefined;
};

const getDisplaySkillName = (skill) => {
  const ratingDisplay = getRatingDisplay(skill);
  const displayName = compact([skill.name, ratingDisplay]).join(' - ');
  return displayName;
};

const getKeywordsWithRating = (skills) =>
  skills?.map((skill) => {
    const displayName = getDisplaySkillName(skill);
    return { skill: skill.name, rating: skill.rating, displayName };
  });

export default getKeywordsWithRating;
