import AuthService from '@/service/AuthService'
import UserService from '@/service/UserService'
import router from '../Routes'

export default {
  namespaced: true,
  state: {
    sidebarClose: true,
    sidebarActiveElement: null,
    curReq: 1,
    authToken: null,
    authenticate: false,
    userList: [],
    gamesList: [],
    eventsList: [],
    extrasList: [],

    id:'',
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
    saveUser(state, {id, first_name, last_name, username, email, gender, phone_number, stream_link, twitch, twitter, facebook, instagram, youtube}){
      state.id = id;
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
    },
    authenticate(state){
      state.authenticate = true;
      router.push('/app/dashboard');
    },
    listUsers(state, payload){
      state.userList = payload[0];
    },
    listGames(state, payload){
      state.gamesList = payload[0];
    },
    listEvents(state, payload){
      state.eventsList = payload[0];
    },
    listExtras(state, payload){
      state.extrasList = payload[0];
    },
    SOCKET_SEND(state, message){
      console.log('message sent: ' + message);
      state.curReq++;
    },
    logout(state){
      console.log(state);
      window.localStorage.setItem('authenticated', false);
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('curUser');
      state.authToken = null;
      state.authenticate = false;
      state.curReq = 1;
      state.id = '';
      state.first_name = '';
      state.last_name = '';
      state.username = '';
      state.email = '';
      state.gender = '';
      state.phone_number = '';
      state.stream_link = '';
      state.twitch = '';
      state.twitter = '';
      state.facebook = '';
      state.instagram = '';
      state.youtube = '';
      router.push('/login');
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
        id: id,
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
    },
    logoutAction({ commit }){
      commit('logout');
    }
  },
};
