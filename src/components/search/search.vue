<template>
    <div id="search">
      <div class="searchTitle">
        <div class="seachInput" >
          <input type="text" placeholder="请输入您要搜索的游戏" @input="_searchContext" autofocus="autofocus">
          <i class="iconClose" @click="_clear"></i>
        </div>
        <div class="cancel" @click="_cancel">
          取消
        </div>
      </div>
      <div class="searchHint">
        <div>
          <p>最近搜索</p>
          <p @click="_clearCache"><i class="icon-qk"></i>&nbsp;清空</p>
        </div>
        <ul>
          <li v-for="(item,index) in searchCache" v-if="index<3" @click="_cacheClick(index)">{{item}}</b></li>
        </ul>
      </div>
      <split></split>
      <div class="searchContext">
        <h3 class="borderBottom-1px">热门搜索</h3>
        <ul>
          <li class="borderBottom-1px" v-for="(item,index) in searchRcommend" v-if="index<4" @click="_goUrl(item.gameId?item.gameId:item.id)"><span>{{index+1}}</span><b>{{item.name}}</b></li>
        </ul>
        <div class="borderBottom-1px" v-if="isShow">未找到您搜索的游戏</div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">

  import split from '../split/split.vue';

  export default {
    data(){
      return {
        searchRcommend:[],
        isShow:false,
        searchCache:[]
      }
    },
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf('search')!=-1){
          $('.seachInput input').focus();
        }
      }
    },
    created(){
      this._init();
      if (this.searchCache.length||window.localStorage.getItem('PlyaSearchCache')){
        this.searchCache = window.localStorage.getItem('PlyaSearchCache').split(',');
      }
    },
    methods:{
      _init(){
        this.$http.post('/api/index/getIndexGameByModelId', {country:0,terminal:4,modelId:2},{emulateJSON:true}).then(function (res) {
          res = res.body;
          if(res.result===0){
            for(let j =0 ; j<res.data.list.length;j++){
              if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal){
                this.searchRcommend.push(res.data.list[j]);
              }
            }
            if(!res.data){
              this.$http.post('/api/index/getIndexGameByModelId', {country:0,terminal:4,modelId:1},{emulateJSON:true}).then(function (res) {
                res = res.body;
                if(res.result===0){
                  for(let j =0 ; j<res.data.list.length;j++){
                    if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal){
                      this.searchRcommend.push(res.data.list[j]);
                    }
                  }
                }
              });
            }
          }else {
            this.$http.post('/api/index/getIndexGameByModelId', {country:0,terminal:4,modelId:1},{emulateJSON:true}).then(function (res) {
              res = res.body;
              if(res.result===0){
                for(let j =0 ; j<res.data.list.length;j++){
                  if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal){
                    this.searchRcommend.push(res.data.list[j]);
                  }
                }
              }
            });
          }
        });
      },
      _cancel(){
          $('.seachInput input').blur();
          let self=this
          setTimeout(function () {
            self.$router.push({path:'/index'});
          },300)
      },
      _clear(){
        $('.seachInput input').val('');
        this._searchContext();
        this.isShow = false;
      },
      _goUrl(id){
        sessionStorage.setItem('gamelist','/search');
        this.$router.push({path:'/gamelist/'+id});
        let cache = $('.seachInput input').val();
        if(cache){
          let temp = true;
          for(let i=0;i<this.searchCache.length;i++){
            if(this.searchCache[i]==cache){
              temp = false;
            }
          }
          if(temp){
            this.searchCache.unshift(cache);
            if(this.searchCache.length>3){
              this.searchCache.pop();
            }
          }
        }
      },
      _searchContext(){
        let key = $('.seachInput input').val();
        if(key){
          this.$http.post('/api/index/getIndeqbyx',{country:0,terminal:4,keyword:key},{emulateJSON:true}).then(function (res) {
            res = res.body;
            this.searchRcommend = [];
            for(let j =0 ; j<res.data.list.length;j++){
              if(res.data.list[j].platformTerminal!=1&&this.platformTerminal!=res.data.list[j].platformTerminal){
                this.searchRcommend.push(res.data.list[j]);
              }
            }
            if(!res.data.list.length){
              this.isShow = true;
              window.localStorage.setItem('PlyaSearchCache',this.searchCache);
            }else {
              this.isShow = false;
            }
          })
        }else {
          this.searchRcommend = [];
          this._init();
          this.isShow = false;
        }
      },
      _cacheClick(index){
        $('.seachInput input').val(this.searchCache[index]);
        this._searchContext();
      },
      _clearCache(){
        this.searchCache = [];
        window.localStorage.removeItem('PlyaSearchCache');
      }
    },
    components:{
      split
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  #search {
    position:absolute;
    top:0;
    right: 0;
    bottom: 0;
    left:0;
    overflow: hidden;
    background: #f5f5f5;
    z-index: 2;
  }
  #search .searchTitle {
    height: 0.42rem;
    width: 100%;
    background: #e7384a;
    padding:0.06rem 0;
    padding-bottom: 0;
    overflow:hidden;
    position: fixed;
    top:0;
    left:0;
    display: block;
    display:flex;
    .seachInput {
      /*margin:0 auto;*/
      /*width: 65%;*/
      display: block;
      flex:1;
      margin-left: 0.5rem;
      padding:0.01rem 0.12rem ;
      border: 0.01rem solid #fff;
      background: #fff;
      border-radius: 1rem;
      height: 0.3rem;
      .iconClose {
        float: right;
        width: 0.2rem;
        height: 0.2rem;
        background: url("./xx.png") no-repeat;
        background-size: 100%;
        margin-top: 0.05rem;
      }
      input {
        display: block;
        float: left;
        font-size: 0.14rem;
        line-height:0.3rem;
        width: 80%;
      }
    }
    .cancel {
      display: block;
      flex:0 0 0.6rem;
      height:100%;
      font-size: 0.16rem;
      color: #fff;
      text-align: center;
      line-height:0.35rem;
    }
  }
  #search .searchHint {
    background: #fff;
    margin-top: 0.5rem;
    padding-bottom:0.1rem;
    >div {
        width:100%;
        height:0.4rem;
        line-height:0.4rem;
        p {
          display: inline-block;
          padding: 0 0.2rem;
          font-size: 0.16rem;
        }
        p:nth-child(1){
          /*margin-left: 0.1rem;*/
        }
        p:nth-child(2){
          margin-right: 0.1rem;
          float: right;
        }
     }
    ul {
      height: 0.3rem;
      line-height:0.3rem;
      li {
        float: left;
        height: 100%;
        width: 25%;
        text-align: center;
        color: #5b5b5b;
        background: #e9e9e9;
        margin:0 0.05rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      li:nth-child(1){
        margin-left: 0.1rem;
      }
    }
  }

  #search .searchContext {
    background: #fff;
    >div {
       height: 0.6rem;
       line-height:0.6rem;
       font-size:0.16rem;
       text-align: center;
       color: red;
     }
    >h3 {
        display: inline-block;
        width: 100%;
        height: 0.6rem;
        line-height:0.6rem;
        color: #1c1c1c;
        font-size: .18rem;
        font-weight: 700;
        padding-left: 0.1rem;
     }
     >ul {
        li {
          height: 0.6rem;
          line-height:0.6rem;
          padding-left: 0.1rem;
          font-size:0.16rem;
          span {
            display: block;
            display: inline-block;
            margin-top: 0.1rem;
            height: 0.3rem;
            width: 0.3rem;
            line-height:0.3rem;
            border-radius: 0.1rem;
            background: #000;
            text-align: center;
            color: #fff;
            margin-right: 0.1rem;
          }
        }
        li:nth-child(1) span {
          display: block;
          display: inline-block;
          background: #fb6573;
        }
        li:nth-child(2) span {
          display: block;
          display: inline-block;
          background: #ff9ea7;
        }
        li:nth-child(3) span {
          display: block;
          display: inline-block;
          background: #b4b4b4;
        }
        li:nth-child(4) span {
          display: block;
          display: inline-block;
          background: #d6d6d6;
        }
      }
  }
</style>
