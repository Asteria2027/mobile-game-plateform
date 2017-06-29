<template>
	<div class="realName">
		<div class="realName-tit">
			<span class="icon-back" @click="agenBack"></span>
			<span>实名认证</span>
			<span></span>
		</div>
		<div class="realNameCon">
			<div class="txt">完成实名认证获得<b>200</b>积分的奖励</div>
			<ul class="realNameUl">
				<li class="borderBottom-1px realuserName"><b>真实姓名</b><input type="text" placeholder="请输入您的真实姓名" @focus='xmipt' v-model='xm'/></li>
				<li class="borderBottom-1px realuserCar"><b>身份证号</b><input type="number" placeholder="请输入您的身份证号码" @focus='sfzipt' @keyup ='keyin()' v-model='sfz' /></li>
			</ul>
			<div class="realHit" >{{realname}}</div>
			<div class="realBtn" @click="realBtn">提交证明</div>
		</div>
	</div>
</template>
<script>
		 import { mapState } from 'vuex';
	export default {
		data() {
			return{
				sfz:"",
				xm:"",
				realname:''
			}
		},
		created() {
			this.$nextTick(function() {

			})
		},
		methods:{
			agenBack() {
				window.history.back();
			},
			realBtn() {
				if(this.xm.trim() == '' || this.sfz.trim() == '' ){
					this.realname = '请输入您的真实姓名和身份证号码';
				}else {
					if(this.sfz.length == 18){
						this.$http.post('api/user/userWSFCMXX',{country:0,realname:this.xm,idcardNo:this.sfz},{emulateJSON:true}).then(function(res){
							console.log(res.body)
							if(res.body.result == 0){
								this.userInfo.realName=this.xm;
								this.$router.push('/personalData');
							}else {
								this.realname = res.body.msg;
							}
						},function(){

						})
					}else {
						this.realname ='请输入正确的身份证号码';
					}
				}


			},
			keyin(){
				console.log(1);
			},
			xmipt(){
				this.realname = '';
			},
			sfzipt(){
				this.realname = '';
			}

		},
		computed: {
          ...mapState(['userInfo', 'isLogin'])

       	},

	}
</script>
<style>
.realName{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;bottom: 0;
	background: #F5F5F5;
}
	.realName-tit{
		width: 100%;
		height: 0.45rem;
		background: #e7374b;
    display: block;
		display: flex;
		font-size: 0.24rem;
		color: #fff;
	}
	.realName-tit>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
		text-align: center;
		line-height: 0.45rem;
	}
	.realName-tit>span:nth-child(2){
    display: block;
		flex: 1;
		text-align: center;
		line-height: 0.45rem;
	}
	.txt{
		padding:0.2rem 0;
		font-size: 0.16rem;
		color: #1C1C1C;
		text-align: center;
	}
	.txt>b{
		color: red;
	}
	.realNameUl{
		width: 100%;
		background: #fff;
	}
	.realNameUl>li{
		padding:0.1rem 0;
    display: block;
		display: flex;
	}
	.realNameUl>li>b{
		width: 0.75rem;
		height: 0.25rem;
		display: block;
		font-size: 0.16rem;
		border-right: 1px solid #F5F5F5;
		text-align: center;
		line-height: 0.25rem;
	}
	.realNameUl>li>input{
    display: block;
		flex: 1;
		padding-left:0.1rem;
		font-size: 0.16rem;
	}
	.realBtn{
		width: 3rem;
		height: 0.42rem;
		background: #E7374B;
		text-align: center;
		line-height: 0.42rem;
		font-size: 0.16rem;
		color: #fff;
		border-radius: 0.5rem;
		margin:0.3rem auto;

	}
	.realHit{
		width: 100%;
		text-align: center;
		padding-top:0.1rem;
		font-size: 0.14rem;
		color: red;
	}
</style>
