<template>
  <div class="gamelist">
      <div class="title">
        <span class="icon icon-back" @click="backUrl"></span>
        <span class="name">游戏详情</span>
        <span class="right"></span>
      </div>
      <div class="sidebar">
        <span class="left icon-left " id="showLeft"></span>
        <span class="icon"></span>
        <span class="right icon-right " id="showRight"></span>
      </div>
    <nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-s1">
      <div><img src="./bannerleft.png"></div>
      <ul>
        <li @click="_gotoList(1)"><span></span><span>精品推荐</span></li>
        <li @click="_gotoList(8022)"><span></span><span>独家游戏</span></li>
        <li @click="_gotoList(8008)"><span></span><span>网络游戏</span></li>
        <li @click="_gotoList(2)"><span></span><span>热门游戏</span></li>
        <li @click="_gotoList(8009)"><span></span><span>单机游戏</span></li>
      </ul>
      <ul>
        <li @click="_gotoList(8005)"><span></span><span>角色扮演</span></li>
        <li @click="_gotoList(8006)"><span></span><span>射击游戏</span></li>
        <li @click="_gotoList(8002)"><span></span><span>即时战斗</span></li>
        <li @click="_gotoList(8012)"><span></span><span>冒险游戏</span></li>
        <li @click="_gotoList(8001)"><span></span><span>策略游戏</span></li>
        <li @click="_gotoList(8003)"><span></span><span>棋牌游戏</span></li>
        <li @click="_gotoList(8013)"><span></span><span>竞速游戏</span></li>
        <li @click="_gotoList(8017)"><span></span><span>飞行游戏</span></li>
      </ul>
    </nav>
    <nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right" id="cbp-spmenu-s2">
      <div><div><img src="./bannerright.png"></div></div>
      <div class="bug">
        <div class="swiper-container7">
          <span></span>
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in news" v-html="item.title" @click="notic(item.id)"></div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="!isLogin" @click="_gamelistRoute('login')">您尚未登录,请登录</div>
        <div v-if="isLogin">
          <span>账户余额:{{userInfo.lyb}}</span>
        </div>
      </div>
      <ul>
        <li @click="_gamelistRoute('integral')"><span></span><span>积分任务</span></li>
        <li @click="_gamelistRoute('information')"><span></span><span>我的消息</span></li>
        <li @click="_gamelistRoute('collect')"><span></span><span>我的收藏</span></li>
        <li @click="_gamelistRoute('conversion')"><span></span><span>兑换记录</span></li>
        <li @click="_gamelistRoute('paydetail')"><span></span><span>充值明细</span></li>
        <li @click="_gamelistRoute('profile1')"><span></span><span>收货地址</span></li>
        <li @click="_gamelistRoute('suggest')"><span></span><span>建议反馈</span></li>
        <li @click="_gamelistRoute('1')"><span></span><span>联系我们</span></li>
        <li >
          <!--<div v-if="isLogin" @click="ext" >注销</div><div v-if="!isLogin" @click="_gamelistRoute('login')">请登录</div>-->
          <div v-if="isLogin" @click="showexit">注销</div><div v-if="!isLogin" @click="_gamelistRoute('login')">请登录</div>
        </li>
      </ul>
    </nav>
      <div class="content" ref="gameList">
        <div>
          <div class="banner">
            <img :src="gameData.tittleimgUrl">
            <div class="Data">
          <span class="icon">
            <img :src="gameData.iconUrl">
          </span>
              <span class="Data-content">
            <span class="name">{{gameData.name}}</span>
            <span class="type-time">
              <p>
                <span class="type">{{gameType}}</span>
              </p>
             <p>
               <span class="people">{{gameData.popularitVal}}人在玩·</span>
              <span class="time">{{gameData.registTime|setTime}}</span>
             </p>
            </span>
          </span>
            </div>
          </div>
          <div class="recommended-title borderBottom-1px">
            <span class="icon"></span>
            <span class="name">本周推荐</span>
            <span class="more" @click=" _List">更多</span>
            <span class="more-icon"  @click=" _List"></span>
          </div>
          <HorizontalSlide :gameData="Sole" :imgSrc="imgSrc"></HorizontalSlide>
          <div class="tab borderBottom-1px">
            <ul>
              <li class="tab-item" :class="{active:tabActive==1}" @click="_tab(1)">详情</li>
              <li class="tab-item" :class="{active:tabActive==2}" @click="_tab(2)">活动</li>
              <li class="tab-item" :class="{active:tabActive==3}" @click="_tab(3)">公告</li>
              <!--<li class="tab-item" :class="{active:tabActive==4}" @click="_tab(4)">礼包</li>-->
            </ul>
          </div>
          <div class="details" v-if="tabActive==1">
            <div class="introduction">
              <h3>游戏简介</h3>
              <div>{{gameData.desc|limitWord(151)}}</div>
            </div>
            <div class="screenshot">
              <h3>游戏截图</h3>
              <div class="swiper-container3" >
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,index) in screenshot" @click="_swiper()">
                    <img :src="item.url">
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="activity" v-if="tabActive==2">
            <ul>
              <li class="activity-item" v-for="item in activity" @click="gotoNotic(item.isHref,item.id,1,item.titleHref)">
                <div class="img">
                  <img :src="item.imgUrl">
                </div>
                <div class="activity-title">
                  <span>{{item.title}}</span>
                  <span>{{item.creatorTime|setTime}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="Notice" v-if="tabActive==3" >
            <ul>
              <li class="Notice-item" v-for="item in notice" @click="gotoNotic(item.isHref,item.id,1,item.titleHref)">
                <div>
                  <div class="Notice-name">
                    <div class="Notice-title">{{item.title}}</div>
                    <div class="Notice-type">
                      <span>{{item.platformName}}</span>
                      <span>{{item.creatorTime|setTime}}</span>
                    </div>
                  </div>
                  <div class="Notice-icon">
                    <img :src="item.imgUrl">
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--<div class="Package" v-if="tabActive==4">-->
            <!--<div class="giftBag">-->
              <!--<p>暂未开放</p>-->
              <!--<div class="swiper-container5">-->
                <!--<div class="swiper-wrapper">-->
                  <!--<div class="swiper-slide" v-for="(item,index) in giftBag" @click="_giftContent(item.content,item.leftTop,item.id,index)">-->
                    <!--<div class="giftBag-icon" :class="{active:index==iconindex}">-->
                      <!--<img :src="item.rotationImgUrl" >-->
                      <!--<div class="top-left" :class="topLtft[item.leftTop]"></div>-->
                    <!--</div>-->
                    <!--<div class="giftBag-name">{{item.title}}</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="Package-content borderBottom-1px">-->
              <!--<h3>礼包内容</h3>-->
              <!--<div class="gift-content">-->
                <!--{{giftContent}}-->
              <!--</div>-->
              <!--<div class="notButtom buttom" v-if="exchange!=0">直接兑换</div>-->
              <!--<div class="canButtom buttom" @click="_affirmLink(exchangeId)" v-if="exchange==0">直接兑换</div>-->
            <!--</div>-->
            <!--<div class="Package-explain">-->
              <!--<h3>使用说明</h3>-->
              <!--<p>1.登陆游戏即可领取礼包</p>-->
              <!--<p>2.每个礼包只能领取一次</p>-->
              <!--<p>3.点击领取后，礼包将直接发送至游戏内，进入游戏即可查收</p>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="screenshotBig" :class="{none:none}">
        <div class="swiper-container4">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in screenshot" @click="_swiperB()">
              <img :src="item.url">
            </div>
          </div>
        </div>
      </div>
      <div class="cbp-spmenuBg"  :class="{menuBgnone:spmenu}" @click="_menu()"></div>
      <div class="bottom" @click="joinGame">进入游戏</div>
    <div class="m-loginexit"  v-show="showTc">
      <div class="loginexitCon">
        <div class="loginexitCon-pic"></div>
        <div class="loginexitCon-txt">是否确认退出当前登录帐号？</div>
        <div class="loginexitBut">
          <span @click="hideexit">取消</span>
          <span  @click="ext" >确定</span>
        </div>
      </div>
    </div>



  </div>
</template>

<script type="text/ecmascript-6">
  import HorizontalSlide from '../HorizontalSlide/HorizontalSlide.vue';
  import { mapState } from 'vuex';

  let swiper3;
  let swiper9;
  let swiper5;
  let mySwiper7;
  let gameListTimer;
  export default{
    data() {
        return{
          gameData:"",
          gameType:'',
          imgSrc:'iconUrl',
          Sole:[],
          tabActive:1,
          screenshot:[],
          none:true,
          activity:[],
          notice:[],
          giftBag:[],
          topLtft:['top-left-icon1','top-left-icon2','top-left-icon3'],
          giftContent:'',
          exchange:'',
          exchangeId:'',
          iconindex:'',
          spmenu:true,
          news:[],
          sourUrl:'',
          showTc:false
        }
    },
    components:{
      HorizontalSlide
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('gamelist')!=-1){
          this.reload();
          $(".Load").show();
          $(".Load").css("top","0.84rem");
          var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
            showLeft = document.getElementById( 'showLeft' ),
            showRight = document.getElementById( 'showRight' ),
            menuRight = document.getElementById( 'cbp-spmenu-s2' );
          if ($("#cbp-spmenu-s1").hasClass("cbp-spmenu-open")) {
            this.spmenu=true;
            classie.toggle( menuLeft, 'cbp-spmenu-open' );
          }else if($("#cbp-spmenu-s2").hasClass("cbp-spmenu-open")){
            this.spmenu=true;
            classie.toggle( menuRight, 'cbp-spmenu-open' );
            disableOther( 'showRight' );
          }
          gameListTimer=setTimeout(function () {
            document.querySelector(".Load-icon").style.display="none";
            document.querySelector("#load-success").style.display="none";
            document.querySelector("#load-faile").style.display="block";
          },3000)
        }
      }
    },
    created() {
      $(".Load").show();
      $(".Load").css("top","0.84rem");
      gameListTimer=setTimeout(function () {
        document.querySelector(".Load-icon").style.display="none";
        document.querySelector("#load-success").style.display="none";
        document.querySelector("#load-faile").style.display="block";
      },3000)
      this.reload();
      this.$http.post('/api/index/getGameByType',{country:0,gameType:8022,terminal:4},{emulateJSON:true}).then(function(res) {
        for(let j =0 ; j<res.body.data.list.length;j++){
          if(res.body.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.body.data.list[j].platformTerminal){
            this.Sole.push(res.body.data.list[j])
          }
        }
      });
      this.$nextTick(()=>{
        this.iconindex=0;
        let self=this;
        //侧边栏
        var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
          showLeft = document.getElementById( 'showLeft' ),
          showRight = document.getElementById( 'showRight' ),
          menuRight = document.getElementById( 'cbp-spmenu-s2' );
        showLeft.onclick = function() {
          self.spmenu=false;
          classie.toggle( this, 'active' );
          classie.toggle( menuLeft, 'cbp-spmenu-open' );
          disableOther( 'showLeft' );
        };
        showRight.onclick = function() {
          self.spmenu=false;
          self._swperFirst();
          classie.toggle( this, 'active' );
          classie.toggle( menuRight, 'cbp-spmenu-open' );
          disableOther( 'showRight' );
        };
        function disableOther( button ) {
          if( button !== 'showLeft' ) {
            classie.toggle( showLeft, 'disabled' );
          }
          if( button !== 'showRight' ) {
            classie.toggle( showRight, 'disabled' );
          }
        }
      })


    },
    methods:{
      notic(id){
        this.$router.push({path:'/notic/3/'+id})
      },
      reload(){
        this.activity=[];
        this.notice=[];
        let id=this.$route.params.id;
        this.$http.post('/api/index/getGameById',{country:0,platformId:id},{emulateJSON:true}).then(function(res) {
          this.gameData = res.body.data;
          this.sourUrl=res.body.data.sourUrl;
          if(res.body.result==0){
            clearTimeout(gameListTimer)
            $(".Load").hide();
          }
          for(let i = 0;i<res.body.data.gameType.length;i++){
              if (i==res.body.data.gameType.length-1){
                this.gameType+=res.body.data.gameType[i].gameTypeName
              }else if(i==0){
                  if(res.body.data.gameType.length==1){
                    this.gameType=res.body.data.gameType[i].gameTypeName
                  }else{
                    this.gameType=res.body.data.gameType[i].gameTypeName+","
                  }
              }else{
                this.gameType+=res.body.data.gameType[i].gameTypeName+","
              }
          }
        });
        this.$http.post('/api/index/gamePictureInfo',{country:0,platformId:id,imageType:2},{emulateJSON:true}).then(function(res) {
          this.screenshot=res.body.data.list;
          this.$nextTick(()=>{
            this._swperFirst();
          })
        });
        this.$http.post('/api/index/gameNotice',{country:0,platformId:id,isAll:1},{emulateJSON:true}).then(function(res) {
            if(res.result==0&&res.data.totalRows>0){
              for(let i = 0 ; i<res.body.data.list.length; i++){
                if(res.body.data.list[i].type==1){
                  this.notice.push(res.body.data.list[i])
                }else if (res.body.data.list[i].type==2){
                  this.activity.push(res.body.data.list[i])
                }
              }
            }
        });
//        this.$http.post('/api/gift/getGiftBag',{country:0,gameId:id,enable:0},{emulateJSON:true}).then(function(res) {
//            if(res.body.result==0&&res.body.total>"0"){
//              for(let i=0;i<res.body.giftBag.length;i++){
//                if (res.body.giftBag[i].canUse>0){
//                  if (res.body.giftBag[i].appliedCount>0){
//                    res.body.giftBag[i]['leftTop']=2
//                  }else{
//                    res.body.giftBag[i]['leftTop']=0
//                  }
//                }else{
//                  res.body.giftBag[i]['leftTop']=1
//                }
//              }
//              this.giftBag=res.body.giftBag;
//              this._giftContent(res.body.giftBag[0].content)
//              this.exchange=res.body.giftBag[0].leftTop;
//              this.exchangeId=res.body.giftBag[0].id;
//              this.$nextTick(()=>{
//                this._swperFirst();
//                this.iconindex=0;
//              })
//            }
//        })
        this.$http.post('/api/activity/getActivityInfo',{country:0,terminal:4,type:1},{emulateJSON:true}).then(function(res) {
            this.news=res.body.data.list;
            this.$nextTick(()=>{

            })
        })
      },
      _tab(value){
          this.tabActive=value;
          if (value==1||value==4){
            this.$nextTick(()=>{
              this._swperFirst();
            })
          }
      },
      _swperFirst(){
        swiper3 = new Swiper('.swiper-container3', {
          slidesPerView: 2,
          initialSlide: 0,
          paginationClickable: true,
          spaceBetween: 10,
          freeMode: true,
          observer: true,
          observeParents: true
        });
        swiper9 = new Swiper('.swiper-container4', {
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 100,
          observer: true,
          observeParents: true
        });
        swiper5 = new Swiper('.swiper-container5', {
          freeMode: true,
          slidesPerView: 4,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true
        });
        mySwiper7=new Swiper('.swiper-container7', {
          autoplay: 4000,
          direction : 'vertical',
          loop : true,
          autoplayDisableOnInteraction : false,
          observer: true,
          observeParents: true
        });
      },
      _swiper(){
        swiper9.slideTo(swiper3.clickedIndex, 1000, false);
        this.none=false;
      },
      _swiperB(){
        swiper3.slideTo(swiper9.clickedIndex, 1000, false);
        this.none=true;
      },
      _giftContent(value,can,id,index){
          this.giftContent=value;
          this.exchange=can;
          this.exchangeId=id;
          this.iconindex=index;
      },
      _affirmLink(value){
        sessionStorage.setItem("affirm","gift")
        this.$router.push({path:'/affirm/'+value})
      },
      //侧边栏
      _menu(){
        function disableOther( button ) {
          if( button !== 'showLeft' ) {
            classie.toggle( showLeft, 'disabled' );
          }
          if( button !== 'showRight' ) {
            classie.toggle( showRight, 'disabled' );
          }
        }
        var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
          showLeft = document.getElementById( 'showLeft' ),
          showRight = document.getElementById( 'showRight' ),
          menuRight = document.getElementById( 'cbp-spmenu-s2' );
        if ($("#cbp-spmenu-s1").hasClass("cbp-spmenu-open")) {
          this.spmenu=true;
          classie.toggle( menuLeft, 'cbp-spmenu-open' );
        }else{
          this.spmenu=true;
          classie.toggle( menuRight, 'cbp-spmenu-open' );
          disableOther( 'showRight' );
        }
      },
      backUrl(){
        if(sessionStorage.getItem("gamelist")){
          this.$router.push({path:sessionStorage.getItem("gamelist")})
          sessionStorage.removeItem("gamelist")
        }else {
          this.$router.push({path:'/index'})
        }
        $(".Load").hide();
      },
      _gotoList(value){
          sessionStorage.setItem("_gotoList","/gamelist/"+this.$route.params.id)
        this.$router.push({path:'/list/'+value})
      },
      _gamelistRoute(value){
          if(value==1){
              window.location.href="http://71chat.com/scsf/phone/visitor.html?cmpcd=178019";
          }else if(value=="integral"){
            sessionStorage.setItem("gamelistUrl",this.$route.path)
            this.$router.push({path:'/'+value})
          }else{
              if(value=="collect"){
                sessionStorage.setItem("collect","gamelist/"+this.$route.params.id)
                this.$router.push({path:'/'+value})
              }else{
                this.$router.push({path:'/'+value})
              }
          }
      },
      ext(){
          this.exitLogin();
          this.showTc = false;
      },
      hideexit() {
        this.showTc = false;
      },
      showexit(){
        this.showTc = true;
      },
      _List(){
        this.$router.push({path:'/list/8022'})
      },
      joinGame(){
          if (this.isLogin){
            this.$http.post('/api/user/addRecentlyPlayed',{country:0,terminal:4,gameId:this.$route.params.id},{emulateJSON:true}).then(function(res) {})
             if(this.$route.params.id.length==6){
               this.$router.push({path:'/games/'+this.$route.params.id});
             } else{
               let day=new Date().getTime();
               if(this.sourUrl.indexOf("?")!=-1){
                 window.location.href=this.sourUrl+"&uid=" + this.userInfo.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + this.userInfo.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
               }else{
                 window.location.href=this.sourUrl+"?uid=" + this.userInfo.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + this.userInfo.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
               }
             }
          }else{
            this.$router.push({path:'/login'})
          }
      },
      gotoNotic(val,id,type,url){
          if(val==1){
              window.location.href=url
          }else{
            this.$router.push({path:'/notic/'+type+"/"+id})
          }
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
.gamelist{
  background-color: #f5f5f5;
  .content{
    padding-top: 0.84rem;
    width: 100%;
    overflow-x: hidden;
    padding-bottom: 0.5rem;
  }
  .title{
    height: 0.45rem;
    width: 100%;
    background-color: #e7384a;
    line-height: 0.45rem;
    position: fixed;
    top: 0;
    z-index: 2;
    display: block;
    display: flex;
    .icon{
      height: 0.45rem;
      width: 0.45rem;
      line-height: 0.45rem;
      display: inline-block;
      text-align: center;
      color: #fff;
      font-size: 0.24rem;
    }
    .name{
      display: block;
      height: 0.45rem;
      line-height: 0.45rem;
      text-align: center;
      color: #fff;
      font-size: 0.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 2;
    }
    .right{
      display: inline-block;
      height: 0.45rem;
      width: 0.45rem;
    }
  }
  .sidebar{
    height: 0.39rem;
    width: 100%;
    line-height: 0.39rem;
    background-color: #fff;
    position: fixed;
    top:0.45rem ;
    display: block;
    display: flex;
    z-index: 2;
    .left,.right{
      margin: 0.035rem .08rem;
      height: 0.32rem;
      width: 0.32rem;
      line-height: 0.32rem;
      display: inline-block;
      font-size: 0.30rem;
      text-align: center;
      color: #8E7777;
    }
    .icon{
      display: block;
      flex: 2;
      background-image: url("./gamelist.png");
      background-size: 1.26rem 0.32rem;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .banner{
    width: 100%;
    height:1.87rem;
    position: relative;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
    .Data{
      position: absolute;
      bottom: 0.2rem;
      left: 0.2rem;
      right: 0.2rem;
      height: 0.71rem;
      color: #fff;
      display: block;
      display: flex;
      .icon{
        display: block;
        width: 0.71rem;
        height:0.71rem;
        border-radius: 8px;
        overflow: hidden;
        img{
          display: block;
          border-radius: 8px;
        }
      }
      .Data-content{
        display:block;
        flex: 2;
        height: 100%;
        margin-left: 0.1rem;
        .name{
          display: inline-block;
          width: 100%;
          height: 0.2rem;
          line-height: 0.2rem;
          font-size: 0.18rem;
          margin-top: 0.12rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .type-time{
          display: inline-block;
          width: 100%;
          height: 0.16rem;
          line-height: 0.16rem;
          font-size: 0.12rem;
          margin-top: 0.06rem;
          color: #e9e9e9;
          .type,.time,.people{

          }
        }
      }
    }
  }

  .recommended-title{
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.14rem;
    background-color: #fff;
    display: block;
    display: flex;
    .icon{
      display: inline-block;
      height: 0.2rem;
      width: 0.2rem;
      margin: 0.1rem;
      background-image:url("./games1.png") ;
      background-size: 0.2rem 0.2rem;
      background-repeat: no-repeat;
    }
    .name{
      display: block;
      flex: 2;
      height: 100%;
    }
    .more{
      display:block;
      height: 100%;
    }
    .more-icon{
      display: inline-block;
      height: 0.2rem;
      width: 0.1rem;
      margin: 0.1rem;
      background-image: url("./myjt.png");
      background-size: 0.1rem 0.2rem;
      background-repeat: no-repeat;
    }
  }
  .tab{
    width: 100%;
    padding:0.06rem 0 ;
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: #fff;
    margin-top: 0.05rem;
    ul{
      width: 80%;
      height: 0.5rem;
      margin: 0 auto;
      border-radius: 10px;
      border: 1px solid #e7384a;
      display: block;
      display: flex;
      overflow: hidden;
      .tab-item{
        display: block;
        flex: 1;
        height:0.5rem ;
        text-align: center;
        font-size: 0.16rem;
        color: #e7384a;
        border-right: 1px solid #e7384a;
      }
      li:last-of-type{
        border-right:0;
      }
      .active{
        background-color: #e7384a;
        color: #fff;
      }
    }
  }
  .details{
    background-color: #fff;
    .introduction{
      h3{
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.20rem;
        padding-left: 0.10rem;
      }
      div{
        font-size: 0.16rem;
        line-height: 0.20rem;
        padding: 0 0.1rem;
        text-indent: 0.32rem;
        color: #b4b4b4;
        margin-top: 0.05rem;
      }
    }
    .screenshot{
      width: 100%;
      h3{
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.20rem;
        padding-left: 0.10rem;
      }
      .swiper-container3{
        img{
          display: block;
          height: 100%;
          width: 100%;

        }
        .swiper-slide{
          height: 2.59rem ;
        }
      }
    }
  }
  .activity{
    width: 100%;
    min-height: 1.16rem;
    .activity-item{
      width: 90%;
      height: 2.07rem;
      border: 1px solid #ebebeb;
      border-radius: 10px;
      position: relative;
      margin: 0 auto;
      margin-top: 0.10rem;
      .img{
        margin: 0.06rem 0.11rem 0.06rem 0.11rem;
        img{
          display: block;
          height: 1.55rem;
          width: 100%;
        }
      }
      .activity-title{
        margin: 0 0.11rem;
        height: 0.38rem;
        line-height: 0.38rem;
        font-size: 0.14rem;
        display: block;
        display: flex;
        >span:nth-of-type(1){
           display: block;
          display: inline-block;
          width:75% ;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        >span:nth-of-type(2){
          width: 25%;
           display: block;
          display:inline-block ;
          text-align: right;
        }
      }
    }
  }
  .Notice{
    width: 100%;
    height: 1.16rem;
    li{
      padding: 0.09rem 3%;
      border-bottom: 1px solid #ebebeb;
    }
    li>div{
      width: 100%;
      height: 0.98rem;
      overflow: hidden;
      .Notice-name{
        float: left;
        width:73% ;
        display: block;
        display: flex;
        height: 100%;
        letter-spacing: 1px;
        display: block;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 0.1rem;
        .Notice-title{
          margin-top: 0.03rem;
          height: 0.23rem;
          line-height: 0.23rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.16rem;
          color: #1c1c1c;
        }
        .Notice-type{
          height: 0.2rem;
          line-height: 0.2rem;
          font-size: 0.12rem;
          color: #b4b4b4;
          display: block;
          display: flex;
          justify-content: space-between;
        }
      }
      .Notice-icon{
        display: block;
        flex: 0 0 1.06rem;
        height: 0.98rem;
        overflow: hidden;
        img{
          display: block;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .Package{
    .swiper-container5{
      background-color: #fff;
      .swiper-slide{
        padding: 0.13rem 0;
        position: relative;
        .giftBag-icon{
          height:0.77rem ;
          width: 0.77rem;
          border-radius: 10px;
          overflow: hidden;
          margin: 0 auto;
          >img{
             display: block;
            width: 100%;
            height: 100%;
          }

          .top-left{
            position: absolute;
            height: 0.32rem;
            width: 0.32rem;
            top:0.1rem;
            left: 0.05rem;
            background-size: 0.32rem 0.32rem;
            background-repeat: no-repeat;
          }
        }
        .active{
          box-shadow: 0 0 10px red;
        }
        .top-left-icon1{
          background-image: url("playsxq03.png");
        }
        .top-left-icon2{
          background-image: url("lw.png");
        }
        .top-left-icon3{
          background-image: url("yl.png");
        }
      }

      .giftBag-name{
        width: 100%;
        height: 0.18rem;
        font-size: 0.12rem;
        line-height: 0.18rem;
        text-align: center;
        margin-top: 0.05rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .Package-content{
      min-height: 1.42rem;
      width: 100%;
      position: relative;
      h3{
        width: 100%;
        height: 0.33rem;
        line-height: 0.3rem;
        font-size: 0.20rem;
        padding-left: 0.10rem;
      }
      .gift-content{
        color: #5b5b5b;
        font-size: 0.14rem;
        padding: 0 0.05rem;
        margin-top: 0.15rem;
        text-indent: 0.28rem;
      }
      .buttom{
        height: 0.38rem;
        width: 0.97rem;
        line-height: 0.38rem;
        position: absolute;
        top: 0.05rem;
        right: 0.05rem;
        font-size: 0.14rem;
        color: #fff;
        border-radius: 5px;
        text-align: center;
      }
      .notButtom{
        background-color: rgb(109,109,109);
      }
      .canButtom{
        background-color: #e7384a;
      }
    }
    .Package-explain{
      font-size: 0.14rem;
      h3{
        width: 100%;
        height: 0.33rem;
        line-height: 0.33rem;
        font-size: 0.20rem;
        padding-left: 0.10rem;
      }
      p{
        padding: 0 0.05rem;
        margin-top: 0.02rem;
      }
    }
  }
  .screenshotBig{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    .swiper-container4{
      width: 80%;
      position: fixed;
      top: 0;
      height: 80%;
      margin: 10% 0 0 10%;
      z-index: 11;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .bottom{
    text-align: center;
    line-height: 0.5rem;
    height: 0.5rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background-color: #e7384a;
    color: #fff;
    font-size: 0.18rem;
  }
  .none{
    display: none;
  }
  .cbp-spmenuBg{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,0.5);
  }
  .menuBgnone{
    display: none;
  }
  .cbp-spmenu {
  background:#fff;
  position:fixed;
    img{
      display: block;
      width: 100%;
      float: left;
    }
  }
  .cbp-spmenu-vertical {
  width:2.8rem;
  height:100%;
  top:0;
  z-index:10003;
  font-size:.16rem;
  overflow:auto;
    >div>div{
    overflow: hidden;
  }
  }
  .cbp-spmenu-left>ul>li {
  padding:.03rem;
  overflow:hidden
  }
  .cbp-spmenu-left>ul>li>span:nth-of-type(1) {
    display: block;
  width:0.32rem;
  height:0.32rem;
  display:inline-block;
  float:left
  }
  .cbp-spmenu-left>ul>li>span:nth-of-type(2) {
    display: block;
  height:0.32rem;
  line-height:0.32rem;
  display:inline-block;
  float:left;
  margin-left:.1rem
  }
  .cbp-spmenu-left>ul:nth-of-type(1) {
  border-bottom:1px solid #ddd
  }
  .cbp-spmenu-left>ul>li:nth-of-type(1)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt1.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(2)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt2.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(3)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt3.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(4)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt3.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(5)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt5.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(6)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt6.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(7)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt7.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(8)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt8.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(8)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt9.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(9)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt10.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(10)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt11.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-left>ul>li:nth-of-type(11)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url('./gt12.png') no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-horizontal {
  width:100%;
  height:150px;
  left:0;
  z-index:1000;
  overflow:hidden
  }
  .cbp-spmenu-left {
  left:-2.8rem
  }
  .cbp-spmenu-right {
  right:-2.8rem;
  }
  .cbp-spmenu-right>div:nth-of-type(3) {
  padding:.17rem
  }
  .cbp-spmenu-right>div:nth-of-type(3)>div {
  background:#e7374b;
  color:#fff;
  text-align:center;
  line-height:.45rem;
  height:.45rem;
  border-radius:5px
  }
  .cbp-spmenu-right>div:nth-of-type(3)>div>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  margin-right:.1rem
  }
  .cbp-spmenu-right>ul>li {
  padding:.04rem;
  overflow:hidden
  }
  .cbp-spmenu-right>ul>li>span:nth-of-type(1) {
    display: block;
  width:0.32rem;
  height:0.32rem;
  display:inline-block;
  float:left
  }
  .cbp-spmenu-right>ul>li>span:nth-of-type(2) {
    display: block;
  height:.32rem;
  line-height:.32rem;
  display:inline-block;
  float:left;
  margin-left:.1rem
  }
  .cbp-spmenu-right>ul>li:nth-of-type(1)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url("./gr2.png") no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-right>ul>li:nth-of-type(2)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url("./gr3.png") no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-right>ul>li:nth-of-type(3)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url("./gr4.png") no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-right>ul>li:nth-of-type(4)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url("./gr5.png") no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-right>ul>li:nth-of-type(5)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url("./gr6.png") no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-right>ul>li:nth-of-type(6)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url("./gr7.png") no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-right>ul>li:nth-of-type(7)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url("./gr8.png") no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-right>ul>li:nth-of-type(8)>span:nth-of-type(1) {
    display: block;
    display: inline-block;
  background:url("./gr9.png") no-repeat center;
  background-size:100%
  }
  .cbp-spmenu-right>ul>li:nth-of-type(9) {
  text-align:center;
  background:#e9e9e9;
  color:#e7374b;
  height: 0.48rem;
    line-height: 0.48rem;
  }
  .cbp-spmenu-left.cbp-spmenu-open {
  left:0
  }
  .cbp-spmenu-right.cbp-spmenu-open {
  right:0
  }
  .cbp-spmenu-top {
  top:-150px
  }
  .cbp-spmenu-bottom {
  bottom:-150px
  }
  .cbp-spmenu-top.cbp-spmenu-open {
  top:0
  }
  .cbp-spmenu-bottom.cbp-spmenu-open {
  bottom:0
  }
  .cbp-spmenu-push {
  overflow-x:hidden;
  position:relative;
  left:0
  }
  .cbp-spmenu-push-toright {
  left:240px
  }
  .cbp-spmenu-push-toleft {
  left:-240px
  }
  .cbp-spmenu,.cbp-spmenu-push {
  -webkit-transition:all .3s ease;
  -moz-transition:all .3s ease;
  transition:all .3s ease
  }
  .bug{
    position: relative;
    .swiper-container7{
      height: 0.32rem;
      overflow: hidden;
      line-height: 0.32rem;
      padding: .06rem .06rem;
      background: #e9e9e9;
      >span{
         display: block;
         display: inline-block;
        height: 0.25rem;
        width: 0.25rem;
        margin: 0.035rem 0.06rem 0 0;
        display: inline-block;
        float: left;
        background-image: url("gr1.png");
        background-size: 0.25rem 0.25rem;
        background-repeat: no-repeat;
      }
      .swiper-wrapper{
        width: 80%;
        float: left;
        .swiper-slide{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100%
        }
      }
  }


  }
}
.m-loginexit{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  z-index: 99999;
  top:0;
  left:0;
}
.loginexitCon{
  width: 3rem;
  height:1.6rem;
  background: #fff;
  position: absolute;
  top:50%;
  margin-top:-0.8rem;
  left:50%;
  margin-left:-1.5rem;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #888;
}
.loginexitCon-pic{
  width:0.7rem;
  height:0.7rem;
  background: url("tcgth.png") no-repeat center;
  background-size: 100% 100%;
  margin:0 auto;
  margin-top:-0.35rem;
  border-radius: 50%;
}
.loginexitCon-txt{
  text-align: center;
  font-size:0.16rem;
  color: #666;
  padding:0.3rem 0 0.3rem 0;
}
.loginexitBut{
  height:0.47rem;
  border-top:1px solid #f5f5f5;
}
.loginexitBut>span{
  display: block;
  display: inline-block;
  width:1.49rem;
  text-align: center;
  line-height: 0.47rem;
  font-size:0.16rem;
  color: #666;
  float: left;
}
.loginexitBut>span:nth-child(1){
  display: block;
  display: inline-block;
  border-right: 1px solid #f5f5f5;
}
</style>
