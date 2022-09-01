function getIsItemExists(skillWithRatingList, skillWithRating) {
  const isExists = skillWithRatingList.some(
    (skillFromList) =>
      skillWithRating.name?.toLowerCase() === skillFromList.name?.toLowerCase()
  );
  return isExists;
}

export default getIsItemExists;
