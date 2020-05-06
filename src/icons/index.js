import Vue from "vue";
import SvgIcon from "./svgIcon";

Vue.component("svg-icon", SvgIcon);
/**
 * require.context 读取指定目录下的所有文件
 *   1。 目录
 *   2. 是否遍历子级目录
 *   3. 定义文件规则
 * */

const req = require.context("./svg", false, /\.svg/);
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
