<template>
    <div>
        <div class='myheader'>
            <my-header title='' :islogo='true'> </my-header>
             <label>
                <input type="text" placeholder="请输入商品名称" ref='prosearch' @click='tosearch'>
                <button></button>
            </label>
        </div>
        <!-- banner -->
        <div class='banner'>
            <template>
                <swiper :options="swiperOption" >
                    <!-- slides -->
                    <swiper-slide v-for="(item,index) in banner" :key='index'><img :src="item.imgurl" alt=""></swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </template>
        </div>
        <!-- menu -->
        <div class='menu'>
            <ul>
                <li>
                    <router-link to='/category/3'>
                        <img src="/static/images/one.png" alt="">
                        <p>手机</p>
                    </router-link>
                </li>
                <li>
                    <router-link to='/category/4'>
                        <img src="static/images/two.png" alt="">
                        <p>电脑</p>
                    </router-link>
                </li>
                <li>
                    <router-link to='/category/9'>
                        <img src="static/images/three.png" alt="">
                        <p>内衣</p>
                    </router-link>
                </li>
                <li>
                    <router-link to='/category/10'>
                        <img src="static/images/four.png" alt="">
                        <p>男装</p>
                    </router-link>
                </li>
            </ul>
        </div>

        <!-- pro -->
        <div class='product'>
            <div class='pro' v-for="(item,idx) in list" :key='idx'>
                <div class='title'>
                    <p>{{item.className}}</p>
                </div>
                <ul>
                    <li v-for='(itemName,idx) in item.data' :key='idx'>
                        <router-link to=''>
                            <img :src="itemName.img" alt="">
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class='myfooter'>
            <my-footer></my-footer>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MyHeader from '../../components/MyHeader'
import MyFooter from '../../components/MyFooter'
export default {
    name:'Index',
    data(){
        return{
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
             },
             banner:"", //轮播图的数据
             list:'',//商品列表的数据
        }
    },
    methods:{
        //点击搜索框的时候跳转到搜索页面
        tosearch(){
            this.$router.push('/search')
        }
    },
    created(){
        //请求轮播图的数据
        let baseUrl=this.$api.baseUrl;
        let index = this.$api.index

        // 获取首页数据
        // let data = new URLSearchParams();
		// data.append("json","true")
        this.$axios.get('api/',{
            params:{
                'json':'true'
            }
        })
        .then((res)=> {
            this.banner=res.data.banner
        })
        .catch(function (error) {
            console.log(error);
        });

        // 获取首页产品信息数据
        this.$axios.get(baseUrl+index,{
            params:{
                'act':'indexGood'
            }
        })
        .then(res=>{
            let data=res.data.data
            this.list=data
        })
        .catch(err=>{
            console.log(err)
        })

        // md5加密
        console.log(this.$md5('hello'))

    },

    
    components:{
        MyHeader,
        MyFooter,
        // 轮播图插件组件
        swiper,
        swiperSlide
    },
    mounted(){
        //操作节点
    }
}
</script>

<style>
   
    .myheader label{
    display: block;
    height: 32px;
    position: absolute;
    top: 7px;
    right: 6px;
    width: 54%;
  }
  .myheader label input[type=text]{
    width: 100%;
    height: 100%;
    background: #fff;
    padding-left: 12px;
    color: #4c4c4c;
    border: none;
    font-size: 12px;
    outline: none;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .myheader label button{
    width: 18px;
    height: 18px;
    position: absolute;
    top: 7px;
    right: 6px;
    border:none;
    background: url(/static/images/_search.png) no-repeat center center;
    background-size: 100%;
    outline: none;
  }
  .banner{
      box-sizing: border-box;
      padding-top: 46px;
      width:100%;
      margin: 0 auto;
  }
  .banner .swiper-slide img{
      width: 100%;
      display: block;
  }
  .menu{
      background: #fff;
      padding: 10px;
  }
  .menu ul{
      width: 100%;
      display: flex;
      justify-content: space-between;
  }
  .menu ul li{
      width: 25%;
  }
  .menu ul li a{
      display: block;
      width: 100%;
      text-align: center;
  }
  .menu ul li a img{
      width: 60%;
  }
  .menu ul li a p{
      color: #333;
      font-size: 12px;
  }
  .product{
      width: 100%;
      margin-top: 16px;
      box-sizing: border-box;
      padding-bottom: 60px;
  }
  .product .pro{
      width: 100%;
      margin-bottom: 8px;
  }
  .product .pro .title{
      width: 100%;
      text-align: center;
      color: #999;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      background: #fff;
  }
  .product .pro ul{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
  }
  .product .pro ul li{
      width: 50%;
      box-sizing: border-box;
      border-bottom: 1px solid #f1f1f1;
  }
  .product .pro ul li:nth-child(2n+1){
      border-right: 1px solid #f1f1f1;
  }
  .product .pro ul li:nth-child(2n){
      border-left: 1px solid #f1f1f1;
  }
  .product .pro ul li a{
      display: block;
      width: 100%;
  }
  .product .pro ul li a img{
      width:100%;
  }
</style>

