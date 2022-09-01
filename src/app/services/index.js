import axios from 'axios';

import axiosClient from './base';
import formDataAxiosClient from './postFormData';

export function getRequest(URL) {
  return axiosClient.get(URL);
}

export function postRequest(URL, payload) {
  return axiosClient.post(URL, payload);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(URL, payload);
}

export function deleteRequest(URL) {
  return axiosClient.delete(URL);
}

export function putRequest(URL, payload) {
  return axiosClient.put(URL, payload);
}

export function postFormDataRequest(URL, payload) {
  return formDataAxiosClient.post(URL, payload);
}

export function allRequest(allRequests) {
  return axios.all(allRequests).then(
    axios.spread(
      (...responses) => responses
      // use/access the results
    )
  );
}

export function downloadFile(path, fileName) {
  axios({
    url: path,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  });
}
