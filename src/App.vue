<template>
  <div>
    <div class="tab-bottom " ref="tabItem">
      <div class="tab-item borderTop-1px">
        <router-link to="/index">
          <div class="icon-home"></div>
          <span>首页</span>
        </router-link>
      </div>
      <div class="tab-item borderTop-1px">
        <router-link to="/gameHall">
          <div class="icon-table02"></div>
          <span>游戏大厅</span>
        </router-link>
      </div>
      <div class="tab-item borderTop-1px">
        <router-link to="/shop">
          <div class="icon-table04"></div>
          <span>商城</span>
        </router-link>
      </div>
      <div class="tab-item borderTop-1px">
        <router-link to="par">
          <div class="icon-table06"></div>
          <span>我的</span>
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="loginHint" v-if="isLoginHint1">
      <div class="hintImg"></div>
      <div>您的账号在其他设备登录，为保证账号安全请及时更改密码</div>
      <div class="loginHint_btn" @click="_loginHint()">朕知道了</div>
    </div>
    <div class="loginHint" v-if="isLoginHint2">
      <div class="hintImg"></div>
      <div>您的账号在异地登录，为保证账号安全请及时更改密码</div>
      <div class="loginHint_btn" @click="_loginHint()">朕知道了</div>
    </div>
    <div class="cover" v-if="isLoginHint1||isLoginHint2"></div>
  </div>
</template>

<script type="text/ecmascript-6">

  import { mapState,mapMutations,mapGetters,mapActions  } from 'vuex';

  export default {
    data(){
        return {

        };
    },
    watch:{
      '$route':'isTab'
    },
    created(){
     this.getUserInfo();
     this.getUserMessage();
     let getCid = new UrlSearch();
      if(getCid.cid){
        sessionStorage.setItem("cid",getCid.cid);
      }
    },
    methods:{
      isTab(){
        if(this.$route.path.indexOf('index')!=-1||this.$route.path.indexOf('gameHall')!=-1||this.$route.path.indexOf('shop')!=-1||this.$route.path.indexOf('par')!=-1){
          $(".tab-bottom").addClass("active")
        }else {
          $(".tab-bottom").removeClass("active")
        }
      },
      _loginHint(){
        this.$store.state.isLoginHint1 = false;
        this.$store.state.isLoginHint2 = false;
        $('html').css('overflow','');
        $('body').css('overflow','');
      }
    },
    computed:{
      ...mapState(['isLoginHint1','isLoginHint2'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  @import "assets/common/css/reset.css";
  @import "assets/common/css/index.css";

  .loginHint {
    margin:auto;
    position: fixed;
    z-index: 10000;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    text-align: center;
    background: #ffffff;
    width: 3rem;
    height:1.7rem;
    font-size: 0.14rem;
    color: #666666;
    border-radius: 0.05rem;
    .hintImg {
      height:0.7rem;
      width: 0.7rem;
      margin: -0.35rem auto 0.25rem;
      border-radius:50%;
      background: url("assets/common/images/exit.png") no-repeat center /100%;
    }
    div:nth-child(2){
      margin: 0 0.15rem;
      line-height:0.25rem;
      margin-bottom: 0.16rem;
    }
    .loginHint_btn {
      width: 2.7rem;
      height:0.35rem;
      line-height:0.35rem;
      margin:0 auto;
      background: #e7384a;
      color: #ffffff;
      border-radius: 0.05rem;
    }
  }
  .cover {
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,0.2);
    z-index: 999;
  }
  .tab-bottom {
    display: none;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    /*border-top:1px solid rgb(102, 102, 102);*/
    position: fixed;
    bottom:0;
    background: #fff;
    z-index: 2;

  }
  .tab-bottom.active{
    display: block;
    display: flex;
  }
  .tab-bottom .tab-item {
    display: block;
    flex: 1;
    text-align: center;
    line-height:0;
    .icon-home{
      font-size:0.25rem;
      line-height: 0.35rem;
      height: 0.35rem;
    }
    .icon-table02{
      font-size:0.25rem;
      line-height: 0.35rem;
      height: 0.35rem;
    }
    .icon-table04{
      font-size:0.25rem;
      line-height: 0.35rem;
      height: 0.35rem;
    }
    .icon-table06{
      font-size:0.25rem;
      line-height: 0.35rem;
      height: 0.35rem;
    }
  }

  .tab-bottom .tab-item > a {
    display: block;
    font-size: 0.15rem;
    font-weight: 400;
    color: rgb(102, 102, 102);
  }

  .tab-bottom .tab-item > a span {
    font-size: 0.14rem;
    height: 0.15rem;
    line-height: 0.15rem;
    display: inline-block;
  }

  .tab-bottom .tab-item > a.active {
    color: rgb(231, 55, 75);
  }


  /*.hideTab {*/
    /*display: none;*/
  /*}*/
</style>
