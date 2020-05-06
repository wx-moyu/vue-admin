/*登录模块接口*/
import sevice from "../utils/request";

/*
获取验证码
 */
export function getSms(data) {
  return sevice.request({
    method: "post",
    url: "/getSms/",
    data: data
  });
}

/**
 * 注册
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function userRegister(data) {
  return sevice.request({
    method: "post",
    url: "/register/",
    data: data
  });
}
/**
 * 注册
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function userLogin(data) {
  return sevice.request({
    method: "post",
    url: "/login/",
    data: data
  });
}
