/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2022-06-01 17:08:33
 * @LastEditors: TJP
 * @LastEditTime: 2024-01-07 15:54:57
 */
import axios from "axios";
import { Message } from "element-ui";
const httpRequest = axios.create({
  baseURL: window.baseUrl || "",
  timeout: 10000,
});

httpRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (response) => {
    const res = response.data;

    return res;
  },
  (error) => {
    let { response } = error;
    if (response) {
      // console.log('err', error)
      return Promise.reject(error);
    } else {
      Message({
        showClose: true,
        message: "服务连接异常，请稍后重试！",
        type: "error",
      });
    }
  }
);

let $httpRequest = (url, method = "get", data, headers, option = {}) => {
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
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
    }
  }
  if (option.onUploadProgress) {
    params.onUploadProgress = option.onUploadProgress;
  }
  params = { ...params, ...option };

  return httpRequest(params);
};
export default $httpRequest;
