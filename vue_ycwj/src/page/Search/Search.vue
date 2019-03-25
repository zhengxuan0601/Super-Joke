<template>
    <div>
        <!-- header -->
        <div class='myheader'>
            <my-header :isback='true' :iscar='true' title='搜索'></my-header>
        </div>

        <!-- shopcarSelect -->
        <div class='shopSelect' v-if='isshow'>
            <div class='main active'>
                <p>{{userInfo.name}}</p>
                <p>{{userInfo.age}}</p>
                <p>{{userInfo.city}}</p>
                <p @click='addinfo'>添加</p>
                <button @click='noshow'>立即提交</button>
            </div>
        </div>

        <!-- footer -->
        <div class='myfooter'>
            <button class='addcar' @click='showcar'>加入购物车</button>
            <button class='buy'>立刻购买</button>
        </div>
    </div>
</template>

<script>
import MyHeader from '../../components/MyHeader'
export default {
    name:'Search',
    data(){
        return{
            isshow:false,
            userInfo:{
                name:"刘德华",
                age:"36"
            }
        }
    },
    components:{
        MyHeader
    },
    methods:{
        showcar(){
            this.isshow=true
        },
        noshow(){
            this.isshow=false
        },
        // 添加信息
        addinfo(){
            this.$set(this.userInfo,'city','香港')
        }
    },
    watch:{
        userInfo(ne,old){
            console.log(ne,old)
        }
    }
}
</script>

<style>
.myfooter{
    display: flex;
    justify-content: space-between;
}
.myfooter button{
    width:100%;
    border:none;
    background: none;
    height:100%;
    color:#fff;
}
.myfooter button.addcar{
    background:#c40000;
}
.myfooter button.buy{
    background:#FA5437;
}
.shopSelect{
    width:100%;
    height:100%;
    position: fixed;
    top: 0;
    left: 0;
    background:rgba(0,0,0,0.1);
    z-index: 99999;
}
.shopSelect .main{
    width:100%;
    height:60%;
    background:#fff;
    position: fixed;
    bottom: 0;
    left:0;
    overflow: hidden;
}
.shopSelect .main button{
    color: #fff;
    background: #FA5437;
    width: 100%;
    text-align: center;
    height:36px;
    line-height: 36px;
    position: fixed;
    bottom: 0;
    left: 0;
    border:none;
    font-size: 14px;
}
.shopSelect .main.active{
    animation: myfirst 300ms linear;
}
@keyframes myfirst{
    from{height:0;}
    to{height:60%;}
}
</style>
