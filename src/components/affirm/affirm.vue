<template>
<div class="affirm">
  <div class="title">
    <span class="back icon-back" @click="back"></span>
    <span class="name">确认订单</span>
    <span class="zw"></span>
  </div>
  <div class="content">
    <div class="gift" v-if="gift">
      <div class="gift-notic">
        <span class="icon"><img :src="content.rotationImgUrl"></span>
        <span class="name">
          <span class="tital">{{content.title}}</span>
          <span class="needScore">{{content.needScore}}{{currency[content.needScoreId]}}</span>
          <!--<span class="num">x1</span>-->
       </span>
      </div>
      <div class="gift-content borderBottom-1px">
        <h3>礼包内容</h3>
        <div>{{content.content}}</div>
      </div>
      <div class="gift-use borderBottom-1px">
        <h3>使用说明</h3>
        <p>1、登录游戏即可领取礼包</p>
        <p>2、每个账户只能领取一次</p>
        <p>3、点击领取后，礼包将直接发送至游戏内，进入游戏即可查收</p>
      </div>
    </div>
    <div class="phone" v-if="!gift">
      <div class="phone-notic">
        <span class="icon"><img :src="content.picUrl"></span>
        <span class="name">
          <span class="tital">{{content.name}}</span>
          <span class="needScore">{{content.needScore}}元</span>
          <!--<span class="needScore">{{content.price}}元</span>-->
          <!--<span class="num">x1</span>-->
        </span>
      </div>
      <div class="phone-input">
        <ul>
          <li class="phone-list borderBottom-1px" v-if="affirmType">
            <span>*</span>
            <!--<span>请输入您的手机号:</span>-->
            <input type="number" placeholder="请输入您的手机号"  v-model="firstPhone" @input="_input('firstPhone')" v-on:keyup="_input" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" pattern="[0-9]*">
          </li>
          <li class="phone-list borderBottom-1px" v-if="affirmType">
            <span>*</span>
            <!--<span>请再次输入您的手机号:</span>-->
            <input type="number" placeholder="请再次输入您的手机号"  v-model="secondPhone" @input="_input('secondPhone')" v-on:keyup="_input" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" pattern="[0-9]*">
          </li>
          <li class="phone-list borderBottom-1px" v-if="!affirmType">
            <span>*</span>
            <!--<span>请输入您的手机号:</span>-->
            <input type="number" placeholder="请输入您的QQ账号"  v-model="PayToAccount1" @input="_input('PayToAccount1')" v-on:keyup="_input" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" pattern="[0-9]*">
          </li>
          <li class="phone-list borderBottom-1px" v-if="!affirmType">
            <span>*</span>
            <!--<span>请再次输入您的手机号:</span>-->
            <input type="number" placeholder="请再次输入您的QQ账号"  v-model="PayToAccount2" @input="_input('PayToAccount2')" v-on:keyup="_input" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" pattern="[0-9]*">
          </li>
        </ul>
      </div>
      <div class=""></div>
    </div>
    <div class="add">
      <ul>
        <li class="add-list borderBottom-1px">
          <span>共1件商品</span>
          <span>小计:</span>
          <span>{{content.needScore}}元</span>
          <!--<span>{{content.price}}元</span>-->
        </li>
        <li class="Explain">
          <p>发货说明:</p>
          <p>a 、实物商品提交订单后3天内发货</p>
          <p>b 、虚拟物品提交订单后24小时内发货</p>
        </li>
        <!--<li class="add-list borderBottom-1px" >-->
        <!--<span class="icon" :class="{checkout:checkout}" @click="checkout=!checkout"></span>-->
        <!--<span>同意</span>-->
        <!--<a style="color: #e7384a;" href="http://game.13322.com/xuzhi.htm">《玩一下兑换协议》</a>-->
        <!--</li>-->
      </ul>

    </div>
  </div>
  <div class="buttom">
    <span>共1件合计:</span>
    <span>{{content.needScore}}元</span>
    <!--<span>{{content.price}}元</span>-->
    <span @click="exchange()">确定</span>
  </div>
  <div class="shielding" v-if="shieldingNone">
    <div>{{shieldingContent}}</div>
  </div>
</div>
</template>

<script>
  import { mapState } from 'vuex';
  export default{
    data(){
      return {
        gift:true,
        content:[],
        currency:[' ',' ','乐盈券','积分'],
        checkout:false,
        firstPhone:'',
        secondPhone:'',
        shieldingNone:false,
        shieldingContent:'',
        affirmType:true,
        PayToAccount1:"",
        PayToAccount2:''
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('affirm')!=-1){
          this.getAffirm()

        }
      }
    },
    created(){
      this.getAffirm();
    },
    methods:{
      back(){
        window.history.back()
      },
      _input(value){
        if(this[value]&&this[value].length>11){
          this[value]=this[value].substring(0,11)
        }
      },
      getAffirm(){
        let type = sessionStorage.getItem("affirm");
        if(sessionStorage.getItem("affirmType")==2){
          this.affirmType=true;
        }else{
          this.affirmType=false;
        }
        if(type=="gift"){
          this.gift=true;
          this.$http.post("/api/gift/getSignGiftBag",{country:0,giftBag:this.$route.params.id},{emulateJSON:true}).then((res) => {
            this.content=res.body.giftBag
          })
        }else if (type=="phone"){
          this.gift=false;
          this.$http.post("/api/pointShopGoods/getGoodsInfo",{country:0,id:this.$route.params.id},{emulateJSON:true}).then((res) => {
            this.content=res.body.data;
          })
        }
      },
      exchange(){
        let  self=this
//          if(this.checkout){
        if(this.gift){
          this.$http.post("/api/gift/lqGiftBag",{country:0,userId:this.userInfo.userId,giftBag:this.$route.params.id},{emulateJSON:true}).then((res) => {
            if(res.body.result==0){
              this.shieldingNone=true;
              this.shieldingContent='兑换成功'
              setTimeout(function () {
                self.$store.state.userInfo.unreads++
                self.shieldingNone=false;
                window.history.back()
              },2500)
            }else{
              this.shieldingNone=true;
              this.shieldingContent=res.body.msg;
              setTimeout(function () {
                self.shieldingNone=false;
              },2500)
            }
          })
        }else{
          if(this.affirmType){
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.firstPhone))){
              this.shieldingNone=true;
              this.shieldingContent='请输入正确的手机号码'
              setTimeout(function () {
                self.shieldingNone=false;
              },2500)
              return false;
            }else if (!this.secondPhone){
              this.shieldingNone=true;
              this.shieldingContent='请再次输入手机号码'
              setTimeout(function () {
                self.shieldingNone=false;
              },2500)
              return false;
            }else if (this.firstPhone!=this.secondPhone){
              this.shieldingNone=true;
              this.shieldingContent='两次输入的号码不一致'
              setTimeout(function () {
                self.shieldingNone=false;
              },2500)
              return false;
            }
//                  let ua = window.navigator.userAgent.toLowerCase();
//                  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//                    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
//                      window.location.href = this.Url+'/zhifu/showResult.html?userId='+this.$store.state.userInfo.userId+'&goodsPrice='+this.content.needScore+'&goodsName='+this.content.name+'&phone='+this.firstPhone+'&goodsId='+this.$route.params.id+'&token'+ $.fn.cookie("token");
//                    }else{
//                      this.$router.push({path:'/showResult?userId='+this.$store.state.userInfo.userId+'&goodsPrice='+this.content.needScore+'&goodsName='+this.content.name+'&phone='+this.firstPhone+'&goodsId='+this.$route.params.id+'&token'+ $.fn.cookie("token")});
//                    }
//                    return;
//                  }else {
            sessionStorage.setItem("showPhone",this.firstPhone);
            sessionStorage.setItem("showGoodsId",this.$route.params.id);
            sessionStorage.setItem("showMoney",this.content.needScore);
            sessionStorage.setItem("showGoodsName",this.content.name);
//                  }
          }else{
            if(!(/^\d{5,12}$/.test(this.PayToAccount1))){
              this.shieldingNone=true;
              this.shieldingContent='请输入正确的QQ号码'
              setTimeout(function () {
                self.shieldingNone=false;
              },2500)
              return false;
            }else if (!this.PayToAccount2){
              this.shieldingNone=true;
              this.shieldingContent='请再次输入QQ号码'
              setTimeout(function () {
                self.shieldingNone=false;
              },2500)
              return false;
            }else if (this.PayToAccount1!=this.PayToAccount2){
              this.shieldingNone=true;
              this.shieldingContent='两次输入的QQ号码不一致'
              setTimeout(function () {
                self.shieldingNone=false;
              },2500)
              return false;
            }
//                  let ua = window.navigator.userAgent.toLowerCase();
//                  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//                    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
//                      window.location.href = this.Url+'/zhifu/showResult.html?userId='+this.$store.state.userInfo.userId+'&goodsPrice='+this.content.needScore+'&goodsName='+this.content.name+'&phone='+this.firstPhone+'&goodsId='+this.$route.params.id+'&token'+ $.fn.cookie("token");
//                    }else{
//                      this.$router.push({path:'/showResult?userId='+this.$store.state.userInfo.userId+'&goodsPrice='+this.content.needScore+'&goodsName='+this.content.name+'&qq='+this.PayToAccount1+'&goodsId='+this.$route.params.id+'&token'+ $.fn.cookie("token")});
//                    }
//                    return;
//                  }else {
            sessionStorage.setItem("showPayToAccount",this.PayToAccount1);
            sessionStorage.setItem("showGoodsId",this.$route.params.id);
            sessionStorage.setItem("showMoney",this.content.needScore);
            sessionStorage.setItem("showGoodsName",this.content.name);
//                  }
          }
//              this.$http.post("/api/pay/getOrderInfoForShop",{country:0},{emulateJSON:true}).then((res) => {
//                  if(res.body.result==0){
//                    sessionStorage.setItem("showOrderNum",res.body.data.orderNo)
          this.$router.push({path:'/showResult'})
//                  }
//              })

//              this.$http.post("/api/pointShopGoods/exchangeGoods",{country:0,goodsId:this.$route.params.id,userId:this.userInfo.userId,phone:this.firstPhone,count:1},{emulateJSON:true}).then((res) => {
//                if(res.body.result==0){
//                  this.shieldingNone=true;
//                  this.shieldingContent='兑换成功'
//                  setTimeout(function () {
//                    self.$store.state.userInfo.unreads++
//                    self.shieldingNone=false;
//                    window.history.back()
//                  },2500)
//                }else{
//                  this.shieldingNone=true;
//                  this.shieldingContent=res.body.msg;
//                  setTimeout(function () {
//                    self.shieldingNone=false;
//                  },2500)
//                }
//              })
          this.firstPhone = "";
          this.secondPhone = "";
        }
//          }
//          }else{
//            this.shieldingNone=true;
//            this.shieldingContent='请勾选《玩一下兑换协议》'
//            setTimeout(function () {
//              self.shieldingNone=false;
//            },2500)
//          }
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .affirm {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: block;
    display: flex;
    flex-direction: column;
    .title {
      position: relative;
      top: 0;
      left: 0;
      z-index: 11;
      height: 0.45rem;
      width: 100%;
      line-height: 0.45rem;
      text-align: center;
      color: #fff;
      background-color: #e7374b;
      display: block;
      display: flex;
      .back {
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
        flex: 2;
      }
      .zw {
        display: inline-block;
        height: 0.45rem;
        width: 0.45rem;
      }
    }
    .content{
      width: 100%;
      position: relative;
      flex: 1;
      overflow-x: hidden;
      overflow-y: scroll;
      .gift,.phone{
        position: relative;
        top: 0rem;
        left: 0;
        width: 100%;
        .gift-notic,.phone-notic{
          height: 1.42rem;
          width: 92%;
          margin: auto;
          display: block;
          display: flex;
          background-color: #f9f9f9;
          .icon{
            display: block;
            width: 1.20rem;
            height: 1.20rem;
            margin:0.11rem;
            border-radius: 5px;
            overflow: hidden;
            img{
              display: block;
              display: inline-block;
              width: 100%;
              height: 100%;
            }
          }
          .name{
            display: block;
            flex: 1;
            margin-top: 0.11rem;
            overflow-x: hidden;
            .tital{
              display: block;
              width: 100%;
              height: 0.4rem;
              line-height: 0.2rem;
              overflow-x: hidden;
              font-size: 0.16rem;
            }
            .needScore{
              display: block;
              width: 100%;
              height: 0.4rem;
              line-height: 0.4rem;
              font-size: 0.14rem;
              color: #e7354a;
              overflow-x: hidden;
            }
            .num{
              display: inline-block;
              width: 100%;
              height: 0.4rem;
              line-height: 0.4rem;
              font-size: 0.16rem;
            }
          }
        }
        .gift-content{
          padding: 0 4%;
          margin-top:0.05rem ;
          h3{
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.2rem;
          }
          >div{
            margin-top: 0.05rem;
            font-size: 0.14rem;
            line-height: 0.2rem;
          }
        }
        .gift-use{
          padding: 0 4%;
          margin-top:0.05rem ;
          h3{
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.2rem;
          }
          >p{
            margin-top: 0.05rem;
            font-size: 0.14rem;
            line-height: 0.2rem;
          }
        }
        .phone-list{
          padding: 0 04%;
          height:0.5rem ;
          line-height: 0.5rem;
          font-size: 0.16rem;
          >span:nth-of-type(1){
            display: block;
            display: inline-block;
            width: 0.2rem;
            height: 0.5rem;
            color: #e7384a;
          }
          >span:nth-of-type(2){
            display: block;
            display: inline-block;
            width: 1.8rem;
            height: 0.5rem;
            line-height: 0.5rem;
            color: #b4b4b4;
          }
          >input{
            display: inline-block;
            margin-top: 0.1rem;
            height: 0.3rem;
            line-height: 0.3rem;
            width: 80%;
          }
        }
      }
      .add{
        .Explain{
          font-size: 0.16rem;
          padding-left: 0.15rem;
          margin-top: 0.1rem;
          >p{
            height: 0.25rem;
            line-height: 0.25rem;
          }
        }
        .add-list{
          display: block;
          display: flex;
          font-size: 0.16rem;
          line-height: 0.5rem;
          height: 0.5rem;
          padding: 0 4%;
        }
        .add-list:nth-of-type(1){
          display: block;
          justify-content: flex-end;
          >span:nth-of-type(1){
            display: block;
            display: inline-block;
            margin-right: 0.05rem;
          }
          >span:nth-of-type(2){
            display: block;
            display: inline-block;
            margin-right: 0.03rem;
          }
          >span:nth-of-type(3){
            display: block;
            display: inline-block;
            color: #e7384a;
          }
        }
        .add-list:nth-of-type(2){
          .icon{
            height: 0.5rem;
            width: 0.5rem;
            display: inline-block;
            background-image: url("./wgx.png");
            background-size: 0.3rem 0.3rem;
            background-repeat: no-repeat;
            background-position: center left;
          }
          >span:nth-of-type(3){
            display: block;
            display: inline-block;
            color:#e7384a
          }
          .checkout{
            background-image: url("gx.png");
          }
        }
      }
    }
    .shielding{
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: rgba(0,0,0,0.4);
      z-index: 20;
      >div{
        position: absolute;
        top:0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 60%;
        height: 0.5rem;
        margin: auto;
        border-radius: 10px;
        line-height: 0.5rem;
        font-size: 0.16rem;
        color: #fff;
        background-color: #e7384a;
        text-align: center;
      }
    }
    .buttom{
      position: relative;
      left: 0;
      width: 100%;
      bottom: 0;
      height: 0.5rem;
      line-height: 0.5rem;
      background-color: #f7f7f9;
      display: block;
      display: flex;
      justify-content: flex-end;
      font-size: 0.16rem;
      >span:nth-of-type(1){
        display: block;
        display: inline-block;
        margin-right: 0.05rem;
      }
      >span:nth-of-type(2){
        display: block;
        display: inline-block;
        color: #e7384a;
        margin-right: 0.05rem;
      }
      >span:nth-of-type(3){
        display: block;
        display: inline-block;
        height: 0.5rem;
        width: 1.1rem;
        text-align: center;
        background-color: #e7384a;
        color: #fff;
      }
    }
  }
</style>
