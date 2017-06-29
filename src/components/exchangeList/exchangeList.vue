<template>
<div class="exchangeList">
  <div class="title">
    <span class="back icon-back" @click="back"></span>
    <span class="name">选择兑换游戏</span>
    <span class="zw"></span>
  </div>
  <ul class="exchangeList-content" v-if="platform">
    <li v-for="item in exchangeList" @click="_exchange(item.id,item.name)">{{item.name}}</li>
  </ul>
  <ul class="exchangeList-content" v-else>
    <li v-for="item in exchangeList" @click="_exchange(item.id,item.name)" v-if="item.id==platformId">{{item.name}}</li>
  </ul>
</div>
</template>

<script>
  export default{
    data(){
      return {
        exchangeList:'',
        platform:true,
        platformId:''
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('exchangeList')!=-1){
          this._exchangeList()
        }
      }
    },
    created(){
      this._exchangeList()
      this.$nextTick(()=>{
        if(sessionStorage.getItem("platformId")){
          this.platform=false;
          this.platformId=sessionStorage.getItem("platformId");
        }
      })
    },
    methods:{
      _exchangeList(){
        this.$http.post('/api/gameGoldsTransfer/getGameList',{country:0,terminal:4,drawType:3},{emulateJSON:true}).then(function(res) {
          this.exchangeList=res.body.data;
        })
      },
      _exchange(id,value){
        sessionStorage.setItem("exchangeId",id)
        sessionStorage.setItem("exchangename",value)
        this.$router.push({path:'/exchange'});
      },
      back(){
        this.$router.push({path:'/exchange'});
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
.exchangeList{
  position: absolute;
  top:0rem;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 20;
  background-color: #fff;
  .title{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    height:0.45rem ;
    width: 100%;
    line-height: 0.45rem;
    text-align: center;
    color: #fff;
    background-color: #e7374b;
    display: block;
    display: flex;
    .back{
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
  .exchangeList-content{
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0.45rem;
    width: 100%;
    overflow: auto;
    li{
      font-size: 0.16rem;
      color: #1c1c1c;
      height: 0.5rem;
      line-height: 0.5rem;
      background-color: #fff;
      padding: 0 0.1rem;
      border-bottom: 1px solid #F5F5F5;
      display: block;
      display: flex;
    }
    .debitListContext  li:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
