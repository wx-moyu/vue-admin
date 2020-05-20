import { MessageBox } from "element-ui";
import { Message } from "element-ui";

/**
 * 自定义全局方法
 * */
export default {
  install(Vue) {
    Vue.prototype.confirm = param => {
      MessageBox.confirm(param.title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: param.type || "warning",
        center: true
      })
        .then(() => {
          // Message({
          //   type: "success",
          //   message: "删除成功!"
          // });
          if (param.num) {
            param.fn(param.num);
          }
          if (param.category) {
            param.fn(param.category);
          }
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除"
          });
          // 点击取消按钮执行的方法
          param.catchFn && param.catchFn();
        });
    };
  }
};
