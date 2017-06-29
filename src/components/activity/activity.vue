<template>
    <div id="activity">
      <cjTitle :title="title"></cjTitle>
      <div class="activity-context">
        <ul>
          <li v-for="item in activityDate" @click="_goUrl(item.redirectUrl)" v-if="time<=item.endDate">
            <div><img :src="item.imageUrl" ></div>
            <div class="des">
              <span>{{item.title}}</span>
              <span>{{item.updateTime}}</span>
            </div>
            <div class="underway"></div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">

  import cjTitle from '../cjTitle/cjTitle.vue';

  export default {
    data(){
      return {
        title:'活动中心',
        activityDate:'',
        time:''
      }
    },
    created(){
      this.$http.post('/api/pageActivity/getIndexActivityByModelId',{country:0,terminal:4,modelId:9},{emulateJSON:true}).then(function(res){
        res = res.body;
        if(res.result==0){
          this.activityDate = res.data.list;
          this.time=res.systemTime;
        }
      })
    },
    methods:{
      _goUrl(url){
        window.location.href = url;
      }
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      }
    },
    components:{
      cjTitle
    }
  }
</script>

<style lang="less" rel="stylesheet">
  #activity {
    width: 100%;
    overflow: hidden;
  }
  #activity .activity-context {
    padding:0.05rem;
    margin-top: 0.45rem;
  }
  #activity ul li{
    position: relative;
    border: 1px solid #d1d3d6;
    padding:0.05rem;
    height:1.8rem;
    margin-bottom: 0.1rem;
    border-radius: 0.05rem;

    div:nth-child(1){
      height: 85%;
      width: 100%;
      img {
        display: block;
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .des {
      font-size:0.15rem;
      line-height:0.3rem;
      span:nth-child(1){
        display: block;
        float: left;
        width: 60%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size:0.12rem;
      }
      span:nth-child(2){
        float: left;
        text-align: right;
        display: block;
        width: 40%;
        font-size:0.12rem;
      }
    }
    .underway {
      width: 0.3rem;
      height: 0.3rem;
      background: #000;
      position: absolute;
      top:0.03rem;
      left:0.03rem;
      background: url("./activity01.png") no-repeat center ;
      background-size: 100% 100%;
    }
  }
</style>
