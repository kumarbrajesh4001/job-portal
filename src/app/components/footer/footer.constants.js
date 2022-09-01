import UI from '../../constants/ui';
import URL from '../../constants/urls';

const CANDIDATE_COLUMN = [
  { id: 'find_job', label: UI.FIND_JOB, url: URL.FIND_JOBS, isSamePage: true },
];

export const CANDIDATE_FOOTER = [
  {
    heading: UI.JOB_SEEKER,
    columns: [
      ...CANDIDATE_COLUMN,
      {
        id: 'assessment',
        label: UI.ASSESSMENT,
        url: URL.ASSESSMENT,
        isSamePage: true,
      },
    ],
  },
];

const EMPLOYER_COLUMN = [
  {
    id: 'find_candidate',
    label: UI.FIND_TALENT,
    url: URL.FIND_CANDIDATES,
    isSamePage: true,
  },
];

export const EMPLOYER_FOOTER = [
  {
    heading: UI.EMPLOYER,
    columns: EMPLOYER_COLUMN,
  },
];

export const PUBLIC_FOOTER = [
  {
    heading: UI.JOB_SEEKER,
    columns: [
      ...CANDIDATE_COLUMN,
      {
        id: 'register',
        label: UI.REGISTER,
        url: URL.REGISTER,
        isSamePage: true,
      },
    ],
  },
  {
    heading: UI.EMPLOYER,
    columns: [
      ...EMPLOYER_COLUMN,
      {
        id: 'register',
        label: UI.REGISTER,
        url: URL.REGISTER,
        isSamePage: true,
      },
    ],
  },
];
