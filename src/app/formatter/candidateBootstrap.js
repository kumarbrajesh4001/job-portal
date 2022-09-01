import ENUM_TYPE from '../constants/enumType';
import {
  getValue,
  getMinValue,
  getMaxValue,
  getId,
  getAction,
  getFilterByName,
  getActionMapping,
} from './base.bootstrap';

const CANDIDATE_ENUM = {
  JOB_TYPE: 'jobtype',
  DATE_POSTED: 'dateposted',
  SALARY: 'salary',
  WORK_LOCATION: 'worklocation',
  SHIFT: 'shift',
  CAND_JOB_STATE: 'candjobstate',
  CANDIDATE_STATE: 'candidatestate',
  CANDIDATE_TYPE: 'candidatetype',
};

const getAllFilterEnum = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.CANDIDATE_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getValue(filter, id);
};

const getAllFilterEnumForActionMapping = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.CANDIDATE_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getActionMapping(filter, id);
};

const getFilterIdEnum = (filterType, value) => {
  const filterByName = getFilterByName(ENUM_TYPE.CANDIDATE_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getId(filter, value);
};

const getAllEnumList = (filterType) => {
  const filterByName = getFilterByName(ENUM_TYPE.CANDIDATE_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return filter?.mapping;
};

const getAllFilterEnumForAction = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.CANDIDATE_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getAction(filter, id);
};

const getMinFilterEnum = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.CANDIDATE_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getMinValue(filter, id);
};

const getMaxFilterEnum = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.CANDIDATE_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getMaxValue(filter, id);
};

export const getJobType = (id) => getAllFilterEnum(CANDIDATE_ENUM.JOB_TYPE, id);
export const getDatePosted = (id) =>
  getAllFilterEnum(CANDIDATE_ENUM.DATE_POSTED, id);
export const getSalary = (id) => getAllFilterEnum(CANDIDATE_ENUM.SALARY, id);
export const getMinSalary = (id) => getMinFilterEnum(CANDIDATE_ENUM.SALARY, id);
export const getMaxSalary = (id) => getMaxFilterEnum(CANDIDATE_ENUM.SALARY, id);
export const getWorkLocation = (id) =>
  getAllFilterEnum(CANDIDATE_ENUM.WORK_LOCATION, id);
export const getShift = (id) => getAllFilterEnum(CANDIDATE_ENUM.SHIFT, id);

export const getCandidateJobState = (id) =>
  getAllFilterEnum(CANDIDATE_ENUM.CAND_JOB_STATE, id);

export const getCandidateJobStateAction = (id) =>
  getAllFilterEnumForAction(CANDIDATE_ENUM.CAND_JOB_STATE, id);

export const getJobTypeList = () => getAllEnumList(CANDIDATE_ENUM.JOB_TYPE);
export const getDatePostedList = () =>
  getAllEnumList(CANDIDATE_ENUM.DATE_POSTED);
export const getSalaryList = () => getAllEnumList(CANDIDATE_ENUM.SALARY);
export const getWorkLocationList = () =>
  getAllEnumList(CANDIDATE_ENUM.WORK_LOCATION);
export const getCandidateStateList = () =>
  getAllEnumList(CANDIDATE_ENUM.CANDIDATE_STATE);
export const getShiftList = () => getAllEnumList(CANDIDATE_ENUM.SHIFT);
export const getCandidateJobStateList = () =>
  getAllEnumList(CANDIDATE_ENUM.CAND_JOB_STATE);

export const getJobStateId = (name) =>
  getFilterIdEnum(CANDIDATE_ENUM.JOB_STATE, name);

export const getCandFilterField = (filterType) => {
  // As per requirement we have to use different role enum against to logged user
  let filterByName = getFilterByName(ENUM_TYPE.EMPLOYER_ENUM_MAPPING);
  let filter = filterByName?.[filterType];
  if (!filter) {
    filterByName = getFilterByName(ENUM_TYPE.COMMON_ENUM_MAPPING);
    filter = filterByName?.[filterType];
  }
  return filter;
};

export const getCandidateType = (id) =>
  getAllFilterEnum(CANDIDATE_ENUM.CANDIDATE_TYPE, id);

export const getCandidateTypeAction = (id) =>
  getAllFilterEnumForAction(CANDIDATE_ENUM.CANDIDATE_TYPE, id);

export const getCandidateTypeActionMapping = (id) =>
  getAllFilterEnumForActionMapping(CANDIDATE_ENUM.CANDIDATE_TYPE, id);
