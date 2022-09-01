import isEqual from 'lodash/isEqual';
import isSearchFormFieldEmpty from './isSearchFormFieldEmpty';
import getSearchFormPayload from './getSearchFormPayload';
import { EMPTY_OBJECT } from '../constants';

const getSearchRequestJSON = ({ keywords, locations, filter, skillList }) => {
  let search = getSearchFormPayload(keywords, locations, skillList);

  if (isSearchFormFieldEmpty(search)) {
    search = undefined;
  }
  let filterData = filter;
  if (isEqual(filterData, EMPTY_OBJECT)) {
    filterData = undefined;
  }
  let searchRequestJSON;
  if (search !== undefined || filterData !== undefined) {
    searchRequestJSON = {
      search,
      filter: filterData,
    };
  }
  return searchRequestJSON;
};

export default getSearchRequestJSON;
