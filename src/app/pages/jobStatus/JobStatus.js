import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Candidates from '../candidates';
import { postRequest } from '../../services';
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  DEFAULT_SELECTED_PAGE,
} from '../../constants';
import {
  getCandidatesTypeList,
  getJobData,
  getRedirectUrl,
} from './jobStatus.helper';
import { getSkillList } from '../../formatter/commonBootstrap';
import CANDIDATE_TYPE from '../../constants/candidateType';
import SubHeader from '../../components/subHeader';
import PAGE_TYPE from '../../constants/pageType';
import getObjectFromStr from '../../helpers/getObjectFromStr';
import searchRequestToServer, {
  removeCompanyAndSkillFromFilter,
} from '../../helpers/searchRequestToServer';
import SORT_BY from '../../constants/sortBy';
import UI from '../../constants/ui';
import getIdMappedToName from '../../helpers/reqFilterIdMappedToName';
import getKeywordsWithRating from '../../helpers/getKeywordsWithRating';

function JobStatus() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState();
  const [selectedTab, setSelectedTab] = useState(0);

  const [keywords, setKeywords] = useState(EMPTY_ARRAY);

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

  const [candidateType, setCandidateType] = useState(
    Number(searchParams.get('candidateType'))
  );

  const jobId = useMemo(() => searchParams.get('jobId'), EMPTY_ARRAY);

  const skillList = useMemo(() => getSkillList(), EMPTY_ARRAY);

  const candidatesTypeList = useMemo(
    () => getCandidatesTypeList(),
    EMPTY_ARRAY
  );

  const requestToServer = (payload, page, sortBy, candType) => {
    setIsSummarySkeletonShow(true);
    const url = `/search/jobcandidates?jobid=${jobId}&page=${page}&sortby=${sortBy}&type=${candType}`;
    postRequest(url, payload).then((response) => {
      const {
        count: candidateCount,
        filter,
        candidate,
        search,
        reqfilter,
      } = response || EMPTY_OBJECT;
      setCount(candidateCount);
      setfilterFromResponse(filter);
      setSearchResponseCards(candidate);
      setIsSummarySkeletonShow(false);

      if (candidateType === CANDIDATE_TYPE.MATCHING) {
        const idMappedToName = getIdMappedToName(reqfilter, true);
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
        navigate(getRedirectUrl(jobId, candidateType));
      }
    });
  };

  useEffect(() => {
    requestToServer(
      undefined,
      DEFAULT_SELECTED_PAGE,
      SORT_BY.RELEVANCE,
      candidateType
    );
  }, [candidateType]);

  const paginationRequestToServer = (page) => {
    searchRequestToServer({
      keywords,
      locations: searchLocation,
      filter: searchRequestFilter,
      page,
      sortBy: SORT_BY.RELEVANCE,
      type: candidateType,
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
      type: candidateType,
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
      type: candidateType,
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
      type: candidateType,
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
    const cand = candidatesTypeList[value];
    const candType = cand.id;
    setCandidateType(candType);
    setSelectedTab(value);
    setSelectedPage(DEFAULT_SELECTED_PAGE);
    setKeywords(EMPTY_ARRAY);
    setSearchLocation(EMPTY_ARRAY);
    setSearchRequestFilter(EMPTY_OBJECT);
    navigate(getRedirectUrl(jobId, candType));
    setIsModalShow(false);
  };

  useEffect(() => {
    getJobData(jobId, setJobTitle);
    const activeTab = candidatesTypeList.findIndex(
      (item) => item.id === candidateType
    );
    setSelectedTab(activeTab);
  }, EMPTY_ARRAY);

  return (
    <div>
      <div className="bg-white">
        <h2 className="mt-3 mb-3" style={{ textAlign: 'center' }}>
          {UI.CANDIDATES_FOR_JOB} : {jobTitle}
        </h2>

        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={selectedTab} onChange={handleChange} centered>
            {candidatesTypeList.map((val, index) => (
              <Tab label={val.value} key={index} />
            ))}
          </Tabs>
        </Box>
      </div>
      <SubHeader
        key={candidateType}
        keywords={keywords}
        setKeywords={setKeywords}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        searchRequestFilter={searchRequestFilter}
        setSelectedFilter={setSelectedFilter}
        filterFromResponse={filterFromResponse}
        setSearchRequestFilter={setSearchRequestFilter}
        pageType={PAGE_TYPE.NOT_ON_HOME}
        setIsModalShow={setIsModalShow}
        count={count}
        isEmployer
      />

      <Candidates
        selectedPage={selectedPage}
        paginationRequestToServer={paginationRequestToServer}
        sortByRequestToServer={sortByRequestToServer}
        candidatesSummary={searchResponseCards}
        updateSearchResponseCards={setSearchResponseCards}
        count={count}
        pageType={CANDIDATE_TYPE.NEW}
        isSummarySkeletonShow={isSummarySkeletonShow}
        isModalShow={isModalShow}
        isEmployer
      />
    </div>
  );
}
export default JobStatus;
