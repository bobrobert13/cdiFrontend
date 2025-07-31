import { lazyLoad } from "./utils";

export default [
  {
    path: "/home",
    name: "home",
    components: { default: lazyLoad("/modules/home/home") },
    meta: {
      requiresAuth: true,
      roles: ["Paciente", "admin", "Encargado", "doctor"]
    },
    props: true
  },
  {
    path: "/estadisticas",
    name: "estadisticas",
    components: { default: lazyLoad("/modules/estadisticas/estadisticas") },
    meta: {
      requiresAuth: true,
      roles: ["Paciente", "admin", "Encargado", "doctor"]
    },
    props: true
  },
];
