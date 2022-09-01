import keyBy from 'lodash/keyBy';

import ENUM_TYPE from '../constants/enumType';
import { getBootstrap } from './base.bootstrap';

const getFooterFromBootstrapById = () => {
  const bootstrap = getBootstrap();
  const footerById = keyBy(bootstrap?.[ENUM_TYPE.FOOTER], 'id');
  return footerById;
};

export default getFooterFromBootstrapById;
