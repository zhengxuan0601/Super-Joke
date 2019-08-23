<template>
    <div>
        <!-- 轮播图展示 -->
        <div class='bannerBox'>
            <div class='bannerHead'>
                <h3>个人博客网站模板头条展示</h3>
            </div>
            <div class='banner'>
                <div class='bannerImg' ref='bannerImg'>
                    <ul ref='ul'>
                        <li ref='li' v-for='(item,index) in bannerList' :key='index'>
                            <router-link to='/articledetail/1'>
                                <img :src="item.imgUrl" alt="">
                                <p>{{item.title}}</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 首页主要内容展示 -->
        <div class='main'>
            <div class='mainbox' v-for='(item,index) in titleList' :key='index'>
                <div class='title'>
                    <div></div>
                    <h3>{{item}}</h3>
                </div>
                <ul>
                    <li v-for='(item,index) in articleList' :key='index'>
                        <router-link to='/articledetail/2'>
                            <p>{{item.title}}</p>
                            <span>{{item.time}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 底部样式 -->
        <footer>
            <p>谢谢浏览</p>
        </footer>
    </div>
</template>

<script>
export default {
    name:'Index',
    data(){
        return{
           bannerList:[
               {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！'
               },
               {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！'
               },
               {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！'
               },
               {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！个人博客，属于我的小世界！'
               },
                {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！个人博客，属于我的小世界！'
               },
               {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！个人博客，属于我的小世界！'
               },
               {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！个人博客，属于我的小世界！'
               },
                {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！个人博客，属于我的小世界！'
               },
               {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！个人博客，属于我的小世界！'
               },
               {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！个人博客，属于我的小世界！'
               },
                {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！个人博客，属于我的小世界！'
               },
               {
                   imgUrl:'/static/images/banner.jpg',
                   title:'个人博客，属于我的小世界！个人博客，属于我的小世界！'
               } 
           ] , //轮播图的数据

           articleList:[{
                    title:'Web之路，经历了心酸之后',
                    time:'09-26'
                },
                {
                    title:'CSS3 伪类选择器 nth-child() 的用法',
                    time:'09-26'
                },
                {
                    title:'即便是坑，我也想要拉你入伙！',
                    time:'09-26'
                },
                {
                    title:'CSS3边框圆角的实现',
                    time:'09-26'
                },
                {
                    title:'网易博客关闭，何不从此开始潇洒行走江湖！',
                    time:'09-26'
                },
                {
                    title:'IE6到底哪里不好？你还继续用IE6吗？',
                    time:'09-26'
                },
                {
                    title:'从摄影作品中获取网页颜色搭配技巧',
                    time:'09-26'
                },
                {
                    title:'我的个人博客之——阿里云空间选择',
                    time:'09-26'
                },
           ], //文章数据

           titleList:['站长推荐','网页设计心得','网页设计素材','博客网站制作','个人博客日记','个人博客模板'] , //标题数据
           timer:null, //设置定时器变量
        }
    },
    // 创建之后
    created(){
       
    },
    // 挂载之后
    mounted(){
        let that= this  //解决this指向问题
        // 轮播图事件
        let v=-2;  //图片移动的速度
        let ul=this.$refs.ul
        let li=this.$refs.li
        let liL=li.length
        let bannerImg=this.$refs.bannerImg
        function bannerMove(){
            that.timer=setInterval(()=>{
                ul.style.left=(ul.offsetLeft+v)+'px'
                if(ul.offsetLeft>0 || ul.offsetLeft*-1>(li[0].offsetWidth+10)*liL-bannerImg.offsetWidth){
                    v=-v
                }
            },36)
        }
        bannerMove()
        // 当鼠标进入的时候图片移动速度减慢
        bannerImg.onmouseenter=function(){
            v=v/2
        }
        // 鼠标离开的后移动速度加快
         bannerImg.onmouseleave=function(){
            v=2*v
        }
    },
    methods:{
        
    },
    beforeDestroy(){
        // 在路由跳转之前清除定时器
        clearInterval(this.timer)
    }
       
}
</script>

<style scoped>
    .bannerBox{
        background: #fff;
        border: 1px solid #f1f1f1
    }
    .bannerBox .bannerHead{
        line-height: 40px;
        border-bottom: 1px solid #f1f1f1;
        text-align: center; 
        font-size: 16px;
        color: #4c4c4c;
        cursor: default;
    }
    .bannerBox .bannerHead h3{
        display: inline-block;
    }
    .bannerBox .bannerHead h3:hover{
        color: #9e7d7d;
    }
    .bannerBox .banner{
        padding: 10px;
    }
    .bannerBox .banner .bannerImg{
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
    }
    .bannerBox .banner .bannerImg ul{
        overflow: hidden;
        position: relative; 
        width: 3000px;
        left: 0px;
    }
    .bannerBox .banner .bannerImg ul li{
        text-align: left;
        width: 210px;
        margin-right:10px;
        float: left;
    }
    .bannerBox .banner .bannerImg ul li a{
        display:block;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .bannerBox .banner .bannerImg ul li a:hover p{
        color: #9e7d7d;
    }
    .bannerBox .banner .bannerImg ul li img{
        display: block;
        width: 210px;
        height:150px;
        margin:0 auto;
    }
    .bannerBox .banner .bannerImg ul li p{
        color: #4c4c4c;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .main{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        flex-wrap: wrap;
    }
    .main .mainbox{
        width: 32%;
        background: #fff;
        border:1px solid #f1f1f1;
        margin-bottom: 10px;
    }
    .main .mainbox .title{
        height: 40px;
        border-bottom: 1px solid #f1f1f1;
        line-height: 40px;
        display: flex;
    }
    .main .mainbox .title div{
        width: 40px;
        height: 40px;
        border-right: 1px solid #f1f1f1;
        background: url(/static/images/bug.png) no-repeat center;
    }
    .main .mainbox .title h3{
        padding-left: 10px;
        color: #666;
        font-weight: bold;
    }
    .main .mainbox ul li{
        background: url(/static/images/knowledge.png) no-repeat 6px center;
    }
    .main .mainbox ul li a{
        display: flex;
        justify-content: space-between;
        padding: 0 20px 0 30px;
        line-height: 36px;
    }
    .main .mainbox ul li a p{
        color: #4c4c4c;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80%;
    }
    .main .mainbox ul li:hover p{
        color: #9e7d7d;
    }
    .main .mainbox ul li a span{
        color: #999;
        font-size: 12px;
    }
    footer{
        width:100%;
        height: 40px;
        line-height: 40px;
        background: #fff;
        text-align: center;
    }
    footer p{
        font-size: 15px;
        color: #666;
        font-weight: bold;
    }
</style>
