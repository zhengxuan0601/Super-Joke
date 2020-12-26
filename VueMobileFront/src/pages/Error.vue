<template>
  <div class='co_error'>
    <van-empty description="找不到页面">
      <van-button @click="$router.go(-1)" type="info" size="small">返回</van-button>
    </van-empty>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.co_error {
  height: 100vh;
  /deep/.van-empty {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    margin-left: -187.5px;
    margin-top: -163px;
  }
}
</style>
