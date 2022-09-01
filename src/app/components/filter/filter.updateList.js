const updateMappedFilterData = (
  mappedFilterData,
  filterKey,
  filterItemName,
  filterItemValue
) =>
  mappedFilterData.map((mappedFilter) => {
    if (mappedFilter.name === filterKey) {
      const updatedMappedFilter = mappedFilter.list.map((filterItem) => {
        if (filterItem.name === filterItemName) {
          return { ...filterItem, isChecked: filterItemValue };
        }
        return filterItem;
      });
      return { ...mappedFilter, list: updatedMappedFilter };
    }
    return mappedFilter;
  });

export default updateMappedFilterData;
