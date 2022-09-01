import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { useSearchParams, useParams } from 'react-router-dom';

import { postRequest } from '../../services';
import storeSearchRequest from '../../helpers/recentSearchRequests';
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  DEFAULT_SELECTED_PAGE,
} from '../../constants';
import SubHeader from '../../components/subHeader';
import Jobs from '../jobs';
import JOB_TYPE from '../../constants/jobType';
import { getSkillList } from '../../formatter/commonBootstrap';
import getObjectFromStr from '../../helpers/getObjectFromStr';
import getKeywordsWithRating from '../../helpers/getKeywordsWithRating';
import searchRequestToServer, {
  removeCompanyAndSkillFromFilter,
} from '../../helpers/searchRequestToServer';
import SORT_BY from '../../constants/sortBy';
import isStringEmpty from '../../helpers/isStringEmpty';
import { getSkillAndLocationsForJobs } from '../../helpers/getSkillAndLocationsForDynamicUrl';

function FindJobsSearches(props) {
  const { setLoggedInUserRole } = props;
  const [searchParams] = useSearchParams();
  const { skillsAndLocations } = useParams();

  const skillList = useMemo(() => getSkillList(), EMPTY_ARRAY);

  const [keywords, setKeywords] = useState(EMPTY_ARRAY);

  // searchRequestJSON
  // 1.)Search Form
  const [searchLocation, setSearchLocation] = useState(EMPTY_ARRAY);
  // 2.)Filter
  const [searchRequestFilter, setSearchRequestFilter] = useState(EMPTY_OBJECT);

  // Search Response
  // 1.)Filter
  const [filterFromResponse, setfilterFromResponse] = useState(EMPTY_OBJECT);
  // 2.)Cards
  const [searchResponseCards, setSearchResponseCards] = useState(EMPTY_ARRAY);
  // 3.)Count
  const [count, setCount] = useState();

  const [selectedPage, setSelectedPage] = useState(DEFAULT_SELECTED_PAGE);

  const [isSummarySkeletonShow, setIsSummarySkeletonShow] = useState(false);
  const [isModalShow, setIsModalShow] = useState();

  const requestToServer = (searchRequestJSON, page, sortBy) => {
    setIsSummarySkeletonShow(true);
    storeSearchRequest(searchRequestJSON, false);
    postRequest(
      `/search/job?page=${page}&sortby=${sortBy}`,
      searchRequestJSON
    ).then((response) => {
      setCount(response.count);
      setfilterFromResponse(response.filter);
      setSearchResponseCards(response.job);
      setIsSummarySkeletonShow(false);
    });
  };

  const paginationRequestToServer = (page) => {
    searchRequestToServer({
      keywords,
      locations: searchLocation,
      filter: searchRequestFilter,
      page,
      sortBy: SORT_BY.RELEVANCE,
      skillList,
      requestToServer,
      setSelectedPage,
      setSearchRequestFilter,
    });
  };

  const sortByRequestToServer = (sortBy) => {
    searchRequestToServer({
      keywords,
      locations: searchLocation,
      filter: searchRequestFilter,
      page: DEFAULT_SELECTED_PAGE,
      sortBy,
      skillList,
      requestToServer,
      setSelectedPage,
      setSearchRequestFilter,
    });
  };

  const handleSearchFormRequest = (skills, locations) => {
    searchRequestToServer({
      keywords: skills,
      locations,
      filter: removeCompanyAndSkillFromFilter(searchRequestFilter),
      page: DEFAULT_SELECTED_PAGE,
      sortBy: SORT_BY.RELEVANCE,
      skillList,
      requestToServer,
      setSelectedPage,
      setSearchRequestFilter,
    });
  };

  const handleRecentSearchRequest = (skills, locations, filter) => {
    searchRequestToServer({
      keywords: skills,
      locations,
      filter,
      page: DEFAULT_SELECTED_PAGE,
      sortBy: SORT_BY.RELEVANCE,
      skillList,
      requestToServer,
      setSelectedPage,
      setSearchRequestFilter,
    });
  };

  const setSelectedFilter = (filterPayload) => {
    searchRequestToServer({
      keywords,
      locations: searchLocation,
      filter: filterPayload,
      page: DEFAULT_SELECTED_PAGE,
      sortBy: SORT_BY.RELEVANCE,
      skillList,
      requestToServer,
      setSelectedPage,
      setSearchRequestFilter,
    });
  };

  useEffect(() => {
    const recentSearches = searchParams.get('recentSearches');
    const searchForm = searchParams.get('search');
    if (recentSearches) {
      const queryData = getObjectFromStr(recentSearches);
      const { search, filter } = queryData || EMPTY_OBJECT;
      const { skill: skills, location: locations } = search || EMPTY_OBJECT;
      let keywordsWithRating = EMPTY_ARRAY;
      if (skills) {
        keywordsWithRating = getKeywordsWithRating(skills);
        setKeywords(keywordsWithRating);
      }
      if (locations) {
        setSearchLocation(locations);
      }
      handleRecentSearchRequest(keywordsWithRating, locations, filter);
    } else if (!isStringEmpty(searchForm)) {
      const queryData = getObjectFromStr(searchForm);
      const { skill: skills, location: locations } = queryData || EMPTY_OBJECT;

      setKeywords(skills);
      setSearchLocation(locations);
      handleSearchFormRequest(skills, locations);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isStringEmpty(skillsAndLocations)) {
      const { skills, locations } =
        getSkillAndLocationsForJobs(skillsAndLocations);
      setKeywords(skills);
      setSearchLocation(locations);
      handleSearchFormRequest(skills, locations);
    }
  }, [skillsAndLocations]);

  return (
    <div>
      <SubHeader
        keywords={keywords}
        setKeywords={setKeywords}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        searchRequestFilter={searchRequestFilter}
        setSelectedFilter={setSelectedFilter}
        filterFromResponse={filterFromResponse}
        count={count}
        setIsModalShow={setIsModalShow}
      />
      <Jobs
        selectedPage={selectedPage}
        paginationRequestToServer={paginationRequestToServer}
        sortByRequestToServer={sortByRequestToServer}
        jobsSummary={searchResponseCards}
        updateSearchResponseCards={setSearchResponseCards}
        count={count}
        pageType={JOB_TYPE.NEW}
        isSummarySkeletonShow={isSummarySkeletonShow}
        isModalShow={isModalShow}
        setLoggedInUserRole={setLoggedInUserRole}
      />
    </div>
  );
}

FindJobsSearches.propTypes = {
  setLoggedInUserRole: PropTypes.func,
};
FindJobsSearches.defaultProps = {
  setLoggedInUserRole: noop,
};

export default FindJobsSearches;
