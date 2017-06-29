<template>
<div class="profile">
  <div class="title">
    <span class="back icon-back" @click="back"></span>
    <span class="name">新增收获地址</span>
    <span class="zw"></span>
  </div>
  <div class="content">
    <ul>
      <li class="name borderBottom-1px">
        <input placeholder="收货人姓名" maxlength="5" id="name">
        <span class="icon" @click="reset('收货人姓名','name')"></span>
      </li>
      <li class="phone borderBottom-1px">
        <input type="number" placeholder="手机号码"  maxlength="11" id="phone">
        <span class="icon" @click="reset('手机号码','phone')"></span>
      </li>
      <li class="area borderBottom-1px" id="demo1">
        <input id="value1" class="region" readonly="readonly"  type="text" value="省、市、县">
        <span class="iconleft"></span>
      </li>
      <li class="address borderBottom-1px">
        <textarea placeholder="详细地址" maxlength="80"  id="address"></textarea>
        <span class="icon"  @click="reset('详细地址','address')"></span>
      </li>
      <li class="default borderBottom-1px">
        <span class="default-icon" :class="{checkout:checkout}" @click="checkout=!checkout"></span>
        <span>保存默认地址</span>
      </li>
      <li class=" borderBottom-1px">
        <div class="buttom" @click="Preservation">保存</div>
      </li>
      <li class="Prompt" v-if="Prompt">
        {{PromptValue}}
      </li>
    </ul>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
  import {are} from '../../assets/common/js/Area'
  import { mapState } from 'vuex';
  export default{
    data(){
      return {
        checkout:false,
        Prompt:false,
        PromptValue:"请输入正确的收货人信息"
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('profile')!=-1){
         this.Prompt=false;
         this.oldAddress();
        }
      }
    },
    created(){
      this.oldAddress();
      let ar= are().LArea;
      this.$nextTick(function() {
        var text=document.getElementById("address");
        this._autoTextarea(text);
        ar.init({
          'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
          'valueTo': '#value1', //选择完毕后id属性输出到该位置
          'keys': {
            id: 'name',
            name: 'name'
          }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
          'type': 1, //数据源类型
          'data': are().Data //数据源
        });
        ar.value=[1,13,3];//控制初始位置，注意：该方法并不会影响到input的value
      })

    },
    methods:{
      oldAddress(){
        let Requres = new UrlSearch();
        if (Requres.addressId){
          this.getAddress(Requres.addressId)
        }else{
          $("#value1").val("省、市、县")
          $("#name").val("")
          $("#phone").val("")
          $("#address").val("")
          this.checkout=false
        }
      },
      back(){
        window.history.back()
      },
      getAddress(id){
        this.$http.post("/api/pointShopUser/queryAddress",{country:0,userId:this.userInfo.userId},{emulateJSON:true}).then((res) => {
          for(let i=0;i<res.body.data.length;i++){
            if(res.body.data[i].id==id){
              document.getElementById("name").value=res.body.data[i].name;
              document.getElementById("phone").value=res.body.data[i].tel;
              document.getElementById("value1").value=res.body.data[i].province+","+res.body.data[i].city+","+res.body.data[i].street;
              document.getElementById("address").value=res.body.data[i].detail;
              if(res.body.data[i].last==0){
                  this.checkout=true;
              }
            }
          }
        })
      },
      Preservation(){
          let _region=document.getElementById("value1").value;
          let _name=document.getElementById("name").value;
          let _tel=document.getElementById("phone").value;
          let _address=document.getElementById("address").value;
          if(!_name||!_tel||_region=="省、市、县"||!_address){
            this.Prompt=true;
            this.PromptValue="请输入完整的收货人信息"
            return false
          }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(_tel))){
            this.Prompt=true;
            this.PromptValue="请输入正确的手机号码"
            return false
          }
          let region=_region.split(",")
          let Default=1;
          let Requres = new UrlSearch();
          if(this.checkout){
            Default=0;
          }
          if(Requres.addressId){
            this.$http.post("/api/pointShopUser/addAddress",{country:0,userId:this.userInfo.userId,province:region[0],city:region[1],street:region[2]?region[2]:"",detail:_address,tel:_tel,last:Default,id:Requres.addressId,name:_name},{emulateJSON:true}).then((res) => {
                if(res.body.result==0){
                  this.Prompt=false;
                  this.PromptValue="";
                  window.history.back()
                }
            })
          }else{
            this.$http.post("/api/pointShopUser/addAddress",{country:0,userId:this.userInfo.userId,province:region[0],city:region[1],street:region[2]?region[2]:"",detail:_address,tel:_tel,last:Default,name:_name},{emulateJSON:true}).then((res) => {
              if(res.body.result==0){
                this.Prompt=false;
                this.PromptValue="";
                window.history.back()
              }
            })
          }

      },
      _autoTextarea(elem, extra, maxHeight){
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
          isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
          addEvent = function (type, callback) {
            elem.addEventListener ?
              elem.addEventListener(type, callback, false) :
              elem.attachEvent('on' + type, callback);
          },
          getStyle = elem.currentStyle ? function (name) {
              var val = elem.currentStyle[name];

              if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                  parseFloat(getStyle('paddingTop')) -
                  parseFloat(getStyle('paddingBottom')) + 'px';
              };

              return val;
            } : function (name) {
              return getComputedStyle(elem, null)[name];
            },
          minHeight = parseFloat(getStyle('height'));

        elem.style.resize = 'none';

        var change = function () {
          var scrollTop, height,
            padding = 0,
            style = elem.style;

          if (elem._length === elem.value.length) return;
          elem._length = elem.value.length;

          if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
          };
          scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

          elem.style.height = minHeight + 'px';
          if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
              height = maxHeight - padding;
              style.overflowY = 'auto';
            } else {
              height = elem.scrollHeight - padding;
              style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
          };
        };
        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
      },
      reset(value,how){
          if(how=="value1"){
            document.getElementById("value1").value=value;
          }else{
            document.getElementById(how).value=""
            document.getElementById(how).setAttribute("placeholder",value)
          }
      }

    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  @import "../../assets/common/css/dizhi.css";
.profile{
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
      display: block;
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
    top: 0.45rem;
    width: 100%;
    li{
      padding:0.12rem 0.1rem ;
      font-size: 0.16rem;
      line-height: 0.3rem;
      display: block;
      display: flex;
      input{
        display: block;
        flex: 2;
      }
      textarea{
        display: block;
        flex: 2;
        border: none;
        resize: none;
        outline: none;
        font-size: 0.18rem;
        overflow: hidden;
        height: 0.18rem;
      }
      .icon{
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        background-image: url("./xx.png");
        background-size: 0.2rem 0.2rem;
        background-repeat: no-repeat;
        background-position: center;
      }
      .default-icon{
        display: inline-block;
        height: 0.3rem;
        width: 0.3rem;
        background-image:url("./wgx.png") ;
        background-size: 0.25rem 0.25rem;
        background-position: center;
        background-repeat: no-repeat;
        margin-right:0.1rem;
      }
      .checkout{
        background-image: url("./gx.png");
      }
      .buttom{
        width: 90%;
        height: 0.5rem;
        line-height: 0.5rem;
        margin: auto;
        text-align: center;
        background-color: #e7384a;
        color:#fff;
        font-size: 0.2rem;
        border-radius: 5px;
      }
    }
    .Prompt{
      text-align: center;
      color: #e7384a;
      display: block;
    }
    .area{
      >input:nth-of-type(1){
         display: block;
        flex: 2;
      }
      >span:nth-of-type(1){
         display: block;
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        background-image: url("./myjt.png");
        background-size: 0.1rem 0.2rem;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}

</style>
