<template>
<div class="profile1">
  <div class="title">
    <span class="back icon-back" @click="back"></span>
    <span class="name">收货地址管理</span>
    <span class="zw"></span>
  </div>
  <div class="content">
    <ul>
      <li class="content-list" v-for="(item,index) in address">
        <div class="top" @click="_select(item.id)">
          <div class="name-tel">
            <span class="name">{{item.name}}</span>
            <span class="tel">{{item.tel}}</span>
          </div>
          <div class="exhibition">
            {{item.province}}{{item.city}}{{item.street}},{{item.detail}}
          </div>
        </div>
        <div class="bottom">
          <span class="check" :class="{checkout:lastAddress[index]==0}" @click="_default(index)"></span>
          <span class="word">设为默认地址</span>
          <span class="edit" @click="_edit(item.id)">编辑</span>
          <span class="delete" @click="_delete(item.id,index)">删除</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="buttom" @click="_added">新增收货地址</div>
</div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  export default{
    data(){
      return {
        address:[],
        lastAddress:[],
      }
    },
    watch:{
      '$route':function () {
        if(this.$route.path.indexOf('profile1')!=-1){
          this.getAddress()
        }
      }
    },
    created(){
      this.getAddress()
    },
    methods:{
      back(){
        let Requres = new UrlSearch();
        if(Requres.goodsId){
          this.$router.push({path:'/profile2/'+ Requres.goodsId});
        }else{
          window.history.back()
        }
      },
      getAddress(){
        this.lastAddress=[];
        if(this.userInfo.userId){
          this.$http.post("/api/pointShopUser/queryAddress",{country:0,userId:this.userInfo.userId},{emulateJSON:true}).then((res) => {
            this.address=res.body.data;
            for(let i = 0;i<res.body.data.length;i++){
              this.lastAddress.push(res.body.data[i].last)
            }
          })
        }else{
          this.$http.post("/api/user/getUserInfo", {country: 0, terminal: 4}, {emulateJSON: true}).then((response) => {
              this.$http.post("/api/pointShopUser/queryAddress",{country:0,userId:response.body.user.userId},{emulateJSON:true}).then((res) => {
                this.address=res.body.data;
                for(let i = 0;i<res.body.data.length;i++){
                  this.lastAddress.push(res.body.data[i].last)
                }
              })
          })
        }

      },
      _default(index){
        if(this.lastAddress[index]==1){
          for(let i = 0;i<this.lastAddress.length;i++){
              if(this.lastAddress[i]==0){
                this.lastAddress.splice(i,1,1);
              }
          }
          this.lastAddress.splice(index,1,0);
          this.$http.post("/api/pointShopUser/addAddress",{country:0,userId:this.userInfo.userId,id:this.address[index].id,last:0},{emulateJSON:true}).then((res) => {

          })
        }else{
          this.lastAddress.splice(index,1,1);
          this.$http.post("/api/pointShopUser/addAddress",{country:0,userId:this.userInfo.userId,id:this.address[index].id,last:1},{emulateJSON:true}).then((res) => {

          })
        }
      },
      _edit(id){
        let Requres = new UrlSearch();
        if(Requres.goodsId){
          this.$router.push({path:'/profile?addressId='+ id +"&goodsId="+ Requres.goodsId});
        }else{
          this.$router.push({path:'/profile?addressId='+ id});
        }
      },
      _delete(id,index){
        this.$http.post("/api/pointShopUser/delAddress",{country:0,id:id},{emulateJSON:true}).then((res) => {
            if(res.body.result==0){
              this.address.splice(index,1);
            }
        })
      },
      _added(){
        let Requres = new UrlSearch();
        if(Requres.goodsId){
          this.$router.push({path:'/profile?goodsId'+ Requres.goodsId });
        }else{
          this.$router.push({path:'/profile'});
        }
      },
      _select(id){
          let Requres = new UrlSearch();
          if(Requres.goodsId){
            this.$router.push({path:'/profile2/'+ Requres.goodsId + "?addressId="+id});
          }
      }
    },
    computed:{
      ...mapState(['userInfo','isLogin'])
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
.profile1{
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
    left: 0;
    bottom:0.6rem;
    width: 100%;
    overflow: auto;
    .content-list{
      margin: 0.12rem 0.09rem 0.12rem 0.09rem;
      background-color: #f5f5f5;
      .top{
        padding: 0.05rem 0.1rem;
        border-bottom: 1px dashed #d1d3d6;
        .name-tel{
          display: block;
          display: flex;
          height: 0.25rem;
          line-height: 0.25rem;
          justify-content: space-between;
          .name{
            font-size: 0.18rem;
            text-align: left;
            color:#1c1c1c;
          }
          .tel{
            text-align: right;
            font-size: 0.14rem;
            color: #1c1c1c;
          }
        }
        .exhibition{
          line-height: 0.25rem;
          margin-top: 0.05rem;
          font-size: 0.14rem;
         color :#1c1c1c;
          word-break: break-all;
        }
      }
      .bottom{
        display: block;
        display: flex;
        height: 0.62rem;
        line-height: 0.62rem;
        font-size: 0.18rem;
        .check{
          display: inline-block;
          height: 0.62rem;
          width: 0.62rem;
          background-image:url("./wgx.png") ;
          background-size: 0.25rem 0.25rem;
          background-position: center;
          background-repeat: no-repeat;
        }
        .checkout{
          background-image: url("./gx.png");
        }
        .word{
          display: block;
          flex: 2;
          font-size: 0.16rem;
          color: #1c1c1c;
        }
        .edit,.delete{
          height: 0.3rem;
          line-height: 0.3rem;
          padding: 0.05rem 0.15rem;
          text-align: center;
          border: 1px solid #d1d3d6;
          border-radius: 5px;
          margin-top: 0.11rem;
          margin-right: 0.1rem;
          font-size: 0.16rem;
        }
      }
    }
  }
  .buttom{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    color:#fff;
    background-color: #e7384a;
    font-size: 0.2rem;
    text-align: center;
  }
}
</style>
