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

  const isLoginRoute = to.name === "login" || to.path === "/" || to.path === "/login";

  if (authenticated && isLoginRoute) {
    next({ name: "home" });
    return;
  }

  if (!authenticated && !isLoginRoute) {
    // not logged in -> go to login, keep intended destination in query
    next({ name: "login" });
    return;
  }

  next();
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

