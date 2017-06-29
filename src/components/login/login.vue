<template>
    <div id="login">
      <div><span class="close icon-lgcs" @click="close"></span></div>
      <div class="logo"><img src="../../../static/images/login/lglogo.png" alt="玩一下"></div>
      <ul class="login-main">
        <li id="userName">
          <i><img src="../../../static/images/login/lguser.png"></i>
          <input type="text" placeholder="请输入您的账号" v-model="user.name" @focus="userFocus" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
        </li>
        <li id="userPwd">
          <i> <img src="../../../static/images/login/lgps.png"></i>
          <input type="password" placeholder="请输入您的密码" v-model="user.pwd"  onpaste="return false" @focus="userFocus" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
          <i @click="changType()"><img src="../../../static/images/login/biyan.png"></i>
        </li>
        <li id="verCode" v-if="showVerCode">
          <i></i>
          <input type="text" placeholder="请输入验证码" v-model="user.vCode"  onpaste="return false" @focus="userFocus" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
          <div class="v_container"><img class="verifyPic" @click="_getVerfyPic"></div>
        </li>
        <li class="hint" v-show="hintWord">{{hintWord}}</li>
        <li>
          <div @click="loginUser" id="loginUser">登录</div>
        </li>
        <li class="register">
          <span @click="_register">账号注册</span>
          <span @click="_findPassword">忘记密码</span>
        </li>
        <li class="otherLogin">
          <span></span>
          <b>其他登录方式</b>
          <span></span>
        </li>
        <li class="loginWays">
          <!--<dl class="QQLogin" @click="QQLogin">-->
            <!--<dt></dt>-->
            <!--<dd style="text-align: center">QQ</dd>-->
          <!--</dl>-->
          <dl class="weiboLogin" @click="weiboLogin">
            <dt></dt>
            <dd style="text-align: center">微博</dd>
          </dl>
          <dl class="weixinLogin" @click="_weixinLogin" v-if="weixinLogin">
            <dt></dt>
            <dd style="text-align: center">微信</dd>
          </dl>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">

  import {mapState} from 'vuex';

 export default {
   data(){
     return {
       user:{name:'',pwd:'',vCode:''},
       hintWord:'',
       changTextType:false,
       gid:'',
       cid:'',
       url:'',
       out_id:'',
       loginClick:true,
       inputNum:0,//输错次数
       showVerCode:false,//验证码框展示
       timeGlass:0,//沙漏时间
       timer:'',
       weixinLogin:false
     }
   },
   created(){
     let Requres = new UrlSearch();
     this.gid = Requres.gid||4;
     this.cid = sessionStorage.getItem("gameCid")||sessionStorage.getItem("registerCid")||'';
     this.url = Requres.url;
     this.out_id = Requres.out_id;
     if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
        this.weixinLogin = true;
     }
   },
   computed:{
     ...mapState(['userInfo','isLoginHint1','isLoginHint2'])
   },
   watch:{
     '$route':function () {
       if(this.$route.path.indexOf('login')!=-1){
         this.user.name="";
         this.user.pwd="";
         this.hintWord='';
         this.changTextType=false;
         this.loginClick=true;
         this.showVerCode=false;
         if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
           this.weixinLogin = true;
         }else {
           this.weixinLogin = false;
         }
       }
     }
   },
   methods:{
     close(){
         let self=this;
         let Requres = new UrlSearch();
         if(sessionStorage.getItem('fromsetpass')==1){
           self.$router.push('/par');
           sessionStorage.removeItem('fromsetpass');
         }else {
           if(self != top&&window.location.href.indexOf(this.GamingId)!=-1){
             if(Requres.url){
               window.location.href=decodeURIComponent(Requres.url);
             }else {
               window.location.href=this.Url+"/games/"+this.GamingId+"?"+Math.random()
             }
           }else{
             window.history.back()
           }

         }
//       debugger
     },
     changType(){
       this.changTextType=!this.changTextType;
       if (this.changTextType){
         $('#userPwd').find('input').attr('type','text');
         $('#userPwd').find('img').eq(1).attr('src','../../../static/images/login/lgm.png');
       }else {
         $('#userPwd').find('input').attr('type','password');
         $('#userPwd').find('img').eq(1).attr('src','../../../static/images/login/biyan.png');
       }
     },
     loginUser(){
       if(!this.loginClick){
            return false;
         }
        this.loginClick=false;
        let username = this.user.name.replace(/(^\s*)|(\s*$)/g, "");
        let userpwd = this.user.pwd.replace(/(^\s*)|(\s*$)/g, "");
        let _this = this;
       let day = new Date().getTime();
       if (!username){
         this.hintWord = "请输入账户名";
         _this.loginClick=true;
         return;
       }
       if (!userpwd){
         this.hintWord = "请输入密码";
         _this.loginClick=true;
         return;
       }
       if(userpwd.length >= 6){
         if(this.showVerCode){
           this.loginClick=true;
           if(this.user.vCode==''){
             this.hintWord = "请输入验证码";
             return;
           }else{
             this.$http.post('/api/captcah/vilidataImagCode',{country:0,captcha:this.user.vCode},{emulateJSON:true}).then(function (res) {
               res = res.body;
               if(res.result==0){
                 this.loginHttp(username,userpwd);
               }else {
                 this.hintWord = "验证码错误";
               }
             });
           }
         }else{
           this.loginHttp(username,userpwd);
         }
       }else {
         _this.hintWord = "密码长度大于等于6位";
         _this.loginClick=true;
       }
     },
     loginHttp(username,userpwd){
       let _this = this;
       let day = new Date().getTime();
       this.$http.post("/api/login/doLogin/V2",{country:0,account:username,password:hex_md5(userpwd).toUpperCase(),autologin:true,channelId:this.cid},{emulateJSON:true}).then((response)=>{
         response = response.body;
         if(response.result == 0){
           clearInterval(this.timer);
           this.loginClick=true;
           this.$store.state.isLogin = true;
           this.hintWord= "";
           this.user.name="";
           this.user.pwd="";
           if(this.gid == 10006&&this.url!=null&&this.url.length>1){
             var token = document.cookie.match(/passport_lyy_com=(\S*)/)[1];
             if(token.indexOf(";")!=-1){
               token = token.substring(0,token.length-1);
             }
             window.location.href = decodeURIComponent(this.url)+"?token="+token;
           }else if(this.url!=null&&this.url.length>1){
             this.url=decodeURIComponent(this.url);
             if (this.url.indexOf("?") == -1) {
               window.location.href = this.url + "?uid=" + response.user.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + response.user.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
             }else{
               window.location.href = this.url + "&uid=" + response.user.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + response.user.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
             }
           } else {
             this.$store.state.userInfo.token = response.token;
             $.fn.cookie("token",response.token);
             this.getUserInfo();
             $('#userName input').blur();
             $('#userPwd input').blur();
             let self=this;
             let Requres = new UrlSearch();
             if(Requres.setpass==1||Requres.alterPass==1){
               this.$router.push({path:'/par'});
             }else {
               if(self != top&&window.location.href.indexOf(this.GamingId)!=-1){
                 if(Requres.url){
                   window.location.href=decodeURIComponent(Requres.url);
                 }else {
                   window.location.href=this.Url+"/games/"+this.GamingId+"?"+Math.random();
                 }
               }else{
                 window.history.back()
               }
             }
           }

         } else if(response.result == 13) {
           _this.hintWord= "用户不存在";
           _this.loginClick=true;
         } else if(response.result == 11) {
           _this.loginClick=true;
           _this.hintWord= "登录名或者密码错误";
         } else if(response.result == 402){
           clearInterval(this.timer);
           sessionStorage.removeItem('verError');
           _this.hintWord= response.msg;
           if(this.gid == 10006&&this.url!=null&&this.url.length>1){
             var token = document.cookie.match(/passport_lyy_com=(\S*)/)[1];
             if(token.indexOf(";")!=-1){
               token = token.substring(0,token.length-1);
             }
             window.location.href = decodeURIComponent(this.url)+"?token="+token;
           }else if(this.url!=null&&this.url.length>1){
             this.url=decodeURIComponent(this.url);
             if (this.url.indexOf("?") == -1) {
               window.location.href = this.url + "?uid=" + response.user.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + response.user.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
             }else{
               window.location.href = this.url + "&uid=" + response.user.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + response.user.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
             }
           } else {
             this.$store.state.userInfo.token = response.token;
             $.fn.cookie("token",response.token);
             this.getUserInfo();
//               this.getUserMessage();
             this.$store.state.isLoginHint2= true;
             $('html').css('overflow','hidden');
             $('body').css('overflow','hidden');
             let Requres = new UrlSearch();
             if(Requres.setpass==1||Requres.alterPass==1){
               this.$router.push({path:'/par'});
             }else {
               if(self != top&&window.location.href.indexOf(this.GamingId)!=-1){
                 if(Requres.url){
                   window.location.href=decodeURIComponent(Requres.url);
                 }else {
                   window.location.href=this.Url+"/games/"+this.GamingId+"?"+Math.random();
                 }
               }else{
                 window.history.back()
               }
             }
           }
         }else if(response.result == 401){
           clearInterval(this.timer);
           sessionStorage.removeItem('verError');
           if(this.platformId == 100002&&this.url!=null&&this.url.length>1){
             var token = document.cookie.match(/passport_lyy_com=(\S*)/)[1];
             if(token.indexOf(";")!=-1){
               token = token.substring(0,token.length-1);
             }
             window.location.href = decodeURIComponent(this.url)+"?token="+token;
           }else if(this.url!=null&&this.url.length>1){
             this.url=decodeURIComponent(this.url);
             if (this.url.indexOf("?") == -1) {
               window.location.href = this.url + "?uid=" + response.user.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + response.user.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
             }else{
               window.location.href = this.url + "&uid=" + response.user.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + response.user.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
             }
           } else {
             this.$store.state.userInfo.token = response.token;
             $.fn.cookie("token",response.token);
             this.getUserInfo();
             this.$store.state.isLoginHint1= true;
             $('html').css('overflow','hidden');
             $('body').css('overflow','hidden');
             let Requres = new UrlSearch();
             if(Requres.setpass==1||Requres.alterPass==1){
               this.$router.push({path:'/par'});
             }else {
               if(self != top&&window.location.href.indexOf(this.GamingId)!=-1){
                 if(Requres.url){
                   window.location.href=decodeURIComponent(Requres.url);
                 }else {
                   window.location.href=this.Url+"/games/"+this.GamingId+"?"+Math.random();
                 }
               }else{
                 window.history.back();
               }
             }
           }
         }else if(response.result == 270){
           this.showVerCode = true;
           let _this = this;
           setTimeout(function () {
             _this._getVerfyPic();
             _this.loginClick=true;
             _this.hintWord = '登录名或者密码错误';
           },20);
         }else{
           this.loginClick=true;
           this.hintWord = response.msg;
         }

         this.gid='';
         this.cid='';
         this.url='';
         this.out_id='';
       });

     },
     userFocus(){
       this.hintWord = "";
     },
     _register(){
       let Requres = new UrlSearch();
       if(Requres.cid){
         sessionStorage.setItem("registerCid",Requres.cid);
         sessionStorage.setItem("registerUrl",decodeURIComponent(Requres.url));
       }
       if(Requres.gid){
         sessionStorage.setItem("registerGid",Requres.gid);
       }
       this.$router.push({path:'/register'});
     },
     _findPassword(){
       this.$router.push({path:'/FindPassword'});
     },
     QQLogin(){
       let sanfanurl =this.Url + sessionStorage.getItem('sanfanurl');
        this.$http.post('/api/QQLogin/authorize',{currentURL:decodeURIComponent(this.url)?decodeURIComponent(this.url):encodeURI(sanfanurl),channelId:this.cid,country:0},{emulateJSON:true}).then(function (res) {
         res = res.body;
          window.location.href = res.authorizeURL;
       }, function (err) {
          console.log(err);
        });
     },
     weiboLogin(){
       let sanfan;
       if(sessionStorage.getItem('sanfanurl')){
         sanfan=sessionStorage.getItem('sanfanurl');
       }
       let url=this.url?this.url:"";
       let sanfanurl = this.Url + sanfan;
       this.$http.post('/api/weiBoLogin/authorize',{currentURL:decodeURIComponent(url)?decodeURIComponent(url):encodeURI(sanfanurl),channelId:this.cid,country:0},{emulateJSON:true}).then(function (res) {
         res = res.body;
         window.location.href = res.authorizeURL;
       }, function (err) {
         console.log(err);
       });
     },
     _weixinLogin(){
        this.$http.post('/api/wxLogin/authorize').then(function (res) {
          res = res.body;
//          sessionStorage.setItem('weixinLogin','1');
          window.location.href = res.authorizeURL;
        }, function (err) {
          console.log(err);
        });
     },
     _getVerfyPic(){
       $('.verifyPic').attr('src',this.Url+'/api/captcah/getImgCode?d='+(new Date()).getTime().toString());
     }
//     _hourglass(){
//       let _this = this;
//       this.timer = setInterval(function () {
//         if(_this.timeGlass>=300){
//           _this.inputNum = 0;
//           clearInterval(this.timer);
//           sessionStorage.removeItem('verError');
//         }else {
//           _this.timeGlass++;
//         }
////         console.log(_this.timeGlass);
//       },1000);
//     }
   }
 }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  #login {
    position: absolute;
    width: 100%;
    min-height:100% ;
    z-index: 3;
    background-color: #fff;
    background: url("../../../static/images/login/lgbg.jpg") no-repeat;
    background-size:100% 100%;
    font-size: .14rem;
  }
  #login .close {
    width: .5rem;
    height:.5rem;
    line-height:.5rem;
    text-align:center ;
    position: absolute;
    right: .1rem;
    font-size: .2rem;
    top: .1rem;
    color: #fff;
    font-weight: 400;
  }
  #login .logo {
    overflow:hidden;
    text-align: center;
    width: 80%;
    height: 1.5rem;
    margin: .6rem auto 0;
    img {
      display: block;
      display:inline-block;
      margin: 0 auto;
      height: 100%;
      width: 60%;
    }
  }
  .login-main {
    width: 85%;
    margin:0 auto;
  }
  #userName {
    height:0.4rem;
    border-bottom:1px solid #ebebeb;
    padding:.2rem 0 0;
    i {
      width: .2rem;
      height:.2rem;
      float: left;
      margin:0 0.15rem 0 0;
      text-aglin:center;
      img {
        display: block;
        width: 100%;
        height:100%;
        float: left;
      }
    }
    input {
      display: inline-block;
      margin-top:-0.02rem ;
      float: left;
      outline: 0 none;
      width:80%;
      height:0.3rem;
      line-height:0.3rem;
      background: 0;
      color: #fff;
    }

  }
  #userPwd {
    height:0.6rem;
    border-bottom:1px solid #ebebeb;
    i:nth-child(1) {
      width: .2rem;
      height:.2rem;
      float: left;
      margin:0.2rem 0.15rem 0 0;
      text-aglin:center;
      img {
        display: block;
        width: 100%;
        height:100%;
        float: left;
      }
    }
    input {
      display: inline-block;
      margin-top:0.17rem ;
      float: left;
      outline: 0 none;
      width:70%;
      height:0.3rem;
      line-height:0.3rem;
      background: 0;
      color: #fff;

    }
    i:nth-child(3) {
      margin-top:0.2rem ;
      width: .2rem;
      height:.2rem;
      float: right;
      img {
        display: block;
        width: 100%;
        height:100%;
        float: left;
      }
    }
  }
  #verCode {
    height:0.6rem;
    border-bottom:1px solid #ebebeb;
    /*padding:.1rem 0 0;*/
    i {
      display: block;
      width: .2rem;
      height:.2rem;
      float: left;
      margin:0.2rem 0.15rem 0 0;
      text-aglin:center;
      background: url('./yzm.png') no-repeat center;
      background-size: 90% 90%;
    }
    input {
      display: inline-block;
      margin-top:0.17rem;
      float: left;
      outline: 0 none;
      width:50%;
      height:0.3rem;
      line-height:0.3rem;
      background: 0;
      color: #fff;
      /*border-bottom:1px solid #ebebeb;*/
    }
    .v_container {
      height:0.4rem;
      float: right;
      width: 30%;
      padding-top:0.1rem;
      img {
        position: relative;
        border: 0 none;
        display: block;
        height:0.4rem;
        width:100%;
      }
    }
  }
  #loginUser {
    width:100%;
    height:0.4rem;
    background:#e7384a ;
    border-radius: 20px;
    font-size: 0.17rem;
    margin-top: 0.15rem;
    text-align: center;
    line-height:0.4rem;
    color: #fff;
  }
  .register {
    width: 100%;
    height: .4rem;
    line-height:.4rem;

    span:nth-child(1) {
      display: block;
      display: inline-block;
      float: left;
      color:#fff;
    }
    span:nth-child(2) {
      display: block;
      display: inline-block;
      float: right;
      color:#fff;
    }
  }
  .otherLogin {
    width:100%;
    height:.16rem;
    display: block;
    color: #fff;
    display:flex;
    span{
      display: block;
      flex: 1;
      position: relative;
      border-top: 1px solid pink;
      top:0.08rem;
    }
    b {
      font-size:0.14rem;
      padding: 0 0.12rem;
    }
  }
  .loginWays {
    height:.5rem;
    margin:.3rem auto;
    width: 70%;
    display:flex;
    /*padding: 0 .6rem;*/
    clear:both;
    color:#fff;
    dl{
      flex:1;
      dt {
        width: 100%;
        height:0.4rem;
        display: block;
        margin: 0.1rem auto;
        dd {
          display: block;
          text-align: center;
        }
        img {
          display: block;
          /*display: inline-block;*/
          margin: 0 auto;
          width:100%;
          height:100%;
        }
      }
    }
  }
  #login .weixinLogin dt{
    display: block;
    display: inline-block;
    background: url(./weix.png) no-repeat center center;
    background-size:0.4rem 0.4rem;
  }
  #login .weiboLogin dt{
    display: block;
    display: inline-block;
    background: url(./lgwb.png) no-repeat center center;
    background-size:0.4rem 0.4rem;
  }
  #login .QQLogin dt{
    display: block;
    display: inline-block;
    background: url(./lgqq.png) no-repeat center center;
    background-size:0.4rem 0.4rem;
  }
  .hint {
    width: 100%;
    text-align: center;
    margin:.1rem 0;
    font-size: 0.15rem;
    color: red;
  }
  input::-webkit-input-placeholder {
    color:#fff;
    font-size: 0.16rem;
  }
  input::-moz-placeholder {
    color:#fff;
    font-size: 0.16rem;
  }
  input::-moz-placeholder {
    color:#fff;
    font-size: 0.16rem;
  }
  input:-ms-input-placeholder {
    color:#fff;
    font-size: 0.16rem;
  }
</style>
