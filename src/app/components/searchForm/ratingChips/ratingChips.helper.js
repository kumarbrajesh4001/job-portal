const getUpdatedChipsData = (ratingId, ratingList) =>
  ratingList?.map((ratingObj) => {
    if (ratingId === ratingObj.id) {
      return { ...ratingObj, selectedRatingId: ratingId };
    }
    return { ...ratingObj, selectedRatingId: undefined };
  });
export default getUpdatedChipsData;
