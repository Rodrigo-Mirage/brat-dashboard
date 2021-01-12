import AuthService from '@/service/AuthService'
import UserService from '@/service/UserService'
export default {
  namespaced: true,
  state: {
    sidebarClose: true,
    sidebarActiveElement: null,
    authToken: null,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    gender: '',
    phone_number: '',
    stream_link: '',
    twitch: '',
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
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
    },
    saveUser(state, {first_name, last_name, username, email, gender, phone_number, stream_link, twitch, twitter, facebook, instagram, youtube}){
      state.first_name = first_name;
      state.last_name = last_name;
      state.username = username;
      state.email = email;
      state.gender = gender;
      state.phone_number = phone_number;
      state.stream_link = stream_link;
      state.twitch = twitch;
      state.twitter = twitter;
      state.facebook = facebook;
      state.instagram = instagram;
      state.youtube = youtube;
    }
  },
  actions: {
    switchSidebar({ commit }, value) {
      commit('switchSidebar', value);
    },
    changeSidebarActive({ commit }, index) {
      commit('changeSidebarActive', index);
    },
    async authLogin({ commit, dispatch }, payload){
      const response = await AuthService.postLogin(payload.username, payload.password);
      const token = response.data.token;
      if(token){
        window.localStorage.setItem('authenticated', true);
        window.localStorage.setItem('curUser', response.data.id);
        window.localStorage.setItem('token', token);
        commit('authLogin', token);
        await dispatch('saveUser', response.data.id);
      }
    },
    async saveUser({ commit }, id){
      const user = await UserService.getUser(id);
      commit('saveUser', {
        first_name: user.data.res.first_name,
        last_name: user.data.res.last_name,
        username: user.data.res.username,
        email: user.data.res.email,
        gender: user.data.res.gender,
        phone_number: user.data.res.phone_number,
        stream_link: user.data.res.stream_link,
        twitch: user.data.res.twitch,
        twitter: user.data.res.twitter,
        facebook: user.data.res.facebook,
        instagram: user.data.res.instagram,
        youtube: user.data.res.youtube,
      })
    }
  },
};
