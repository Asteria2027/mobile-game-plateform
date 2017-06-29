<template>
    <div class="gameHall" >
       <div class="title">游戏大厅</div>
      <div class="gameHall-content" ref="gameHall">
        <div>
          <div class="platformGameTitle borderBottom-1px">
            <span class="icon"></span>
            <span class="name">平台游戏</span>
          </div>
          <div style="background-color: #fff">
            <div class="platformGame">
              <div class="platformGameLeft" @click="_routerList(1)">
                <div class="icon"></div>
                <div class="name">精品推荐</div>
              </div>
              <ul class="platformGameRight">
                <li class="platformGameRight-item" @click="_routerList(8022)">
                  <div class="icon"></div>
                  <div class="name">独家游戏</div>
                </li>
                <li class="platformGameRight-item" @click="_routerList(8008)">
                  <div class="icon"></div>
                  <div class="name">网络游戏</div>
                </li>
                <li class="platformGameRight-item" @click="_routerList(2)">
                  <div class="icon"></div>
                  <div class="name">热门游戏</div>
                </li>
                <li class="platformGameRight-item" @click="_routerList(8009)">
                  <div class="icon"></div>
                  <div class="name">单机游戏</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="myGame-title borderBottom-1px">
            <span class="icon"></span>
            <span class="name">我玩过的</span>
          </div>
          <HorizontalSlide :gameData="gameData" :imgSrc="imgSrc"></HorizontalSlide>
          <div class="commonGame-title borderBottom-1px">
            <span class="icon"></span>
            <span class="name">常见分类</span>
          </div>
          <div class="commonGame">
            <ul>
              <li class="commonGame-item" @click="_routerList(8005)">
                <div class="icon"></div>
                <div class="name">角色扮演</div>
              </li>
              <li class="commonGame-item" @click="_routerList('8006')">
                <div class="icon"></div>
                <div class="name">射击游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8002)">
                <div class="icon"></div>
                <div class="name">即时战斗</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8012)">
                <div class="icon"></div>
                <div class="name">冒险游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8001)">
                <div class="icon"></div>
                <div class="name">策略游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8003)">
                <div class="icon"></div>
                <div class="name">战旗游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8013)">
                <div class="icon"></div>
                <div class="name">竞速游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8014)">
                <div class="icon"></div>
                <div class="name">动作游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8015)">
                <div class="icon"></div>
                <div class="name">模拟经营</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8016)">
                <div class="icon"></div>
                <div class="name">养成游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8017)">
                <div class="icon"></div>
                <div class="name">飞行游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8004)">
                <div class="icon"></div>
                <div class="name">体育游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8018)">
                <div class="icon"></div>
                <div class="name">格斗游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8019)">
                <div class="icon"></div>
                <div class="name">益智游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8020)">
                <div class="icon"></div>
                <div class="name">对战游戏</div>
              </li>
              <li class="commonGame-item" @click="_routerList(8021)">
                <div class="icon"></div>
                <div class="name">其他</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import HorizontalSlide from '../HorizontalSlide/HorizontalSlide.vue';
  export default{
    data(){
      return{
        gameData:[],
        imgSrc:'imgUrl'
      }
    },
    components:{
      HorizontalSlide
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('gameHall')!=-1){
          this.$nextTick(function () {
            let self=this;
//            let height = $(window).height();
//            $('.gameHall').height(height-$(".tab-bottom").height()-$(".title").height());
            self._initScroll();
          });
        }
      }
    },
    created(){
      this.$nextTick(function () {
//        let height = $(window).height();
//        $('.gameHall').height(height-$(".tab-bottom").height()-$(".title").height());
      });
      this.$http.post("/api/user/getRecentlyPlayedList",{country:0,terminal:4},{emulateJSON:true}).then(function (res) {
        res = res.body;
        if(res.result === 0){
          if(res.data.list.length<7){
            for(let i = 0;i<res.data.list.length;i++){
              if(res.data.list[i].terminal!=1){
                this.gameData.push(res.data.list[i]);
              }
            }
            this.$http.post('/api/index/getIndexGameByModelId',{country:0,modelId:1,pageSize:8-res.pager.list.length,pageNo:1,terminal:4},{emulateJSON:true}).then(function(result) {
              if (result.body.result==0){
                  for(let j =0 ; j<result.body.data.list.length;j++){
                    if(result.body.data.list[j].platformTerminal!=1){
                      result.body.data.list[j]['imgUrl'] =result.body.data.list[j]['iconURL'];
                      this.gameData.push(result.body.data.list[j])
                    }
                  }
              }
              this.imgSrc='imgUrl';
            });
          }else{
              for(let i = 0;i<res.data.list.length;i++){
                if(res.data.list[i].terminal!=1){
                  this.gameData.push(res.data.list[i]);
                }
              }
          }
        }else{
          this.$http.post('/api/index/getIndexGameByModelId',{country:0,modelId:1,terminal:4},{emulateJSON:true}).then(function(res) {
            for(let j =0 ; j<res.body.data.list.length;j++){
              if(res.body.data.list[j].platformTerminal!=1){
                this.gameData.push(res.body.data.list[j])
              }
            }
            this.imgSrc='iconURL';
          });
        }
      });
      this.$nextTick(()=>{
        this._initScroll();
      })
    },
    methods:{
      _initScroll(){
//          if(this.gameHall){
//            this.gameHall.refresh()
//          }else{
//            this.gameHall =new Bscroll(this.$refs.gameHall,{
//              click:true
//            });
//          }
      },
      _routerList(value){
         this.$router.push({path:'/list/'+value})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .gameHall {
    font-size:0;
    width: 100%;
    position: absolute;
    top: 0.45rem;
    bottom: 0.5rem;
    background-color: #E9E9E9;
    .gameHall-content{
      width: 100%;
      padding-bottom: 0.5rem;
    }
    .title{
      width: 100%;
      height: 0.45rem;
      line-height: 0.45rem;
      position: fixed;
      top:0;
      z-index: 2;
      color: #fff;
      background-color:#e7374b ;
      text-align: center;
      font-size: 0.25rem;
    }
    .platformGameTitle,.commonGame-title,.myGame-title{
      height: 0.45rem;
      line-height: 0.45rem;
      font-size: 0.14rem;
      background-color: #fff;

      .icon{
        height:0.29rem ;
        width: 0.29rem;
        margin: 0.06rem 0.13rem 0 0.13rem;
        display: inline-block;

        background-size: 0.29rem 0.29rem;
        background-repeat: no-repeat;
      }
      .name{
        display: inline-block;
        height: 0.45rem;
        line-height: 0.45rem;
        vertical-align: top;
      }
    }
    .platformGameTitle{
      .icon{
        background-image: url("./pt.png");
      }
    }
    .myGame-title{
      margin-top: 0.05rem;
      .icon{
        background-image: url("./payD.png");
      }
    }
    .commonGame-title{
      margin-top: 0.05rem;
      .icon{
        background-image: url("./games9.png");
      }
    }

    .platformGame{
      width: 92%;
      margin: 0 auto;
      padding: 0.13rem 0;
      overflow: hidden;
      color: #fff;
      .platformGameLeft{
        width: 48%;
        height: 1.61rem;
        background-image: url("./bg1.jpg");
        background-repeat: no-repeat;
        background-size:100% 1.61rem;
        float: left;
        .icon{
          width: 0.65rem;
          height: 0.65rem;
          margin: 0 auto;
          background-image: url("game20.png");
          background-repeat: no-repeat;
          background-size:0.65rem 0.65rem;
          margin-top: 0.25rem;
        }
        .name{
          width: 100%;
          height:0.41rem;
          line-height: 0.41rem;
          text-align: center;
          font-size: 0.18rem;
        }
      }
      .platformGameRight{
        width: 48%;
        height: 1.61rem;
        float: right;
        .platformGameRight-item{
          height: 48%;
          width: 48%;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          .icon{
            width: 0.3rem;
            height: 0.3rem;
            margin: 0 auto;
            margin-top: 0.12rem;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .name{
            text-align: center;
            font-size:0.16rem ;
            height:0.23rem ;
            line-height: 0.23rem;
          }
        }
        .platformGameRight-item:nth-child(1){
          background-image: url("bg2.jpg");
          float: left;
          .icon{
            background-image: url("game21.png");
          }
        }
        .platformGameRight-item:nth-child(2){
          background-image: url("bg3.jpg");
          float: right;
          .icon{
            background-image: url("game23.png");
          }
        }
        .platformGameRight-item:nth-child(3){
          background-image: url("bg4.jpg");
          float: left;
          margin-top: 0.05rem;
          .icon{
            background-image: url("game24.png");
          }
        }
        .platformGameRight-item:nth-child(4){
          background-image: url("bg5.jpg");
          margin-top: 0.05rem;
          float: right;
          .icon{
            background-image: url("game25.png");
          }
        }
      }
    }
    .commonGame{
      background-color: #fff;
      ul{
        overflow: hidden;
      }
      .commonGame-item{
        width: 25%;
        height:0.99rem ;
        float: left;
        border-right: 1px solid #ebebeb;
        border-top: 1px solid #ebebeb;
        box-sizing: border-box;
        text-align: center;
        font-size:0.16rem ;
        .icon{
          width: 0.45rem;
          height: 0.45rem;
          margin: 0 auto;
          margin-top: 0.13rem;
          background-size: 0.45rem 0.45rem;
          background-repeat: no-repeat;
        }
        .name{
          height: 0.32rem;
          line-height: 0.32rem;
        }
      }
      .commonGame-item:nth-child(1){
        color:#fcb951 ;
        .icon{
          background-image: url("./gamenew01.png");
        }
      }
      .commonGame-item:nth-child(2){
        color:#c5a9fe ;
        .icon{
          background-image: url("./game02.png");
        }
      }
      .commonGame-item:nth-child(3){
        color:#fd9149 ;
        .icon{
          background-image: url("./gamenew03.png");
        }
      }
      .commonGame-item:nth-child(4){
        color:#fd9149 ;
        .icon{
          background-image: url("./game04.png");
        }
      }
      .commonGame-item:nth-child(5){
        color:#febb52 ;
        .icon{
          background-image: url("./game05.png");
        }
      }
      .commonGame-item:nth-child(6){
        color:#7cd056 ;
        .icon{
          background-image: url("./game06.png");
        }
      }
      .commonGame-item:nth-child(7){
        color:#f8716e ;
        .icon{
          background-image: url("./game07.png");
        }
      }
      .commonGame-item:nth-child(8){
        color:#f8716e ;
        .icon{
          background-image: url("./game08.png");
        }
      }
      .commonGame-item:nth-child(9){
        color:#7cd056 ;
        .icon{
          background-image: url("./game09.png");
        }
      }
      .commonGame-item:nth-child(10){
        color:#f8716e ;
        .icon{
          background-image: url("./game10.png");
        }
      }
      .commonGame-item:nth-child(11){
        color:#72d4ed ;
        .icon{
          background-image: url("./game12.png");
        }
      }
      .commonGame-item:nth-child(12){
        color:#fd9149;
        .icon{
          background-image: url("./game13.png");
        }
      }
      .commonGame-item:nth-child(13){
        color:#febb52;
        .icon{
          background-image: url("./game14.png");
        }
      }
      .commonGame-item:nth-child(14){
        color:#88b3e0;
        .icon{
          background-image: url("./game15.png");
        }
      }
      .commonGame-item:nth-child(15){
        color:#c5a9fe;
        .icon{
          background-image: url("./game16.png");
        }
      }
      .commonGame-item:nth-child(16){
        color:#72d4ed;
        .icon{
          background-image: url("./game17.png");
        }
      }
    }
  }

</style>
