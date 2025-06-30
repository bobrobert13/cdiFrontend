import Vue from "vue";
import Vuex from "vuex";
import config from "../config";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

let userVoid = {
  id: "",
  fullName: "",
  profileImage: "",
  isAuthenticated: false,
  role: "",
  email: "",
};

export default new Vuex.Store({
  state: {
    user: {
      id: "",
      fullName: "",
      profileImage: "",
      isAuthenticated: false,
      role: "",
      email: "",
      nombre_usuario: ''
    },
    url_base: config.api.url
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setFullName(state, fullName) {
      state.user.fullName = fullName;
    },
    setRole(state, role) {
      state.user.role = role;
    },
    setAuthenticated(state, authenticate) {
      state.user.isAuthenticated = authenticate;
    },
    setProfileImage(state, profileImage) {
      state.user.profileImage = profileImage;
    },
    logout(state) {
      state.user = userVoid;
    }
  },
  getters: {
    authenticate: state => {
      return state.user.isAuthenticated;
    }
  },
  plugins: [vuexLocal.plugin]
});
