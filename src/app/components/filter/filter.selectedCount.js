const getSelectedFilterItemCount = (filterField) =>
  filterField.list.reduce((totalCount, filterItem) => {
    if (filterItem.isChecked) {
      // eslint-disable-next-line no-param-reassign
      totalCount += 1;
    }
    return totalCount;
  }, 0);

export default getSelectedFilterItemCount;
