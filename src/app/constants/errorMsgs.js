const ERROR_MESSAGE = {
  MIN_ERROR_MSG: 'Minimum characters required: ', // 'Minimum characters allowed limit is: ',
  MIN_SHOULD_MSG: 'Minimum value required: ',
  MIN_VALUE_MSG: 'Minimum value allowed: ',
  MAX_ERROR_MSG: 'Maximum number of characters allowed: ', // 'Maximum characters allowed limit is: ',
  MAX_AMOUNT_ERROR_MSG: 'You can enter an amount upto: ', // 'You can enter an amount upto 2147483647: ',
  MAX_VALUE_MSG: 'Maximum value allowed: ',
  MAX_INPUT_VALUE_MSG:
    'The input has exceeded the maximum number of characters: ',
  MAX_SALARY_MSG: 'Maximum salary limit is: ',
  MAX_PCT_MSG: 'Maximum percentage allowed: ',
  REQ_ERROR_MSG: 'This field is mandatory',
  EMAIL_VALIDATION: 'Please enter a valid email ID including @',
  VALID_EMAIL: 'Please enter a valid email ID',
  MULTIPLE_VALUES_MESSAGE: 'Use comma (,) to separate multiple values', // "Add multiple use ',' to separate",
  SKILL_PLACEHOLDER: 'Enter a skill',
  NAME_VALIDATION_MESSAGE: 'Please use letters only',
  DUPLICATE_SKILL_ERROR_MESSAGE: 'Skill already entered',
  DUPLICATE_TOOLS_ERROR_MESSAGE: 'Tool already entered',
  PHONE_VALIDATION_MESSAGE: 'Please use valid phone number',
  NUMERIC_VALIDATION_MESSAGE: 'Please use numeric values',
  FILE_SIZE_MESSAGE: 'File size should not exceed ', // Unit is a must to specify, so it should be - File size should not exceed 10 KB
  PASSWORD_MESSAGE: 'Please enter a valid password',
  PASSWORD_INFO:
    'Password must contain at least \n one capital letter, one special character, one digit, and the length should be between 8 to 16 characters',
  FILE_SIZE_EXT: 'KB',
  CITY_SELECTING_ERROR:
    'Please select the same from the dropdown, for efficient location-based suggestions', // 'For better visibility in search results use suggested cities.',
  // We should use the same message for other location based searches also e.g. job & candidate search, not sure from where those messages are picked...
  AMOUNT_IN_100_MULTIPLE_ERROR_MSG:
    'Please enter an amount in multiples of 100',
  INVALID_DATE: 'Please enter a valid Date',
};

export default ERROR_MESSAGE;
