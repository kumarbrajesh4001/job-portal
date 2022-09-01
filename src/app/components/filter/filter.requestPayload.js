const getCheckedFilterItems = (filterList) =>
  filterList
    .filter((filterItem) => filterItem.isChecked)
    .map((filterItem) => {
      if (filterItem.id) {
        return { id: filterItem.id, name: filterItem.name };
      }
      return { name: filterItem.name };
    });

const getFilterPayload = (mappedFilterData) =>
  mappedFilterData.reduce((filterPayload, mappedFilter) => {
    const checkedFilterItems = getCheckedFilterItems(mappedFilter.list);

    if (checkedFilterItems.length > 0) {
      // eslint-disable-next-line no-param-reassign
      filterPayload[mappedFilter.name] = checkedFilterItems;
    }
    return filterPayload;
  }, {});

export default getFilterPayload;
