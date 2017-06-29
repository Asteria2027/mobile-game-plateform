<template>
  <div class="carMore">
    <div class="title">
      <span class="back icon-back" @click="back"></span>
      <span class="name">{{title}}</span>
      <span class="zw"></span>
    </div>
    <div class="carMore-comtent" ref="carMoreWrapper">
      <ul class="car-list">
        <li v-for="(item,index) in carMore" v-if="needId==item.needScoreId" :data-id="index">
          <dl>
            <dt>
              <img :src="item.picUrl">
            </dt>
            <dd>
              <p>{{item.name}}</p>
              <p class="borderBottom-1px">
                <!--<span>市场价:{{item.price}}元</span>-->
                <span>{{item.needScore}}元</span>
                <span>
                <b>市场价:{{item.price}}元</b>
                </span>
              </p>
              <p>
                <!--<span @click="_collectNone(true,item.id,item.picUrl,item.name,item.needScore,item.price,currency[item.needScoreId])">收藏</span>-->
                <span class="colls" @click="_collectNone(true,item.id,item.picUrl,item.name,item.needScore,item.price,currency[item.needScoreId],index,1)" v-if="!item.userId">收藏</span>
                <span class="colseSc"  @click="cellDel(item.id,index)" v-if="item.userId">取消收藏</span>
                <span @click.stop="__exchangeNone(true,item.id,item.picUrl,item.name,item.needScore,item.price,currency[item.needScoreId],item.type,item.needScoreId,item.total)">购买</span>
              </p>
            </dd>
          </dl>
        </li>
        <div class="loadPrompts" v-if="loadSuccess">已全部加载完毕</div>
      </ul>
    </div>
    <div class="carAlert" v-if="carAlert">{{carAlertConent}}</div>
    <div class="collectionOfShade" v-if="collectionOfShade" @click="_collectNone(false)"></div>
    <div class="exchangeOfShade" v-if="exchangeOfShade" @click="__exchangeNone(false)"></div>
    <div class="collectEvoke" v-if="collectEvoke" >
      <div class="collectEvoke-content">
        <span class="collectEvoke-content-icon"><img :src="collectSrc"></span>
        <span class="collectEvoke-content-title">
            <span class="collectEvoke-name">{{collectTitle}}</span>
            <span class="collectEvoke-need">
              <span>{{collectneeds}}元</span>
              <span><span>市场价{{collectprice}}</span></span>
              <!--<span>市场价:{{collectprice}}元</span>-->
            </span>
            <span>库存充足</span>
          </span>
      </div>
      <div class="collectEvoke-buttom" @click="_collect(false)">{{enshrinesh}}</div>
    </div>
    <div class="showexchange" v-if="exchangeEvoke">
      <div class="exchange-content">
        <div class="exchange-top">
          <span class="exchange-icon"><img :src="collectSrc"></span>
          <span class="exchange-title">
                <span class="exchange-name">{{collectTitle}}</span>
                <span class="exchange-need">
                  <span>{{collectneeds}}元</span>
                  <span><span>市场价{{collectprice}}</span></span>
                  <!--<span>市场价:{{collectprice}}元</span>-->
                </span>
                <span>库存充足</span>
              </span>
        </div>
        <!--<div class="exchange-num">-->
        <!--<h4>数量选择</h4>-->
        <!--<span class="reduce" @click="num&#45;&#45;" v-if="num>=2">-</span>-->
        <!--<span class="reduce" v-if="num<2">-</span>-->
        <!--<span>{{num}}</span>-->
        <!--<span class="add" @click="num++">+</span>-->
        <!--</div>-->
      </div>
      <div class="exchange-buttom" @click="_exchange">购买</div>
    </div>
    <!--//兑换失败-->
    <div class="exchangeFail" v-if="exchangeFail">
      <div class="fail-content">
        <div class="fail-title">
          <span class="fail-icon"></span>
          <span class="fail-sorry">对不起</span>
        </div>
        <div class="fail-notic">
          <div class="faile-name">{{currency[needScoreId]}}不足</div>
          <div class="faile-buttom" @click="_exchangeFail()">确定</div>
        </div>
      </div>
    </div>

    <div class="m-abolish" v-show="showAbolish">
      取消收藏成功
    </div>
    <!--//兑换成功-->

    <div class="exchangeSuccess" v-if="exchangeSuccess">
      <div class="success-content">
        <div class="success-title">
          <span class="success-icon"></span>
          <span class="success-sorry">恭喜您</span>
        </div>
        <div class="success-notic">
          <div class="success">兑换成功</div>
          <div class="success-name">{{collectTitle}}</div>
          <div class="success-buttom" @click="_exchangeSuccess()">确定</div>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import Bscroll from "better-scroll";
  export default{
    data(){
      return{
        carMore:[],
        title:'',
        needId:'',
        collectEvoke:false,
        collectionOfShade:false,
        exchangeOfShade:false,
        exchangeEvoke:false,
        collectId:'',
        collectSrc:'',//收藏记录资料
        collectTitle:'',
        collectneeds:'',
        collectprice:'',
        collectCurren:'',
        carAlert:false,
        carAlertConent:'',
        num:1,
        exchangeType:"",
        needScoreId:'',
        exchangeFail:false,
        exchangeSuccess:false,
        enshrinesh:"收藏",
        key:-1,
        fictitionStatus:[],
        showAbolish:false,
        arrnum:1,
        carMoreWrapper:"",
        isJieliu:true,
        currentPagetab1:1,
        loadSuccess:false
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('carMore')!=-1){
          this.isJieliu=true;
          this.loadSuccess=false;
          this.carMore=[];
          this.currentPagetab1=1;
          this._MoreList();
          this.$nextTick(()=>{
            this._initScroll()
          })
        }
      }
    },
    created(){
      if(!this.$store.state.userInfo.userId) {
        this.$store.state.userInfo.userId = sessionStorage.getItem('13322userId');
      }
      this.currency=[' ',' ','乐盈券','积分'];
      this._MoreList()
      this.$nextTick(()=>{
        this.loadMore();
      })
    },
    methods:{
      _initScroll(){
//         this.carMoreWrapper =new Bscroll(this.$refs.carMoreWrapper,{
//           probeType:3,
//           click:true
//         });
      },
      _MoreList(){
        if(this.$route.params.id==11||this.$route.params.id==21){
          this._Morehttp(1);
          this.title='手办周边';
          if(this.$route.params.id==11){
            this.needId=3
          }else{
            this.needId=2
          }
        }else{
          this._Morehttp();
          this.title='虚拟物品'
          if(this.$route.params.id==12){
            this.needId=3
          }else{
            this.needId=2
          }
        }
      },
      _Morehttp(value){
        if(this.$store.state.userInfo.userId){
          if(value){
            this.$http.post("/api/pointShopGoods/getAllGoods",{country:0,platform:4,enable:0,pageSize:8,type:value,userId: this.$store.state.userInfo.userId,pageNo:this.currentPagetab1},{emulateJSON:true}).then((res) => {
              res = res.body;
            if (res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))>=this.currentPagetab1){
              if(this.carMore&&this.currentPagetab1>=1){
                for(let i =0 ;i<res.data.list.length;i++) {
                  this.carMore.push(res.data.list[i]);
                }
//                      if(this.carMore.length<8){
//                        this.currentPagetab1++
//                        this._MoreList()
//                      }
              }else{
                for(let i =0 ;i<res.data.list.length;i++) {
                  this.carMore.push(res.data.list[i]);
                }
                if(this.carMore.length<8){
                  this.currentPagetab1++;
                  this._MoreList()
                }
              }
              this.isJieliu = true;
            }else if(res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))<this.currentPagetab1&&this.carMore!=''){
              this.loadSuccess=true;
              this.isJieliu = false;
            }
            this.$nextTick(()=>{
              this._initScroll()
          })
          })
          }else{
            this.$http.post("/api/pointShopGoods/getAllGoods",{country:0,platform:4,enable:0,pageSize:8,userId: this.$store.state.userInfo.userId,pageNo:this.currentPagetab1},{emulateJSON:true}).then((res) => {
              res = res.body;
            if (res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))>=this.currentPagetab1){
              if(this.carMore&&this.currentPagetab1>=1){
                for(let i =0 ;i<res.data.list.length;i++) {
                  if (res.data.list[i].type != 1) {
                    this.carMore.push(res.data.list[i]);
                  }
                }
                if(this.carMore.length<8){
                  this.currentPagetab1++
                  this._MoreList()
                }
              }else{
                for(let i =0 ;i<res.goods.length;i++) {
                  if (res.data.list[i].type != 1) {
                    this.carMore.push(res.data.list[i]);
                  }
                }
                if(this.carMore.length<8){
                  this.currentPagetab1++
                  this._MoreList()
                }
              }
              this.isJieliu = true;
            }else if(res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))<this.currentPagetab1&&this.carMore!=''){
              this.loadSuccess=true;
              this.isJieliu = false;
            }
            this.$nextTick(()=>{
              this._initScroll()
          })
          })
          }
        }else{

          this.$http.post("/api/user/getUserInfo",{country:0,terminal:4},{emulateJSON:true}).then((response) => {
            response=response.body;
          if(response.result==0){
            if(value){
              this.$http.post("/api/pointShopGoods/getAllGoods",{country:0,platform:4,enable:0,pageSize:8,type:value,userId: response.user.userId,pageNo:this.currentPagetab1},{emulateJSON:true}).then((res) => {
                res = res.body;
              if (res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))>=this.currentPagetab1){
                if(this.carMore&&this.currentPagetab1>=1){
                  for(let i =0 ;i<res.data.list.length;i++) {
                    this.carMore.push(res.data.list[i]);
                  }
                  if(this.carMore.length<8){
                    this.currentPagetab1++
                    this._MoreList()
                  }
                }else{
                  for(let i =0 ;i<res.data.list.length;i++) {
                    this.carMore.push(res.data.list[i]);
                  }
                  if(this.carMore.length<8){
                    this.currentPagetab1++
                    this._MoreList()
                  }
                }
                this.isJieliu = true;
              }else if(res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))<this.currentPagetab1&&this.carMore!=''){
                this.loadSuccess=true;
                this.isJieliu = false;
              }
              this.$nextTick(()=>{
                this._initScroll()
            })
            })
            }else{
              this.$http.post("/api/pointShopGoods/getAllGoods",{country:0,platform:4,enable:0,pageSize:8,userId:response.user.userId,pageNo:this.currentPagetab1},{emulateJSON:true}).then((res) => {
                res = res.body;

              if (res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))>=this.currentPagetab1){
                if(this.carMore&&this.currentPagetab1>=1){
                  for(let i =0 ;i<res.data.list.length;i++) {
                    if (res.data.list[i].type != 1) {
                      this.carMore.push(res.data.list[i]);
                    }
                  }
                  if(this.carMore.length<8){
                    this.currentPagetab1++
                    this._MoreList()
                  }
                }else{
                  for(let i =0 ;i<res.data.list.length;i++) {
                    if (res.data.list[i].type != 1) {
                      this.carMore.push(res.data.list[i]);
                    }
                  }
                  if(this.carMore.length<8){
                    this.currentPagetab1++
                    this._MoreList()
                  }
                }
                this.isJieliu = true;
              }else if(res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))<this.currentPagetab1&&this.carMore!=''){
                this.loadSuccess=true;
                this.isJieliu = false;
              }
              this.$nextTick(()=>{
                this._initScroll()
            })
            })
            }
          }else{
            if(value){
              this.$http.post("/api/pointShopGoods/getAllGoods",{country:0,platform:4,enable:0,pageSize:8,type:value,pageNo:this.currentPagetab1},{emulateJSON:true}).then((res) => {
                res = res.body;
              if (res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))>=this.currentPagetab1){
                if(this.carMore&&this.currentPagetab1>=1){
                  for(let i =0 ;i<res.data.list.length;i++) {
                    this.carMore.push(res.data.list[i]);
                  }
                  if(this.carMore.length<8){
                    this.currentPagetab1++
                    this._MoreList()
                  }
                }else{

                  for(let i =0 ;i<res.data.list.length;i++) {
                    this.carMore.push(res.data.list[i]);
                  }
                  if(this.carMore.length<8){
                    this.currentPagetab1++
                    this._MoreList()
                  }
                }
                this.isJieliu = true;
              }else if(res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))<this.currentPagetab1&&this.carMore!=''){
                this.loadSuccess=true;
                this.isJieliu = false;
              }
              this.$nextTick(()=>{
                this._initScroll()
            })
            })
            }else{
              this.$http.post("/api/pointShopGoods/getAllGoods",{country:0,platform:4,enable:0,pageSize:8,pageNo:this.currentPagetab1},{emulateJSON:true}).then((res) => {
                res = res.body;

              if (res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))>=this.currentPagetab1){
                if(this.carMore&&this.currentPagetab1>=1){
                  for(let i =0 ;i<res.data.list.length;i++) {
                    if (res.data.list[i].type != 1) {
                      this.carMore.push(res.data.list[i]);
                    }
                  }
                  if(this.carMore.length<8){
                    this.currentPagetab1++
                    this._MoreList()
                  }
                }else{

                  for(let i =0 ;i<res.goods.length;i++) {
                    if (res.data.list[i].type != 1) {
                      this.carMore.push(res.data.list[i]);
                    }
                  }
                  if(this.carMore.length<8){
                    this.currentPagetab1++
                    this._MoreList()
                  }
                }
                this.isJieliu = true;
              }else if(res.result===0&&Math.ceil(Number(res.data.totalRows)/Number(8))<this.currentPagetab1&&this.carMore!=''){
                this.loadSuccess=true;
                this.isJieliu = false;
              }
              this.$nextTick(()=>{
                this._initScroll()
            })
            })
            }
          }

        })
        }

      },
      back(){
        this.$router.push({path:'/shop'})
      },
      _collectNone(value,id,src,title,need,price,curr,index){
        this.collectionOfShade=value;
        this.collectId=id;
        this.collectSrc=src;
        this.collectEvoke=value;
        this.collectTitle=title;
        this.collectneeds=need;
        this.collectprice=price,
          this.collectCurren=curr;
        this.key = index;
      },
      __exchangeNone(value,id,src,title,need,price,curr,type,needScoreId,total){
        if(total<=0){
          this.carAlert=true;
          let selt=this;
          this.carAlertConent="当前商品已售罄";
          setTimeout(function(){
            selt.carAlert=false;
          },3000);
          return false
        }
        if(value==false){
          this.num=1;
        }
        this.exchangeOfShade=value;
        this.exchangeEvoke=value;
        this.collectId=id;
        this.collectSrc=src;
        this.collectTitle=title;
        this.collectneeds=need;
        this.collectprice=price;
        this.collectCurren=curr;
        this.exchangeType=type;
        this.needScoreId=needScoreId;
      },
      _collect(value){
        this.collectEvoke=value;
        this.collectionOfShade=value;
        let time;
        this.$http.post("/api/pointShopGoods/addStoreGoods",{country:0,goodsId:this.collectId},{emulateJSON:true}).then((res) => {
//           console.log(this.collectId)
          if (res.body.result==0){
            this.carAlert=true;
            let selt=this
            this.carAlertConent="收藏成功";
            this.carMore[this.key].userId=1
            let Ob=this.carMore[this.key];
            this.carMore.splice(this.key,1,Ob)
            setTimeout(function () {
              selt.carAlert=false;
            },3000)
          }else{
            this.carAlert=true;
            this.carAlertConent=res.body.msg;
            let selt=this
            setTimeout(function () {
              selt.carAlert=false;
            },3000)
          }
        })
      },
      _exchange(){
        if (!this.isLogin){
          this.$router.push({path:'/login'})
          return false;
        }
//         if(this.needScoreId==2){
//           if(this.userInfo.lyq<this.collectneeds){
//             this.exchangeFail=true;
//             this.exchangeOfShade=false;
//             this.exchangeEvoke=false;
//             return false;
//           }
//         }else if(this.needScoreId==3){
//           if(this.userInfo.jf<this.collectneeds){
//             this.exchangeFail=true;
//             this.exchangeOfShade=false;
//             this.exchangeEvoke=false;
//             return false;
//           }
//         }
        this.exchangeOfShade=false;
        this.exchangeEvoke=false;
        if (this.exchangeType==2){
          this.$router.push({path:'/affirm/'+this.collectId})
          sessionStorage.setItem("affirm","phone")
          sessionStorage.setItem("affirmType","2")
        }else if (this.exchangeType==1){
          sessionStorage.setItem("num",this.num)
          sessionStorage.setItem("proile2","carMore/"+this.$route.params.id)
          this.$router.push({path:'/profile2/'+this.collectId})
        }else if(this.exchangeType==3){
          this.$router.push({path:'/affirm/'+this.collectId})
          sessionStorage.setItem("affirm","phone");
          sessionStorage.setItem("affirmType","3")
        }else{
          sessionStorage.setItem("showGoodsId",this.collectId);
          sessionStorage.setItem("showMoney",this.collectneeds);
          sessionStorage.setItem("showGoodsName",this.collectTitle);
          this.$router.push({path:'/showResult'})
//           this.$http.post("/api/pointShopGoods/exchangeGoods",{country:0,goodsId:this.collectId,userId:this.userInfo.userId,count:this.num},{emulateJSON:true}).then((res) => {
//             if(res.body.result==0){
//               this.exchangeSuccess=true;
//             }else{
//               this.exchangeFail=true;
//             }
//           })
        }
        this.num=1;
      },
      cellDel(id,index) {
        this.$http.post('/api//pointShopGoods/cancelStoreGoods',{country:0,storeGoodsId:index,userId:this.userInfo.userId,goodsId:id},{emulateJSON:true}).then(function (res) {
          let selt=this;
          selt.showAbolish = true;
          this.carMore[index].userId=null
          let Ob=this.carMore[index];
          this.carMore.splice(index,1,Ob)
          setTimeout(function () {
            selt.showAbolish = false;
          },2000)
        })
      },
      _exchangeFail(){
        this.exchangeFail=false;
      },
      _exchangeSuccess(){
        this.exchangeSuccess=false;
      },
      loadMore(){
        let _this = this;
        $(window).scroll(function(){
          if(($(this).scrollTop()>=$('.carMore .car-list').height()-$(window).height())&&_this.isJieliu&&$('.carMore .car-list').height()!=0){
            _this.isJieliu = false;
            _this.currentPagetab1++;
            _this._MoreList();
            _this.loadMore();
          }
        })
      }


    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }
</script>

<style  lang="less" rel="stylesheet/less">
  .carMore{
    position: absolute;
    top: 0rem;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: #fff;
    .carMore-comtent{
      position: absolute;
      top: 0.45rem;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .title{
      position: fixed;
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
    .car-list{
      width: 100%;
      overflow: hidden;
      background-color: #fff;
      margin-bottom: 0.05rem;
      >li{
        width: 46.5%;
        height:2.21rem ;
        margin-left: 2%;
        float: left;
        border: 1px solid #e9e9e9;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        padding-bottom: 0.05rem;
        dt{
          display: block;
          width: 1.4rem;
          height: 1.4rem;
          margin: 0 auto;
          margin-top: 0.1rem;
          >img{
            display: block;
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
        dd{
          p:nth-child(1){
            font-size: 0.14rem;
            color: #1c1c1c;
            padding:0.04rem 0 0 0.04rem ;
            width: 98%;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 0.02rem;
          }
          p:nth-child(2){
            width: 96%;
            margin: 0 auto;
            overflow: hidden;
            line-height: 0.2rem;
            span:nth-child(1){
              display: block;
              display: inline-block;
              font-size: 0.14rem;
              color: #e7384a;
              width: 50%;
              /*width: 100%;*/
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: left;
            }
            span:nth-child(2){
              display: block;
              text-decoration: line-through;
              color: #e7384a;
              float: left;
              width: 50%;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              b{
                font-size: 0.12rem;
                color:#b4b4b4;
              }
            }
          }
          p:nth-child(3){
            margin-top: 0.05rem;
            overflow: hidden;

            span{
              display: block;
              display: inline-block;
              width: 0.6rem;
              height: 0.25rem;
              text-align: center;
              line-height: 0.25rem;
              font-size: 0.12rem;
              border-radius: 5px;
              color:#fff;

            }
            span:nth-child(1){
              display: block;
              margin-left: 0.05rem;
              float: left;
              background-color: #e7384a;
            }
            span:nth-child(2){
              display: block;
              display: inline-block;
              float: right;
              background-color: #ffb212;
              margin-right: 0.05rem;
            }
          }
        }
      }
    }
    .collectionOfShade,.exchangeOfShade{
      position: fixed;
      z-index: 20;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: rgba(0,0,0,0.5);
    }
    .collectEvoke{
      position: fixed;
      left: 0;
      bottom: 0rem;
      z-index: 21;
      width: 100%;
      height: 2.26rem;
      background-color: #fff;
      .collectEvoke-content{
        height: 1.75rem;
        width: 100%;
        display: block;
        display: flex;
        .collectEvoke-content-icon{
          display: inline-block;
          margin-left: 0.2rem;
          margin-right: 0.1rem;
          border-radius: 5px;
          height: 1.16rem;
          width: 1.16rem;
          margin-top: -0.2rem;
          overflow: hidden;
          img{
            display: block;
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
        .collectEvoke-content-title{
          display: block;
          flex: 2;
          display: inline-block;
          margin-top: 0.05rem;
          color: #b4b4b4;
          .collectEvoke-name{
            display: inline-block;
            width: 100%;
            height: 0.36rem;
            line-height: 0.20rem;
            overflow: hidden;
            color: #666;
          }
          .collectEvoke-need{
            overflow: hidden;
            display: block;
            display: flex;
            margin-top: 0.06rem;
            margin-bottom: 0.05rem;
            padding-right: 0.05rem;
            >span{
              display: block;
              flex: 1;

            }
            >span:nth-of-type(1){
              display: block;
              display: inline-block;
              color: #e7374b;
              font-size: 0.16rem;
            }
            >span:nth-of-type(2){
              display: block;
              display: inline-block;
              text-decoration: line-through;
              color: #e7374b;
              text-align: right;
              >span{
                display: block;
                display: inline-block;
                font-size: 0.14rem;
                color: #b4b4b4;
              }
            }
          }
        }
      }

    }
    .collectEvoke-buttom,.exchange-buttom{
      height: 0.51rem;
      line-height: 0.51rem;
      text-align: center;
      color: #fff;
      background-color: #e7384a;
      font-size: 0.18rem;
    }
    .carAlert{
      margin: auto;
      position: fixed;
      top: 45%;
      left: 35%;
      border-radius: 10px;
      color: #fff;
      background-color: rgba(0,0,0,0.5);
      z-index: 20;
      height:0.64rem ;
      line-height: 0.64rem;
      padding: 0 0.05rem;
      width: 30%;
      font-size: 0.16rem;
      text-align: center;
    }
    .showexchange {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 21;
      width: 100%;
      height: 2.3rem;
      background-color: #fff;
      .exchange-content {
        height: 1.8rem;
        width: 100%;
        .exchange-top {
          height: 1.29rem;
          display: block;
          display: flex;
          .exchange-icon {
            display: inline-block;
            margin-left: 0.2rem;
            margin-right: 0.1rem;
            border-radius: 5px;
            height: 1.16rem;
            width: 1.16rem;
            margin-top: -0.2rem;
            overflow: hidden;
            img {
              display: block;
              display: inline-block;
              width: 100%;
              height: 100%;
            }
          }
          .exchange-title {
            display: block;
            flex: 1;
            overflow-x: hidden;
            margin-top: 0.05rem;
            color: #b4b4b4;
            .exchange-name {
              display: block;
              width: 95%;
              height: 0.36rem;
              line-height: 0.20rem;
              /*overflow: hidden;*/
              color: #666;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .exchange-need {
              overflow: hidden;
              display: block;
              display: flex;
              margin-top: 0.06rem;
              margin-bottom: 0.05rem;
              padding-right: 0.05rem;
              > span {
                display: block;
                flex: 1;
              }
              > span:nth-of-type(1) {
                display: block;
                display: inline-block;
                color: #e7374b;
                font-size: 0.16rem;
              }
              > span:nth-of-type(2) {
                display: block;
                display: inline-block;
                text-decoration: line-through;
                color: #e7374b;
                text-align: right;
                > span {
                  display: block;
                  display: inline-block;
                  font-size: 0.14rem;
                  color: #b4b4b4;
                }
              }
            }
          }
        }
        .exchange-num {
          height: 0.97rem;
          padding-left: 0.1rem;
          padding-left: 0.1rem;
          h4 {
            margin-left: 0.1rem;
            height: 0.32rem;
            line-height: 0.32rem;
            color: #5b5b5b;
            font-size: 0.18rem;
          }
          > span {
            display: block;
            width: 0.45rem;
            float: left;
            height: 0.38rem;
            display: inline-block;
            line-height: 0.38rem;
            background-color: #f5f5f5;
            text-align: center;
            font-size: 0.14rem;
            color: #1c1c1c;
          }
          > span:nth-of-type(2) {
            display: block;
            display: inline-block;
            margin: 0 0.05rem;
          }
        }
      }
    }
    .exchangeFail{
      position: fixed;
      z-index: 20;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0,0,0,0.5);
      .fail-content{
        height: 2.65rem;
        width: 3.31rem;
        margin: auto;
        position: absolute;
        background-color: #fff;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 15px;
        text-align: center;
        .fail-title{
          height:1.09rem;
          .fail-icon{
            height: 0.77rem;
            width: 100%;
            display: inline-block;
            margin-top: -0.15rem;
            background-image:url("./err.png") ;
            background-position: center;
            background-size:  auto 100%;
            background-repeat: no-repeat;
          }
          .fail-sorry{
            color: #ffa508;
            height: 0.38rem;
            line-height: 0.38rem;
            font-size: 0.16rem;
            font-weight: 900;
          }
        }
        .fail-notic{
          height: 1.56rem;
          background-color: #ffa508;
          border-top: 1px dashed #fff;
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
          .faile-name{
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.18rem;
            color: #fff;
          }
          .faile-buttom{
            width: 80%;
            height:0.51rem;
            line-height: 0.51rem;
            margin: 0 auto;
            background-color: #fff;
            color: #e7374b;
            font-size: 0.2rem;
            border-radius: 25px;
          }
        }
      }
    }
    .exchangeSuccess{
      position: fixed;
      z-index: 20;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0,0,0,0.5);
      text-align: center;
      .success-content {
        height: 2.65rem;
        width: 3.31rem;
        margin: auto;
        position: absolute;
        background-color: #fff;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 15px;
        text-align: center;
        .success-title {
          height: 1.09rem;
          .success-icon {
            height: 0.77rem;
            width: 100%;
            display: inline-block;
            margin-top: -0.15rem;
            background-image: url("./succeed.png");
            background-position: center;
            background-size: auto 100%;
            background-repeat: no-repeat;
          }
          .success-sorry {
            color: #e7374b;
            height: 0.38rem;
            line-height: 0.38rem;
            font-size: 0.16rem;
            font-weight: 900;
          }
        }
        .success-notic {
          height: 1.56rem;
          background-color: #e7374b;
          border-top: 1px dashed #fff;
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
          .success {
            font-size: 0.18rem;
            color: #fff;
            margin-top: 0.05rem;
          }
          .success-name {
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.18rem;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .success-buttom {
            width: 80%;
            height: 0.51rem;
            line-height: 0.51rem;
            margin: 0 auto;
            background-color: #fff;
            color: #e7374b;
            font-size: 0.2rem;
            border-radius: 25px;
          }
        }
      }
    }
    .loadPrompts {
      line-height:0.3rem;
      text-align: center;
      font-size: 0.14rem;
      color: #B4B4B4;
    }
  }

  .m-abolish{
    margin: auto;
    position: fixed;
    top: 45%;
    left: 35%;
    border-radius: 10px;
    color: #fff;
    background-color: #1f1f1f;
    z-index: 20;
    height:0.64rem ;
    line-height: 0.64rem;
    width: 30%;
    font-size: 0.16rem;
    text-align: center;
  }
</style>
