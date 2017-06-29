<template>
  <div id="collect">
    <cjTitle :title="title" :backurl="backurl"></cjTitle>
    <div class="collect-context" v-if="collectData">
      <ul>
        <li v-for="(item,index) in collectData" class="borderBottom-1px" :data-index="index" :data-integral="item.needScore" :data-goodsId="item.goodsId">
          <div class="collect-select" @click="_sele(index)" :class="{sele:currentSel[index]==1}"></div>
          <div class="collect-pic"><img :src="item.picUrl"></div>
          <div class="collect-pro-des">
            <h3 class="pro-name">{{item.name}}</h3>
            <p>
              <span class="pro-count">数量：1 &nbsp;&nbsp;&nbsp;</span>
              <span class="pro-integral">{{item.needScore}}元</span>
              <!--<span class="pro-integral">{{item.price}}元</span>-->
            </p>
            <p class="pro-time">{{item.createTime| setTime}}</p>
          </div>
          <i class="collect-del icon-lgcs" @click="_del(item.id,index)"></i>
        </li>
      </ul>
    </div>
    <div class="settlement borderTop-1px" v-if="!isHint">
      <!--<div class="allSelect" @click="_allSelect">-->
        <!--<i ref="allSelect"></i>-->
        <!--<span>全选</span>-->
      <!--</div>-->
      <div class="total">合计：
        <!--<span class="totalIntegral" ref="totalIntegral">{{totalIntegral}}&nbsp;{{unit}}</span></div>-->
        <span class="totalIntegral" ref="totalIntegral">{{totalIntegral}}元</span></div>
      <div class="submit" ref="submit" @click="_submit">结算</div>
    </div>
    <div class="collect-hint" v-if="isHint">
      <div><img src="./1.jpg"></div>
      <p>亲，您暂时还没有收藏任何东西哦</p>
    </div>
    <div class="c-layer" v-if="isShow">{{showContext}}</div>
  </div>
</template>

<script type="text/ecmascript-6">

  import cjTitle from '../cjTitle/cjTitle.vue';
  import { mapState } from 'vuex';

  export default {
    data(){
      return {
        backurl:'',
        title:'收藏',
        collectData:[],//全部商品数据
        totalIntegral:0,//合计数量
        sumIntegral:0,//当前页面全选的积分或者乐盈券
        currentSel:[],//存储每个商品的选中状态 0是不选中，1是选中
        collection:[' ',' ','乐盈券','积分'],
        unit:'',
        lastunit:'',//记录上一个选择的是乐盈券还是积分
        isAllsel:true,//是否全选
        defaultType:0,//0是空，1是乐盈券，2是积分
        isShow:false,//提示
        showContext:'',//提示内容
        isHint:false,
        goodsIdArr:[],//存储需要提交的id,
        seleType:[],//存储需要提交的type
        goodsName:[]
      }
    },
    watch:{
      '$route': function () {
        if(this.$route.path.indexOf('collect')!=-1){
          this.collectData=[];//全部商品数据
          this.totalIntegral=0;//合计数量
          this.sumIntegral=0;//当前页面全选的积分或者乐盈券
          this.currentSel=[];//存储每个商品的选中状态 0是不选中，1是选中
          this.unit='';
          this.lastunit='';//记录上一个选择的是乐盈券还是积分
          this.isAllsel=true;//是否全选
          this.defaultType=0;//0是空，1是乐盈券，2是积分
          this.isShow=false;//提示
          this.showContext='';//提示内容
          this.isHint=false;
          this.goodsIdArr=[];//存储需要提交的id,
          this.seleType=[];//存储需要提交的type
          $('.totalIntegral').css('color','#d1d0d0');
          $('.submit').css('background','#d1d0d0');
          $('.allSelect i').removeClass('allSele');
//          this.$refs.totalIntegral.style.color = '#d1d0d0';
//          this.$refs.submit.style.background = '#d1d0d0';
//          this.$refs.allSelect.className = '';
          if(sessionStorage.getItem('collect')){
            this.backurl= sessionStorage.getItem('collect');
          }else {
            this.backurl= 'par';
          }
          this.$http.post('/api/pointShopGoods/queryStoreGoods',{country:0,userId:this.$store.state.userInfo.userId,enable:0},{emulateJSON:true}).then(function (res) {
            res = res.body;
            if(res.data == null){
              this.isHint=true;
            }
            if(res.result===0){
              this.collectData = res.data.list;
              if(this.collectData.length==0){
                this.isHint=true;
              }
              for(let i=0;i<this.collectData.length;i++){
                this.sumIntegral += Number(this.collectData[i].needScore);
                this.currentSel[i] = 0;
              }
              for(let i=0;i<this.collectData.length-1;i++){
                let currentNeedScoreId = Number(this.collectData[i].needScoreId);
                let nextNeedScoreId = Number(this.collectData[i+1].needScoreId);
                if(currentNeedScoreId==nextNeedScoreId){
                  if(currentNeedScoreId==2){
                    this.defaultType = 1;
                  }else if(currentNeedScoreId==3){
                    this.defaultType = 2;
                  }
                }else{
                  this.isAllsel = false;
                  this.sumIntegral = 0;
                }
              }
            }
          });
        }
      }
    },
    created(){
      if(sessionStorage.getItem('collect')){
        this.backurl= sessionStorage.getItem('collect');
      }else {
        this.backurl= 'par';
      }
      this.$nextTick(() => {
        if(this.$store.state.userInfo.userId){
          this.$http.post('/api/pointShopGoods/queryStoreGoods',{country:0,userId:this.$store.state.userInfo.userId,enable:0},{emulateJSON:true}).then(function (res) {
            res = res.body;
            if(res.data == null){
              this.isHint=true;
            }
            if(res.result===0){
              this.collectData = res.data.list;
              if(this.collectData.length==0){
                this.isHint=true;
              }
              for(let i=0;i<this.collectData.length;i++){
                this.sumIntegral += Number(this.collectData[i].needScore);
                this.currentSel[i] = 0;
              }
              for(let i=0;i<this.collectData.length-1;i++){
                let currentNeedScoreId = Number(this.collectData[i].needScoreId);
                let nextNeedScoreId = Number(this.collectData[i+1].needScoreId);
                if(currentNeedScoreId==nextNeedScoreId){
                  if(currentNeedScoreId==2){
                    this.defaultType = 1;
                  }else if(currentNeedScoreId==3){
                    this.defaultType = 2;
                  }
                }else{
                  this.isAllsel = false;
                  this.sumIntegral = 0;
                }
              }
            }
          });
        }else{
          this.$http.post("/api/user/getUserInfo", {country: 0, terminal: 4}, {emulateJSON: true}).then((response) => {
            response = response.body;
            if(response.result==0){
              this.$http.post('/api/pointShopGoods/queryStoreGoods',{country:0,userId:response.user.userId,enable:0},{emulateJSON:true}).then(function (res) {
                res = res.body;
                if(res.result===0){
                  this.collectData = res.data.list;
                  if(this.collectData.length==0){
                    this.isHint=true;
                  }
                  for(let i=0;i<this.collectData.length;i++){
                    this.sumIntegral += Number(this.collectData[i].needScore);
                    this.currentSel[i] = 0;
                  }
                  for(let i=0;i<this.collectData.length-1;i++){
                    let currentNeedScoreId = Number(this.collectData[i].needScoreId);
                    let nextNeedScoreId = Number(this.collectData[i+1].needScoreId);
                    if(currentNeedScoreId==nextNeedScoreId){
                      if(currentNeedScoreId==2){
                        this.defaultType = 1;
                      }else if(currentNeedScoreId==3){
                        this.defaultType = 2;
                      }
                    }else{
                      this.isAllsel = false;
                      this.sumIntegral = 0;
                    }
                  }
                }
              });
            }
          })
        }

      })

    },
    methods:{
      _sele(index){
        this.lastunit = this.unit;
        if(this.collectData[index].needScoreId==2&&this.lastunit=='积分'){
          this.isShow = true;
          this.showContext = '您收藏的物品中含不同的类型，不支持多选';
          let _this = this;
          setTimeout(function () {
            _this.isShow = false;
            this.showContext = '';
          },1000);
        }else if(this.collectData[index].needScoreId==3&&this.lastunit=='乐盈券'){
          this.isShow = true;
          this.showContext = '您收藏的物品中含不同的类型，不支持多选';
          let _this = this;
          setTimeout(function () {
            _this.isShow = false;
            this.showContext = '';
          },1000);
        }else{
//          debugger
          if(this.collectData[index].needScoreId==2){
            this.unit = '乐盈券';
          }else if(this.collectData[index].needScoreId==3){
            this.unit = '积分';
          }
          if(this.currentSel[index]==0){
            for(let i=0;i<this.currentSel.length;i++){
              if(this.currentSel[i]==1){
                return false
              }
            }
            this.currentSel.splice(index,1,1);
//            console.log(this.collectData[index]);
            this.totalIntegral +=  this.collectData[index].needScore;
            if(this.totalIntegral>0){
              this.$refs.totalIntegral.style.color = '#e7384a';
              this.$refs.submit.style.background = '#e7384a';
            }
            if(this.totalIntegral==this.sumIntegral&&this.isAllsel){
              this.$refs.allSelect.className = 'allSele';
            }
          }else {
            this.currentSel.splice(index,1,0);
            this.totalIntegral -=  this.collectData[index].needScore;
            if(this.totalIntegral===0){
              this.$refs.totalIntegral.style.color = '#d1d0d0';
              this.$refs.submit.style.background = '#d1d0d0';
//              this.$refs.allSelect.className = '';
              this.lastunit = '';
              this.unit = '';
            }
            if(this.totalIntegral!==this.sumIntegral){
//              this.$refs.allSelect.className = '';
            }
          }
        }
      },
      _del(id,index){
        this.$http.post('/api/pointShopGoods/delStoreGoods',{country:0,id:id},{emulateJSON:true}).then(function (res) {
          res = res.body;
//          console.log(res);
          if(res.result==0){
            if(this.currentSel[index]==1){
              this.totalIntegral -=  this.collectData[index].needScore;
              if(this.totalIntegral===0){
                this.$refs.totalIntegral.style.color = '#d1d0d0';
                this.$refs.submit.style.background = '#d1d0d0';
                this.lastunit = '';
                this.unit = '';
              }
              if(this.totalIntegral!==this.sumIntegral){
//                this.$refs.allSelect.className = '';
              }
            }

            this.collectData.splice(index,1);
            this.currentSel.splice(index,1);//状态保持了一致，就不会像使用zepto一样，0的状态会继承给1，或者1的状态继承给0
            this.isAllsel = true;
            this.lastunit = '';
            let flagJ = 0;let flagK = 0;
            for(let i= 0 ;i<this.collectData.length-1;i++){
              let currentNeedScoreId = Number(this.collectData[i].needScoreId);
              let nextNeedScoreId = Number(this.collectData[i+1].needScoreId);
              flagK++;
              if(currentNeedScoreId==nextNeedScoreId){
                flagJ++;
              }else{
                this.isAllsel = false;
              }
            }
            if(flagJ==flagK){
              this.sumIntegral = 0;
              for(let i=0;i<this.collectData.length;i++){
                this.sumIntegral += Number(this.collectData[i].needScore);
              }
              if(this.collectData.length!=0){
//                console.log(this.collectData);
                if(Number(this.collectData[0].needScoreId)&&Number(this.collectData[0].needScoreId)==2){
                  this.defaultType = 1;
                }else if(Number(this.collectData[0].needScoreId)&&Number(this.collectData[0].needScoreId)==3){
                  this.defaultType = 2;
                }
              }else {
                this.isHint = true;
              }
            }
            if(this.totalIntegral==this.sumIntegral&&this.isAllsel){
              this.$refs.allSelect.className = 'allSele';
            }
            if(this.totalIntegral==0){
//              this.$refs.allSelect.className = '';
            }
          }
        });
      },
      _allSelect(){
        if(this.isAllsel){
          if(this.currentSel.join('').indexOf(0)==-1){
            this.$refs.allSelect.className = '';
            this.$refs.totalIntegral.style.color = '#d1d0d0';
            this.$refs.submit.style.background = '#d1d0d0';
            this.totalIntegral=0;
            this.unit = '';
            this.currentSel=this.currentSel.join(',').replace(/1/g,'0').split(",");
          }else{
            if( this.defaultType == 1){
              this.unit = '乐盈券';
            }else if(this.defaultType == 2) {
              this.unit = '积分';
            }
            this.$refs.allSelect.className = 'allSele';
            this.$refs.totalIntegral.style.color = '#e7384a';
            this.$refs.submit.style.background = '#e7384a';
            this.totalIntegral=this.sumIntegral;
            this.currentSel=this.currentSel.join(',').replace(/0/g,'1').split(",");
          }
        }else {
          this.isShow = true;
          this.showContext = '您收藏的物品中含不同的类型，不支持多选';
          let _this = this;
          setTimeout(function () {
            _this.isShow = false;
            this.showContext = '';
          },1000);
        }
      },
      _submit(){
        this.goodsIdArr = [];
        this.seleType = [];
//        affirm phone
        let isSubmit = true;//是否可以提交
        //找到选中状态的商品位置
        for(let i=0;i<this.currentSel.length;i++){
          if(this.currentSel[i]==1){
        //获取选中商品的type及goosId
            if(this.collectData[i].enable==1){
              isSubmit = false;
              this.isShow = true;
              this.showContext = '该商品已下架';
              let _this = this;
              setTimeout(function () {//虽然有多次触发条件，但定时器的机制原因只会触发一次
                _this.isShow = false;
                this.showContext = '';
              },1000);
              this.$refs.totalIntegral.style.color = '#d1d0d0';
              this.$refs.submit.style.background = '#d1d0d0';
              this.totalIntegral=0;
              this.unit = '';
              this.currentSel=this.currentSel.join(',').replace(/1/g,'0').split(",");
                return false
            }
            if(this.collectData[i].total<=0){
              isSubmit = false;
              this.isShow = true;
              this.showContext = '当前商品已售罄';
              let _this = this;
              setTimeout(function () {//虽然有多次触发条件，但定时器的机制原因只会触发一次
                _this.isShow = false;
                this.showContext = '';
              },1000);
              this.$refs.totalIntegral.style.color = '#d1d0d0';
              this.$refs.submit.style.background = '#d1d0d0';
              this.totalIntegral=0;
              this.unit = '';
              this.currentSel=this.currentSel.join(',').replace(/1/g,'0').split(",");
              return false
            }
            this.seleType.push(this.collectData[i].type);
            this.goodsIdArr.push(this.collectData[i].goodsId);
            this.goodsName.push(this.collectData[i].name);
          }
        }
//        console.log(this.seleType);
//        console.log(this.goodsIdArr);
        for(let k=0;k<this.seleType.length-1;k++){//type3和4是虚拟物品可以相同，其他则不可

          if(this.seleType[0]==3||this.seleType[0]==4){
            if(this.seleType[k+1]==3||this.seleType[k+1]==4){
            }else{
              isSubmit = false;
              this.isShow = true;
              this.showContext = '您选择的物品中含实物与虚拟物品';
              let _this = this;
              setTimeout(function () {//虽然有多次触发条件，但定时器的机制原因只会触发一次
                _this.isShow = false;
                this.showContext = '';
              },1000);
            }
          }else if(this.seleType[0]==2){//type2不能同时拥有多个
            if(this.seleType[k+1]!=2){
              isSubmit = false;
              this.isShow = true;
              this.showContext = '您选择的物品中含实物与虚拟物品';
              let _this = this;
              setTimeout(function () {
                _this.isShow = false;
                this.showContext = '';
              },1000);
            }else {
              if(this.seleType[1]){
                isSubmit = false;
                this.isShow = true;
                this.showContext = '话费卡暂不支持多张同时兑换';
                let _this = this;
                setTimeout(function () {
                  _this.isShow = false;
                  this.showContext = '';
                },1000);
              }
            }
          }else{
            if(this.seleType[k]!=this.seleType[k+1]){
              isSubmit = false;
              this.isShow = true;
              this.showContext = '您选择的物品中含实物与虚拟物品';
              let _this = this;
              setTimeout(function () {//虽然有多次触发条件，但定时器的机制原因只会触发一次
                _this.isShow = false;
                this.showContext = '';
              },1000);
            }
          }
        }
        if(isSubmit&&this.goodsIdArr.length!=0){
          if(this.seleType[0]==1){
            sessionStorage.setItem('profile2','collect');
            this.$router.push({path:'/profile2/'+this.goodsIdArr.join(',')});
          }else if(this.seleType[0]==2){
            sessionStorage.setItem('affirm','phone');
            this.$router.push({path:'/affirm/'+this.goodsIdArr[0]});
            sessionStorage.setItem("affirmType","2")
          }else if(this.seleType[0]==3){
            this.$router.push({path:'/affirm/'+this.goodsIdArr[0]})
            sessionStorage.setItem("affirm","phone");
            sessionStorage.setItem("affirmType","3")
          }else{
            sessionStorage.setItem("showGoodsId",this.goodsIdArr[0]);
            sessionStorage.setItem("showMoney",this.totalIntegral);
            sessionStorage.setItem("showGoodsName",this.goodsName);
            this.$router.push({path:'/showResult'});
          }
        }

      },
      _exchange(num){
        this.$http.post('/api/pointShopGoods/exchangeGoods',{country:0,count:1,goodsId:this.goodsIdArr[num],userId:this.$store.state.userInfo.userId,phone:this.$store.state.userInfo.phone},{emulateJSON:true}).then(function (res) {
          res = res.body;
          if(res.result==0){
            num++;
            if(num<this.goodsIdArr.length){
              this._exchange(num);
            }
            console.log(num);
//            debugger
            this.isShow = true;
            this.showContext = '兑换成功';
            let _this = this;
            setTimeout(function () {
              _this.isShow = false;
              this.showContext = '';
            },1000);
//            this.$refs.allSelect.className = '';
            this.$refs.totalIntegral.style.color = '#d1d0d0';
            this.$refs.submit.style.background = '#d1d0d0';
            this.totalIntegral=0;
            this.unit = '';
            this.currentSel=this.currentSel.join(',').replace(/1/g,'0').split(",");
          }else if(res.result==62){
            this.isShow = true;
            this.showContext = '兑换失败';
            if(this.unit == '乐盈券'){
              this.showContext = '您的乐盈券不足';
            }
            let _this = this;
            setTimeout(function () {
              _this.isShow = false;
              this.showContext = '';
            },1000);
          }else {
            this.isShow = true;
            this.showContext = '兑换失败';
            let _this = this;
            setTimeout(function () {
              _this.isShow = false;
              this.showContext = '';
            },1000);
          }
        });
      }
    },
    components:{
      cjTitle
    },
    computed:{
      ...mapState(['userInfo'])
    }
//    filters:{
//      formatDate(time){
//        let date = new Date(time);
//        let month = Number(date.getMonth())+1<10?'0'+ (Number(date.getMonth())+1):Number(date.getMonth())+1;
//        let days = Number(date.getDate())<10?'0'+Number(date.getDate()):Number(date.getDate());
//        return date.getFullYear()+'-'+month+'-'+days;
//      }
//    }
 }
</script>

<style lang="less" rel="stylesheet/less">
  .c-layer {
    padding:0.2rem 0.2rem;
    line-height:0.2rem;
    background: rgba(1,1,1,.5);
    word-wrap: break-word;
    border-radius: 0.1rem;
    color: #fff;
    font-size: 0.18rem;
    margin:auto;
    position: fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    text-align: center;
  }
  #collect {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: #f5f5f5;
  }
  #collect .collect-context {
    padding-top: 0.45rem;
    padding-bottom: 0.5rem;
  }
  #collect .collect-context ul li {
    display: block;
    display: flex;
    position: relative;
    height: auto;
    box-sizing: border-box;
    padding: 0.05rem;
    width: 100%;
    overflow: hidden;
    background: #fff;
  }
  #collect .collect-select {
    display: block;
    flex:0 0 0.3rem;
    height: auto;
    background: url("./my11.png") no-repeat center left;
    background-size: 0.25rem 0.25rem;
  }
  #collect .collect-select.sele{
    background: url("./gouxuan.png") no-repeat center left;
    background-size: 0.25rem 0.25rem;
  }
  #collect .collect-pic {
    display: block;
    padding: 0.08rem 0.1rem;
    flex:0 0 0.8rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
  #collect .collect-pro-des {
    display: block;
    flex:1;
    padding-top:0.1rem;
    margin-right: 0.1rem;
    width:100%;
    h3.pro-name {
      font-size: 0.18rem;
      font-family: helvetica;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break:break-all;
      line-height:0.2rem;
    }
    .pro-count {
      line-height:0.35rem;
      color: red;
      font-size: 0.14rem;
    }
    .pro-integral {
      line-height:0.35rem;
      color: #f8d096;
      font-size: 0.14rem;
    }
    .pro-time {
      font-size: 0.14rem;
      color: #c9c9c9;
      margin-bottom: 0.1rem;
    }
  }
  #collect .collect-del {
    height: 0.2rem;
    width: 0.2rem;
    line-height:0.2rem;
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    border-radius: 50%;
    background: #e7384a;
    color: #fff;
    text-align: center;
    font-size: 0.14rem;
  }
  #collect .settlement {
    position: fixed;
    bottom:0;
    left:0;
    background: #fff;
    width: 100%;
    height:0.5rem;
    line-height:0.5rem;
    font-size:0.18rem;
    div {
      float: left;
    }
    .allSelect {
      height: 100%;
      width:20%;
      i {
        float: left;
        width: 0.25rem;
        height: 100%;
        background: url("./my11.png") no-repeat center left ;
        background-size: 0.25rem 0.25rem;
        margin:0 0.05rem;
      }
      i.allSele {
        background: url("./gouxuan.png") no-repeat center left;
        background-size:0.25rem 0.25rem;
      }
      span {
        float: left;
        display: inline-block;

      }
    }
    .total {
      width: 80%;
      text-align: center;
      .totalIntegral {
        color: #d1d0d0;
      }
    }
    .submit {
      width: 20%;
      text-align: center;
      color: #fff;
      background: #d1d0d0;
    }
    .submit.sel {
      background: #e7384a;
    }
  }
  #collect .collect-hint {
    text-align: center;
    margin-top:1rem;
    p {
      font-size: 0.18rem;
      color: #b4b4b4;
    }
  }
</style>
