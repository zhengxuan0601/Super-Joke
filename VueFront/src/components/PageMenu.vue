<template>
  <el-menu
    :collapse="isCollapse"
    :router="true"
    :unique-opened="true"
    class="el-menu-vertical-menu">
    <div class="collapse_toggle">
      <span @click="isCollapse = !isCollapse"></span>
    </div>
    <component
    v-for="(item) in NavList"
    :key="item.path"
    :index="item.path"
    :is="(item.children && item.children.length > 0) ? 'el-submenu' : 'el-menu-item'">
      <template
      v-if="(!item.children || item.children.length === 0)">
        <i :class="item.icon || 'el-icon-location'"></i>
        <span>{{item.title}}</span>
      </template>
      <template v-if="item.children && item.children.length > 0">
        <template slot="title">
          <i :class="item.icon || 'el-icon-location'"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item
        v-for="itemName in item.children"
        :key="itemName.path"
        :index="itemName.path">
          <span slot="title">{{itemName.title}}</span>
        </el-menu-item>
      </template>
    </component>
  </el-menu>
</template>

<script>
import NavList from '../navConfig'
export default {
  props: {
  },
  data () {
    return {
      isCollapse: false,
      NavList
    }
  }
}
</script>

<style lang="less">
.el-menu-vertical-menu {
  width: 220px;
  height: 100%;
  .collapse_toggle {
    height: 46px;
    display: flex;
    align-items: center;
    padding-left: 23px;
    span {
      width: 16px;
      height: 16px;
      background: url(../assets/basicImg/menu.png) no-repeat center;
      background-size: 100%;
      display: inline-block;
      cursor: pointer;
    }
  }
  .el-menu-item {
    height: 46px;
    line-height: 46px;
  }
  .el-submenu__title {
    height: 46px;
    line-height: 46px;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
}
</style>
<style lang="less">
.el-menu--vertical {
  .el-menu-item-group__title {
    padding: 0;
  }
  .el-menu-item {
    height: 46px;
    line-height: 46px;
  }
}
</style>
