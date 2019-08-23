<template>
    <div class='main'>
        <div class='mainbox' v-for='(item,index) in articleList' :key='index'>
            <div class='title'>
                <div></div>
                <h3>{{item.title}}</h3>
            </div>
            <ul>
                <li v-for='(item,index) in item.articleList' :key='index'>
                    <router-link to='/articledetail/4'>
                        <p>{{item.title}}</p>
                        <span>{{item.time}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'RightMain',
    data(){
        return{
             articleList:[
                 {
                     title:'文章排行',
                     articleList:[
                         {title:'个人博客，我为什么要用帝国cms？',time:'09-26'},
                         {title:'制作个人博客，我是这么收费的？',time:'09-26'},
                         {title:'个人网站做好了，百度不收录怎么办？来，看看他们怎么做的。',time:'09-26'},
                         {title:'一个SEO站长分享个人博客产品网赚建站经历全过程',time:'09-26'},
                         {title:'Web之路，经历了心酸之后',time:'09-26'},
                         {title:'即便是坑，我也想要拉你入伙！',time:'09-26'}
                    ]
                 },
                 {
                     title:'本栏推荐',
                     articleList:[
                         {title:'Web之路，经历了心酸之后',time:'09-26'},
                         {title:'即便是坑，我也想要拉你入伙！',time:'09-26'}
                    ]
                 },
                 {
                     title:'栏目更新',
                     articleList:[
                         {title:'个人博客，我为什么要用帝国cms？',time:'09-26'},
                         {title:'制作个人博客，我是这么收费的？',time:'09-26'},
                         {title:'个人网站做好了，百度不收录怎么办？来，看看他们怎么做的。',time:'09-26'},
                         {title:'一个SEO站长分享个人博客产品网赚建站经历全过程',time:'09-26'},
                         {title:'Web之路，经历了心酸之后',time:'09-26'},
                         {title:'即便是坑，我也想要拉你入伙！',time:'09-26'},
                    ]
                 }
             ]
        }
    },
    created(){
       
    }
}
</script>

<style scoped>
.main .mainbox{
        width: 100%;
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
</style>
