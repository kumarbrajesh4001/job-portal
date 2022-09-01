import UI from '../../../constants/ui';

const ACTIVE_STEPS_EMPLOYER = {
  COMPANY_INFORMATION: 0,
  CONTACT_INFORMATION: 1,
  OTHER_INFORMATION: 2,
};

const STEPS_FOR_EMPLOYER_PROFILES = [
  {
    label: UI.COMPANY_DETAILS,
    required: true,
    validationFields: ['name', 'email'],
  },
  {
    label: UI.CONTACT_DETAILS,
    required: true,
    validationFields: ['contactperson', 'contactnumber', 'city'],
  },
  {
    label: UI.OTHER_DETAILS,
    required: true,
    validationFields: ['hearaboutus', 'hearothers'],
  },
];

export { STEPS_FOR_EMPLOYER_PROFILES, ACTIVE_STEPS_EMPLOYER };
