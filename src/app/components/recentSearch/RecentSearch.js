/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import noop from 'lodash/noop';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import URL from '../../constants/urls';
import { getRelativeTime } from '../../formatter/date';
import { postRequest } from '../../services';
import CANDIDATE_TYPE from '../../constants/candidateType';
import JOB_TYPE from '../../constants/jobType';
import Content from '../content';

import getSearchResultUrl from '../../helpers/getSearchResultUrl';
import UI from '../../constants/ui';
import RecentSearchesSkillsAndRatingView from './RecentSearchesSkillsAndRatingView';
import useMobileDevice from '../../hooks/useMobileDevice';
import TypeStatusAndTime from '../typeStatusAndTime';

function RecentSearch(props) {
  const { isEmployer, updateQueryParams } = props;
  const [recentSearches, setRecentSearches] = useState(EMPTY_ARRAY);
  const [isRecentSearchVisible, setIsRecentSearchVisible] = useState(false);
  const isMobileDevice = useMobileDevice();
  const navigate = useNavigate();

  let syncRecentSearches = EMPTY_ARRAY;
  const setRecentSearchesState = (value) => {
    setRecentSearches(value);
    syncRecentSearches = value;
  };

  const getMatchingData = (key, payload, index) => {
    const url = isEmployer
      ? `/search/candidatecount?type=${CANDIDATE_TYPE.MATCHING}&key=${key}`
      : `/search/jobcount?type=${JOB_TYPE.MATCHING}&key=${key}`;
    postRequest(url, payload).then((response) => {
      const recentSearchesHolder = [...syncRecentSearches];
      const recentSearch = syncRecentSearches[index];
      recentSearchesHolder.splice(index, 1, {
        ...recentSearch,
        count: response.count,
      });
      setRecentSearchesState([...recentSearchesHolder]);
    });
  };

  useEffect(() => {
    if (isEmployer) {
      const candidateSearchRequests = JSON.parse(
        localStorage.getItem('candidatesSearchRequests')
      );
      if (candidateSearchRequests) {
        candidateSearchRequests.length === 0
          ? setIsRecentSearchVisible(false)
          : setIsRecentSearchVisible(true);
        setRecentSearchesState(candidateSearchRequests);
      }
    } else {
      const findJobsSearchRequests = JSON.parse(
        localStorage.getItem('findJobsSearchRequests')
      );
      if (findJobsSearchRequests) {
        findJobsSearchRequests.length === 0
          ? setIsRecentSearchVisible(false)
          : setIsRecentSearchVisible(true);
        setRecentSearchesState(findJobsSearchRequests);
      }
    }
    syncRecentSearches.forEach((obj, index) => {
      getMatchingData(obj?.key, obj?.query, index);
    });
  }, EMPTY_ARRAY);

  const deleteSearchResult = (id) => {
    const updateRecentSearches = recentSearches?.filter(
      (SearchRequest) => SearchRequest.key !== id
    );
    setRecentSearches(updateRecentSearches);

    isEmployer
      ? localStorage.setItem(
          'candidatesSearchRequests',
          JSON.stringify(updateRecentSearches)
        )
      : localStorage.setItem(
          'findJobsSearchRequests',
          JSON.stringify(updateRecentSearches)
        );
  };

  const redirectToSearch = (e) => {
    const recentSearchKey = e.target.id;
    const dataForQueryParams = recentSearches?.find(
      (SearchRequest) => SearchRequest.key === recentSearchKey
    );
    updateQueryParams(dataForQueryParams);
    navigate(
      `${getSearchResultUrl(isEmployer)}` +
        `?recentSearches=${encodeURIComponent(
          JSON.stringify(dataForQueryParams?.query)
        )}`
    );
  };

  return (
    <Content condition={isRecentSearchVisible && recentSearches?.length > 0}>
      <Tabs value={0} textColor="primary" centered>
        <Tab
          label={
            <span className="headline-6 color-2D2D2D ">
              {UI.RECENT_SEARCHES}
            </span>
          }
        />
      </Tabs>

      {recentSearches?.map((searchData, index) => {
        const { skill: searchSkill, location: searchLocation } =
          searchData?.query?.search || EMPTY_OBJECT;

        return (
          <div
            className="card-border mb-3 p-2"
            style={{ width: isMobileDevice ? '100%' : '55%' }}
            key={index}
          >
            <div className="row pt-2 px-2">
              <Content condition={searchSkill?.length}>
                <div className={`${searchLocation ? 'col-5' : 'col-10'}`}>
                  <RecentSearchesSkillsAndRatingView skills={searchSkill} />
                </div>
              </Content>
              <Content condition={searchLocation?.length}>
                <div className={`${searchSkill ? 'col-5' : 'col-10'}`}>
                  <LocationOnIcon />
                  {searchLocation?.map((value, ind) => (
                    <span key={ind}>
                      {value.shortname}
                      {searchLocation.length - 1 > ind ? ', ' : ''}
                    </span>
                  ))}
                </div>
              </Content>
              <div className="col-2 d-inline-flex justify-content-end">
                <IconButton onClick={() => deleteSearchResult(searchData.key)}>
                  <DeleteIcon />
                </IconButton>

                {isEmployer && (
                  <IconButton
                    onClick={() => {
                      const path = `${
                        URL.POST_JOB
                      }?recentSearch=${JSON.stringify(
                        searchData?.query.search
                      )}`;
                      navigate(path);
                    }}
                  >
                    <MailIcon />
                  </IconButton>
                )}
              </div>
            </div>
            <div className="d-flex align-items-center pt-2 justify-content-between">
              <Button
                size="small"
                onClick={redirectToSearch}
                id={searchData.key}
              >
                {UI.MATCHING} : {searchData?.count || 0}
              </Button>

              <TypeStatusAndTime
                condition={searchData?.timestamp}
                value={getRelativeTime(searchData?.timestamp)}
              />
            </div>
          </div>
        );
      })}
    </Content>
  );
}
RecentSearch.propTypes = {
  isEmployer: PropTypes.bool,
  updateQueryParams: PropTypes.func,
};
RecentSearch.defaultProps = {
  isEmployer: false,
  updateQueryParams: noop,
};

export default RecentSearch;
