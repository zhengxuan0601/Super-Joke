<template>
    <div class='myboko'>
        <div class='leftMain'>
            <div class='articlelist' v-for='(item,index) in articleList' :key='index'>
                <div class='title'>
                    <router-link to='/articledetail/3'>{{item.title}}</router-link>
                </div>
                <div class='articlemain'>
                    <div class='left'>
                        <p>{{item.articlemain}}</p>
                        <div class='articlebottom'>
                            <ul>
                                <li>{{item.id}}</li>
                                <li>{{item.time}}</li>
                                <li>{{item.tag}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class='right'><img :src="item.img" alt=""></div>
                </div>
            </div>
        </div>
        <div class='rightMain'>
            <right-main></right-main>
        </div>
    </div> 
</template>

<script>
import RightMain from '../components/RightMain'
export default {
    name:'Myboko',
    data(){
        return{
            articleList:[
                {
                    id:'浪子心声',time:'2018-09-26',tag:'浪子心声个人博客日记',title:'Web之路，经历了心酸之后',articlemain:"清理电脑里的时候，看到以前专业课的作业。看修改日期最早的一个压缩包还是06年的，7年的时间就这样过去了，这3年的学习成果就是这电脑里面的7个压缩包，感慨万千",img:'/static/images/pic1.jpg'
                },
                {
                    id:'浪子心声',time:'2018-09-26',tag:'浪子心声个人博客日记',title:'Come on,行动起来吧!我们和时间来一场赛跑!',articlemain:"Come on,行动起来吧!我们和时间来一场赛跑!时间过得那么飞快,使我的小心眼儿里不只是着急,还有悲伤.有一天,我放学回家,看到太阳快落山了,就下决心说:'我要比太阳更快地回家.'我狂奔回去,站在庭院前喘气的时候",img:'/static/images/banner.jpg'
                },
                {
                    id:'浪子心声',time:'2018-09-26',tag:'浪子心声个人博客日记',title:'一个SEO站长分享个人博客产品网赚建站经历全过程',articlemain:"我是一个普通的seo，更是一个再普通不过的站长，每天在网络公司优化着没完没了的企业网站，分析着杂乱无章的数据。每天15个小时面对电脑的生活可能是一种煎熬，但是我觉得很踏实，因为我在用我的双手和智慧来赚钱",img:'/static/images/pic1.jpg'
                },
                {
                    id:'浪子心声',time:'2018-09-26',tag:'浪子心声个人博客日记',title:'即便是坑，我也想要拉你入伙！',articlemain:"对于刚毕业的学生来说，想学习建网站，掌握一技之长，最简单的入门无非就是学会html和css，先前发表过一篇文章《如果要学习web前端开发，需要学习什么？",img:'/static/images/banner.jpg'
                },
                {
                    id:'浪子心声',time:'2018-09-26',tag:'浪子心声个人博客日记',title:'网易博客关闭，何不从此开始潇洒行走江湖！',articlemain:"网易博客关闭，何不从此开始潇洒行走江湖！从网易博客平台的出现，到现在已经有12个年头了，很多人还坚持着，网易博客一宣布关闭，很多人都很惋惜，那么多的文字记忆，又该如何是好？虽然可以一键搬迁到lofter，但这些数据毕竟还是属",img:'/static/images/pic1.jpg'
                }
            ]
        }
    },
    components:{
        RightMain
    }
}
</script>

<style scoped>
.myboko{
    display: flex;
    justify-content: space-between;
}
.myboko .leftMain{
    width: 64%;
    background: #fff;
    border: 1px solid #f1f1f1;
}
.myboko .leftMain .articlelist .title{
    height: 36px;
    line-height: 36px;
    border-bottom:1px solid #f1f1f1;
}
.myboko .leftMain .articlelist .title a{
    padding-left: 20px;
    display: block;
    color: #4c4c4c;
    border-left: 3px solid #2080f7;
}
.myboko .leftMain .articlelist .title a:hover{
    color: #2080f7;
}
.myboko .leftMain .articlelist .articlemain{
    padding:16px;
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #f1f1f1;
}
.myboko .leftMain .articlelist .articlemain .left{
    flex: 1;
}
.myboko .leftMain .articlelist .articlemain .left p{
    color: #666;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.myboko .leftMain .articlelist .articlemain .left .articlebottom{
    padding-top: 16px;
}
.myboko .leftMain .articlelist .articlemain .left .articlebottom ul{
    display: flex;
    padding: 8px 0 0;
}
.myboko .leftMain .articlelist .articlemain .left .articlebottom ul li{
    margin: 0 4px;
    color: #666;
    padding-left: 16px;
    font-size: 12px;
}
.myboko .leftMain .articlelist .articlemain .left .articlebottom ul li:first-child{
    background: url('/static/images/username.png') no-repeat
}
.myboko .leftMain .articlelist .articlemain .left .articlebottom ul li:nth-child(2){
    background: url('/static/images/time.png') no-repeat
}
.myboko .leftMain .articlelist .articlemain .left .articlebottom ul li:last-child{
    background: url('/static/images/tag.png') no-repeat
}
.myboko .leftMain .articlelist .articlemain .right{
    width: 160px;
}
.myboko .leftMain .articlelist .articlemain .right img{
    width: 150px;
    display: block;
    margin: auto;
}
.myboko .rightMain{
    width: 32%;
    
}
</style>
