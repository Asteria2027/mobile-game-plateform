<template>
  <div class="downUrl">
    <div class="swiper-container00">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-slide1">
            <div class="downUrlBtn" v-show="isoDown" ><a href="https://www.pgyer.com/iOS_playGame">立即下载</a></div>
            <div class="downUrlBtn" v-show="andDown" @click="downOk"><a href="http://public.13322.com/lyhy_1.1.0_20170524_android_D00292.apk">立即下载</a></div>
            <div class="jiantou"></div>
            <div class="downUrlYun"></div>
        </div>
        <div class="swiper-slide swiper-slide2">
          <div class="downUrlBtn" v-show="isoDown" ><a href="https://www.pgyer.com/iOS_playGame">立即下载</a></div>
          <div class="downUrlBtn" v-show="andDown" @click="downOk"><a href="http://public.13322.com/lyhy_1.1.0_20170524_android_D00292.apk">立即下载</a></div>
          <div class="jiantou"></div>
          <div class="downUrlYun"></div>
        </div>
        <div class="swiper-slide swiper-slide3">
          <div class="downUrlBtn" v-show="isoDown" ><a href="https://www.pgyer.com/iOS_playGame">立即下载</a></div>
          <div class="downUrlBtn" v-show="andDown" @click="downOk"><a href="http://public.13322.com/lyhy_1.1.0_20170524_android_D00292.apk">立即下载</a></div>
          <div class="jiantou"></div>
          <div class="downUrlYun"></div>
        </div>
        <div class="swiper-slide swiper-slide4">
          <div class="downUrlBtn" v-show="isoDown"><a href="https://www.pgyer.com/iOS_playGame">立即下载</a></div>
          <div class="downUrlBtn" v-show="andDown" @click="downOk"><a href="http://public.13322.com/lyhy_1.1.0_20170524_android_D00292.apk">立即下载</a></div>
          <div class="jiantou2"></div>
          <div class="downUrlYun"></div>
        </div>
      </div>

    </div>
    <div class="m-downUrl" v-show="downImg" @click="downImg=!downImg">
        <div class="downImg">
        </div>
    </div>
  </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default{
        data() {
            return{
              isoDown:true,
              andDown:false,
              downImg:false
            }
        },
      created() {
        this.$nextTick(function () {
          this.downUrl();
        });
      },
      mounted (){
        var mySwiper00 = new Swiper ('.swiper-container00', {
          direction: 'vertical',
        })
      },
      methods:{
          downUrl(){
            if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
              this.isoDown = true;
              this.andDown = false;
            }else if(/(Android)/i.test(navigator.userAgent)){
              this.isoDown = false;
              this.andDown = true;
            }
          },
        downOk() {
          let ua = window.navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            this.downImg = true;
            return false
          }else{
            this.downImg = false;
            return false
          }
        }

      },
      computed:{
        ...mapState(['userInfo','isLogin'])
      }
    }
</script>
<style scoped>
  .swiper-container00 {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
  }
  .swiper-slide1{
    width:100%;
    height:100%;
    background: url("1.jpg") no-repeat center;
    background-size: 100% 100%;
  }
  .downUrlBtn{
    width:2rem;
    height:0.5rem;
    background: #e73849;
    position: absolute;
    bottom: 1.2rem;
    left:50%;
    margin-left:-1rem;
    border-radius: 0.25rem;
  }
  .downUrlBtn>a{
    display: block;
    text-align: center;
    line-height: 0.5rem;
    color: #fff;
    font-size:0.16rem;
  }


  .jiantou{
    width:0.25rem;
    height: 0.2rem;
    position: absolute;
    bottom: 0.8rem;
    left:50%;
    margin-left:-0.1rem;
    background: url("downjt.png") no-repeat center;
    background-size:100% 100%;
    animation:myfirst 0.7s infinite;
  }
  @keyframes myfirst
  {
    from {bottom:0.8rem}
    to {bottom:0.85rem;}
  }
  .downUrlYun{
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    height:0.6rem;
    background: url("di.png") no-repeat center;
    background-size:100% 100%;
  }
  .swiper-slide2{
    width:100%;
    height:100%;
    background: url("2.jpg") no-repeat center;
    background-size: 100% 100%;
  }
  .swiper-slide3{
    width:100%;
    height:100%;
    background: url("3.jpg") no-repeat center;
    background-size: 100% 100%;
  }
  .swiper-slide4{
    width:100%;
    height:100%;
    background: url("4.jpg") no-repeat center;
    background-size: 100% 100%;
  }
  .jiantou2{
    width:0.25rem;
    height: 0.2rem;
    position: absolute;
    bottom: 0.8rem;
    left:50%;
    margin-left:-0.1rem;
    background: url("upjt.png") no-repeat center;
    background-size:100% 100%;
    animation:myfirst2 0.7s infinite;
  }
  @keyframes myfirst2
  {
    from {bottom:0.75rem}
    to {bottom:0.8rem;}
  }
  .m-downUrl{
    width:100%;
    height:100%;
    position: fixed;
    background: rgba(0,0,0,0.5);
    z-index: 9;
  }
  .downImg{
    width:100%;
    height:3.5rem;
    position: absolute;
    top:0;
    left:0;
    background: url("21.png") no-repeat center;
    background-size:100% 100%;
  }
</style>
