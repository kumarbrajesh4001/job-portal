import ENUM_TYPE from '../constants/enumType';
import { getFilter } from './base.bootstrap';

const PROFLE_PCT_ENUM = {
  CANDIDATE: 'candidate',
  EMPLOYER: 'employer',
};

const getProfilePctEnumList = (filterType) => {
  const filterByName = getFilter(ENUM_TYPE.PROFILE_PCT)?.[filterType];
  return filterByName;
};

export const getCandidateKeyList = () =>
  getProfilePctEnumList(PROFLE_PCT_ENUM.CANDIDATE);

export const getEmployerKeyList = () =>
  getProfilePctEnumList(PROFLE_PCT_ENUM.EMPLOYER);
