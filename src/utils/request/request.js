/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2022-06-01 17:08:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-02 08:57:08
 */
import axios from "axios";
const httpRequest = axios.create({
  baseURL: window.baseUrl || "",
  timeout: 10000,
});

httpRequest.interceptors.request.use(
  config => {

      return config
  },
  error => {
      return Promise.reject(error)
  }
)

httpRequest.interceptors.response.use(
  response => {
      const res = response.data
      
      return res;
  }, error => {
      // console.log('err', error)
      return Promise.reject(error)
  }
)

let $httpRequest = (url, method='get', data, headers) => {
  let params = {};
  if (method == "get") {
    params = {
      url: url,
      method: method,
      params: data,
    };
  } else {
    if (headers) {
      params = {
        headers: headers,
        url: url,
        method: method,
        data: data,
      };
    } else {
      params = {
        url: url,
        method: method,
        data: data,
      };
    }
  }
  return httpRequest(params);
};
export default $httpRequest;
