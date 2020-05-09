// 路由守卫
//to 下一个页面 -----进入的页面
// from 上一个页面 ----离开之前的页面
import router from "./index";
import { getCookie, removeCookie } from "@/utils/app";

const whiteRouter = ["/login"]; // 判断数组中是否存在某个对象
router.beforeEach((to, from, next) => {
  if (getCookie("token")) {
    if (to.path === "/login") {
      removeCookie("token");
      removeCookie("username");
    }
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      //存在
      next();
    } else {
      next("/login"); //路由指向 死循环
    }
  }
});
