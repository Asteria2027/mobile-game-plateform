<template>
    <div id="register">
      <div class="title">
        <i class="iconBack" @click="backUrl"></i>
        <h3>注册用户</h3>
      </div>
      <div class="regiterContext">
        <ul>
          <li class="borderBottom-1px phoneLi" >
            <div>+86</div>
            <div class="phone"><input type="text" placeholder="请输入您的手机号" maxlength="11" @blur="phoneBlur" @focus="phoneFocus"></div>
          </li>
          <li class="borderBottom-1px">
            <div class="verificationCode"><input type="text" placeholder="请输入验证码" maxlength="6" @focus="codeFocus" @blur="codeBlur"></div>
            <button class="gCode" @click="getCode">{{countDown}}</button>
          </li>
        </ul>
        <div class="registerHint" v-if="isShow">{{rHint}}</div>
        <div class="lastStep" @click="lastStep">下一步</div>
        <p>注册即表示同意 &nbsp;<a href="/agreement/">《用户协议》</a></p>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  let timer;
  export default {
    data(){
      return {
        phone:'',
        vCode:'',
        isShow:false,
        rHint:'',
        countDown:'获取验证码',
        phoneCorrect:false,
        smscode:'',
        platformIdVal:'',
        phoneNumber:'',
        isGetCode:false
      }
    },
    created(){
      this.$nextTick(function () {
        let Requres = new UrlSearch();
        if(Requres.cid){
          sessionStorage.setItem("registerCid",Requres.cid);
          sessionStorage.setItem("registerUrl",decodeURIComponent(Requres.url))
        }
        if(Requres.gid){
          sessionStorage.setItem("registerGid",Requres.gid);
        }
        this.phoneNumber = $('.phone input').val();
      });
    },
    methods:{
      verificationPhone(){
        let val = $('.phone input').val();
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(val))){
          this.isShow = true;
          this.rHint="请输入正确的手机号码";
        }else {
          this.phoneNumber = $('.phone input').val();
          this.$http.post('/api/register/findAccountName',{country:0,account:this.phoneNumber,type:6},{emulateJSON:true}).then(function (res) {
            res = res.body;
            console.log(res)
            if(res.result === 0){
              this.phoneCorrect = true;
            }else {
              this.isShow = true;
              this.rHint="该手机号已注册";
            }
          })
        }
      },
      phoneBlur(){
//        this.verificationPhone();
      },
      codeBlur(){
//        this.verificationPhone();
      },
      backUrl(){
        window.history.back();
      },
      phoneFocus(){
        this.isShow = false;
        this.rHint="";
      },
      codeFocus(){
        if($('.phone input').val()){
          this.isShow = false;
          this.rHint="";
        }
      },
      getCode(){
        this.isGetCode = true;
        let val = $('.phone input').val();
        if(!val){
          this.isShow = true;
          this.rHint="请输入手机号码";
        }else {
          if(!(/^1(3|4|5|7|8)\d{9}$/.test(val))){
            this.isShow = true;
            this.rHint="请输入正确的手机号码";
          }else {
            this.phoneNumber = val;
            this.$http.post('/api/register/findAccountName',{country:0,account:this.phoneNumber,type:6},{emulateJSON:true}).then(function (res) {
              res = res.body;
//              console.log(res)
              if(res.result === 0){
                this.phoneCorrect = true;
                if(this.phoneCorrect){
                  $('.gCode').attr('disabled','false');
                  $('.gCode').css('background-color','rgb(209, 208, 208)');
                  $('.verificationCode input').val("");
                  let getPath = new UrlSearch();
                  if(sessionStorage.getItem("registerGid")){
                    this.platformIdVal=sessionStorage.getItem("registerGid")
                  }else{
                    this.platformIdVal = getPath.gid||4;
                  }
                  this.phoneNumber = $('.phone input').val();
                  this.$http.post('/api/register/sendPhoneCode',{country:0,operateType:1,account:this.phoneNumber,platformId:this.platformIdVal||4},{emulateJSON:true}).then(function(res){
                    res = res.body;
                    if(res.result===0){
                      this.isShow = false;
                      this.rHint="";
                    }
                  }, function (error) {
                    this.isShow = true;
                    this.rHint="服务器请求失败";
                  });
                  this.countDown = 60;
                  let _this = this;
                  timer = window.setInterval(function () {
                    _this.countDown=_this.countDown-1;
                    if(_this.countDown == 0){
                      clearInterval(timer);
                      _this.countDown="获取验证码";
                      $('.gCode').removeAttr('disabled');
                      $('.gCode').css('background-color','#e7384a');
                    }
                  },1000);
                }
                else {
                  this.rHint="请输入正确的手机号码";
                }

              }else {
                this.isShow = true;
                this.rHint="该手机号已注册";
              }
            })
          }
        }
      },
      lastStep(){
          this.phoneNumber = $('.phone input').val();
          this.smscode = $('.verificationCode input').val();
          if(!this.phoneNumber){
            this.isShow = true;
            this.rHint="请输入手机号码";
          }else {
            if(this.isGetCode){
              if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.phoneNumber))){
                this.isShow = true;
                this.rHint="请输入正确的手机号码";
              }else {
                this.$http.post('/api/register/findAccountName',{country:0,account:this.phoneNumber,type:6},{emulateJSON:true}).then(function (res) {
                  res = res.body;
                  console.log(res)
                  if(res.result === 0){
                    this.phoneCorrect = true;
                  }else {
                    this.isShow = true;
                    this.rHint="该手机号已注册";
                  }
                })
              }
              if(this.smscode==""&&this.phoneCorrect){
//            debugger
                this.rHint = '请输入验证码';
                this.isShow = true;
              }
              if(this.smscode!=""&&this.phoneCorrect){
                this.$http.post('/api/register/valiSmsCode',{country:0,operateType:1,account:this.phoneNumber,platformId:this.platformIdVal,smsCode:this.smscode,type:5},{emulateJSON:true}).then(function(res){
                  res = res.body;
                  if(res.result===0){
                    $('.verificationCode input').val("");
                    $('.phone input').val("");
                    $('.gCode').removeAttr('disabled');
                    $('.gCode').css('background-color','#e7384a');
                    this.rHint="";
                    clearInterval(timer);
                    this.countDown='获取验证码';
                    this.$router.push({path:'/Rgpassword'});
                    sessionStorage.setItem('playoneRegisterSMS',this.smscode);
                    sessionStorage.setItem('playoneRegisterPhone',this.phoneNumber);
                  }else if(res.result===6){
                    this.rHint = '验证码错误';
                    this.isShow = true;
                  }
                });
              }
            }else {
              this.isShow = true;
              this.rHint="请点击获取验证码";
            }
          }
      }
    }
  }
</script>

<style lang="less" rel="less">
  #register {
    height: 100%;
    overflow: hidden;
    background: #fff;
  }
  #register .title {
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
      background: url("./back.png") no-repeat;
      background-size: 60% 60% ;
      background-position: center;
    }
  }
  #register .regiterContext {
    margin: .3rem 0.2rem 0 0.2rem;
    ul {
      li {
        font-size: 0.2rem;
        width: 100%;
        height:.3rem;
        padding-bottom: .1rem;
        line-height:.3rem;
        div {
          float: left;
          height:100%;
        }
      }
    }
  }
  #register ul li {
    display: block;
    display: flex;
    width: 100%;
  }
  #register ul .phoneLi>div:nth-child(1){
    display: block;
    flex:0 0 .6rem;
    text-align: center;
    border-right:1px solid #d1d3d6;
  }
  #register .phone {
    box-sizing: border-box;
    overflow:hidden;
    input {
      width: 100%;
      box-sizing: border-box;
      padding-left: 0.2rem;
    }
  }
  #register ul li:nth-child(2){
    margin-top: 0.1rem;
    display: block;
    display: flex;
  }
  #register .verificationCode {
    /*padding-left: 0.4rem;*/
    display: block;
    flex:1;
  }
  #register .gCode {
    display: block;
    height:100%;
    flex: 0 0 0.7rem;
    padding: 0.01rem 0.02rem;
    font-size: .2rem;
    text-align: center;
    color: #fff;
    background: #e7384a;
    font-size: .12rem;
    border-radius:0.05rem;
  }
  #register .registerHint {
    margin-top: 0.1rem;
    width: 100%;
    font-size: 0.14rem;
    color:red ;
    text-align: center;
  }
  #register .lastStep {
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
  .regiterContext>p {
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
