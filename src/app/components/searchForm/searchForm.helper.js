import getSearchResultUrl from '../../helpers/getSearchResultUrl';
import getSearchPayloadInStr from '../../helpers/getSearchPayloadInStr';
import { getRating } from '../../formatter/commonBootstrap';
import { getSkill } from '../../helpers/skillId';

export const getUpdatedSkillNames = (keywords, inputValue) => {
  const skillNames = keywords.map((keyword) => keyword.skill);
  let skillNamesWithNewSkill;
  if (inputValue) {
    skillNamesWithNewSkill = [...skillNames, inputValue];
  } else {
    skillNamesWithNewSkill = [...skillNames];
  }
  return skillNamesWithNewSkill;
};

export const navigateWithQuery = (
  keywords,
  searchLocation,
  navigate,
  isEmployer,
  isHomePage
) => {
  const searchQuery = `?search=${getSearchPayloadInStr(
    keywords,
    searchLocation
  )}`;
  const navigateTO = isHomePage ? getSearchResultUrl(isEmployer) : '';
  navigate(`${navigateTO}${searchQuery}`);
};

export const getIsSameSkill = (keywords, skill) => {
  const skillName = skill?.techId
    ? skill.dispName.toLowerCase()
    : skill?.toLowerCase();
  return keywords.some((keyword) => keyword.skill.toLowerCase() === skillName);
};

const getDisplayName = (skill, ratingId) => {
  const displayRating = getRating(ratingId);

  if (skill.techId) {
    return `${skill?.dispName} - ${displayRating}`;
  }

  // Check if Skill exists in Bootstrap API, if yes then get skillName from Bootstrap
  const skillDetail = getSkill(skill);
  if (skillDetail && skillDetail.id) {
    const formattedSkillName = skillDetail.value;
    return `${formattedSkillName} - ${displayRating}`;
  }
  return skill;
};

export const getSkillObject = (skill, ratingId) => ({
  skill: skill.techId ? skill.dispName : skill,
  rating: ratingId,
  displayName: getDisplayName(skill, ratingId),
});
