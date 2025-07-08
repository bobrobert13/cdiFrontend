import store from "../store";
import moment from "moment";

function setFullName(fullName) {
  window.localStorage.setItem("user", fullName);
  store.commit("setFullName", fullName);
}

function setRole(data) {
  window.localStorage.setItem("user", data.user.fullName);
  window.localStorage.setItem("user_id", data.user.id);
  window.localStorage.setItem("role", data.user.role);
  window.localStorage.setItem("token", data.token.code);
  window.localStorage.setItem("expire", data.token.expire);
  store.commit("setRole", data.user.role);
}

async function saveToken(data) {
  // console.log("data de save token:", data);
  window.localStorage.setItem("user", data.usuario.nombre_usuario);
  window.localStorage.setItem("status", data.usuario.status || '');
  window.localStorage.setItem("user_id", data.usuario.id_usuario);
  window.localStorage.setItem("doctor_id", data.usuario.fk_doctor_id);
  window.localStorage.setItem("cdi_id", data.usuario.fk_cdi_id);
  window.localStorage.setItem("isAuthenticated", true);
  window.localStorage.setItem("role", data.usuario.rol);
  window.localStorage.setItem("token", data.token);
  window.localStorage.setItem("expire", '');
  const user = window.localStorage.getItem("user");
  const userId = window.localStorage.getItem("user_id");
  const doctorId = window.localStorage.getItem("doctor_id");
  const cdiid = window.localStorage.getItem("cdi_id");
  const role = window.localStorage.getItem("role");
  const auth = window.localStorage.getItem("isAuthenticated");
  // console.log('user:', user, userId, role, auth);
  await store.commit("setUser", {
    fullName: '',
    nombre_usuario: user,
    id: userId,
    profileImage: '',
    isAuthenticated: auth,
    email: '',
    role: role,
    doctor_id: doctorId,
    cdi_id: cdiid,
    // status: data.user.status,
  });
}

function updateIsAuthenticated() {
  window.localStorage.setItem("isAuthenticated", "true");
}

function removeToken() {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("user_id");
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("expire");
  window.localStorage.removeItem("isAuthenticated");
  window.localStorage.removeItem("profileImage");
  window.localStorage.removeItem("role");
  window.localStorage.removeItem("status");
  store.commit("setUser", {
    fullName: "",
    id: "",
    profileImage: "",
    isAuthenticated: false,
    email: "",
    role: "",
  });
}

function getToken() {
  return window.localStorage.getItem("token") || "";
}

function isAuthenticated() {
  const token = window.localStorage.getItem("token");
  const auth = store.state.user.isAuthenticated;
  if(token) return true;
  return false;
}

function isAuthorized(meta) {
  // si el usuario esta logueado
  // se consulta si tiene el rol exigido por la ruta
  // en router este valor es usado de forma inversa
  // si el role no esta permitido, se arroja error 404
  if (meta.roles && isAuthenticated()) {
    return meta.roles.indexOf(store.state.user.role) > -1;
  }
  // de lo contrario siempre se dará acceso
  return true;
}

// se refresca
function refreshUser() {
  if (isAuthenticated()) {
    const user = window.localStorage.getItem("user");
    const userId = window.localStorage.getItem("user_id");
    const role = window.localStorage.getItem("role");
    const auth = window.localStorage.getItem("isAuthenticated");
    const doctorId = window.localStorage.getItem("doctor_id");
    const cdiid = window.localStorage.getItem("cdi_id");
    
    store.commit("setUser", {
      fullName: user,
      id: userId,
      profileImage: data.store.profileImage,
      isAuthenticated: auth === "true",
      role: role,
      doctor_id: doctorId,
      cdi_id: cdiid,
    });
  }
}

export {
  updateIsAuthenticated,
  saveToken,
  removeToken,
  isAuthenticated,
  isAuthorized,
  refreshUser,
  getToken,
  setFullName,
  setRole
};
