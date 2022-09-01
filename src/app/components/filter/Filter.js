import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import IconButton from '@mui/material/IconButton';
import {
  Accordion,
  Grid,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './filter.module.css';
import filterClickLogo from './img/filterLogo.svg';
import getBootstrapMapper from './filter.bootstrapMapper';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import FilterGenerator from './FilterGenerator';
import Content from '../content';
import updateMappedFilterData from './filter.updateList';
import getFilterPayload from './filter.requestPayload';
import getSelectedFilterItemCount from './filter.selectedCount';
import useMobileDevice from '../../hooks/useMobileDevice';
import UI from '../../constants/ui';

function Filter(props) {
  const {
    filterFromResponse,
    searchRequestFilter,
    setSelectedFilter,
    count,
    isEmployer,
    updateMatchingCount,
  } = props;

  const [mappedFilterData, setMappedFilterData] = useState(EMPTY_ARRAY);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matchingCount, setMatchingCount] = useState(count);

  const isMobileDevice = useMobileDevice();

  useEffect(() => {
    setMatchingCount(count);
  }, [count]);

  const updatedFilter = (filterKey, filterItem, e) => {
    const filterItemValue = e.target.checked;
    const filterItemName = filterItem.name;

    const updatedMappedFilterData = updateMappedFilterData(
      mappedFilterData,
      filterKey,
      filterItemName,
      filterItemValue
    );
    const filterPayload = getFilterPayload(updatedMappedFilterData);
    updateMatchingCount(filterPayload, setMatchingCount, setIsLoading);
    setMappedFilterData(updatedMappedFilterData);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenFilter = useCallback(() => {
    setOpen(true);
  }, EMPTY_ARRAY);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, EMPTY_ARRAY);

  useEffect(() => {
    if (open) {
      const bootstrapMapper = getBootstrapMapper(
        filterFromResponse,
        searchRequestFilter,
        isEmployer
      );
      setMappedFilterData(bootstrapMapper);
    }
  }, [filterFromResponse, open, searchRequestFilter]);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenFilter}>
        <Box component="img" src={filterClickLogo} />
      </Button>
      <Dialog
        fullWidth
        fullScreen={isMobileDevice}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography component="span" sx={{ fontSize: '1.25rem' }}>
            {UI.FILTER}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 14,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers component="div" sx={{ height: '65vh' }}>
          {mappedFilterData.map((filterField, index) => {
            if (filterField.list.length) {
              const selectedFilterItemCount =
                getSelectedFilterItemCount(filterField);
              return (
                <Accordion
                  key={index}
                  sx={{ my: 1, boxShadow: 0, backgroundColor: '#FAFAFA' }}
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                >
                  <AccordionSummary
                    sx={{
                      backgroundColor: '#FAFAFA',
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    id={filterField.displayName}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      spacing={2}
                      direction="row"
                      alignItems="center"
                    >
                      <Grid item xs={10}>
                        <Typography color="#1F2830">
                          {filterField.displayName}
                        </Typography>
                      </Grid>

                      <Grid item xs={2}>
                        <Content condition={selectedFilterItemCount}>
                          <Typography
                            align="center"
                            className={styles.selectedFilterCount}
                          >
                            {selectedFilterItemCount}
                          </Typography>
                        </Content>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FilterGenerator
                      filterKey={filterField.name}
                      filterItems={filterField.list}
                      updatedFilter={updatedFilter}
                      setIsLoading={setIsLoading}
                    />
                  </AccordionDetails>
                </Accordion>
              );
            }
            return undefined;
          })}
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="action"
            size="large"
            sx={{
              backgroundColor: '#D7D7D7',
            }}
            onClick={(e) => {
              setSelectedFilter();
              handleClose(e);
            }}
            disabled={isLoading}
          >
            {UI.RESET}
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={(e) => {
              const filterPayload = getFilterPayload(mappedFilterData);
              setSelectedFilter(filterPayload);
              handleClose(e);
            }}
            disabled={isLoading}
          >
            {UI.SHOW}
            {isLoading ? (
              <CircularProgress size="1rem" color="inherit" className="mx-1" />
            ) : (
              <span className="mx-1"> {matchingCount}</span>
            )}
            {UI.RESULTS}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
Filter.propTypes = {
  setSelectedFilter: PropTypes.func,
  filterFromResponse: PropTypes.object,
  searchRequestFilter: PropTypes.object,
  isEmployer: PropTypes.bool,
  updateMatchingCount: PropTypes.func,
  count: PropTypes.number,
};

Filter.defaultProps = {
  setSelectedFilter: noop,
  filterFromResponse: EMPTY_OBJECT,
  searchRequestFilter: EMPTY_OBJECT,
  isEmployer: false,
  updateMatchingCount: noop,
  count: 0,
};
export default Filter;
