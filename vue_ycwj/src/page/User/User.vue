<template>
    <div>
        <div class='myheader'>
            <my-header :isback='true' title='会员中心'></my-header>
        </div>
        <div class='header-top'>
            <div class='header-pic'><img :src="'http://hewu1122.com/shop/'+userInfo.icon" alt=""></div>
            <p>17858935853</p>
            <router-link to=''>[修改资料]</router-link>
            <router-link to=''>[修改头像]</router-link>
            <div class='shaw'>
                <ul>
                    <li><img src="/static/images/ico_user_01.png" alt=""><p>30天订单</p><span>0</span></li>
                    <li><img src="/static/images/ico_user_03.png" alt=""><p>余额<span>0.00</span></p></li>
                    <li><img src="/static/images/ico_user_04.png" alt=""><p>优惠券<span>1</span></p></li>
                </ul>
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
    name:'User',
    data(){
        return{
            userInfo:'', //用户的所有信息
        }
    },
    components:{
        MyHeader,
        MyFooter
    },
    // 在创建之前判断是否登入
    beforeCreate(){
        // 在页面创建之前将本地存储的值放入仓库中
        localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
		if(!this.$store.state.user){
			this.$router.replace("/login");
		}
    },
    // 登入了以后进来渲染
    created(){
        let userInfo=this.$store.state.user
        userInfo=JSON.parse(userInfo)
        this.userInfo=userInfo
    },
    mounted(){
        // 在刷新的时候
        window.addEventListener("beforeunload",()=>{
        localStorage.setItem("messageStore",JSON.stringify(this.$store.state))
        })
    }
}
</script>

<style>
.header-top{
    margin-top: 46px;
    box-sizing: border-box;
    width: 100%;
    height: 240px;
    background: url('/static/images/header_bg.jpg') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    text-align: center;
    color: #fff;
    font-weight: 400;
    font-size: 14px;
    position: relative;
}
.header-top .header-pic{
    width: 78px;
    height: 78px;
    border-radius: 50%;
    overflow: hidden;
    margin:10px auto;
}
.header-top .header-pic img{
    width: 100%;
    height: 100%;
}
.header-top>a{
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    margin: 0 6px;
}
.header-top .shaw{
    position: absolute;
    left: 0;
    width: 100%;
    height: 80px;
    bottom: 0;
    background: rgba(255,255,255,0.6);
}
.header-top .shaw ul{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.header-top .shaw ul li{
    text-align: center;
    color: #fff;
    font-size: 12px;
    width: 28%;
    margin-top: 20px;
    position: relative;
}
.header-top .shaw ul li img{
    width: 30px;
}
.header-top .shaw ul li span{
    position: absolute;
    background: #c40000;
    padding: 0 4px;
    color: fff;
    font-size: 12px;
    border-radius: 8px;
    top: -4px;
    right: 32%;
}
</style>
