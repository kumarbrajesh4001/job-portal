import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import getCandidateJobsStateList from './myJobs.helper';

import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  DEFAULT_SELECTED_PAGE,
} from '../../constants';
import CANDIDATE_JOB_STATES from '../../constants/candidateJobStates';
import { postRequest } from '../../services';
import Jobs from '../jobs';
import SubHeader from '../../components/subHeader';
import { getSkillList } from '../../formatter/commonBootstrap';
import getObjectFromStr from '../../helpers/getObjectFromStr';
import getKeywordsWithRating from '../../helpers/getKeywordsWithRating';
import searchRequestToServer, {
  removeCompanyAndSkillFromFilter,
} from '../../helpers/searchRequestToServer';
import SORT_BY from '../../constants/sortBy';
import getIdMappedToName from '../../helpers/reqFilterIdMappedToName';

function MyJobs() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const skillList = useMemo(() => getSkillList(), EMPTY_ARRAY);

  const [selectedTab, setSelectedTab] = useState(0);

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
  // 3.)Counts
  const [count, setCount] = useState();

  const updateSearchResponseCards = (updatedJobSummary) =>
    setSearchResponseCards(updatedJobSummary);

  // button id for job type
  const [candJobType, setCandJobType] = useState(CANDIDATE_JOB_STATES.MATCHING);

  const candidatesJobList = useMemo(
    () => getCandidateJobsStateList(),
    EMPTY_ARRAY
  );

  const [selectedPage, setSelectedPage] = useState(DEFAULT_SELECTED_PAGE);
  const [isSummarySkeletonShow, setIsSummarySkeletonShow] = useState(false);
  const [isModalShow, setIsModalShow] = useState();

  const requestToServer = (
    searchRequestJSON,
    page,
    sortBy,
    candidateJobType
  ) => {
    setIsSummarySkeletonShow(true);
    postRequest(
      `/search/myjobs/?page=${page}&sortby=${sortBy}&type=${candidateJobType}`,
      searchRequestJSON
    ).then((response) => {
      const {
        count: jobsCount,
        filter,
        job,
        reqfilter,
        search,
      } = response || EMPTY_OBJECT;
      setCount(jobsCount);
      setfilterFromResponse(filter);
      setSearchResponseCards(job);
      setIsSummarySkeletonShow(false);

      if (candJobType === CANDIDATE_JOB_STATES.MATCHING) {
        const idMappedToName = getIdMappedToName(reqfilter);
        setSearchRequestFilter(idMappedToName);
        const { skill, location } = search || EMPTY_OBJECT;
        const keywordsHolder = getKeywordsWithRating(skill);
        if (keywordsHolder) {
          setKeywords(keywordsHolder);
        }
        if (location) {
          setSearchLocation(location);
        }
      } else {
        navigate('');
      }
    });
  };

  useEffect(() => {
    requestToServer(
      undefined,
      DEFAULT_SELECTED_PAGE,
      SORT_BY.RELEVANCE,
      candJobType
    );
  }, [candJobType]);

  const paginationRequestToServer = (page) => {
    searchRequestToServer({
      keywords,
      locations: searchLocation,
      filter: searchRequestFilter,
      page,
      sortBy: SORT_BY.RELEVANCE,
      type: candJobType,
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
      type: candJobType,
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
      type: candJobType,
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
      type: candJobType,
      skillList,
      requestToServer,
      setSelectedPage,
      setSearchRequestFilter,
    });
  };

  useEffect(() => {
    const searchForm = searchParams.get('search');
    if (searchForm) {
      const queryData = getObjectFromStr(searchForm);
      const { skill: skills, location: locations } = queryData || EMPTY_OBJECT;

      if (skills) {
        setKeywords(skills);
      }
      if (locations) {
        setSearchLocation(locations);
      }
      handleSearchFormRequest(skills, locations);
    }
  }, [searchParams]);

  const handleChange = (event, value) => {
    const job = candidatesJobList[value];
    const jobType = job.id;
    setCandJobType(jobType);
    setSelectedTab(value);
    setSelectedPage(DEFAULT_SELECTED_PAGE);
    setKeywords(EMPTY_ARRAY);
    setSearchLocation(EMPTY_ARRAY);
    setSearchRequestFilter(EMPTY_OBJECT);
    navigate('');
    setIsModalShow(false);
  };

  return (
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={selectedTab} onChange={handleChange} centered>
          {candidatesJobList?.map((val, index) => (
            <Tab label={val.value} key={index} />
          ))}
        </Tabs>
      </Box>
      <hr />
      <SubHeader
        key={candJobType}
        keywords={keywords}
        setKeywords={setKeywords}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        searchRequestFilter={searchRequestFilter}
        setSelectedFilter={setSelectedFilter}
        filterFromResponse={filterFromResponse}
        setIsModalShow={setIsModalShow}
        count={count}
      />
      <Jobs
        selectedPage={selectedPage}
        paginationRequestToServer={paginationRequestToServer}
        sortByRequestToServer={sortByRequestToServer}
        jobsSummary={searchResponseCards}
        count={count}
        updateSearchResponseCards={updateSearchResponseCards}
        pageType={candJobType}
        isSummarySkeletonShow={isSummarySkeletonShow}
        isModalShow={isModalShow}
      />
    </div>
  );
}
export default MyJobs;
