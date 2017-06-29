<template>
    <div class="smallTitle borderBottom-1px" ref="smallTitle">
      <i class="titleIcon" :class="{'jptjGame':title=='热门游戏','IconHotGame':title=='精品推荐'}"></i>
      {{title}}
  	 <span>
       <router-link to="/list/1" v-if="number==1">更多<i class="icon-yjt"></i></router-link>
       <router-link to="/list/2"  v-if="number==2">更多<i class="icon-yjt"></i></router-link>
     </span>

    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      title:{
        type:String,
        default(){
          return '标题党';
        }
      },
      number:{
          type:Number
      }
    },
    created(){
//      if(this.title==="热门游戏"){
//
//      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../../assets/common/css/index.css";

  .smallTitle {
    padding:0 .17rem;
    width: 100%;
    height: .4rem;
    font-size:0.15rem;
    line-height: .4rem;
    font-family: helvetica;
    span {
      display: block;
      position: absolute;
      right:0.4rem;
      color: #666;
      vertival-aglign:top;
      a {
        font-size: 0.15rem;
      }
      i{
        vertival-aglign:top;
        opacity: 0.5;
        }
    }
  }
  .smallTitle i.titleIcon {
    height:100%;
    float: left;
    width: 0.2rem;
    margin-right: 0.07rem;
    /*background: url("./games9.png") no-repeat 0 0.1rem;*/
    /*background-size:90%;*/
  }
  .IconHotGame {
    background: url("./games9.png") no-repeat 0 0.1rem;
    background-size:90%;
  }
  .jptjGame {
    background: url("./index04.png") no-repeat 0 0.1rem;
    background-size:93%;
  }

</style>
