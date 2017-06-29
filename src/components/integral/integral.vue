<template>
	<div class="integral">
		<div class="integral-title">
			<span @click="agenBack" class="icon-back"></span>
			<span>积分任务</span>
			<span><router-link to="/detail">明细</router-link></span>
		</div>
		<div class="integralBan">
			<div class="integral-txt">做任务，赚积分，赢大礼</div>
			<div class="integralJf"><b>当前积分:</b><i>{{userInfo.jf}}</i></div>
		</div>
		<ul class="integralCon">
			<li class="borderBottom-1px">
				<div class="integralConLi-left">
					<p><b>注册奖励</b><i>+200</i></p>
					<p>完成注册即可获得</p>
				</div>
				<div class="integralConLi-right2 complete"></div>
			</li>
			<li class="borderBottom-1px">
				<div class="integralConLi-left">
					<p><b>每日签到</b><i>+50</i></p>
					<p>点击签到即可，连续签到更多惊喜！</p>
				</div>
				<div class="integralConLi-right2 complete" v-if="Sign"></div>
        <router-link to="/qiandao" class="integralConLi-right" v-if="!Sign">去签到</router-link>
			</li>
			<li class="borderBottom-1px">
				<div class="integralConLi-left">
					<p><b>完善个人资料</b><i>+200</i></p>
					<p>个人资料信息填写完成保存即可</p>
				</div>

				<div class="integralConLi-right2 complete" v-if="userInfo.address&&userInfo.location&&userInfo.qq&&userInfo.nickname&&userInfo.realName&&userInfo.sex"></div>
        <div @click="_personalData"><router-link to="/personalData" class="integralConLi-right" v-if="!userInfo.address||!userInfo.location||!userInfo.qq||!userInfo.nickname||!userInfo.realName||!userInfo.sex">领积分</router-link></div>
			</li>
			<!--<li class="borderBottom-1px">-->
				<!--<div class="integralConLi-left">-->
					<!--<p><b>邀请好友注册</b><i>+1200</i></p>-->
					<!--<p>邀请好友完成手机号注册即可</p>-->
				<!--</div>-->
				<!--<div class="integralConLi-right" @click="_Bomb(true)">领积分</div>-->
			<!--</li>-->
		</ul>
    <div class="Bomb" @click="_Bomb(false)" v-if="Bomb">

    </div>
    <div class="Bomb-notic" :class="{BombShow:Bomb}">
      <h3 class="Bomb-title">邀请好友</h3>
      <div class="Bomb-content">
        <div @click="_share('WB')">
          <span></span>
          <span>微博</span>
        </div>
        <div  @click="_share('QQ')">
          <span></span>
          <span>QQ</span>
        </div>
        <div @click="_share('TE')">
          <span></span>
          <span>QQ空间</span>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import { mapState } from 'vuex';
	export default {
		data() {
			return{
        Sign:false,
        Bomb:false,
			}
		},
		methods:{
      _personalData(){
          sessionStorage.setItem("integral","1");
      },
      _Bomb(value){
          this.Bomb=value;
      },
			agenBack() {
				if(sessionStorage.getItem("gamelistUrl")){
          this.$router.push(sessionStorage.getItem("gamelistUrl"));
          sessionStorage.removeItem("gamelistUrl")
        }else if(sessionStorage.getItem("gointegral")){
          this.$router.push(sessionStorage.getItem("gointegral"));
          sessionStorage.removeItem("gointegral")
        }
        else{
          this.$router.push('/par');
        }
			},
      _share(value){
        this.Bomb=false;
        this.$http.post('/api/pointShopUser/getInviteCode',{userId:this.userInfo.userId},{emulateJSON:true}).then(function(res) {
            if(res.body.result==0){
                if(value=="QQ"){
                  let winRef = window.open("", "_blank");
                  var picurl=picurl ? picurl : "http://public.13322.com/23c192a0.png";
                  var content="你的好友"+this.userInfo.userId+"邀请你加入《玩一下H5》游戏平台，共同开启你的游戏之旅!"+"邀请码:"+res.body.inviteCode;
                  var url =  "http://m.game.13322.com";
                  function loc(){
                    winRef.location='http://connect.qq.com/widget/shareqq/index.html?url='+url+'&showcount=0&desc='+content+'&summary='+content+'&title=玩一下&pics='+picurl;
                  }
                  setTimeout(function(){
                    loc();
                  },20)
                }else if(value=="WB"){
                  let winRef = window.open("", "_blank");
                  var picurl=picurl ? picurl : "http://public.13322.com/23c192a0.png";
                  var title="你的好友"+this.userInfo.userId+"邀请你加入《玩一下H5》游戏平台，共同开启你的游戏之旅!"+"邀请码:"+res.body.inviteCode;
                  var url =  "http://m.game.13322.com";
                  function loc(){
                    winRef.location='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picurl;
                  }
                  setTimeout(function(){
                    loc();
                  },20)
                }else if(value=="TE"){
                  let winRef = window.open("", "_blank");
                  var picurl=picurl ? picurl : "http://public.13322.com/23c192a0.png";
                  var title="你的好友"+this.userInfo.userId+"邀请你加入《玩一下H5》游戏平台，共同开启你的游戏之旅!"+"邀请码:"+res.body.inviteCode;
                  var url =  "http://m.game.13322.com";
                  function loc(){
                    winRef.location='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+picurl+'&title=玩一下';
                  }

                  setTimeout(function(){
                    loc();

                  },20)
                }
            }
        })
      },
      _sign(){
        let myDate = new Date().getDate();
        this.$http.post('/api/userPoint/queryMonthSign',{country:0},{emulateJSON:true}).then(function(res) {
          res = res.body;
          if(res.result==0&&res.data.continueDay>=1){
            let dataArr=res.data.day.split(";");

            for(let i=0;i<dataArr.length;i++){
              if (myDate==dataArr[i]){
                this.Sign=true;
              }
            }
          }else{
            this.Sign=false;
          }
        });
      }

		},
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('integral')!=-1){
          this._sign()
        }
      }
    },
    created(){
     this._sign();
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }

	}
</script>
<style lang="less" rel="stylesheet/less">
	 .integral{
	 	width: 100%;
	 	font-size: 0.14rem;
	 	position: absolute;
	 	top:0;
	 	left: 0;
	 	bottom: 0;
	 	right: 0;
	 	background: #fff;
	 	z-index: 9;
	 }
	 .integral-title{
	 	width: 100%;
	 	height: 0.45rem;
	 	background: #e7374b;
     display: block;
	 	display: flex;
	 }
	.integral-title>span:not(:nth-child(2)){
    display: block;
		width: 0.45rem;
		height: 0.45rem;
		font-size: 0.24rem;
		color: #fff;
		text-align: center;
		line-height: 0.45rem;
	}
	.integral-title>span:nth-child(2){
    display: block;
		flex: 1;
		text-align: center;
		line-height: 0.45rem;
		font-size: 0.24rem;
		color: #fff;
	}
	.integral-title>span>a{
    display: block;
    display: inline-block;
		text-align: center;
		font-size: 0.14rem;
		color: #fff;
    display: block;
	}
	.integralBan{
		width: 100%;
		height: 1.17rem;
		background: url(missionBG.png) no-repeat center;
		background-size: 100% 100%;
	}
	.integral-txt{
		text-align: center;
		padding-top:0.35rem;
		font-size: 0.16rem;
		color: #fff;
	}
	.integralJf{
		text-align: center;
		padding-top:0.1rem;
	}
	.integralJf>b{
		font-size: 0.14rem;
		color: #fff;
	}
	.integralJf>i{
			font-style: normal;
			color: #e7374b;
			font-size: 0.14rem;
	}
	.integralCon{
		width: 95%;
		overflow: hidden;
		margin:0 auto;
	}
	.integralCon>li{
		width: 100%;
		padding:0.15rem 0;
		overflow: hidden;
	}
	.integralConLi-left{
		float: left;
	}
	.integralConLi-left>p{
		line-height: 0.2rem;
	}
	.integralConLi-left>p:nth-child(2){
		color: #666;
		font-size: 0.12rem;
	}
	.integralConLi-left>p>b {
		font-size: 0.14rem;
		color: #1C1C1C;
	}
	.integralConLi-left>p>i{
		font-style: normal;
		color: #e7374b;
		font-size: 0.14rem;
		padding-left:0.1rem;
	}
	.integralConLi-right{
		float: right;
		width: 0.7rem;
		height: 0.35rem;
		background:#e7374b;
		text-align: center;
		line-height: 0.35rem;
		color: #fff;
		margin-top:0.1rem;
		border-radius: 8px;
	}
	.integralConLi-right2{
		float: right;
		width: 0.7rem;
		height: 0.35rem;
		background-size: 100% 100%;
		margin-top:0.1rem;
	}
  .integral .complete{
    background-image: url("mission06.png");
  }
  .Bomb{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
  }
   .BombShow{
     height:1.74rem !important;
   }
   .Bomb-notic{
     transition:height 1s ease;
     position: fixed;
     bottom:0rem ;
     left: 0;
     width: 100%;
     height:0rem;
     overflow: hidden;
     background-color: #fff;
     h3{
       height: 0.35rem;
       line-height: 0.35rem;
       text-align: center;
       font-size: 0.18rem;
     }
     >div{
        display: block;
       display: flex;
       justify-content: space-around;
       >div{
         height: 1.09rem;
         width: 0.77rem;
         text-align: center;
         >span:nth-of-type(1){
            display: block;
           height: 0.77rem;
           width: 0.77rem;
           display: inline-block;
           background-size: 0.77rem 0.77rem;
           background-position: center;
           background-repeat: no-repeat;
         }
         >span:nth-of-type(2){
            display: block;
            display: inline-block;
           height: 0.3rem;
           line-height: 0.3rem;
         }
       }
       >div:nth-of-type(1)>span:nth-of-type(1){
          display: block;
          display: inline-block;
         background-image: url("./mission04.png");
       }
       >div:nth-of-type(2)>span:nth-of-type(1){
          display: block;
          display: inline-block;
         background-image: url("./mission01.png");
       }
       >div:nth-of-type(3)>span:nth-of-type(1){
          display: block;
          display: inline-block;
         background-image: url("./mission02.png");
       }
     }
   }
</style>
