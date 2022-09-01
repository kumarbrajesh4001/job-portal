import uniqBy from 'lodash/uniqBy';
import drop from 'lodash/drop';

const isSkillExist = (skills, skill) =>
  skills.some((skillObj) => skillObj.id === skill.id);

export const getMoreSkillsRating = (skills) => {
  const uniqueSkills = uniqBy(skills, 'id');
  const ignoreSkills = drop(uniqueSkills, 3);
  return ignoreSkills;
};

const getTopThreeSkills = (skills) =>
  skills.reduce((allSkills, skill) => {
    if (allSkills.length < 3 && !isSkillExist(allSkills, skill)) {
      allSkills.push(skill);
    }
    return allSkills;
  }, []);

export default getTopThreeSkills;
