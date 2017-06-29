import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
  isAdd: {'a': 4},
  isLoginHint1:false,
  isLoginHint2:false,
  isTab:false,
  hotGame: {},
  isLogin: false,
  userInfo: {
    'jf': '',
    'lyb': '',
    'lyq': '',
    'address': '',
    'headIcon': '',
    'location': '',
    'nickname': '',
    'phone':'',
    'qq': '',
    'realName':'',
    'sex': '',
    'userId': '',
    'unreads':'',
    'token':'',
    'loginType':''
  }
};


export default new Vuex.Store({
  state
});
