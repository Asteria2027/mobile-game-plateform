<template>
  <div class="supportBank">
      <div class="supportBank-tit">
        <span @click="agenBack" class="icon-back"></span>
        <span>支付银行卡</span>
        <span></span>
      </div>
    <ul class="supportBankType">
      <li :class="{supportBankActive:depositCard}" @click=" showtab1()">储蓄卡</li>
      <li :class="{supportBankActive:blueCard}" @click="showtab2()">信用卡</li>
    </ul>
    <div class="supportBackCon">
      <ul class="supportBackConUl" v-if="depositCard">
          <li v-for="item in bankList" v-if="item.isDepositCard==1" @click="Card(item.id,item.bankName,0)">
            <span><img :src="item.mobileBankImgUrl"></span>
            <div class="supportBackTxt">
              <b>{{item.bankName}}</b>
              <p>{{item.limitation}}</p>
            </div>
          </li>
      </ul>
      <ul class="supportBackConUl" v-else>
        <li v-for="item in bankList" v-if="item.isCreditCard==1" @click="Card(item.id,item.bankName,1)">
          <span><img :src="item.mobileBankImgUrl"></span>
          <div class="supportBackTxt">
            <b>{{item.bankName}}</b>
            <p>{{item.limitation}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
    export default{
      data() {
          return{
            depositCard:true,
            blueCard:false,
            bankList:'',
          }
      },
      created(){
        this.$http.post("/api/payBankInfo/queryPayBankInfo",{country:0,},{emulateJSON:true}).then(function (res) {
                  this.bankList=res.body;
        })
      },
      methods:{
        agenBack() {
            window.history.back()
        },
        showtab1() {
          this.depositCard = true,
          this.blueCard = false
        },
        showtab2() {
          this.depositCard = false,
          this.blueCard = true
        },
        Card(id,name,type){
          if(sessionStorage.getItem("bankId")&&sessionStorage.getItem("bankId")!=id){
            sessionStorage.removeItem("banknum")
          }
          sessionStorage.setItem("bankId",id);
          sessionStorage.setItem("bankName",name);
          sessionStorage.setItem("bankType",type);
          this.$router.push({path: '/backCardPay'})
        }
      }
    }
</script>
<style scoped>
  .supportBank{
    font-size: 0.14rem;
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .supportBank-tit{
    width: 100%;
    height: 0.45rem;
    background: #E7374B;
    display: block;
    display: flex;
    position: fixed;
    z-index: 1;
    top: 0;
    left:0;
  }
  .supportBank-tit>span{
    display: block;
    display: inline-block;
    text-align: center;
    line-height: 0.45rem;
    color: #fff;
    font-size: 0.24rem;
  }
  .supportBank-tit>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
    width:0.45rem;
    height:0.45rem;
  }
  .supportBank-tit>span:nth-child(2){
    display: block;
    flex: 1;
  }
.supportBankType{
  width:100%;
  height:0.39rem;
  background-color: #fff;
  border:1px solid #f5f5f5;
  position: fixed;
  top: 0.45rem;
  width: 100%;
  z-index: 1;
  left: 0;
}
  .supportBankType>li{
    float: left;
    width:50%;
    text-align: center;
    line-height: 0.39rem;
    font-size: 0.14rem;
    color: #5b5b5b;
  }
  .supportBankActive{
    border-bottom: 2px solid #e7384a;
  }
.supportBackCon{
  padding-top:0.9rem;
  width: 100%;
}
.supportBackConUl>li{
  width:100%;
  display: block;
  display: flex;
  height:0.6rem;
  border-bottom: 1px solid #f5f5f5;
}
  .supportBackConUl>li>span{
    display: block;
    width:0.46rem;
    height:0.46rem;
    border-radius: 50%;
    margin: 0.06rem 0.1rem;
  }
  .supportBackConUl>li>span>img{
    display: block;
    display: inline-block;
    width:100%;
    height:100%;
  }
  .supportBackTxt{
    display: block;
    flex: 1;
  }
  .supportBackTxt>b{
    display: block;
    padding-top:0.13rem;
    font-size: 0.16rem;
    color: #1c1c1c;
  }
  .supportBackTxt>p{
    font-size: 0.12rem;
    color: #b4b4b4;
    padding-top:0.06rem;
  }
</style>
