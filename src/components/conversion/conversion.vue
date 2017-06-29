<template>
    <div id="conversion">
      <cjTitle :title="title"></cjTitle>
      <ul class="conversionCon">
        <li v-for="(item,index) in listData" class="borderBottom-1px">
          <div class="c-pic"><img :src="item.picUrl"></div>
          <div class="c-context">
            <p class="c-name">{{item.goodsName}}</p>
            <p><span class="c-count">数量：{{item.count}}</span>&nbsp;&nbsp;<span class="c-integral">{{item.exchangePrice}}元</span></p>
            <p class="c-time">{{item.createTime|setTime}}</p>
          </div>
        </li>
        <div class="loadPrompts" v-if="loadSuccess">已全部加载完毕</div>
      </ul>
      <div class="m-showconver" v-show="showconver">
            <dl>
              <dt></dt>
              <dd>亲，您暂时没有购买记录哦~</dd>
            </dl>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import cjTitle from '../cjTitle/cjTitle.vue';

  export default {
    data(){
      return {
        title:'购买记录',
        listData:'',
        currentPage:1,
        pageSize:10,
        isJieliu:true,
        loadSuccess:false,
        showconver:false
      }
    },
    components:{
      cjTitle
    },
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf('conversion')!=-1){
          this.currentPage = 1;
          this.isJieliu=true;
          this.loadSuccess=false;
          this.listData='';
          this._getData();
        }
      }
    },
    created(){
      this._getData();
      this._loadMore();
    },
    methods:{
      _getData(){
        this.$http.post('/api/pointShopGoods/queryExchangedGoods',{country:0,userId:this.$store.state.userInfo.userId,pageSize:this.pageSize,pageNo:this.currentPage},{emulateJSON:true}).then(function (res) {
          res = res.body;
          if(res.data.totalRows==0){
            this.showconver = true;
          }else{
            this.showconver = false;
            if (res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(this.pageSize))>=this.currentPage){
              if(this.listData&&this.currentPage>=1){
                this.listData = this.listData.concat(res.data.list);
              }else{
                this.listData = res.data.list;
              }
              this.isJieliu = true;
            }else if(res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(this.pageSize))<this.currentPage&&this.listData!=''){
              this.loadSuccess=true;
              this.isJieliu = false;
            }
          }

        });
      },
      _loadMore(){
        let _this = this;
        $(window).scroll(function(){
          if(($(this).scrollTop()>=$('.conversionCon').height()-$(window).height())&&_this.isJieliu){
            _this.isJieliu = false;
              _this.currentPage++;
              _this._getData();
            _this._loadMore();
          }
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #conversion {
    width: 100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
  }
  #conversion ul {
    margin-top: 0.45rem;
  }
  #conversion ul li {
    height: 1.1rem;
    width: 100%;
    overflow: hidden;
    display: block;
    display: flex;
  }
  #conversion .c-pic {
    display: block;
    flex:0 0 0.9rem;
    margin:0.1rem;
    height:0.9rem;
    img {
      display: block;
      height:0.9rem;
      width: 0.9rem;
      display: inline-block;
    }
  }
  #conversion .c-context {
    display: block;
    flex:2;
    margin:0.1rem 0.1rem 0.1rem 0.05rem;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow:hidden;
    p {
      font-weight: 400;
      font-family: helvetica;
      padding:0.01rem 0;
    }
  }
  #conversion .c-name {
    font-size: 0.18rem;
    margin: 0.05rem 0;
    color: #1c1c1c;
  }
  #conversion .c-count{
    color: #e7384a;
    font-size: 0.14rem;
  }
  #conversion .c-integral{
    color: #ffb212;
    font-size: 0.14rem;
  }
  #conversion .c-time{
    margin-top: 0.05rem;
    color: #b4b4b4;
    font-size: 0.14rem;
  }
  #conversion .loadPrompts {
    line-height:0.3rem;
    text-align: center;
    font-size: 0.14rem;
    color: #B4B4B4;
  }
  .m-showconver{
    width:100%;
    background: #f5f5f5;
    position: absolute;
    top:0.45rem;
    bottom: 0;
    left: 0;
    z-index: 99;
  }
  .m-showconver>dl{
    width:100%;
  }
  .m-showconver>dl>dt{
    text-align: center;
    width:1.24rem;
    height: 1.29rem;
    background:url("dhimg.png") no-repeat center;
    background-size: 100% 100%;
    margin:0 auto;
    margin-top:1rem;
  }
  .m-showconver>dl>dd{
    text-align: center;
    font-size:0.18rem;
    color: #b4b4b4;
    padding-top:0.2rem;
  }
</style>
