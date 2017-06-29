<template>
	<div class="alterdizhi">
		<div class="dizhiTit">
			<span class="icon-back" @click="agenBack"></span>
			<span>选择所在地区</span>
			<span  @click="dizhiSave">保存</span>
		</div>
		<div class="dizhiCon-wrap">
			<div class="dizhiCon" id="demo1">
				<input type="text" placeholder="请选择您的区域" v-model="dizhi" id="value1" readonly="readonly"/>
			</div>
			<div class="dizhiTxt">{{dizhiHint}}</div>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
 	import {are} from '../../assets/common/js/Area'
	export default{
		data() {
			return{
				dizhi:"",
				dizhiHint:""
			}
		},
    watch:{
      "$route": function () {
        if($(".gearArea")){
          $(".gearArea").remove();
        }
      }
    },
		created(){

			this.$nextTick(function() {
            let ar= are().LArea;
		        ar.init({
		          'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
		          'valueTo': '#value1', //选择完毕后id属性输出到该位置
		          'keys': {
		            id: 'name',
		            name: 'name'
		          }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
		          'type': 1, //数据源类型
		          'data': are().Data //数据源
		        });
		        ar.value=[1,13,3];//控制初始位置，注意：该方法并不会影响到input的value

      })
		},
		methods:{
			agenBack() {
				window.history.back();
			},
			dizhiSave() {
				if($('#value1').val().trim() == ""){
					this.dizhiHint = "请选择所在地区"
				}else{
					this.userInfo.location = $('#value1').val();
					this.$http.post('/api/user/updateUserInfo',{country:0,location:this.userInfo.location},{emulateJSON:true}).then(function(res) {
						this.$router.push('/personalData');
					})

				}
			}
		},
		 computed: {
          ...mapState(['userInfo', 'isLogin'])
     },
	}
</script>
<style>
	@import "../../assets/common/css/dizhi.css";
	.alterdizhi{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		background: #F5F5F5;
	}
	.dizhiTit{
		width: 100%;
		height: 0.45rem;
		background: #E7374B;
    display: block;
		display: flex;
	}
	.dizhiTit>span{
    display: block;
    display: inline-block;
		text-align: center;
		line-height: 0.45rem;
		font-size: 0.24rem;
		color: #fff;
	}
	.dizhiTit>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
	}
	.dizhiTit>span:nth-child(2){
    display: block;
		flex: 1;
	}
	.dizhiTit>span:nth-child(3){
    display: block;
    display: inline-block;
		font-size: 0.14rem;
	}
	.dizhiCon{
		width: 100%;
		padding: 0.15rem 0;
		background: #fff;
    display: block;
		display: flex;
	}
	.dizhiCon>input{
    display: block;
		flex: 1;
		font-size: 0.16rem;
		padding-left: 0.15rem;
	}
	.dizhiCon>span{
		display: block;
		width: 0.2rem;
		height: 0.2rem;
		background: #ccc;
		text-align: center;
		line-height: 0.2rem;
		color: #fff;
		margin:0.1rem;
		border-radius: 50%;
	}
	.dizhiTxt{
		width: 100%;
		text-align: center;
		padding-top:0.1rem;
		color: red;
		font-size: 0.16rem;
	}
</style>
