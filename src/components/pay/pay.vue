<template>
<div class="pay pay_vertical">
  <div class="title">
    <span class="back icon-back" @click="back"></span>
    <span class="name">充值</span>
    <span class="zw"></span>
  </div>
  <div class="content" ref="pay">
    <div>
      <ul class="ueser">
        <li class="Id borderBottom-1px">
          <span>账户</span>
          <span>{{uId}}</span>
        </li>
        <li class="balance" v-if="!gameNameNone">
          <span>余额</span>
          <span class="icon"></span>
          <span>{{userInfo.lyb}}</span>
        </li>
        <li class="gameName" v-if="gameNameNone">
          <span>游戏名</span>
          <span>{{gameName}}</span>
        </li>
      </ul>
      <div class="type">
        <h3>充值金额</h3>
        <ul>
          <li class="type-list" :class="{lmxuanzhong:payxz==20}" @click="_xuanz(20)">
              20元
          </li>
          <li class="type-list" :class="{lmxuanzhong:payxz==50}" @click="_xuanz(50)">
              50元
          </li>
          <li class="type-list" :class="{lmxuanzhong:payxz==100}" @click="_xuanz(100)">
              100元
          </li>
          <li class="type-list" :class="{lmxuanzhong:payxz==200}" @click="_xuanz(200)">
              200元
          </li>
          <li class="type-list"  :class="{lmxuanzhong:payxz==300}" @click="_xuanz(300)">
             300元
          </li>
          <li class="type-list" :class="{lmxuanzhong:payxz==6}">
            <input type="number" placeholder="其他整数金额" id="money-input" v-model="moneyinput"  :class="{lmxuanzhong:payxz==6}" @click="_xuanz(6)" v-on:keyup="_input"   onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" pattern="[0-9]*" @focus="_focus()" @blur="_blur()">
          </li>
        </ul>
      </div>
      <div class="mode">
        <h3>支付方式</h3>
        <ul>
          <li class="borderBottom-1px" @click="_pt(3)"  >
            <span class="icon yhk"></span>
            <span class="name">银行卡支付</span>
            <span class="choise"><img src="./gx.png" v-if="pt==3"></span>
          </li>
          <li class="borderBottom-1px"  @click="_pt(2)"  >
            <span class="icon wx"></span>
            <span class="name">微信支付</span>
            <span class="choise"><img src="./gx.png" v-if="pt==2"></span>
          </li>
          <li class="borderBottom-1px" @click="_pt(1)" >
            <span class="icon zfb"></span>
            <span class="name">支付宝支付</span>
            <span class="choise"><img src="./gx.png" v-if="pt==1"></span>
          </li>
          <!--<li class="borderBottom-1px" @click="_pt(index,item.payWayCode)"  v-for="(item,index) in payTypeList">-->
            <!--<span class="icon yhk"><img :src="item.payWayImgUrl"></span>-->
            <!--<span class="name">{{item.payName}}</span>-->
            <!--<span class="choise"><img src="./gx.png" v-if="pt==index"></span>-->
          <!--</li>-->
          <!--<li class="borderBottom-1px" v-if="1<dropdownNum" @click="_pt(2)"  >-->
            <!--<span class="icon wx"></span>-->
            <!--<span class="name">微信支付</span>-->
            <!--<span class="choise"><img src="./gx.png" v-if="pt==2"></span>-->
          <!--</li>-->
          <!--<li class="borderBottom-1px" v-if="2<dropdownNum" @click="_pt(1)" >-->
            <!--<span class="icon zfb"></span>-->
            <!--<span class="name">支付宝支付</span>-->
            <!--<span class="choise"><img src="./gx.png" v-if="pt==1"></span>-->
          <!--</li>-->
          <!--<li class="dropdown" @click="_dropdown(6)" v-if="dropdown">-->
            <!--<div><span >查看更多支付方式</span><span v-if="dropdown" :class="{dropdownbuttom:dropdown}" @click="dropdown=false"></span><span v-if="!dropdown" :class="{dropdowntop:!dropdown}" @click="dropdown=true"></span></div>-->
          <!--</li>-->
          <!--<li class="dropdown" @click="_dropdown(3)" v-if="!dropdown">-->
            <!--<div><span >查看更多支付方式</span><span v-if="dropdown" :class="{dropdownbuttom:dropdown}" @click="dropdown=false"></span><span v-if="!dropdown" :class="{dropdowntop:!dropdown}" @click="dropdown=true"></span></div>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
  </div>
  <div class="buttom" @click="_pay" v-if="horDispper">确认支付</div>
  <div class="Popup" v-if="Popup">
    <div>请输入金额</div>
  </div>
  <div class="QRcode" v-show="QRcode">
    <span @click="QRcode=!QRcode"></span>
    <img :src="QRcodeIMG">
    <div>长按二维码支付</div>
    <div>支付成功后请在本页面等待支付结果</div>
  </div>
  <div class="wxsuccess" v-if="wxsuccess">
    <div></div>
    <div>支付成功</div>
    <div @click="wxsuccess=!wxsuccess">继续支付</div>
  </div>
  <div class="wxfaile" v-if="wxfaile">
    <div></div>
    <div>支付失败</div>
    <div @click="wxfaile=!wxfaile">重新支付</div>
  </div>
  <div class="guidPageIos" v-show="showIos" @click="showIos=!showIos"> </div>
  <div class="guidPageAndroid" v-show="showAndroid" @click="showAndroid=!showAndroid"></div>
</div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  let weixintimeout;
  let weixintimer;
  export default{
    data(){
      return {
        gameName:'',
        gameNameNone:false,
        goodsName:"",
        payxz:"20",
        moneyinput:"",
        rUrl:true,
        uId:"",
        pid:'',
        rUrlContent:'',
        to:"",
        extra:'',
        Popup:false,
        pt:3,
        source:4,
        showIos:false,
        showAndroid:false,
        dropdown:true,
        WxgoodsId:this.wxGoodsId,//微信货物id，上线要换
        payBankType:1,
        service:1,
        paltId:11111,
        hor:false,//横屏
        horDispper:true,//横屏消失
        QRcode:false,
        QRcodeIMG:'',
        wxsuccess:false,
        wxfaile:false,
        payTypeList:[],//支付方式列表
        payWayCode:'',//支付渠道
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf("pay")!=-1) {
          if(!sessionStorage.getItem("formGame")==1){
            this.notic();
          }
          let ua = window.navigator.userAgent.toLowerCase();
          let Requres = new UrlSearch();
          this.$nextTick(() => {
            clearTimeout(weixintimeout);
            clearInterval(weixintimer);
            this.QRcode=false;
            this.wxsuccess=false;
            this.wxfaile=false;
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
              $(".mode li").eq(2).hide();
            }
            if(Requres.osType=="app"){
              $(".mode li").eq(1).hide()
              $(".mode li").eq(0).hide()
              this.pt=1;
              $(".pay .title").css("display","none");
              $(".pay .content").css("top","0")
              if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                this.WxgoodsId=296
              }else{
                this.WxgoodsId=358
              }
            }else{
              this.WxgoodsId=this.wxGoodsId
            }
            this.hor=false;//横屏
            this.horDispper=true;//横屏消失
            this._dispper();
            let self = this;
            if($(window).width()>$(window).height()){
              self.hor = true;
              $('.pay').removeClass('pay_vertical').addClass('pay_Horizen');
              self._dispper();
            }else {
              $('.pay').removeClass('pay_Horizen').addClass('pay_vertical');
            }

            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
              if (window.orientation === 180 || window.orientation === 0) {
//            alert('竖屏状态！');
                self.hor = false;
                $('.pay').removeClass('pay_Horizen').addClass('pay_vertical');
                self.horDispper=true;
              }
              if (window.orientation === 90 || window.orientation === -90 ){
//            alert('横屏状态！');
                self.hor = true;
                $('.pay').removeClass('pay_vertical').addClass('pay_Horizen');
                self.horDispper=true;
              }
            }, false);
          })
        }
      }
    },
    created(){
      let Requres = new UrlSearch();
      let ua = window.navigator.userAgent.toLowerCase();
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          if(sessionStorage.getItem("wxiosnum")){
            var wxnum=Number(sessionStorage.getItem("wxiosnum"));
            wxnum++
            sessionStorage.setItem("wxiosnum",wxnum)
            console.log(sessionStorage.getItem("wxiosnum"))
            if(wxnum<=2){
              location.reload();
            }
          }else{
            sessionStorage.setItem("wxiosnum",1)
            location.reload();
          }
        }
      }
      this.$nextTick(() => {

        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          $(".mode li").eq(2).hide();
        }else{
          this.$http.post("/api/payWayInfo/list", {country: 0}, {emulateJSON: true}).then((response) => {
            response=response.body;
            if(response.result==0){
              this.payTypeList=response.data;
              this.payWayCode=response.data[0].payWayCode;
            }
          })
        }
        this.notic();
        this._dispper();
        let self = this;
        if($(window).width()>$(window).height()){
          self.hor = true;
          $('.pay').removeClass('pay_vertical').addClass('pay_Horizen');
          self._dispper();
        }
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
          if (window.orientation === 180 || window.orientation === 0) {
  //            alert('竖屏状态！');
            self.hor = false;
            $('.pay').removeClass('pay_Horizen').addClass('pay_vertical');
            self.horDispper=true;
          }
          if (window.orientation === 90 || window.orientation === -90 ){
  //            alert('横屏状态！');
            self.hor = true;
            $('.pay').removeClass('pay_vertical').addClass('pay_Horizen');
            self.horDispper=true;
          }
        }, false);
        if(Requres.osType=="app"){
          $(".mode li").eq(1).hide()
          $(".mode li").eq(0).hide()
          this.pt=1
          $(".pay .content").height(height-$(".pay .buttom").height());
          $(".pay .title").css("display","none");
          $(".pay .content").css("top","0");
          $(".pay .content").height(height-$(".pay .buttom").height());
          if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
            this.WxgoodsId=296
          }else{
            this.WxgoodsId=358
          }
        }else{
          this.WxgoodsId=this.wxGoodsId;
        }
        if(Requres.gid==100001||Requres.gid==100002){
          $(".mode li").eq(0).hide();
          this.pt=2
        }
//        let ua = window.navigator.userAgent.toLowerCase();
//        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
//          $(".mode li").eq(1).hide();
//          if(Requres.gid==100001||Requres.gid==100002) {
//            $(".mode li").eq(0).hide();
//            this.pt = 3
//          }
//        }
      });
    },
    methods:{
      _dropdown(value){
        this.dropdownNum=value;
        this.dropdown=!this.dropdown;
      },
      _pt(value,payWayCode){
        this.pt=value;
      },
      back(){
        let Requres = new UrlSearch();
        if(sessionStorage.getItem("bankreturnUrl")&&sessionStorage.getItem("bankreturnUrl").indexOf("10100")!=-1){
          window.history.back()
        }else if(Requres.out_id!=null&&Requres.no!=null){
          window.history.go(-1)
        }else if(Requres.gid==this.guessingId){
          this.$router.push({path:'/games/'+Requres.gid+"?token="+$.fn.cookie("token")})
        }else if(Requres.gid!=null){
          if(Requres.gid==this.GamingPayId){//10040
            sessionStorage.removeItem("GamingPayId")
            window.history.back();
          }else{
            let day=new Date().getTime();
            window.location.href=decodeURIComponent(Requres.rUrl)+"?uid=" + this.userInfo.userId + "&time=" + day + "&sign=" + hex_md5("time=" + day + "&uid=" + this.userInfo.userId + "&247926bd0efd4dbcb247ed2f5bf47ccb");
          }
        }else{
          this.$router.push({path:'/par'})
        }
      },
//      _initScroll(){
//        this.pay =new Bscroll(this.$refs.pay,{
//          click:true
//        });
//      },
      notic(){
        let Requres = new UrlSearch();

        if(Requres.gid==this.GamingPayId){
          sessionStorage.setItem("GamingPayId","1")
        }
        if (Requres.rUrl!=null&&Requres.rUrl.toString().length>1) {
          this.payBankType=3;
          sessionStorage.setItem("formGame","1")
          this.to=0;
          this.extra=JSON.stringify({
            "pId":Requres.gid,
            "uid":Requres.uid,
            "ext":Requres.ext?Requres.ext:"",
            "money":Requres.money,
            "callbackUrl":Requres.callbackUrl?Requres.callbackUrl:""
          })
          this.gameNameNone=true;
          this.gameName=decodeURI(decodeURI(Requres.gname));
          this.goodsName=encodeURI(Requres.product);
          this.pid=Requres.gid;
          this.rUrlContent=decodeURIComponent(Requres.rUrl);
          if (Requres.osType=="app"){
            $(".pay .title").hide();
            $(".pay .content").css("top","0")
          }
          this.uId=Requres.uid;
          var UA = navigator.userAgent;
          var forIOS = function(){
            if(!UA.match(/iPad/) && !UA.match(/iPhone/) && !UA.match(/iPod/)){return;}
            if($('#wrapper').length){return;}
            $('body').children().not('script').wrapAll('<div id="wrapper" style="height: 100%"></div>');
          }();
          if(Requres.money!=null){
            $("#money-input").attr("readonly","readonly");
            this.rUrl=false
            if(Requres.money==20||Requres.money==50||Requres.money==100||Requres.money==200||Requres.money==300){
              this.payxz=Requres.money;
            }else{
              this.payxz=6;
              this.goodsName="乐盈币充值";
              this.moneyinput=Requres.money;
            }
          }else{
            if (Requres.gid==this.guessingId) {
              this.pid=Requres.gid;
              this.gameName="体育竞猜";
              if(this.userInfo.userId){
                this.uId=this.userInfo.userId;
              }else{
                this.$http.post("/api/user/getUserInfo", {country: 0, terminal: 4}, {emulateJSON: true}).then((response) => {
                  response = response.body;
                  if(response.result==0){
                    this.uId=response.user.userId;
                  }
                })
              }
              this.rUrlContent=this.Url+"/games/"+Requres.gid;
            }
          }
        }else if(Requres.out_id!=null&&Requres.no!=null){
          this.paltId=4177;
          this.payBankType=3
          sessionStorage.setItem("formGame","1")
          this.gameNameNone=true;
          this.to=0;
          this.source="4177";
          $("#money-input").attr("readonly","readonly");
          this.rUrl=false
          this.extra=JSON.stringify({
            "pId":Requres.game_id,
            "out_id":Requres.out_id,
            "game_id":Requres.game_id,
            "no":Requres.no,
            "ext":Requres.ext,
            "total_fee":Requres.total_fee,
            "callbackUrl":Requres.callbackUrl?Requres.callbackUrl:""
          })
          let id="4"+Requres.game_id;
          this.goodsName=encodeURI(Requres.goods_name);
          this.pid=Requres.game_id;
          this.uId=Requres.out_id;
          this.rUrlContent=this.Url+"/games/"+Requres.game_id;
          this.$http.post('/api/index/getGameById',{country:0,platformId:id},{emulateJSON:true}).then(function(res) {
            this.gameName=res.body.data.name;
          });
          if(Requres.total_fee==200||Requres.total_fee==500||Requres.total_fee==1000||Requres.total_fee==2000||Requres.total_fee==3000){
            this.payxz=Requres.total_fee/10;
          }else{
            this.payxz=6;
            this.moneyinput=Requres.total_fee/10;
          }
        }else{
          this.to=1;
          if(Requres.userId){
            this.uId=Requres.userId;
            this.userInfo.lyb=Requres.lyb;
            this.$http.post("/api/login/tokenLogin", {country: 0, token: Requres.token}, {emulateJSON: true}).then((response) => {
            })
          }else{
            if(this.userInfo.userId){
              this.uId=this.userInfo.userId;
            }else{
              this.$http.post("/api/user/getUserInfo", {country: 0, terminal: 4}, {emulateJSON: true}).then((response) => {
                response = response.body;
                if(response.result==0){
                  this.uId=response.user.userId;
                }
              })
            }
          }

          if(this.pt==3){
            this.pid=31111;
          }else{
            this.pid=11111;
          }
          this.gameName="玩一下";
          this.goodsName="乐盈币充值";
          this.extra="";
          this.rUrlContent=this.Url+"/par";
//          this.rUrlContent="http://market.13322.com/active/act/thActive/playSummer.html?userId="+this.uId;
        }
      },
      _xuanz(index){
        if(this.rUrl){
          this.payxz=index;
          if(index!=6){
            this.moneyinput="";
            $("#money-input").blur()
          }
        }
      },
      _pay(){
        if(this.payxz==6&&this.moneyinput==""){
          this.Popup=true;
          let self=this;
          setTimeout(function () {
            self.Popup=false;
          },2500)
          return false;
        }
        let Requres = new UrlSearch();
        if(this.payxz==6){
          let tm=this.moneyinput
        }else{
          let tm =this.payxz
        }
        if (Requres.rUrl){

        }
        let pt=this.pt; // 1:支付宝支付 2：微信支付0:银联
        let uId=this.uId;//用户id
        let pId=this.pid;//应用id
        let pName=this.gameName;//应用名称
        let tm;
        if(this.payxz==6){
          tm=this.moneyinput;//总金额
        }else{
          tm=this.payxz
        }
        let pro= this.goodsName;//商品描述
        let sId;//服id
        let rUrl=this.rUrlContent;//支付完跳转链接
        let to=this.to;//0充值到游戏，1充值乐盈币
        let extra=this.extra;//透传参数
        if(pt==1){
          let ua = window.navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
              this.showIos = true;
              this.showAndroid = false
            }else if(/(Android)/i.test(navigator.userAgent)){
              this.showIos = false;
              this.showAndroid = true;
            }
            return false
          }
          $.ajax({
            type : 'GET',
            url : "/api/pay/pay",
            data : {
              'money' : tm,
              'type' : pt,
              'game' : pId,
              'gameName' : pName,
              'to' : to,
              'service' : "1",
              'account' : uId,
              'source' :this.source,
              'sonPlatformId' : sId,
              'extra' : extra,
              'returnUrl' : rUrl
            },
            dataType : 'jsonp',
            timeout : 1000,
            success : function(data) {
              if(data.result==0){
                sessionStorage.removeItem("formGame");
                var pElement = document.createElement("div");
                pElement.innerHTML = data.data;
                document.body.appendChild(pElement);
                document.forms[0].submit();
                pElement.remove();
              }
            },
            error : function(xhr, type) {
              return "error";
            }
          })
        }else if(pt==2){
          let ua = window.navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            if(pId=="31111"){
              pId=""
            }
            let self=this;
            $.ajax({
              type : 'POST',
              url : self.pcUrl+"/charge/swiftpassPay",
              data : {
                userId:uId,
                applyAmount:'0.1',
                currencyType:"CNY",
                gameId:pId,
                platformType:14,
                changeType:1,
                service:'pay.weixin.native',
                body:pName,
                terminal:4
              },
              dataType : 'json',
              success : function(data) {
                if(data.resultCode==0){
                  weixintimeout=setTimeout(function () {
                    clearInterval(weixintimer);
                    self.QRcode=false;
                    self.wxsuccess=false
                    self.wxfaile=true
                  },90000)
                  weixintimer=setInterval(function () {
                    $.ajax({
                      type : 'POST',
                      url : self.pcUrl+"/charge/commonPayoutQuery",
                      data : JSON.stringify({
                        outTradeNo:data.outTradeNo,
                        businessNo:data.businessNo,
                        platformType:''
                      }),
                      contentType:"application/json",
                      dataType : 'json',
                      success : function(data) {
                        if(data.tradeStatus==1){
                          clearTimeout(weixintimeout);
                          clearInterval(weixintimer);
                          self.QRcode=false;
                          self.wxsuccess=true;
                          self.wxfaile=false;
                        }else if(data.tradeStatus==2){
                          clearTimeout(weixintimeout);
                          clearInterval(weixintimer);
                          self.QRcode=false;
                          self.wxsuccess=false;
                          self.wxfaile=true;
                        }
                      },
                      error : function(xhr, type) {
                        return "error";
                      }
                    })
                  },5000)
                  self.QRcodeIMG=data.codeImgUrl;
                  self.QRcode=true;
                }

              },
              error : function(xhr, type) {
                return "error";
              }
            })
          }else{
            $.ajax({
              type : 'GET',
              url : "/api/pay/pay",
              data : {
                'money' : 0.1,
                'type' : pt,
                'game' : pId,
                "goodsId":this.WxgoodsId,
                'gameName' : pName,
                'to' : to,
                'service' : "1",
                'account' : uId,
                'sonPlatformId' : sId,
                'extra' : extra,
                'returnUrl' : rUrl,
                "wechatPayType":2,
                'source' :this.source
              },
              dataType : 'jsonp',
              timeout : 1000,
              success : function(data) {
                sessionStorage.removeItem("formGame");
                top.location.href="https://payh5.bbnpay.com/h5pay/way.php?"+data.data;
              },
              error : function(xhr, type) {
                return "error";
              }
            })
          }
        }else if(pt==3){
          sessionStorage.setItem("payMomey",0.1);
          sessionStorage.setItem("bankPid",31111);
          sessionStorage.setItem('bankGameName',pName);
          sessionStorage.setItem('bankTo',to);
          sessionStorage.setItem("busyId",uId)
          sessionStorage.setItem('bankExtra',uId+"|"+this.payBankType+"|"+pId+"|4|"+this.paltId+"|null|"+(extra?extra:"null"));
          sessionStorage.setItem('bankreturnUrl',rUrl);
          sessionStorage.removeItem("bankName");
          sessionStorage.removeItem("banknum");
          this.$router.push({path:'/backCardPay'})
        }

      },
      _input(){

        if(this.moneyinput.indexOf(".")!=-1){
          this.moneyinput=this.moneyinput.replace(".","")
        }
        if (this.moneyinput<1&&this.moneyinput!="") {
          this.moneyinput=1
        }else if(this.moneyinput>100000){
          this.moneyinput=100000;
        }
      },
      _focus(){
//        if(this.hor){
//          this.horDispper=false;
//        }
      },
      _blur(){
        this.horDispper=true;
      },
      _dispper(){
        let self = this;
        if(this.hor){
          let height = $(window).height();
          $(window).resize(function () {
            if(height<=$(window).height()){
              self.horDispper=true;
            }else {
              self.horDispper=false;
            }
          });
        }
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }


</script>

<style lang="less" rel="stylesheet/less" scoped>

    /*横屏时*/
      .pay_Horizen {
        height: 100%;
        width: 100%;
        display: block;
        display: flex;
        flex-direction: column;
        background-color: rgb(245,245,245);
        .title {
          position: relative;
          top: 0;
          left: 0;
          z-index: 11;
          height: 0.225rem;
          width: 100%;
          line-height: 0.225rem;
          text-align: center;
          color: #fff;
          background-color: #e7374b;
          display: block;
          display: flex;
        .back {
          height: 0.225rem;
          width: 0.225rem;
          line-height: 0.225rem;
          display: inline-block;
          text-align: center;
          color: #fff;
          font-size: 0.12rem;
        }
        .name {
          display: block;
          height: 0.225rem;
          line-height: 0.225rem;
          text-align: center;
          color: #fff;
          font-size: 0.1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 2;
        }
        .zw {
          display: inline-block;
          height: 0.225rem;
          width: 0.225rem;
        }
      }
      .content{
        display: block;
        position: relative;
        width: 100%;
        flex: 1;
        left: 0;
        background-color: #F5F5F5;
        overflow-x: hidden;
        overflow-y: scroll;
        .ueser{
          background-color: #fff;
          >li{
             display: block;
             display: flex;
             height: 0.251rem;
             line-height: 0.251rem;
             font-size: 0.09rem;
             padding:0 0.065rem ;
            >span{
               display: block;
             }
            >span:nth-of-type(1){
               width: 0.35rem;
               height: 0.251rem;
               line-height: 0.251rem;
             }
            .icon{
              width: 0.2rem;
              height: 0.251rem;
              background-image:url("./czlyb.png") ;
              background-size: 0.125rem 0.125rem;
              background-position: center left;
              background-repeat: no-repeat;
            }
          }
          .gameName{
            >span:nth-of-type(1){
               display: block;
               display: inline-block;
               margin-right: 0.05rem;
             }
          }
          >li:nth-of-type(1)>span:nth-of-type(2){
             display: block;
             display: inline-block;
             color: #b4b4b4;
           }
          >li:nth-of-type(2)>span:nth-of-type(3){
             display: block;
             display: inline-block;
             color: #fc9f00;
           }
        }
        .type{
          h3{
            font-size: 0.09rem;
            padding-left: 0.065rem;
            height: 0.20rem;
            line-height: 0.20rem;
            color: #b4b4b4;
          }
          ul{
            overflow: hidden;
            margin: 0;
            padding: 0;
            background-color: #fff;
            display: block;
            /*display: flex;*/
            /*flex-wrap: wrap;*/
            /*justify-content: space-around;*/
            padding: 0.10rem 0;
            li{
              display: block;
              width: 30%;
              background-color: #fff;
              height: 0.2rem;
              color: #999;
              line-height: 0.2rem;
              font-size: 0.08rem;
              text-align: center;
              margin-top: 0.035rem;
              margin-bottom: 0.035rem;
              border:1px solid #999;
              float: left;
              margin-left:2.2%;
              >span:nth-of-type(1){
                 display: block;
                 height: 0.25rem;
                 background-size:0.25rem 0.25rem ;
                 background-repeat: no-repeat;
                 background-position: center;
               }
              .type-lyb{
                display: block;
                line-height: 0.19rem;
                height: 0.19rem;
                text-align: center;
                color: #FFB212;
              }
              .type-money{
                display: block;
                height: 0.1525rem;
                line-height: 0.1525rem;
                color: #fff;
                background-color:#E7384A ;
                text-align: center;
              }
              h5{
                height: 0.151rem;
                text-align: center;
                line-height: 0.151rem;
                font-size: 0.08rem;
                color: #E7384A;
                margin: 0;
                margin-top: 0.11rem;
                font-weight: 100;
              }
              input{
                display: block;
                font-size: 0.06rem;
                color: #000;
                height: 0.2rem;
                line-height: normal;
                line-height: 0.2rem;
                text-align: center;
                border: 0;
                width: 100%;
                outline: 0;
              }
            }

            >li:nth-of-type(1)>span:nth-of-type(1){
               display: block;
               display: inline-block;
               background-image: url("lyb01.png");
             }
            >li:nth-of-type(2)>span:nth-of-type(1){
               display: block;
               display: inline-block;
               background-image: url("lyb02.png");
             }
            >li:nth-of-type(3)>span:nth-of-type(1){
               display: block;
               display: inline-block;
               background-image: url("lyb03.png");
             }
            >li:nth-of-type(4)>span:nth-of-type(1){
               display: block;
               display: inline-block;
               background-image: url("lyb04.png");
             }
            >li:nth-of-type(5)>span:nth-of-type(1){
               display: block;
               display: inline-block;
               background-image: url("lyb05.png");
             }
            .lmxuanzhong {
              background-image: url("./xuanzhong.png");
              background-size:0.1rem 0.1rem ;
              background-repeat: no-repeat;
              background-position: right bottom;
              border-color: #e7384a;
            }
          }
        }
        .mode{
          h3{
            font-size: 0.09rem;
            padding-left: 0.065rem;
            height: 0.20rem;
            line-height: 0.20rem;
            color: #b4b4b4;
          }
          ul{
            li{
              height: 0.25rem;
              line-height: 0.25rem;
              background-color: #fff;
              display: block;
              display: flex;
              >span{
                 display: block;
               }
              .icon{
                display: inline-block;
                width: 0.25rem;
                height: 0.25rem;
                background-size: 0.15rem 0.15rem;
                background-position: center;
                background-repeat: no-repeat;
              }
              .zfb{
                background-image: url("./zfb.png");
              }
              .wx{
                background-image: url("./wx.png");
              }
              .yhk{
                background-image: url("./yhk.png");
              }
              .name{
                height: 0.25rem;
                line-height: 0.25rem;
                display: block;
                flex: 2;
                font-size: 0.08rem;
              }
              .choise{
                display: inline-block;
                width: 0.15rem;
                height: 0.15rem;
                margin-right: 0.025rem;
                margin-top: 0.05rem;
                img{
                  display: block;
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .dropdown{
              height: 0.1525rem;
              font-size: 0.06rem;
              line-height: 0.1525rem;
              color: #999;
              text-align: center;
              >div{
                 display: block;
                 display: flex;
                 margin: 0 auto;
                >span:nth-of-type(2){
                   display: block;
                   height: 100%;
                   width:0.15rem ;
                   background-size: 0.1rem 0.05rem;
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
        }
      }
      .buttom{
        position: relative;
        bottom: 0;
        left:0;
        width: 100%;
        height: 0.225rem;
        line-height: 0.225rem;
        text-align: center;
        font-size: 0.1rem;
        color: #fff;
        background-color: #e7384a;

      }
      .Popup{
        position:fixed ;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        z-index: 12;
        >div{
           position: absolute;
           top:0;
           left: 0;
           right: 0;
           bottom: 0;
           margin: auto;
           width: 0.75rem;
           height: 0.75rem;
           line-height: 0.75rem;
           text-align: center;
           font-size: 0.09rem;
           background-color: #e7384a;
           color: #fff;
           border-radius: 5px;
         }
      }
    }


    .pay_vertical {
      height: 100%;
      width: 100%;
      display: block;
      display: flex;
      flex-direction: column;
      background-color: rgb(245,245,245);
      .title {
        position: relative;
        top: 0;
        left: 0;
        z-index: 11;
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
      position: relative;
      width: 100%;
      flex: 1;
      left: 0;
      background-color: #F5F5F5;
      overflow-x: hidden;
      overflow-y: scroll;
    .ueser{
      background-color: #fff;
    >li{
       display: block;
       display: flex;
       height: 0.52rem;
       line-height: 0.52rem;
       font-size: 0.18rem;
       padding:0 0.13rem ;
    >span{
       display: block;
     }
    >span:nth-of-type(1){
       width: 0.7rem;
       height: 0.52rem;
       line-height: 0.52rem;
     }
    .icon{
      width: 0.4rem;
      height: 0.52rem;
      background-image:url("./czlyb.png") ;
      background-size: 0.25rem 0.25rem;
      background-position: center left;
      background-repeat: no-repeat;
    }
    }
    .gameName{
    >span:nth-of-type(1){
       display: block;
       display: inline-block;
       margin-right: 0.1rem;
     }
    }
    >li:nth-of-type(1)>span:nth-of-type(2){
       display: block;
       display: inline-block;
       color: #b4b4b4;
     }
    >li:nth-of-type(2)>span:nth-of-type(3){
       display: block;
       display: inline-block;
       color: #fc9f00;
     }
    }
    .type{
      h3{
        font-size: 0.18rem;
        padding-left: 0.13rem;
        height: 0.40rem;
        line-height: 0.40rem;
        color: #b4b4b4;
      }
      ul{
        overflow: hidden;
        margin: 0;
        padding: 0;
        background-color: #fff;
        display: block;
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        /*justify-content: space-around;*/
        padding: 0.20rem 0;
        li{
          width: 30%;
          float: left;
          background-color: #fff;
          height: 0.4rem;
          color: #999;
          line-height: 0.4rem;
          font-size: 0.16rem;
          text-align: center;
          margin-top: 0.07rem;
          margin-bottom: 0.07rem;
          border:1px solid #999;
          float: left;
          margin-left:2.2%;
          >span:nth-of-type(1){
             display: block;
             height: 0.51rem;
             background-size:0.5rem 0.5rem ;
             background-repeat: no-repeat;
             background-position: center;
           }
          .type-lyb{
            display: block;
            line-height: 0.38rem;
            height: 0.38rem;
            text-align: center;
            color: #FFB212;
          }
          .type-money{
            display: block;
            height: 0.35rem;
            line-height: 0.35rem;
            color: #fff;
            background-color:#E7384A ;
            text-align: center;
          }
          h5{
            height: 0.32rem;
            text-align: center;
            line-height: 0.32rem;
            font-size: 0.16rem;
            color: #E7384A;
            margin: 0;
            margin-top: 0.22rem;
            font-weight: 100;
          }
          input{
            display: block;
            font-size: 0.12rem;
            color: #000;
            height: 0.4rem;
            line-height: normal;
            line-height: 0.4rem;
            text-align: center;
            border: 0;
            width: 100%;
            outline: 0;
          }
        }

        >li:nth-of-type(1)>span:nth-of-type(1){
           display: block;
           display: inline-block;
           background-image: url("lyb01.png");
         }
        >li:nth-of-type(2)>span:nth-of-type(1){
           display: block;
           display: inline-block;
           background-image: url("lyb02.png");
         }
        >li:nth-of-type(3)>span:nth-of-type(1){
           display: block;
           display: inline-block;
           background-image: url("lyb03.png");
         }
        >li:nth-of-type(4)>span:nth-of-type(1){
           display: block;
           display: inline-block;
           background-image: url("lyb04.png");
         }
        >li:nth-of-type(5)>span:nth-of-type(1){
           display: block;
           display: inline-block;
           background-image: url("lyb05.png");
         }
        .lmxuanzhong {
          background-image: url("./xuanzhong.png");
          background-size:0.2rem 0.2rem ;
          background-repeat: no-repeat;
          background-position: right bottom;
          border-color: #e7384a;
        }
      }
    }
    .mode{
    h3{
      font-size: 0.18rem;
      padding-left: 0.13rem;
      height: 0.40rem;
      line-height: 0.40rem;
      color: #b4b4b4;
    }
    ul{
    li{
      height: 0.51rem;
      line-height: 0.50rem;
      background-color: #fff;
      display: block;
      display: flex;
    >span{
       display: block;
     }
    .icon{
      display: inline-block;
      width: 0.51rem;
      height: 0.50rem;
      background-size: 0.3rem 0.3rem;
      background-position: center;
      background-repeat: no-repeat;
      >img{
        width: 100%;
        height: 100%;
      }
    }
    .zfb{
      background-image: url("./zfb.png");
    }
    .wx{
      background-image: url("./wx.png");
    }
    .yhk{
      background-image: url("./yhk.png");
    }
    .name{
      height: 0.5rem;
      line-height: 0.5rem;
      display: block;
      flex: 2;
      font-size: 0.16rem;
    }
    .choise{
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.05rem;
      margin-top: 0.1rem;
    img{
      display: block;
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    }
    }
    .dropdown{
      height: 0.35rem;
      font-size: 0.12rem;
      line-height: 0.35rem;
      color: #999;
      text-align: center;
    >div{
       display: block;
       display: flex;
       margin: 0 auto;
    >span:nth-of-type(2){
       display: block;
       height: 100%;
       width:0.3rem ;
       background-size: 0.2rem 0.1rem;
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
    }
    }
    .buttom{
      position: relative;
      bottom: 0;
      left:0;
      width: 100%;
      height: 0.45rem;
      line-height: 0.45rem;
      text-align: center;
      font-size: 0.2rem;
      color: #fff;
      background-color: #e7384a;

    }
      .Popup{
        position:fixed ;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        z-index: 12;
        >div{
           position: absolute;
           top:0;
           left: 0;
           right: 0;
           bottom: 0;
           margin: auto;
           width: 1.5rem;
           height: 0.5rem;
           line-height: 0.5rem;
           text-align: center;
           font-size: 0.18rem;
           background-color: #e7384a;
           color: #fff;
           border-radius: 10px;
         }
      }
    }
    #wrapper {
      height:100%;
      -webkit-overflow-scrolling:touch;
      overflow:auto
    }
    .guidPageIos{
      width:100%;
      height:100%;
      position: fixed;
      top:0;
      left:0;
      background:url("ios.jpg") no-repeat center;
      background-size:100% 100%;
      z-index: 11;
    }
    .QRcode{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: #0E0E0E;
      z-index: 100;
      >span{
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        height: 0.3rem;
        width: 0.3rem;
        display: block;
        background-image: url("./xx.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
      >img{
        display: block;
        width: 3rem;
        height: 3rem;
        position: absolute;
        top: 1rem;
        left: 0.4rem;
        z-index: 9999;
      }
      >div:nth-of-type(1){
        height: 0.5rem;
        width: 100%;
        line-height: 0.5rem;
        color: #fff;
        font-size: 0.18rem;
        position: absolute;
        text-align: center;
        top: 4.5rem;
      }
      >div:nth-of-type(2){
        height: 0.5rem;
        width: 100%;
        line-height: 0.5rem;
        color: #fff;
        font-size: 0.18rem;
        position: absolute;
        text-align: center;
        top: 5.0rem;
      }
    }
    .wxsuccess{
      position: fixed;
      top: 0.45rem;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: #fff;
      z-index: 50;
      font-size: 0.18rem;
      text-align: center;
      >div:nth-of-type(1){
        height: 1.2rem;
        width: 1.2rem;
        margin: auto;
        background-image: url("./paysuccess.png");
        background-size: 1.2rem 1.2rem;
        background-position: center;
        background-repeat: no-repeat;
        margin-top: 1rem;
      }
      >div:nth-of-type(2){
        color: #00E80B;
        height: 0.3rem;
        line-height: 0.3rem;
      }
      >div:nth-of-type(3){
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.15rem;
        color: #fff;
        background-color: #e7384a;
      }
    }
    .wxfaile{
      position: fixed;
      top: 0.45rem;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: #fff;
      z-index: 50;
      font-size: 0.18rem;
      text-align: center;
      >div:nth-of-type(1){
        height: 1.2rem;
        width: 1.2rem;
        margin: auto;
        background-image: url("./payfail.png");
        background-size: 1.2rem 1.2rem;
        background-position: center;
        background-repeat: no-repeat;
        margin-top: 1rem;
      }
      >div:nth-of-type(2){
        color: #e7384a;
        height: 0.3rem;
        line-height: 0.3rem;
      }
      >div:nth-of-type(3){
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.15rem;
        color: #fff;
        background-color: #e7384a;
      }
    }
    .guidPageAndroid{
      width:100%;
      height:100%;
      position: fixed;
      top:0;
      left:0;
      background:url("Android.jpg") no-repeat center;
      background-size:100% 100%;
      z-index: 11;
    }
</style>
