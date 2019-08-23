<template>
    <div class='articledetail'>
        <div class='detailLeft'>
            <div class='title'>Web之路，经历了心酸之后</div>
            <div class='articlebottom'>
                <ul>
                    <li>浪子心声</li>
                    <li>2018-09-26</li>
                    <li>个人博客日记</li>
                </ul>
            </div>
            <div class='articlemain'>
                <div class='introduce'>
                    <span class='blue'>简介</span>
                    清理电脑里的时候，看到以前专业课的作业。看修改日期最早的一个压缩包还是06年的，7年的时间就这样过去了，这3年的学习成果就是这电脑里面的7个压缩包，感慨万千
                </div>
                <p>清理电脑里的时候，看到以前专业课的作业。看修改日期最早的一个压缩包还是06年的，7年的时间就这样过去了，这3年的学习成果就是这电脑里面的7个压缩包，感慨万千...</p>
                <p>什么是母校？母校就是那个你一天骂他八遍却不许别人骂一遍的地方”当听到不少学弟学妹在抱怨学校差的时候，至今我也没后悔过，因为我经历了我认为最苦的那一段时期。学校是在偏远的郊区，环境也不好，遇上下雨天，没有到必须出门的时候，怎么也不会走出校门半步，我记得那天是刚下完雨的早上，因为要去考试，不得不出去。当我这踏上这满是泥泞的路，甚至都找不到有点草稍微好走的地方，看着鞋深深的陷入其中，抬起脚，满是泥，脚上无比沉重。就这样一步一步的走出校园，回头望望这一里路，我哭了，滋味很苦。一年后我接待一新生，印象深刻的是，我问她环境怎么样，她说“我很喜欢这个学校，比我以前的学校好太多了”，而那时候的我，真恨不得赶紧离开。而她那一句话却整整影响了我三年。</p>
                <p>当初这个北大青鸟专业很火，我没有想到学校居然有一个培训类的专业学科。因为当初这个学费很贵。加上住宿都有7000块钱左右，所以来读这个专业的其实很少。第一年学费是我家卖了6000多块钱的蒜才凑齐的，为的就是让我能读一个好的专业。“所有贵的都是好的”这种观点都不知道影响了多少人。本是文科生，硬塞进去读了理科专业。刚接触这个课程的时候，兴奋期只是在发完新课本的那天，偏偏就喜欢闻着新书的味道。课本的厚度是跟专业的重要性成正比例的。唯一喜欢的最后那本关于“职场素质”培训的书，虽然只有几页，但是我很肯定的是，都爱看。唯独专业课本，大家都翻翻几页，新鲜感一过去就什么兴致也没有了。认认真真学习几天，除了前几页熟悉外，之后的就一问三不知了。难度也越来越深。也越来越想放弃这门科。</p>
                <p>前期都是比较轻松的课程，web前端设计这门课，第一堂课，杨飞老师连续点了两次17号起来回答问题，具体是什么问题，我忘记了，第一次是 我正在和同学说话。差点没有回答上，是同学在旁边提醒我。第二次我是在认真听课，可不知道老师说的什么。回答不上问题，那是普通一学生在课堂上再普通不过的事情，可偏偏我却被点了两次。我自尊心很强，也很要面子。那一堂课程下来，我回去把整本书翻来覆去，发誓一定要学好。也就是那一堂课，我没有放弃这门课程，至今仍然很感谢杨飞老师。</p>
                <p>没有金钱，是没有动力的。偶然一天逛街的时候，遇到大学的老师，招呼还没打完，他就说正要找我呢。让我跟他合作做一个网站，他负责开发后台系统，我负责前台设计。我当时又要拒绝的，可听到他说有几千块钱的报酬，我很肯定的就答应了。回去之后，我就在网上到处找资料，看视频，把公司的门户网站，copy下来自己研究，跟着一步一步做，理解了div怎么布局的，就简单了。我就拿着那点儿本事，做了我第一个有报酬的网站。后来也成为我去思衡的被认可的作品。因为经验尚浅，现在再打开以前的网页，布局跟现在的比，完全是好几个档次，而且还不兼容。我不会flash，不会Photoshop，而这些恰恰都是我必须做的事情。幸好认识了一朋友，他虽然也不会，但是他有他的方法，AAAlogo，阿里妈妈的banner，就让我做成了网站的banner。后来跟我同住的张园，我每天晚上玩电脑，看电影的时候，他却在看Photoshop，天天都如此，这样 强大的压力下，我跟他学习起了Photoshop。</p>
            </div>
            <div class='statement'>
                <p>郑重声明:</p>
                <p>本站所有活动均为互联网所得，如有侵权请联系本站删除处理</p>
            </div>
        </div>
        <div class='detailRight'>
            <right-main></right-main>
        </div>
    </div>
</template>

<script>
import RightMain from '../components/RightMain'
export default {
    name:'ArticleDetail',
    data(){
        return{
           
        }
    },
    created(){
        // 获取传过来的参数
        // console.log(this.$route.params)
    },
    components:{
        RightMain
    },
    // 在页面进来之前判断进来的路由，给头部nav添加class
    beforeRouteEnter(to, from, next) {
            let path=from.path
            let li=document.querySelectorAll('header li')
        next( vm=>{
            for(let i=0;i<li.length;i++){
                if(li[i].children[0].getAttribute('href')=='#'+path){
                    li[i].children[0].setAttribute('class','router-link-exact-active router-link-active')
                    vm.index=i  //获取从头部导航进入的下标
                }
            }
        } )
    },
    // 在路由退出之前将原来导航栏添加的class去除
    beforeRouteLeave(to,from,next){
        let path=to.path
        let idx=this.index
        let li=document.querySelectorAll('header li')
        li[idx].children[0].setAttribute('class','')
        next()
    }
}
</script>

<style scoped>
.articledetail{
    display: flex;
    justify-content: space-between;
}
.articledetail .detailLeft{
    width: 64%;
    background: #fff;
    padding: 16px;
    border: 1px solid #f1f1f1;
}
.articledetail .detailLeft .title{
    font-size: 15px;
    color: #666;
    font-weight: bold;
}
.articledetail .detailLeft .articlebottom{
    padding-top: 16px;
}
.articledetail .detailLeft .articlebottom ul{
    display: flex;
}
.articledetail .detailLeft .articlebottom ul li{
    margin: 0 4px;
    color: #666;
    padding-left: 16px;
    font-size: 12px;
}
.articledetail .detailLeft .articlebottom ul li:first-child{
    background: url('/static/images/username.png') no-repeat
}
.articledetail .detailLeft .articlebottom ul li:nth-child(2){
    background: url('/static/images/time.png') no-repeat
}
.articledetail .detailLeft .articlebottom ul li:last-child{
    background: url('/static/images/tag.png') no-repeat
}
.articledetail .detailLeft .articlemain{
    padding: 8px 0;
}
.articledetail .detailLeft .articlemain>p{
    padding:2px 0;
    color: #666;
    text-indent: 12px;
}
.articledetail .detailLeft .articlemain .introduce{
    color: #4c4c4c;
    margin-bottom: 10px;
}
.articledetail .detailLeft .articlemain .introduce .blue{
    color: #2080f7;
}
.articledetail .detailLeft .statement{
    width: 90%;
    margin: 10px auto;
    border: 1px solid rgba(255,187,118,1);
    background: rgba(255,187,118,0.2);
    border-radius: 4px;
    padding:20px;
    line-height: 36px;
}
.articledetail .detailLeft .statement p:first-child{
    color: #4d4d4d;
    font-weight: bold;
}
.articledetail .detailLeft .statement p:last-child{
    color: #666;
}
.articledetail .detailRight{
    width: 32%
}
</style>
