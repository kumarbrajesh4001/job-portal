import { EMPTY_ARRAY } from '../constants';

const storeSearchRequest = (searchRequestJSON, isEmployer) => {
  const searchSkillName =
    searchRequestJSON?.search?.skill?.map((skill) => skill.name) || EMPTY_ARRAY;
  const searchLocations =
    searchRequestJSON?.search?.location?.map(
      (location) => location.shortname
    ) || EMPTY_ARRAY;
  const skillsLocation = [...searchSkillName, ...searchLocations];
  const skillsAndLocationKey = skillsLocation.join('_');

  const candidateSearchRequests = JSON.parse(
    localStorage.getItem('candidatesSearchRequests')
  );

  const findJobSearchRequests = JSON.parse(
    localStorage.getItem('findJobsSearchRequests')
  );

  if (candidateSearchRequests) {
    const findSearchRequestIndex = candidateSearchRequests.findIndex(
      (searchRequest) => searchRequest.key === skillsAndLocationKey
    );
    if (findSearchRequestIndex > -1) {
      candidateSearchRequests.splice(findSearchRequestIndex, 1);
    }
  }

  if (findJobSearchRequests) {
    const findSearchRequestIndex = findJobSearchRequests.findIndex(
      (searchRequest) => searchRequest.key === skillsAndLocationKey
    );
    if (findSearchRequestIndex > -1) {
      findJobSearchRequests.splice(findSearchRequestIndex, 1);
    }
  }

  const recentSearchRequest = {
    key: skillsAndLocationKey,
    query: searchRequestJSON,
    timestamp: new Date(),
  };
  const updatedRecentSearchRequests =
    (isEmployer ? candidateSearchRequests : findJobSearchRequests) || [];
  updatedRecentSearchRequests.unshift(recentSearchRequest);
  if (updatedRecentSearchRequests.length > 10) {
    updatedRecentSearchRequests.pop();
  }

  if (isEmployer) {
    localStorage.setItem(
      'candidatesSearchRequests',
      JSON.stringify(updatedRecentSearchRequests)
    );
  } else {
    localStorage.setItem(
      'findJobsSearchRequests',
      JSON.stringify(updatedRecentSearchRequests)
    );
  }
};

export default storeSearchRequest;
