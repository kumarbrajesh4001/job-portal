/* eslint-disable no-nested-ternary */

import PropTypes from 'prop-types';
import PopoverComponent from './PopoverComponent';
import { getCandFilterField } from '../../formatter/candidateBootstrap';
import { getEmpFilterField } from '../../formatter/employerBootstrap';
import {
  DEFAULT_COMPANY_NAME,
  DEFAULT_COMPANY_DISPLAY_NAME,
} from '../../constants/filter.constant';
import { EMPTY_OBJECT } from '../../constants';

function SelectedFilters(props) {
  const { searchRequestFilter, isEmployer } = props;

  return (
    <div className="d-flex flex-wrap">
      {Object.keys(searchRequestFilter).map((filterField, i) => (
        <div className="ms-3 mt-2" key={i}>
          <div className="caption color-AAAAAA">
            {filterField === DEFAULT_COMPANY_NAME
              ? DEFAULT_COMPANY_DISPLAY_NAME
              : isEmployer
              ? getCandFilterField(filterField)?.displayName
              : getEmpFilterField(filterField)?.displayName}
          </div>
          <div className="subtitle-2-bold color-1F2830 d-flex">
            {searchRequestFilter[filterField].map((filterFieldValue, index) => {
              if (index === 0) {
                return filterFieldValue.name;
              }
              if (index === 1) {
                return `, ${filterFieldValue.name}`;
              }
              if (index === 2) {
                return (
                  <PopoverComponent
                    filterField={searchRequestFilter[filterField]}
                    key={index}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
SelectedFilters.propTypes = {
  searchRequestFilter: PropTypes.object,
  isEmployer: PropTypes.bool,
};
SelectedFilters.defaultProps = {
  searchRequestFilter: EMPTY_OBJECT,
  isEmployer: false,
};

export default SelectedFilters;
