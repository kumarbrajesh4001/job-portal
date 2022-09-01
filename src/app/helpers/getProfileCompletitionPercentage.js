import reduce from 'lodash/reduce';

const getProfileCompletitionPercentage = (requiredKeys, filledKeys) =>
  reduce(
    filledKeys,
    (sumOfCompletionPercentage, _, filledKey) => {
      // eslint-disable-next-line no-param-reassign
      sumOfCompletionPercentage += requiredKeys[filledKey] || 0;
      return sumOfCompletionPercentage;
    },
    0
  );
export default getProfileCompletitionPercentage;
