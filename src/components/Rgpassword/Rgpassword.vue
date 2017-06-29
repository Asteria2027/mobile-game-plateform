<template>
  <div id="Rgpassword">
    <div class="title">
      <i class="iconBack" @click="backUrl"></i>
      <h3>验证手机</h3>
    </div>
    <div class="RgpasswordContext">
      <ul>
        <li class="pwd borderBottom-1px">
          <input type="password" placeholder="8-14个字符，区分大小写" maxlength="14" onpaste="return false" v-model="pwd" @focus="_pwdFocus" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
          <i class="eyeClose" @click="isPwdShow"></i>
        </li>
        <li class="rpwd borderBottom-1px">
          <input type="password" placeholder="请再次输入密码" maxlength="14" onpaste="return false" v-model="rpwd" @focus="_pwdFocus" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
          <i class="eyeClose" @click="isRpwdShow"></i>
        </li>
        <li class="borderBottom-1px">
          <span>请输入推广编码：</span>
          <input type="text" placeholder="(非必填)" class="iCode" id="code">
        </li>
      </ul>
      <div class="RgpasswordHint" v-if="isHint">{{rhint}}</div>
      <div class="_register" @click="_register">注册</div>
      <p class="agree">注册即表示同意 &nbsp;<router-link to="/agreement">《用户协议》</router-link></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        pwd:'',
        rpwd:'',
        rhint:'',
        isHint:false
      }
    },
    created(){
      this.$nextTick(()=>{
        if(sessionStorage.getItem("gameCid")){
          $('#code').val(sessionStorage.getItem("gameCid"));
          $('.iCode').attr("readonly","readonly");
        }
     })

    },
    methods:{
      backUrl(){
        window.history.back();
      },
      _register(){
        if(this.pwd&&this.rpwd){
          if(this.pwd.length>=8&&this.pwd.length<=14){
            if(RegExp(/^[A-Za-z0-9]*$/g).test(this.pwd)){
              if(this.pwd===this.rpwd){
                let sCode = Number(sessionStorage.getItem('playoneRegisterSMS'));
                let phone = Number(sessionStorage.getItem('playoneRegisterPhone'));
                let platformId=4
                if(sessionStorage.getItem("registerGid")){
                  platformId=sessionStorage.getItem("registerGid");
                }
                let pwd = $('.pwd input').val();
                let invitationCode = $('.iCode').val();
                this.$http.post('/api/register/doRegister',{country:0,account:phone,smsCode:sCode,password:hex_md5(pwd).toUpperCase(),platformId:platformId,type:2,inviteCode:invitationCode,operateType:1,partnerNo:invitationCode,channelId:sessionStorage.getItem("registerCid"),referrerWebsiteUrl:sessionStorage.getItem("gameUrl"),promoteUrl:sessionStorage.getItem("gameUrl")},{emulateJSON:true}).then(function(res){
                  res = res.body;
                  if(res.result==0){
                    sessionStorage.removeItem("registerCid")
                    sessionStorage.removeItem("registerGid")
                    sessionStorage.removeItem('playoneRegisterSMS');
                    sessionStorage.removeItem('playoneRegisterPhone');
                      if(sessionStorage.getItem("gameCid")){
                        this.$http.post("http://m.partner.13322.com/partnerCenterMobile/reg/addSpread",{spreadUserId:sessionStorage.getItem("gameCid"),gameId:sessionStorage.getItem("gameId"),type:1,regUserId:res.userId},{emulateJSON:true}).then((response)=>{
                          sessionStorage.removeItem("gameCid")
                          sessionStorage.removeItem("gameId")
                        });
                      }
                    this.$http.post("/api/login/doLogin",{country:0,account:phone,password:hex_md5(pwd).toUpperCase(),autologin:true},{emulateJSON:true}).then((response)=>{
                      response = response.body;
                      if(response.result == 0){
                        this.pwd = '';
                        this.rpwd='';
                        $('.iCode').val("");
                        this.getUserInfo();
                        this.getUserMessage();
                        if(sessionStorage.getItem("registerUrl")){
                            debugger
                              top.location.href=sessionStorage.getItem("registerUrl");
                              sessionStorage.removeItem("registerUrl")
                        }else{
                          this.$router.push('/par');
                        }
                      }
                    });
                  }else{
                    $('.iCode').removeAttr("readonly");
                    this.isHint = true;
                    this.rhint = res.msg;
                  }
                })
              }else {
                this.isHint = true;
                this.rhint = '您输入的两次密码不一致,请重新输入';
              }
            }else{
              this.isHint = true;
              this.rhint = '密码仅能为数字,字母';
            }
          }else{
            this.isHint = true;
            this.rhint = '您输入的密码长度不足八位,请重新输入';
          }
        }else {
          this.isHint = true;
          this.rhint = '请输入密码';
        }
      },
      _pwdFocus(){
        this.isHint = false;
        this.rhint = '';
      },
      isPwdShow(){
        if($('.pwd i').hasClass('eyeClose')){
          $('.pwd i').removeClass('eyeClose').addClass('eyeOpen');
          $('.pwd input').attr('type','text');
        }else {
          $('.pwd i').removeClass('eyeOpen').addClass('eyeClose');
          $('.pwd input').attr('type','password');
        }
      },
      isRpwdShow(){
        if($('.rpwd i').hasClass('eyeClose')){
          $('.rpwd i').removeClass('eyeClose').addClass('eyeOpen');
          $('.rpwd input').attr('type','text');
        }else {
          $('.rpwd i').removeClass('eyeOpen').addClass('eyeClose');
          $('.rpwd input').attr('type','password');
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #Rgpassword {
    height: 100%;
    overflow: hidden;
    background: #fff;
  }
  #Rgpassword .title {
    position: relative;
    height: 0.45rem;
    line-height: 0.45rem;
    width: 100%;
    text-align: center;
    background: #e7384a;
    font-size: 0.2rem;
    color: #fff;
    .iconBack {
      position: absolute;
      top:0;
      left:0.05rem;
      width: 0.4rem;
      height:100%;
      background: url("./back.png") no-repeat center;
      background-size: 60% 60%;
    }
  }
  #Rgpassword .RgpasswordContext {
    margin:0.2rem;
    ul>li {
      line-height:0.5rem;
      height: 0.5rem;
      font-size: 0.16rem;
      /*padding-left: 0.2rem;*/
      span {
        display: block;
        display: inline-block;
        color:darkgray;
        float: left;
        width: 40%;
      }
      >input{
         display: block;
        display: inline-block;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-top: 0.1rem;
        width: 60%;
      }
    }
    .eyeClose {
      display: inline-block;
      float: right;
      height: 50%;
      width: 0.3rem;
      background: url("./biyan1.png") no-repeat;
      background-size: 100%;
      margin-top: 0.1rem;
    }
    .eyeOpen {
      display: inline-block;
      float: right;
      height: 50%;
      width: 0.3rem;
      background: url("./lgm1.png") no-repeat;
      background-size: 100%;
      margin-top: 0.1rem;
    }
  }
  #Rgpassword .RgpasswordHint {
    text-align: center;
    color: #f00;
    line-height:0.4rem;
  }

  #Rgpassword ._register {
    width: 90%;
    margin: 0 auto;
    font-size: .2rem;
    margin-top: .2rem;
    text-align: center;
    border: 1px solid #d1d3d6;
    border-radius: .2rem;
    padding: .15rem 0;
    background: #e7384a;
    color: #fff;
  }
  .agree {
    line-height:0.3rem;
    width: 80%;
    margin: 5% auto 0;
    text-align: center;
    font-size: .15rem;
    color: #b4b4b4;
  a {
    color: #e7384a;
  }
  }
</style>
