import ENUM_TYPE from '../constants/enumType';
import { getFilter } from './base.bootstrap';

const PAYTM_ENUM = {
  FLOW: 'flow',
  MID: 'mid',
  ORDER: 'order',
  TOKEN_TYPE: 'tokenType',
  WEBSITE_NAME: 'websiteName',
};

const getPaytmEnum = (filterType) => {
  const filterByName = getFilter(ENUM_TYPE.PAYTM);
  const filter = filterByName?.[filterType];
  return filter;
};

export const getFlow = () => getPaytmEnum(PAYTM_ENUM.FLOW);
export const getMid = () => getPaytmEnum(PAYTM_ENUM.MID);
export const getOrder = () => getPaytmEnum(PAYTM_ENUM.ORDER);
export const getTokenType = () => getPaytmEnum(PAYTM_ENUM.TOKEN_TYPE);
export const getWebsiteName = () => getPaytmEnum(PAYTM_ENUM.WEBSITE_NAME);
