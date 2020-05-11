/*拦截器配置*/
import axios from "axios";
import { getCookie } from "@/utils/app";
const sevice = axios.create({
  baseURL: "/api",
  timeout: process.env.APP_VUE_TIMEOUT
});
// 添加请求拦截器（请求接口前的数据处理）
sevice.interceptors.request.use(
  function(config) {
    if (getCookie("token") && getCookie("username")) {
      config.headers["Tokey"] = getCookie("token");
      config.headers["UserName"] = getCookie("username");
    }

    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
// 请求接口后返回数据拦截
sevice.interceptors.response.use(
  function(response) {
    let data = response.data;
    // 对响应数据做点什么
    if (data.resCode !== 0) {
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  function(error) {
    let data = error.data;
    // 对响应错误做点什么
    return Promise.reject(data);
  }
);
export default sevice;
