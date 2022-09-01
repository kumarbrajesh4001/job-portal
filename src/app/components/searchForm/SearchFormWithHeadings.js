import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import SearchFormHeadings from './SearchFormHeadings';
import SearchForm from './SearchForm';
import { EMPTY_ARRAY } from '../../constants';

function SearchFormWithHeadings(props) {
  const {
    keywords,
    setKeywords,
    searchLocation,
    setSearchLocation,
    handleSearchFormButton,
    isHomePage,
    isEmployer,
  } = props;

  return (
    <div className="container containerColor">
      <SearchFormHeadings isEmployer={isEmployer} />
      <SearchForm
        keywords={keywords}
        setKeywords={setKeywords}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        handleSearchFormButton={handleSearchFormButton}
        isEmployer={isEmployer}
        isHomePage={isHomePage}
      />
    </div>
  );
}
SearchFormWithHeadings.propTypes = {
  keywords: PropTypes.array,
  setKeywords: PropTypes.func,
  searchLocation: PropTypes.array,
  setSearchLocation: PropTypes.func,
  handleSearchFormButton: PropTypes.func,
  isEmployer: PropTypes.bool,
  isHomePage: PropTypes.bool,
};

SearchFormWithHeadings.defaultProps = {
  keywords: EMPTY_ARRAY,
  setKeywords: noop,
  searchLocation: EMPTY_ARRAY,
  setSearchLocation: noop,
  handleSearchFormButton: noop,
  isEmployer: false,
  isHomePage: false,
};
export default SearchFormWithHeadings;
