<template>
	<div class="nickname">
		<div class="nicknameTit">
			<span class="icon-back" @click="agenBack"></span>
			<span>修改昵称</span>
			<span class="save" @click="save">保存</span>
		</div>
			<div class="nicknameCon-wrap">
				<div class="nicknameCon">
					<input type="text"placeholder="请输入您的昵称" v-model='nick' maxlength="15" @focus="nicknameH" />
					<span class="icon-lgcs" @click="nicknameColse"></span>
				</div>
			<p class="incknameHint">{{incknameH}}</p>
		</div>

	</div>
</template>
<script>
	import { mapState } from 'vuex';
	export default{
		data() {
			return{
				nick:"",
				incknameH:""
			}
		},
		methods:{
			agenBack() {
				window.history.back();
				window.location.reload();
			},
			save() {
				if(this.nick.trim() == ""){
					this.incknameH = "请输入您的昵称";
				}else{
					this.userInfo.nickname = this.nick;
					let nickname=this.nick
          this.$http.post('/api/userUtil/keyWordFilter',{country:0,nickname:this.nick},{emulateJSON:true}).then(function(res) {
            if(res.body.result==0){
              this.$http.post('/api/user/updateUserInfo',{country:0,nickname:nickname},{emulateJSON:true}).then(function(res) {
                this.$router.push('/personalData');
              })
            }else{
              this.incknameH = res.body.msg;
            }
          })
					this.nick = "";
				}
			},
			nicknameColse() {
				this.nick = ""
			},
			nicknameH() {
				this.incknameH = "";
			}
		},
		computed: {
          ...mapState(['userInfo', 'isLogin'])
      },
	}
</script>
<style>
	.nickname{
		width: 100%;
		position: absolute;
		top: 0;bottom: 0;
		background: #F5F5F5;
	}
	.nicknameTit{
		width: 100%;
		height: 0.45rem;
		background: #E7374B;
    display: block;
		display: flex;

	}
	.nicknameTit>span{
    display: block;
    display: inline-block;
		font-size: 0.24rem;
		color: #fff;
		text-align: center;
		line-height: 0.45rem;
	}
	.nicknameTit>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
	}
	.nicknameTit>span:nth-child(2){
    display: block;
		flex: 1;
	}
	.nicknameTit>span:nth-child(3){
    display: block;
    display: inline-block;
		font-size: 0.16rem;
	}
	.nicknameCon{
		width: 100%;
		height: 0.5rem;
		background: #fff;
    display: block;
		display: flex;
	}
	.nicknameCon>input{
    display: block;
		flex: 1;
		height: 0.45rem;
		border:0;
		outline:none;
		padding-left: 0.1rem;
		font-size: 0.16rem;
	}
	.nicknameCon>span{
    display: block;
    display: inline-block;
		float: left;
		width: 0.2rem;
		height: 0.2rem;
		background: #ccc;
		border-radius: 50%;
		margin:0.15rem;
		font-size: 0.16rem;
		color: #fff;
		text-align: center;
		line-height: 0.2rem;
	}
	.incknameHint{
		color: red;
		text-align: center;
		font-size: 0.14rem;
		padding-top:0.1rem;
	}

</style>
