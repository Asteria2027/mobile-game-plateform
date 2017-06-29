<template>
<div class="debit">
  <div class="title">
      <span class="back icon-back" @click="back"></span>
      <span class="name">划账</span>
      <span class="zw"></span>
  </div>
  <div class="debit-content">
    <div class="fail" v-if="!success">
      <span class="icon"></span>
      <span class="fail-title">加载失败</span>
      <span class="fail-name">请检查您的网络请求</span>
      <span class="bottom">重新加载</span>
    </div>
    <div class="success"  v-if="success">
      <ul>
        <li class="success-list" @click="_draw(1)">
          <span class="name">划出游戏应用:</span>
          <span class="choice-name" ></span>
          <span class="choice DrawName">{{DrawName}}</span>
          <span class="icon"></span>
        </li>
        <li class="success-list">
          <span class="name">可划出游戏币余额:</span>
          <span class="draw-balance" >{{drawBalance}}</span>
        </li>
        <li class="success-list" @click="_draw(2)">
          <span class="name">划入游戏应用:</span>
          <span class="choice-name" ></span>
          <span class="choice IncludedName">{{IncludedName}}</span>
          <span class="icon"></span>
        </li>
        <li class="success-list">
          <span>划账比例【{{from}}:{{to}}】</span>
        </li>
        <li class="success-list">
          <span class="name">划出游戏币数额:</span>
          <input type="number" placeholder="请输入" v-model="Draw" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
        </li>
        <li class="success-list">
          <span class="name">划入游戏币数额:</span>
          <span class="join-balance" >{{joinBalance}}</span>
        </li>
        <li class="success-list">
          <span class="explain">最低划账游戏币数额{{minimum}}</span>
          <span class="prompt" v-if="PromptShow">{{Prompt}}</span>
        </li>
      </ul>
    </div>
  </div>
  <div class="Included-success" v-if="IncludedSuccess">
    <div class="Included-content">
      <span class="Included-icon IncludedCg" v-if="IncludedtClass"></span>
      <span class="Included-icon IncludedSB" v-if="!IncludedtClass"></span>
      <span class="Included-name" v-if="IncludedtS">划账成功</span>
      <span class="Included-name"  v-if="!IncludedtS">划账失败</span>
    </div>
  </div>
  <div class="debit-button" v-if="success"  :class="{successButtom:debitButtom}" @click="confirm">确认划账</div>
</div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  export default{
    data(){
      return {
        success:true,
        IncludedSuccess:false,
        PromptShow:false,
        IncludedtS:true,
        IncludedtClass:true,
        minimum:0,
        from:1,
        to:1,
        DrawName:"请选择应用",
        IncludedName:"请选择应用",
        drawBalance:0,
        Draw:"",
        Prompt:"",
        debitButtom:false,
        joinBalance:0
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('debit')!=-1&&this.$route.path.indexOf('debitList')==-1){
          this.reload();
          this.IncludedSuccess=false;
          $(".debit-button").css("bottom","0rem")
        }
      }
    },
    created(){
      this.reload()
      this.$nextTick(()=>{
        let self=this;
        $(".success-list input").on("input",function(){
          if (Number($(this).val())<1&&$(this).val()!="") {
            $(this).val(1)
          }
          if(!sessionStorage.getItem("DformID")){
            self.PromptShow=true;
            self.Prompt="请选择划出的游戏";
            self.debitButtom=false;
          }else if(!sessionStorage.getItem("toId")){
            self.PromptShow=true;
            self.Prompt="请选择划入的游戏";
            self.debitButtom=false;
          }else if(Number($(this).val())>self.drawBalance){
              self.PromptShow=true;
              self.Prompt="余额不足，请重新输入";
              self.debitButtom=false;
          }else if(Number($(this).val())<self.minimum){
            self.PromptShow=true;
            self.Prompt="必须大于或等于最低划账数额";
            self.debitButtom=false;
          }else if((self.Draw/self.from)!=Math.floor((self.Draw/self.from))){
            self.PromptShow=true;
            self.Prompt="划出游戏币数额必须为"+self.from+"的倍数";
            self.debitButtom=false;
          }else{
            self.PromptShow=false;
            self.joinBalance=Math.floor(((self.Draw/self.from).toFixed(1))*self.to);
            if(sessionStorage.getItem("toId")&&sessionStorage.getItem("DformID")&& self.joinBalance>=1){
              self.debitButtom=true;
            }
          }
        })
      })

    },
    methods:{
      back(){
          if(sessionStorage.getItem("debitUrl")){
            this.$router.push({path:'/index'});
            sessionStorage.removeItem("debitUrl")
          }else{
            this.$router.push({path:'/par'});
          }
        sessionStorage.removeItem("toId");
        sessionStorage.removeItem("DformID");
      },
      _draw(value){
        this.PromptShow=false;
        this.$router.push({path:'/debitList/'+value});
      },
      reload(){
        this.from=1;
        this.to=1;
        this.Draw='';
        this.joinBalance=0;
        this.debitButtom=false;
       if(sessionStorage.getItem("DformID")){
         this.DrawName=sessionStorage.getItem("DformName")
         if(sessionStorage.getItem("DformID")==1){
            this.drawBalance=this.userInfo.lyb;
         }else{
           this.$http.post('/api/gameGoldsTransfer/getGameBalance',{country:0,platformId:sessionStorage.getItem("DformID"),userId:this.userInfo.userId},{emulateJSON:true}).then(function(res) {
             this.drawBalance=res.body.freeBalance;
           })
         }
         this.getRemitGameInfo();
       }else{
         this.DrawName="请选择应用";
         this.drawBalance=0
       }
       if(sessionStorage.getItem("toId")){
         this.IncludedName=sessionStorage.getItem("toName")
         this.getRemitGameInfo();
       }else{
         this.IncludedName="请选择应用"
       }
      },
      getRemitGameInfo(){
          if(sessionStorage.getItem("toId")&&sessionStorage.getItem("DformID")){
            this.$http.post('/api/gameGoldsTransfer/getRemitGameInfo',{country:0,fplatformId:sessionStorage.getItem("DformID"),tplatformId:sessionStorage.getItem("toId")},{emulateJSON:true}).then(function(res) {
                this.from=res.body.data.fRate;
                this.to=res.body.data.tRate;
                this.minimum=res.body.data.minAmount;
            })
          }
      },
      confirm(){
          if(this.debitButtom){
            let self=this;
            this.$http.post('/api/gameGoldsTransfer/remit',{country:0,fPlatformId:sessionStorage.getItem("DformID"),tPlatformId:sessionStorage.getItem("toId"),fGameGolds:this.Draw,terminal:4},{emulateJSON:true}).then(function(res) {
              if (res.body.result==0){
                this.$store.state.userInfo.unreads++;
                  this.IncludedSuccess=true;
                  this.IncludedtS=true;
                  this.IncludedtClass=true;
                  if(sessionStorage.getItem("DformID")==1){
                    this.userInfo.lyb-=this.Draw;
                  }
                  sessionStorage.removeItem("toId");
                  sessionStorage.removeItem("DformID");
                  setTimeout(function () {
                    self.IncludedSuccess=false;
//                    self.$router.push({path:'/par'});
                    if(sessionStorage.getItem("debitUrl")){
                      self.$router.push({path:'/index'});
                      sessionStorage.removeItem("debitUrl")
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

<style lang="less" rel="stylesheet/less">
.debit{
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
  .debit-content{
    position: absolute;
    top: 0.45rem;
    left: 0;
    bottom: 0.5rem;
    width: 100%;

    .fail{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      height: 3rem;
      width: 3rem;
      font-size: 0;
      .icon{
        display: inline-block;
        width: 1.0rem;
        height: 1.0rem;
        margin:0 1rem;
        background-image:url("./fail.png") ;
        background-size: 1.0rem 1.0rem;
        background-position: center;
      }
      .fail-title{
        display: inline-block;
        width: 100%;
        font-size: 0.20rem;
        color: #666;
        text-align: center;
        margin-top: 0.2rem;
      }
      .fail-name{
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 0.20rem;
        color:#999;
        margin-top: 0.1rem;
      }
      .bottom{
        display: inline-block;
        width: 2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        margin: 0.1rem 0.5rem;
        border: 1px solid #999;
        font-size: 0.25rem;
        color: #999;
        border-radius: 5px;
      }
    }
    .success{
      .success-list{
        font-size: 0.16rem;
        color: #1c1c1c;
        height: 0.5rem;
        line-height: 0.5rem;
        background-color: #fff;
        padding: 0 0.1rem;
        border-bottom: 1px solid #F5F5F5;
        display: block;
        display: flex;
        .draw-balance{
          display: block;
          flex: 2;
          color: #FEBB52;
          text-align: right;
        }
        >input{
          text-align: right;
           display: block;
          flex: 2;
          border: 0;
          font-size: 0.16rem;
          outline: none;
        }
        >span{
           display: block;
          display: inline-block;
          height: 0.5rem;
          line-height: 0.5rem;
        }
        .icon{
          width: 0.15rem;
          background-image:url("./right.png");
          background-size: 0.08rem 0.18rem;
          background-repeat: no-repeat;
          background-position: 0.07rem 0.15rem;
        }
        .choice-name{
          display: block;
          flex: 2;
          color: gold;
        }
        .choice{
          color:#999
        }
      }
      .success-list:nth-of-type(4), .success-list:last-of-type{
        background-color:#f5f5f5 ;
        color: #b4b4b4;
        >span{
           display: block;
           display: inline-block;
          font-size: 0.12rem;
          line-height: 0.3rem;
        }
      }
    }
  }
  .join-balance{
    text-align: right;
    display: block;
    flex: 2;
    color:#FEBB52 ;
  }
  .debit-button{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: #F39CA5;
    color: #fff;
    font-size: 0.18rem;
    text-align: center;
  }
  .debit-button:hover
  .debit-finishi{
    background-color: #E7384A;
  }
  .prompt{
    display: block;
    flex: 2;
    text-align: right;
    color: #E7384A;
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
}
</style>
