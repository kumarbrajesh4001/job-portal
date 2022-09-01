import _isNil from 'lodash/isNil';

const isStringEmpty = (value) => _isNil(value) || value === '';

export default isStringEmpty;
