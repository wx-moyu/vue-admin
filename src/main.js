import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../src/icons/index"; // 自定义图标组件
import "./router/premit"; // 路由首位
import global from "./utils/global"; // 自定义全局方法 无需引入
import UUID from "vue-uuid";
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(global);
Vue.use(UUID);
// runtime 模式 自定组件 需要 重定向 Vue 的路径 （vue/dist/vue.runtime.common.js =====> vue/dist/vue.js） vue.config.js 文件中修改
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
