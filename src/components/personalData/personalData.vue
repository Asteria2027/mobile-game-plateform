<template>
      <div class="personalData">
          <div class="personalData-tit">
            <span class="icon-back" @click=" agenBack"></span>
            <span>个人资料</span>
            <span></span>
          </div>
          <div class="content">
            <ul>
              <li class="borderBottom-1px">
                <div class="conLi-left">头像</div>
                <div class="conLi-right">
                  <span>
                    <img :src="this.userInfo.headIcon" alt="" v-if="this.userInfo.headIcon">
                    <img src="./ionic.png" alt="" v-if="!this.userInfo.headIcon">
                  </span>
                  <i class="icon-yjt"></i>
                </div>
                <form id="uploadForm" class="file">
                  <input type="file" id="file"   accept="image/*" name="imageFile">
                </form>
              </li>
              <li class="borderBottom-1px">
              		<div class="conLi-left">账号</div><div class="conLi-right"><b>{{userInfo.userId}}</b></div>
              </li>
              <li class="borderBottom-1px">
              	<router-link to="/nickname">
              		<div class="conLi-left">昵称</div><div class="conLi-right"><b>{{userInfo.nickname}}</b><i class="icon-yjt"></i></div>
              	</router-link>
              </li>
              <li class="borderBottom-1px"  @click="showgets()"><div class="conLi-left">性别</div><div class="conLi-right"><b>{{sex[userInfo.sex-1]}}</b><i class="icon-yjt"></i></div></li>
            </ul>
            <ul>
              <li class="borderBottom-1px" @click="_realName">
              		<div class="conLi-left">实名认证</div><div class="conLi-right"><b>{{userIdname}}</b><i class="icon-yjt"></i></div>
              </li>
              <li class="borderBottom-1px">
          			<router-link to="/alterQQ">
              		<div class="conLi-left">QQ号码</div><div class="conLi-right"><b>{{this.userInfo.qq}}</b><i class="icon-yjt"></i></div>
              	</router-link>
              </li>
              <li class="borderBottom-1px">
              	<router-link to="/alterdizhi">
              		<div class="conLi-left">所在地区</div><div class="conLi-right"><b>{{this.userInfo.location}}</b><i class="icon-yjt"></i></div>
              	</router-link>
              </li>
              <li class="borderBottom-1px" v-if="userInfo.loginType!=3">
              	<router-link to="alterPass">
              		<div class="conLi-left">修改密码</div><div class="conLi-right"><b></b><i class="icon-yjt"></i></div>
              	</router-link>
              </li>
              <li class="lastLi borderBottom-1px" @click="alterxxdz">
              		<div class="conLi-left lastLi-left">详细地址</div><div class="conLi-right lastLi-right"><b>{{this.userInfo.address}}</b><i class="icon-yjt"></i></div>
              </li>
            </ul>
          </div>
						<div class="getsex-wrap" v-show="showget">
							<ul class="getsex">
								<li class="borderBottom-1px" v-for='(val,key) in sex' @click='showsex($event,key)'>{{val}}</li>
							</ul>
						</div>
          <div class="loading" v-if="loading"></div>
      </div>
</template>
<script>
		import { mapState } from 'vuex';
		let head=1;
    export default{
        data() {
            return{
              userSex:"",
              showget:false,
              sex:['男','女','保密','取消'],
              userIdname:"",
              loading:false
            }
        },
        watch:{
            '$route':function () {
              if(this.$route.path.indexOf('personalData')!=-1){
                this.userSex="";
                this.showget=false;
                this.userIdname="";
                this.loading=false;
                this.getUserInfo();
                this.userId();
              }
            }
        },
        created (){
           this.$nextTick(function() {
//             console.log(this.$store.state.userInfo.loginType);
              this.userId();
              let self=this;
              $("#file").on("change",function () {
                self.loading=true;
                let formData = new FormData($( "#uploadForm" )[0]);
                $.ajax({
                  url: 'http://file.13322.com/upload/uploadImage.do' ,
                  type: 'POST',
                  data: formData,
                  dataType:'JSON',
                  async: true,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success: function (resultd) {
                    self.$http.post('/api/user/updateUserInfo',{country:0,headIcon:JSON.parse(resultd).url},{emulateJSON:true}).then(function(res){
                      self.userInfo.headIcon=JSON.parse(resultd).url;
                      self.loading=false;
                    })
                  },
                  error: function (returndata) {
                    console.log(returndata);
                  }
                });
              })
            })
        },
        methods:{
          agenBack() {
              if(sessionStorage.getItem("integral")){
                this.$router.push('/integral');
                sessionStorage.removeItem("integral")
              }else{
                this.$router.push('/par');
              }
          },
          alterxxdz(){
              if(this.userInfo.address){
                  sessionStorage.setItem("alterxxdz",this.userInfo.address)
              }
            this.$router.push('/alterxxdz');
          },
          _realName(){
              if(!this.userInfo.realName){
                this.$router.push('/realName');
              }
          },
          showgets() {
            this.showget = true;
          },
          showsex(ev,mykey){
            console.log(mykey)
            if(mykey<3){
              this.userInfo.sex = mykey+1;
              this.$http.post('/api/user/updateUserInfo',{country:0,sex:mykey+1},{emulateJSON:true}).then(function(res){
                this.showget = false;
              })
            }else {
              this.showget = false;
            }
          },
          userId() {
            if(this.userInfo.realName){
                this.userIdname = "已认证";
            }else{
                this.userIdname = "未认证";
            }
          }
        },

         computed: {
            ...mapState(['userInfo', 'isLogin'])

         },
    }
</script>
<style scoped>
  .personalData{
      width:100%;
      position: absolute;
      top:0;
      bottom: 0;
      background: #f5f5f5;
      z-index:9;
      font-size: 0.14rem;
    }
  .personalData-tit{
    width:100%;
    height:0.45rem;
    background: #e7374b;
    display: block;
    display: flex;
  }
  .personalData-tit>span{
    display: block;
    display: inline-block;
    font-size:0.24rem;
    color:#fff;
    text-align: center;
    line-height: 0.45rem;
  }
  .personalData-tit>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
    width:0.45rem;
    height:0.45rem;
  }
  .personalData-tit>span:nth-child(2){
    display: block;
    flex: 1;
  }
.content{
  width:100%;
}
  .content>ul{
    width:100%;
    background: #fff;
    margin-bottom:0.1rem;
  }
  .content>ul>li{
    overflow: hidden;
    padding:0.05rem 0.15rem;
    font-size:0.16rem;
    position: relative;
  }
  .lastLi{
    overflow: auto;
  }
.lastLi-left{
  width: 0.8rem;
}
.lastLi-right{
 width: 75%;
}
  .lastLi-right>b{
    width: 90%;
    display: block;
    float: left;
    text-align: right;
    word-wrap:break-word;
    line-height: 0.2rem;
    padding:0.1rem 0 0.05rem 0;
  }
  .content>ul>li #file{
    opacity: 0;
    position: absolute;
    z-index: 2;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .conLi-left{
    float: left;
    line-height: 0.48rem;
    color: #666;
  }
  .conLi-right{
    float: right;
    line-height: 0.48rem;
  }
.conLi-right>span{
  display: block;
  float: left;
  width:0.46rem;
  height:0.46rem;
  border-radius: 50%;
  overflow: hidden;
}
  .conLi-right>span>img{
    display: block;
    display: inline-block;
    width:100%;
    height:100%;
  }
  .conLi-right>i{
    color: #666;
    padding-left:0.05rem;
  }
  .conLi-right>b{
    color: #666;
    font-weight: 100;
    font-size: 0.14rem;
  }

  .content>ul>li>a{
  	display: block;
  	width: 100%;
  	height: 0.5rem;
  }
.getsex-wrap{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
    left:0;
    right: 0;
		background: rgba(0,0,0,0.4);
		z-index: 9;
	}
	.getsex{
		width: 100%;
		background: #fff;
		position: absolute;
		left: 0;
		bottom: 0;

	}
	.getsex>li{
		padding:0.1rem 0;
		text-align: center;
		font-size: 0.16rem;
		color: #1C1C1C;
	}
  .personalData .loading {
    top:0;
    left:0;
    z-index:1000002;
    background-color:rgba(255,255,255,.6);
    width:100%;
    height:100%;
    position:fixed;
    overflow:hidden
  }
  .personalData .loading:before {
    content:"";
    background:url('./loading.acd260c1.png') center center no-repeat;
    height:.4rem;
    width:.4rem;
    top:50%;
    left:50%;
    position:fixed;
    margin:-0.2rem 0 0 -0.2rem;
    animation:loading .8s linear infinite;
    -webkit-animation:loading .8s linear infinite;
    background-size:100% 100%
  }
  .personalData .loading:after {
    content:"正在上传...";
    top:56%;
    left:50%;
    transform:translate(-44%,-50%);
    -ms-transform:translate(-44%,-50%);
    -webkit-transform:translate(-44%,-50%);
    -moz-transform:translate(-44%,-50%);
    -o-transform:translate(-44%,-50%);
    position:fixed;
    color:#1581cc;
    font-size:0.14rem;
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
</style>
