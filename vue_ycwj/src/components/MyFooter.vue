<template>
    <div class='_footer'>
        <ul>
            <li>
                <router-link to='/'>
                    <span class='iconfont icon-shouye'></span>
                    <!-- <img src="/static/images/home.png" alt=""> -->
                    <p>首页</p>
                </router-link>
            </li>
            <li>
                <router-link to='/menu'>
                    <span class='iconfont icon-fenlei'></span>
                    <!-- <img src="/static/images/menu.png" alt=""> -->
                    <p>分类</p>
                </router-link>
            </li>
            <li class='car'>
                <router-link to='/car'>
                    <span class='iconfont icon-gouwuche'></span>
                    <!-- <img src="/static/images/_car.png" alt=""> -->
                    <p>购物车</p>
                    <div>0</div>  
                </router-link>
            </li>
            <li>
                <router-link to='/user'>
                    <span class='icon iconfont icon-yonghu'></span>
                    <!-- <img src="/static/images/myself.png" alt=""> -->
                    <p>会员中心</p>    
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'MyFooter',
    data(){
        return{

        }
    }
}
</script>

<style>
._footer{
    width: 100%;
    height: 100%;
    background: #fff;
}
._footer ul{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
._footer ul li{
    width: 25%;
}
._footer ul li a{
    color: #4c4c4c;
    display: block;
    width: 100%;
    height: 100%;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    position: relative;
}
._footer ul li a span{
    display: inline-block;
    margin-top: 8px;
    font-size: 24px;
}
._footer ul li a p{
    padding-top: 2px;
}
._footer li a.router-link-exact-active.router-link-active{
    color: #c40000;
}
._footer ul li.car div{
    width: 17px;
    height: 16px;
    background: #c40000;
    border-radius: 9px;
    position: absolute;
    right: 32%;
    top: 6px;
    color: #fff;
    text-align: center;
    line-height:16px
}
</style>
