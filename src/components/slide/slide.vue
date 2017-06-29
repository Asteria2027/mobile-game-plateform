<template>
    <div>
      <div class="swiper-container">
        <ul class="swiper-wrapper">
            <li class="swiper-slide slideName" v-for="(item,index) in sImage.list" v-if="index<5" :data-url="item.jumpUrl">
             <img :src="item['pictureUrl'?'pictureUrl':'imageUrl']">
            </li>
        </ul>
        <div class="swiper-pagination" id="indexPagination"></div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props:{
        sImage: {}
      },
      watch:{
        'sImage'(){
          this.$nextTick(function () {
          this.SwiperStart();
          });
        }
      },
      created() {

      },
      methods:{
        SwiperStart(){
          let mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable :true,
            autoplay: 4000
          });
          this.$nextTick(function () {
            $('.slideName').on('click',function(){
              let url = $(this).attr('data-url');
              if(url!='http://m.game.13322.com/index'){
                window.location.href = url;
              }
            });
          });
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .swiper-container {
    width: 100%;
    height: 1.8rem;
    position: relative;
    overflow: hidden;
    ul {
      height: 100%;
      li {
        width: 100%;
        height: 100%;
        float: left;
          img {
            display: block;
            display: inline-block;
            height:100%;
            width:100%;
          }
      }
    }
    #indexPagination>span.swiper-pagination-bullet {
      display: block;
      display: inline-block;
      width: 0.12rem;
      height: 0.12rem;
      background: #FFFFFF;
      opacity: 0.3;
    }
    #indexPagination>span.swiper-pagination-bullet-active {
      display: block;
      display: inline-block;
      opacity: 1;
      background: #fff;
    }
  }
</style>
