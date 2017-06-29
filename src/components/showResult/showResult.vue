<template>
<div class="showResult">
  <div class="title">
    <span class="back icon-back" @click="back"></span>
    <span class="name">支付</span>
    <span class="zw"></span>
  </div>
  <div class="content">
    <ul class="show-content">
      <li>
        <span>账号:</span>
        <span>{{userInfo.userId}}</span>
      </li>
      <li>
        <span>商品名称:</span>
        <span>{{goodsName}}</span>
      </li>
      <!--<li>-->
        <!--<span>订单号:</span>-->
        <!--<span>{{orderNum}}</span>-->
      <!--</li>-->
      <li>
        <span>商品金额:</span>
        <span>{{money}}元</span>
      </li>
    </ul>
    <div>支付方式</div>
    <ul class="show-pay-type">
      <li class="borderBottom-1px" v-if="pt==2" @click="_pt(2)"  >
        <span class="icon wx"></span>
        <span class="name">微信支付</span>
        <span class="choise"><img src="./gx.png"></span>
      </li>
      <li class="borderBottom-1px" v-if="pt!=2" @click="_pt(2)"  >
        <span class="icon wx"></span>
        <span class="name">微信支付</span>
        <span class="choise"></span>
      </li>
      <li class="borderBottom-1px" v-if="pt==1" @click="_pt(1)" >
        <span class="icon zfb"></span>
        <span class="name">支付宝支付</span>
        <span class="choise"><img src="./gx.png"></span>
      </li>
      <li class="borderBottom-1px" v-if="pt!=1" @click="_pt(1)">
        <span class="icon zfb"></span>
        <span class="name">支付宝支付</span>
        <span class="choise"></span>
      </li>
    </ul>
  </div>
  <p v-if="showPaymoNEY" class="showPaymoNEY">
    <span>支付金额超额</span>
  </p>
  <button @click.stop="_go()">确认支付</button>
  <div class="guidPageIos" v-show="showIos" @click="showIos=!showIos"> </div>
  <div class="guidPageAndroid" v-show="showAndroid" @click="showAndroid=!showAndroid"></div>
  <div class="QRcode" v-show="QRcode">
    <span @click="QRcode=!QRcode"></span>
    <img :src="QRcodeIMG"  alt="qrcode">
    <div>长按二维码支付</div>
    <div>支付成功后请在本页面等待支付结果</div>
  </div>
  <div class="wxsuccess" v-if="wxsuccess">
    <div></div>
    <div>购买成功</div>
    <div  @click="_wx('wxsuccess')">继续购买</div>
  </div>
  <div class="wxfaile" v-if="wxfaile">
    <div></div>
    <div>购买失败</div>
    <div  @click="_wx('wxfaile')">重新购买</div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  let weixintimeout;
  let weixintimer;
  export default {
    data(){
      return {
        goodsName:"",
        money:"",
        pt:2,
        orderNum:"",
        showPaymoNEY:false,
        goTrue:true,
        showIos:false,
        showAndroid:false,
        QRcode:false,
        QRcodeIMG:'',
        wxsuccess:false,
        wxfaile:false
      }
    },
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf("showResult")!=-1) {
          this.pt=2;
          this.goTrue = true;
          let ua = window.navigator.userAgent.toLowerCase();
          if(sessionStorage.getItem("showMoney")){
            this.money=sessionStorage.getItem("showMoney")
          }
          if(sessionStorage.getItem("showGoodsName")){
            this.goodsName=sessionStorage.getItem("showGoodsName");
          }
          if(sessionStorage.getItem("showOrderNum")){
            this.orderNum=sessionStorage.getItem("showOrderNum")
          }
        }
      }
    },
    created(){
      let Requres = new UrlSearch();
      let ua = window.navigator.userAgent.toLowerCase();
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          if(sessionStorage.getItem("wxiosnum")){
            var wxnum=Number(sessionStorage.getItem("wxiosnum"));
            wxnum++
            sessionStorage.setItem("wxiosnum",wxnum)
            console.log(sessionStorage.getItem("wxiosnum"))
            if(wxnum<=2){
              location.reload();
            }
          }else{
            sessionStorage.setItem("wxiosnum",1)
            location.reload();
          }
        }
      }
      if(Requres.userId){
        this.money=Requres.goodsPrice;
        this.$http.post("/api/login/tokenLogin", {country: 0, token: Requres.token}, {emulateJSON: true}).then((response) => {
        });
      }
      if(sessionStorage.getItem("showMoney")){
        this.money=sessionStorage.getItem("showMoney")
      }
      if(sessionStorage.getItem("showGoodsName")){
        this.goodsName=sessionStorage.getItem("showGoodsName");
      }
      if(sessionStorage.getItem("showOrderNum")){
          this.orderNum=sessionStorage.getItem("showOrderNum")
      }
    },
    methods:{
      _wx(value){
        this[value]=!this[value];
        this.$router.push({path:'/car'})
      },
      back(){
          history.back();
      },
      _pt(index){
        this.pt=index;
      },
      _go(){
        if(this.goTrue){
          this.goTrue = false;
          let time = 1;
          let _this = this;
          let timer = setInterval(function () {
            time--;
            if(time==0){
              _this.goTrue = true;
              clearInterval(timer);
            }
          },1000);

          let pt=this.pt;
          let rUrl=this.Url+"/showPayResult";
          let phone;
          if(sessionStorage.getItem("showPhone")){
            phone=sessionStorage.getItem("showPhone");
            sessionStorage.removeItem("showPayToAccount")
          }
          let addressId;
          if(sessionStorage.getItem("showAddressId")){
            addressId=sessionStorage.getItem("showAddressId")
          }
          let showGoodsId=sessionStorage.getItem("showGoodsId");
          let payToAccount=sessionStorage.getItem("showPayToAccount")

          let request = new UrlSearch();
          if(request.userId){
            phone= request.phone;
            addressId=request.addressId;
            showGoodsId=request.goodsId;
            payToAccount=request.qq;
          }

          let self=this;
          if(self.money>=10000000){
            self.showPaymoNEY=true;
            this.goTrue = true;
            setTimeout(function () {
              self.showPaymoNEY=false
            },2000)
            return false;
          }
          if(pt==1){
            let ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
              if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                this.showIos = true;
                this.goTrue = true;
                this.showAndroid = false
              }else if(/(Android)/i.test(navigator.userAgent)){
                this.showIos = false;
                this.goTrue = true;
                this.showAndroid = true;
              }
              return false
            }
            $.ajax({
              type : 'GET',
              url : "/api/pay/pay",
              data : {
                'money' : self.money,
                'type' : pt,
                'game' : 31111,
                'gameName' :sessionStorage.getItem("showGoodsName")||request.goodsName ,
                "to":2,
                'service' : "1",
                'account' : self.userInfo.userId||request.userId,
                'extra' : "",
                'returnUrl' : rUrl,
                "phone":phone,
                'count':1,
                'addressId':addressId,
                "payToAccount":payToAccount,
                "productId":showGoodsId
              },
              dataType : 'jsonp',
              timeout : 1000,
              success : function(data) {
                if(data.result==0){
                  sessionStorage.setItem("showOrderNum",data.businessNo)
                  sessionStorage.removeItem("formGame");
                  sessionStorage.removeItem("showFaile");
                  $.fn.cookie("showOrderNum",data.businessNo,{ expires: 1 });
                  $.fn.cookie("showGoodsName",sessionStorage.getItem("showGoodsName"),{ expires: 1 });
                  $.fn.cookie("showMoney",sessionStorage.getItem("showMoney"),{ expires: 1 });
                  var pElement = document.createElement("div");
                  pElement.innerHTML = data.data;
                  document.body.appendChild(pElement);
                  document.forms[0].submit();
                  pElement.remove();
                }else{
                  sessionStorage.setItem("showFaile",JSON.parse(data.data).msg)
                  self.$router.push({path:'/showPayResult'})
                }
              },
              error : function(xhr, type) {
                return "error";
              }
            })
          }else if(pt==2){
            let ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger') {
              let self = this;
              $.ajax({
                type: 'POST',
                url: self.pcUrl+"/charge/swiftpassPay",
                data: {
                  userId: self.userInfo.userId||request.userId,
                  applyAmount: self.money,
                  currencyType: "CNY",
                  gameId:'' ,
                  platformType: 14,
                  changeType: 1,
                  service: 'pay.weixin.native',
                  body: sessionStorage.getItem("showGoodsName")||request.goodsName,
                  terminal: 4
                },
                dataType: 'json',
                success: function (data) {
                  if (data.resultCode == 0) {
                    weixintimeout = setTimeout(function () {
                      clearInterval(weixintimer);
                      self.QRcode = false;
                      self.wxsuccess = false
                      self.wxfaile = true
                    }, 90000)
                    weixintimer = setInterval(function () {
                      $.ajax({
                        type: 'POST',
                        url: self.pcUrl+"/charge/commonPayoutQuery",
                        data: JSON.stringify({
                          outTradeNo: data.outTradeNo,
                          businessNo: data.businessNo,
                          platformType: ''
                        }),
                        contentType: "application/json",
                        dataType: 'json',
                        success: function (data) {
                          if (data.tradeStatus == 1) {
                            clearTimeout(weixintimeout);
                            clearInterval(weixintimer);
                            self.QRcode = false;
                            self.wxsuccess = true;
                            self.wxfaile = false;
                          } else if (data.tradeStatus == 2) {
                            clearTimeout(weixintimeout);
                            clearInterval(weixintimer);
                            self.QRcode = false;
                            self.wxsuccess = false;
                            self.wxfaile = true;
                          }
                        },
                        error: function (xhr, type) {
                          return "error";
                        }
                      })
                    }, 5000)
                    self.QRcode = true;
                    self.QRcodeIMG = data.codeImgUrl;
                  }

                },
                error: function (xhr, type) {
                  return "error";
                }
              })
            }else{
              $.ajax({
                type : 'GET',
                url : "/api/pay/pay",
                data : {
                  'money' : self.money,
                  'type' : pt,
                  'game' : "31111",
                  "to":2,
                  "goodsId":self.wxGoodsId,
                  'gameName' : sessionStorage.getItem("showGoodsName")||request.goodsName,
                  'service' : "1",
                  'account' :  self.userInfo.userId||request.userId,
                  'extra' : "",
                  'returnUrl' : rUrl,
                  "wechatPayType":2,
                  "phone":phone,
                  'count':1,
                  'addressId':addressId,
                  "payToAccount":payToAccount,
                  "productId":showGoodsId
                },
                dataType : 'jsonp',
                timeout : 1000,
                success : function(data) {
                  if(data.result==0){
                    sessionStorage.setItem("showOrderNum",data.businessNo);
                    $.fn.cookie("showOrderNum",data.businessNo,{ expires: 1 });
                    $.fn.cookie("showGoodsName",sessionStorage.getItem("showGoodsName"),{ expires: 1 });
                    $.fn.cookie("showMoney",sessionStorage.getItem("showMoney"),{ expires: 1 });
                    sessionStorage.removeItem("showFaile");
                    window.location.href="https://payh5.bbnpay.com/h5pay/way.php?"+data.data;
                  }else{
                    sessionStorage.setItem("showFaile",JSON.parse(data.data).msg)
                    self.$router.push({path:'/showPayResult'})
                  }
                },
                error : function(xhr, type) {
                  return "error";
                }
              })
            }
          }
        }

      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }

</script>

<style rel="stylesheet/less" lang="less" scoped>
  .showResult{
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
    .content{
      display: block;
      flex: 1;
      background-color: #f5f5f5;
      overflow-y: scroll;
      .show-content{
        background-color: #fff;
        >li{
          display: block;
          display: flex;
          height: 0.45rem;
          line-height: 0.45rem;
          padding:0 0.15rem ;
          border-bottom: 1px solid #F5F5F5;
          >span:nth-of-type(1){
            display: block;
            width: 0.7rem;
            height: 0.45rem;
            font-size: 0.14rem;
          }
          >span:nth-of-type(2){
            display: block;
            flex: 1;
            text-align: right;
            height: 0.45rem;
            font-size: 0.14rem;
            color: #999;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        >li:nth-last-child(1){
          border-bottom: none;
        }
      }
      >div{
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.18rem;
        color: #999;
        padding-left: 0.15rem;
      }
      .show-pay-type{
          li{
            height: 0.51rem;
            line-height: 0.50rem;
            background-color: #fff;
            display: block;
            display: flex;
            >span{
              display: block;
            }
            .icon{
              display: inline-block;
              width: 0.51rem;
              height: 0.50rem;
              background-size: 0.3rem 0.3rem;
              background-position: center;
              background-repeat: no-repeat;
            }
            .zfb{
              background-image: url("./zfb.png");
            }
            .wx{
              background-image: url("./wx.png");
            }
            .name{
              height: 0.5rem;
              line-height: 0.5rem;
              display: block;
              flex: 2;
              font-size: 0.16rem;
            }
            .choise{
              display: inline-block;
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.05rem;
              margin-top: 0.1rem;
              img{
                display: block;
                display: inline-block;
                width: 100%;
                height: 100%;
              }
            }
          }
      }
    }
    >button{
      position: relative;
      display: block;
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.2rem;
      color: #fff;
      background-color: #e7384a;
      text-align: center;
    }
    .showPaymoNEY{
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      font-size: 0.18rem;
      text-align: center;
      width: 100%;
      padding: 0 0.05rem;
      background-color: rgba(0,0,0,0.4);
      border-radius: 10px;
      color: #fff;
      >span{
        height: 0.5rem;
        background-color: #e7384a;
        line-height: 0.5rem;
        padding: 0 0.05rem;
        position: fixed;
        width: 35%;
        left: 35%;
        top: 45%;
        border-radius: 10px;
      }
    }
    .guidPageIos{
      width:100%;
      height:100%;
      position: fixed;
      top:0;
      left:0;
      background:url("ios.jpg") no-repeat center;
      background-size:100% 100%;
      z-index: 11;
    }
    .guidPageAndroid{
      width:100%;
      height:100%;
      position: fixed;
      top:0;
      left:0;
      background:url("Android.jpg") no-repeat center;
      background-size:100% 100%;
      z-index: 11;
    }
    .QRcode{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: #0E0E0E;
      z-index: 100;
      >span{
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        height: 0.3rem;
        width: 0.3rem;
        display: block;
        background-image: url("./xx.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
      >img{
        position: absolute;
        top: 1rem;
        left: 0.4rem;
        z-index: 9999;
        display: block;
        width: 3rem;
        height: 3rem;
      }
      >div:nth-of-type(1){
        height: 0.5rem;
        width: 100%;
        line-height: 0.5rem;
        color: #fff;
        font-size: 0.18rem;
        position: fixed;
        text-align: center;
        top: 4rem;
      }
      >div:nth-of-type(2){
        height: 0.5rem;
        width: 100%;
        line-height: 0.5rem;
        color: #fff;
        font-size: 0.18rem;
        position: fixed;
        text-align: center;
        top: 4.5rem;
      }
    }
    .wxsuccess{
      position: fixed;
      top: 0rem;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: #fff;
      z-index: 50;
      font-size: 0.18rem;
      text-align: center;
      >div:nth-of-type(1){
        height: 1.2rem;
        width: 1.2rem;
        margin: auto;
        background-image: url("./paysuccess.png");
        background-size: 1.2rem 1.2rem;
        background-position: center;
        background-repeat: no-repeat;
        margin-top: 1rem;
      }
      >div:nth-of-type(2){
        color: #00E80B;
        height: 0.3rem;
        line-height: 0.3rem;
      }
      >div:nth-of-type(3){
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.15rem;
        color: #fff;
        background-color: #e7384a;
      }
    }
    .wxfaile{
      position: fixed;
      top: 0rem;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: #fff;
      z-index: 50;
      font-size: 0.18rem;
      text-align: center;
      >div:nth-of-type(1){
        height: 1.2rem;
        width: 1.2rem;
        margin: auto;
        background-image: url("./payfail.png");
        background-size: 1.2rem 1.2rem;
        background-position: center;
        background-repeat: no-repeat;
        margin-top: 1rem;
      }
      >div:nth-of-type(2){
        color: #e7384a;
        height: 0.3rem;
        line-height: 0.3rem;
      }
      >div:nth-of-type(3){
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.15rem;
        color: #fff;
        background-color: #e7384a;
      }
    }
  }

</style>
