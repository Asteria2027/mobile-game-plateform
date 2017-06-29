<template>
	<div class="list">
		<div class="list-title">
			<span class="icon-back"  @click="agenback"></span><span>{{title}}</span><span></span>
		</div>

		<div class="content-wrap" ref="contentWrap">
			<ul class="list-content" >
				<li v-for="item in hotGames" @click="_listRoute(item.id?item.id:item.gameId,item.gameType,item.sourUrl)" v-if="platformTerminal!=item.platformTerminal">
					<dl>
						<dt><img :src="item.iconURL?item.iconURL:item.iconUrl" /></dt>
						<dd>
							<div class="lis-left">
								<div class="lis-txt">
                  <b>{{item.name}}</b>
                  <span :class="{h5Icon:true}" v-if="item.platformTerminal==4"></span>
                  <span :class="{ios:true}" v-if="item.platformTerminal==3"></span>
                  <span :class="{and:true}" v-if="item.platformTerminal==2"></span>
                </div>
                <div class="xinji">
                  <star :gameType="listType" :score="item.popularitVal"></star>
                </div>
								<div class="message">
                  <span></span>
                  <i>{{item.popularitVal}}人玩过</i>
                </div>
							</div>
							<div class="lis-right">
								<span @click.stop="joinGanme(item.id?item.id:item.gameId,item.gameType,item.sourUrl,item.developers)">玩一下</span>
							</div>
						</dd>
					</dl>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from "better-scroll";
  import star from '../star/star.vue';
  import { mapState } from 'vuex';
  let ListTimer;
	export default{
		data() {
			return{
				hotGames:[],
        list:{
				    1:'精品游戏',
            2:'热门游戏',
            8001:"策略游戏",
            8002:"即时战斗",
            8003:"战棋游戏",
            8004:"体育游戏",
            8005:"角色扮演",
            8006:"射击游戏",
            8007:"推荐",
            8008:"网络游戏",
            8009:"单机精品",
            8010:"最新游戏",
            8011:"本周推荐",
            8012:"冒险游戏",
            8013:"竞速游戏",
            8014:"动作游戏",
            8015:"模拟经营",
            8016:"养成游戏",
            8017:"飞行游戏",
            8018:"格斗游戏",
            8019:"益智游戏",
            8020:"对战游戏",
            8021:"其他游戏",
            8022:"独家游戏"
        },
        title:'',
        listType:1,
        currentPage:1,
        contentScroll:'',
        isJieliu:true,
        pagerNo:0
			}
		},
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf("list")!=-1&&this.$route.path.indexOf("gamelist")==-1){
          this.hotGames=[];
          this.currentPage = 1;
          this.reload();
          $(".Load").show();
          $(".Load-icon").show();
          $("#load-success").show();
          $("#load-faile").hide();
          $(".Load").css("top","0.45rem");
          ListTimer=setTimeout(function () {
            document.querySelector(".Load-icon").style.display="none";
            document.querySelector("#load-success").style.display="none";
            document.querySelector("#load-faile").style.display="block";
          },3000)
        }
      }
    },
		created() {
		    $(".Load").show();
        $(".Load-icon").show();
        $("#load-success").show();
        $("#load-faile").hide();
        $(".Load").css("top","0.45rem");
        this.reload();
        ListTimer=setTimeout(function () {
          document.querySelector(".Load-icon").style.display="none";
          document.querySelector("#load-success").style.display="none";
          document.querySelector("#load-faile").style.display="block";
        },3000)
        this.$nextTick(function () {
          this.initScroll();
          this.loadMore();
        });
//        let Requres = new UrlSearch();
//        if(Requres.cid){
//          this.$http.post('/api/localHeadLines/visitor',{country:0,cid:Requres.cid,merchant:Requres.merchant,data:decodeURIComponent(Requres.data)},{emulateJSON:true}).then(function(res) {
//
//          })
//        }
		},
    components:{
      star
    },
		methods:{
      joinGanme(value,type,url,developers){
//        debugger
        if (this.isLogin){
          if(developers==4177){
            this.$router.push({path:'/games/'+value});
            return;
          }
        }else {
          this.$router.push({path:'/login'});
        }
        function dujia(){
          if (!type) {
            return false;
          }
          if (typeof type=="object") {
            for(let i=0;i<type.length;i++){
              if(type[i].gameType==8022){
                return true;
              }
            }
          }else if (type==8022) {
            return true;
          }
        }
        if(dujia()){
          if (value==this.GamingId){
            this.$router.push({path:'/games/'+value})
          }else if (value==this.guessingId){
            this.$router.push({path:'/games/'+value +"?token="+$.fn.cookie("token")});
          }else{
            window.location.href=url;
          }
        }else{
          if (this.isLogin){
            this.$http.post('/api/user/addRecentlyPlayed',{country:0,terminal:4,gameId:value},{emulateJSON:true}).then(function(res) {})
            if(value.length==6){
              this.$router.push({path:'/games/'+value});
            } else{
              let day=new Date().getTime();
              if(url.indexOf("?")!=-1){
                window.location.href=url+"&uid=" + this.userInfo.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + this.userInfo.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
              }else{
                window.location.href=url+"?uid=" + this.userInfo.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + this.userInfo.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
              }
            }
          }else{
            this.$router.push({path:'/login'})
          }
        }

      },
      reload(){
          let type=this.$route.params.type;
          this.listType=Number(type);
          this.title=this.list[type];
          if (type==1||type==2){
          this.$http.post('/api/index/getIndexGameByModelId',{country:0,modelId:type,pageNo:this.currentPage,pageSize:10,terminal:4},{emulateJSON:true}).then(function(res) {
            res = res.body;
            this.pagerNo=Math.ceil(Number(res.data.totalRows)/Number(res.data.pageSize))||0;
            if(res.data.totalRows=="0"){
              $(".Load-icon").hide();
              $("#load-success").hide();
              $("#load-faile").show();
              return false;
            }else{
              clearTimeout(ListTimer)
              $(".Load").hide();
            }
            if(res.result==0&&Math.ceil(Number(res.data.totalRows)/Number(res.data.pageSize))>=this.currentPage){
              for(let i=0;i<res.data.list.length;i++){
                if(res.data.list[i].platformTerminal!=1){
                  this.hotGames.push(res.data.list[i]);
                }
              }
              this.$nextTick(function(){
                if(this.hotGames.length<10&&res.data.totalRows>10){
                  this.currentPage++;
                  this.reload();
                }
                this.initScroll();
                this.isJieliu = true;
              });
            }else {
              this.isJieliu = false;
            }
          });
        }else {
          this.$http.post('/api/index/getGameByType',{country:0,gameType:type,pageNo:this.currentPage,pageSize:10,terminal:4},{emulateJSON:true}).then(function(res) {
            res = res.body;
            this.pagerNo=Math.ceil(Number(res.data.totalRows)/Number(res.data.pageSize))||0;
            if(res.data.totalRows=="0"){
              $(".Load-icon").hide();
              $("#load-success").hide();
              $("#load-faile").show();
              return false;
            }else{
              clearTimeout(ListTimer)
              $(".Load").hide();
            }
            if(res.result==0&&Math.ceil(Number(res.data.totalRows)/Number(res.data.pageSize))>=this.currentPage){
              for(let i=0;i<res.data.list.length;i++){
                if(res.data.list[i].platformTerminal!=1){
                  this.hotGames.push(res.data.list[i]);
                }
              }
              this.$nextTick(function() {
                if(this.hotGames.length<10&&res.data.totalRows>10){
                  this.currentPage++;
                  this.reload();
                }
                this.initScroll();
                this.isJieliu = true;
              });
            }else {
              this.isJieliu = false;
            }
          });
        }
      },
			agenback() {
          if(sessionStorage.getItem("_gotoList")){
            this.$router.push({path:sessionStorage.getItem("_gotoList")})
          }else{
            this.$router.push({path:"/gameHall"})
          }
        $(".Load").hide();
			},
			initScroll() {
        if(this.contentScroll){
          this.contentScroll.refresh();
        }else {
          this.contentScroll = new BScroll(this.$refs.contentWrap,{
            probeType:3,
            click:true
          });
        }
			},
			itemClass(res) {

			},
      _listRoute(value,type,url){
        function dujia(){
          if (!type) {
            return false;
          }
          if (typeof type=="object") {
            for(let i=0;i<type.length;i++){
              if(type[i].gameType==8022){
                return true;
              }
            }
          }else if (type==8022) {
            return true;
          }
        }
        if(dujia()){
          if (value==this.GamingId){
            this.$router.push({path:'/games/'+value})
          }else if (value==this.guessingId){
            this.$router.push({path:'/games/'+value +"?token="+$.fn.cookie("token")});
          }else{
            window.location.href=url;
          }
        }else{
          sessionStorage.setItem("gamelist",this.$route.path);
          this.$router.push({path:'/gamelist/'+value})
        }
      },
      loadMore(){
        if(this.contentScroll&&this.isJieliu){
          this.contentScroll.refresh();
          let _this = this;
          this.contentScroll.on('scroll',(pos)=>{
          this.scrollY = Math.abs(Math.round(pos.y));
          let scrollY = this.scrollY;
          let clientH = $(window).height();
          let docH = $('.list-content').height()+$('.list-title').height();
            if((scrollY>=docH-clientH)&&(docH-clientH>=0)&&this.isJieliu&&this.pagerNo>this.currentPage){
              this.isJieliu = false;
              _this.currentPage++;
              _this.reload();
            }
          });
        }
      }
		},
    computed:{
      ...mapState(['hotGame','isLogin','userInfo'])
    },
	}

</script>

<style>
	.list{
		font-size: 0.14rem;
		position: absolute;
	    top: 0.45rem;
	    bottom: 0rem;
	    width:100%;
	    z-index: 99;
	    background: #fff;

	}
	.content-wrap{
		height: 100%;
		overflow: hidden
	}
	.list-title{
		width: 100%;
		height: 0.45rem;
		background: #e7374b;
    display: block;
		display: flex;
		position: fixed;
		top:0;left: 0;
	}
  .list-title>span{
    display: block;
  }
	.list-title>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
		float: left;
		text-align: center;
		font-size: 0.24rem;
		line-height: 0.45rem;
		color: #fff;
	}
	.list-title>span:nth-child(2){
    display: block;
		flex: 1;
		text-align: center;
		line-height: 0.45rem;
		color: #fff;
		font-size: 0.24rem;
		text-align: center;
	}
	.list-content{
		width: 100%;

	}
	.list-content>li{
		width: 100%;
		height: 0.94rem;
		border-bottom: 1px solid #F5F5F5;
	}
	.list-content>li>dl{
		width: 90%;
		height: 100%;
		margin:0 auto;
    display: block;
		display: flex;
	}
	.list-content>li>dl>dt{
    display: block;
		width: 0.74rem;
		height: 0.74rem;
		border-radius: 10px;
		margin-top:0.1rem;
	}
	.list-content>li>dl>dt>img{
    display: block;
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.list-content>li>dl>dd{
    display: block;
		flex: 1;
		padding-left:0.1rem;
	}
	.lis-left{
		float: left;
		padding-top:0.1rem;
		width: 68%;
	}
	.lis-txt{
		font-size: 0.14rem;
		overflow: hidden;

	}
	.lis-txt>b{
		height: 0.2rem;
		max-width: 75%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		float: left;
		line-height: 0.25rem;
	}
	.lis-txt>span{
		display: block;
		float: left;
		width: 0.18rem;
		height: 0.18rem;
		margin-left:0.03rem;
		margin-top:0.02rem;
	}
	.h5Icon{
		background: url(H5.png) no-repeat center;
		background-size: 100% 100%;
	}
	.and{
		background: url(and.png) no-repeat center;
		background-size: 100% 100%;
	}
	.ios{
		background: url(ios.png) no-repeat center;
		background-size: 80% 100%;
	}
	.message>span{
		width: 0.15rem;
		height: 0.12rem;
		display: block;
		float: left;
		background: url(user.png) no-repeat center;
		background-size: 100% 100%;
	}
	.message>i{
		font-style: normal;
		font-size: 0.12rem;
		color: #b4b4b4;
		padding-left: 0.03rem;
	}


	.lis-right{
		float: right;
	}
	.lis-right>span{
    display: block;
    display: inline-block;
		width: 0.7rem;
		height: 0.29rem;
		background: #e7384a;
		display: block;
		border-radius: 5px;
		margin-top:0.3rem;
		text-align: center;
		line-height: 0.29rem;
		color: #fff;

	}
	.xinji{
		overflow: hidden;
		margin:0.05rem 0;
	}
	.xinji>span{
    display: block;
    display: inline-block;
	}
	.stars{
		background: url(classify01.png) no-repeat center;
		background-size: 100% 100%;
	}
</style>
