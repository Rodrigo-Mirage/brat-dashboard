import Vue from 'vue';
import Vuex from 'vuex';
import websocket from '../plugins/websocket'

import layout from './layout';

Vue.use(Vuex);

const ws = websocket();
export default new Vuex.Store({
  modules: {
    layout,
  },
  plugins:[
    ws,
  ]
});
