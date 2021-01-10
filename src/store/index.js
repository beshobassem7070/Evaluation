import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: null
  },
  mutations: {
    SAVE_TEKEN(state, token) {
      state.token = token;
    }
  },
  actions: {},
  modules: {},
  getters: {
    authToken(state) {
      return state.token;
    }
  }
});
