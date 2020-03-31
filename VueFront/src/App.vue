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
  components: { PageMenu }
}
</script>

<style lang="less">
</style>
