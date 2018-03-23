import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'
import axios from 'axios';
import VueQuillEditor from 'vue-quill-editor'
import {timeFormat} from "./util/timeFormat";
import './util/validate'
import FastClick from 'fastclick'
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueQuillEditor);
Vue.use(VModal)
Vue.filter('timeFormat',timeFormat);
axios.defaults.withCredentials=true;
FastClick.attach(document.body);
const store = new Vuex.Store({
  state:{
    nickname:'',
    userId:'',
    email:'',
    follows:[],
    fans:[],
    collectedNum:0,
    isNightMode:false,
    api:'http://www.vjianshu.xyz:3000'
  },
  mutations:{
    updateUserInfo(state,nickname){
      state.nickname = nickname
    },
    updateCollectedNum(state,collectedNum){
      state.collectedNum = collectedNum
    },
    updateUserId(state,userId){
      state.userId = userId
    },
    updateUserEmail(state,email){
      state.email = email
    },
    updateUserFollows(state,follows){
      state.follows = follows
    },
    updateUserFans(state,fans){
      state.fans = fans
    },
    updateIsNightMode(state,isNightMode){
      state.isNightMode = isNightMode
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
