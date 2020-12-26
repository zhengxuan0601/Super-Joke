<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// npm i babel-eslint@7.2.3
export default {
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
