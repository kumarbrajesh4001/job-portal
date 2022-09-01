import isNil from 'lodash/isNil';
import UI from '../constants/ui';
import { getPresentFormatter } from './candidateForm';
import { getDateInMMMYY } from './date';

export const getFormattedNumber = (number) =>
  isNil(number)
    ? ''
    : number?.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }); // navigator.language

const numberToWord = (number) => {
  let val = Math.abs(number);
  if (val >= 10000000) {
    val = `${getFormattedNumber(number / 10000000)}Cr`;
  } else if (val >= 100000) {
    val = `${getFormattedNumber(number / 100000)}L`;
  }
  return val;
};

// `${getFormattedNumber(number / 100000)}L`;

export const getFormattedCurrencyNumber = (number) =>
  isNil(number) ? '' : numberToWord(number);

export const getFormattedCurrency = (amount) =>
  isNil(amount) ? '' : `₹ ${getFormattedCurrencyNumber(amount)}`;

export const getFormattedCurrencyPerAnnum = (amount) =>
  isNil(amount) ? '' : `${getFormattedCurrency(amount)}${UI.PER_ANNUN}`;

export const getFormattedCurrencyRangePerAnnum = (minAmount, maxAmount) =>
  isNil(minAmount) || isNil(maxAmount)
    ? ''
    : `₹ ${getFormattedCurrencyNumber(minAmount)}-${getFormattedCurrencyNumber(
        maxAmount
      )}${UI.PER_ANNUN}`;

export const getFormattedDurationFromRangeTo = (duration) => {
  if (!isNil(duration.from) && duration.atpresent) {
    return `${getDateInMMMYY(duration.from)} - ${getPresentFormatter(
      duration.atpresent
    )}`;
  }
  if (!isNil(duration.from) && !isNil(duration.to)) {
    return `${getDateInMMMYY(duration.from)} - ${getDateInMMMYY(duration.to)}`;
  }

  if (!isNil(duration.from)) {
    return getDateInMMMYY(duration.to);
  }
  if (!isNil(duration.to)) {
    return getDateInMMMYY(duration.to);
  }

  if (duration.atpresent) {
    return getPresentFormatter(duration.atpresent);
  }

  return '';
};
