import uniqBy from 'lodash/uniqBy';
import compact from 'lodash/compact';

const getUniqueList = (list) => {
  const compactList = compact(list);
  const unqiueList = uniqBy(compactList, (item) => item.toLowerCase());
  return unqiueList;
};

export default getUniqueList;
