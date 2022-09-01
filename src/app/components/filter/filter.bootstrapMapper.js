import { getCandFilterField } from '../../formatter/candidateBootstrap';
import { getEmpFilterField } from '../../formatter/employerBootstrap';
import {
  DEFAULT_COMPANY_NAME,
  DEFAULT_COMPANY_DISPLAY_NAME,
} from '../../constants/filter.constant';
import {
  DEFAULT_SKILL_NAME,
  DEFAULT_SKILL_DISPLAY_NAME,
} from './filter.bootstrapMapper.constant';
import getFilterStaticFields from './filter.helper';
import { EMPTY_ARRAY } from '../../constants';

const isFilterItemPresent = (requestFilterItems, name) =>
  requestFilterItems.some((filterItem) => filterItem.name === name);

const getIsChecked = (filterItem, searchRequestFilter, filterKey) => {
  const requestFilterItems = searchRequestFilter[filterKey];
  if (requestFilterItems) {
    return isFilterItemPresent(requestFilterItems, filterItem.name);
  }
  return false;
};

const addIsCheckedKeyInFilterField = (
  mappedFilterField,
  searchRequestFilter,
  filterKey
) =>
  mappedFilterField
    .filter((filterItem) => filterItem)
    .map((filterItem) => ({
      ...filterItem,
      isChecked: getIsChecked(filterItem, searchRequestFilter, filterKey),
    }));

const getMappedField = (
  mappedFilterField,
  filterDisplayName,
  filterKey,
  searchRequestFilter
) => ({
  list: addIsCheckedKeyInFilterField(
    mappedFilterField,
    searchRequestFilter,
    filterKey
  ),
  displayName: filterDisplayName,
  name: filterKey,
});

const getDynamicMapped = (dynamicFilters) =>
  dynamicFilters
    .map((dynamicFilter) => {
      if (dynamicFilter.name) {
        return dynamicFilter;
      }
      return undefined;
    })
    .filter((filter) => filter);

const getMappedFilterWithBootstrap = (
  filterFieldFromBootstrap,
  filterFieldFromResponse
) =>
  filterFieldFromBootstrap.mapping.map((boostrapFilterField) => {
    const filterEnum = filterFieldFromResponse?.find(
      (mappingEnumObj) => mappingEnumObj.id === boostrapFilterField.id
    );
    return {
      name: boostrapFilterField.value,
      id: boostrapFilterField.id,
      count: filterEnum?.count || 0,
    };
  });

const getMappedStaticFilterWithBootstrap = (
  filterFromResponse,
  searchRequestFilter,
  isEmployer
) =>
  getFilterStaticFields(filterFromResponse).map((field) => {
    const filterFieldFromBootstrap = isEmployer
      ? getEmpFilterField(field)
      : getCandFilterField(field);
    const mappedFilterField = getMappedFilterWithBootstrap(
      filterFieldFromBootstrap,
      filterFromResponse[field]
    );
    return getMappedField(
      mappedFilterField,
      filterFieldFromBootstrap.displayName,
      filterFieldFromBootstrap.name,
      searchRequestFilter
    );
  });

const getBootstrapMapper = (
  filterFromResponse,
  searchRequestFilter,
  isEmployer
) => {
  let mappedFilter = EMPTY_ARRAY;
  if (filterFromResponse[DEFAULT_SKILL_NAME]) {
    const mappedSkillWithBootstrap = getDynamicMapped(
      filterFromResponse[DEFAULT_SKILL_NAME]
    );

    const mappedField = getMappedField(
      mappedSkillWithBootstrap,
      DEFAULT_SKILL_DISPLAY_NAME,
      DEFAULT_SKILL_NAME,
      searchRequestFilter
    );

    mappedFilter = [mappedField];
  }
  if (filterFromResponse[DEFAULT_COMPANY_NAME]) {
    const filterCompanies = getDynamicMapped(
      filterFromResponse[DEFAULT_COMPANY_NAME]
    );

    const mappedField = getMappedField(
      filterCompanies,
      DEFAULT_COMPANY_DISPLAY_NAME,
      DEFAULT_COMPANY_NAME,
      searchRequestFilter
    );

    mappedFilter = [...mappedFilter, mappedField];
  }
  const staticFilters = getMappedStaticFilterWithBootstrap(
    filterFromResponse,
    searchRequestFilter,
    isEmployer
  );
  return [...mappedFilter, ...staticFilters];
};

export default getBootstrapMapper;
