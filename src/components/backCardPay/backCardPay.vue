<template>
    <div class="backCardPay">
      <div class="backCardPay-tit">
        <span @click="agenBack" class="icon-back"></span>
        <span>银行卡支付</span>
        <span></span>
      </div>
      <div class="backCardPay-con">
          <ul class="backCardPay-con-ul backCardPay-con-ulOne">
            <li><span>订单金额:</span><b>{{money}}.00元</b></li>
            <li><span>账户:</span><b>{{uId}}</b></li>
          </ul>
        <ul class="backCardPay-con-ul backCardPay-con-ulTwo" >
            <li @click="goBankList"><span>付款银行：</span><span>{{cartName}}</span><i class="icon-yjt"></i></li>
            <li><span>卡号:</span><input type="text" placeholder="请输入卡号" maxlength="19" v-model="bankNum" @focus="tishia" pattern="[0-9]*" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></li>
        </ul>
        <div class="backCardPar-hint">
          <span>银行卡号应为12~19位数字</span>
          <b v-show="showHint">{{showHintContent}}</b>
        </div>
      </div>
      <div class="buttom" @click="next">
        下一步
      </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default{
      data() {
          return{
            showHint:false,
            money:0,
            bankNum:"",
            showHintContent:'银行卡号错误，请核对后再试',
            cartName:'请选择支付银行卡',
            uId:''
          }
      },
      watch:{
      '$route': function () {
        if(this.$route.path.indexOf("backCardPay")!=-1){
          this.money=sessionStorage.getItem("payMomey");
          this.bankNum='';
          this.cartName='请选择支持银行卡';
          if(sessionStorage.getItem("bankName")){
              this.cartName=sessionStorage.getItem("bankName");
          }
          if(!sessionStorage.getItem("banknum")){
              this.bankNum='';
          }
        }
      }
    },
    created(){
      if(sessionStorage.getItem('busyId')){
        this.uId = sessionStorage.getItem('busyId');
      }else {
        this.uId = this.$store.state.userInfo.userId;
      }
      console.log(this.uId);
      this.money=sessionStorage.getItem("payMomey");
      if(sessionStorage.getItem("bankName")){
        this.cartName=sessionStorage.getItem("bankName");
      }
      if(sessionStorage.getItem("banknum")){
          this.bankNum=sessionStorage.getItem("banknum");
      }
    },
      methods:{
        tishia(){
          this.showHint=false;
        },
        goBankList(){
          this.$router.push({path:'/supportBank'})
        },
        agenBack() {
            if(sessionStorage.getItem("GamingPayId")){
                  window.history.back()
            }else{
              this.$router.push({path:'/pay'})
            }

        },
        next(){
          if(sessionStorage.getItem("bankName")){
              let bankNum =this.bankNum.replace(/\s/g, "");
              if(this.bankNum) {
                  if(this.bankNum.length>12) {
                    this.$http.post('/api/pay/getOrderInfo',{country:0,platformTerminal:4,bankName:sessionStorage.getItem("bankName"),bankCardNo:bankNum},{emulateJSON:true}).then(function (res) {
                        if(res.body.result==0){
                          sessionStorage.setItem("outTradeNo",res.body.data.outTradeNo);
                          sessionStorage.setItem("banknum", bankNum);
                          this.$router.push({path: '/Verification'})
                        }else{
                          this.showHint=true;
                          this.showHintContent=res.body.msg;
                        }
                    })
                  }else{
                    this.showHint=true;
                    this.showHintContent="请输入正确的银行卡号"
                  }
              }else{
                this.showHint=true;
                this.showHintContent="请输入银行卡号"
              }
          }else{
            this.showHint=true;
            this.showHintContent="请选择银行卡"
          }
        }
      },
      computed:{
        ...mapState(['userInfo','isLogin'])
      }
    }
</script>
<style scoped>
  .backCardPay{
    font-size: 0.14rem;
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    bottom: 0;
    background: #f5f5f5;
    z-index: 9;
  }
  .backCardPay .buttom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    color: #fff;
    background-color: #e7384a;
    font-size: 0.20rem;
  }
.backCardPay-tit{
  width: 100%;
  height: 0.45rem;
  background: #E7374B;
  display: block;
  display: flex;
}
.backCardPay-tit>span{
  display: block;
  display: inline-block;
  text-align: center;
  line-height: 0.45rem;
  color: #fff;
  font-size: 0.20rem;
}
.backCardPay-tit>span:not(:nth-child(2)){
  display: block;
  display: inline-block;
  width:0.45rem;
  height:0.45rem;
}
  .backCardPay-tit>span:nth-child(2){
    display: block;
    flex: 1;
  }
  .backCardPay-con{
    position: absolute;
    top: 0.45rem;
    bottom: 0.5rem;
    left: 0;
    width: 100%;
    overflow: auto;
  }
  .backCardPay-con-ul{
    background: #fff;
  }
  .backCardPay-con-ul>li{
    height:0.4rem;
    border-bottom: 1px solid #f5f5f5;
    overflow: hidden;
    line-height: 0.4rem;
    padding-left: 0.15rem;
  }
  .backCardPay-con-ul>li>span{
    display: block;
    display: inline-block;
    font-size: 0.16rem;
    color: #333;
  }
  .backCardPay-con-ul>li>b{
    float: right;
    font-size: 0.16rem;
    color: #333;
    padding-right: 0.15rem;
  }
.backCardPay-con-ulTwo{
  margin-top:0.4rem;
}
  .backCardPay-con-ulTwo>li{
    display: block;
    display: flex;
  }
  .backCardPay-con-ulTwo>li>input{
    display: block;
    height: 100%;
    flex: 1;
    text-align: right;
  }
  .backCardPay-con-ulTwo>li>span:nth-of-type(2){
    display: block;
    flex: 1;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: right;
    color: #999;

  }
  .backCardPay-con-ulTwo>li>i{
    float: right;
    padding:0.13rem 0.15rem 0 0.1rem;
    color: #999;
  }
  .backCardPay-con-ulTwo>li:nth-child(2)>input{
    float: right;
    padding-right:0.15rem;
  }
  .backCardPar-hint{
    padding-top:0.1rem;
    overflow: hidden;
  }
  .backCardPar-hint>span{
    display: block;
    float: left;
    padding-left:0.15rem;
    color: #b4b4b4;
    font-size: 0.12rem;
  }
  .backCardPar-hint>b{
    float: right;
    font-size:0.12rem;
    color:#ff0000;
    padding-right:0.15rem;

  }

</style>
