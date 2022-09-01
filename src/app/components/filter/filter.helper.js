import without from 'lodash/without';
import { DEFAULT_COMPANY_NAME } from '../../constants/filter.constant';
import { DEFAULT_SKILL_NAME } from './filter.bootstrapMapper.constant';

const getFilterStaticFields = (filterFromResponse) =>
  without(
    Object.keys(filterFromResponse),
    DEFAULT_COMPANY_NAME,
    DEFAULT_SKILL_NAME
  );

export default getFilterStaticFields;
