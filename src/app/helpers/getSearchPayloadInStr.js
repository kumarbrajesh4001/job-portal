const getSearchPayloadObj = (keywords, searchLocation) => {
  const searchPayload = {};
  if (keywords?.length) {
    searchPayload.skill = keywords;
  }

  if (searchLocation?.length) {
    searchPayload.location = searchLocation;
  }

  return searchPayload;
};

const getSearchPayloadInStr = (keywords, searchLocation) => {
  const searchPayload = getSearchPayloadObj(keywords, searchLocation);

  return encodeURIComponent(JSON.stringify(searchPayload));
};
export default getSearchPayloadInStr;
