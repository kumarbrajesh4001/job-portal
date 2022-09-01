import { getFileUploadUrl } from '../constants/apiUrls';
import getFileSize from '../constants/fileSizes';
import { postFormDataRequest } from '../services';

export const fileUploader = (requestMaker, selectedFile) => {
  const data = new FormData();
  const fileUploadUrl = getFileUploadUrl(requestMaker);
  data.append('file', selectedFile);
  if (fileUploadUrl) {
    return postFormDataRequest(fileUploadUrl, data);
  }
  return undefined;
};

export const isFileSizeInLimit = (file, requestMaker) => {
  const fileSize = file.size;
  const requiredFileSize = getFileSize(requestMaker);
  if (fileSize <= requiredFileSize) {
    return true;
  }
  return false;
};
