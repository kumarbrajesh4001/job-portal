import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import { SearchFormWithHeadings } from '../../components/searchForm';
import { EMPTY_ARRAY } from '../../constants';
import RecentSearch from '../../components/recentSearch/RecentSearch';

function FindCandidates() {
  // To show chips in skill Autocomplete
  const [keywords, setKeywords] = useState(EMPTY_ARRAY);
  const [searchLocation, setSearchLocation] = useState(EMPTY_ARRAY);

  return (
    <div>
      <SearchFormWithHeadings
        keywords={keywords}
        setKeywords={setKeywords}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        isEmployer
        isHomePage
      />
      <Container>
        <div className="recentSearchContainer mt-3">
          <RecentSearch isEmployer />
        </div>
      </Container>
    </div>
  );
}
export default FindCandidates;
