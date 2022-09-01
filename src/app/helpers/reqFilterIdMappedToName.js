import reduce from 'lodash/reduce';
import isEmpty from 'lodash/isEmpty';
import { getCandFilterField } from '../formatter/candidateBootstrap';
import { getEmpFilterField } from '../formatter/employerBootstrap';
import { DEFAULT_COMPANY_NAME } from '../constants/filter.constant';

const getFiltereMappingName = (filterFieldFromBootstrap, id) =>
  filterFieldFromBootstrap.mapping.find(
    (boostrapFilterField) => id === boostrapFilterField.id
  )?.value;

const getIdMappedToName = (reqfilter, isEmployer) =>
  reduce(
    reqfilter,
    (idMappedToName, filterValues, filterKey) => {
      if (filterKey === DEFAULT_COMPANY_NAME) {
        // eslint-disable-next-line no-param-reassign
        idMappedToName[filterKey] = filterValues;
        return idMappedToName;
      }
      const getFilterField = isEmployer
        ? getEmpFilterField
        : getCandFilterField;

      const filterFieldFromBootstrap = getFilterField(filterKey);

      const filterIdWithName = filterValues
        .filter((filter) => filter.id)
        .map((filterValue) => {
          const { id } = filterValue;
          const name = getFiltereMappingName(filterFieldFromBootstrap, id);
          return { id, name };
        });

      if (!isEmpty(filterIdWithName)) {
        // eslint-disable-next-line no-param-reassign
        idMappedToName[filterKey] = filterIdWithName;
      }
      return idMappedToName;
    },
    {}
  );

export default getIdMappedToName;
