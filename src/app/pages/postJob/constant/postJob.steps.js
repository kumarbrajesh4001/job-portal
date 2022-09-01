import UI from '../../../constants/ui';

const ACTIVE_STEPS_POST_JOB = {
  JOB_DETAILS: 0,
  SKILLS_AND_EXPERIENCE: 1,
  OTHER_DETAILS: 2,
};
const STEPS_FOR_JOB_POSTS = [
  {
    label: UI.JOB_DETAILS,
    required: true,
    validationFields: [
      'description',
      'title',
      'jobtype',
      'worklocation',
      'education',
      'salary.min',
      'salary.max',
      'joblocations',
    ],
  },
  {
    label: UI.SKILLS_AND_EXPERIENCE,
    required: true,
    validationFields: ['exp', 'skills'],
  },
  { label: UI.OTHER_DETAILS },
];
export { ACTIVE_STEPS_POST_JOB, STEPS_FOR_JOB_POSTS };
