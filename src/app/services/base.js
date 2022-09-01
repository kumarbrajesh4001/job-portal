import axios from 'axios';
import STATUS_CODE from '../constants/statusCode';

const axiosClient = axios.create();

// Intercept request
axiosClient.interceptors.request.use(
  (request) => {
    request.headers['Content-Type'] = 'application/json';
    return request;
  },
  null,
  { synchronous: true }
);

// Intercept response
axiosClient.interceptors.response.use(
  (response) =>
    // Dispatch any action on success
    response?.data,
  (error) => {
    if (error.response?.status === STATUS_CODE.AUTH401) {
      // window.location.href = '/';
    }
    return Promise.reject(error.response.data);
  }
);

// http://ec2-3-109-108-73.ap-south-1.compute.amazonaws.com/api/v1/search/job

axiosClient.defaults.baseURL = '/api/v1';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// All request will wait 1 min before timeout
axiosClient.defaults.timeout = 60000;

// axiosClient.defaults.withCredentials = true;

export default axiosClient;
