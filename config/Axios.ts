// @ts-ignore
import axios from "axios";
import { sessionStore } from "../stores/Sessions/SessionsStore";

axios.defaults.baseURL = "http://202.10.36.37/api";

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  async (config: any) => {
    const { token } = sessionStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { statusCode } = error?.response?.data;
    const { setLogout } = sessionStore.getState();

    if (statusCode === 401 || error.status === 401) {
      setLogout();
    }
    return Promise.reject(error?.errors || error?.response?.data);
  }
);

class APIClient {
  /**
   * Fetches data from given url
   */
  get = (url: any, params?: any) => {
    let response;

    let paramKeys: any = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  post = (url: any, data: any, options?: any) => {
    return axios.post(url, data, options);
  };
  /**
   * Updates data
   */
  patch = (url: any, data: any, config?: any) => {
    return axios.patch(url, data, config);
  };

  put = (url: any, data: any) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url: any, config?: any) => {
    return axios.delete(url, { ...config });
  };
}

export default new APIClient();
