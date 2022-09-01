const getTotalAvailablePoints = (points) =>
  (points?.freepoints?.point || 0) + (points?.purchasedpoints?.point || 0);

export default getTotalAvailablePoints;
