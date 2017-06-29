<template>
	<div class="paydetail">
		<div class="detailTit">
			<span class="icon-back" @click= "angenBack"></span>
			<span>充值明细</span>
			<span></span>
		</div>
		<div class="detailCon-wrap" >

				<ul class="detailCon-title borderBottom-1px">
					<li :class="{activePaydetail:tab1}" @click="showtab1">充值明细</li>
					<li :class="{activePaydetail:tab2}" @click="showtab2">消费明细</li>
				</ul>

			<div class="detailCon2-wrap" ref="detailConWrap">
				<div class="detailCon2" >
					<ul class="detailCon-ul" v-if="tab1">
						<li class="borderBottom-1px" v-for="item in nameli">
							<div class="detailCon-left">
								<b>{{item.name}}</b>
								<span>{{item.recordTime|getTime}}</span>
							</div>
							<div class="detailCon-right">
								+{{item.applyAmount}}
							</div>
						</li>
            <div class="loadPrompts" v-if="loadSuccess">已全部加载完毕</div>
					</ul>
					<ul class="detailCon-ul" v-else>
						<li v-for="item in nameliTwo " class="borderBottom-1px">
							<div class="detailCon-left">
								<b>{{item.name}}</b>
								<span>{{item.recordTime|getTime}}</span>
							</div>
							<div class="detailCon-right">
								-{{item.lyb}}
							</div>
						</li>
            <div class="loadPrompts" v-if="loadSuccess1">已全部加载完毕</div>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	 import Bscroll from 'better-scroll';
   import { mapState } from 'vuex';
   let paydetailTimer;
	export default{
		data() {
			return{
				tab1:true,
				tab2:false,
				nameli:[],
				nameliTwo:[],
        currentPage1:1,
        currentPage2:1,
        isJieliu:true,
        userId: this.$store.state.userInfo.userId,
        loadSuccess:false,
        loadSuccess1:false
			}
		},
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('paydetail')!=-1){
          this.loadSuccess=false;
          this.loadSuccess1=false;
          $(".Load").show();
          $(".Load").css("top","0.9rem");
          paydetailTimer=setTimeout(function () {
            document.querySelector(".Load-icon").style.display="none";
            document.querySelector("#load-success").style.display="none";
            document.querySelector("#load-faile").style.display="block";
          },3000)
          this.currentPage1=0;
          this.currentPage2=0;
          this.isJieliu=true;
          this.nameli=[];
          this.nameliTwo=[];
          this.getData1();
          this.getData2();
        }
      },
      userId:function () {
        if(this.$route.path.indexOf('paydetail')!=-1){
//          this.nameli=[];
//          this.nameliTwo=[];
//          this.getData1();
//          this.getData2();
        }
      }
    },
		created() {
      $(".Load").show();
      $(".Load").css("top","0.9rem");
      paydetailTimer=setTimeout(function () {
        document.querySelector(".Load-icon").style.display="none";
        document.querySelector("#load-success").style.display="none";
        document.querySelector("#load-faile").style.display="block";
      },3000)
      this.getData1();
      this.getData2();
      this.$nextTick(function () {
        this._loadMore();
      });
		},
		methods:{
      getData1(){
        this.$http.post('/api/user/getAccountDetail',{country:0,type:1,pageNo:this.currentPage1,pageSize:10},{emulateJSON:true}).then(function(res) {
          res = res.body;
          if(res.result==0&&res.data.totalRows>"0"){
            clearTimeout(paydetailTimer)
            $(".Load").hide();
          }else{
            $(".Load-icon").hide();
            $("#load-success").hide();
            $("#load-faile").show();
            return false;
          }
          if(res.result==0&&Math.ceil(Number(res.data.totalRows)/Number(res.data.pageSize))>=this.currentPage1){
            if(this.nameli){
              this.nameli = this.nameli.concat(res.data.list);
            }else{
              this.nameli = res.data.list;
            }
            this.isJieliu = true;
          }else if(res.result==0&&Math.ceil(Number(res.data.totalRows)/Number(res.data.pageSize))<this.currentPage1&&this.nameli!=[]){
            this.loadSuccess=true;
          }
        });
      },
      getData2(){
        this.$http.post('/api/user/getAccountDetail',{country:0,type:2,pageNo:this.currentPage2,pageSize:10},{emulateJSON:true}).then(function(res) {
          res = res.body;
          if(res.result==0&&Math.ceil(Number(res.data.totalRows)/Number(res.data.pageSize))>=this.currentPage2){
            this.isJieliu = true;
            for(var i=0;i<res.data.list.length;i++){
              if(res.data.list[i].changeType == 2){
                this.nameliTwo.push(res.data.list[i]);
              }
            }
          }else if(res.result==0&&Math.ceil(Number(res.data.totalRows)/Number(res.data.pageSize))<this.currentPage1&&this.nameliTwo!=[]){
            this.loadSuccess=true;
          }
        });
      },
			angenBack() {
				window.history.back();
        $(".Load").hide();
			},
			showtab1() {
        if(this.nameli.length<1){
          $(".Load-icon").hide();
          $(".Load").show();
          $("#load-success").hide();
          $("#load-faile").show();
        }else{
          $(".Load").hide();
        }
				this.tab1 = true;
				this.tab2 = false;
			},
			showtab2() {
        if(this.nameliTwo.length<1){
          $(".Load-icon").hide();
          $(".Load").show();
          $("#load-success").hide();
          $("#load-faile").show();
        }else{
          $(".Load").hide();
        }
				this.tab1 = false;
				this.tab2 = true;
			},
      _loadMore(){
        let _this = this;
        $(window).scroll(function(){

          let scrollTop = $(this).scrollTop();

          let clientH = $(window).height()+1;
          let documentH = $('.detailCon2-wrap').height()+$('.detailCon-title').height()+$('.detailTit').height();
          if((scrollTop>=Number(documentH-clientH))&&(Number(documentH-clientH)>1)&&_this.isJieliu){
            _this.isJieliu = false;
            if(_this.tab1){
              _this.currentPage1++;
              _this.getData1();
            }else if(_this.tab2){
              _this.currentPage2++;
              _this.getData2();
            }
            _this._loadMore();
          }
        })
      }
		}

	}
</script>
<style>
	.paydetail{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;bottom: 0;
		background: #F5F5F5;
	}
	.detailTit{
		width: 100%;
		height: 0.45rem;
		background: #E7374B;
		position: fixed;
    display: block;
		display: flex;
		z-index: 9;

	}
	.detailTit>span{
    display: block;
    display: inline-block;
		font-size: 0.24rem;
		text-align: center;
		line-height: 0.45rem;
		color: #fff;
	}
	.detailTit>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
	}
	.detailTit>span:nth-child(2){
    display: block;
		flex: 1;
	}
	.detailCon-wrap{
		background: #fff;
		width: 100%;
	}
	.detailCon{
		width: 100%;
	}
	.detailCon2-wrap{
		width: 100%;
		/*height: 100%;*/
		position: absolute;
		top: 0.9rem;
		overflow-x: hidden;
		overflow-y: ;
	}
	.detailCon2{
		width: 100%;

	}
	.detailCon-title{
		width: 100%;
		height: 0.45rem;
    display: block;
		display: flex;
		position: fixed;
		top:.45rem;
		z-index: 9;
		background: #fff;

	}
	.detailCon-title>li{
    display: block;
		flex: 1;
		text-align: center;
		line-height: 0.2rem;
		font-size: 0.16rem;
		line-height: 0.45rem;
	}
	.activePaydetail{
		color: #E7374A;
		border-bottom: 1px solid #E7354A;
	}
	.detailCon-ul{
		width: 100%;
		/*height: 100%;*/
		overflow: hidden;
	}
	.detailCon-ul>li{
    display: block;
		display: flex;
		width: 100%;
		font-size: 0.16rem;
		padding:0.1rem 0;
		background: #fff;
	}
	.detailCon-left{
    display: block;
		flex: 1;
		padding-left:0.2rem;
	}
	.detailCon-left>b{
		display: block;
	}
	.detailCon-left>span{
		display: block;
		padding-top:0.1rem;
		font-size: 0.14rem;
		color: #B4B4B4;
	}
	.detailCon-right{
		padding: 0.1rem 0.05rem 0 0.05rem;
		font-size: 0.16rem;
		font-weight: 900;
		color:#e7384a;
	}
  .paydetail .loadPrompts {
    line-height:0.3rem;
    text-align: center;
    font-size: 0.14rem;
    color: #B4B4B4;
  }
</style>

