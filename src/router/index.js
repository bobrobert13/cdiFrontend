import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";
import { lazyLoad } from "./utils";
import { isAuthenticated, isAuthorized, refreshUser } from "../utils/auth";
import NProgress from "../../node_modules/nprogress/nprogress";
import "../../node_modules/nprogress/nprogress.css";

// ++++++++++++++++++++++++++++++ ROUTES ++++++++++++++++++++++++++++++++++++
import UserRoutes from "../router/user";
import SeguridadRoutes from "../router/seguridad";

Vue.use(VueRouter);
const baseRoutes = [
  {
    path: "/404",
    name: "Error404",
    component: lazyLoad("/Error404")
  },
  {
    path: "/",
    name: "login",
    component: lazyLoad("/modules/public/login")
  }
];
const routes = baseRoutes
  .concat(UserRoutes)
  .concat(SeguridadRoutes);
// ++++++++++++++++++++++++++++++ ROUTES ++++++++++++++++++++++++++++++++++++

const Router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
});

Router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated();
  if (store.state.user.role === "" && authenticated) refreshUser();
  let meta = {};
  if (to.meta && to.meta.hasOwnProperty("requiresAuth")) meta = to.meta;
  else {
    to.matched.some(record => {
      if (record.meta.requiresAuth) {
        meta = record.meta;
        return record.meta.requiresAuth;
      }
    });
  }

  const authorized = isAuthorized(meta);

  if (meta.requiresAuth && !authenticated) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else
  if (authenticated && ["/login"].indexOf(to.path) >= 0) {
    next("/home");
  } else if (authenticated && ["/"].indexOf(to.path) >= 0) {
    next({
      path: "/home"
    });
  } else if (to.matched.length === 0 || !authorized) {
    next({ name: "Error404" });
  } else {
    next();
  }
});

Router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});
Router.afterEach((to, from) => {
  NProgress.done();
});
export default Router;

