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
    wsState: 3,

    //information arrays
    userList: [],
    gamesList: [],
    eventsList: [],
    extrasList: [],
    userRuns: [],
    schedule: [],

    //current user
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
    permissions: ['admin'],
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
    loadUser(state, {id, first_name, last_name, username, email, gender, phone_number, stream_link, twitch, twitter, facebook, instagram, youtube, permissions}){
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
      state.permissions = permissions;
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
    listUserRuns(state, payload){
      state.userRuns = payload[0][0];
    },
    listSchedule(state, payload){
      state.schedule = payload[0];
    },
    updateSchedule(state, payload){
      //console.log("diff", state.schedule.filter(({ id: id1 }) => !payload.some(({ id: id2 }) => id2 === id1)))
      //console.log("payload:", payload);
      //console.log("schedule:", state.schedule);
      for(let val in payload){
        payload[val].order = Number(val) + 1;
      }
      state.schedule = payload;
    },
    SOCKET_SEND(state, message){
      console.log('message sent: ' + message);
      state.curReq++;
    },
    logout(state){
      //console.log(state);
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
      state.permissions = [];
      state.userList = [];
      state.gamesList = [];
      state.eventsList = [];
      state.extrasList = [];
      state.userRuns = [];
      state.schedule = [];
      router.push('/login');
    },
    wsState(state, curState){
      state.wsState = curState;
    },
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
        await dispatch('loadUser', response.data.id);
      }
    },
    async loadUser({ commit }, id){
      const user = await UserService.getUser(id);
      //const wsPayload = {"endpoint":"getUser", "id":state.curReq, "info":{"id": id}};
      //commit('SOCKET_SEND', wsPayload);
      //console.log(user.data.res[0][0]);
      commit('loadUser', {
        id: id,
        first_name: user.data.res[0][0].first_name,
        last_name: user.data.res[0][0].last_name,
        username: user.data.res[0][0].username,
        email: user.data.res[0][0].email,
        gender: user.data.res[0][0].gender,
        phone_number: user.data.res[0][0].phone_number,
        stream_link: user.data.res[0][0].stream_link,
        twitch: user.data.res[0][0].twitch,
        twitter: user.data.res[0][0].twitter,
        facebook: user.data.res[0][0].facebook,
        instagram: user.data.res[0][0].instagram,
        youtube: user.data.res[0][0].youtube,
        permissions: user.data.res[0][0].permissions,
      })
    },
    logoutAction({ commit }){
      commit('logout');
    }
  },
};
