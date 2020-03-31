<template>
  <el-menu
    :collapse="isCollapse"
    class="el-menu-vertical-menu">
    <div class="collapse_toggle">
      <span @click="isCollapse = !isCollapse"></span>
    </div>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>

<style lang="less">
.el-menu-vertical-menu {
  height: 100%;
  .collapse_toggle {
    height: 46px;
    display: flex;
    align-items: center;
    padding-left: 23px;
    span {
      width: 16px;
      height: 16px;
      border: 1px solid #000;
      display: inline-block;
      cursor: pointer;
    }
  }
  .el-menu-item {
    height: 46px;
    line-height: 46px;
  }
}
</style>
