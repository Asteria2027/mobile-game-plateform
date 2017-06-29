<template>
    <div class="payresult">
      <cjTitle :title="title"></cjTitle>
      <div class="payresult-con-s" v-if="status==0">
        <div class="pay-img borderBottom-1px">
          <img src="./paysuccess.png">
          <p>充值成功</p>
        </div>
        <ul>
          <li class="borderBottom-1px">
            <span>账户：</span>
            <span>{{userName}}</span>
          </li>
          <li class="borderBottom-1px">
            <span>充值订单号：</span>
            <span>{{userD}}</span>
          </li>
          <li class="borderBottom-1px">
            <span>充值金额：</span>
            <span class="money">{{money}}元</span>
          </li>
        </ul>
      </div>
      <div class="payresult-con-f" v-if="status==1">
        <div class="pay-img">
          <img src="./payfail.png">
          <p>充值失败</p>
          <p>原因：{{payMsg}}</p>
        </div>
      </div>
      <div class="returnRoute">
        <span v-if="status==0" @click="_returnRoute('index')">返回首页</span>
        <span v-if="status==0" @click="_returnRoute('pay')">再充一笔</span>
        <span v-if="status==1" @click="_returnRoute('me')">联系客服</span>
        <span v-if="status==1" @click="_returnRoute('pay')">继续充值</span>
      </div>
    </div>


</template>

<script type="text/ecmascript-6">

  import cjTitle from '../cjTitle/cjTitle.vue';
  import { mapState } from 'vuex';
  export default {
    data(){
      return {
        title:'充值',
        status:1, //0成功状态 1失败状态
        payMsg:'操作超时',
        userName:'',
        userD:'',
        money:'',
        payTime:'充值失败'
      }
    },
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf("payresult")!=-1) {
          this.$nextTick(() => {
            let height=$(window).height();
            $(".payresult-con-f").height(height-$(".payresult .title").height()-$(".payresult .title").height());
            $(".payresult-con-s").height(height-$(".payresult .title").height()-$(".payresult .title").height());
          })
          if(sessionStorage.getItem('payresult')) {
            sessionStorage.removeItem("formGame");
            this.status = sessionStorage.getItem('payresult');
            this.payMsg = sessionStorage.getItem('payresultMsg');
            sessionStorage.removeItem('payresult');
            this.userName=this.userInfo.userId;
            this.userD=sessionStorage.getItem("outTradeNo");
            this.money=sessionStorage.getItem("payMomey")
          }
          if(sessionStorage.getItem("payresultTime")=="1"){
                this.payTime="";
          }else{
            this.payTime="充值失败";
          }
        }
      }
    },
    created(){
      this.$nextTick(() => {
        let height=$(window).height();
        $(".payresult-con-f").height(height-$(".payresult .title").height()-$(".payresult .title").height());
        $(".payresult-con-s").height(height-$(".payresult .title").height()-$(".payresult .title").height());
      })

      if(sessionStorage.getItem('payresult')) {
        this.status = Number(sessionStorage.getItem('payresult'));
        this.payMsg = sessionStorage.getItem('payresultMsg');
        sessionStorage.removeItem('payresult');
        this.userName=this.userInfo.userId;
        this.userD=sessionStorage.getItem("outTradeNo");
        this.money=sessionStorage.getItem("payMomey")
      }
      if(sessionStorage.getItem("payresultTime")=="1"){
        this.payTime="";
      }else{
        this.payTime="充值失败";
      }
    },
    methods:{
      _returnRoute(value){
          if(value=="me"){
            window.location.href="http://71chat.com/scsf/phone/visitor.html?cmpcd=178019";
          }else{
              if(sessionStorage.getItem('bankreturnUrl')&&value=="index"){
                  window.location.href=sessionStorage.getItem('bankreturnUrl');
              }else{
                this.$router.push({path:'/'+value})
              }
          }
      }
    },
    components:{
      cjTitle
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .payresult {
    background:#f5f5f5;
    height: 100%;
    width: 100%;
    display: block;
    .returnRoute {
      display: block;
      height: 0.45rem;
      line-height:0.45rem;
      width:100%;
      background: #e7384a;
      position: relative;
      span {
        width: 50%;
        float: left;
        text-align: center;
        color: #FFFFFF;
        font-size: 0.16rem;
      }
    }
  }
  .payresult-con-s {
    background:#fff;
    padding-top: 0.45rem;
    .pay-img {
      text-align: center;
      padding-bottom:0.14rem;
      img {
            display: block;
            margin:0rem auto;
            width: 1.2rem;
            height: 1.2rem;
          }
      p {
        font-size:0.18rem;
        color:#00e80b;
      }

    }
    ul {
      li {
        padding:0 0.15rem;
        height: 0.4rem;
        line-height:0.4rem;
        font-size:0.14rem;
        span:nth-child(1){
          display: block;
          display: inline-block;
          float: left;
        }
        span:nth-child(2){
          display: block;
          display: inline-block;
          float: right;
        }
        .money {
          color:#ee8600;
        }
      }
    }
  }
  .payresult-con-f {
    background:#fff;
    padding-top: 0.45rem;
    .pay-img {
      text-align: center;
      padding-bottom:0.06rem;
      img {
        display: block;
        margin:0 auto ;
        width: 1.2rem;
        height: 1.2rem;
      }
      p {
        font-size:0.18rem;
        color:#e7384a;
      }
      p:nth-child(3) {
        color:#ff0000;
        line-height:0.3rem;
        font-size:0.14rem;
      }
    }
  }
</style>
