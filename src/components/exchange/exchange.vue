<template>
<div class="exchange">
  <div class="title">
    <span class="back icon-back" @click="back"></span>
    <span class="name">兑换乐盈券</span>
    <span class="zw"></span>
  </div>
  <div class="exchange-content">
    <ul>
      <li @click="exchangeList"><span>选择兑换游戏:</span><span>{{name}}</span><span class="icon"></span></li>
      <li><span>可兑换游戏币余额:</span><span>{{freeBalance}}</span></li>
      <li><span>兑换比例【{{exchangeRate}}:1】</span></li>
      <li><span>兑换游戏币数额:</span><input placeholder="请输入" type="number" v-model="inputNum" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></li>
      <li><span>兑换乐盈券数额:</span><span>{{leyingNum}}</span></li>
      <li><span>最低兑换游戏币数额{{minNum}}</span><span v-if="ehintNone">{{ehint}}</span></li>
    </ul>
  </div>
  <div class="buttom" :class="{successButtom:debitButtom}" @click="exchange">立即兑换</div>
  <div class="Included-success" v-if="IncludedSuccess">
    <div class="Included-content">
      <span class="Included-icon IncludedCg" v-if="IncludedtClass"></span>
      <span class="Included-icon IncludedSB" v-if="!IncludedtClass"></span>
      <span class="Included-name" v-if="IncludedtS">兑换成功</span>
      <span class="Included-name"  v-if="!IncludedtS">兑换失败</span>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  export default{
    data(){
      return {
        leyingNum:0,
        name:"请选择应用",
        ehint:"余额不足，请重新输入",
        IncludedSuccess:false,
        freeBalance:"",
        exchangeRate:1,
        inputNum:'',
        minNum:0,
        ehintNone:false,
        IncludedtClass:true,
        IncludedtS:true,
        debitButtom:false
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('exchange')!=-1){
          this.leyingNum=0;
          $(".exchange .buttom").css("bottom","0rem")
          this.name="请选择应用";
          this.ehint="余额不足，请重新输入";
          this.IncludedSuccess=false;
          this.freeBalance="";
          this.exchangeRate=1;
          this.inputNum='';
          this.minNum=0;
          this.ehintNone=false;
          this.IncludedtClass=true;
          this.IncludedtS=true;
          this.debitButtom=false;
          this.getGameBalance()
        }
      }
    },
    created(){
     this.getGameBalance();
      this.$http.get('/api/menu/list').then((response)=> {
        response=response.body;
        if(response.result==0){
          for(let i =0;i<response.data.length;i++){
            if(response.data[i].menuType==3){
              if(response.data[i].status!=1){
                 window.history.back();
              }
            }
          }
        }
       })
      this.$nextTick(()=>{
          let self=this;

          $(".exchange-content li input").on("input",function () {
            if ($(this).val()<1&&$(this).val()!="") {
              $(this).val(1)
            }
            if(!sessionStorage.getItem("exchangeId")){
              self.ehintNone=true;
              self.ehint="请选择兑换的游戏";
              self.debitButtom=false;
            }else if($(this).val()%self.exchangeRate!=0){
              self.ehintNone=true;
              self.ehint="兑换游戏币数额必须为"+self.exchangeRate+"的倍数";
              self.debitButtom=false;
            }else if($(this).val()>self.freeBalance){
                self.ehintNone=true;
                self.ehint="余额不足，请重新输入";
               self.debitButtom=false;
            }else if($(this).val()<self.minNum){
              self.ehintNone=true;
              self.ehint="必须大于或等于最低兑换数额";
              self.debitButtom=false;
            }else{
              self.ehintNone=false;
              self.debitButtom=true;
            }
            self.leyingNum=Math.floor(((self.inputNum/self.exchangeRate).toFixed(1)));
          })
      })
    },
    methods:{
      back(){
        this.leyingNum=0;
        this.name="请选择应用";
        this.IncludedSuccess=false;
        this.freeBalance="";
        this.exchangeRate=1;
        this.inputNum='';
        this.minNum=0;
        this.ehintNone=false;
        this.IncludedtClass=true;
        this.IncludedtS=true;
        this.debitButtom=false;
        let Requres = new UrlSearch();
        if(sessionStorage.getItem("dJ")){
            window.location.href=sessionStorage.getItem("dJ")
        }else if(sessionStorage.getItem("debitUrl")){
          this.$router.push({path:'/index'});
          sessionStorage.removeItem("debitUrl");
        }else if(sessionStorage.getItem("returnurl")){
//          this.$router.push({path:'/par'});
          this.$router.push({path:'/par'});
        }else if(Requres.url){
            window.location.href=decodeURIComponent(Requres.url);
        }else{
          window.history.back();
        }
        sessionStorage.removeItem("exchangeId")
      },
      getGameBalance(){
        if(sessionStorage.getItem("exchangeId")){
            this.name=sessionStorage.getItem("exchangename")
          this.$http.post('/api/gameGoldsTransfer/getGameBalance',{country:0,platformId:sessionStorage.getItem("exchangeId")},{emulateJSON:true}).then(function(res) {
              this.freeBalance=res.body.freeBalance;
          });
          this.$http.post('/api/gameGoldsToLyqTransfer/getExchangeGameInfo',{country:0,platformId:sessionStorage.getItem("exchangeId")},{emulateJSON:true}).then(function(res) {
            this.exchangeRate=res.body.data.exchangeRate;
            this.minNum=res.body.data.minAmount;
          });
        }
      },
      exchangeList(){
        this.$router.push({path:'/exchangeList'});
      },
      exchange(){
        if(this.debitButtom){
          this.$http.post('/api/gameGoldsToLyqTransfer/exchange',{country:0,fPlatformId:sessionStorage.getItem("exchangeId"),fGameGolds:this.inputNum,terminal:4},{emulateJSON:true}).then(function(res) {
                let self=this;
                if(res.body.result==0){
                  this.$store.state.userInfo.unreads++;
                  this.IncludedSuccess=true;
                  this.IncludedtS=true;
                  this.IncludedtClass=true;
                  this.userInfo.lyq+=Number(this.leyingNum);
                  sessionStorage.removeItem("exchangeId");
                  setTimeout(function () {
                    self.IncludedSuccess=false;
//                    self.$router.push({path:'/par'});
                    if(sessionStorage.getItem("dJ")){
                      window.location.href=sessionStorage.getItem("dJ")
                    }else if(sessionStorage.getItem("debitUrl")){
                      self.$router.push({path:'/index'});
                      sessionStorage.removeItem("debitUrl");
                    }else{
                      self.$router.push({path:'/par'});
                    }
                  },2500)
                }else{
                  this.IncludedSuccess=true;
                  this.IncludedtS=false;
                  this.IncludedtClass=false;
                  setTimeout(function () {
                    self.IncludedSuccess=false;
                  },2500)
                }
          })
        }
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }

</script>

<style  lang="less" rel="stylesheet/less">
.exchange{
  position: absolute;
  top:0rem;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 20;
  background-color: #F5F5F5;
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
  .exchange-content{
    position: absolute;
    top: 0.45rem;
    bottom: 0.5rem;
    left: 0;
    width: 100%;
    overflow: auto;
    ul{
      margin-bottom: 1rem;
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
        >span:nth-of-type(2){
           display: block;
          flex: 2;
          text-align: right;
        }
        >input{
           display: block;
          flex: 2;
          text-align: right;
          flex: 2;
          border: 0;
          font-size: 0.16rem;
          outline: none;
        }
        .icon{
          width: 0.15rem;
          background-image:url("./right.png");
          background-size: 0.08rem 0.18rem;
          background-repeat: no-repeat;
          background-position: 0.07rem 0.15rem;
        }
      }
      li:nth-of-type(2),li:nth-of-type(5){
        >span:nth-of-type(2){
           display: block;
           display: inline-block;
          color: gold;
        }
      }
      li:nth-of-type(3),li:nth-of-type(6){
        background-color:#f5f5f5 ;
        color: #b4b4b4;
        >span{
           display: block;
           display: inline-block;
          font-size: 0.12rem;
          line-height: 0.3rem;
        }
      }
      li:nth-of-type(6){
        >span:nth-of-type(2){
           display: block;
           display: inline-block;
          color: #e7384a;
        }
      }
    }
    >div{
        text-align: center;
      >h3{
        font-size: 0.18rem;
        color: #666;
        font-weight: normal;
        line-height: 0.5rem;
        height: 0.5rem;
      }
      p{
        font-size: 0.14rem;
        line-height: 0.30rem;
        height: 0.30rem;
        color: #999;
      }
    }
  }
  .buttom{
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #fff;
    background-color: #f39ca5;
    font-size: 0.2rem;
  }
  .Included-success{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.4);
    z-index: 100;
    .Included-content{
      height: 2rem;
      width: 2rem;
      border-radius: 0.1rem;
      background-color: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      font-size: 0;
      .Included-name{
        font-size: 0.18rem;
        display: inline-block;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        width: 100%;
        color: #444;
      }
      .Included-icon{
        display: inline-block;
        height: 1rem;
        width: 1rem;
        margin: 0.2rem 0.5rem 0 0.5rem;
        background-size: 1rem 1rem;
        background-repeat: no-repeat;
      }
    }
  }
  .successButtom{
    background-color: #e7384a;
  }
  .IncludedCg{
    background-image: url('./success.png');
  }
  .IncludedSB{
    background-image: url('./SB.png');
  }
  .successButtom{
    background-color: #e7384a;
  }
}
</style>
