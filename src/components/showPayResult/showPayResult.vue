<template>
<div class="showPayResult">
  <div class="title">
    <span class="back icon-back" @click="back"></span>
    <span class="name">支付</span>
    <span class="zw"></span>
  </div>
  <div class="success" v-if="success">
    <div class="icon"  v-cloak>
      <span></span>
      <span>购买成功</span>
    </div>
    <ul>
      <li>
        <span>账号:</span>
        <span>{{userInfo.userId}}</span>
      </li>
      <li>
        <span>充值订单号:</span>
        <span>{{OrderNum}}</span>
      </li>
      <li>
        <span>商品金额:</span>
        <span>{{money}}元</span>
      </li>
      <li>
        <span>商品名称:</span>
        <span>{{goodsName}}</span>
      </li>
    </ul>
  </div>
  <div class="faile" v-else >
    <div class="icon">
      <span></span>
      <span>购买失败</span>
      <!--<span>原因:{{faile}}</span>-->
    </div>
  </div>
  <div class="bottom" v-if="success" v-cloak>
    <button @click.stop="_returnRoute('index')">返回首页</button>
    <button @click.stop="_returnRoute('shop')">再买一笔</button>
  </div>
  <div class="bottom" v-else v-cloak>
    <button @click.stop="_returnRoute('me')">联系客服</button>
    <button @click.stop="_returnRoute('shop')">继续购买</button>
  </div>
  <div class="showpay-loading" v-if="zdc">
    <div>
      {{timer}}秒
      <span></span>
    </div>
    <div>正在支付...等待结果返回</div>
    <div>温馨提示:结果返回前，请不要操作本页面</div>
  </div>
</div>
</template>

<script>
  import { mapState } from 'vuex';
  let timershow;
  let timeshowOut;
  let timerset;
  export default {
    data(){
      return {
        success:false,
        goodsName:"",
        OrderNum:'',
        money:"",
        faile:"",
        zdc:true,
        timer:15
      }
    },
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf("showPayResult")!=-1) {
            this.zdc=true;
            this.timer=15;
            this.success=false;
            if(sessionStorage.getItem("showFaile")){
              this.success=false;
              this.faile=sessionStorage.getItem("showFaile")
            }else{
              this.OrderNum=$.fn.cookie("showOrderNum");
              this.goodsName=$.fn.cookie("showGoodsName");
              this.money=$.fn.cookie("showMoney");
              let self=this;
              timerset=setInterval(function () {
                    self.timer--
              },1000)
              timeshowOut=setTimeout(function () {
                clearInterval(timershow)
                clearInterval(timerset)
              },15000);
              timershow=setInterval(function () {
                self.$http.post("/api/pay/queryPay",{country:0,businessNo:self.OrderNum},{emulateJSON:true}).then((res) => {
                  if(res.body.result==0&&res.body.payBussinessInfo.tradeStatus==1){
                    clearInterval(timershow);
                    clearTimeout(timeshowOut);
                    clearInterval(timerset)
                    self.success=true;
                    self.zdc=false;
                    sessionStorage.removeItem("showPhone")
                    sessionStorage.removeItem("showPayToAccount")
                  }else{
                    clearTimeout(timeshowOut);
                    self.success=false;
                    self.zdc=false
                    self.faile=res.body.msg
                  }
                })
              },2000)
            }
        }
      }
    },
    created(){
      this.$nextTick(function () {
        if(sessionStorage.getItem("showFaile")){
          this.success=false;
          this.faile=sessionStorage.getItem("showFaile")
        }else{
          this.OrderNum=$.fn.cookie("showOrderNum");
          this.goodsName=$.fn.cookie("showGoodsName");
          this.money=$.fn.cookie("showMoney");
          let self=this;
          timerset=setInterval(function () {
            self.timer--
          },1000)
          timeshowOut=setTimeout(function () {
            clearInterval(timershow);
            clearInterval(timerset)
          },15000);
          timershow=setInterval(function () {
            self.$http.post("/api/pay/queryPay",{country:0,businessNo:self.OrderNum},{emulateJSON:true}).then((res) => {
              if(res.body.result==0&&res.body.payBussinessInfo.tradeStatus==1){
                clearInterval(timershow);
                clearTimeout(timeshowOut);
                clearInterval(timerset)
                self.success=true;
                self.zdc=false;
                sessionStorage.removeItem("showPhone")
                sessionStorage.removeItem("showPayToAccount")
              }else{
                self.success=false;
                self.zdc=false
                self.faile=res.body.msg
              }
            })
          },2000)
        }

      })
    },
    methods:{
      back(){
        this.$router.push({path:'/car'})
      },
      _returnRoute(value){
        if(value=="me"){
          window.location.href="http://71chat.com/scsf/phone/visitor.html?cmpcd=178019";
        }else{
            this.$router.push({path:'/'+value})
        }
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }


</script>

<style rel="stylesheet/less" lang="less" scoped>
  [v-cloak] {
    display: none;
  }
.showPayResult{
  display: block;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .title{
    position: relative;
    height:0.45rem ;
    width: 100%;
    line-height: 0.45rem;
    text-align: center;
    color: #fff;
    background-color: #e7374b;
    display: block;
    display: flex;
    .back{
      height: 0.45rem;
      width: 0.45rem;
      line-height: 0.45rem;
      display: inline-block;
      text-align: center;
      color: #fff;
      font-size: 0.24rem;
     }
    .name{
      display: block;
      height: 0.45rem;
      line-height: 0.45rem;
      text-align: center;
      color: #fff;
      font-size: 0.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 2;
    }
    .zw{
      display: inline-block;
      height: 0.45rem;
      width: 0.45rem;
    }
  }
  .success{
    display: block;
    flex: 1;
    background-color: #F5F5F5;
    overflow-y: scroll;
    .icon{
      height: 2rem;
      width: 100%;
      background-color: #fff;
      color: #00e80b;
      font-size:0.18rem;
      text-align: center;
      border-bottom: 1px solid #F5F5F5;
      >span:nth-of-type(1){
        display: block;
        width: 100%;
        height: 1.6rem;
        background-image: url("./paysuccess.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 1.3rem 1.3rem;
      }
    }
    >ul{
      background-color: #fff;
      >li{
        display: block;
        display: flex;
        min-height: 0.45rem;
        line-height: 0.45rem;
        padding:0 0.15rem ;
        border-bottom: 1px solid #F5F5F5;
        >span:nth-of-type(1){
          display: block;
          width: 0.9rem;
          height: 0.45rem;
          font-size: 0.14rem;
        }
        >span:nth-of-type(2){
          display: block;
          flex: 1;
          text-align: right;
          min-height: 0.2rem;
          padding-top: 0.125rem;
          font-size: 0.14rem;
          line-height: 0.2rem;
          color: #999;
        }
      }
      >li:nth-last-child(1){
        border-bottom: none;
      }
    }

  }
  .faile{
    display: block;
    flex: 1;
    background-color: #F5F5F5;
    .icon{
      height: 2rem;
      width: 100%;
      background-color: #fff;
      color: #e7384a;
      font-size:0.18rem;
      text-align: center;
      border-bottom: 1px solid #F5F5F5;
      >span:nth-of-type(1){
        display: block;
        width: 100%;
        height: 1.4rem;
        background-image: url("./payfail.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 1.3rem 1.3rem;
      }
      >span:nth-of-type(2),>span:nth-of-type(3){
        display: block;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
      }
      >span:nth-of-type(3){
        font-size: 0.14rem;
      }
    }
  }
  .bottom{
    display: block;
    height: 0.5rem;
    line-height: 0.5rem;
    width: 100%;
    position: relative;
    overflow: hidden;
    >button{
      display: block;
      width: 50%;
      float: left;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.16rem;
      color: #fff;
      background-color: #e7384a;
    }
  }
  .zdc{
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 50;
  }
  .showpay-loading{
    position: fixed;
    top: 0.45rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
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
}
</style>
