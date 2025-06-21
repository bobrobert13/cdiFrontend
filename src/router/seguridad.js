import { lazyLoad } from "./utils";

export default [
  {
    path: "/login",
    name: "login",
    component: lazyLoad("/modules/public/login")
  }
];
