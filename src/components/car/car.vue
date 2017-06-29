<template>
  <div class="car">
    <div class="title">商城</div>
    <div  class="carWrapper" ref="carWrapper">
      <div class="car-comtent">
        <div class="banner swiper-container1">
          <ul class="swiper-wrapper">
            <li v-for="(item,index) in carBanner " class="swiper-slide" v-if="item.enable==0&&index<5" :data-url="item.linkUrl">
              <img :src="item.imageUrl">
            </li>
          </ul>
          <div class="swiper-pagination"></div>
        </div>
        <!--<div class="car-top borderBottom-1px">-->
        <!--<div :class="{active:carTab}" @click="_carTab(true)">-->
        <!--<div>-->
        <!--<span class="icon icon-shop"></span>-->
        <!--<span class="name">积分兑换</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div :class="{active:!carTab}" @click="_carTab(false)">-->
        <!--<div>-->
        <!--<span class="icon icon-quan"></span>-->
        <!--<span class="name">乐盈券兑换</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->

        <div class="content swiper-container2">
          <div class="swiper-wrapper">
            <!--<div class="content-list  swiper-slide">-->
            <!--<div class="comtent-title borderBottom-1px">-->
            <!--<span class="icon"></span>-->
            <!--<span class="name">虚拟物品</span>-->
            <!--<span class="more-icon"></span>-->
            <!--<span class="more" @click="_cartoM(12)">更多</span>-->
            <!--</div>-->
            <!--<ul class="car-list">-->
            <!--<li v-for="(item,index) in carFictitiousJf"  :data-id="index" v-if="index<4" >-->
            <!--<dl>-->
            <!--<dt>-->
            <!--<img :src="item.picUrl">-->
            <!--</dt>-->
            <!--<dd>-->
            <!--<p>{{item.name}}</p>-->
            <!--<p class="borderBottom-1px">-->
            <!--<span>{{item.needScore}}{{currency[item.needScoreId]}}</span>-->
            <!--<span>-->
            <!--<b>市场价:{{item.price}}元</b>-->
            <!--</span>-->
            <!--</p>-->
            <!--<p>-->
            <!--<span class="colls" @click.stop="_collectNone(true,item.id,item.picUrl,item.name,item.needScore,item.price,currency[item.needScoreId],index,1)" v-if="!fictitionStatus[index]">收藏</span>-->
            <!--<span class="colseSc"  @click.stop="cellDel(item.id,index,1)" v-if="fictitionStatus[index]">取消收藏</span>-->
            <!--<span @click.stop="__exchangeNone(true,item.id,item.picUrl,item.name,item.needScore,item.price,currency[item.needScoreId],item.type,item.needScoreId)">兑换</span>-->
            <!--</p>-->
            <!--</dd>-->
            <!--</dl>-->
            <!--</li>-->
            <!--</ul>-->
            <!--<div class="comtent-title borderBottom-1px">-->
            <!--<span class="icon"></span>-->
            <!--<span class="name">手办周边</span>-->
            <!--<span class="more-icon"></span>-->
            <!--<span class="more" @click="_cartoM(11)">更多</span>-->
            <!--</div>-->
            <!--<ul class="car-list">-->
            <!--<li v-for="(item,index) in carMaterialObjectJf" v-if="index<4">-->
            <!--<dl>-->
            <!--<dt>-->
            <!--<img :src="item.picUrl">-->
            <!--</dt>-->
            <!--<dd>-->
            <!--<p>{{item.name}}</p>-->
            <!--<p class="borderBottom-1px">-->
            <!--<span>{{item.needScore}}{{currency[item.needScoreId]}}</span>-->
            <!--<span>-->
            <!--<b>市场价:{{item.price}}元</b>-->
            <!--</span>-->
            <!--</p>-->
            <!--<p>-->
            <!--<span class="colls" @click.stop="_collectNone(true,item.id,item.picUrl,item.name,item.needScore,item.price,currency[item.needScoreId],index,2)" v-if="!fictitionStatus1[index]">收藏</span>-->
            <!--<span class="colseSc"  @click.stop="cellDel(item.id,index,2)" v-if="fictitionStatus1[index]">取消收藏</span>-->
            <!--<span @click.stop="__exchangeNone(true,item.id,item.picUrl,item.name,item.needScore,item.price,currency[item.needScoreId],item.type,item.needScoreId)">兑换</span>-->
            <!--</p>-->
            <!--</dd>-->
            <!--</dl>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</div>-->
            <div class="content-list swiper-slide">
              <div class="comtent-title borderBottom-1px">
                <span class="icon"></span>
                <span class="name">虚拟物品</span>
                <span class="more-icon"></span>
                <span class="more" @click="_cartoM(22)">更多</span>
              </div>
              <ul class="car-list">
                <li v-for="(item,index) in carFictitiousQu" v-if="index<4">
                  <dl>
                    <dt>
                      <img :src="item.picurl">
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
                        <span class="colls" @click.stop="_collectNone(true,item.id,item.picurl,item.name,item.needScore,item.price,currency[item.needscoreid],index,3)" v-if="!fictitionStatus2[index]">收藏</span>
                        <span  @click.stop="cellDel(item.id,index,3)" v-if="fictitionStatus2[index]">取消收藏</span>
                        <span @click.stop="__exchangeNone(true,item.id,item.picurl,item.name,item.needScore,item.price,currency[item.needscoreid],item.type,item.needscoreid,item.total)">购买</span>
                      </p>
                    </dd>
                  </dl>
                </li>
              </ul>
              <div class="comtent-title borderBottom-1px">
                <span class="icon"></span>
                <span class="name">手办周边</span>
                <span class="more-icon"></span>
                <span class="more" @click="_cartoM(21)">更多</span>
              </div>
              <ul class="car-list">
                <li v-for="(item,index) in carMaterialObjectQu" v-if="index<4">
                  <dl>
                    <dt>
                      <img :src="item.picurl">
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
                        <span class="colls" @click.stop="_collectNone(true,item.id,item.picurl,item.name,item.needScore,item.price,currency[item.needscoreid],index,4)" v-if="!fictitionStatus3[index]">收藏</span>
                        <span class="colseSc" @click.stop="cellDel(item.id,index,4)" v-if="fictitionStatus3[index]">取消收藏</span>
                        <span @click.stop="__exchangeNone(true,item.id,item.picurl,item.name,item.needScore,item.price,currency[item.needscoreid],item.type,item.needscoreid,item.total)">购买</span>
                      </p>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="carAlert" v-if="carAlert">{{carAlertConent}}</div>
    <div class="collectionOfShade" v-if="collectionOfShade" @click.stop="_collectNone(false)"></div>
    <div class="exchangeOfShade" v-if="exchangeOfShade" @click.stop="__exchangeNone(false)"></div>
    <div class="collectEvoke" v-if="collectEvoke" >
      <div class="collectEvoke-content">
        <span class="collectEvoke-content-icon"><img :src="collectSrc"></span>
        <span class="collectEvoke-content-title">
            <span class="collectEvoke-name">{{collectTitle}}</span>
            <span class="collectEvoke-need">
               <span>{{collectneeds}}元</span>
              <span><span>市场价{{collectprice}}元</span></span>
              <!--<span>{{collectneeds}}{{collectCurren}}</span>-->
              <!--<span><span>市场价{{collectprice}}元</span></span>-->
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
                  <!--<span>{{collectneeds}}{{collectCurren}}</span>-->
                  <span>{{collectneeds}}元</span>
                  <span><span>市场价{{collectprice}}元</span></span>
                  <!--<span>市场价:{{collectprice}}元</span>-->
                </span>
                <span>库存充足</span>
              </span>
        </div>
        <!--<div class="exchange-num" v-if="exchangeType!=2">-->
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
          <div class="faile-name">{{currency[needscoreid]}}不足</div>
          <div class="faile-buttom" @click="_exchangeFail()">确定</div>
        </div>
      </div>
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
    <div class="m-abolish" v-show="showAbolish">
      取消收藏成功
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  let mySwiper2="";
  export default{
    data(){
      return{
        carBanner:[],
        carTab:true,
        carFictitiousJf:[],//虚拟物品积分
        carFictitiousQu:[],
        carMaterialObjectJf:[],//实物积分
        carMaterialObjectQu:[],
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
        needscoreid:'',
        exchangeFail:false,
        exchangeSuccess:false,
        enshrinesh:"收藏",
        key:-1,
        showAbolish:false,
        fictitionStatus:[],//积分虚拟商
        fictitionStatus1:[],//积分实物
        fictitionStatus2:[],//虚拟券
        fictitionStatus3:[],
        arrnum:1
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('shop')!=-1){
          this.carFictitiousJf=[];//虚拟物品积分
          this.carFictitiousQu=[];
          this.carMaterialObjectJf=[];//实物积分
          this.carMaterialObjectQu=[];
          this.fictitionStatus=[];//积分虚拟商
          this.fictitionStatus1=[];//积分实物
          this.fictitionStatus2=[];//虚拟券
          this.fictitionStatus3=[];
          this.getAllGoods();
          this.$nextTick(function () {
            let self=this;
//            let height = $(window).height();
//            $('.car').height(height-$(".tab-bottom").height()-$(".title").height());
            self._initScroll();
          });
        }
      }
    },
    created(){
      if(!this.$store.state.userInfo.userId) {
        this.$store.state.userInfo.userId = sessionStorage.getItem('13322userId');
      }
      this.$nextTick(function () {
//        let height = $(window).height();
//        $('.car').height(height-$(".tab-bottom").height()-$(".title").height());
        this._initScroll();
      });
      this.currency=[' ',' ','乐盈券','积分'];
      this.$http.post("/api/pointShopGoods/getRotationInfo",{country:0,platform:4},{emulateJSON:true}).then((response) => {
        response=response.body;
      if (response.result === 0){
        this.carBanner=response.data.list;
        this.$nextTick(()=>{
          let mySwiper1 = new Swiper('.swiper-container1', {
            loop: true,
            pagination: '.swiper-pagination',
            autoplay: 4000
          })
        })
      }
    })

      this.$nextTick(() => {
        this.getAllGoods();
      $(".swiper-container1").on("click", ".swiper-slide", function () {
        window.location.href = $(this).attr("data-url")
      })
    })


    },
    methods:{
      getAllGoods(){
        if(this.$store.state.userInfo.userId) {
          this.$http.post("/api/pointShopGoods/getAllGoods", {
            country: 0,
            platform: 4,
            enable: 0,
            pageSize: 50,
            userId: this.$store.state.userInfo.userId
          }, {emulateJSON: true}).then((response) => {
            response = response.body;
          if (response.result === 0) {
            for (let i = 0; i < response.data.list.length; i++) {
              if (response.data.list[i].type == 1) {
                if (response.data.list[i].needscoreid == 2) {
                  this.carMaterialObjectQu.push(response.data.list[i])
                  this.fictitionStatus3.push(response.data.list[i].userId)
                } else if (response.data.list[i].needscoreid == 3) {
                  this.fictitionStatus1.push(response.data.list[i].userId)
                  this.carMaterialObjectJf.push(response.data.list[i])
                }
              } else {
                if (response.data.list[i].needscoreid == 2) {
                  this.carFictitiousQu.push(response.data.list[i]);
                  this.fictitionStatus2.push(response.data.list[i].userId)
                } else if (response.data.list[i].needscoreid == 3) {
                  this.fictitionStatus.push(response.data.list[i].userId);
                  this.carFictitiousJf.push(response.data.list[i])
                }
              }
            }
            this.$nextTick(() => {
              this._initScroll();
            let self = this;
//                mySwiper2 = new Swiper('.swiper-container2', {
//                  onSlideChangeStart: function (swiper) {
//                    if (swiper.activeIndex == 0) {
//                      self.carTab = true;
//                    } else {
//                      self.carTab = false;
//                    }
//                  }
//                })
          })
          }
        });
        }else {
          this.$http.post("/api/user/getUserInfo", {country: 0, terminal: 4}, {emulateJSON: true}).then((response) => {
            response = response.body;
          let userId;
          if(response.result==0){
            userId=response.user.userId;
          }else{
            userId=""
          }
          this.$http.post("/api/pointShopGoods/getAllGoods", {
            country: 0,
            platform: 4,
            enable: 0,
            pageSize: 50,
            userId: userId
          }, {emulateJSON: true}).then((response) => {
            response = response.body;
          if (response.result === 0) {
            for (let i = 0; i < response.data.list.length; i++) {
              if (response.data.list[i].type == 1) {
                if (response.data.list[i].needscoreid == 2) {
                  this.carMaterialObjectQu.push(response.data.list[i])
                } else if (response.data.list[i].needscoreid == 3) {
                  this.carMaterialObjectJf.push(response.data.list[i])
                }
              } else {
                if (response.data.list[i].needscoreid == 2) {
                  this.carFictitiousQu.push(response.data.list[i]);
                } else if (response.data.list[i].needscoreid == 3) {
                  this.fictitionStatus.push(response.data.list[i].userId);
                  this.carFictitiousJf.push(response.data.list[i])
                }
              }
            }
            this.$nextTick(() => {
              this._initScroll();
            let self = this;
//                  mySwiper2 = new Swiper('.swiper-container2', {
//                    touchRatio: 0.5,
//                    onSlideChangeStart: function (swiper) {
//                      if (swiper.activeIndex == 0) {
//                        self.carTab = true;
//                      } else {
//                        self.carTab = false;
//                      }
//                    }
//                  })
          })
          }
        })
        })
        }
      },
      _initScroll(){
//        if(this.carWrapper){
//          this.carWrapper.refresh()
//        }else{
//          this.carWrapper =new Bscroll(this.$refs.carWrapper,{
//            click:true
//          });
//        }
      },
      _carTab(value){
        this.carTab=value;
        if (value){
          mySwiper2.slideTo(0, 200, false);
        }else{
          mySwiper2.slideTo(1, 200, false);
        }
      },
      _cartoM(value){
        this.$router.push({path:'/carMore/'+value})
      },
      _collectNone(value,id,src,title,need,price,curr,index,arrnum){
        if(!this.isLogin){
          this.$router.push({path:'/login'});
          return false;
        }
        this.collectionOfShade=value;
        this.collectId=id;
        this.collectSrc=src;
        this.collectEvoke=value;
        this.collectTitle=title;
        this.collectneeds=need;
        this.collectprice=price,
          this.collectCurren=curr;
        this.key = index;
        this.arrnum=arrnum;
      },
      __exchangeNone(value,id,src,title,need,price,curr,type,needscoreid,total){
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
        this.needscoreid=needscoreid;
      },
      _collect(value){
        this.collectEvoke=value;
        this.collectionOfShade=value;
        let time;
        this.$http.post("/api/pointShopGoods/addStoreGoods",{country:0,goodsId:this.collectId},{emulateJSON:true}).then((res) => {
          if (res.body.result==0){
            this.carAlert=true;
            let selt=this;
            this.carAlertConent="收藏成功";
            setTimeout(function(){
              selt.carAlert=false;
            },3000);
            if(this.arrnum==1){
              this.fictitionStatus.splice(this.key,1,1)
            }else if(this.arrnum==2){
              this.fictitionStatus1.splice(this.key,1,1)
            }else if(this.arrnum==3){
              this.fictitionStatus2.splice(this.key,1,1)
            }else if(this.arrnum==4){
              this.fictitionStatus3.splice(this.key,1,1)
            }else if(res.body.result==22){
              this.$router.push({path:'/login'})
            }
          }else{
            this.carAlert=true;
            this.carAlertConent=res.body.msg;
            let selt=this
            setTimeout(function(){
              selt.carAlert=false;
            },3000)
          }
        });
      },
      cellDel(id,index,num) {
        this.$http.post('/api/pointShopGoods/cancelStoreGoods',{country:0,storeGoodsId:index,userId:this.userInfo.userId,goodsId:id},{emulateJSON:true}).then(function (res) {
          let selt=this;
          selt.showAbolish = true;
          if(num==1){
            this.fictitionStatus.splice(index,1,null)
          }else if(num==2){
            this.fictitionStatus1.splice(index,1,null)
          }else if(num==3){
            this.fictitionStatus2.splice(index,1,null)
          }else{
            this.fictitionStatus3.splice(index,1,null)
          }
          setTimeout(function () {
            selt.showAbolish = false;
          },2000)
        })
      },
      _exchange(){
        if (!this.isLogin){
          this.$router.push({path:'/login'})
          return false;
        }
//          if(this.needScoreId==2){
//              if(this.userInfo.lyq<this.collectneeds){
//                this.exchangeFail=true;
//                this.exchangeOfShade=false;
//                this.exchangeEvoke=false;
//                  return false;
//              }
//          }else if(this.needScoreId==3){
//            if(this.userInfo.jf<this.collectneeds){
//              this.exchangeFail=true;
//              this.exchangeOfShade=false;
//              this.exchangeEvoke=false;
//              return false;
//            }
//          }
        this.exchangeOfShade=false;
        this.exchangeEvoke=false;
        if (this.exchangeType==2){
          this.$router.push({path:'/affirm/'+this.collectId})
          sessionStorage.setItem("affirm","phone")
          sessionStorage.setItem("affirmType","2")
        }else if (this.exchangeType==1){
          sessionStorage.setItem("num",this.num)
          sessionStorage.setItem("proile2","shop")
          this.$router.push({path:'/profile2/'+this.collectId})
        }else if(this.exchangeType==3){
          this.$router.push({path:'/affirm/'+this.collectId})
          sessionStorage.setItem("affirm","phone");
          sessionStorage.setItem("affirmType","3")
        }else{
          sessionStorage.setItem("showGoodsId",this.collectId);
          sessionStorage.setItem("showMoney",this.collectneeds);
          sessionStorage.setItem("showGoodsName",this.collectTitle);
//            this.$http.post("/api/pay/getOrderInfoForShop",{country:0},{emulateJSON:true}).then((res) => {
//              if(res.body.result==0){
//                sessionStorage.setItem("showOrderNum",res.body.data.orderNo)
          this.$router.push({path:'/showResult'})
//              }
//            })
//            this.$http.post("/api/pointShopGoods/exchangeGoods",{country:0,goodsId:this.collectId,userId:this.userInfo.userId,count:this.num},{emulateJSON:true}).then((res) => {
//              if(res.body.result==0){
//                  this.exchangeSuccess=true;
//                    this.$store.state.userInfo.unreads++
//              }else{
//                  this.exchangeFail=true;
//              }
//            })
        }
        this.num=1;
      },
      _exchangeFail(){
        this.exchangeFail=false;
      },
      _exchangeSuccess(){
        this.exchangeSuccess=false;
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .car{
    font-size: 0.15rem;
    position: absolute;
    top:0.45rem;
    width: 100%;
    background-color: #E9E9E9;
    .carWrapper{
      padding-bottom: 0.5rem;
    }
    .title{
      font-size: 0.25rem;
      text-align: center;
      line-height: 0.45rem;
      height: 0.45rem;
      color: #fff;
      width: 100%;
      background-color: #e7374b;
      position: fixed;
      top:0;
      z-index: 12;
    }
    .car-comtent{
      .banner{
        height: 1.68rem;
        width: 100%;
        overflow: hidden;
        position: relative;
        ul{
          height: 100%;
          li{
            width:100vw;
            height: 100%;
            float:left;
            img{
              display: block;
              display: inline-block;
              height: 100%;
              width: 100%;
            }
          }
        }
      }
      .page{
        position: absolute;
        top:1.45rem ;
        z-index: 2;
        left: 50%;
        li {position:relative; left:-50%;display:inline-block;width:10px;height:10px;background-color:#666;margin: 0px 10px;float:left;color:#fff;text-decoration:none;text-align: center;border-radius:50%;cursor: pointer;}
        li.active{background:red;}
      }
      .car-top{
        width: 100%;
        background-color:#fff ;
        height: 0.4rem;
        line-height: 0.4rem;
        box-sizing: border-box;
        margin-bottom: 0.05rem;
        .active{
          border-bottom: 2px solid #e7384a;
        }
        >div{
          width: 50%;
          float: left;
          height: 0.4rem;
          div{
            width: 60%;
            margin: 0 auto;
            overflow: hidden;
          }
          .icon{
            height: 0.25rem;
            width: 0.25rem;
            display: inline-block;
            margin-top: 0.09rem;
            float: left;
            font-size: 0.24rem;
            color: #FF4A81;
            margin-right: 0.05rem;
          }
          .icon-quan{
            color: #FFA757;
          }
          .name{
            font-size: 0.14rem;
            color: #1c1c1c;
            text-align: center;
          }
        }
      }
      .content{
        margin-top: 0.05rem;
        .content-list{
          float: left;
          width: 100vw;
          >ul:nth-of-type(2){
            margin-bottom: 0;
          }
          >div:nth-of-type(2){
            .icon{
              background-image: url("./sbzb.png");
            }
          }
        }
      }
      .comtent-title{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.14rem;
        background-color: #fff;
        .icon{
          display: inline-block;
          height: 0.2rem;
          width: 0.2rem;
          margin: 0.1rem;
          background-image: url("./xywp.png");
          background-size: 0.2rem 0.2rem;
          background-repeat: no-repeat;
          float: left;
        }
        .name{
          float: left;
          display: inline-block;
        }
        .more{
          float: right;
        }
        .more-icon{
          height: 0.2rem;
          width: 0.1rem;
          margin: 0.1rem;
          display: inline-block;
          background-image: url("./myjt.png");
          background-size: 0.1rem 0.2rem;
          background-repeat: no-repeat;
          float: right;
        }
      }

      .content{
        width: 100%;
        overflow: hidden;
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
                  display: inline-block;
                  /*width: 100%;*/
                  width: 50%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  float: left;
                }
                span:nth-child(2){
                  display: block;
                  display: inline-block;
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
                  display: inline-block;
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
          flex: 1;
          display: block;
          overflow: hidden;
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
            display:block;
            overflow: hidden;
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
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
            display: block;
            overflow-x: hidden;
            margin-top: 0.05rem;
            color: #b4b4b4;
            .exchange-name {
              display: inline-block;
              width: 100%;
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
              display:block;
              overflow: hidden;
              display: flex;
              margin-top: 0.06rem;
              margin-bottom: 0.05rem;
              padding-right: 0.05rem;
              > span {
                display: block;
                flex: 1;
              }
              > span:nth-of-type(1) {
                color: #e7374b;
                font-size: 0.16rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              > span:nth-of-type(2) {
                text-decoration: line-through;
                color: #e7374b;
                text-align: right;
                > span {
                  display: block;
                  width: 100%;
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
          h4 {
            margin-left: 0.1rem;
            height: 0.32rem;
            line-height: 0.32rem;
            color: #5b5b5b;
            font-size: 0.18rem;
          }
          > span {
            display: block;
            display: inline-block;
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
  }
  .m-abolish{
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
    width: 30%;
    font-size: 0.16rem;
    text-align: center;
  }
  .car .car-comtent .content .car-list > li dd p:nth-child(3) .colseSc{
    background: #ccc;
  }
</style>
