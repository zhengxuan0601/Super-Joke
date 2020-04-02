<template>
  <div id="app">
    <el-container class="el_co_page">
      <el-aside width="240px">
        <PageMenu></PageMenu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import PageMenu from '@/components/PageMenu'
export default {
  components: { PageMenu },
  created () {
    // 存储全局的store到sessionStorage里面解决刷新丢失store数据的问题
    window.sessionStorage.getItem('GlobalStateInfo') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(window.sessionStorage.getItem('GlobalStateInfo'))))
    // 在页面刷新的时候将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      window.sessionStorage.setItem('GlobalStateInfo', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="less">
</style>
