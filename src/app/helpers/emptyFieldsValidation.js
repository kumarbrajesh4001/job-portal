import pickBy from 'lodash/pickBy';

const getSanitizedValues = (values) =>
  pickBy(values, (value) => {
    const expression = !(
      value === 0 ||
      value === '' ||
      value === undefined ||
      value === null ||
      Number.isNaN(value) ||
      value?.length === 0
    );
    return expression;
  });

export default getSanitizedValues;
