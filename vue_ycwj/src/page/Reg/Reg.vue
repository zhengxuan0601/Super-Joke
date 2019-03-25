<template>
    <div>
        <div class='myheader'><my-header title='会员注册' :isback='true'></my-header></div>
        <div class='container'>
            <div class='reg'>
                <label>
                    <span>账号</span>
                    <input type="text" placeholder="请输入注册用户名" v-model="userName">
                </label>
                <label>
                    <span>密码</span>
                    <input type="password" placeholder="请输入注册密码" v-model='passWord'>
                </label>
            </div>
            <div class='login'>
                <p>已有账号,<router-link to='/login'>直接登入</router-link></p>
            </div>
            <button class='reg-btn' @click='rightReg'>立即注册</button>
        </div>
    </div>
</template>

<script>
import MyHeader from "../../components/MyHeader"
export default {
    name:"Reg",
    data(){
        return{
            userName:'',
            passWord:''
        }
    },
    components:{
        MyHeader
    },
    created(){
        
    },
    methods:{
        // 点击立即注册
        rightReg(){
            if(this.userName&&this.passWord){
            let baseUrl=this.$api.baseUrl
            let user=this.$api.user
            let data = new URLSearchParams();
            data.append("act","reg")
            data.append("user",this.userName)
            data.append("pwd",this.passWord)
            this.$axios.post(baseUrl+user,data)
            .then((res)=> {
                alert(res.data.msg)
                if(res.data.msg=='注册成功'){
                    this.$router.push('/login')
                }else{
                    return
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            }else{
                alert('请输入完整的注册信息')
            }
        }
    },
    // 实时监听input的变化
    watch:{
        userName(news){
            this.userName=news
        },
        passWord(news){
            this.passWord=news
        },
        againPassWord(news){
            this.againPassWord=news
        }
    }
}
</script>

<style>
.container{
    height:100vh;
    padding-top:46px;
    box-sizing: border-box;
    background: #fff;
}
.container .reg{
    width:100%;
    display: flex;
    padding:20px;
    box-sizing: border-box;
    flex-wrap: wrap;
}
.container .reg label{
    width:100%;
    font-size: 14px;
    display: flex;
    border-bottom:1px solid #f1f1f1;
    padding:10px 0;
}
.container .reg label span{
    width:30%;
}
.container .reg label input{
    flex: 1;
    outline: none;
    border:none;
}
.container .login{
    padding:10px 20px;
    font-size: 14px;
}
.container .login a{
    color:orange;
}
.container button.reg-btn{
    width:80%;
    display: block;
    margin:20px auto;
    height:36px;
    line-height:36px;
    background:#c40000;
    border:none;
    font-size: 14px;
    color:#fff;
}
</style>
