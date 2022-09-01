import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import IconButton from '@mui/material/IconButton';
import Filter from '../filter';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';

import { SearchForm } from '../searchForm';
import Content from '../content';

import SelectedFilters from './SelectedFilters';
import styles from './subHeader.module.css';
import { getSkillList } from '../../formatter/commonBootstrap';
import getSearchFormWithFilterPayload from '../../helpers/getSearchFormWithFilterPayload';
import { API_URL } from '../../constants/apiUrls';
import JOB_TYPE from '../../constants/jobType';
import CANDIDATE_TYPE from '../../constants/candidateType';
import UI from '../../constants/ui';
import { postRequest } from '../../services';

function SubHeader(props) {
  const {
    keywords,
    setKeywords,
    searchLocation,
    setSearchLocation,
    searchRequestFilter,
    setSelectedFilter,
    filterFromResponse,
    count,
    isEmployer,
    setIsModalShow,
  } = props;

  const [isSearchFormShow, setIsSearchFormShow] = useState();
  const [reserveKeywords, setReserveKeywords] = useState();
  const [reserveLocation, setReserveLocation] = useState();

  const skillList = useMemo(() => getSkillList(), EMPTY_ARRAY);

  useEffect(() => {
    setReserveKeywords(keywords);
    setReserveLocation(searchLocation);
  }, [isSearchFormShow]);

  const toggleSearchFormByIcon = () => {
    setKeywords(reserveKeywords);
    setSearchLocation(reserveLocation);
    setIsSearchFormShow(!isSearchFormShow);
    setIsModalShow(false);
  };

  const updateMatchingCount = (
    filterPayload,
    setMatchingCount,
    setIsButtonDisable
  ) => {
    const searchRequestJSON = getSearchFormWithFilterPayload({
      keywords,
      locations: searchLocation,
      filter: filterPayload,
      skillList,
    });
    setIsButtonDisable(true);
    const url = isEmployer
      ? `${API_URL.CANDIDATE_COUNT}?type=${CANDIDATE_TYPE.MATCHING}&key=abc`
      : `${API_URL.JOB_COUNT}?type=${JOB_TYPE.MATCHING}&key=abc`;

    postRequest(url, searchRequestJSON).then((response) => {
      setMatchingCount(response.count);
      setIsButtonDisable(false);
    });
  };

  return (
    <div>
      <div className={`container-fluid ${styles.subHeader}`}>
        <div className="container">
          <div className="row">
            <Content condition={!isSearchFormShow}>
              <div className="d-flex mt-2">
                <div className="mt-2 subtitle-2 color-1F2830 text-nowrap">
                  {UI.SHOWING_RESULT_FOR} :
                </div>

                <div className="mt-1">
                  {keywords.map((value, i) => (
                    <Chip
                      label={value.displayName}
                      size="small"
                      className="mx-1 subtitle-2-bold color-1F2830"
                      key={i}
                    />
                  ))}
                  {searchLocation.map((location, index) => (
                    <Chip
                      label={location.shortname}
                      size="small"
                      className="mx-1 subtitle-2-bold color-1F2830"
                      key={index}
                    />
                  ))}
                </div>
                <div>
                  <Button
                    component="span"
                    className={`mt-1 ms-3 ${styles.buttonText}`}
                    endIcon={<ModeEditOutlineOutlinedIcon />}
                    onClick={() => {
                      setIsSearchFormShow(!isSearchFormShow);
                      setIsModalShow(true);
                    }}
                  >
                    {UI.CHANGE}
                  </Button>
                </div>
              </div>
            </Content>
            <Content condition={isSearchFormShow}>
              <div className="d-flex justify-content-between mt-2">
                <SearchForm
                  keywords={keywords}
                  setKeywords={setKeywords}
                  searchLocation={searchLocation}
                  setSearchLocation={setSearchLocation}
                  setIsSearchFormShow={setIsSearchFormShow}
                  setIsModalShow={setIsModalShow}
                  isEmployer={isEmployer}
                />

                <div className="d-flex align-items-center">
                  <IconButton className="mt-4" onClick={toggleSearchFormByIcon}>
                    <CancelOutlinedIcon />
                  </IconButton>
                </div>
              </div>
            </Content>
          </div>

          <div className="row">
            <div className="mb-2 d-flex">
              <Content condition={!isSearchFormShow}>
                <div className="mt-2">
                  <Filter
                    setSelectedFilter={setSelectedFilter}
                    filterFromResponse={filterFromResponse}
                    searchRequestFilter={searchRequestFilter}
                    count={count}
                    isEmployer={isEmployer}
                    updateMatchingCount={updateMatchingCount}
                  />
                </div>
                <SelectedFilters
                  searchRequestFilter={searchRequestFilter}
                  isEmployer={isEmployer}
                />
              </Content>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
}
SubHeader.propTypes = {
  keywords: PropTypes.array,
  setKeywords: PropTypes.func,
  searchLocation: PropTypes.array,
  setSearchLocation: PropTypes.func,
  searchRequestFilter: PropTypes.object,
  setSelectedFilter: PropTypes.func,
  filterFromResponse: PropTypes.object,
  count: PropTypes.number,
  isEmployer: PropTypes.bool,
  setIsModalShow: PropTypes.func,
};

SubHeader.defaultProps = {
  keywords: EMPTY_ARRAY,
  setKeywords: noop,
  searchLocation: EMPTY_ARRAY,
  setSearchLocation: noop,
  searchRequestFilter: EMPTY_OBJECT,
  setSelectedFilter: noop,
  filterFromResponse: EMPTY_OBJECT,
  count: 0,
  isEmployer: false,
  setIsModalShow: noop,
};
export default SubHeader;
