<template>
    <div>
        <div class='myheader'><my-header :isback='true' title='商品分类'></my-header></div>
        <div class='contain' ref='contain'>
            <div class='choose'>
                <ul> 
                    <li :class='order=="id"?"active":""' @click='tab("id","asc")'>综合排序
                        <span class='sj-down'></span>
                    </li>
                    <li :class='sort=="asc"&&order=="price"?"active":""' @click='tab("price","asc")'>价格升序
                        <span class='sj-up'></span>
                    </li>
                    <li :class='sort=="desc"?"active":""' @click='tab("price","desc")'>价格降序
                        <span class='sj-down'></span>
                    </li>
                </ul>
            </div>
            <div class='pro-show'>
                <ul>
                    <li v-for='(item,idx) in list' :key='idx'>
                        <div class='left-pic'>
                            <router-link to=''>
                                <img :src="item.img" alt="">
                            </router-link>
                        </div>
                        <div class='right-detail'>
                            <p>{{item.desc}}</p>
                            <span>￥<em>{{item.price}}.00</em></span>
                            <div class='buycar'>
                                <img src="/static/images/red-car.png" alt="">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <p>{{str}}</p>
        </div>
    </div>
</template>

<script>
import MyHeader from '../../components/MyHeader'
export default {
    name:'Category',
    data(){
        return{
            params:'', //路由传递过来的参数
            list:[] , //所有商品的数据
            order:'id',//排序依据
            sort:'asc',//排序为升序
            page:0, //当前的页数
            newOrder:"", //新的order
            newSort:'', //新的sort
            state:true,//状态变量
            str:'加载中···'
        }
    },
    components:{
        MyHeader
    },
    created(){
        this.params=this.$route.params.id
        // 请求商品数据
        this.getPro()
    },
    methods:{
        // 请求商品数据的方法
        getPro(){
            // 如果状态为false立即退出
            if(!this.state){
                return
            }
            // 进来以后立马改变状态为false
            this.state=false
            this.$axios.get(this.$api.baseUrl+this.$api.list,{
                params:{
                    'classID':this.params,
                    'order':this.order,
                    'sort':this.sort,
                    'page':this.page
                }
            })
            .then(res=>{
                let data=res.data.data
                this.list=this.list.concat(data)
                if(data.length<10){
                    this.state=false
                    this.str='没有数据了！'
                }else{
                    this.state=true
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },

        // 点击按不同方式排序
        tab(order,sort){
            this.order=order
            this.sort=sort
            this.page=0
            this.list=[] //将list变成空数组
            this.state=true //状态变量打开，防止滚动到最底部以后再次点击排序不请求数据
            this.getPro()
        },
    }, 

    // 挂载完成以后
    mounted(){
        let WH=window.innerHeight //整个屏幕的宽度
        window.onscroll = ()=>{
           let overY=window.scrollY  //滚动出去的距离
           let DH=document.documentElement.offsetHeight  //整个文档的高度
           if(overY+WH>DH-30){
               this.page++
               this.getPro()
           }
		}
    }
}
</script>

<style>
.contain{
    width: 100%;
    padding:46px 0 10px 0;
    box-sizing: border-box;
    background: #fff;
}
.contain>p{
    text-align: center;
    padding-top: 10px;
    font-size: 16px;
}
.contain .choose{
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    height: 38px;
}
.contain .choose ul{
    display: flex;
    justify-content: space-around;
}
.contain .choose ul li{
    width: 33%;
    text-align: center;
    line-height: 38px;
    font-size: 14px;
    color: #333;
}
.contain .choose ul li.active{
    color: #c40000;
}
.contain .choose ul li span.sj-down{
    display: inline-block;
    border-top: 0.5em solid #ccc;
    border-right: 0.5em solid #fff;
    border-left: 0.5em solid #fff;
    border-bottom: 0.5em solid #fff;
    position: relative;
    top: 6px;
}
.contain .choose ul li.active span.sj-down{
    border-top: 0.5em solid #c40000;
}
.contain .choose ul li span.sj-up{
    display: inline-block;
    border-top: 0.5em solid #fff;
    border-right: 0.5em solid #fff;
    border-left: 0.5em solid #fff;
    border-bottom: 0.5em solid #ccc;
    position: relative;
}
.contain .choose ul li.active span.sj-up{
    border-bottom: 0.5em solid #c40000;
}
.contain .pro-show{
    width: 100%;
}
.contain .pro-show ul{
    width: 100%
}
.contain .pro-show ul li{
    width: 100%;
    border-bottom:1px solid #f1f1f1;
    padding:4px 0;
    box-sizing: border-box;
    display: flex;
}
.contain .pro-show ul li .left-pic{
    width: 120px;
}
.contain .pro-show ul li .left-pic a{
    display: block;
    width: 100%
}
.contain .pro-show ul li .left-pic a img{
    width: 120px;
    height: 120px;
}
.contain .pro-show ul li .right-detail{
    flex: 1;
    padding: 10px 6px 10px 6%;
    position: relative;
}
.contain .pro-show ul li .right-detail p{
    font-size: 14px;
    color: #000;
}
.contain .pro-show ul li .right-detail span{
    color: #c40000;
    font-size: 14px;
    padding-top: 6px;
    display: inline-block;
}
.contain .pro-show ul li .right-detail .buycar{
    width: 24px;
    height: 24px;
    position: absolute;
    right: 12px;
    bottom: 24px;
}
</style>
