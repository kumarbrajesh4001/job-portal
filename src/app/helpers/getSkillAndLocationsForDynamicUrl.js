import { DEFAULT_RATING } from '../constants';
import { getLocationObj } from './general';
import getKeywordsWithRating from './getKeywordsWithRating';

const getSkillWithRating = (skills) =>
  getKeywordsWithRating(
    skills.split('-').map((skill) => ({ name: skill, rating: DEFAULT_RATING }))
  );

const getLocations = (locations) => locations.split('-').map(getLocationObj);

// jobs/java-php -> find-jobs/java-php-jobs
// jobs/java-php-in-delhi-noida -> find-jobs/java-php-jobs-in-delhi-noida
// jobs/in-delhi-noida -> find-jobs/jobs-in-delhi-noida

// jobs/java-php -> find-candidates/java-php-jobseekers
// jobs/java-php-in-delhi-noida -> find-candidates/java-php-jobseekers-in-delhi-noida
// jobs/in-delhi-noida -> find-candidates/jobseekers-in-delhi-noida

const getKeyword = (skillsAndLocations, keywords) =>
  keywords.find((keyword) => skillsAndLocations.indexOf(keyword) > -1);

const getSkillAndLocationsForDynamicUrl = (skillsAndLocations, keywords) => {
  const keyword = getKeyword(skillsAndLocations, keywords);
  const isOnlySkillExistsIndex = skillsAndLocations.indexOf(`-${keyword}`);
  const isSkillAndLocationExistsIndex = skillsAndLocations.indexOf(
    `-${keyword}-in-`
  );
  const isOnlyLocationExistsIndex = skillsAndLocations.indexOf(
    `${keyword}-in-`
  );
  let skills;
  let locations;
  if (isSkillAndLocationExistsIndex > -1) {
    const skillsStr = skillsAndLocations.substring(
      0,
      isSkillAndLocationExistsIndex
    );
    const locationsStr = skillsAndLocations.substring(
      isSkillAndLocationExistsIndex + 5 + keyword.length
    );
    locations = getLocations(locationsStr);
    skills = getSkillWithRating(skillsStr);
  } else if (isOnlyLocationExistsIndex > -1) {
    const locationsStr = skillsAndLocations.substring(keyword.length + 4);
    locations = getLocations(locationsStr);
  } else if (isOnlySkillExistsIndex > -1) {
    const skillsStr = skillsAndLocations.substring(0, isOnlySkillExistsIndex);
    skills = getSkillWithRating(skillsStr);
  }
  return { skills, locations };
};

const JOB_KEYWORDS = ['jobs'];

export const getSkillAndLocationsForJobs = (skillsAndLocations) =>
  getSkillAndLocationsForDynamicUrl(skillsAndLocations, JOB_KEYWORDS);

const CANDIDATE_KEYWORDS = [
  'candidates',
  'jobseekers',
  'developers',
  'engineers',
];

export const getSkillAndLocationsForCandidates = (skillsAndLocations) =>
  getSkillAndLocationsForDynamicUrl(skillsAndLocations, CANDIDATE_KEYWORDS);
