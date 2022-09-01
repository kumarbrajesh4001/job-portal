import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import last from 'lodash/last';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import debounce from 'lodash/debounce';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import throttle from 'lodash/throttle';
import Chip from '@mui/material/Chip';
import UI from '../../constants/ui';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../constants';
import isStringEmpty from '../../helpers/isStringEmpty';
import {
  autocompleteService,
  GOOGLE_MAPS_API_KEY,
  docId,
} from './geoLocation.constants';
import {
  getGeoLocationData,
  setLocationFromAutosuggetions,
  setLocationsForComma,
  getIsPlaceIdExists,
} from './geoLocation.helper';
import VALIDATION_VALUES from '../../constants/validationValues';
import KEY_CODES from '../../constants/keyCodes';
import ERROR_MESSAGE from '../../constants/errorMsgs';
import { getLocationObj } from '../../helpers/general';
import { addScript } from '../../helpers/addScript';
import { getGoogleMapScriptUrl } from '../../constants/apiUrls';

function GeoAutoLocation(props) {
  const {
    inputId,
    setLocations,
    locations,
    isDisabled,
    maxLength,
    onEnterInGeoAutoLocation,
    setSnackbarOpen,
    isMulti,
    disabled,
    isSearchForm,
    error,
  } = props;

  const [keywordsTextFieldValue, setKeywordsTextFieldValue] = useState('');
  const [dataAutosuggest, setDataAutosuggest] = useState(EMPTY_ARRAY);
  const [searchKey, setSearchKey] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (!isMulti) {
      setKeywordsTextFieldValue(locations?.shortname || '');
    }

    if (isEmpty(locations)) {
      setErrorMessage(false);
    }
  }, [locations, isMulti]);

  useEffect(() => {
    const scriptSrc = getGoogleMapScriptUrl(GOOGLE_MAPS_API_KEY);
    addScript(loaded, scriptSrc, docId);
  }, EMPTY_ARRAY);

  useEffect(() => {
    if (isDisabled) {
      const jobLocations = isMulti ? EMPTY_ARRAY : '';
      setLocations(jobLocations);
      setErrorMessage(false);
    }
  }, [isDisabled, isMulti]);

  const isDisabledField = useMemo(
    () => (isDisabled ? { disabled: true } : EMPTY_OBJECT),
    [isDisabled]
  );

  const isMultiField = useMemo(
    () =>
      isMulti && !isDisabled
        ? {
            multiple: true,
            value: locations?.map((location) => location?.shortname),
          }
        : { value: keywordsTextFieldValue },
    [isMulti, locations, isDisabled]
  );

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    EMPTY_ARRAY
  );

  const removeOption = useCallback(
    (index) => {
      const updatedLocations = [...locations];
      updatedLocations.splice(index, 1);
      setLocations(updatedLocations);
      const isPlaceIdExists = getIsPlaceIdExists(updatedLocations);

      if (isPlaceIdExists) {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);
      }
    },
    [locations]
  );

  const onChange = useCallback(
    (e, valueFromGeoAutoLocation) => {
      if (isMulti) {
        if (!valueFromGeoAutoLocation.length) {
          setLocations(EMPTY_ARRAY);
        }
        if (valueFromGeoAutoLocation.length > locations?.length) {
          setDataAutosuggest(EMPTY_ARRAY);

          const lastLocation = last(valueFromGeoAutoLocation);

          const isAString = isString(lastLocation);

          if (isAString) {
            setLocationsForComma({
              e,
              lastLocation,
              locations,
              setSnackbarOpen,
              setLocations,
              onEnterInGeoAutoLocation,
              setErrorMessage,
            });
          } else {
            setLocationFromAutosuggetions({
              lastLocation,
              locations,
              setSnackbarOpen,
              setLocations,
              setErrorMessage,
            });
          }
        }
      } else if (!valueFromGeoAutoLocation) {
        setLocations(EMPTY_OBJECT);
      } else {
        const placeId = valueFromGeoAutoLocation?.place_id;
        if (placeId) {
          geocodeByPlaceId(placeId).then((geoCode) => {
            const geoLocationData = getGeoLocationData(geoCode);
            if (geoLocationData !== undefined) {
              setLocations(geoLocationData);
              setErrorMessage(false);
              setKeywordsTextFieldValue(geoLocationData.shortname);
            }
          });
        } else {
          const locationObject = getLocationObj(
            valueFromGeoAutoLocation.keywordsTextFieldValue
          );
          setLocations(locationObject);
          setErrorMessage(true);
        }
      }
    },
    [locations, keywordsTextFieldValue]
  );

  useEffect(() => {
    let active = true;
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (!isStringEmpty(searchKey)) {
      fetch(
        {
          input: searchKey,
          componentRestrictions: { country: ['in'] },
          types: ['(cities)'],
        },
        (results) => {
          if (active) {
            let newOptions = EMPTY_ARRAY;
            if (results) {
              newOptions = [...newOptions, ...results];
            }
            setDataAutosuggest(newOptions);
          }
        }
      );
    } else {
      setDataAutosuggest(EMPTY_ARRAY);
    }
    return () => {
      active = false;
    };
  }, [searchKey, fetch]);

  const debouncedSetSearchKey = useCallback(
    debounce(setSearchKey, 100),
    EMPTY_ARRAY
  );

  const onInputChange = (event, newInputValue) => {
    if (!newInputValue.includes(',')) {
      setKeywordsTextFieldValue(newInputValue);
      debouncedSetSearchKey(newInputValue);
    }
  };
  return (
    <Stack spacing={3}>
      <Autocomplete
        {...isDisabledField}
        {...isMultiField}
        id={inputId}
        freeSolo
        size="small"
        getOptionLabel={(option) =>
          typeof option === 'string' ? '' : option?.description
        }
        onChange={onChange}
        options={dataAutosuggest}
        onInputChange={onInputChange}
        onBlur={(e) => {
          if (isMulti) {
            if (keywordsTextFieldValue) {
              onChange(e, [...locations, keywordsTextFieldValue]);
            }
            setKeywordsTextFieldValue('');
          } else if (keywordsTextFieldValue) {
            if (
              keywordsTextFieldValue?.toLowerCase() !==
              locations?.shortname?.toLowerCase()
            )
              onChange(e, { ...locations, keywordsTextFieldValue });
          }
        }}
        onKeyDown={(e) => {
          if (isMulti) {
            if (
              e.keyCode === KEY_CODES.BACKSPACE_CODE &&
              !keywordsTextFieldValue
            ) {
              const index = locations.length - 1;
              removeOption(index);
            } else if (e.keyCode === KEY_CODES.COMMA_CODE) {
              onChange(e, [...locations, keywordsTextFieldValue]);
              setKeywordsTextFieldValue('');
            } else if (e.keyCode === KEY_CODES.ENTER_CODE) {
              if (
                dataAutosuggest.length === 0 &&
                keywordsTextFieldValue === ''
              ) {
                onEnterInGeoAutoLocation(locations);
              }
              setKeywordsTextFieldValue('');
            }
          }
        }}
        inputValue={keywordsTextFieldValue}
        renderTags={() =>
          locations?.map((tag, index) => (
            <Chip
              key={tag.name}
              size="small"
              label={tag.shortname}
              className="ms-1 subtitle-2-bold color-1F2830"
              onDelete={() => {
                removeOption(index);
              }}
            />
          ))
        }
        sx={{
          '& .MuiAutocomplete-input': {
            marginRight: '1.75rem',
          },
        }}
        renderInput={(params) => (
          <>
            <TextField
              disabled={disabled}
              variant="outlined"
              {...params}
              inputProps={{ ...params.inputProps, maxLength }}
              placeholder={locations?.length ? '' : UI.PLACEHOLDER_CITY}
            />

            <div className={isSearchForm ? 'position-absolute' : 'field_space'}>
              <span className="mandatory">
                {errorMessage ? ERROR_MESSAGE.CITY_SELECTING_ERROR : ''}
                {error.message ? ERROR_MESSAGE.REQ_ERROR_MSG : ''}
              </span>
            </div>
          </>
        )}
      />
    </Stack>
  );
}

GeoAutoLocation.propTypes = {
  inputId: PropTypes.string,
  maxLength: PropTypes.number,
  setLocations: PropTypes.func,
  locations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  isIndicatorHidden: PropTypes.bool,
  onEnterInGeoAutoLocation: PropTypes.func,
  setSnackbarOpen: PropTypes.func,
  isMulti: PropTypes.bool,
  isSearchForm: PropTypes.bool,
  error: PropTypes.object,
};

GeoAutoLocation.defaultProps = {
  inputId: undefined,
  maxLength: VALIDATION_VALUES.MAX_VALUE_64,
  setLocations: noop,
  locations: EMPTY_ARRAY,
  isDisabled: false,
  disabled: false,
  style: EMPTY_OBJECT,
  isIndicatorHidden: false,
  onEnterInGeoAutoLocation: noop,
  setSnackbarOpen: noop,
  isMulti: false,
  isSearchForm: false,
  error: EMPTY_OBJECT,
};

export default GeoAutoLocation;
