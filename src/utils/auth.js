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

function saveToken(data) {
  console.log("data de save token:", data);
  window.localStorage.setItem("user", data.user.fullName);
  window.localStorage.setItem("user_id", data.user.id);
  window.localStorage.setItem("isAuthenticated", true);
  window.localStorage.setItem("role", data.user.role);
  window.localStorage.setItem("token", data.token.code);
  window.localStorage.setItem("expire", data.token.expire);
  window.localStorage.setItem("status", data.user.status);
  store.commit("setUser", {
    fullName: data.user.fullName,
    id: data.user.id,
    profileImage: data.user.profileImage,
    isAuthenticated: true,
    email: data.user.email,
    role: data.user.role,
    status: data.user.status,
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
  const expire = window.localStorage.getItem("expire");
  const status = store.state.user.status;
  const auth = store.state.user.isAuthenticated;
  // si el token esta vencido, se remueve el token
  if (expire < moment().unix()) {
    removeToken();
    return false;
  }

  return true;
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
    store.commit("setUser", {
      fullName: user,
      id: userId,
      profileImage: data.store.profileImage,
      isAuthenticated: auth === "true",
      role: role
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
