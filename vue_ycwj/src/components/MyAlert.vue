<template>
    <div class='screen' v-show='isalert'>
        <div class='alert'>
            <p>{{title}}</p>
            <div class='btn'>
                <button class='sure' @click='issure'>确定</button>
                <button class='reset' @click="reset">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"MyAlert",
    data(){
        return{
            path:'',
        }
    },
    methods:{
        reset(){
            this.$parent.isalert=false
        },
        issure(){
            //判断父组件的路由
            if(this.path=='/car'){
                this.$parent.isalert=false
                let idx=this.$parent.idx
                console.log(idx)
                this.$parent.list.splice(idx,1)
                this.$parent.getAllprice()
            }
        }
    },
    created(){
        //console.log(this.$parent.$route.path) 获取到父组件的路由
        this.path=this.$parent.$route.path
    },
    props:{
        title:{
            type:String,
            default:''
        },
        isalert:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style>
.screen{
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.2);
    overflow: hidden;
    position: fixed;
    top:0px;
    left: 0px;
    z-index: 200;
}
.alert{
    width: 55%;
    height: 100px;
    background: #fff;
    border-radius: 6px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    border:1px solid #ccc;
    text-align: center;
    font-size: 12px;
    color: #4c4c4c;
    padding: 10px;
    box-sizing: border-box;
}
.alert .btn{
    width: 80%;
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: space-between;
    left: 50%;
    transform: translate(-50%)
}
.alert .btn button{
    width: 40px;
    height: 22px;
    background: none;
    border:none;
    color: #fff;
    font-size: 12px;
    outline: none;
    border-radius: 2px;
}
.alert .btn button.sure{
    background: #6bd0a2;
}
.alert .btn button.reset{
    background: #FA5437;
}
</style>
