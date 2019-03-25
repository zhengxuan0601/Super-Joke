<template>
    <div>
        <div class='myheader'>
            <my-header></my-header>
            <label>
                <input type="text" placeholder="请输入商品名称" class='prosearch'>
                <button></button>
            </label>
        </div>
        <div class='contain'>
            <div class='left-menu'>
                <ul>
                    <li v-for='(item,idx) in menuLi' :key='idx' @click='tab(item,idx)' :class="idx==index?'active':''">{{item.name}}</li>
                </ul>
            </div>
            <div class='right-pro'>
                <div class='menu-pic' @click='toCaregory'><img :src="'http://hewu1122.com/shop/'+img" alt=""></div>
                <div class='pro'>
                    <ul>
                        <li v-for='(item,idx) in list' :key='idx'>
                            <router-link to=''><img :src="item.img" alt=""></router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class='myfooter'>
            <my-footer></my-footer>
        </div>
    </div>
</template>

<script>
import MyHeader from '../../components/MyHeader'
import MyFooter from '../../components/MyFooter'
export default {
    name:'Menu',
    data(){
        return{
            menuLi:"", //左侧菜单类名
            index:0,
            img:'', //右侧缩略图
            classID:1, //商品的classID
            list:[],//商品的数据
        }
    },
    components:{
        MyHeader,
        MyFooter
    },
    methods:{
        // 点击左侧分类的时候请求不同的数据
        tab(item,idx){
            this.index=idx
            this.img=this.menuLi[idx].img
            this.classID=item.id
            this.getPro()
        },
        // 请求左侧商品列表数据
        getPro(){
            // 请求商品的数据
            this.$axios.get(this.$api.baseUrl+this.$api.list,{
                params:{
                    'classID':this.classID
                }
            })
            .then(res=>{
                let data=res.data.data
                this.list=data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        // 点击缩略图跳转
        toCaregory(){
            this.$router.push({path: '/category/' + this.menuLi[this.index].id});
        },
    },
    created(){
        // 请求分类的接口地址
        this.$axios.get(this.$api.baseUrl+this.$api.menu)
        .then(res=>{
            let data=res.data.data
            this.menuLi=data
            this.img=data[0].img
        })
        .catch(err=>{
            console.log(err)
        })

        // 请求商品数据
        this.getPro()
    }
}
</script>

<style scoped>
.myheader label{
    display: block;
    height: 32px;
    position: absolute;
    top: 7px;
    left: 50%;
    transform: translate(-50%);
    width: 72%;
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
    border-radius: 16px;
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
  .contain{
      width: 100%;
      height: 100vh;
      box-sizing: border-box;
      padding:46px 0 58px 0;
      background: #fff;
      display: flex;justify-content: space-between;
  }
  .contain .left-menu{
      width: 25%;
      background: #fefefe;
      height: 100%;
      overflow-y: scroll;
  }
  .contain .left-menu ul li{
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #f1f1f1;
  }
  .contain .left-menu ul li{
      display: block;
      width: 100%;
      height: 100%;
      color: #000;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      box-sizing: border-box;
  }
  .contain .left-menu ul li.active{
      color: #d3161b;
      border-left: 2px solid #d3161b;
      background: #fff;
  }
  .contain .right-pro{
      width: 75%;
      box-sizing: border-box;
      padding: 6px;
      overflow-y: scroll;
  }
  .contain .right-pro .menu-pic img{
      width: 100%;
      display: block;
      box-shadow: 0px 0px 2px 1px #c3a3a3;
  }
  .contain .right-pro .pro ul{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-top: 10px;  
  }
  .contain .right-pro .pro ul li{
      width: 50%;
      padding:2px;
      box-sizing: border-box;
  }
  .contain .right-pro .pro ul li a{
      display: block;
      width: 100%;
  }
  .contain .right-pro .pro ul li a img{
      width: 100%;
      border:1px solid #ccc;
      box-sizing: border-box;
  }
</style>
