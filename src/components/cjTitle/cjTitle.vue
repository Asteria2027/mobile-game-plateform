<template>
    <div id="cjTitle">
      <div class="title">
        <span @click="backUrl(backurl)" class="icon-back iconBack"></span>
        <span class="name">{{title}}</span>
        <span class="zw"></span>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:{
      title:{

      },
      backurl:{

      }
    },
    methods:{
      backUrl(url){
        if(sessionStorage.getItem("fixed")){//乐盈电竞购买回调
          window.location.href=sessionStorage.getItem("fixed");
        }else if(url){
          this.$router.push({path:'/'+url});
        }else {
          window.history.back();
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #cjTitle .title {
    position: fixed;
    top: 0;
    left:0;
    z-index: 999;
    height: 0.45rem;
    line-height: 0.45rem;
    width: 100%;
    text-align: center;
    background: #e7384a;
    font-size: 0.2rem;
    color: #fff;
    display: block;
    display: flex;
    .iconBack {
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
    .zw{
      display: inline-block;
      height: 0.45rem;
      width: 0.45rem;
    }
  }
</style>
