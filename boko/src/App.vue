<template>
  <div id="app">
    <header class='topHeader'>
        <div class='title'><h3>浪子心声的个人博客</h3></div>
        <ul>
          <li v-for='(item,index) in headList' :key='index'><router-link :to='item.route'>{{item.name}}</router-link></li>
        </ul>
    </header>
    <section>
      <aside class='leftBar' ref="bar">
        <div class='toggleS' @click='toggleS'></div>
      </aside>
      <div class='contain' ref='contain'>
        <div class='bread'>
            <p>您好，欢迎您访问浪子心声个人博客官方网站！</p>
        </div>
        <div class='loadHtml'>
          <router-view/>
        </div>
        <!-- 至顶按钮 -->
        <div class='toTop' v-if='toTopState' @click='toTop'></div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'App',
  data(){
    return{
      headList:[{
          name:'网站首页',
          route:'/'
        },
        {
          name:'个人博客日记',
          route:'/myboko'
        },
        {
          name:'关于我',
          route:'/aboutus'
        },
        {
          name:'留言',
          route:'/message'
        }
      ], //头部导航栏数据
      state:true,  //控制leftBar伸缩状态
      toTopState:false
    }
  },
  methods:{
    // 点击页面伸缩
    toggleS(){
      let bar=this.$refs.bar
      let contain=this.$refs.contain
      if(this.state){
        bar.style.width='50px'
        contain.style.paddingLeft='50px'
        this.state=false
      }else{
        bar.style.width='180px'
        contain.style.paddingLeft='180px'
        this.state=true
      }
    },

    // 点击至顶部
    toTop(){
      let contain=this.$refs.contain
      // 回到顶部动画效果
      let timer=setInterval(()=>{
        contain.scrollTop=contain.scrollTop-contain.scrollTop/10
        if(contain.scrollTop==0){
          clearInterval(timer)
        }
      },16)
    }
  },
  mounted(){
    // 当距离顶部超过50时，回到顶部按钮出现
    let contain=this.$refs.contain
    contain.addEventListener('scroll',()=>{
      let scrollTop=contain.scrollTop
        if(contain.scrollTop>50){
            this.toTopState=true 
        }else{
            this.toTopState=false
        }
    })
  }
}
</script>

<style scoped>
  body{
    height: 100%;
    overflow: hidden;
  }
  .topHeader{
    width: 100%;
    height: 48px;
    position: fixed;
    background: #313842;
    top: 0;
    left: 0;
    display: flex;
    z-index: 999
  }
  .topHeader .title{
    width: 180px;
    padding-left: 12px;
  }
  .topHeader .title h3{
    font-size: 15px;
    color: #fff;
    line-height: 48px;
  }
  .topHeader ul{
    flex:1;
    display: flex;
  }
  .topHeader ul li{
    padding:0 10px;
    line-height: 48px;
  }
  .topHeader ul li a{
    color: #fff;
  }
  .topHeader ul li a.router-link-exact-active.router-link-active{
    color: #09b1b9;
  }
  section{
    width: 100%;
    padding-top:48px;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  section .leftBar{
    height: 100%;
    width: 180px;
    background:#f8f8f5;
    overflow: hidden;
    transition: 0.4s;
    position: fixed;
    top: 48px;
    left: 0;
    border-right: 1px solid #f1f1f1;
  }
  section .contain{
    width:100vw;
    height: 100%;
    background: #f5f5f5;
    padding-left: 180px;
    box-sizing: border-box;
    transition: 0.4s;
    overflow-y: scroll;
  }
  .loadHtml{
    padding:16px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .bread{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #fff;
    padding-left: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
  }
  .bread p{
    color:#666;
  }
  .toggleS{
    width: 24px;
    height: 24px;
    background: url(/static/images/leftBar.png) no-repeat center;
    margin: 10px;
    cursor: pointer;
  }
  .toTop{
    width: 42px;
    height: 42px;
    position: fixed;
    right: 36px;
    bottom: 36px;
    cursor: pointer;
    z-index: 999;
    background:#fff url(/static/images/totop.png) no-repeat center;
    box-shadow: 0 0 4px rgba(0,0,0,0.2);
  }
</style>
