<template>
    <div class="smsverification">
      <div class="title">
        <span class="back icon-back" @click="back"></span>
        <span class="name">手机短信验证</span>
        <span class="zw"></span>
      </div>
      <div class="smsverification-con" v-if="payLoading">
        <ul>
          <li class="borderBottom-1px">请输入<span>{{phone}}</span>收到的短信验证码</li>
          <li class="sms-ver">
            <div><input type="text" placeholder="短信验证码" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="smsCode" maxlength="8" @focus="_input"></div>
            <div @click="setTime" :class="{setTime:setTimeOut}">{{countDown}}</div>
          </li>
          <li v-if="tishiN" class="tishiN">{{tishiC}}</li>
          <div class="zhifu" @click="pay">确认支付</div>
        </ul>
      </div>
      <div class="smsverification-loading" v-if="!payLoading">
        <div>
          {{time}}秒
          <span></span>
        </div>
        <div>正在充值...等待结果返回</div>
        <div>温馨提示:结果返回前，请不要操作本页面</div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">

  import cjTitle from '../cjTitle/cjTitle.vue';
  let timer;
  export default {
    data(){
      return {
        title:'手机短信验证',
        phone:'',
        countDown:'获取验证码',
        setTimeOut:false,
        smsCode:'',
        time:10,
        payLoading:true,
        tishiN:false,
        tishiC:'',
        payFalse:true
      }
    },
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf("smsverification")!=-1) {
          this.smsCode='';
          this.time=10;
          this.phone=sessionStorage.getItem("bankPhone").substring(0,3)+"****"+sessionStorage.getItem("bankPhone").substring(7,11);
        }
      }
    },
    created(){
      this.phone=sessionStorage.getItem("bankPhone").substring(0,3)+"****"+sessionStorage.getItem("bankPhone").substring(7,11);
    },
    methods:{
      back(){
          window.history.back()
      },
      setTime(){
        let _this = this;
        this.countDown=60;
        this.setTimeOut=true;
        this.SendMsg();
        timer = window.setInterval(function () {
          _this.countDown=_this.countDown-1;
          if(_this.countDown == 0){
            clearInterval(timer);
            _this.countDown="获取验证码";
          }
        },1000);
      },
      SendMsg(){
        this.$http.post("/api/pay/getQuickPaySendMsg",{country:0,platformId:sessionStorage.getItem("bankPid"),tn:sessionStorage.getItem('businessTn')},{emulateJSON:true}).then(function (res) {

        })
      },
      _input(){
        this.tishiN=false;
      },
      pay(){
        if(!this.setTimeOut){
          this.tishiC="请点击获取验证码";
          this.tishiN=true;
          return false
        }
        if(!this.smsCode){
          this.tishiC="请输入验证码";
          this.tishiN=true;
          return false
        }
        let self=this;
        this.tishiN=false;
        this.payLoading=false;
        this.title="充值";
        let  timer=setInterval(function () {
          self.time--;
          if(self.time==0){
            clearInterval(timer);
            sessionStorage.setItem("payresult","1")
            sessionStorage.setItem("payresultTime","1")
            self.payLoading=true;
            self.$router.push({path:'/payresult'})
          }
        },1000)
        if(this.payFalse){
          this.payFalse=false
          $.ajax({
            type : 'GET',
            url : "/api/pay/quickPayConfirm",
            data : {
              'country':0,
              'platformTerminal':4,
              'platformId':sessionStorage.getItem("bankPid"),
              'tn':sessionStorage.getItem('businessTn'),
              'smsCode':this.smsCode,
              'outTradeNo':sessionStorage.getItem("outTradeNo"),
              'extendParams':sessionStorage.getItem('bankExtra'),
              'totalFee':sessionStorage.getItem("payMomey"),
              'businessNo':sessionStorage.getItem("business")
            },
            dataType : 'json',
            success : function(data) {
              self.payFalse=true
              if(data.respMsg.indexOf("交易成功")!=-1){
                self.payLoading=true;
                self.title="手机短信验证";
                clearInterval(timer);
                sessionStorage.setItem("payresult","0")
                sessionStorage.removeItem("bankName");
                sessionStorage.removeItem("banknum");
                sessionStorage.removeItem("bankId");
                sessionStorage.removeItem("bankPhone");
                self.$router.push({path:'/payresult'})
              }else{
                sessionStorage.setItem("payresultTime","0")
                sessionStorage.setItem("payresult","1")
                self.$router.push({path:'/payresult'})
                self.payLoading=true
                sessionStorage.setItem("payresultMsg",data.respMsg)
              }
            },
            error : function(xhr, type) {
              return "error";
            }
          })
        }

//        this.$http.post("/api/pay/quickPayConfirm",{country:0,platformId:sessionStorage.getItem("bankPid"),tn:sessionStorage.getItem('businessNo'),smsCode:this.smsCode,outTradeNo:sessionStorage.getItem("outTradeNo"),extendParams:sessionStorage.getItem('bankExtra'),totalFee:sessionStorage.getItem("payMomey")},{emulateJSON:true}).then(function (res) {
//
//        })
      }
    },
    components:{
      cjTitle
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .smsverification {
    height: 100%;
    width: 100%;
    display: block;
    .title {
      height: 0.45rem;
      width: 100%;
      line-height: 0.45rem;
      text-align: center;
      color: #fff;
      background-color: #e7374b;
      display: block;
      display: flex;
      .back {
        display: block;
        height: 0.45rem;
        width: 0.45rem;
        line-height: 0.45rem;
        display: inline-block;
        text-align: center;
        color: #fff;
        font-size: 0.24rem;
      }
      .name {
        display: block;
        height: 0.45rem;
        line-height: 0.45rem;
        text-align: center;
        color: #fff;
        font-size: 0.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }
      .zw {
        display: block;
        display: inline-block;
        height: 0.45rem;
        width: 0.45rem;
      }
    }
    .smsverification-con {
      ul li {
        padding: 0 0.15rem;
        height:0.5rem;
        line-height:0.5rem;
        font-size: 0.16rem;
        background: #FFFFFF;
      }
      ul li:nth-child(1) {
        text-align: center;
      }
      ul li:nth-child(3){
        border-top: 1px solid #F5F5F5;
      }
      .sms-ver {
        div:nth-child(1) {
          float: left;
          height: 0.5rem;
          line-height:0.5rem;
          input {
            display: block;
            height: 100%;
            width: 100%;
          }
        }
        div:nth-child(2){
          width: 1rem;
          margin-top: 0.02rem;
          height:0.4rem;
          line-height:0.4rem;
          background: #e7384a;
          color: #FFFFFF;
          text-align: center;
          float: right;
          border-radius: 0.05rem;
        }
        .setTime{
          background-color: #999 !important;
        }
      }
      .zhifu {
        margin:0.5rem 0.15rem 0;
        height:0.6rem;
        line-height:0.6rem;
        background: #e7384a;
        color: #FFFFFF;
        text-align: center;
        font-size: 0.18rem;
        border-radius: 0.05rem;
      }
    }
    .smsverification-loading{
      width: 100%;
      background-color: #fff;
      height: 2rem;
      >div:nth-of-type(1){
        margin: auto;
        font-size: 0.15rem;
        color: #05d30f;
        height: 1.5rem;
        width: 1.5rem;
        text-align: center;
        background-size:1.3rem 1.3rem ;
        background-image: url("./payL.png");
        background-repeat: no-repeat;
        background-position: center;
        line-height: 1.5rem;
        >span:nth-of-type(1){
          display: block;
          width: 1.5rem;
          height: 1.5rem;
          position: fixed;
          top: 0.45rem;
        }
        >span:nth-of-type(1):before {
          display: block;
          content:"";
          width: 1.5rem;
          height: 1.5rem;
          background-position: center;
          background-size:1.3rem 1.3rem ;
          background-image: url("./payZ.png");
          background-repeat: no-repeat;
          animation:loading .8s linear infinite;
          -webkit-animation:loading .8s linear infinite;
        }
        >span:nth-of-type(1):after {
           display: block;
           display: inline-block;
          content:"";
          transform:translate(-44%,-50%);
          -ms-transform:translate(-44%,-50%);
          -webkit-transform:translate(-44%,-50%);
          -moz-transform:translate(-44%,-50%);
          -o-transform:translate(-44%,-50%);
          color:#1581cc;
          font-size:14px
        }
        @keyframes loading {
          0% {
            transform:rotate(0);
            -webkit-transform:rotate(0)
          }
          100% {
            transform:rotate(360deg);
            -webkit-transform:rotate(360deg)
          }
        }@-webkit-keyframes loading {
           0% {
             transform: rotate(0);
             -webkit-transform: rotate(0)
           }
           100% {
             transform: rotate(360deg);
             -webkit-transform: rotate(360deg)
           }
         }
        >span:nth-of-type(2){
           display: block;
          display: inline-block;
          height: 1.5rem;
          width: 1.5rem;
        }
      }
      >div:nth-of-type(2){
        text-align: center;
        height: 0.2rem;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #999;
      }
      >div:nth-of-type(3){
        height: 0.2rem;
        line-height: 0.2rem;
        font-size: 0.11rem;
        color: #ff0000;
        text-align: center;
      }
    }
    .tishiN{
      text-align: center;
      color: #e7384a;
    }
  }
</style>
