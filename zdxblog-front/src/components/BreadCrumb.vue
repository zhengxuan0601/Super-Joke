<template>
  <div class="x_page_breadcrumb">
    <span
      v-if="returnIcon"
      class="el-icon-arrow-left return_icon"
      @click="$router.go(-1)"></span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumb"
        :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumb: Array,
    returnIcon: Boolean
  }
}
</script>

<style scoped lang="less">
@import '../style/index.less';
.x_page_breadcrumb {
  height: 48px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  .return_icon {
    margin-right: 12px;
    cursor: url('~@/assets/images/link.png'), default;
    font-size: 13px;
    transition: .1s;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 3px;
    &:hover {
      color: @maincolor;
      border: 1px solid @maincolor;
    }
  }
  /deep/.el-breadcrumb__item {
    span {
      color: #999;
    }
    &:last-child {
      span {
        color: #000;
      }
    }
  }
}
</style>
