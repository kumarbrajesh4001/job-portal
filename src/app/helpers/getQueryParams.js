import queryString from 'query-string';

function getQueryParams() {
  const { search } = window.location;
  const queryParams = queryString.parse(search);
  return queryParams;
}

export default getQueryParams;
