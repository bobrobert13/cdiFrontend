export function lazyLoad(path) {
  return () => import(`../components${path}.vue`);
}

export function makeMeta(auth, roles) {
  switch (roles) {
    case "Paciente":
      roles = ["Paciente"];
      break;
    default:
      roles = [];
  }
  return {
    requiresAuth: auth,
    roles: roles
  };
}
