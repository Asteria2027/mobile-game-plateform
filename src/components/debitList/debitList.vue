<template>
<div class="debitList">
  <div class="title">
    <span class="back icon-back" @click="back"></span>
    <span class="name">{{name}}</span>
    <span class="zw"></span>
  </div>
  <ul class="debitListContext">
    <li v-if="listlyb" class="listLyb" @click="List(1,'乐盈币')">
      <span class="listLyb-name">乐盈币(中心钱包)</span>
      <span class="listLyb-balance">
					<span>余额</span>
					<span>{{userInfo.lyb}}</span>
				</span>
    </li>
    <li v-for="item in debitList" @click="List(item.id,item.name)">{{item.name}}</li>
  </ul>
</div>
</template>

<script>
  import { mapState } from 'vuex';
  export default{
    data(){
      return {
        name:"",
        listlyb:false,
        debitList:""
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('debitList')!=-1){
          this.reload()
        }
      }
    },
    created(){
      this.reload()
    },
    methods:{
      reload(){
          if(this.$route.params.id==1){
              this.name="选择划出应用";
              this.listlyb=true;
            }else{
            this.name="选择划入应用";
            this.listlyb=false;
          }
          this.$http.post('/api/gameGoldsTransfer/getGameList',{country:0,terminal:4,drawType:this.$route.params.id},{emulateJSON:true}).then(function(res) {
                  this.debitList=res.body.data;
          })
      },
      back(){
        this.$router.push({path:'/debit'});
      },
      List(id,name){

          if(this.$route.params.id==1){
            if (sessionStorage.getItem("toId")&&sessionStorage.getItem("toId")==id) {
              sessionStorage.removeItem("toId")
            }
            sessionStorage.setItem("DformID",id);
            sessionStorage.setItem("DformName",name)
          }else{
            if (sessionStorage.getItem("DformID")&&sessionStorage.getItem("DformID")==id) {
              sessionStorage.removeItem("DformID")
            }
            sessionStorage.setItem("toId",id);
            sessionStorage.setItem("toName",name)
          }
        this.$router.push({path:'/debit'});
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }

</script>

<style  lang="less" rel="stylesheet/less">
.debitList{
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
  .debitListContext{
    position: absolute;
    top: 0.45rem;
    left: 0;
    z-index: 11;
    width: 100%;

  }
  .debitListContext  li {
    padding:0 0.15rem;
    font-size: 0.18rem;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #1c1c1c;
    border-bottom: 1px solid #f5f5f5;
  }
  .debitListContext  li:hover {
    background-color: #f5f5f5;
  }
  .listlyb{
    overflow: hidden;
  }
  .listLyb-name{
    display: inline-block;
    float: left;
  }
  .listLyb-balance{
    float: right;
    text-align: center;
    display: block;
    display: flex;
    flex-direction: column;
    height: 0.5rem;
    line-height: 0.5rem;
  }
  .listLyb-balance>span:nth-child(1){
    display: block;
    color: #B4B4B4;
    display: inline-block;
    height: 0.25rem;
    line-height: 0.25rem;
    font-size: 0.16rem;
  }
  .listLyb-balance>span:nth-child(2){
    display: block;
    color: #E7384A;
    display: inline-block;
    height: 0.25rem;
    line-height: 0.25rem;
    font-size: 0.16rem;
  }
}
</style>
