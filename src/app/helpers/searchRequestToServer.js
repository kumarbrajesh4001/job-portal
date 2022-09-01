import { DEFAULT_SKILL_NAME } from '../components/filter/filter.bootstrapMapper.constant';
import { DEFAULT_COMPANY_NAME } from '../constants/filter.constant';
import getSearchFormWithFilterPayload from './getSearchFormWithFilterPayload';

const searchRequestToServer = ({
  keywords,
  locations,
  filter,
  page,
  sortBy,
  type,
  skillList,
  requestToServer,
  setSelectedPage,
  setSearchRequestFilter,
}) => {
  const searchRequestJSON = getSearchFormWithFilterPayload({
    keywords,
    locations,
    filter,
    skillList,
  });
  requestToServer(searchRequestJSON, page, sortBy, type);
  setSelectedPage(page);
  setSearchRequestFilter(filter);
};

export default searchRequestToServer;

export const removeCompanyAndSkillFromFilter = (filter) => {
  const filterCopy = { ...filter };
  delete filterCopy[DEFAULT_COMPANY_NAME];
  delete filterCopy[DEFAULT_SKILL_NAME];
  return filterCopy;
};
