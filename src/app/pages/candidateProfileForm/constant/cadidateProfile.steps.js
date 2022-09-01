import UI from '../../../constants/ui';

const ACTIVE_STEPS_CANDIDATE = {
  PERSONAL_INFORMATION: 0,
  JOB_DESCRIPTION: 1,
  SKILLS: 2,
  EDUCATION: 3,
  JOB_HISTORY: 4,
  BREAK: 5,
  TOOLS: 6,
  CERTIFICATIONS: 7,
  SCHOOLING: 8,
  OTHER: 9,
};

const STEP_FOR_CANDIDATE_PROFILE = [
  {
    label: UI.PERSONAL_INFORMATION,
    required: true,
    validationFields: ['name', 'email', 'mobile', 'city', 'dob', 'gender'],
  },
  {
    label: UI.DESIRED_JOBS,
    required: true,
    validationFields: [
      'joining',
      'jobtype',
      'loctype',
      'joblocations',
      'anyjoblocation',
      'expSalary',
      'salary',
      'jobexp',
    ],
  },
  { label: UI.SKILLS, required: true, validationFields: ['skills'] },
  { label: UI.EDUCATION, required: true, validationFields: ['education'] },
  { label: UI.WORK_EXPERIENCE },
  { label: UI.BREAK },
  { label: UI.TOOLS },
  { label: UI.CERTIFICATIONS },
  { label: UI.SCHOOLING },
  { label: UI.OTHER },
];
export { STEP_FOR_CANDIDATE_PROFILE, ACTIVE_STEPS_CANDIDATE };
