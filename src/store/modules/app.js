import Cookie from "cookie_js";
const state = {
  isCollapse: Cookie.get("isCollapse") || false,
  user_name: "",
  token: ""
};
const mutations = {
  SET_IsCollapse(state) {
    state.isCollapse = !state.isCollapse;
  },
  SET_USERNAME(state, value) {
    state.user_name = value;
  },
  SET_TOKEN(state, value) {
    state.token = value;
  }
};
export default {
  namespaced: true,
  state,
  mutations
};
