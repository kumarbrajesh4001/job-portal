import axios from 'axios';
import STATUS_CODE from '../constants/statusCode';

const formDataAxiosClient = axios.create();

// Intercept request
formDataAxiosClient.interceptors.request.use(
  (request) => {
    request.headers['Content-Type'] = 'multipart/form-data';
    return request;
  },
  null,
  { synchronous: true }
);

// Intercept response
formDataAxiosClient.interceptors.response.use(
  (response) =>
    // Dispatch any action on success
    response?.data,
  (error) => {
    if (error.response?.status === STATUS_CODE.AUTH401) {
      // Add Logic to
      // 1. Redirect to login page or
      // 2. Request refresh token
    }
    return Promise.reject(error.response.data);
  }
);

// http://ec2-3-109-108-73.ap-south-1.compute.amazonaws.com/api/v1/search/job

formDataAxiosClient.defaults.baseURL = '/api/v1';

formDataAxiosClient.defaults.headers = {
  'Content-Type': 'application/json, text/plain, */*',
  Accept: 'application/json, text/plain, */*',
};

// All request will wait 5 seconds before timeout
formDataAxiosClient.defaults.timeout = 10000;

// formDataAxiosClient.defaults.withCredentials = true;

export default formDataAxiosClient;
