import UI from '../constants/ui';

export const createOptions = (list) =>
  list?.map((item) => ({ value: item.id, label: item.value }));

export const listWithEmptyOption = (list) =>
  [{ id: '', value: UI.SELECT_OPTION }].concat(list);
