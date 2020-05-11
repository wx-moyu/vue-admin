/*新闻模块*/
import sevice from "../utils/request";
/**
 * 添加一级分类
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addFirstCategory(data) {
  return sevice.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data: data
  });
}
/**
 * 获取分类信息
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getCategoryAll() {
  return sevice.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data: {}
  });
}
/**
 * 删除分类
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteCategory(data) {
  return sevice.request({
    method: "post",
    url: "/news/deleteCategory/",
    data: data
  });
}
