<template>
    <span class="star">
      <i class="icon-classify02" v-for="item in number"></i>
    </span>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        number:''
      }
    },
    props:{
      gameType:{
        type:Number
      },
      score:{
        type:Number
      }
    },
    created(){
//      console.log(this.gameType)
      if(this.gameType===8022){
        this.number = 5;
//        1精品2热门
      }else if(this.gameType===1||this.gameType===2){
        this.number = 3;
        if(this.score&&this.score>2000){
          this.scoreNumber();
        }
      }else {
          this.scoreNumber();
      };

    },
    methods:{
      scoreNumber(){
        if(this.score<100){
          this.number = 0;return;
        }else if(this.score<=500){
          this.number = 1;return;
        }else if(this.score<=2000){
          this.number = 2;return;
        }else if(this.score<=5000){
          this.number = 3;return;
        }else if(this.score<=50000){
          this.number = 4;return;
        }else {
          this.number = 5;return;
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .star {
    height: .2rem;
    display: inline-block;
    line-height:.2rem;
    font-size: .14rem;
    color: gold;
  }
</style>
