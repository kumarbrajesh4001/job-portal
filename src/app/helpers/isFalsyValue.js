import isNil from 'lodash/isNil';

const isFalsyValue = (value) =>
  isNil(value) ||
  value === 0 ||
  value === '' ||
  value === false ||
  Number.isNaN(value);

export default isFalsyValue;
