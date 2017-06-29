<template>
  <div id="index" ref="indexWrapper">
    <div>
      <div ref="contentWrapper" class="contentWrapper">
        <div class="index-content">
          <slide :sImage="slideImage"></slide>
          <div class="borad">
            <span class="horn"></span>
            <div class="swiper-container-borad">
              <div class="swiper-wrapper">
                <div class="swiper-slide boradnews" v-for="item in newList" :data-id="item.id">{{item.title}}</div>
              </div>
            </div>
          </div>
          <div class="exclusive-title borderBottom-1px">
            <span></span>
            <h3>独家游戏</h3>
          </div>
          <div class="showExclusive">
            <div class="exclusive-con" @click="goGamelistUrl(item.gameId,item.gameType,item.sourUrl)" v-for="item in ExclusiveGame">
              <div class="exclusive-img"><img :src="item.imageUrl"></div>
              <p>
                <span>{{item.name}}</span>
                <span>{{item.popularitVal}}人玩过</span>
              </p>
              <!--<div class="exclusive-btn">玩一下</div>-->
              <split></split>
            </div>
          </div>
          <smallTitle :title="title1" :number="2"></smallTitle>
          <div class="hotgame">
            <ul>
              <li v-for="(item,index) in hotgameGame" v-if="index<6">
                <a @click="goGamelistUrl(item.gameId,item.gameType,item.sourUrl)">
                  <div><img :src="item.imageUrl"></div>
                  <p class="game-name"><span>{{item.name}}&nbsp;</span><i :class="{'iconAz':item.platformTerminal===2,'iconIOS':item.platformTerminal===3,'iconH5':item.platformTerminal===4}" style="color: #e7384a"></i></p>
                  <div>
                    <p class="people"><i class="peopleIcon1"></i>{{item.popularitVal}}人玩过</p>
                  </div>
                  <button @click.stop="joinGanme(item.gameId,item.gameType,item.sourUrl,item.developers)">玩一下</button>
                </a>
              </li>
            </ul>
          </div>
          <split></split>
          <div class="active-topics borderBottom-1px">
            <span></span>
            <h3>活动专题</h3>
          </div>
          <div class="active-con">
            <div class="swiper-containerActive">
              <div class="swiper-wrapper">
                <div class="swiper-slide activeSlide" v-for="item in activityTopics" @click="goActive(item.REDIRECTURL)">
                  <div>
                    <img :src="item.imageUrl" >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <split></split>
          <div>
            <div class="IndexTabTitle">
              <ul class="borderBottom-1px">
                <li @click="currentTab(0)">推荐</li>
                <li @click="currentTab(1)">单机</li>
                <li @click="currentTab(2)">网游</li>
              </ul>
            </div>
            <div class="swiper-containerIndexTab">
              <div class="swiper-wrapper" style="z-index: 0">
                <div class="swiper-slide IndexTabSlide">
                  <ul>
                    <li v-for="(item,index) in tjGame" v-if="index<3">
                      <a style="display: inline-block;width: 100%;height: 100%;color: #000;" @click.stop="goGamelistUrl(item.gameId,item.gameType,item.sourUrl)">
                        <div class="imgDiv"><img :src="item.iconURL"></div>
                        <div class="word-content">
                          <p><span>{{item.name}}</span>&nbsp;&nbsp;<i :class="{'iconAz':item.platformTerminal===2,'iconIOS':item.platformTerminal===3,'iconH5':item.platformTerminal===4}" style="color: #e7384a"></i></p>
                          <p><star :gameType="8007" :score="item.popularitVal"></star></p>
                          <p><span class="peopleIcon2prv" v-if="item.platformTerminal===4">页游&nbsp;&nbsp;</span><span class="peopleIcon2prv" v-if="item.platformTerminal===2">android&nbsp;&nbsp;</span><span class="peopleIcon2prv" v-if="item.platformTerminal===3">ios&nbsp;&nbsp;</span><i class="peopleIcon2"></i><span>{{item.popularitVal}}人玩过</span></p>
                        </div>
                        <div>
                          <button @click.stop="joinGanme(item.gameId,item.gameType,item.sourUrl,item.developers)">玩一下</button>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="swiper-slide IndexTabSlide">
                  <ul>
                    <li v-for="(item,index) in djGame" v-if="index<3">
                      <a style="display: inline-block;width: 100%;height: 100%;color: #000;" @click.stop="goGamelistUrl(item.gameId,item.gameType,item.sourUrl)">
                        <div class="imgDiv"><img :src="item.iconURL"></div>
                        <div class="word-content">
                          <p><span>{{item.name}}</span>&nbsp;&nbsp;<i :class="{'iconAz':item.platformTerminal===2,'iconIOS':item.platformTerminal===3,'iconH5':item.platformTerminal===4}" style="color: #e7384a"></i></p>
                          <p><star :gameType="8009" :score="item.popularitVal"></star></p>
                          <p><span class="peopleIcon2prv" v-if="item.platformTerminal===4">页游&nbsp;&nbsp;</span><span class="peopleIcon2prv" v-if="item.platformTerminal===2">android&nbsp;&nbsp;</span><span class="peopleIcon2prv" v-if="item.platformTerminal===3">ios&nbsp;&nbsp;</span><i class="peopleIcon2"></i><span>{{item.popularitVal}}人玩过</span></p>
                        </div>
                        <div>
                          <button @click.stop="joinGanme(item.gameId,item.gameType,item.sourUrl,item.developers)">玩一下</button>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="swiper-slide IndexTabSlide">
                  <ul>
                    <li v-for="(item,index) in wyGame" v-if="index<3">
                      <a style="display: inline-block;width: 100%;height: 100%;color: #000;" @click.stop="goGamelistUrl(item.gameId,item.gameType,item.sourUrl)">
                        <div class="imgDiv"><img :src="item.iconURL"></div>
                        <div class="word-content">
                          <p><span>{{item.name}}</span>&nbsp;&nbsp;<i :class="{'iconAz':item.platformTerminal===2,'iconIOS':item.platformTerminal===3,'iconH5':item.platformTerminal===4}" style="color: #e7384a"></i></p>
                          <p><star :gameType="8008" :score="item.popularitVal"></star></p>
                          <p><span class="peopleIcon2prv" v-if="item.platformTerminal===4">页游&nbsp;&nbsp;</span><span class="peopleIcon2prv" v-if="item.platformTerminal===2">android&nbsp;&nbsp;</span><span class="peopleIcon2prv" v-if="item.platformTerminal===3">ios&nbsp;&nbsp;</span><i class="peopleIcon2"></i><span>{{item.popularitVal}}人玩过</span></p>
                        </div>
                        <div>
                          <button @click.stop="joinGanme(item.gameId,item.gameType,item.sourUrl,item.developers)">玩一下</button>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <split></split>
          <div class="table clearfix">
            <ul>
              <li @click="tabgo('integral')"><div><span></span>积分任务</div></li>
              <li @click="tabgo('activity')"><div><span></span>活动中心</div></li>
            </ul>
            <ul>
              <li @click="tabgo('debit')" v-if="menulist[1]"><div><span></span>游戏划账</div></li>
              <li @click="tabgo('exchange')" v-if="menulist[0]"><div><span></span>兑换乐盈券</div></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="companyInfo">
        <p>
          深圳华海乐盈网络科技有限公司
        </p>
        <p>
          粤ICP备15041803号-2
        </p>
      </div>
    </div>
    <div class="index-title">
      <div class="seach-title" @click="_seachTitleGo">
        <i class="icon-index03"></i>
        <input type="text" placeholder="请输入您要搜索的游戏" readonly="readonly">
      </div>
      <div class="bell" v-if="isLogin" @click="goHint">
        <button class="bell-logo fl"></button>
        <div class="message" v-if="userInfo.unreads>0">{{userInfo.unreads>99?"99+":userInfo.unreads}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import smallTitle from '../smallTitle/smallTitle.vue';
import HorizontalSlide from '../HorizontalSlide/HorizontalSlide.vue';
import slide from '../slide/slide.vue';
import star from '../star/star.vue';
import split from '../split/split.vue';
import { mapState } from 'vuex';

 export default {
  data(){
    return {
      title1:'热门游戏',
      newList:[],
      gameData:[],
      slideImage:'',
      imgSrc:'allImg',
      ExclusiveGame:[],
      tjGame:[],
      djGame:[],
      wyGame:[],
      gameTypeEx:8022,
      currentTabIndex:'',
      hotgameGame:[],
      activityTopics:[],
      indexScroll:'',
      menulist:[false,false]
    }
  } ,
  components:{
    smallTitle,
    HorizontalSlide,
    slide,
    star,
    split
  },
   watch:{
     '$route':function () {
       if(this.$route.path.indexOf('index')!=-1){
         let topScroll = $(window).scrollTop();
         let radio = topScroll/200;
         $('.index-title').css('background','rgba(231, 55, 74,'+radio+')');
       }
     }
   },
  created(){
    clearTimeout(LoadTimer);
    //首页轮播图
    this.$http.post("/api/index/getIndexlbt",{country:0,terminal:4},{emulateJSON:true}).then(function (res) {
      res = res.body;
      if(res.result===0){
        this.slideImage = res.data;
        this.$nextTick(function () {
          this._initScroll()
        })
      }
    });
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
    //新闻消息
    this.$http.post("/api/activity/getActivityInfo",{country:0,terminal:4,type:1},{emulateJSON:true}).then(function (res) {
      res = res.body;
      if(res.result==0){
//        console.log(res);
        this.newList = res.data.list;
        this.$nextTick(function () {
          this._boradSwiper();
        });
        this.$nextTick(function () {
          this._initScroll()
        })
      }
    });
    //独家游戏
    this.$http.post('/api/index/getIndexGameByModelId',{country:0,terminal:4,pageNo:1,pageSize:50},{emulateJSON:true}).then(function (res) {
      res = res.body;
      if(res.result==0){
//        console.log(res.data.list);
        for(let j =0 ; j<res.data.list.length;j++){
          if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal&&res.data.list[j].modeId==5){
            this.ExclusiveGame.push(res.data.list[j])
          }
          if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal&&res.data.list[j].modeId==2){
            this.hotgameGame.push(res.data.list[j])
          }
          if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal&&res.data.list[j].modeId==6){
            this.tjGame.push(res.data.list[j]);
          }
          if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal&&res.data.list[j].modeId==7){
            this.djGame.push(res.data.list[j]);
          }
          if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal&&res.data.list[j].modeId==8){
            this.wyGame.push(res.data.list[j]);
          }
        }
        this.$nextTick(function () {
          this._initScroll();
          this._TabSwiper();
          let _this = this;
          setTimeout(function () {
            let height=$(window).height();
            $("#index").height(height-$(".tab-bottom").height());
            _this._initScroll()
          },0);

          this._boradSwiper();//开启新闻消息轮播图
          $(".Load").hide();
          if(this.indexScroll){
            this.indexScroll.on('scroll',(pos)=>{
              this.scrollY = Math.abs(Math.round(pos.y));
              let scrollY = this.scrollY;
              let radio = scrollY/200;
              $('.index-title').css('background','rgba(231, 55, 74,'+radio+')');
            });
          }
        })
      }
    });

    //热门游戏
//    this.$http.post("/api/index/getIndexGameByModelId",{country:0,modelId:2,terminal:4},{emulateJSON:true}).then(function (res) {
//      res = res.body;
//      if(res.result === 0){
////        console.log(res);
//        for(let j =0 ; j<res.data.list.length;j++){
//          if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal){
//            this.hotgameGame.push(res.data.list[j])
//          }
//        }
//        this.$nextTick(function () {
//          this._initScroll()
//        })
//      }
//    });

    //活动专题
    this.$http.post("/api/pageActivity/getIndexActivityByModelId",{country:0,modelId:9,terminal:4},{emulateJSON:true}).then(function (res) {
      res = res.body;
      if(res.result === 0){
        this.activityTopics=res.data.list;
        this.$nextTick(function () {
          this._initScroll()
          this._activeSwiper();
        });
      }
    });


    //推荐游戏
//    this.$http.post("/api/index/getIndexGameByModelId",{country:0,modelId:6,terminal:4},{emulateJSON:true}).then(function (res) {
//      res = res.body;
//      if(res.result ===0){
//        for(let j =0 ; j<res.data.list.length;j++){
//          if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal){
//            this.tjGame.push(res.data.list[j]);
//          }
//        }
//        this.$nextTick(function () {
//          this._initScroll()
//        });
//        this._TabSwiper();
//      }
//    });
    //单机游戏
//    this.$http.post("/api/index/getIndexGameByModelId",{country:0,modelId:7,terminal:4},{emulateJSON:true}).then(function (res) {
//      res = res.body;
//      if(res.result ===0){
//        for(let j =0 ; j<res.data.list.length;j++){
//          if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal){
//            this.djGame.push(res.data.list[j]);
//          }
//        }
//        this.$nextTick(function () {
//          this._initScroll()
//          this._TabSwiper();
//        })
//
//      }
//    });
    //网游
//    this.$http.post("/api/index/getIndexGameByModelId",{country:0,modelId:8,terminal:4},{emulateJSON:true}).then(function (res) {
//      res = res.body;
//      if(res.result ===0){
//        for(let j =0 ; j<res.data.list.length;j++){
//          if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal){
//            this.wyGame.push(res.data.list[j]);
//          }
//        }
//
//        this.$nextTick(function () {
//            let _this = this;
//            setTimeout(function () {
//              let height=$(window).height();
//              $("#index").height(height-$(".tab-bottom").height());
//              _this._initScroll()
//            },0);
//
//          this._boradSwiper();//开启新闻消息轮播图
//          $(".Load").hide();
//          if(this.indexScroll){
//            this.indexScroll.on('scroll',(pos)=>{
//              this.scrollY = Math.abs(Math.round(pos.y));
//              let scrollY = this.scrollY;
//              let radio = scrollY/200;
//              $('.index-title').css('background','rgba(231, 55, 74,'+radio+')');
//            });
//          }
//        });
//        this._TabSwiper();
//      }
//    });

  },
   mounted(){
     this.$nextTick(function () {
       $(window).scroll(function () {
         let topScroll = $(window).scrollTop();
         let radio = topScroll/200;
         $('.index-title').css('background','rgba(231, 55, 74,'+radio+')');
       })
     });
   },
  computed:{
    ...mapState(['hotGame','isLogin','userInfo'])
  },
  methods:{
    joinGanme(value,type,url,developers){
//      debugger
      if (this.isLogin){
        if(developers==4177){
          this.$router.push({path:'/games/'+value});
          return;
        }
      }else {
        this.$router.push({path:'/login'})
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
    _initScroll(){

//      if(!this.indexScroll){
//        this.indexScroll = new BScroll(this.$refs.indexWrapper,{
//          probeType:3,
//          click:true
//        })
//      }else {
//        this.indexScroll.refresh();
//      }
    },
    _TabSwiper(){
      let _this = this;
      if(!this.indexTabSwiper){
        this.$nextTick(function () {
            let self=this
          this.indexTabSwiper = new Swiper ('.swiper-containerIndexTab', {
            onSlideChangeStart: function(swiper){
              this.currentTabIndex=swiper.activeIndex;
              $('.IndexTabTitle>ul>li').eq(this.currentTabIndex).css('border-bottom','1px solid red').siblings().css('border-bottom',0);
              let H = $(".swiper-containerIndexTab ul").eq(swiper.activeIndex).height();
              $(".swiper-containerIndexTab .swiper-slide").css('height', H + 'px');
              $(".swiper-containerIndexTab .swiper-wrapper").css('height', H + 'px');
              self._initScroll()
            }
          });
        })
      }
    },
    currentTab(index){
        $('.IndexTabTitle>ul>li').eq(index).css('border-bottom','1px solid red').siblings().css('border-bottom',0);
        this.indexTabSwiper.slideTo(index, 200, false);
        let H = $(".swiper-containerIndexTab ul").eq(index).height();
        $(".swiper-containerIndexTab .swiper-slide").css('height', H + 'px');
        $(".swiper-containerIndexTab .swiper-wrapper").css('height', H + 'px');
        this._initScroll()
    },
    goGamelistUrl(value,type,url) {
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
    _exclusive(){

    },
    _seachTitleGo(){
      this.$router.push({path:'/search'});
    },
    goHint(){
      this.$router.push({path:'/hint'});
    },
    tabgo(value){
        if(value=='exchange'||value=='debit'){
            sessionStorage.setItem("debitUrl","index")
        }
        if(value=='integral'){
          sessionStorage.setItem("gointegral","index");
        }
      this.$router.push({path:'/'+value});
    },
    _boradSwiper(){
      let boradSwiper=new Swiper('.swiper-container-borad', {
        autoplay: 4000,
        direction : 'vertical',
        loop : true,
        autoplayDisableOnInteraction : false,
        observer: true,
        observeParents: true
      });
      let _this = this;
      this.$nextTick(function () {
        $('.boradnews').on('click',function(){
          let id = $(this).attr('data-id')
          _this.$router.push({path:'/notic/4/'+id});
        });
      });
    },
    _activeSwiper(){
      let activeSwiper = new Swiper('.swiper-containerActive',{
        slidesPerView:'auto',
        autoplayDisableOnInteraction : false,
        observer: true,
        observeParents: true
      });
    },
    goActive(url){
      window.location.href = url;
    }
  }
 }
</script>

<style rel="stylesheet/less" scoped lang="less" scoped>
  #index {
    position:absolute;
    top:0;
    right:0;
    left:0;
    /*overflow:hidden;*/
    .index-title {
      height: 0.42rem;
      width: 100%;
      background: transparent;
      padding:0.06rem 0;
      padding-bottom: 0;
      overflow:hidden;
      position: fixed;
      top:0;
      left:0;
      z-index:2;
      .seach-title {
        background: rgba(255,255,255,0.8);
        margin:0 auto;
        width: 65%;
        padding:0.01rem 0.12rem ;
        border-radius: 1rem;
        height: 0.3rem;
        .icon-index03 {
          float: left;
          font-size:0.2rem;
          line-height:0.3rem;
          margin-right: 0.05rem;
        }
        input {
          display: block;
          background-color: rgba(255,255,255,0);
          float: left;
          font-size: 0.14rem;
          height:0.3rem;
          line-height:0.3rem;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
          color:    #5b5b5b;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color:    #5b5b5b;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color:    #5b5b5b;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color:    #5b5b5b;
        }
      }
    }
  }
  .bell {
    width: .32rem;
    height: .32rem;
    position: absolute;
    /*background: #f5f5f5;*/
    right:0.05rem;
    top:0.1rem;
    .bell-logo {
      width:100%;
      height:100%;
      padding:0;
      border:0 none;
      background: url("../../assets/common/images/indexSprites.png") no-repeat;
      background-size:5rem 4rem;
      background-position:-4.7rem 0;
    }
    .message {
      position: absolute;
      width: 0.20rem;
      height:0.20rem;
      background: red;
      color: #fff;
      right: 0.04rem;
      top:-0.02rem;
      border-radius: 50%;
      text-align: center;
      line-height:0.20rem;
      font-size: 0.08rem;
    }
  }
  .index-content {
    width: 100%;
    overflow: hidden;
  }
  .IndexTabSlide{
    overflow: hidden;
  }
  .IndexTabSlide ul li {
    height: 0.8rem;
    /*box-sizing: border-box;*/
    padding: .1rem .1rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .IndexTabSlide ul li:last-child {
    padding: 0.1rem .1rem 0;
    border-bottom: none;
  }
  .IndexTabSlide ul li .imgDiv {
    height: 100%;
    width:22%;
    padding-right:0.1rem;
    img {
      display: block;
      border-radius: 0.1rem;
      height: 100%;
      width: 100%;
    }
  }
  .IndexTabSlide ul li .word-content {
    height: 100%;
    width:50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    p {
      line-height:0.26rem;
      height: 0.26rem;
      >span{
         display: block;
        display: inline-block;
        height: 0.26rem;
        line-height: 0.26rem;
        vertical-align: top;
      }
      .peopleIcon2prv {
        color: #e7384a;
      }
    }
    p:nth-child(1)>span {
      display: block;
      display: inline-block;
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .peopleIcon1 {
    background:  url("../../assets/common/images/indexSprites.png") no-repeat;
    background-size: 6rem;
    display: inline-block;
    height: 0.15rem;
    width: 0.16rem;
    vertical-align: top;
    margin-top: -0.02rem;
    margin-right: 0.02rem;
  }
  .peopleIcon2 {
    background:  url("../../assets/common/images/indexSprites.png") no-repeat;
    background-size: 6rem;
    display: inline-block;
    height: 0.15rem;
    width: 0.16rem;
    vertical-align: top;
    margin-top: 0.05rem;
    margin-right: 0.02rem;
  }

  .IndexTabSlide ul li>a>div {
    float: left;
  }
  .IndexTabSlide ul li>a>div:nth-child(3) {
    float: right;
  }
  .IndexTabSlide ul li>a>div:nth-child(3) button{
    border: 0 none;
    outline: none;
    background: #e7384a;
    color: #fff;
    padding: .08rem 0.12rem;
    font-size: .14rem;
    border-radius: 0.05rem;
    margin-top: .2rem;
  }

  .IndexTabTitle ul{
    display: block;
    display: flex;
  }
  .IndexTabTitle ul li{
    display: block;
    flex: 1;
    text-align: center;
    height: 0.45rem;
    line-height:0.45rem;
    font-size: .16rem;
    box-sizing: border-box;
  }
  .IndexTabTitle ul li:nth-child(1){
    border-bottom:1px solid red;
  }
  #index .swiper-containerIndexTab {
    margin-bottom: 0.1rem;
    .swiper-wrapper {
      height: auto;
    }
  }

  #index .table{
    margin:0.05rem 0;
    width: 100%;
  }
  #index .table ul {
    width: 100%;
    height: 100%;
    display: block;
    /*display: flex;*/
    li {
      display: block;
      /*flex: 1;*/
      width: 49%;
      float: left;
      height: 0.7rem;
      line-height:0.7rem;
      font-size: 0.16rem;
      color: #fff;
      position:relative;
      div {
        box-sizing: border-box;
        width: 85%;
        margin:0 auto;
        padding-left: 32%;
      }
    }
  }
  #index .table ul:nth-child(1) li:nth-child(1){

    background: url("./jf.png") no-repeat right center ;
    background-size:98% 98%;
    margin-right: 0.05rem;
      span {
        display: block;
        position: absolute;
        width: 0.3rem;
        height: 100%;
        top:0;
        left: 0.4rem;
        background: url('./jfpng.png') no-repeat left center;
        background-size:80%;
      }
  }
  #index .table ul:nth-child(1) li:nth-child(2){

    background: url("./yx.png") no-repeat left center;
    background-size:99% 99%;
    span {
      display: block;
      position: absolute;
      width: 0.3rem;
      height: 100%;
      top:0;
      left: 0.4rem;
      background: url('./hdpng.png') no-repeat left center ;
      background-size: 80%;
    }
  }
  #index .table ul:nth-child(2) li:nth-child(1){
    /*background: url("./hdzx.png") no-repeat;*/
    /*background-size:0.9rem 1.8rem;*/
    background: url("./hd.png") no-repeat right center ;
    background-size:98% 98%;
    margin-right: 0.05rem;
    span {
      display: block;
      position: absolute;
      width: 0.3rem;
      height: 100%;
      top:0;
      left: 0.4rem;
      background: url('./hzpng.png') no-repeat left center ;
      background-size:  80%;
    }
  }
  #index .table ul:nth-child(2) li:nth-child(2){
    /*background: url("./hzhb.png") no-repeat;*/
    /*background-size:1rem 1.8rem;*/
    background: url("./dh.png") no-repeat left center;
    background-size: 99% 99%;
    span {
      display: block;
      position: absolute;
      width: 0.3rem;
      height: 100%;
      top:0;
      left: 0.4rem;
      background: url('./dhpng.png') no-repeat left center;
      background-size: 80%;
    }
  }
  #index .hotgame {
    width: 100%;
    overflow: hidden;
    margin-bottom: 0.1rem;
  }
  #index .hotgame ul>li{
    position: relative;
    box-sizing:border-box;
    padding: 0.1rem;
    padding-right: 0.05rem;
    width: 50%;
    float: left;
    overflow: hidden;
    min-height:1.4rem;
    a {
      display: inline-block;
      width: 100%;
    }
    div:nth-child(1){
      height: 1rem;
      img{
        display: block;
        height: 100%;
        width: 100%;
        border-radius: 0.1rem;
      }
    }
    .people-pre {
      float: left;
      color: #e7384a;
    }
    p {
      font-size: .14rem;
      margin-top: 0.15rem;
      width: 100%;
    }
    .game-name {
      span {
        display: block;
        display: inline-block;
        width: 55%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #000;
      }
    }
    p.people {
      /*margin-left: 0.3rem;*/
      font-size: 0.12rem;
    }
    button {
      display: block;
      border: 0 none;
      outline: none;
      position: absolute;
      bottom: 0.1rem;
      right: 0.1rem;
      /*height: 0.3rem;*/
      text-align: center;
      line-height:0.3rem;
      /*width: .6rem;*/
      padding: 0.02rem 0.07rem;
      border-radius: 0.05rem;
      background: #e7384a;
      color: #fff;
      font-size: 0.14rem;
    }
  }
  #index .hotgame ul>li:nth-child(-2n+100){
    /*padding-left: 0;*/
    padding-right: 0.1rem;
    padding-left:0.05rem;
  }
  .word-content{
    p:nth-child(1) span{
      display: block;
      display: inline-block;
      font-size: 0.16rem;
    }
    .iconIOS,.iconH5,.iconAz{
      display: inline-block;
      height: 0.26rem;
      width: 0.26rem;

      background-position: center;
      background-repeat: no-repeat;
    }
    .iconH5,.iconAz{
      background-size: 0.16rem 0.16rem;
    }
    .iconIOS{
      background-size: 0.16rem 0.20rem;
    }
  }
  .hotgame{
    .iconIOS,.iconH5,.iconAz{
      display: inline-block;
      height: 0.13rem;
      width: 0.13rem;
      background-size: 0.12rem 0.13rem;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .iconIOS{
    background-image: url("./ios.png");
  }
  .iconH5{
    background-image: url("./H5.png");
  }
  .iconAz{
    background-image: url("./and.png");
  }
  #index .borad {
    height:0.35rem;
    line-height:0.35rem;
    background: #f5f5f5;
    color: #999999;
    text-align: center;
    font-size: 0.12rem;
    position: relative;
    overflow: hidden;
    .swiper-container-borad {
      height:100%;
      width: 100%;
      .swiper-wrapper {
        width: 90%;
        margin: 0 auto;
        .swiper-slide {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  #index .horn {
    display: block;
    position: absolute;
    height:0.35rem;
    width: 0.3rem;
    background: url("./horn.png") no-repeat left center ;
    background-size: 60%;
    left: 0.17rem;
    top:0;
  }
  #index .exclusive-title {
    width: 100%;
    height:0.35rem;
    line-height:0.35rem;
    font-size:0.15rem;
    position: relative;
    padding-left:0.45rem;
    span {
      display: block;
      height:100%;
      width:0.3rem;
      position: absolute;
      left: 0.17rem;
      top:0;
      background: url("./exclusive.png") no-repeat left center;
      background-size: 65%;
    }
  }
  #index .active-topics {
    width: 100%;
    height:0.35rem;
    line-height:0.35rem;
    font-size:0.15rem;
    position: relative;
    padding-left:0.45rem;
    span {
      display: block;
      height:100%;
      width:0.3rem;
      position: absolute;
      left: 0.17rem;
      top:0;
      background: url("./activetopics.png") no-repeat left center;
      background-size: 60%;
    }
  }
  #index .showExclusive {
    width: 100%;
    .exclusive-con {
      margin: 0.15rem 0;
    }
    .exclusive-con:nth-last-child(1){
      margin-bottom: 0;
    }
    .exclusive-img {
      height:2rem;
      margin:0 0.15rem;
      img {
        border-radius: 0.05rem;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    p {
      margin:0 0.15rem;
      height: 0.4rem;
      line-height:0.4rem;
      span:nth-child(1){
        display: block;
        float: left;
        font-size: 0.16rem;
      }
      span:nth-child(2){
        display: block;
        float: right;
        font-size: 0.12rem;
        color: #B9B9B9;
      }
    }
    /*.exclusive-btn {*/
      /*height: 0.4rem;*/
      /*line-height: 0.4rem;*/
      /*text-align: center;*/
      /*color: #FFFFFF;*/
      /*background: #e7384a;*/
      /*border-radius: 0.05rem;*/
      /*font-size: 0.16rem;*/
    /*}*/
  }
  #index .companyInfo {
    padding-bottom: 0.5rem;
    height:0.65rem;
    background:rgb(231, 55, 74);
    color: #fff;
    text-align: center;
    font-size: 0.15rem;
    line-height:0.3rem;
  }
  #index .active-con {
    height:1rem;
    margin:0.15rem 0 ;
    margin-left:0.15rem;
    .activeSlide {
      margin-left:0.02rem;
      height: 1rem;
      width: 47%;
      div img {
        display: block;
        display: inline-block;
        width: 100%;
        height: 1rem;
      }
    }
  }
</style>
