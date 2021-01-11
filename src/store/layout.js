import AuthService from '@/service/AuthService'
export default {
  namespaced: true,
  state: {
    sidebarClose: true,
    sidebarActiveElement: null,
    authToken: null,
  },

  mutations: {
    switchSidebar(state, value) {
      if (value) {
        state.sidebarClose = value;
      } else {
        state.sidebarClose = !state.sidebarClose;
      }
    },
    changeSidebarActive(state, index) {
      state.sidebarActiveElement = index;
    },
    authLogin(state, token){
      state.authToken = token;
    }
  },
  actions: {
    switchSidebar({ commit }, value) {
      commit('switchSidebar', value);
    },
    changeSidebarActive({ commit }, index) {
      commit('changeSidebarActive', index);
    },
    async authLogin({ commit }, payload){
      const token = await AuthService.postLogin(payload.username, payload.password);
      if(token){
        window.localStorage.setItem('authenticated', true);
        window.localStorage.setItem('curUser', payload.username);
        window.localStorage.setItem('token', token);
        commit('authLogin', token)
      }
    }
  },
};
