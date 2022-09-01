import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  DEFAULT_SELECTED_PAGE,
} from '../../constants';
import { postRequest } from '../../services';
import CANDIDATE_TYPE from '../../constants/candidateType';
import Content from '../../components/content';
import Candidates from '../candidates';
import { getSkillList } from '../../formatter/commonBootstrap';
import SubHeader from '../../components/subHeader';
import {
  getCandidatesTypeList,
  getCandidateTypeForUnlocked,
} from './myCandidates.helper';
import getObjectFromStr from '../../helpers/getObjectFromStr';
import searchRequestToServer, {
  removeCompanyAndSkillFromFilter,
} from '../../helpers/searchRequestToServer';
import SORT_BY from '../../constants/sortBy';

function MyCandidates() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const skillList = useMemo(() => getSkillList(), EMPTY_ARRAY);

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
  // 3.)Counts
  const [count, setCount] = useState();

  // button id for candidate type
  const [candidateType, setCandidateType] = useState(CANDIDATE_TYPE.UNLOCK);
  const [selectedPage, setSelectedPage] = useState(DEFAULT_SELECTED_PAGE);
  const [isSummarySkeletonShow, setIsSummarySkeletonShow] = useState(false);
  const [isModalShow, setIsModalShow] = useState();

  const [selectedCategory, setSelectedCategory] = useState(
    CANDIDATE_TYPE.UNLOCK
  );

  const candidatesTypeList = useMemo(
    () => getCandidatesTypeList(),
    EMPTY_ARRAY
  );

  const requestToServer = (searchRequestJSON, page, sortBy, candType) => {
    setIsSummarySkeletonShow(true);
    postRequest(
      `/search/globalcandidates/?page=${page}&sortby=${sortBy}&type=${candType}`,
      searchRequestJSON
    ).then((response) => {
      setCount(response.count);
      setfilterFromResponse(response.filter);
      setSearchResponseCards(response.candidate);
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
    requestToServer(undefined, selectedPage, SORT_BY.RELEVANCE, candidateType);
  }, EMPTY_ARRAY);

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

  const handleChange = (_, value) => {
    const cand = candidatesTypeList[value];
    setSelectedPage(DEFAULT_SELECTED_PAGE);
    const candType = cand.id;
    setSelectedCategory(CANDIDATE_TYPE.UNLOCK);

    setKeywords(EMPTY_ARRAY);
    setSearchLocation(EMPTY_ARRAY);
    setSearchRequestFilter();
    navigate('');
    requestToServer(
      undefined,
      DEFAULT_SELECTED_PAGE,
      SORT_BY.RELEVANCE,
      candType
    );
    setCandidateType(candType);
    setSelectedTab(value);
    setIsModalShow(false);
  };

  const unlockedSelect = (id) => {
    setSelectedCategory(id);
    setSearchResponseCards(EMPTY_ARRAY);
    setSelectedPage(DEFAULT_SELECTED_PAGE);
    requestToServer(undefined, DEFAULT_SELECTED_PAGE, SORT_BY.RELEVANCE, id);
  };

  return (
    <div>
      <div className="mt-3 mb-3">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={selectedTab} onChange={handleChange} centered>
            {candidatesTypeList.map((val, index) => (
              <Tab label={val.value} key={index} />
            ))}
          </Tabs>
        </Box>
        <hr />
      </div>
      <Content condition={candidateType !== CANDIDATE_TYPE.UNLOCK}>
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
          setIsModalShow={setIsModalShow}
          count={count}
        />
      </Content>

      <Content condition={candidateType === CANDIDATE_TYPE.UNLOCK}>
        <div className="d-flex justify-content-center px-2">
          <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
            {getCandidateTypeForUnlocked()?.map((item, index) => (
              <Chip
                className="m-1"
                label={item.value}
                variant={item.id === selectedCategory ? undefined : 'outlined'}
                color={item.id === selectedCategory ? 'primary' : undefined}
                onClick={() => unlockedSelect(item.id)}
                key={index}
              />
            ))}
          </Stack>
        </div>
      </Content>
      <Candidates
        selectedPage={selectedPage}
        paginationRequestToServer={paginationRequestToServer}
        sortByRequestToServer={sortByRequestToServer}
        candidatesSummary={searchResponseCards}
        count={count}
        updateSearchResponseCards={setSearchResponseCards}
        pageType={candidateType}
        isSummarySkeletonShow={isSummarySkeletonShow}
        isModalShow={isModalShow}
      />
    </div>
  );
}
export default MyCandidates;
