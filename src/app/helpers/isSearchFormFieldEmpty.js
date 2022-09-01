const isSearchFormFieldEmpty = (search) =>
  search?.skill === undefined && search?.location === undefined;

export default isSearchFormFieldEmpty;
