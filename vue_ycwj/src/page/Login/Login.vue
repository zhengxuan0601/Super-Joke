<template>
    <div>
        <div class='myheader'><my-header title="会员登入" :isback='true'></my-header></div>
        <div class='container'>
            <div class='login-tit'>
                <p :class='textshow?"active":""' @click='tab(0)'>账号登入</p>
                <p :class='!textshow?"active":""' @click='tab(1)'>手机验证码登入</p>
            </div>
            <!-- 账号密码登入 -->
            <div class='textlogin' v-if="textshow">
                <label>
                    <span>账号</span>
                    <input type="text"  placeholder="用户名/手机/电子邮箱" v-model='userName'>
                </label>
                <label>
                    <span>密码</span>
                    <input type="password"  placeholder="请输入密码" v-model='passWord'>
                </label>
            </div>

            <!-- 手机验证码登入 -->
            <div class='tellogin' v-if="!textshow">
                <label>
                    <span>账号</span>
                    <input type="text"  placeholder="用户名/手机/电子邮箱">
                </label>
                <label>
                    <span>验证码</span>
                    <input type="password" placeholder="请输入验证码">
                    <button>获取验证码</button>
                </label>
            </div>
            <!-- 登入按钮 -->
            <button class='login-btn' @click="login">登入</button>

            <!-- 注册及忘记密码 -->
            <div class='reg'>
                <router-link to='/reg'>注册会员</router-link>
                <router-link to=''>忘记密码？</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import MyHeader from "../../components/MyHeader"
export default {
    name:'Login',
    data(){
        return{
            textshow:true,
            userName:'',
            passWord:''
        }
    },
    components:{
        MyHeader
    },
    methods:{
        // 点击tab切换
        tab(e){
            if(e==0){
                this.textshow=true
            }else{
                this.textshow=false
            }
        },
        // 点击登入请求登入接口
        login(){
            this.$axios.get(this.$api.baseUrl+this.$api.user,{
                params:{
                    act:'login',
                    user:this.userName,
                    pwd:this.passWord
                }
            })
            .then(res=>{
                let userInfo=res.data.data
                userInfo=JSON.stringify(userInfo)
                this.$store.state.user=userInfo
                alert(res.data.msg)
            })
        }
    },
}
</script>

<style>
.container{
    padding-top:46px;
    background:#fff;
    height:100vh;
    box-sizing: border-box;
}
.container .login-tit{
    display: flex;
    height:46px;
    line-height:46px;
    justify-content: space-around;
    font-size: 14px;
    color:#999;
    border-bottom:1px solid #f1f1f1;
}
.container .login-tit p.active{
    color:#4c4c4c;
    border-bottom:2px solid #FA5437;
}
.container .textlogin{
   display: flex;
   flex-wrap: wrap;
   padding:10px 20px;
}
.container .textlogin label{
    width:100%;
    display: flex;
    padding:10px 0;
    border-bottom:1px solid #f1f1f1;
    font-size: 14px;
    color:#999;
}
.container .textlogin label span{
    width:20%;
    padding-left:10px;
    box-sizing: border-box;
}
.container .textlogin label input{
    flex: 1;
    padding-left:10px;
    border:none;
    color:#999;
    outline: none;
}

.container .tellogin{
   display: flex;
   flex-wrap: wrap;
   padding:10px 20px;
}
.container .tellogin label{
    width:100%;
    display: flex;
    padding:10px 0;
    border-bottom:1px solid #f1f1f1;
    font-size: 14px;
    color:#999;
}
.container .tellogin label span{
    width:20%;
    padding-left:10px;
    box-sizing: border-box;
}
.container .tellogin label input{
    flex: 1;
    padding-left:10px;
    border:none;
    color:#999;
    outline: none;
}
.container .tellogin label button{
    outline: none;
    background: none;
    color:dodgerblue;
    border:none;
}

.container button.login-btn{
    display: block;
    width:80%;
    margin:20px auto;
    color:#fff;
    font-size: 14px;
    height:36px;
    line-height:36px;
    text-align: center;
    border:none;
    background:#c40000;
    outline: none;
}

.container .reg{
    margin:40px auto;
    display: flex;
    justify-content: space-between;
    width:100%;
    padding:0 40px;
    box-sizing: border-box;
}
.container .reg a{
    font-size: 14px;
    color:#FA5437;
}
</style>
