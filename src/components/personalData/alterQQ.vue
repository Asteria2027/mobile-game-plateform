<template>
	<div class="alterQQ">
		<div class="alter-tit">
			<span class="icon-back" @click="agenBack()"></span>
			<span>QQ</span>
			<span @click="save">保存</span>
		</div>
		<div class="alterCon">
			<div class="alterInp">
				<input type="text" placeholder="请输入您的QQ号码" @focus="alterH" onkeyup="value=value.replace(/[^0-9]/g,'')" minlength="6" maxLength="12" v-model="alter" pattern="[0-9]*"/><span class="icon-lgcs" @click="colse"></span>
			</div>
			<div class="alterTxt">{{alterHit}}</div>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	export default{
		data(){
			return{
				alter:"",
				alterHit:""
			}
		},
		methods:{
			agenBack() {
				window.history.back();
			},
			save() {
				if(this.alter.trim() == ""){
					this.alterHit = "请输入您的qq号码"
				}else if(!(/^\d{5,12}$/.test(this.alter))){
          this.alterHit = "请输入正确的qq号码"
        }else{
					this.userInfo.qq = this.alter
					this.$http.post("/api/user/updateUserInfo",{country:0,qq:this.alter},{emulateJSON:true}).then((res) => {
					 	this.$router.push('/personalData')
					 })
				}
				this.alter = "";
			},
			colse() {
				this.alter = "";
			},
			alterH() {
				this.alterHit = "";
			}
		},
		computed: {
          ...mapState(['userInfo', 'isLogin'])

       },
	}
</script>
<style>
	.alterQQ{
		width: 100%;
		height: 100%;
		background: #F5F5F5;
		position: absolute;
		top: 0;bottom: 0;
	}
	.alter-tit{
		width: 100%;
		height: 0.45rem;
		background:#e7374b;
    display: block;
		display: flex;
	}
	.alter-tit>span{
    display: block;
    display: inline-block;
		text-align: center;
		line-height: 0.45rem;
		font-size: 0.24rem;
		color: #fff;
	}
	.alter-tit>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
	}
	.alter-tit>span:nth-child(2){
    display: block;
		flex: 1;
	}
	.alter-tit>span:nth-child(3){
    display: block;
    display: inline-block;
		font-size: 0.14rem;
	}
	.alterInp{
		width: 100%;
		padding: 0.15rem 0;
		background: #fff;
    display: block;
		display: flex;
	}
	.alterInp>input{
    display: block;
		flex: 1;
		padding-left:0.15rem;
		font-size: 0.16rem;
	}
	.alterInp>span{
		display: block;
		width: 0.2rem;
		height: 0.2rem;
		background: #ccc;
		border-radius: 50%;
		text-align: center;
		line-height: 0.2rem;
		color: #fff;
		margin-right: 0.15rem;
	}
	.alterTxt{
		width: 100%;
		padding-top:0.1rem;
		text-align: center;
		color: red;
		font-size: 0.14rem;
	}
</style>
