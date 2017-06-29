<template>
	<div class="alterxxdz">
		<div class="xxdzTit">
			<span class="icon-back" @click="agenBack"></span>
			<span>详细地址</span>
			<span @click="addresssave">保存</span>
		</div>
		<div class="xxdzCon-wrap">
			<div class="xxdzCon">
				<textarea  placeholder="请输入您的详细地址" v-model="xxdz" @focus="xxdzF" id="xxdz1" maxlength="60"/>
				<span class="icon-lgcs" @click="xxdxcolse"></span>
			</div>
			<div class="xxdzHit">{{addressHint}}</div>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	export default{
		data() {
			return{
				xxdz:"",
				addressHint:""
			}
		},
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf("alterxxdz")!=-1) {
            if(sessionStorage.getItem("alterxxdz")){
                this.xxdz=sessionStorage.getItem("alterxxdz");
            }
        }
      }
    },
    created(){
      if(sessionStorage.getItem("alterxxdz")){
        this.xxdz=sessionStorage.getItem("alterxxdz");
      }
      this.$nextTick(function() {
        var text=document.getElementById("xxdz1");
        this._autoTextarea(text);
      })
    },
		methods:{
			agenBack() {
				window.history.back();
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
			addresssave() {
				if(this.xxdz.trim() == ""){
					this.addressHint = "请输入详细地址"
				}else{
					this.userInfo.address = this.xxdz;
					this.$http.post('/api/user/updateUserInfo',{country:0,address:this.xxdz},{emulateJSON:true}).then(function(res) {
						this.$router.push('/personalData');
					})
				}
			},
			xxdxcolse() {
				this.xxdz = "";
			},
			xxdzF() {
				this.addressHint = "";
			}


		},
		 computed: {
          ...mapState(['userInfo', 'isLogin'])

       },
	}
</script>
<style>
	.alterxxdz{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;bottom: 0;
		background: #F5F5F5;
	}
	.xxdzTit{
		width: 100%;
		height: 0.45rem;
		background: #E7374B;
    display: block;
		display: flex;
	}
	.xxdzTit>span{
    display: block;
    display: inline-block;
		text-align: center;
		line-height: 0.45rem;
		font-size: 0.24rem;
		color: #fff;
	}
	.xxdzTit>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
	}
	.xxdzTit>span:nth-child(2){
    display: block;
		flex: 1;
	}
	.xxdzTit>span:nth-child(3){
    display: block;
    display: inline-block;
		font-size: 0.14rem;
	}
	.xxdzCon{
		width: 100%;
		background: #fff;
    display: block;
		display: flex;
	}
	.xxdzCon>textarea{
    display: block;
		flex: 1;
    resize: none;
		padding-left:0.15rem;
		font-size: 0.16rem;
    border: none;
    height: 0.3rem;
    margin-top: 0.11rem;
    line-height: 0.3rem;
    outline: none;
	}
	.xxdzCon>span{
    display: block;
    display: inline-block;
		width: 0.2rem;
		height: 0.2rem;
		background: #ccc;
		text-align: center;
		line-height: 0.2rem;
		color: #fff;
		margin:0.15rem;
		border-radius: 0.5rem;
	}
	.xxdzHit{
		width: 100%;
		padding-top:0.1rem;
		text-align: center;
		color: red;
		font-size: .16rem;
	}
</style>
