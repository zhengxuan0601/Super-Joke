<template>
  <div class="co_admin">
    <div class="left_menu">
      <PageMenu />
    </div>
    <div class="right_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import PageMenu from '@/components/PageMenu'
export default {
  components: { PageMenu }
}
</script>

<style scoped lang="less">
.co_admin {
  height: 100vh;
  display: flex;
  .right_content {
    width: 0;
    flex: 1;
    height: 100%;
  }
}
</style>
