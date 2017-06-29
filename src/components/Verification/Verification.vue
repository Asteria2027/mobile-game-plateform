<template>
<div class="Verification">
  <div>
    <div class="title">
      <span class="back icon-back" @click="back"></span>
      <span class="name">验证银行卡信息</span>
      <span class="zw"></span>
    </div>
    <div class="content">
      <ul class="Order">
        <li class=" borderBottom-1px" v-if="0<dropdownNum">
          <span>订单金额:</span>
          <span>{{money}}.00元</span>
        </li>
        <li class=" borderBottom-1px" v-if="1<dropdownNum">
          <span>账户:</span>
          <span>{{userInfo.userId}}</span>
        </li>
        <li class=" borderBottom-1px" v-if="2<dropdownNum">
          <span>银行卡:</span>
          <span>{{bankName}}</span>
        </li>
        <li class=" borderBottom-1px" v-if="3<dropdownNum">
          <span>卡号:</span>
          <span>{{banknum}}</span>
        </li>
        <li class=" borderBottom-1px" v-if="4<dropdownNum">
          <span>交易时间:</span>
          <span>{{Paytime|setTime}}</span>
        </li>
        <li class=" borderBottom-1px" v-if="5<dropdownNum">
          <span>订单编号:</span>
          <span>{{Ordernumber}}</span>
        </li>
        <li class="dropdown" @click="_dropdown(6)">
          <div v-if="dropdown">
            <span>展开详细信息</span><span :class="{dropdownbuttom:dropdown}"></span>
          </div>
          <div v-if="!dropdown">
            <span>收起详细</span><span :class="{dropdowntop:!dropdown}"></span>
          </div>
        </li>
      </ul>
      <div class="hint">
        提醒:<span>请输入银行卡绑定信息</span>
      </div>
      <ul class="notic" v-if="type">
        <li class=" borderBottom-1px">
          <span>持卡人:</span>
          <input placeholder="持卡人姓名" maxlength="12" v-model="bankUserName">
        </li>
        <!--@click="Certificates=!Certificates"-->
        <li class=" borderBottom-1px" >
          <span>证件类型:</span>
          <span>{{CertificateName}}</span>
          <span></span>
        </li>
        <li class=" borderBottom-1px">
          <span>证件号码:</span>
          <input placeholder="持卡人证件号"  v-model="bankUserNum" maxlength="18" onkeyup="this.value=this.value.replace(/[\W]/g,'');bankUserNum=this.value.replace(/[\W]/g,'')">
        </li>
        <li class=" borderBottom-1px">
          <span>手机号:</span>
          <input placeholder="银行预留手机号" type="number" @input="_input(11,'bankPhone')" v-model="bankPhone" pattern="[0-9]*" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        </li>
      </ul>
      <ul class="notic" v-if="!type">
        <li class=" borderBottom-1px">
          <span>持卡人:</span>
          <input placeholder="持卡人姓名" v-model="bankUserName" maxlength="12">
        </li>
        <!--@click="Certificates=!Certificates"-->
        <li class=" borderBottom-1px">
          <span>证件类型:</span>
          <span>{{CertificateName}}</span>
          <span></span>
        </li>
        <li class=" borderBottom-1px">
          <span>证件号码:</span>
          <input  placeholder="持卡人证件号" v-model="bankUserNum"  maxlength="18"  @keyup="_bankUserNum()" >
        </li>
        <li class=" borderBottom-1px" @click="dataYear=!dataYear">
          <span>有效期:</span>
          <span>{{dayTrue}}</span>
          <span></span>
        </li>
        <li class=" borderBottom-1px">
          <span>CVN:</span>
          <input placeholder="信用卡背后三位数字" v-model="CVN"  @input="_input(3,'CVN')" type="number"   pattern="[0-9]*" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        </li>
        <li class=" borderBottom-1px">
          <span>手机号:</span>
          <input placeholder="银行预留手机号" @input="_input(11,'bankPhone')" type="number" v-model="bankPhone"  pattern="[0-9]*" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        </li>
      </ul>
      <div class="agreem">
        <span @click="chose=!chose" :class="{true:chose}"></span>
        <span>同意</span>
        <a href="/serviceagreement">《玩一下平台支付服务协议》</a>
      </div>
    </div>
    <div class="buttom" @click="next">
      验证信息
    </div>
  </div>

  <div class="Popup" v-if="Popup">
    <div>
      <div class=" borderBottom-1px">提示信息 <span @click="Popup=!Popup"></span></div>
      <div>{{PopupContent}}</div>
      <div @click="Popup=!Popup">确定</div>
    </div>
  </div>
  <div class="Certificates" v-if="Certificates" @click="Certificates=!Certificates">

  </div>
  <!--<ul class="Certificates-content" :class="{display:Certificates}">-->
    <!--<li class=" borderBottom-1px" @click="_CertificateName('1')">身份证</li>-->
    <!--<li class=" borderBottom-1px" @click="_CertificateName('2')">军官证</li>-->
    <!--<li class=" borderBottom-1px" @click="_CertificateName('3')">护照</li>-->
    <!--<li class=" borderBottom-1px" @click="_CertificateName('4')">回乡证</li>-->
    <!--<li class=" borderBottom-1px" @click="_CertificateName('5')">台胞证</li>-->
    <!--<li class=" borderBottom-1px" @click="_CertificateName('6')">警官证</li>-->
    <!--<li class=" borderBottom-1px" @click="_CertificateName('7')">士兵证</li>-->
    <!--<li @click="_CertificateName('8')">其他证件</li>-->
  <!--</ul>-->
  <div class="dataYear"  v-if="dataYear">

  </div>
  <div class="dataYear-list" :class="{dataBlack:dataYear}">
    <span></span>
    <p>
      <span @click="_false">取消</span>
      <span @click="Determine">确定</span>
    </p>
    <div class="swiper-container12">
      <ul class="swiper-wrapper">
        <li class="swiper-slide">2017</li>
        <li class="swiper-slide">2018</li>
        <li class="swiper-slide">2019</li>
        <li class="swiper-slide">2020</li>
        <li class="swiper-slide">2021</li>
        <li class="swiper-slide">2022</li>
        <li class="swiper-slide">2023</li>
        <li class="swiper-slide">2024</li>
        <li class="swiper-slide">2025</li>
        <li class="swiper-slide">2026</li>
        <li class="swiper-slide">2027</li>
        <li class="swiper-slide"></li>
        <li class="swiper-slide"></li>
        <li class="swiper-slide"></li>
        <li class="swiper-slide"></li>
      </ul>
    </div>
    <div class="swiper-container13">
      <ul class="swiper-wrapper">
        <li class="swiper-slide">01</li>
        <li class="swiper-slide">02</li>
        <li class="swiper-slide">03</li>
        <li class="swiper-slide">04</li>
        <li class="swiper-slide">05</li>
        <li class="swiper-slide">06</li>
        <li class="swiper-slide">07</li>
        <li class="swiper-slide">08</li>
        <li class="swiper-slide">09</li>
        <li class="swiper-slide">10</li>
        <li class="swiper-slide">11</li>
        <li class="swiper-slide">12</li>
        <li class="swiper-slide"></li>
        <li class="swiper-slide"></li>
        <li class="swiper-slide"></li>
        <li class="swiper-slide"></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  let mySwiper13;
  let mySwiper12;
  export default {
    data(){
      return {
        dropdown:true,
        dropdownNum:1,
        chose:true,
        type:false,
        Popup:false,
        Certificates:false,
        CertificateName:"身份证",
        CertificateType:['','身份证','军官证','护照','回乡证','台胞证','警官证','士兵证','其他证件'],
        CertificateNum:1,
        dataYear:false,
        Yrar:['17','18','19','20','21','22','23','24','25','26','27'],
        month:['01','02','03','04','05','06','07','08','09','10','11','12'],
        YrarIndex:0,
        monthIndex:0,
        dayTrue:'选择有效期',
        money:'',
        bankName:'',
        banknum:'',
        backId:'',
        Paytime:'',
        Ordernumber:0,
        bankPhone:'',
        bankUserName:'',
        bankUserNum:'',
        CVN:'',
        PopupContent:'填写信息与银行预留信息不一致',
        nextTrue:true
      }
    },
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf("Verification")!=-1) {
          this.chose=false
            if(!sessionStorage.getItem("bankPhone")){
                    this.bankUserNum="";
                    this.bankUserName="";
                    this.CertificateName="身份证";
                    this.bankPhone="";
                    this.dayTrue='选择有效期';
                    this.CVN="";

            }
              this.money = sessionStorage.getItem("payMomey");
              this.Paytime =Number(sessionStorage.getItem("applyTime"));
              this.banknum=sessionStorage.getItem("banknum");
              this.Ordernumber=sessionStorage.getItem("outTradeNo");
              if(sessionStorage.getItem("bankType")==0){
                this.type=true;
                this.bankName=sessionStorage.getItem("bankName")+"储蓄卡"
              }else{
                this.type=false;
                this.bankName=sessionStorage.getItem("bankName")+"信用卡"
              }
        }
      }
    },
    created(){
      this.$nextTick(()=>{
        if(sessionStorage.getItem("bankType")==0){
          this.type=true;
          this.bankName=sessionStorage.getItem("bankName")+"储蓄卡"
        }else{
          this.type=false;
          this.bankName=sessionStorage.getItem("bankName")+"信用卡"
        }
        this.Paytime=Number(sessionStorage.getItem("applyTime"));
        this.money=sessionStorage.getItem("payMomey");
        this.banknum=sessionStorage.getItem("banknum");
        this.Ordernumber=sessionStorage.getItem("outTradeNo");
        let self=this;
        mySwiper12=new Swiper('.swiper-container12', {
          direction : 'vertical',
          slidesPerView: 5,
          freeMode : true,
          freeModeSticky : true,
          autoplayDisableOnInteraction : false,
          observer: true,
          observeParents: true,
          autoplayStopOnLast:false,
        });
        mySwiper13=new Swiper('.swiper-container13', {
          direction : 'vertical',
          slidesPerView: 5,
          freeMode : true,
          freeModeSticky : true,
          autoplayDisableOnInteraction : false,
          observer: true,
          autoplayStopOnLast:false,
          observeParents: true,
        });
      })
    },
    methods:{
        back(){
          if(sessionStorage.getItem("GamingPayId")){
            window.history.back()
          }else{
            this.$router.push({path:'/backCardPay'})
          }
        },
      next(){
        if(!this.bankUserName||this.CertificateName=="请选择证件类型"||!this.bankUserNum||!this.bankPhone){
          this.Popup=true;
          this.PopupContent="请输入完整的银行卡绑定信息";
          return false;
        }else if(!this.type&&(!this.bankUserName||this.CertificateName=="请选择证件类型"||!this.bankUserNum||!this.bankPhone||this.dayTrue=="选择有效期"||!this.CVN)){
          this.Popup=true;
          this.PopupContent="请输入完整的银行卡绑定信息";
          return false;
        }else if(this.bankUserName.length<2){
          this.Popup=true;
          this.PopupContent="姓名长度大于2";
          return false;
        }else  if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.bankPhone))){
          this.Popup=true;
          this.PopupContent="请输入正确的手机号码";
          return false;
        }
         if(!this.chose){
           this.Popup=true;
           this.PopupContent="请勾选《玩一下平台支付服务协议》";
           return false;
         }
        let  self=this;
        if(this.nextTrue){
          this.nextTrue=false;
          $.ajax({
            type : 'GET',
            url : "/api/pay/quickPayApply",
            data : {
              'country':0,
              'platformTerminal':4,
              'platformId':sessionStorage.getItem("bankPid"),
              'outTradeNo':this.Ordernumber,
              'totalFee':sessionStorage.getItem("payMomey"),
              'accNo':this.banknum,
              'buyerId':this.userInfo.userId,
              'currencyType':'CNY',
              'subject':sessionStorage.getItem("bankGameName")+"充值",
              'body':sessionStorage.getItem("bankGameName")+"充值",
              'dcType':sessionStorage.getItem("bankType"),
              'certifTp':'0'+this.CertificateNum,
              'certify_id':this.bankUserNum,
              'customerNm':this.bankUserName,
              'phoneNo':this.bankPhone,
              'expired':this.Yrar[this.YrarIndex]+this.month[this.monthIndex],
              'CVV2':this.CVN,
              'extendParams':sessionStorage.getItem('bankExtra'),
            },
            dataType : 'jsonp',
            success : function(data) {
              self.nextTrue=true;
              if(data.data.respMsg.indexOf("格式")!=-1){
                self.Popup=true;
                self.PopupContent="请输入正确的"+self.CertificateType[self.CertificateNum]+"格式";
              }else if(data.data.respCode=="0001"){
                self.Popup=true;
                self.PopupContent="填写信息与银行预留信息不一致";
              }else if(data.data.respCode=="0000"){
                sessionStorage.setItem('businessTn',data.data.tn);
                sessionStorage.setItem("bankPhone",self.bankPhone);
                sessionStorage.setItem("business",data.data.businessNo)
                self.$router.push({path:'/smsverification'});
              }else{
                self.Popup=true;
                self.PopupContent=data.data.respMsg;
              }
            },
            error : function(xhr, type) {
              return "error";
            }
          })
        }
      },
      _CertificateName(value){
        this.CertificateName=this.CertificateType[value];
        this.Certificates=false;
        this.CertificateNum=value;
      },
      _false(){
        this.dataYear=false;
      },
      Determine(){
//          debugger
        this.YrarIndex=mySwiper12.activeIndex;
        this.monthIndex=mySwiper13.activeIndex>11?11:mySwiper13.activeIndex
        this.dataYear=false;
        this.dayTrue=this.Yrar[this.YrarIndex]+"/"+this.month[this.monthIndex];
      },
      _dropdown(value){
            if(this.dropdownNum==value){
              this.dropdownNum=1;
              this.dropdown=!this.dropdown
            }else{
              this.dropdownNum=value;
              this.dropdown=!this.dropdown
            }
      },
      _input(value,name){
        if(this[name].length>value){
          this[name] = this[name].substring(0,value);
        }
      },
      _bankUserNum(){
        this.bankUserNum=this.bankUserNum.replace(/[\W]/g,'');
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .Verification {
    width: 100%;
    background-color: #F5F5F5;
    >div{
      display: block;
      display: flex;
      width: 100%;
      height: 100vh;
      flex-direction: column;
    }
    .title {
      height: 0.45rem;
      width: 100%;
      line-height: 0.45rem;
      text-align: center;
      color: #fff;
      background-color: #e7374b;
      display: block;
      display: flex;
      .back {
        height: 0.45rem;
        width: 0.45rem;
        line-height: 0.45rem;
        display: inline-block;
        text-align: center;
        color: #fff;
        font-size: 0.24rem;
      }
      .name {
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
      .zw {
        display: inline-block;
        height: 0.45rem;
        width: 0.45rem;
      }
    }
    .content{
      display: block;
      width: 100%;
      flex: 1;
      background-color: #F5F5F5;
      overflow-x: hidden;
      overflow-y: scroll;
      .Order{
        background-color: #fff;
        margin-bottom: 0.15rem;
        li{
          height:0.4rem;
          padding: 0 0.15rem;
          line-height: 0.4rem;
          color: #333;
          font-size: 0.14rem;
          display: block;
          display: flex;
          >span:nth-of-type(1){
            display: block;
            width: 0.60rem;
          }
          >span:nth-of-type(2){
            display: block;
            flex: 1;
            text-align: right;
          }
        }
        .dropdown{
          font-size: 0.12rem;
          color: #999;
          >div{
            display: block;
            display: flex;
            margin: 0 auto;
            >span:nth-of-type(2){
              display: block;
              height: 0.4rem;
              width:0.3rem ;
              background-size: 0.15rem 0.08rem;
              background-position: center;
              background-repeat: no-repeat;
            }
            .dropdowntop{
              background-image: url("./top.png");
            }
            .dropdownbuttom{
              background-image: url("./bottom.png");
            }
          }
        }
      }
      .hint{
        height: 0.3rem;
        line-height: 0.3rem;
        padding-left: 0.15rem;
        font-size: 0.12rem;
        color:#e7384a;
      }
      .notic{
        background-color: #fff;
        li{
            height:0.4rem;
            padding: 0 0.15rem;
            line-height: 0.4rem;
            color: #333;
            font-size: 0.14rem;
            display: block;
            display: flex;
            >span:nth-of-type(1){
              display: block;
              width: 0.60rem;
            }
            >span:nth-of-type(2){
              display: block;
              flex: 1;
              text-align: right;
              color: #999;
            }
            >span:nth-of-type(3){
               display: block;
               display: inline-block;
              width: 0.2rem;
              height: 100%;
              background-image: url("./right.png");
              background-position: center right;
              background-size: 0.1rem 0.2rem;
              background-repeat: no-repeat;
            }
            >input{
              display: block;
              flex: 1;
              text-align: right;
              outline: none;
            }
        }
      }
      .agreem{
        width: 70%;
        height:0.4rem;
        line-height: 0.4rem;
        margin: 0 auto;
        font-size: 0.14rem;
        display: block;
        display: flex;
        >span:nth-of-type(1){
          display: block;
          width: 0.4rem;
          height: 100%;
          background-image: url("./false.png");
          background-size: 0.2rem 0.2rem;
          background-position: center;
          background-repeat: no-repeat;
        }
        .true{
          background-image: url("./true.png") !important;
        }
        >a{
          margin-left: 0.05rem;
          color:#e7384a
        }
      }
    }
    .buttom{
      position: relative;
      bottom: 0;
      width: 100%;
      height: 0.5rem;
      background-color: #e7384a;
      color: #fff;
      line-height: 0.5rem;
      text-align: center;
      font-size: 0.20rem;
    }
    .Popup{
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 12;
      background-color: rgba(0,0,0,0.4);
      >div{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 1.9rem;
        width: 3rem;
        background-color: #fff;
        border-radius: 10px;
        >div:nth-of-type(1){
          position: relative;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          font-size: 0.15rem;
          color: #000;
          >span{
             display: block;
             display: inline-block;
            position: absolute;
            right: 0.05rem;
            top: 0;
            height: 0.4rem;
            width: 0.4rem;
            background-image:url("./xx.png") ;
            background-size: 0.2rem 0.2rem;
            background-position: center;
            background-repeat: no-repeat;
          }
        }
        >div:nth-of-type(2){
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          font-size: 0.14rem;
          color: #666;
        }
        >div:nth-of-type(3){
          width: 2.85rem;
          height: 0.35rem;
          margin: auto;
          line-height: 0.35rem;
          text-align: center;
          background-color: #e7384b;
          border-radius: 10px;
          color: #fff;
          font-size: 0.2rem;
        }

      }
    }
    .Certificates,.dataYear{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.4);
      z-index: 12;

    }
    .Certificates-content{
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
      z-index: 20;
      overflow: auto;
      text-align: center;
      transition: all 1s ease;
      li{
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.14rem;
        color: #999;
      }
    }
    .display{
      height: 1.8rem;
    }
    .dataBlack{
      bottom: 0 !important;
    }
    .dataYear-list{
      position: fixed;
      bottom:-2.4rem;
      left:0;
      z-index: 20;
      width: 100%;
      height: 2rem;
      background-color: #fff;
      display: block;
      display: flex;
      transition: all 1s ease;
      >span{
         display: block;
         display: inline-block;
        position: absolute;
        top: 1px;
        left: 1px;
        right: 1px;
        display:block;
        height: 0.4rem;
        border: 1px solid #e7384a;
        transition: all 1s ease;
      }
      >p{
        position: absolute;
        height: 0.4rem;
        width: 100%;
        top:-0.4rem;
        left: 0;
        line-height: 0.4rem;
        font-size: 0.14rem;
        text-align: center;
        display: block;
        display: flex;
        >span{
           display: block;
          flex: 1;
          background-color: #fff;
          border-bottom: 1px solid #f5f5f5;
        }
        >span:nth-of-type(1){
           display: block;
           display: inline-block;
          border-right: 1px solid #f5f5f5;
        }
      }
      >div{
        display: block;
        flex: 1;
        overflow: hidden;
        ul{
          >li{
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            font-size: 0.14rem;
            width: 100%;
          }
        }
      }
      >div:nth-of-type(1){
        border-right: 1px solid #f5f5f5;
      }
    }
  }
</style>
