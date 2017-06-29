<template>
	<div class="alterPass">
		<div class="alterPass-tit">
			<span class="icon-back" @click="agenBack"></span>
			<span>修改密码</span>
			<span></span>
		</div>
		<div class="alterCon">
			<ul class="alterConUl">
				<li class="yuanPwd"><b>原密码</b><input type="password" placeholder="请输入原密码" onkeyup="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" v-model="yPass" @focus="ypass"/><span :class="{'icon-biyan1':!isYpwdShow,'icon-lgm':isYpwdShow}" @click="showPwd1()"></span></li>
				<li class="xinPwd"><b>新密码</b><input type="password" placeholder="8-14个字符，区分大小写" onkeyup="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" v-model="nPass" @focus="npass"/><span :class="{'icon-biyan1':!isXpwdShow,'icon-lgm':isXpwdShow}" @click="showPwd2()"></span></li>
			</ul>
			<div class="passTxt" v-if="isHint">{{rhint}}</div>
			<div class="passBtn" @click="passBtn">完成</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default{
		data() {
			return{
				yPass:"",
				nPass:"",
        rhint:"",
        isHint:false,
        isYpwdShow:false,
        isXpwdShow:false
			}
		},
    watch:{
      "$route": function () {
        if(this.$route.path.indexOf('alterPass')!=-1){
          this.yPass="";
          this.nPass="";
          this.passHit="";
          this.isYpwdShow=false;
          this.isXpwdShow=false;
        }
      }
    },
		methods:{
			agenBack() {
				window.history.back();
			},
			passBtn() {
        if(this.yPass&&this.nPass){
          if(this.yPass.length>=8&&this.yPass.length<=14){
            if(RegExp(/^[A-Za-z0-9]*$/g).test(this.yPass)){
                this.$http.post('/api/user/resetPwd',{country:0,oldPassword:hex_md5(this.yPass).toUpperCase(),password:hex_md5(this.nPass).toUpperCase()},{emulateJSON:true}).then(function(res) {
                  if(res.body.result==0){
                    this.rhint = '修改成功，为保证账号安全，请重新登录';
                    this.isHint = true;
                    let _this = this;
                    setTimeout(function () {
                      _this.rhint = '';
                      _this.isHint = false;
                      _this.$router.push('/login?alterPass=1');
                    },2000);
                  }else {
                    this.isHint = true;
                    this.rhint = res.body.msg;
                  }
                });
            }else{
              this.isHint = true;
              this.rhint = '密码仅能为数字,字母';
            }
          }else{
            this.isHint = true;
            this.rhint = '您输入的密码长度不足八位,请重新输入';
          }
        }else {
          this.isHint = true;
          this.rhint = '请输入密码';
        }
			},
			ypass() {
				this.passHit = " ";
        this.isHint = false;
        this.rhint = '';
			},
			npass() {
				this.passHit = " ";
        this.isHint = false;
        this.rhint = '';
			},
      showPwd1(){
        this.isYpwdShow = !this.isYpwdShow;
        if(this.isYpwdShow){
          $('.yuanPwd input').attr('type','text');
        }else {
          $('.yuanPwd input').attr('type','password');
        }
      },
      showPwd2(){
        this.isXpwdShow = !this.isXpwdShow;
        if(this.isXpwdShow){
          $('.xinPwd input').attr('type','text');
        }else {
          $('.xinPwd input').attr('type','password');
        }
      }
		}
	}
</script>
<style>
	.alterPass{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		background: #F5F5F5;
	}
	.alterPass-tit{
		width: 100%;
		height: 0.45rem;
		background: #E7374B;
    display: block;
		display: flex;
	}
	.alterPass-tit>span{
    display: block;
    display: inline-block;
		font-size: 0.24rem;
		text-align: center;
		line-height: 0.45rem;
		color: #fff;
	}
	.alterPass-tit>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
	}
	.alterPass-tit>span:nth-child(2){
    display: block;
		flex: 1;
	}
	.alterConUl>li{
		margin-top:0.1rem;
		padding:0.15rem 0;
		background: #fff;
		font-size: 0.16rem;
    display: block;
		display: flex;
	}
	.alterConUl>li>b{
		padding:0rem 0.15rem;
		width: 0.5rem;
		height: 0.2rem;
		display: block;
	}
	.alterConUl>li>span{
    display: block;
		width: 0.5rem;
		height: 100%;
		text-align: center;
		font-size: 0.2rem;
		color: #666;
	}
	.alterConUl>li>input{
    display: block;
		flex: 1;
	}
	.passTxt{
		width: 100%;
		padding-top:0.1rem;
		color: red;
		text-align: center;
		font-size: 0.16rem;
	}
	.passBtn{
		width: 3rem;
		height: 0.42rem;
		border-radius: 0.5rem;
		background: #E7374B;
		text-align: center;
		line-height: 0.42rem;
		color: #fff;
		font-size: 0.2rem;
		margin:0.3rem auto;
	}
</style>
