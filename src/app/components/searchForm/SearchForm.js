import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import RatingChips from './ratingChips';
import KeywordsAutocomplete from './KeywordsAutocomplete';

import GeoAutoLocation from '../geoLocation';
import ErrorSnackBar from '../snackBar/ErrorSnackBar';
import { EMPTY_ARRAY, DEFAULT_RATING } from '../../constants';

import styles from './searchForm.module.css';
import Content from '../content';
import { navigateWithQuery } from './searchForm.helper';
import useMobileDevice from '../../hooks/useMobileDevice';
import UI from '../../constants/ui';

function SearchForm(props) {
  const {
    keywords,
    setKeywords,
    searchLocation,
    setSearchLocation,
    setIsSearchFormShow,
    setIsModalShow,
    isEmployer,
    isHomePage,
  } = props;

  // To have data of ratings of select field
  const [ratingId, setRatingId] = useState(DEFAULT_RATING);
  const [searchFormRequired, setSearchFormRequired] = useState(false);
  const navigate = useNavigate();
  const isMobileDevice = useMobileDevice();

  const [opensnackbar, setSnackbarOpen] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen({ setopen: false });
  };

  const handleSearch = (keywordsContainer, locations) => {
    if (keywordsContainer.length !== 0 || locations.length !== 0) {
      setIsSearchFormShow(false);
      setSearchFormRequired(false);
      setIsModalShow(false);
      navigateWithQuery(
        keywordsContainer,
        locations,
        navigate,
        isEmployer,
        isHomePage
      );
    } else {
      setSearchFormRequired(true);
    }
  };

  const onEnterInGeoAutoLocation = (locations) => {
    handleSearch(keywords, locations);
  };

  const onEnterInKeywordsAutocomplete = (keywordsContainer) => {
    handleSearch(keywordsContainer, searchLocation);
  };

  const handleSearchButton = () => {
    handleSearch(keywords, searchLocation);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <RatingChips ratingId={ratingId} setRatingId={setRatingId} />
      </div>
      <div className="row">
        <div className={`mt-2 me-3 col-12 col-md-7 ${styles.searchFormField}`}>
          <div className="row">
            <div className="col-md-12 col-12 mt-2 pe-3">
              <div className={`${styles.fieldHeading} color-5B5B5B`}>What</div>
              <KeywordsAutocomplete
                keywords={keywords}
                setKeywords={setKeywords}
                ratingId={ratingId}
                setSnackbarOpen={setSnackbarOpen}
                onEnterInKeywordsAutocomplete={onEnterInKeywordsAutocomplete}
                isEmployer={isEmployer}
              />
            </div>
          </div>
        </div>

        <div className={`mt-2 col-md-3 col-12 ${styles.searchFormField}`}>
          <div className="mt-2">
            <div className={`${styles.fieldHeading} color-5B5B5B`}>Where</div>
            <GeoAutoLocation
              locations={searchLocation}
              setLocations={setSearchLocation}
              inputId="searchLocation"
              onEnterInGeoAutoLocation={onEnterInGeoAutoLocation}
              setSnackbarOpen={setSnackbarOpen}
              isMulti
              isSearchForm
            />
          </div>
        </div>
        <div className="col-md-1 col-12 mt-2 ">
          <Button
            fullWidth={isMobileDevice}
            variant="contained"
            className={` rounded-pill ${
              isMobileDevice
                ? styles.searchFormButtonMobile
                : styles.searchFormButton
            }`}
            onClick={handleSearchButton}
            sx={{ fontSize: '24px' }}
          >
            <SearchSharpIcon fontSize="large" />
            {isMobileDevice && UI.SEARCH}
          </Button>
        </div>
      </div>
      <Content condition={searchFormRequired}>
        <div className="row">
          <div className="mt-2 mandatory">
            To find the {isEmployer ? 'candidates' : 'jobs'}, You have to enter
            Skill or Location, at least one.
          </div>
        </div>
      </Content>
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}

SearchForm.propTypes = {
  keywords: PropTypes.array,
  setKeywords: PropTypes.func,
  searchLocation: PropTypes.array,
  setSearchLocation: PropTypes.func,
  setIsSearchFormShow: PropTypes.func,
  setIsModalShow: PropTypes.func,
  isEmployer: PropTypes.bool,
  isHomePage: PropTypes.bool,
};

SearchForm.defaultProps = {
  keywords: EMPTY_ARRAY,
  setKeywords: noop,
  searchLocation: EMPTY_ARRAY,
  setSearchLocation: noop,
  setIsSearchFormShow: noop,
  setIsModalShow: noop,
  isEmployer: false,
  isHomePage: false,
};

export default SearchForm;
