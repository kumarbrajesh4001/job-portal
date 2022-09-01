import ENUM_TYPE from '../constants/enumType';
import {
  getId,
  getValue,
  getMinValue,
  getMaxValue,
  getAction,
  getFilterByName,
  getActionMapping,
} from './base.bootstrap';

const EMPLOYER_ENUM = {
  JOB_TYPE: 'jobtype',
  PROFILE_UPDATED: 'profileupdated',
  SALARY: 'salary',
  WORK_LOCATION: 'worklocation',
  SHIFT: 'shift',
  JOB_STATE: 'jobstate',
  HEAR_ABOUT_US: 'hearaboutus',
  CANDIDATE_TYPE: 'candidatetype',
};

const getAllFilterEnum = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.EMPLOYER_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getValue(filter, id);
};

const getAllFilterEnumForActionMapping = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.EMPLOYER_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getActionMapping(filter, id);
};

const getAllEnumList = (filterType) => {
  const filterByName = getFilterByName(ENUM_TYPE.EMPLOYER_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return filter?.mapping;
};

const getMinFilterEnum = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.EMPLOYER_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getMinValue(filter, id);
};

const getMaxFilterEnum = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.EMPLOYER_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getMaxValue(filter, id);
};

const getAllFilterEnumForAction = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.EMPLOYER_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getAction(filter, id);
};

export const getJobType = (id) => getAllFilterEnum(EMPLOYER_ENUM.JOB_TYPE, id);
export const getProfileUpdated = (id) =>
  getAllFilterEnum(EMPLOYER_ENUM.PROFILE_UPDATED, id);
export const getSalary = (id) => getAllFilterEnum(EMPLOYER_ENUM.SALARY, id);
export const getMinSalary = (id) => getMinFilterEnum(EMPLOYER_ENUM.SALARY, id);
export const getMaxSalary = (id) => getMaxFilterEnum(EMPLOYER_ENUM.SALARY, id);
export const getWorkLocation = (id) =>
  getAllFilterEnum(EMPLOYER_ENUM.WORK_LOCATION, id);
export const getShift = (id) => getAllFilterEnum(EMPLOYER_ENUM.SHIFT, id);
export const getJobState = (id) =>
  getAllFilterEnum(EMPLOYER_ENUM.JOB_STATE, id);

export const getJobStateActions = (id) =>
  getAllFilterEnumForAction(EMPLOYER_ENUM.JOB_STATE, id);

export const getJobTypeList = () => getAllEnumList(EMPLOYER_ENUM.JOB_TYPE);
export const getProfileUpdatedList = () =>
  getAllEnumList(EMPLOYER_ENUM.PROFILE_UPDATED);
export const getSalaryList = () => getAllEnumList(EMPLOYER_ENUM.SALARY);
export const getWorkLocationList = () =>
  getAllEnumList(EMPLOYER_ENUM.WORK_LOCATION);
export const getShiftList = () => getAllEnumList(EMPLOYER_ENUM.SHIFT);
export const getHearAboutSizeList = () =>
  getAllEnumList(EMPLOYER_ENUM.HEAR_ABOUT_US);

export const getCandidateTypeList = () =>
  getAllEnumList(EMPLOYER_ENUM.CANDIDATE_TYPE);

export const getEmpFilterField = (filterType) => {
  // As per requirement we have to use different role enum against to logged user
  let filterByName = getFilterByName(ENUM_TYPE.CANDIDATE_ENUM_MAPPING);
  let filter = filterByName?.[filterType];
  if (!filter) {
    filterByName = getFilterByName(ENUM_TYPE.COMMON_ENUM_MAPPING);
    filter = filterByName?.[filterType];
  }
  return filter;
};

const getFilterIdEnum = (filterType, value) => {
  const filterByName = getFilterByName(ENUM_TYPE.EMPLOYER_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getId(filter, value);
};

export const getJobStateId = (name) =>
  getFilterIdEnum(ALL_ENUM.JOB_STATE, name);

export const getCandidateType = (id) =>
  getAllFilterEnum(EMPLOYER_ENUM.CANDIDATE_TYPE, id);

export const getCandidateTypeAction = (id) =>
  getAllFilterEnumForAction(EMPLOYER_ENUM.CANDIDATE_TYPE, id);

export const getCandidateTypeActionMapping = (id) =>
  getAllFilterEnumForActionMapping(EMPLOYER_ENUM.CANDIDATE_TYPE, id);
