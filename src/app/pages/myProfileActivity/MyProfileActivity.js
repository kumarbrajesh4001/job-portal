import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TABS from './myProfileActivity.constant';
import CANDIDATE_JOB_STATES from '../../constants/candidateJobStates';
import { getRequest } from '../../services';
import Content from '../../components/content';
import Jobs from '../jobs';
import {
  EMPTY_ARRAY,
  DEFAULT_SELECTED_PAGE,
  DEFAULT_COUNT,
} from '../../constants';
import Employers from '../employers';
import JOB_TYPE from '../../constants/jobType';
import SORT_BY from '../../constants/sortBy';

const tabs = [
  { value: TABS.MATCHING_JOBS, id: CANDIDATE_JOB_STATES.AUTO_APPLIED },
  { value: TABS.APPLIED_JOBS, id: CANDIDATE_JOB_STATES.APPLIED },
];

function MyProfileActivity() {
  // Search Response
  // 1.)Cards
  const [jobsSummary, setJobsSummary] = useState(EMPTY_ARRAY);
  const [employerSummary, setEmployerSummary] = useState(EMPTY_ARRAY);
  // 2.)Counts
  const [count, setCount] = useState();

  const [pageType, setPageType] = useState(CANDIDATE_JOB_STATES.AUTO_APPLIED);

  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedPage, setSelectedPage] = useState(DEFAULT_SELECTED_PAGE);
  const [isSummarySkeletonShow, setIsSummarySkeletonShow] = useState(true);

  const requestToServer = (
    requestPageType,
    page = DEFAULT_SELECTED_PAGE,
    sortBy = SORT_BY.RELEVANCE
  ) => {
    setIsSummarySkeletonShow(true);
    setCount(DEFAULT_COUNT);
    setJobsSummary(EMPTY_ARRAY);
    setEmployerSummary(EMPTY_ARRAY);
    setSelectedPage(DEFAULT_SELECTED_PAGE);

    getRequest(
      `/search/profileactivity/?page=${page}&sortby=${sortBy}&type=${requestPageType}`
    ).then((response) => {
      if (requestPageType === CANDIDATE_JOB_STATES.APPLIED) {
        setJobsSummary(response?.job);
      } else {
        setEmployerSummary(response?.employer);
      }
      setCount(response.count);
      setIsSummarySkeletonShow(false);
    });
  };

  const paginationRequestToServer = (page) => {
    requestToServer(pageType, page, SORT_BY.RELEVANCE);
    setSelectedPage(page);
  };

  const sortByRequestToServer = (sortBy) => {
    requestToServer(pageType, DEFAULT_SELECTED_PAGE, sortBy);
  };

  useEffect(() => {
    requestToServer(pageType, selectedPage, SORT_BY.RELEVANCE);
  }, EMPTY_ARRAY);

  const handleChange = (event, value) => {
    const activeTab = tabs[value];
    const tabPageType = activeTab.id;
    setPageType(tabPageType);
    setSelectedTab(value);
    requestToServer(tabPageType, DEFAULT_SELECTED_PAGE, SORT_BY.RELEVANCE);
  };
  return (
    <>
      <div className="mt-3 mb-3">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={selectedTab} onChange={handleChange} centered>
            {tabs.map((val, index) => (
              <Tab label={val.value} key={index} />
            ))}
          </Tabs>
        </Box>
        <hr />
      </div>
      <div>
        <Content condition={pageType === CANDIDATE_JOB_STATES.APPLIED}>
          <Jobs
            selectedPage={selectedPage}
            paginationRequestToServer={paginationRequestToServer}
            sortByRequestToServer={sortByRequestToServer}
            jobsSummary={jobsSummary}
            count={count}
            updateSearchResponseCards={setJobsSummary}
            isSummarySkeletonShow={isSummarySkeletonShow}
            pageType={JOB_TYPE.APPLIED}
            isMyProfileActivity
          />
        </Content>

        <Content condition={pageType === CANDIDATE_JOB_STATES.AUTO_APPLIED}>
          <Employers
            selectedPage={selectedPage}
            paginationRequestToServer={paginationRequestToServer}
            sortByRequestToServer={sortByRequestToServer}
            employerSummary={employerSummary}
            updateSearchResponseCards={setEmployerSummary}
            count={count}
            isSummarySkeletonShow={isSummarySkeletonShow}
          />
        </Content>
      </div>
    </>
  );
}
export default MyProfileActivity;
