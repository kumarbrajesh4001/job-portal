import getSkillPayload from './getSkillPayload';

const getSearchFormPayload = (keywords, locations, skillList) => {
  const searchSkill = getSkillPayload(keywords, skillList);
  const search = {
    skill: searchSkill?.length ? searchSkill : undefined,
    location: locations?.length ? locations : undefined,
  };
  return search;
};
export default getSearchFormPayload;
