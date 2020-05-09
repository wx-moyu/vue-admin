export default {
  install(Vue) {
    Vue.prototype.confirm = function() {
      console.log("自定义全局方法");
    };
  }
};
