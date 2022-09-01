const getSkillPayload = (keywords, skillList) =>
  keywords?.map((keyword) => {
    let payLoad;
    const skillObj = skillList.find(
      (obj) => obj.value.toLowerCase() === keyword.skill.toLowerCase()
    );
    if (skillObj) {
      payLoad = {
        id: skillObj.id,
        name: skillObj.value,
        rating: keyword.rating,
      };
    } else {
      payLoad = {
        name: keyword.skill,
        rating: keyword.rating,
      };
    }
    return payLoad;
  });

export default getSkillPayload;
