<template>
    <div id="notic">
      <div id="cjTitle">
        <div class="title">
          <i class="iconBack" @click="backUrl"></i>
          <h3 v-cloak>{{noticTitle}}</h3>
          <i class="share" @click="_share"></i>
        </div>
      </div>
      <div class="notic-context">
        <h3 v-cloak>{{textTitle}}</h3>
        <div class="noticTime" v-cloak>{{time|formatDate}}</div>
        <div><img :src="imgSrc" v-if="imgSrc"></div>
        <p v-cloak>{{textContent}}</p>
        <div class="contentHtml">
          <div v-html="contentHtml"></div>
        </div>
      </div>
      <div class="shareRoute" v-if="isShare">
        <div class="weibo" @click="_shareWeibo(imgSrc,textTitle)">
          <div></div>
          <p>微博</p>
        </div>
        <div class="qq" @click="_shareQQ(imgSrc,textTitle)">
          <div></div>
          <p>QQ</p>
        </div>
        <div class="qqzone" @click="_shareQQZone(imgSrc,textTitle)">
          <div></div>
          <p>QQ空间</p>
        </div>
      </div>
      <div class="layer" v-if="isShare" @click="_exitShare"></div>
      <div class="fff-Layer" v-if="completed"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        noticTitle:'',
        textTitle:'',
        time:'',
        imgSrc:'',
        textContent:'',
        contentHtml:'',
        isShare:false,//分享状态
        completed:true
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('notic')!=-1){
          $('#notic').css('height','auto');
          this.noticTitle='';
          this.textTitle='';
          this.time='';
          this.imgSrc='';
          this.textContent='';
          this.contentHtml='';
          this.isShare=false;
          this.completed = true;
          this.reload();
        }
      }
    },
    created(){
      this.reload();
    },
    methods:{
      reload(){
        let id = this.$route.params.id;
        let newsid = this.$route.params.newsid;
        if(id==1){
          this.noticTitle = "游戏公告";
          this.$http.post('/api/index/gameNoticeById',{country:0,noticeId:newsid},{emulateJSON:true}).then(function (res) {
            res = res.body;
            this.completed = false;
            if(res.result==0){
//              console.log(res);
              this.textTitle = res.data.title;
              this.time = res.data.creatorTime;
              this.imgSrc = res.data.imgUrl;
              this.contentHtml = res.data.content;
            }
          });
        }else if(id==2){
          this.noticTitle = "活动公告";
          this.$http.post('/api/userMsg/getMsgInfo',{country:0,msgId:newsid},{emulateJSON:true}).then(function (res) {
            res = res.body;
            this.completed = false;
            if(res.result==0){
              this.textTitle = res.data.title;
              this.time = res.data.time;
              this.imgSrc = res.data.image;
              this.contentHtml = res.data.content;
            }
          });
        }else if(id==3){
          this.noticTitle = "公告消息";
          this.$http.post('/api/activity/getActivityId',{country:0,noticeId:newsid},{emulateJSON:true}).then(function (res) {
            res = res.body;
            this.completed = false;
            if(res.result==0){
//              console.log(res);
              this.textTitle = res.data.title||res.data.explain;
              this.time = res.data.creatorTime;
              this.imgSrc = res.data.imageUrl;
              this.textContent = res.data.explain;
              this.contentHtml = res.data.content;
            }
          });
        }else if(id==4){
          this.noticTitle = "新闻消息";
          this.$http.post('/api/activity/getActivityId',{country:0,noticeId:newsid},{emulateJSON:true}).then(function (res) {
            res = res.body;
            this.completed = false;
            if(res.result==0){
//              console.log(res);
              this.textTitle = res.data.title||res.data.explain;
              this.time = res.data.creatorTime;
              this.imgSrc = res.data.imageUrl;
              this.textContent = res.data.explain;
              this.contentHtml = res.data.content;
            }
          });
        }
      },
      backUrl(){
        window.history.back();
      },
      _share(){
        this.isShare = true;
        let clientH=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        $('#notic').css('height',clientH);
      },
      _exitShare(){
        this.isShare = false;
        $('#notic').css('height','auto');
      },
      _shareWeibo(picurl, title){
        let url = escape(window.location.href);
        picurl = picurl?picurl:'http://public.13322.com/23c192a0.png';
        setTimeout(function () {
          window.open("","_blank").location = 'http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picurl;
        },20)
      },
      _shareQQ(picurl, title){
        let url = escape(window.location.href);
        picurl = picurl?picurl:'http://public.13322.com/23c192a0.png';
        setTimeout(function () {
          window.open("","_blank").location='http://connect.qq.com/widget/shareqq/index.html?url='+url+'&showcount=0&summary='+title+'&title='+title+'&pics='+picurl+"&style=201&width=50&height=50";
        },20)
      },
      _shareQQZone(picurl, title, miaoshu){
        let url = escape(window.location.href);
        picurl = picurl?picurl:'http://public.13322.com/23c192a0.png';
        setTimeout(function () {
          window.open("","_blank").location='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+picurl+'&title='+title;
        },20)
      }
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        let month = Number(date.getMonth())+1<10?'0'+ (Number(date.getMonth())+1):Number(date.getMonth())+1;
        let days = Number(date.getDate())<10?'0'+Number(date.getDate()):Number(date.getDate());
        let hours = Number(date.getHours())<10?'0'+Number(date.getHours()):Number(date.getHours());
        let minutes = Number(date.getMinutes())<10?'0'+Number(date.getMinutes()):Number(date.getMinutes());
        return date.getFullYear()+'-'+month+'-'+days+'  '+hours+':'+minutes;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  [v-cloak] {
    display: none;
  }

  .fff-Layer {
    position: fixed;
    top: 0;
    left:0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #FFFFFF;
  }

  #notic {
    width: 100%;
    overflow: hidden;
  }
  #notic .title {
    position: relative;
    height: 0.45rem;
    line-height: 0.45rem;
    width: 100%;
    text-align: center;
    background: #e7384a;
    font-size: 0.24rem;
    display: block;
    display: flex;
    color: #fff;
    h3 {
      font-weight: 500;
      display: block;
      flex: 1;
    }
    .iconBack {
      display: block;
      width: 0.45rem;
      height:100%;
      background: url("./back.png") no-repeat center;
      background-size: 0.24rem 0.24rem;
    }
    .share{
      display: block;
      width: 0.4rem;
      height:100%;
      background: url("./Share.png") no-repeat center ;
      background-size: 60% ;
    }
  }
  #notic .notic-context {
    padding: 0.1rem 0.2rem;
  }
  #notic .notic-context h3 {
    display: block;
    font-size: .18rem;
    color: #1c1c1c;
    font-weight: 900;
    line-height:0.4rem;
  }
  #notic .notic-context .noticTime {
    color: #b4b4b4;
    font-size: 0.14rem;
    line-height:0.3rem;
    font-weight: 700;
  }
  #notic .notic-context div:nth-child(3){
    width: 100%;
    img {
      display: block;
      display: inline-block;
      width: 100%;
    }
  }
  #notic .notic-context p {
    font-size: 0.16rem;
    line-height:0.25rem;
    text-indent: 0.2rem;
  }
  #notic .contentHtml {
    width: 100%;
    >div {
      width: 100%;
     }
    img {
      display: block;
      display: inline-block;
      width: 100%;

    }
    p {
      font-size: 0.16rem;
      line-height:0.25rem;
    }
  }
  #notic .layer {
    height:100%;
    width: 100%;
    position: fixed;
    top: 0;
    left:0;
    z-index: 100;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);
  }
  #notic .shareRoute {
    position: fixed;
    bottom: 0;
    left:0;
    z-index: 101;
    display: block;
    display: flex;
    height: 1.2rem;
    width: 100%;
    background: #ffffff;
    text-align: center;
    color: #6a6a6a;
  }
  #notic .weibo {
    display: block;
    flex: 1;
    padding-top:0.2rem;
    div {
      height: 0.6rem;
      width: 0.6rem;
      margin:0 auto;
      margin-bottom:0.05rem;
      background: url("./mission04.png") no-repeat center center;
      background-size: 100% 100%;
    }
  }
  #notic .qq {
    display: block;
    flex: 1;
    padding-top:0.2rem;
    div {
      height: 0.6rem;
      width: 0.6rem;
      margin:0 auto;
      margin-bottom:0.05rem;
      background: url("./mission01.png") no-repeat center center;
      background-size: 100% 100%;
    }
  }
  #notic .qqzone {
    display: block;
    flex:1;
    padding-top:0.2rem;
    div {
      height: 0.6rem;
      width: 0.6rem;
      margin:0 auto;
      margin-bottom:0.05rem;
      background: url("./mission02.png") no-repeat center center;
      background-size: 100% 100%;
    }
  }
</style>
