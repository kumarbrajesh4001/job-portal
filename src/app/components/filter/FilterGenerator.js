import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { EMPTY_ARRAY, FILTER_FIELDS_NOT_DISPLAY } from '../../constants';

function FilterGenerator(props) {
  const { filterKey, filterItems, updatedFilter } = props;

  return (
    <Box component="div">
      <FormGroup>
        {filterItems.map((filterItem, index) => {
          if (!filterItem.id || filterItem.id < FILTER_FIELDS_NOT_DISPLAY) {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    onChange={(e) => updatedFilter(filterKey, filterItem, e)}
                    checked={filterItem.isChecked}
                  />
                }
                label={`${filterItem.name} (${filterItem.count})`}
              />
            );
          }
          return null;
        })}
      </FormGroup>
    </Box>
  );
}

FilterGenerator.propTypes = {
  filterKey: PropTypes.string,
  filterItems: PropTypes.array,
  updatedFilter: PropTypes.func,
};

FilterGenerator.defaultProps = {
  filterKey: undefined,
  filterItems: EMPTY_ARRAY,
  updatedFilter: noop,
};

export default FilterGenerator;
