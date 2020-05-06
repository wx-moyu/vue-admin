import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/Login";
import Layout from "../views/layout/index";
import ConsoleIndex from "../views/console/index";
import InfoIndex from "../views/info/index";
import InfoCategory from "../views/info/category";
import UserInfo from "../views/user/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: { name: "主页" }
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: Login,
    meta: { name: "登录页" }
  },
  {
    path: "/console",
    component: Layout,
    name: "Console",
    redirect: "index",
    meta: { name: "控制台", icon: "console", iconClass: "" },
    children: [
      {
        path: "/index",
        name: "Index",
        component: ConsoleIndex,
        meta: { name: "首页" }
      }
    ]
  },
  {
    path: "/info",
    component: Layout,
    redirect: "InfoIndex",
    meta: { name: "信息管理", icon: "info", iconClass: "" },
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        component: InfoIndex,
        meta: { name: "新闻列表" }
      },
      {
        path: "/indexCategory",
        name: "InfoCategory",
        component: InfoCategory,
        meta: { name: "新闻分类" }
      }
    ]
  },
  {
    path: "/user",
    component: Layout,
    redirect: "UserIndex",
    meta: { name: "用户管理", icon: "user", iconClass: "" },
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        component: UserInfo,
        meta: { name: "基本信息" }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
