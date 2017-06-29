import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
import vuefilter from "./router/vueFilter";
import store from './store';
Vue.use(VueRouter);
Vue.use(VueResource);
const index = resolve => require(['./components/index/index.vue'], resolve);
const gameHall = resolve => require(['./components/gameHall/gameHall.vue'], resolve);
const car = resolve => require(['./components/car/car.vue'], resolve);
const par = resolve => require(['./components/par/par.vue'], resolve);
const login = resolve => require(['./components/login/login.vue'], resolve);
const list = resolve => require(['./components/list/list.vue'], resolve);
const gamelist = resolve => require(['./components/gamelist/gamelist.vue'], resolve);
const integral = resolve => require(['./components/integral/integral.vue'], resolve);
const detail = resolve => require(['./components/integral/detail.vue'], resolve);
const information = resolve => require(['./components/information/information.vue'], resolve);
const informationXx = resolve => require(['./components/information/informationXx.vue'], resolve);
const search = resolve => require(['./components/search/search.vue'], resolve);
const hint = resolve => require(['./components/hint/hint.vue'], resolve);
const collect = resolve => require(['./components/collect/collect.vue'], resolve);
const register = resolve => require(['./components/register/register.vue'], resolve);
const games = resolve => require(['./components/games/games.vue'], resolve);
const Rgpassword = resolve => require(['./components/Rgpassword/Rgpassword.vue'], resolve);
const FindPassword = resolve => require(['./components/FindPassword/FindPassword.vue'], resolve);
const setpass = resolve => require(['./components/setpass/setpass.vue'], resolve);
const carMore = resolve => require(['./components/carMore/carMore.vue'], resolve);
const profile2 = resolve => require(['./components/profile2/profile2.vue'], resolve);
const profile1 = resolve => require(['./components/profile1/profile1.vue'], resolve);
const profile = resolve => require(['./components/profile/profile.vue'], resolve);
const affirm = resolve => require(['./components/affirm/affirm.vue'], resolve);
const pay = resolve => require(['./components/pay/pay.vue'], resolve);
const conversion = resolve => require(['./components/conversion/conversion.vue'], resolve);
const personalData = resolve => require(['./components/personalData/personalData.vue'], resolve);
const alterdizhi = resolve => require(['./components/personalData/alterdizhi.vue'], resolve);
const alterPass = resolve => require(['./components/personalData/alterPass.vue'], resolve);
const alterQQ = resolve => require(['./components/personalData/alterQQ.vue'], resolve);
const alterxxdz = resolve => require(['./components/personalData/alterxxdz.vue'], resolve);
const nickname = resolve => require(['./components/personalData/nickname.vue'], resolve);
const realName = resolve => require(['./components/personalData/realName.vue'], resolve);
const paydetail = resolve => require(['./components/paydetail/paydetail.vue'], resolve);
const suggest = resolve => require(['./components/suggest/suggest.vue'], resolve);
const qiandao = resolve => require(['./components/qiandao/qiandao.vue'], resolve);
const activity = resolve => require(['./components/activity/activity.vue'], resolve);
const notic = resolve => require(['./components/notic/notic.vue'], resolve);
const debit = resolve => require(['./components/debit/debit.vue'], resolve);
const exchange = resolve => require(['./components/exchange/exchange.vue'], resolve);
const debitList = resolve => require(['./components/debitList/debitList.vue'], resolve);
const exchangeList = resolve => require(['./components/exchangeList/exchangeList.vue'], resolve);
const supportBank = resolve => require(['./components/supportBank/supportBank.vue'], resolve);
const backCardPay = resolve => require(['./components/backCardPay/backCardPay.vue'], resolve);
const smsverification = resolve => require(['./components/smsverification/smsverification.vue'], resolve);
const agreement = resolve => require(['./components/agreement/agreement.vue'], resolve);
const Verification= resolve => require(['./components/Verification/Verification.vue'], resolve);
const serviceagreement = resolve => require(['./components/serviceagreement/serviceagreement.vue'], resolve);
const payresult = resolve => require(['./components/payresult/payresult.vue'], resolve);
const downUrl = resolve => require(['./components/downUrl/downUrl.vue'], resolve);
const showResult = resolve => require(['./components/showResult/showResult.vue'], resolve);
const showPayResult = resolve => require(['./components/showPayResult/showPayResult.vue'], resolve);
const routes = [
  {path: '/', redirect: './index'},
  {path: '/index', component: index},
  {path: '/gameHall', component: gameHall},
  {path: '/shop', component: car},
  {path: '/par', component: par},
  {path: '/login', component: login},
  {path: '/list/:type', component: list},
  {path: '/gamelist/:id', component: gamelist},
  {path: '/list', component: list},
  {path: '/integral',component:integral},
  {path:'/detail',component:detail},
  {path:'/information',component:information},
  {path:'/informationXx/:id',component:informationXx},
  {path:'/search',component:search},
  {path:'/hint',component:hint},
  {path:'/collect',component:collect},
  {path:'/register',component:register},
  {path:'/games/:id',component:games},
  {path:'/Rgpassword',component:Rgpassword},
  {path:'/FindPassword',component:FindPassword},
  {path:'/setpass',component:setpass},
  {path:'/carMore/:id',component:carMore},
  {path:'/profile2/:id',component:profile2},
  {path:'/profile1',component:profile1},
  {path:'/profile',component:profile},
  {path:'/personalData',component:personalData},
  {path:'/alterdizhi',component:alterdizhi},
  {path:'/alterPass',component:alterPass},
  {path:'/alterQQ',component:alterQQ},
  {path:'/alterxxdz',component:alterxxdz},
  {path:'/nickname',component:nickname},
  {path:'/realName',component:realName},
  {path:'/paydetail',component:paydetail},
  {path:'/suggest',component:suggest},
  {path:'/affirm/:id',component:affirm},
  {path:'/conversion',component:conversion},
  {path:'/pay',component:pay},
  {path:'/qiandao',component:qiandao},
  {path:'/activity',component:activity},
  {path:'/notic/:id/:newsid',component:notic},
  {path:'/debit',component:debit},
  {path:'/exchange',component:exchange},
  {path:'/debitList/:id',component:debitList},
  {path:'/exchangeList',component:exchangeList},
  {path:'/supportBank',component:supportBank},
  {path:'/backCardPay',component:backCardPay},
  {path:'/smsverification',component:smsverification},
  {path:'/agreement',component:agreement},
  {path:'/Verification',component:Verification},
  {path:'/serviceagreement',component:serviceagreement},
  {path:'/payresult',component:payresult},
  {path:'/downUrl',component:downUrl},
  {path:'/showResult',component:showResult},
  {path:'/showPayResult',component:showPayResult},
  {path:'*',redirect: './index'}
];
Vue.prototype.getUserInfo = function () {
  this.$http.get('/api/user/getUserInfo').then((response)=> {
    response = response.body;
    if (response.result === 0) {
      this.$store.state.isLogin = true;
      this.$store.state.userInfo.jf = response.jf;
      this.$store.state.userInfo.lyb = response.lyb;
      this.$store.state.userInfo.lyq = response.lyq;
      this.$store.state.userInfo.address = response.user.address;
      this.$store.state.userInfo.headIcon = response.user.headIcon;
      this.$store.state.userInfo.location = response.user.location;
      this.$store.state.userInfo.nickname = response.user.nickname;
      this.$store.state.userInfo.phone = response.user.phone;
      this.$store.state.userInfo.qq = response.user.qq;
      this.$store.state.userInfo.realName = response.user.realName;
      this.$store.state.userInfo.sex = response.user.sex;
      this.$store.state.userInfo.userId = response.user.userId;
      this.$store.state.userInfo.loginType = response.user.loginType;
      sessionStorage.setItem('13322userId',this.$store.state.userInfo.userId);
      this.getUserMessage();
    }else{
      this.$store.state.isLogin = false;
      this.$store.state.userInfo.jf = '';
      this.$store.state.userInfo.lyb = '';
      this.$store.state.userInfo.lyq = '';
      this.$store.state.userInfo.address = '';
      this.$store.state.userInfo.headIcon = '';
      this.$store.state.userInfo.location = '';
      this.$store.state.userInfo.nickname = '';
      this.$store.state.userInfo.phone = '';
      this.$store.state.userInfo.qq = '';
      this.$store.state.userInfo.realName = '';
      this.$store.state.userInfo.sex = '';
      this.$store.state.userInfo.userId = '';
      this.$store.state.userInfo.unreads = '';
      sessionStorage.removeItem('13322userId');
    }
    router.beforeEach(function (to, from, next) {
      if((to.path==='/index'||to.path==='/gamelist'||to.path==='/information'||to.path==='/list'||to.path==='/paydetail'||to.path==='/detail')){
      }else{
        $(".Load").hide();
      }
      if((to.path==='/suggest'||to.path==='/paydetail'||to.path==='/information'||to.path==='/integral'||to.path==='/collect'||to.path==='/conversion'||to.path==='/debit'||to.path==='/exchange'||to.path==='/qiandao'||to.path==='/pay'||to.path==='/profile1')&&store.state.isLogin==false){
        next({path:'/login'});
      }else {
        next();
      }
    });
  });
};


Vue.http.interceptors.push(function(request, next) {
  request.params={platformTerminal:4}
  // 运行下一个拦截器
  next();
});
//上线需修改的东西
Vue.prototype.Url="http://mgame.1332255.com";//http://m.game.13322.com
Vue.prototype.domain="1332255.com";//13322.com
Vue.prototype.pcUrl='http://platform.1332255.com/web';//Pc接口地址
Vue.prototype.GamingPayId="10092";//电竞充值id 10040
Vue.prototype.GamingId="10110";//电竞Id 10100
Vue.prototype.guessingId="10449";//体育竞猜id 10342
Vue.prototype.wxGoodsId="294";//70
Vue.prototype.getUserMessage=function(){
  this.$http.post("/api/userMsg/getUnreadMsg",{country:0,plateformId:4},{emulateJSON:true}).then(function (res) {
    res = res.body;
    if(res.result==0){
      this.$store.state.userInfo.unreads = res.data.unreads;
    }
  });
};
Vue.prototype.exitLogin = function () {
  this.$http.post("/api/login/exits",{country:0},{emulateJSON:true}).then(function (res) {
    res = res.body;
    if(res.result==0){
      this.$store.state.userInfo.token = '';
      $.fn.cookie("passport_lyy_com",null,{domain:"."+this.domain});
      let cookieremove=setInterval(function () {
        if($.fn.cookie("passport_lyy_com")){
          document.cookie="passport_lyy_com=null;expires=-1;domain=."+this.domain;
        }else{
          clearInterval(cookieremove);
        }
      },20)
      sessionStorage.removeItem('13322userId');
      this.getUserInfo();
    }
  });
};
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
  Vue.prototype.platformTerminal=2
} else if (/(Android)/i.test(navigator.userAgent)) {
  Vue.prototype.platformTerminal=3
}
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes
});
new Vue({
  components: {App},
  router,
  store,
  beforeCreate(){
    $(".Load").hide();
  }
}).$mount('#app');

Vue.filter('setTime', function (value) {
  var dates = new Date(value);
  var years = dates.getFullYear();
  var mounths = dates.getMonth() + 1;
  var days = dates.getDate();
  mounths = mounths > 9 ? mounths + '' : "0" + mounths;
  days = days > 9 ? days + '' : "0" + days;
  return years + '-' + mounths + "-" + days;
});
Vue.filter('setTimes', function (value) {
  var dates = new Date(value);
  var mounths = dates.getMonth() + 1;
  var days = dates.getDate();
  mounths = mounths > 9 ? mounths + '' : "0" + mounths;
  days = days > 9 ? days + '' : "0" + days;
  return  mounths + "-" + days;
})
Vue.filter('limitWord', function (value,number) {
  if (value){
    return value.substring(0,number)+"..."
  }
})
Vue.filter('getTime', function (value) {
  var dates = new Date(value);
  var years = dates.getFullYear();
  var mounths = dates.getMonth() + 1;
  var days = dates.getDate();
  var hours = dates.getHours();
  var minutes = dates.getMinutes();
  var seconds = dates.getSeconds();
  mounths = mounths > 9 ? mounths + '' : "0" + mounths;
  days = days > 9 ? days + '' : "0" + days;
  hours = hours > 9 ? hours + '' : "0" + hours;
  minutes = minutes > 9 ? minutes + '' : "0" + minutes;
  seconds = seconds > 9 ? seconds + '' : "0" + seconds;
  if(value){
    return years + '-' + mounths + "-" + days + " " + hours + ":" + minutes + ":" + seconds;
  }
});

