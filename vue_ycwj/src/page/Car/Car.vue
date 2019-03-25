<template>
    <div>
        <my-alert :isalert='isalert' :title='title'></my-alert>
        <div class='myheader'>
            <my-header :isback='true' title='购物车'></my-header>
        </div>
        <div class='contain'>
            <!-- 购物车列表为空的时候出现 -->
            <div class='none' v-if='!list.length'>
                <div class='carpic'>
                    <img src="/static/images/rightcar.png" alt="">
                    <p>没有宝贝哦，不如去添加宝贝</p>
                </div>
                <div class='btngroup'>
                    <button class='goshop'>去购物</button>
                    <button class='seelike'>查看收藏夹</button>
                </div>
            </div>
            <!-- 购物车列表不为空的时候出现 -->
            <div class='cardetails' v-if='list.length'>
                <ul>
                    <li v-for='(item,idx) in list' :key='idx'>
                        <div class='li-left'  @touchstart='touchstart' @touchend='touchend' @touchmove='touchmove'>
                            <div class='proselect'>
                                <label :class="item.state?'active':''"  @click='checked(item,idx)' ref="chk"></label>
                            </div>
                            <div class='proimg'>
                                <img src="/static/images/pro.jpg" alt="">
                            </div>
                            <div class='prodetail'>
                                <p>{{item.name}}</p>
                                <span>￥<i>{{item.price}}</i></span>
                                <label>
                                    <button class='reduce' @click='reduce(item,idx)'>-</button><input type="text" :value='item.count' readonly><button class='add' @click="add(item,idx)">+</button>
                                </label>
                            </div>
                        </div>
                        <div class='li-del' @click='del(item,idx)'><span>删除</span></div>
                    </li>
                </ul>
            </div>
            
            <div class='bottom' v-if='list.length'>
                <div class='left'>
                    <label @click="allchecked" :class="allState?'active':''"></label>
                    <span>全选</span>
                </div>
                <div class='right'>
                    <p>合计:<em>￥<span>{{allPrice}}</span></em></p>
                    <button>结算 (<span>1</span>)</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyHeader from '../../components/MyHeader'
import MyAlert from '../../components/MyAlert'
export default {
    name:'Car',
    data(){
        return{
            touchstartX:'',
            touchendX:'',
            isalert:false,
            title:'',
            list:[
                {
                    name:'数码桥A4复印纸 80g纸 500/张没包 A4静电复印纸 办公用纸',
                    count:1,
                    price:'228',
                    state:false
                },
                    {
                    name:'数码桥A4复印纸 80g纸 500/张没包 A4静电复印纸 办公用纸',
                    count:1,
                    price:'528',
                    state:false
                },
                    {
                    name:'数码桥A4复印纸 80g纸 500/张没包 A4静电复印纸 办公用纸',
                    count:1,
                    price:'1028',
                    state:false
                }
            ],
            idx:"",  //删除的时候的index
            allPrice:'0.00',
            allState:false
        }
    },
    components:{
        MyHeader,
        MyAlert
    },
    created(){
        var list=this.list
        for(let i=0;i<list.length;i++){
            list[i].price=Number(list[i].price).toFixed(2)
        }
        this.list=list
    },
    methods:{
        //滑动li出现删除按钮的效果
        touchstart(ev){
            // console.log(ev.touches[0].clientX)
            this.touchstartX=ev.touches[0].clientX
        },
        touchend(ev){
            // console.log(ev.changedTouches[0].clientX)
            this.touchendX=ev.changedTouches[0].clientX
            var touches=this.touchstartX-this.touchendX
            if(touches>40){
                ev.currentTarget.style.marginLeft='-40px';
                ev.currentTarget.nextElementSibling.style.width='40px'
            }else if(touches<0){
                ev.currentTarget.style.marginLeft='0';
                ev.currentTarget.nextElementSibling.style.width='0px'
            }
        },
        touchmove(ev){
            var touchmoveX=ev.changedTouches[0].clientX
            var touches=this.touchstartX-touchmoveX
            if(touches>0){
                if(touches>40){
                    touches=40
                    ev.currentTarget.style.marginLeft=-1*(touches)+'px'
                    ev.currentTarget.nextElementSibling.style.width=touches+'px'
                }else if(touches<20){
                    ev.currentTarget.style.marginLeft='0px'
                    ev.currentTarget.nextElementSibling.style.width='0px'
                }
                
            }
            
        },
        //删除按钮事件
        del(item,idx){
            this.isalert=true;
            this.title='是否从购物车删除此项商品?';
            this.idx=idx
            this.getAllprice()
        },
        
        // 购物车增加
        add(item,idx){
            var list=this.list
            list[idx].count++
            this.list=list
            item.state=true
            this.getAllprice()
        },
        // 购物车减少
        reduce(item,idx){
            let list=this.list
            if(list[idx].count>1){
                list[idx].count--
            }else{
                return
            }
            item.state=true
            this.list=list
            this.getAllprice()
        },

        //全选事件
        allchecked(){
            this.allState=!this.allState
            for(var i=0;i<this.list.length;i++){
                this.list[i].state=this.allState
            }
            this.getAllprice()
        },

        // 自己选择事件
        checked(item,idx){
            item.state=!item.state
            this.getAllprice()
        },

        // 总计价格
        getAllprice(){
            let list=this.list
            let allPrice=0
            let state=true
            for(let i=0;i<list.length;i++){
                if(list[i].state){
                    allPrice+=list[i].count*list[i].price
                }else{
                    state=false
                }
            }
            this.allPrice=allPrice.toFixed(2)
            this.allState=state
        }
        
        
    }
}
</script>

<style scoped>
    .contain{
        width: 100%;
        box-sizing: border-box;
        padding:46px 0 0 0;
        background: #fff;
        height: 100vh;
        overflow: scroll;
    }
    .contain .none{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .contain .none .carpic{
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%);
        text-align: center;
        overflow: hidden;
    }
    .contain .none .carpic img{
        width: 66%;
    }
    .contain .none .carpic p{
        color:#333;
        font-size: 14px;
        margin-top: 10%;
    }
    .contain .none .btngroup{
        position: absolute;
        top: 55%;
        width: 100%;
        left: 0;
        display: flex;
        justify-content: space-around;
    }
    .contain .none .btngroup button{
        width: 30%;
        height: 32px;
        border-radius: 4px;
        border:none;
        background: none;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        outline: none;
    }
    .contain .none .btngroup button.goshop{
        background: #6bd0a2;
    }
    .contain .none .btngroup button.seelike{
        background: #FA5437;
    }
    .contain .cardetails{
        width: 100%;
        box-sizing: border-box;
        padding-bottom: 60px;
    }
    .contain .cardetails ul{
        width: 100%;
    }
    .contain .cardetails ul li{
        width: 100%;
        display: flex;
        border-bottom:1px solid #f1f1f1;
        border-top:1px solid #f1f1f1;
    }
    .contain .cardetails ul li .li-left{
        width: 100%;
        display: flex;
        transition: 0.5s;
    }
    .contain .cardetails ul li .li-del{
        width: 0;
        overflow: hidden;
        transition: 0.5s;
        background: #c40000;
        color:#fff;
        text-align: center;
        font-size: 12px;
        vertical-align: middle;
        white-space: nowrap;
        line-height: 110px;
    }
    .contain .cardetails ul li .proselect{
        width: 6%;
        text-align: center;
        position: relative;
    }
    .contain .cardetails ul li .proselect label{
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: url('/static/images/_uncheck.png') no-repeat;
        background-size: 100%;
    }
    .contain .cardetails ul li .proselect label.active{
        background: url('/static/images/_checked.png') no-repeat;
        background-size: 100%;
    }
    .contain .cardetails ul li .proimg{
        width: 100px;
        box-sizing: border-box;
        padding:5px;
        padding-left: 6px;
    }
    .contain .cardetails ul li .proimg img{
        width: 96px;
        height: 96px;
        box-sizing: border-box;
        padding:5px;
    }
    .contain .cardetails ul li .prodetail{
        flex: 1;
        box-sizing: border-box;
        padding:5px;
        position: relative;
    }
    .cardetails ul li .prodetail p{
        font-size: 12px;
        color: #333;
        font-weight: bold;
        padding-top: 10px;
    }
    .cardetails ul li .prodetail span{
        color: #c40000;
        font-size: 12px;
        float:left;
        padding-top: 15px;
    }
    .cardetails ul li .prodetail span i{
        font-style: normal;
    }
    .cardetails ul li .prodetail label{
        border:1px solid #ccc;
        overflow: hidden;
        display: inline-block;
        margin-top: 10px;
        box-sizing: border-box;
        margin-left: 6px;
    }
    .cardetails ul li .prodetail label button{
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 20px;
        background: none;
        border:none;
        font-weight: bold;
        float:left;
        outline:none;
    }
    .cardetails ul li .prodetail label input[type=text]{
        width: 46px;
        height: 24px;
        text-align: center;
        box-sizing: border-box;
        border:none;
        float:left;
        outline: none;
    }
    .contain .bottom{
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 50%;
        transform: translate(-50%);
        height: 50px;
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        background: #fefefe;
        border-top: 1px solid #f1f1f1;
        z-index: 99;
    }
    .contain .bottom .left label{
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: relative;
        left: 10px;
        top: 3px;
        background: url('/static/images/_uncheck.png') no-repeat;
        background-size: 100%;
    }
    .contain .bottom .left label.active{
        background: url('/static/images/_checked.png') no-repeat;
        background-size: 100%;
    }
    .contain .bottom .left span{
        font-size: 14px;
        margin-left: 10px;
    }
    .contain .bottom .right{
        display: flex;
        font-size: 14px;
    }
    .contain .bottom .right em{
        padding: 0 5px;
        color: #c40000;
    }
    .contain .bottom .right button{
        width: 80px;
        height: 50px;
        color: #fff;
        text-align: center;
        border:none;
        background: #c40000;
    }
</style>
