<template>
  <div class="games">
    <iframe  id='mainFrame' name='mainFrame'  width='100%' height='100%' frameborder='0' ></iframe>
  </div>
</template>

<script>
  export default{
    data(){
        return{
          gamesSrc:''
        }
    },
    watch:{
        '$route':function () {
          if(this.$route.path.indexOf('games')!=-1){
           this._games();
            this.$nextTick(function () {
              if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
              }else{
                if(/chrome\/\d+/i.test(navigator.userAgent)){
                  let num = navigator.userAgent.match(/chrome\/\d+/i)[0].replace(/chrome\//i,"");
                  if(num>56&&num<61){
                    $('.games').height(document.body.clientHeight);
                  }
                }
              }
            });
          }
        }
    },
    created(){
      this._games()
      this.$nextTick(function () {
        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        }else{
          if(/chrome\/\d+/i.test(navigator.userAgent)){
            let num = navigator.userAgent.match(/chrome\/\d+/i)[0].replace(/chrome\//i,"");
            if(num>56&&num<61){
              $('.games').height(document.body.clientHeight);
            }
          }
        }
      });
    },
    methods:{
        _games(){
          if (this.$route.params.id==this.GamingId||this.$route.params.id==this.guessingId){
            this.$http.post('/api/index/getGameById',{country:0,platformId:this.$route.params.id},{emulateJSON:true}).then(function (res) {
                if(this.$route.params.id==this.GamingId){
                  document.domain=this.domain;
                  if($('#wrapper').length){return;}
                  $('.games').children().not('script').wrapAll('<div id="wrapper"></div>');
                    let Requres = new UrlSearch();
                    if(window.location.search){
                      $("#mainFrame").attr("src",res.body.data.sourUrl+window.location.search+"&comeFrom=lyyyx")
                    }else{
                      $("#mainFrame").attr("src",res.body.data.sourUrl+"?comeFrom=lyyyx")
                    }
//                  }
                  if($('.games').height()<$('body').height()-10){
                    $('.games').height($('body').height());
                  }
//                  alert($('#mainFrame').height()+'  '+$('.games').height()+'  '+$('body').height()+'  '+$('html').height());
                }else{
                  $("#mainFrame").attr("src",res.body.data.sourUrl+window.location.search+"?token="+$.fn.cookie("token"))
                  if($('.games').height()<$('body').height()-10){
                    $('.games').height($('body').height());
                  }
                }

            })
          }else{
            let id=this.$route.params.id;
            if(id.length==6){
                id=id.substring(1,6)
            }
            this.$http.post('/api/login/getGameUrl',{country:0,gameId:id},{emulateJSON:true}).then(function (res) {
              $("#mainFrame").attr("src",res.body.gameUrl)
              if($('.games').height()<$('body').height()-10){
                $('.games').height($('body').height());
              }
            })
          }

        }
    }
  }

</script>

<style>
  .games{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #fff;
  }
  #wrapper{
    height:100%;
    -webkit-overflow-scrolling:touch;
    overflow:hidden;
  }
</style>
