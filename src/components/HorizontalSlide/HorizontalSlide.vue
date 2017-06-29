<template>
    <div class="HSlide" ref="HSlidepicWrapper">
      <ul ref="HSlidepicList">
        <li v-for="item in gameData" class="HSlideLis" @click="_goGamelist(item.gameId?item.gameId:item.id,item.gameType,item.sourUrl)" v-if="platformTerminal!=item.platformTerminal">
          <div>
            <img :src="item[imgSrc]">
            <span class="gameName">{{item.name?item.name:item.gameName}}</span>
          </div>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">

  import BScroll from "better-scroll";

  export default{
    data(){
      return {}
    },
    props: {
      gameData: {},
      imgSrc:{
        type:String
      }
    },
    watch:{
      'gameData'(){
        this.$nextTick(function (){
          this._initPics();
        });
      }
    },
    created(){
      this.$nextTick(function (){
        this._initPics();
      })
    },
    mounted(){
      this._initPics();
    },
    methods: {
      _initPics(){
        var windowW = $(window).width();
        var L = document.querySelectorAll('.HSlideLis').length;
        var singlePic = windowW/4;
        var width = singlePic * L ;
        $('.HSlideLis').width(singlePic);
        this.$refs.HSlidepicList.style.width = width + 'px';
        if (!this.hScroll) {
          this.hScroll = new BScroll(this.$refs.HSlidepicWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        } else {
          this.hScroll.refresh();
        }
      },
      _goGamelist(value,type,url){
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
          sessionStorage.setItem("gamelist",this.$route.path)
          this.$router.push({path:'/gamelist/'+value})
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .HSlide {
    padding: 0.1rem 0;
    height: 1rem;
    background-color: #fff;
    font-size: .14rem;
    white-space:nowrap;
    overflow: hidden;
    width: 100vw;
  }

  .HSlide ul {
    height: 100%;
  }

  .HSlide li {
    height: 100%;
    display:inline-block;
    padding: 0 0.1rem;
    padding-bottom: 0.3rem;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    text-align:center;
    .gameName{
      width: 100%;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    div:nth-child(1) {
      width: 100%;
      height:100%;
      margin-bottom:.1rem;
      img {
        border-radius:0.1rem;
        width: 100%;
        height:100%;
        display: block;
        margin-bottom: 0.15rem;
      }
    }
  }

</style>
