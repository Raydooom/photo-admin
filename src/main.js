// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import VueQuillEditor from "vue-quill-editor"; // 编辑器
import Nprogress from "nprogress";
import Cookies from "js-cookie";
import "nprogress/nprogress.css";
import "./assets/scss/theme.scss"; // 主题颜色自定义
import "./assets/fonts/iconfont.css"; // 字体图标
import "quill/dist/quill.core.css"; // 编辑器css
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";

Vue.use(VueQuillEditor);
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  Nprogress.start();
  let isLogin = Cookies.get("jwt-token");
  if (isLogin) {
    let routerTitle = to.meta.title;
    store.commit("routerTitle", routerTitle);
    // 登录拦截
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  Nprogress.done();
});

new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
