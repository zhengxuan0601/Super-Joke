<template>
    <div>
        <div class='myheader'><my-header isback='true' title='商品详情'></my-header></div>
        <div class='container'>
            <div class='img'><img src="/static/images/one.png" alt=""></div>
            <div class='main'>
                <h3>【国内专柜】雅诗兰黛红石榴护肤化妆品套装 五件套洗面奶爽肤水滋润型面霜+晚霜眼霜送礼盒礼袋</h3>
                <div class='flex'>
                    <p class='red'>￥1600.00</p>
                    <p>折扣：<span class='red'>9折</span></p>
                    <p>数量：1</p>
                </div>
            </div>
            <div class='pro-info'>
                <div class='tab'>
                    <div class='xq active'>宝贝详情</div>
                    <div class='pj'>宝贝评价</div>
                    <div class='wt'>常见问题</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyHeader from '../../components/MyHeader'
export default {
    name:'ProInfo',
    data(){
        return{

        }
    },
    components:{
        MyHeader
    }
}
</script>

<style scoped>
.container{
    padding: 46px 0 50px 0;
    background: #e3f4fd;
}
.container .img img{
    display: block;
    width: 100%;
}
.container .main{
    background: #fff;
    margin-top: 10px;
}
.container .main h3{
    font-weight: normal;
    padding:10px;
}
.container .main .flex{
    display: flex;
    justify-content: space-between;
    padding:10px;
    box-sizing: border-box;
}
.container .main .flex .red{
    color: red;
    font-weight: 600
}
.container .pro-info{
    padding:20px 0;
    background: #fff;
    margin-top: 10px;
}
.container .pro-info .tab{
    display: flex;
    justify-content: space-around;
}
.container .pro-info .tab>div{
    width: 20%;
    text-align: center;
    line-height: 36px;
}
.container .pro-info .tab .active{
    color: red;
    border-bottom: 2px solid red;
}
</style>
