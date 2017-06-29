<script src="../../../../../../Documents/Tencent Files/3547516624/FileRecv/mainshCtrl.js"></script>
<template>
    <div id="par" ref="par">
      <div>
        <div class="par-title">
          <div class="unloging"  v-if="!isLogin">您还没有登录，<a @click="_gotologin()">请登录/注册</a></div>
          <div class="logingtrue">
            <router-link to="/personalData">
              <dl class="loging-dl" v-if="isLogin">
                <dt><img v-if="!userInfo.headIcon"  src="./ionic.png"/><img v-if="userInfo.headIcon" :src="userInfo.headIcon"></dt>
                <dd>{{userInfo.nickname}}</dd>
              </dl>
            </router-link>
          </div>
        </div>
        <ul class="recharge">
          <li class="recharge-lyb" @click="_goPay">
            <a href="javascript:;">
              <b><i>乐盈币：</i><span>{{userInfo.lyb}}</span></b>
            </a>
          </li>
          <li class="recharge-quan">
            <router-link to="exchange">
              <b><i>乐盈券：</i><span>{{userInfo.lyq}}</span></b>
            </router-link>
          </li>
          <li class="recharge-jf">
            <router-link to="/integral">
              <b><i>积分：</i><span>{{userInfo.jf}}</span></b>
            </router-link>
          </li>
        </ul>
        <div class="par-conent">
          <ul class="my-top-ul my-top-ul1" >
            <li>
              <router-link to="/integral">
                <p><span></span><b>积分任务</b></p>
              </router-link>
            </li>
            <li>
              <router-link to="/information">
                <p><span></span><b>我的消息</b></p>
              </router-link>
            </li>
            <li>
              <router-link to="/collect">
                <p><span></span><b>我的收藏</b></p>
              </router-link>
            </li>
            <li>
              <router-link to="/conversion">
                <p><span></span><b>购买记录</b></p>
              </router-link>
            </li>
          </ul>
          <ul class="my-top-ul my-mid-ul2">
            <li  @click="debit" v-if="menulist[1]"><router-link to="/debit"><p><span></span><b>游戏划账</b></p></router-link></li>
            <li  @click="debit" v-if="menulist[0]"><router-link to="/exchange"><p><span></span><b>乐盈券兑换</b></p></router-link></li>
            <li><router-link to="/paydetail"><p><span></span><b>充值明细</b></p></router-link></li>
            <li><router-link to="/profile1"> <p> <span></span><b>收货地址</b></p></router-link></li>
          </ul>
          <ul class="my-top-ul my-mid-ul3">
            <li><router-link to="/suggest"><p><span></span><b>建议反馈</b></p></router-link></li>
            <li><a href="http://71chat.com/scsf/phone/visitor.html?cmpcd=178019"> <p> <span></span><b>联系我们</b></p></a></li>
          </ul>
          <div class="signIn" v-if="isLogin"><router-link to="/qiandao" style="display: inline-block;height: 100%;width: 100%;"></router-link></div>
          <!--<div class="par-btn" @click="exit" v-if="isLogin">退出当前账号</div>-->

          <!--<div class="par-btn" v-if="!isLogin"><router-link to="/login" >请登录</router-link></div>-->
        </div>
      </div>
      <div class="zG">
        <div class="par-btn" @click="showexit()" v-if="isLogin">退出当前账号</div>
      </div>
      <div class="m-loginexit"  v-show="showTc">
        <div class="loginexitCon">
          <div class="loginexitCon-pic"></div>
          <div class="loginexitCon-txt">是否确认退出当前登录帐号？</div>
          <div class="loginexitBut">
            <span @click="hideexit">取消</span>
            <span  @click="exit" v-if="isLogin">确定</span>
          </div>
        </div>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  export default{
      data() {
          return{
            showTc:false,
            menulist:[false,false]
          }
      },
    created(){
      let Requres = new UrlSearch();
      if(Requres.wx=="1"){
          this.getUserInfo();
      }
      this.$http.get('/api/menu/list').then((response)=> {
        response=response.body;
        if(response.result==0){
          for(let i =0;i<response.data.length;i++){
            if(response.data[i].menuType==3){
              if(response.data[i].status==1){
                this.menulist.splice(0,1,true);
              }else{
                this.menulist.splice(0,1,false);
              }
            }else if(response.data[i].menuType==4){
              if(response.data[i].status==1){
                this.menulist.splice(1,1,true);
              }else{
                this.menulist.splice(1,1,false);
              }
            }
          }
        }
      })
    },
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf('par')!=-1){
          this.getUserInfo();
          $(".Load").hide();
          this.$nextTick(function () {
//            let self=this;
//            let height = $(window).height();
//            $('#par').height(height-$(".tab-bottom").height());
//            self._initScroll();
          });
        }
      }
    },
    methods:{
      _initScroll(){
//        if(!this.parScroll){
//          this.parScroll = new BScroll(this.$refs.par,{
//            click:true
//          })
//        }else {
//          this.parScroll.refresh();
//        }
      },
      exit(){
        this.exitLogin();
//        sessionStorage.removeItem('weixinLogin');
        this.showTc = false;
      },
      showexit() {
          this.showTc = true
        this.$nextTick(function () {
          this._initScroll()
        })
      },
      hideexit() {
          this.showTc = false
      },

      debit(){
        sessionStorage.setItem('returnurl','/par');
        sessionStorage.removeItem("toId");
        sessionStorage.removeItem("DformID");
        sessionStorage.removeItem("exchangeId");
      },
      _gotologin(){
          sessionStorage.setItem('sanfanurl','/par');
          this.$router.push({path:'/login'});
      },
      _goPay(){
//        window.location.href = this.Url+'/zhifu/pay.html?userId='+this.$store.state.userInfo.userId+'&&lyb='+this.$store.state.userInfo.lyb;
//        if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
//          if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
//            window.location.href = this.Url+'/zhifu/pay.html?userId='+this.$store.state.userInfo.userId+'&lyb='+this.$store.state.userInfo.lyb+"&token="+$.fn.cookie("token");
//          }else{
//            this.$router.push({path:'/pay?userId='+this.$store.state.userInfo.userId+"&lyb="+this.$store.state.userInfo.lyb+"&token="+$.fn.cookie("token")});
//          }
//        }else{
          this.$router.push({path:'/pay'});
//        }
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #par {
    font-size:0.14rem;
    width: 100%;
    background: #F5F5F5;
    overflow: auto;
  }
  #par>div{
  }
  #par .par-conent{
  	position: relative;
  }
  #par .par-title{
  	width: 100%;
  	height: 2rem;
  	background: url(icon4.png);
    background-size: 3.1rem;
    background-position: 0 0;
  }
  #par .unloging{
  	text-align: center;
  	padding-top:0.9rem;
  	font-size: 0.18rem;
  	color: #fff;
  }
  #par .unloging>a{
  	color: yellow;
    display: inline-block;
  }

  #par .loging-dl{
  	width:1.2rem;
  	height: 1.2rem;
  	margin:0 auto;
  	padding-top:0.4rem;
  }
  #par .loging-dl>dt{
  	width: 0.7rem;
  	height: 0.7rem;
  	border-radius: 50%;
  	margin:0 auto;
  }
  #par .loging-dl>dt>img{
    display: block;
    display: inline-block;
  	width: 100%;
  	height: 100%;
  	border-radius: 50%;
  }
  #par .loging-dl>dd{
  	text-align: center;
  	padding-top:0.1rem;
  	color:#fff;
  }
  #par .recharge{
	width: 95%;
	height: 0.58rem;
	background: #fff;
	margin: 0 auto;
	margin-top:-0.3rem;
	border-radius: 5px;
	box-shadow: 0 0 5px #888;
    display: block;
	display: flex;
}
  #par .recharge>li{
    max-width: 33.3%;
    display: block;
    box-sizing: border-box;
    flex: 1;
    height: 0.58rem;
    line-height: 0.58rem;
    font-size: 0.12rem;
}
  #par .recharge>li>a{
    display: block;
    height: 100%;
  }
  #par .recharge>li>a>b{
	  color: #161616;
    width: 100%;
    height: 100%;
    line-height: 0.58rem;
    display: block;
    display: flex;
  }
  #par .recharge>li>a>b>i{
	font-style: normal;
	padding-left:0.05rem;
}
  #par .recharge>li>a>b>span{
	  color:#e7384a;
    display: block;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
}
  #par .recharge>div:nth-child(1){
	border-right: 1px solid #F5F5F5;
}
  #par .recharge>div>div>span{
    display: block;
    display: inline-block;
	font-size: 0.16rem;
	color: #e7384a;
}
  #par .lybcj{
	float: right;
	background: #e7384a;
	color: #fff;
	font-size: 0.12rem;
	margin-top:0.11rem;
	margin-right: 0.1rem;
	padding:0.02rem;
}
  #par .recharge>li:nth-child(1),#par .recharge>li:nth-child(2) {
	border-right: 1px solid #F5F5F5;
}
  #par .par-conent{
	width: 100%;

	margin-top:0.1rem;
}
  #par .my-top-ul{
	width:100%;
	background: #fff;
	overflow: hidden;
}
  #par .my-top-ul>li{
	width: 50%;
	height: 0.47rem;
	box-sizing: border-box;
	border-bottom: 1px solid #F5F5F5;
	float: left;
}
  #par .my-top-ul>li>a>p{
	width: 100%;
	height:0.3rem;
	display: block;
	border-right: 1px solid #F5F5F5;
	margin-top:0.1rem;
}
  #par .my-top-ul>li>a>p>span{
    display: block;
	display: inline-block;
	float: left;
	width: 0.27rem;
	height: 0.27rem;
	border-radius: 50%;
	margin-left:0.3rem;
	background: url(icon4.png);
}
  #par .my-top-ul>li>a>p>b{
	line-height: 0.3rem;
	padding-left:0.1rem;
  color: #1c1c1c;
}

  #par .my-top-ul1>li:nth-child(1)>a>p>span{
    display: block;
    display: inline-block;
	background-size: 3.75rem 3.39rem;
    background-position: -0.98rem 0.97rem;
}
  #par .my-top-ul1>li:nth-child(2)>a>p>span{
    display: block;
    display: inline-block;
	background-size: 3.75rem 3.39rem;
    background-position: -2rem 0.97rem;
}


  #par .my-top-ul>li:nth-child(3)>a>p>span{
    display: block;
    display: inline-block;
	background-size: 3.75rem 3.39rem;
    background-position: -1.5rem 0.97rem;
}
  #par .my-top-ul1>li:nth-child(4)>a>p>span{
    display: block;
    display: inline-block;
	background-size: 3.75rem 3.39rem;
    background-position: -3.46rem 0.97rem;
}
  #par .my-mid-ul2{
	margin-top:0.1rem;
}
  #par .my-mid-ul2>li:nth-child(1)>a>p>span{
    display: block;
    display: inline-block;
    background-image: url("./huanzhang.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  #par .my-mid-ul2>li:nth-child(2)>a>p>span{
    display: block;
    display: inline-block;
    background-image: url("./duihuan.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  #par .my-mid-ul2>li:nth-child(3)>a>p>span{
    display: block;
    display: inline-block;
	background-size: 3.75rem 3.39rem;
    background-position: -0.5rem 0.97rem;
}
  #par .my-mid-ul2>li:nth-child(4)>a>p>span{
    display: block;
    display: inline-block;
	background-size: 3.75rem 3.39rem;
    background-position: -2.5rem 0.97rem;
}
  #par .my-mid-ul3{
	margin-top:0.1rem;
}

  #par .my-mid-ul3>li:nth-child(1)>a>p>span{
    display: block;
    display: inline-block;
	  background-size: 3.75rem 3.39rem;
    background-position: -2.95rem 0.97rem;
}
  #par .my-mid-ul3>li:nth-child(2)>a>p>span{
    display: block;
    display: inline-block;
	background-size: 3.75rem 3.39rem;
    background-position: -0.02rem 0.97rem;
}
  #par .par-btn{
	width: 90%;
	height: 0.47rem;
	background: #e7384a;
	font-size: 0.22rem;
	color: #fff;
	text-align: center;
	line-height: 0.47rem;
	margin:0 auto;
	border-radius: 0.5rem;
}
  #par .par-btn a {
    color:#fff;
  }
  #par .zG{
    height: 1rem;
    background-color: #fff;
    padding-top: 0.1rem;
    padding-bottom: 0.55rem;
  }
  #par .signIn{
	width: 0.58rem;
	height: 0.58rem;
	background: url(icon4.png);
	background-size: 3.75rem 3.39rem;
	background-position: 0  0.58rem;
	position: absolute;
	bottom: 0.9rem;
	right: 0.1rem;
	border-radius: 50%;
}
  .m-loginexit{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    z-index: 9;
    top:0;
    left:0;
  }
.loginexitCon{
  width: 3rem;
  height:1.6rem;
  background: #fff;
  position: absolute;
  top:50%;
  margin-top:-0.8rem;
  left:50%;
  margin-left:-1.5rem;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #888;
}
.loginexitCon-pic{
  width:0.7rem;
  height:0.7rem;
  background: url("tcgth.png") no-repeat center;
  background-size: 100% 100%;
  margin:0 auto;
  margin-top:-0.35rem;
  border-radius: 50%;
}
.loginexitCon-txt{
  text-align: center;
  font-size:0.16rem;
  color: #666;
  padding:0.3rem 0 0.3rem 0;
}
.loginexitBut{
  height:0.47rem;
  border-top:1px solid #f5f5f5;
}
.loginexitBut>span{
  display: block;
  display: inline-block;
  width:1.49rem;
  text-align: center;
  line-height: 0.47rem;
  font-size:0.16rem;
  color: #666;
  float: left;
}
  .loginexitBut>span:nth-child(1){
    display: block;
    display: inline-block;
    border-right: 1px solid #f5f5f5;
  }




</style>
