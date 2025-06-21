import { lazyLoad } from "./utils";

export default [
  {
    path: "/home",
    name: "home",
    components: { default: lazyLoad("/modules/home/home") },
    meta: {
      requiresAuth: true,
      roles: ["Paciente", "admin", "Encargado", "Doctor"]
    },
    props: true
  },
];
