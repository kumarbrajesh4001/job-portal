import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import KEY_CODES from '../../constants/keyCodes';
import isStringEmpty from '../../helpers/isStringEmpty';

export const getAddressObject = (addressComponents) => {
  const addressObj = {};
  addressComponents.find((obj) => {
    if (obj.types.includes('locality')) {
      addressObj.city = obj.short_name;
    } else if (obj.types.includes('country')) {
      addressObj.country = obj.long_name;
    }
    return addressObj;
  });
  return addressObj;
};

export const getGeoLocationData = (addObject) => {
  const locationObject = {};
  if (addObject) {
    const coordinates = [
      addObject[0]?.geometry.location.lat(),
      addObject[0]?.geometry.location.lng(),
    ];
    const addressObj = getAddressObject(addObject[0].address_components);
    const formattedAddress = addObject[0].formatted_address;
    const placeId = addObject[0].place_id;
    locationObject.name = formattedAddress;
    locationObject.shortname = addressObj?.city;
    locationObject.placeid = placeId;
    locationObject.location = {
      type: 'Point',
      coordinates,
    };
  }
  return locationObject;
};

const getIsLocExists = (lastLocation, locations) => {
  const shortname = lastLocation.toLowerCase();

  const isLocExists = locations.some(
    (obj) => obj.shortname.toLowerCase() === shortname
  );
  return isLocExists;
};

export const setLocationsForComma = ({
  e,
  lastLocation,
  locations,
  setSnackbarOpen,
  setLocations,
  onEnterInGeoAutoLocation,
  setErrorMessage,
}) => {
  const lastTrimmedLocation = lastLocation.trim();
  setErrorMessage(true);
  if (lastTrimmedLocation) {
    const lastLocationObj = {
      name: lastTrimmedLocation,
      shortname: lastTrimmedLocation,
    };

    const locationsToSet = [...locations, lastLocationObj];

    const isLocExists = getIsLocExists(lastTrimmedLocation, locations);

    if (isLocExists) {
      setSnackbarOpen({
        setopen: true,
        message: `Don't Enter Same Location`,
        severity: 'warning',
      });
    } else {
      setLocations(locationsToSet);
      if (e.keyCode === KEY_CODES.ENTER_CODE) {
        onEnterInGeoAutoLocation(locationsToSet);
      }
    }
  }
};

const getIndexToReplaceLocation = (lastLocationName, locations) => {
  const shortname = lastLocationName.toLowerCase();

  const index = locations.findIndex(
    (obj) => obj.shortname.toLowerCase() === shortname && !obj.location // obj.locations are co-ordiantes
  );

  return index;
};

export const getIsPlaceIdExists = (locations) => {
  const isExists = locations.some((location) =>
    isStringEmpty(location?.placeid)
  );
  return isExists;
};

const setGeoLocationData = ({
  placeId,
  index,
  locationsHolder,
  setLocations,
  setErrorMessage,
}) => {
  geocodeByPlaceId(placeId).then((geoCode) => {
    const locations = locationsHolder;
    const geoLocationData = getGeoLocationData(geoCode);
    if (geoLocationData) {
      if (index !== -1) {
        locations[index] = geoLocationData;
      } else {
        locationsHolder.pop();
        locationsHolder.push(geoLocationData);
      }
      setLocations(locations);

      const isPlaceIdExists = getIsPlaceIdExists(locations);
      if (isPlaceIdExists) {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);
      }
    }
  });
};

export const setLocationFromAutosuggetions = ({
  lastLocation,
  locations,
  setLocations,
  setSnackbarOpen,
  setErrorMessage,
}) => {
  const placeId = lastLocation.place_id;

  const locationsHolder = [...locations];

  const lastLocationName = lastLocation.structured_formatting.main_text;

  const isLocExists = getIsLocExists(lastLocationName, locations);

  if (isLocExists) {
    setSnackbarOpen({
      setopen: true,
      message: `Don't Enter Same Location`,
      severity: 'warning',
    });
    const index = getIndexToReplaceLocation(lastLocationName, locations);

    if (index !== -1) {
      setGeoLocationData({
        placeId,
        index,
        locationsHolder,
        setLocations,
        setErrorMessage,
      });
    }
  } else {
    locationsHolder.push({
      name: lastLocationName,
      shortname: lastLocationName,
    });
    setLocations(locationsHolder);
    setGeoLocationData({
      placeId,
      index: -1,
      locationsHolder,
      setLocations,
      setErrorMessage,
    });
  }
};
