import moment from 'moment';
import {
  DD_MMM_YYYY,
  DD_MMM_YYYY_HH_MN_SS_A,
  MMM_YYYY,
  MM_YYYY,
  YYYY_MM_DD,
} from '../constants/datepicker';

export const getFormattedDate = (timestamp) =>
  moment(timestamp).format(DD_MMM_YYYY);

export const getFormattedDateTime = (timestamp) =>
  moment(timestamp).format(DD_MMM_YYYY_HH_MN_SS_A);

export const getDateInMMYY = (timestamp) => moment(timestamp).format(MM_YYYY);

export const getDateInMMMYY = (timestamp) => moment(timestamp).format(MMM_YYYY);

export const getDateInYYMMDD = (timestamp) =>
  moment(timestamp).format(YYYY_MM_DD);

export const getRelativeTime = (timestamp) => moment(timestamp).fromNow();

export const secondToMintute = (seconds = 0) =>
  moment().startOf('day').seconds(seconds).format('mm:ss');
