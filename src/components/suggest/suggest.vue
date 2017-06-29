<template>
	<div class="suggest">
		<div class="suggestTit">
			<span class="icon-back" @click="agenBack"></span>
			<span>建议反馈</span>
			<span></span>
		</div>
		<div class="suggestCon">
			<div class="suggestContex">
				<textarea class="textareas" rows="5" cols="7" maxlength="150" @keyup="checkLength()"  placeholder="请写下您的问题或者建议，以便我们能尽快帮助您解决问题，给您带来更好的产品体验" v-model="infoCon"></textarea>
				<div class="suggestNum">{{textleng}}/150</div>
			</div>
			<div class="photos">上传照片</div>
			<div class="tupianna">
				<div class="tupian">
					<div class="file1">
            <form id="uploadForm1">
              <input type="file" id="file" accept="image/*" name="imageFile">
            </form>
          </div>
				</div>
			</div>
			<div class="relation">
				请输入您的联系方式，以便我们方便联系您
			</div>
			<div class="phoneNum"><input type="text" maxlength="18" placeholder="手机号/QQ号" v-model="phones" /></div>
			<div class="suggestSave" @click="save()">保&nbsp;存</div>
			<div class="workTimes">
				<p>客服热线：86553188 &nbsp;&nbsp; 86553588</p>
        <p style="text-indent: 0.6rem">(9:00-18:00时段请转接6608)</p>
				<p>客服QQ：&nbsp;&nbsp;3472783795</p>
			</div>
		</div>
    <div class="loading" v-if="loading"></div>
    <div class="suggesHint" v-show="showSugges">
        {{suggesHint}}
    </div>
	</div>

</template>
<script>
	export default{
		data() {
			return{
				textleng:0,
				infoCon:"",
				phones:"",
        images:[],
        loading:false,
        showSugges:false,
        suggesHint:""
			}
		},
    created (){
      this.$nextTick(function() {
          let self=this;
          $("#file").live("change",function () {
              self.loading=true
            var formData = new FormData($( "#uploadForm1" )[0]);
            $.ajax({
              url: 'http://file.13322.com/upload/uploadImage.do',
              type: 'POST',
              data: formData,
              dataType: 'JSON',
              async: true,
              cache: false,
              contentType: false,
              processData: false,
              success: function (resultd) {
                let returndata=JSON.parse(resultd);
                if (returndata.result==0) {
                  self.loading=false
                  $("#uploadForm1").html("");
                  var img=document.createElement("img");
                  var	div=document.createElement("div");
                  div.className="img";
                  var div0=document.querySelector(".file1");
                  var div1=div0.parentNode;
                  img.setAttribute("src",returndata.url);
                  div.appendChild(img);
                  div1.insertBefore(div,div0);
                  self.images.push(returndata.url)
                  $("#uploadForm1").html('<input type="file" id="file"   accept="image/*" name="imageFile">')
                  if ($(".img")&&$(".img").length==3) {
                    $(".file1").css("display","none")
                  }
                }
              },
              error: function (returndata) {
                console.log(returndata);
              }
            })
          })
        $(".img").live("click",function(){
          $(this).remove();
          self.images.splice($.inArray($(this).children().attr("src"),self.images),1)

          if ($(".img")&&$(".img").length>=3) {
            $(".file1").css("display","none")
          }else{
            $(".file1").css("display","block")
          }
        })
      })
    },
		methods:{
			agenBack() {
				window.history.back();
			},
			checkLength() {    //获取用户输入长度
				this.textleng = $('.textareas').val().length;
				if($('.textareas').val().length>150){
					$('.textareas').val($('.textareas').val().substring(0,150));
				}
			},
			save() {
			    debugger
				if($('.textareas').val() == "" ) {
          this.showSugges=true;
					this.suggesHint='反馈内容未填写'
					let self=this
					setTimeout(function () {
            self.showSugges=false;
          },2500)
          return false
				}else if($('.phoneNum >input').val() == "" ){
          this.showSugges=true;
          this.suggesHint='手机号码未填写'
          let self=this
          setTimeout(function () {
            self.showSugges=false;
          },2500)
          return false
        }
				else{
					this.$http.post('/api/user/feedback',{country:0,contact:this.infoCon,content:this.phones,images:this.images.join(";")},{emulateJSON:true}).then(function(res){
            this.showSugges = true;
            this.suggesHint='反馈成功'
            var self = this;
            setTimeout(function () {
              self.$router.push({path:'/par'})
              self.showSugges = false;
              self.infoCon = "";
              self.phones = "" ;
            },2000)
					})
				}

			}

		},
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('suggest')!=-1){
          $(".tupian .img").remove()
        }
      }
    }
	}
</script>
<style>
	.suggest{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0; bottom: 0;
		background: #F5F5F5;
	}
	.suggestTit{
		width: 100%;
		height: 0.45rem;
		background: #E7374B;
    display: block;
		display: flex;
	}
	.suggestTit>span{
    display: block;
    display: inline-block;
		text-align: center;
		line-height: 0.45rem;
		font-size: 0.24rem;
		color: #fff;
	}
	.suggestTit>span:not(:nth-child(2)){
    display: block;
    display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
	}
	.suggestTit>span:nth-child(2){
    display: block;
		flex: 1;
	}
	.suggestContex{
		height: 1.2rem;
		position: relative;
		background: #fff;
		padding: 0.1rem;
	}
	.suggestContex>textarea{
		width: 100%;
	    height: 100%;
	    color: #d1d3d6;
	    border: 0;
	    outline: 0;
	    display: block;
	    resize: none;
	    font-size: 0.14rem;
	    line-height: 0.2rem;
	    color: #666;

	}
	.suggestNum{
		position: absolute;
		right: 0.1rem;
		bottom: 0.05rem;
		color: #666;
		font-size: 0.14rem;
	}
	.photos{
		padding: 0.15rem;
		background:#F5F5F5;
		font-size: 0.16rem;
		color: #b4b4b4;
	}
	.tupianna{
		width: 100%;
		height: 1.4rem;
		background: #fff;
	}
	.file1,.img{
		width: 1.1rem;
		height: 1.1rem;
		background: url(index06.png) no-repeat center;
		background-size: 100% 100%;
		margin:0.15rem 0.05rem;
		float: left;
    position: relative;
	}
  .img img{
    display: block;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .file1 #file{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
  }
	.relation{
		font-size: 0.16rem;
		color: #B4B4B4;
		padding:0.15rem;
	}
	.phoneNum{
		height: 0.45rem;
		background: #fff;
		font-size: 0.16rem;
		padding-left: 0.2rem;

	}
	.phoneNum>input{
		width: 100%;
		line-height: 0.45rem;
		border: 0;
		outline: none;
	}
	.suggestSave{
		width: 3rem;
		height: 0.48rem;
		background: #E7374B;
		text-align: center;
		line-height: 0.48rem;
		margin:0.2rem auto;
		color: #fff;
		font-size: 0.18rem;
		border-radius: 0.05rem;
	}
	.workTimes{
		width: 100%;
    background: #f5f5f5;
	}
	.workTimes>p{
    padding-left: 0.4rem;
		font-size: 0.12rem;
		color: #666;
		line-height: 0.2rem;

	}
  .suggest .loading {
    top:0;
    left:0;
    z-index:1000002;
    background-color:rgba(255,255,255,.6);
    width:100%;
    height:100%;
    position:fixed;
    overflow:hidden
  }
  .suggest .loading:before {
    content:"";
    background:url('./loading.acd260c1.png') center center no-repeat;
    height:.4rem;
    width:.4rem;
    top:50%;
    left:50%;
    position:fixed;
    margin:-20px 0 0 -20px;
    animation:loading .8s linear infinite;
    -webkit-animation:loading .8s linear infinite;
    background-size:100% 100%
  }
  .suggest .loading:after {
    content:"正在上传...";
    top:56%;
    left:50%;
    transform:translate(-44%,-50%);
    -ms-transform:translate(-44%,-50%);
    -webkit-transform:translate(-44%,-50%);
    -moz-transform:translate(-44%,-50%);
    -o-transform:translate(-44%,-50%);
    position:fixed;
    color:#1581cc;
    font-size:14px
  }
  @keyframes loading {
    0% {
      transform:rotate(0);
      -webkit-transform:rotate(0)
    }
    100% {
      transform:rotate(360deg);
      -webkit-transform:rotate(360deg)
    }
  }@-webkit-keyframes loading {
     0% {
       transform: rotate(0);
       -webkit-transform: rotate(0)
     }
     100% {
       transform: rotate(360deg);
       -webkit-transform: rotate(360deg)
     }
   }
  .suggesHint{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 10px;
    color: #fff;
    background-color: #e7384a;
    z-index: 20;
    height:0.64rem ;
    line-height: 0.64rem;
    width: 30%;
    font-size: 0.16rem;
    text-align: center;
    padding: 0 0.1rem;
  }
</style>
