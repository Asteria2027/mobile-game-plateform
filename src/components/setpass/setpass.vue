<template>
    <div id="setpass">
      <div class="title">
        <span class="back icon-back" @click="backUrl"></span>
        <span class="name">设置新密码</span>
        <span class="zw"></span>
      </div>
      <div class="setpassContext">
        <div class="setPwd">
          <span>新密码：</span>
          <input type="password" @focus="_pwdFocus" placeholder="8-14个字符，区分大小写" maxlength="14" onpaste="return false" onkeyup="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))">
          <i class="eyeClose" @click="isPwdShow"></i>
        </div>
      </div>
      <div class="setPwdHint" v-if="isHint">{{hint}}</div>
      <div class="complete" @click="_complete">完成</div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        hint:'请输入新的密码',
        isHint:false
      }
    },
    watch:{
      "$route": function () {
        this.hint='请输入新的密码';
        this.isHint=false;
        $('.setPwd input').val('');
      }
    },
    methods:{
      backUrl(){
        window.history.back();
      },
      isPwdShow(){
        if($('.setPwd i').hasClass('eyeClose')){
          $('.setPwd i').removeClass('eyeClose').addClass('eyeOpen');
          $('.setPwd input').attr('type','text');
        }else {
          $('.setPwd i').removeClass('eyeOpen').addClass('eyeClose');
          $('.setPwd input').attr('type','password');
        }
      },
      _complete(){
        var pwd = $('.setPwd input').val();
        if(!pwd){
          this.hint = '请输入新的密码';
          this.isHint = true;
        }else{
          if(pwd.length<=14&&pwd.length>=8){
            if(RegExp(/^[A-Za-z0-9]*$/g).test(pwd)){
              let phone = sessionStorage.getItem('playoneRegisterPhone');
              sessionStorage.removeItem('playoneRegisterPhone');
              this.$http.post('/api/forgetPassword/updatePassword',{country:0,newPassword:hex_md5(pwd).toUpperCase(),account:phone,accountType:3},{emulateJSON:true}).then(function (res) {
                res = res.body;
                if(res.result==0){
                  sessionStorage.setItem('fromsetpass',1);
                  this.hint = '密码修改成功';
                  this.isHint = true;
                  let _this = this;
                  setTimeout(function () {
                    _this.hint = '';
                    _this.isHint = false;
                    _this.$router.push('/login?setpass=1');
                    _this.getUserInfo();
                    _this.getUserMessage();
                  },2000);
                }
              })
            }else {
              this.hint = '密码仅能为数字,字母';
              this.isHint = true;
            }
          }else {
            this.hint = '密码长度不能低于八位';
            this.isHint = true;
          }
        }
      },
      _pwdFocus(){
        this.hint = '';
        this.isHint = false;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #setpass {
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow: hidden;
    background: #f5f5f5;;
    z-index: 2;
  }
  #setpass .title {
    position: relative;
    height: 0.45rem;
    line-height: 0.45rem;
    width: 100%;
    text-align: center;
    background: #e7384a;
    font-size: 0.2rem;
    color: #fff;
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
  #setpass .setpassContext {
    margin:0.1rem 0;
    font-size: 0.16rem;
    background: #fff;
    .setPwd {
      height: 0.5rem;
      line-height:0.5rem;
      padding-left: 0.1rem;
      .eyeClose {
        display: inline-block;
        float: right;
        height: 50%;
        width: 0.3rem;
        background: url("./biyan1.png") no-repeat;
        background-size: 100%;
        margin-top: 0.1rem;
        margin-right: 0.1rem;
      }
      .eyeOpen {
        display: inline-block;
        float: right;
        height: 50%;
        width: 0.3rem;
        background: url("./lgm1.png") no-repeat;
        background-size: 100%;
        margin-top: 0.1rem;
        margin-right: 0.1rem;
      }
    }
  }
  #setpass .setPwdHint {
    text-align: center;
    color: red;
    line-height:0.3rem;
    font-size: 0.13rem;
  }

  #setpass .complete {
    width: 90%;
    margin: 0 auto;
    font-size: .2rem;
    margin-top: .2rem;
    text-align: center;
    border: 1px solid #d1d3d6;
    border-radius: .1rem;
    padding: .15rem 0;
    background: #e7384a;
    color: #fff;
  }
</style>
