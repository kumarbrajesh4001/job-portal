import some from 'lodash/some';
import { head } from 'lodash';

const isSelectedIdNotPresent = (list, selectedId) =>
  !some(list, ['id', selectedId]);

const getSelectedId = (list, selectedId) => {
  const selectId = head(list)?.id;
  return selectedId === undefined || isSelectedIdNotPresent(list, selectedId)
    ? selectId
    : selectedId;
};

export default getSelectedId;
