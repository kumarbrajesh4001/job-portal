import { DEFAULT_RATING, DEFAULT_RATING_NAME } from '../constants';
import ENUM_TYPE from '../constants/enumType';
import { getValue, getFilterByName } from './base.bootstrap';

const COMMON_ENUM = {
  EDUCATION: 'education',
  EXP: 'exp',
  RATING: 'rating',
  ASSESSMENT_CATEGORY: 'assessmentcategory',
  ASSESSMENT_STATE: 'assessmentstate',
  JOINING_DATE: 'joiningdate',
  SKILL: 'skill',
  ROLE: 'role',
  WHERE_USED: 'whereused',
  SM_TYPE: 'smtype',
  GENDER: 'gender',
  CANDIDATE_TYPE: 'candidatetype',
  COMPANY_SIZE: 'companysize',
  ENGINEER_SIZE: 'engineersize',
  COMPANY_STAGE: 'companystage',
  FUNDING_SIZE: 'fundingsize',
  PAY_BENEFIT: 'paybenefit',
  OTHER_BENEFIT: 'otherbenefit',
  SCHOOL_CLASS: 'schoolclass',
  TRANSACTION_TYPE: 'transactiontype',
};

const getCommonFilterEnum = (filterType, id) => {
  const filterByName = getFilterByName(ENUM_TYPE.COMMON_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getValue(filter, id);
};

const getCommonEnumList = (filterType) => {
  const filterByName = getFilterByName(ENUM_TYPE.COMMON_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return filter?.mapping;
};

export const getGender = (id) => getCommonFilterEnum(COMMON_ENUM.GENDER, id);

export const getEducation = (id) =>
  getCommonFilterEnum(COMMON_ENUM.EDUCATION, id);

export const getAssessmentState = (id) =>
  getCommonFilterEnum(COMMON_ENUM.ASSESSMENT_STATE, id);

export const getClass = (id) =>
  getCommonFilterEnum(COMMON_ENUM.SCHOOL_CLASS, id);
export const getExperience = (id) => getCommonFilterEnum(COMMON_ENUM.EXP, id);

export const getRating = (id) =>
  id === DEFAULT_RATING
    ? DEFAULT_RATING_NAME
    : getCommonFilterEnum(COMMON_ENUM.RATING, id);

export const getTransactionType = (id) =>
  getCommonFilterEnum(COMMON_ENUM.TRANSACTION_TYPE, id);

export const getAssessmentCategory = (id) =>
  getCommonFilterEnum(COMMON_ENUM.ASSESSMENT_CATEGORY, id);

export const getJoiningDate = (id) =>
  getCommonFilterEnum(COMMON_ENUM.JOINING_DATE, id);
export const getSkill = (id) => getCommonFilterEnum(COMMON_ENUM.SKILL, id);
export const getWhereUsed = (id) =>
  getCommonFilterEnum(COMMON_ENUM.WHERE_USED, id);
export const getPayBenifit = (id) =>
  getCommonFilterEnum(COMMON_ENUM.PAY_BENEFIT, id);
export const getOtherBenifit = (id) =>
  getCommonFilterEnum(COMMON_ENUM.OTHER_BENEFIT, id);
export const getCompanySize = (id) =>
  getCommonFilterEnum(COMMON_ENUM.COMPANY_SIZE, id);
export const getCompanyStage = (id) =>
  getCommonFilterEnum(COMMON_ENUM.COMPANY_STAGE, id);
export const getEngineerSize = (id) =>
  getCommonFilterEnum(COMMON_ENUM.ENGINEER_SIZE, id);
export const getFunding = (id) =>
  getCommonFilterEnum(COMMON_ENUM.FUNDING_SIZE, id);
export const getRole = (id) => getCommonFilterEnum(COMMON_ENUM.ROLE, id);

export const getEducationList = () => getCommonEnumList(COMMON_ENUM.EDUCATION);
export const getExperienceList = () => getCommonEnumList(COMMON_ENUM.EXP);

export const getRatingList = () => getCommonEnumList(COMMON_ENUM.RATING);

export const getAssessmentCategoryList = () =>
  getCommonEnumList(COMMON_ENUM.ASSESSMENT_CATEGORY);

export const getAssessmentStateList = () =>
  getCommonEnumList(COMMON_ENUM.ASSESSMENT_STATE);

export const getJoiningDateList = () =>
  getCommonEnumList(COMMON_ENUM.JOINING_DATE);
export const getSkillList = () => getCommonEnumList(COMMON_ENUM.SKILL);
export const getSchoolClassList = () =>
  getCommonEnumList(COMMON_ENUM.SCHOOL_CLASS);
export const getWhereUsedtList = () =>
  getCommonEnumList(COMMON_ENUM.WHERE_USED);
export const getGenderList = () => getCommonEnumList(COMMON_ENUM.GENDER);
export const getPayBenifitList = () =>
  getCommonEnumList(COMMON_ENUM.PAY_BENEFIT);
export const getOtherBenifitList = () =>
  getCommonEnumList(COMMON_ENUM.OTHER_BENEFIT);
export const getCompanySizeList = () =>
  getCommonEnumList(COMMON_ENUM.COMPANY_SIZE);
export const getEngineerSizeList = () =>
  getCommonEnumList(COMMON_ENUM.ENGINEER_SIZE);
export const getCompanyStageList = () =>
  getCommonEnumList(COMMON_ENUM.COMPANY_STAGE);
export const getFundingSizeList = () =>
  getCommonEnumList(COMMON_ENUM.FUNDING_SIZE);
export const getRoleList = () => getCommonEnumList(COMMON_ENUM.ROLE);

const getCommonFilterIdEnum = (filterType, name) => {
  const filterByName = getFilterByName(ENUM_TYPE.COMMON_ENUM_MAPPING);
  const filter = filterByName?.[filterType];
  return getSkillById(filter, name);
};

export const getSkillId = (name) =>
  getCommonFilterIdEnum(COMMON_ENUM.SKILL, name);
