/* eslint-disable import/prefer-default-export */

export const getLocationObj = (place) => ({
  name: place,
  shortname: place,
});

export function getFileName(fileName) {
  return fileName?.substring(fileName.lastIndexOf('/') + 1);
}
