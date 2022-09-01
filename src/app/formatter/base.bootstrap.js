import keyBy from 'lodash/keyBy';
import STORAGE_KEY from '../constants/storageKey';

export const getValue = (filter, id) =>
  filter?.mapping?.find((data) => data.id === id)?.value || id;

export const getMinValue = (filter, id) =>
  filter?.mapping?.find((data) => data.id === id)?.min || id;

export const getMaxValue = (filter, id) =>
  filter?.mapping?.find((data) => data.id === id)?.max || id;

export const getId = (filter, value) =>
  filter?.mapping?.find((data) => data.value === value)?.id || value;

export const getAction = (filter, id) =>
  filter?.mapping?.find((data) => data.id === id)?.action || id;

export const getActionMapping = (filter, id) =>
  filter?.mapping?.find((data) => data.id === id);

export const getSkillById = (filter, value) =>
  filter?.mapping?.find(
    (data) => data.value.toLowerCase() === value.toLowerCase()
  )?.id || value;

export const getBootstrap = () =>
  JSON.parse(sessionStorage.getItem(STORAGE_KEY.BOOTSTRAP));

export const getFilter = (enumType) => {
  const bootstrap = getBootstrap();
  const filterByName = bootstrap?.[enumType];
  return filterByName;
};

export const getFilterByName = (enumType) => {
  const filter = getFilter(enumType);
  const filterByName = keyBy(filter, 'name');
  return filterByName;
};
