
<template>
  <div class="profile2">
    <div class="title">
      <span class="back icon-back" @click="back"></span>
      <span class="name">确认订单</span>
      <span class="zw"></span>
    </div>
    <div class="content">
      <div class="address">
        <div class="address-Bg">
          <div class="have" v-if="address" @click="_choice">
            <div class="have-content">
              <div class="top">
                <span class="name">收货人:{{address.name}}</span>
                <span class="phone">{{address.tel}}</span>
              </div>
              <div class="address-bottom">
                收获地址:{{address.province}}{{address.street}}{{address.detail}}
              </div>
            </div>
            <div class="address-icon"></div>
          </div>
          <div class="nothing" v-if="!address" @click="_choice">
            <div>客官，请先添加您的收货地址哦</div>
            <div class="address-icon"></div>
          </div>
        </div>
      </div>
      <div class="goods">
        <div class="goods-list" v-for="(item,index) in goods">
          <div class="goods-icon"><img :src="item.picUrl"></div>
          <div class="goods-notic">
            <div class="name">{{item.name}}</div>
            <div class="price">{{item.needScore}}元</div>
            <!--<div class="num">X1</div>-->
            <!--<div class="price">{{item.price}}元</div>-->
            <!--<div class="goods-num">-->
            <!--<span class="reduce" @click="reduce(index)">-</span>-->
            <!--<span>{{num[index]}}</span>-->
            <!--<span class="add" @click="_add(index)">+</span>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="notic">
        <ul>
          <li class="notic-list borderBottom-1px">
            <span>配送方式:</span>
            <span>快递</span>
          </li>
          <li class="notic-list borderBottom-1px">
            <span>共{{goods.length}}件商品</span>
            <!--<span>小计:<span class="zhi">{{total}} {{currency[needId]}}</span></span>-->
            <span>小计:<span class="zhi">{{total}}元</span></span>
          </li>
          <li class="Explain">
            <p>发货说明:</p>
            <p>a 、实物商品提交订单后3天内发货</p>
            <p>b 、虚拟物品提交订单后24小时内发货</p>
          </li>
          <!--<li class="notic-list">-->
          <!--<span class="check" :class="{checkout:checkout}" @click="checkout=!checkout"></span>-->
          <!--<span>同意</span>-->
          <!--<span @click="_href">《玩一下兑换协议》</span>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
    <div class="bottom">
      <span>共{{goods.length}}件</span>
      <span>合计:</span>
      <!--<span class="zhi">{{total}} {{currency[needId]}}</span>-->
      <span><span class="zhi">{{total}}元</span></span>
      <span></span>
      <span @click="_purchase">确认</span>
    </div>
    <div class="prompt" v-if="prompt" >{{cueWord}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  export default{
    data(){
      return{
        address:[],
        goods:[],
        num:[],
        total:0,
        checkout:false,
        needId:3,
        cueWord:'',
        prompt:false,
        currency:[' ',' ','乐盈券','积分']
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf("profile2")!=-1){
          this.address=[]
          this._address();
        }
      }
    },
    created(){
      this.$nextTick(function () {
        if(!this.$store.state.userInfo.userId) {
          this.$store.state.userInfo.userId = sessionStorage.getItem('13322userId');
        }
        this._address()
      })

    },
    methods:{
      _href(){
        window.location.href="http://game.13322.com/xuzhi.htm";
      },
      _address(){
        let Requres = new UrlSearch();
        if(Requres.addressId){
          this.$http.post("/api/pointShopUser/queryAddress",{country:0,userId:this.userInfo.userId},{emulateJSON:true}).then((res) => {
            for(let i=0;i<res.body.data.length;i++){
            if(Requres.addressId==res.body.data[i].id){
              this.address=res.body.data[i];
            }
          }
        })
        }else{
          this.$http.post("/api/pointShopUser/queryAddress",{country:0,userId:this.userInfo.userId},{emulateJSON:true}).then((res) => {
            this.address=res.body.data[0];
        })
        }
        let goodsId=[];
        if(this.$route.params.id){
          goodsId=this.$route.params.id.split(",");
        }
        let num;
        if(sessionStorage.getItem("num")){
          num=sessionStorage.getItem("num").split(",");
        }else{
          num=[]
        }
        this.goods=[];
        this.num=[];
        this.total=0;
        for(let i=0;i<goodsId.length;i++){
          this.$http.post("/api/pointShopGoods/getGoodsInfo",{country:0,id:goodsId[i]},{emulateJSON:true}).then((res) => {
            if (num[i]){
            this.num.push(num[i]);
          }else{
            this.num.push(1);
          }
          this.goods.push(res.body.data);
          this.total+=Number(res.body.data.needScore)*Number(this.num[i]?this.num[i]:1);
          this.needId=res.body.data.needScoreId;
        })
        }

      },
      back(){
        if(this.goods.length==1){
          if(sessionStorage.getItem("profile2")=="shop"){
            this.$router.push({path:'/shop'});
          }else if(sessionStorage.getItem("profile2")=="collect"){
            this.$router.push({path:'/collect'});
          }else{
            this.$router.push({path:'/'+sessionStorage.getItem("proile2")});
          }
        }else{
          this.$router.push({path:'/collect'});
        }

      },
      reduce(value){
        if(this.num[value]>1){
          this.num.splice(value,1,Number(this.num[value])-1);
          this.total-=Number(this.goods[value].needScore)
          sessionStorage.setItem("num",this.num.join(","))
        }
      },
      _add(value){
        this.num.splice(value,1,Number(this.num[value])+1);
        this.total+=Number(this.goods[value].needScore)
        sessionStorage.setItem("num",this.num.join(","))
      },
      _purchase(){
        let self=this
        if(this.address){
//            let ua = window.navigator.userAgent.toLowerCase();
//            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//              if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
//                window.location.href = this.Url+'/zhifu/showResult.html?userId='+this.$store.state.userInfo.userId+'&goodsPrice='+this.total+'&goodsName='+this.goods[0].name+'&phone='+this.address.tel+'&addressId='+this.address.id+'&goodsId='+this.goods[0].id+'&token'+ $.fn.cookie("token");
//              }else{
//                this.$router.push({path:'/showResult?userId='+this.$store.state.userInfo.userId+'&goodsPrice='+this.total+'&goodsName='+this.goods[0].name+'&phone='+this.address.tel+'&addressId='+this.address.id+'&goodsId='+this.goods[0].id+'&token'+ $.fn.cookie("token")});
//              }
//            }else {
          sessionStorage.setItem("showGoodsId",this.goods[0].id);
          sessionStorage.setItem("showAddressId",this.address.id);
          sessionStorage.setItem("showMoney",this.total);
          sessionStorage.setItem("showGoodsName",this.goods[0].name);
//            this.$http.post("/api/pay/getOrderInfoForShop",{country:0},{emulateJSON:true}).then((res) => {
//              if(res.body.result==0){
//                  sessionStorage.setItem("showOrderNum",res.body.data.orderNo)
          this.$router.push({path:'/showResult'})
//              }
//            })
//              this.sendExchange(this.goods,0)
//              if(this.checkout){
//
//              }else{
//                this.prompt=true;
//                this.cueWord="请勾选《玩一下兑换协议》"
//                setTimeout(function () {
//                  self.prompt=false;
//                },2000)
//              }
        }else{
          this.prompt=true;
          this.cueWord="请选择收获地址"
          setTimeout(function () {
            self.prompt=false;
          },2000)
        }
      },
      sendExchange(list,i){
        let self=this
        this.$http.post("/api/pointShopGoods/exchangeGoods",{country:0,goodsId:this.goods[i].id,addressId:this.address.id,phone:this.address.tel,count:this.num[i],userId:this.userInfo.userId},{emulateJSON:true}).then((res) => {
          if(res.body.result==0&&i==list.length-1){
            this.prompt=true;
            this.cueWord="购买成功";
            this.$store.state.userInfo.unreads++
            setTimeout(function () {
              self.prompt=false;
              self.$router.push({path:'/shop'})
            },2000)
          }else if(res.body.result==0&&i<list.length-1){
            i++;
            this.sendExchange(list,i)
          }
//            else if(res.body.result==62){
//              this.prompt=true;
//              this.cueWord=this.currency[this.goods[i].needScoreId]+"不足"
//              setTimeout(function () {
//                self.prompt=false;
//              },2000)
//              return false;
//            }
        })
      },
      _choice(){
        this.$router.push({path:'/profile1?goodsId='+this.$route.params.id});
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .profile2{
    position: absolute;
    top:0rem;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 20;
    background-color: #fff;
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
    .content{
      position: absolute;
      z-index: 21;
      top:0.45rem;
      bottom: 0.5rem;
      left: 0;
      width: 100%;
      overflow: auto;
      .address{
        padding: 0.13rem;
        background-color: #e7384a;
        .address-Bg{
          background-image: url("./tianxie.png");
          background-size: 100% 100%;
          background-position: -1px 0;
          padding: 0.2rem 0.06rem;
          .address-icon{
            width:0.10rem ;
            background-image: url("./myjt.png");
            background-size: 0.10rem 0.19rem;
            background-position: center;
            background-repeat: no-repeat;
          }
          .have{
            display: block;
            display: flex;
            .have-content{
              display: block;
              flex: 2;
              .top{
                height: 0.2rem;
                line-height: 0.2rem;
                width: 100%;
                display: block;
                display: flex;
                .name{
                  display: block;
                  flex: 2;
                  font-size: 0.18rem;
                  overflow: hidden;
                }
                .phone{
                  display: inline-block;
                  font-size: 0.14rem;
                  width: 1.0rem;
                }
              }
              .address-bottom{
                margin-top: 0.13rem;
                line-height: 0.2rem;
                font-size: 0.16rem;
                word-break:break-all;
              }
            }
          }
          .nothing{
            display: block;
            display: flex;
            height: 0.2rem;
            line-height: 0.2rem;
            font-size: 0.16rem;
            >div:nth-of-type(1){
              display: block;
              flex: 2;
            }
          }
        }
      }
      .goods{
        padding: 0.06rem 0.16rem;
        .goods-list{
          padding: 0.06rem 0.09rem;
          display: block;
          display: flex;
          background-color: #f7f7f9;
          margin-bottom: 0.1rem;
          .goods-icon{
            width:1.08rem ;
            height:1.04rem ;
            overflow: hidden;
            img{
              display: block;
              display: inline-block;
              width: 100%;
              height: 100%;
            }
          }
          .goods-notic{
            margin-left: 0.06rem;
            display: block;
            flex: 2;
            .name{
              margin-top: 0.06rem;
              line-height: 0.2rem;
              font-size: 0.16rem;
            }
            .num{
              height: 0.2rem;
              line-height: 0.2rem;
              margin-top: 0.06rem;
              font-size: 0.14rem;
            }
            .price{
              color: red;
              height: 0.2rem;
              line-height: 0.2rem;
              margin-top: 0.06rem;
              font-size: 0.14rem;
            }
            .goods-num{
              height: 0.38rem;
              > span {
                display: block;
                display: inline-block;
                width: 0.45rem;
                float: left;
                height: 0.38rem;
                display: inline-block;
                line-height: 0.38rem;
                background-color: #fff;
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
        >div:nth-last-child{
          margin-bottom: 0;
        }
      }
      .notic{
        .Explain{
          font-size: 0.16rem;
          padding-left: 0.15rem;
          margin-top: 0.1rem;
          >p{
            height: 0.25rem;
            line-height: 0.25rem;
          }
        }
        .notic-list{
          height: 0.6rem;
          line-height: 0.6rem;
          display: block;
          display: flex;
          font-size: 0.16rem;
          padding: 0 0.15rem;
        }
        .notic-list:nth-of-type(1){
          display: block;
          display: flex;
          justify-content: space-between;
        }
        .notic-list:nth-of-type(2){
          display: block;
          display: flex;
          justify-content: flex-end;
          font-size: 0.14rem;
          padding-left:0.1rem;
          .zhi{
            color: #e7384a;
          }
        }
        .notic-list:nth-of-type(2)>span:nth-of-type(1){
          display: block;
          display: inline-block;
          margin-right: 0.05rem;
        }
        .notic-list:nth-of-type(3){
          .check{
            display: inline-block;
            height: 0.6rem;
            width: 0.6rem;
            /*margin-right: 0.05rem;*/
            background-size: 0.3rem 0.3rem;
            background-repeat: no-repeat;
            background-position: center;
            background-image:url("./wgx.png") ;
          }
          .checkout{
            background-image: url("./gx.png");
          }
          >span{
            display: block;
            display: inline-block;
            display: block;
          }
          >span:nth-of-type(3){
            display: block;
            display: inline-block;
            color: #e7384a;
          }
        }
      }
    }
    .bottom{
      position: fixed;
      bottom: 0;
      width: 100%;
      display: block;
      display: flex;
      justify-content: flex-end;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.16rem;
      background-color: #f5f5f5;
      >span:nth-of-type(1),>span:nth-of-type(2),>span:nth-of-type(4){
        display: block;
        margin-right: 0.1rem;
        font-size: 0.14rem;
        color: #1c1c1c;
      }

      >span:nth-of-type(3){
        color: #e7384a;
        display: block;
      }
      >span:nth-of-type(5){
        display: block;
        text-align: center;
        background-color: #e7384a;
        color: #fff;
        width: 1rem;
      }
    }
    .prompt{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      height: .5rem;
      line-height: 0.5rem;
      width: 60%;
      background-color: #e7384b;
      color: #ffffff;
      border-radius: 0.1rem;
      text-align: center;
      font-size: 0.18rem;
      z-index: 100;
    }
  }
</style>
