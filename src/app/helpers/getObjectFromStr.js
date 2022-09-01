import { EMPTY_OBJECT } from '../constants';

const getObjectFromStr = (string) => {
  try {
    return JSON.parse(string);
  } catch {
    return EMPTY_OBJECT;
  }
};
export default getObjectFromStr;
