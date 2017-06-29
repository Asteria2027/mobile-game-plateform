<template>
    <div id="hint">
        <div class="title">
          <i class="iconBack" @click="backUrl"></i>
          <h3>活动信息</h3>
        </div>
        <div class="hintContext">
          <div class="activity borderBottom-1px" @click="_goActivity()">
            <i></i>
            <h3>精彩活动</h3>
            <i class="icon-yjt"></i>
          </div>
          <!--<ul>-->
            <!--<li class="borderBottom-1px" v-for="item in activityData" @click="_goUrl(item.redirectUrl)">-->
                <!--<b>{{item.title}}</b>-->
                <!--<span></span>-->
                <!--<i class="icon-yjt"></i>-->
            <!--</li>-->
          <!--</ul>-->
        </div>
        <div class="allHintWrapper">
          <div class="allHint borderBottom-1px" @click="_goNews()">
            <i></i>
            <h3>全部消息&nbsp;<i class="hintNumber" v-if="userInfo.unreads>0">{{userInfo.unreads>99?"99+":userInfo.unreads}}</i></h3>
            <i class="icon-yjt"></i>
          </div>
          <!--<ul>-->
              <!--<li v-for="(item,index) in hintnews" @click="notic(item.id)" v-if="item.isMass==1&&index<5" class="borderBottom-1px">-->
                <!--<b>{{item.title}}</b>-->
                <!--<span></span>-->
                <!--<i class="icon-yjt"></i>-->
              <!--</li>-->
          <!--</ul>-->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

  import { mapState } from "vuex";

  export default {
    data(){
      return {
        activityData:'',
        hintnews:"",
        userId: this.$store.state.userInfo.userId
      }
    },
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf('hint')!=-1){
//          this.getUserInfo();
          this.userId=this.userInfo.userId;
//          debugger
        }
      },
      userId: function(){
        if(this.$route.path.indexOf('hint')!=-1){
          this.getData();
        }
      }
    },
    created(){
      this.getData();
    },
    methods:{
      getData(){
        this.$http.post("/api/hdzx/getActivity",{country:0,terminal:4,isAll:1,type:1},{emulateJSON:true}).then(function (res) {
          res = res.body;
          if (res.result===0){
            this.activityData = res.activity;
          }
        });
        this.$http.post("/api/userMsg/getMsgPage",{country:0,platformId:4},{emulateJSON:true}).then(function (res) {
          this.hintnews=res.body.data.list;
        })
      },
      notic(id){
        this.$router.push({path:'/notic/2/'+id})
      },
      backUrl(){
        window.history.back();
      },
      _goUrl(event){
        window.location = event;
      },
      _goNews(){
        this.$router.push({path:'/information'});
      },
      _goActivity(){
        this.$router.push({path:'/activity'});
      }
    },
    computed:{
      ...mapState(['userInfo'])
    }
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>
  #hint {
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow: auto;
    background: #f5f5f5;
    z-index: 2;
  }
  #hint .title {
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
      background-size: 0.3rem 0.3rem;
      background-position: center;
    }
  }
  #hint .hintContext {
    margin:0.1rem;
    background:#fff;
    border-radius:0.1rem;
    .activity {
      width: 100%;
      height:.72rem;
      padding-top:0.2rem;
      display: block;
      display:flex;
      i:nth-child(1){
        display: block;
        margin-left: 0.1rem;
        width: 0.5rem;
        height: 0.5rem;
        background: url("./hint01.png") no-repeat;
        background-size: 100%;
      }
      i:nth-child(3){
        display: block;
        width: 0.5rem;
        height: 0.55rem;
        line-height:.55rem;
        text-align: center;
        font-size: .18rem;
      }
      h3 {
        display: block;
        flex: 1;
        height: 0.55rem;
        line-height:.55rem;
        margin-left: 0.1rem;
        font-size: .18rem;
      }
    }
    ul {
      li {
        display: block;
        display:flex;
        height:.5rem;
        line-height:0.5rem;
        width: 100%;
        font-size: 0.16rem;
        font-weight: 300;
        color: rgba(0,0,0,0.75);
        b {
          display: block;
          flex: 1;
          margin-left: 0.15rem;
        }
        span {
          display: block;
          flex:0 0 0.35rem;
          margin-left: 0.15rem;
          margin-top: 0.1rem;
          background: url("./hintnew.png") no-repeat top right;
          background-size: 90%;
        }
        i {
          display: block;
          flex: 0 0 0.5rem;
          text-align: center;
          font-size: .18rem;
          line-height:.5rem;
        }
      }
    }
  }
  #hint .allHintWrapper {
    margin: 0.1rem;
    ul {
      background:#fff;
      li {
        display: block;
        display:flex;
        height:.5rem;
        line-height:0.5rem;
        width: 100%;
        font-size: 0.16rem;
        font-weight: 300;
        color: rgba(0,0,0,0.75);
        b {
          display: block;
          flex: 1;
          margin-left: 0.15rem;
        }
        span {
          display: block;
          flex:0 0 0.35rem;
          margin-left: 0.15rem;
          margin-top: 0.1rem;
          background: url("./hintnew.png") no-repeat top right;
          background-size: 90%;
        }
        i {
          display: block;
          flex: 0 0 0.5rem;
          text-align: center;
          font-size: .18rem;
          line-height:.5rem;
        }
      }
    }
  }
  #hint .allHint {
    width: 100%;
    height: .52rem;
    padding: 0.1rem 0;
    display: block;
    display:flex;
    background: #fff;
    border-radius: 0.1rem 0.1rem 0 0;
    >i:nth-child(1){
      display: block;
      margin-left: 0.1rem;
      /*display: inline-block;*/
      height: 0.5rem;
      width: 0.5rem;
      background: url("./hint03.png") no-repeat;
      background-size: 100%;
    }
    i:nth-child(3){
      display: block;
      width: 0.5rem;
      height: 0.55rem;
      line-height:.55rem;
      text-align: center;
      font-size: .18rem;
    }
    h3 {
      display: block;
      flex: 1;
      height: 0.55rem;
      line-height:.55rem;
      margin-left: 0.1rem;
      font-size: .18rem;
      .hintNumber {
        display: inline-block;
        width:0.2rem;
        height: 0.2rem;
        line-height:0.2rem;
        background: #f00;
        font-size: 0.08rem;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        position: relative;
        top:-0.1rem;
      }
    }
  }

</style>
