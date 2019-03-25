<template>
    <div class=_header>
      <!-- 返回按钮 -->
        <div class='back' v-show="isback" @click='back'></div>
        <!-- logo图 -->
        <div class='logo' v-show='islogo'><img src="/static/images/logo.gif" alt=""></div>
        <!-- 标题 -->
        <h3>{{title}}</h3>
        <!-- 购物车按钮 -->
        <div class='car' v-show='carshow'></div>
        <!-- 分类按钮 -->
        <div class='menu' v-show='ismenu'></div>
    </div>
</template>

<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  },
  props:{
    isback:{
      default:false,
      type:Boolean
    },
    title:{
      default:'',
      type:String
    },
    carshow:{
      default:false,
      type:Boolean
    },
    islogo:{
      type:Boolean,
      default:false
    },
    ismenu:{
      type:Boolean,
      default:false
    },
    width:{
      type:String,
      default:'50%'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
._header{
  width: 100%;
  height: 100%;
  background: #c40000;
  position: relative;
}
._header .back{
    width:46px;
    height: 46px;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background:url(/static/images/_back.png) no-repeat center center;
  }
  ._header h3{
    text-align: center;
    line-height: 46px;
    font-size: 16px;
    color: #fff;
    font-weight: normal;
  }
  ._header .car{
    width: 46px;
    height: 46px;
    position: absolute;
    top: 0;
    right: 0;
    background:url(/static/images/car.png) no-repeat center center;
  }
  ._header .menu{
    width: 46px;
    height: 46px;
    position: absolute;
    top: 0;
    right: 0;
    background:url(/static/images/_menu.png) no-repeat center center;
  }
  ._header .logo{
    width: 128px;
    height: 32px;
    position: absolute;
    left: 10px;
    top:7px;
  }
  ._header .logo img{
    display: block;
    width:100%;
    height: 100%;
  }
</style>
