<template>
    <div id="topUp">
      <cjTitle :title="title"></cjTitle>
      <div class="topUpContext">
        <ul class="topUpContext-title borderBottom-1px">
          <li @click="_touchTitle(0)" :class="{'sele':titleStatus[0]===1}">充值明细</li>
          <li @click="_touchTitle(1)" :class="{'sele':titleStatus[1]===1}">消费记录</li>
        </ul>
        <div class="swiper-container-topUp">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <ul class="topUpContext-recharge">
                <li v-for="item in rechargeList.list" class="borderBottom-1px">
                  <h3>{{item.NAME}}</h3>
                  <span class="rechargeTime">{{item.RECORDTIME}}</span>
                  <i>+{{item.APPLYAMOUNT}}</i>
                </li>
              </ul>
            </div>
            <div class="swiper-slide">
              <ul class="topUpContext-expenses">
                <li class="borderBottom-1px">
                  <!--<h3>{{item.NAME}}</h3>-->
                  <!--<span class="rechargeTime">{{item.RECORDTIME}}</span>-->
                  <!--<i>+{{item.APPLYAMOUNT}}</i>-->
                  11111111111111111111111111111111
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import cjTitle from '../cjTitle/cjTitle.vue';

 export default {
  data(){
    return {
      title:'充值明细',
      rechargeList:'',//充值明细
      expensesList:'',//消费记录
      titleStatus:[1,0],//存储标题状态，1是选中，0是未选中
    }
  },
   created(){
     this.$http.post('/api/user/getAccountDetail',{country:0,pageNo:1,pageSize:10,type:1},{emulateJSON:true}).then(function (res) {
       res = res.body;
       if(res.result==0){
         console.log(res.page);
         this.rechargeList = res.page;
         this._topUpSwiper();
       }
     });
     this.$http.post('/api/user/getAccountDetail',{country:0,pageNo:1,pageSize:10,type:2},{emulateJSON:true}).then(function (res) {
       res = res.body;
       if(res.result==0){
//         console.log(res.page);
//         this.expensesList = res.list;
         this._topUpSwiper();
       }
     });
   },
   methods:{
     _touchTitle(index){
      if(index===0){
        this.titleStatus.splice(index,1,1);
        this.titleStatus.splice(1,1,0);
        this.topUpSwiper.slideTo(index, 200, false);
      }else if(index===1){
        this.titleStatus.splice(0,1,0);
        this.titleStatus.splice(index,1,1);
        this.topUpSwiper.slideTo(index, 200, false);
      }
     },
     _topUpSwiper(){
       if(!this.topUpSwiper){
         let _this = this;
         this.$nextTick(function () {
           this.topUpSwiper = new Swiper ('.swiper-container-topUp11', {
             onSlideChangeStart: function(swiper){
               console.log(swiper.activeIndex);
               _this._touchTitle(swiper.activeIndex);
             }
           });
         })
       }
     }
   },
  components:{
    cjTitle
  }
 }
</script>

<style lang="less" rel="stylesheet/less">
  #topUp {
    width: 100%;
    overflow: hidden;
  }
  #topUp .topUpContext-title {
    height: 0.5rem;
    display: block;
    display: flex;
    li {
      height: 0.5rem;
      line-height:0.5rem;
      display: block;
      flex:1;
      font-size: 0.17rem;
      text-align: center;
      color: #5b5b5b;
    }
    li.sele {
      border-bottom:1px solid #e7384a;
      color: #e7384a;
    }
  }
  #topUp .swiper-container-topUp li {
    height:0.6rem;
    line-height: 0.2rem;
  }
</style>
