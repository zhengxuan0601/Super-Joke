<template>
  <el-menu
  :collapse="isCollapse"
  :router="true"
  :unique-opened="true"
  class="el-menu-vertical-menu">
      <div class="collapse_toggle">
        <span class="icontoogle_menu iconfont" @click="isCollapse = !isCollapse"></span>
      </div>
      <template v-for="(menuItem, index) in NavList">
        <!-- 是否是分割线 -->
        <template v-if="menuItem.dividing">
          <li :key="index" class="h-page-menu__dividing" />
        </template>
        <template v-else>
          <!-- 有子菜单 -->
          <el-submenu
            v-if="menuItem.children && menuItem.children.length"
            :key="index"
            :index="'' + index"
          >
            <template slot="title">
              <i :class="menuItem.icon"></i>
              <span>{{ menuItem.title }}</span>
            </template>
            <template v-for="(subItem, _index) in menuItem.children">
              <el-submenu
                v-if="subItem.children && subItem.children.length"
                :key="_index"
                :index="'subMenu' + index + '_' + _index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <template v-for="(lastItem, _index) in subItem.children">
                  <el-menu-item
                    :key="`lastMenu_${_index}`"
                    :index="lastItem.router"
                  >
                    <i :class="lastItem.icon"></i>
                    <span slot="title">{{ lastItem.title }}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item
                v-else
                :key="`subMenu_${_index}`"
                :index="subItem.router"
              >
                <i :class="subItem.icon"></i>
                <span slot="title">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <!-- 无子菜单 -->
          <el-menu-item
            v-else
            :key="index"
            :index="menuItem.router || ''"
          >
            <i :class="menuItem.icon"></i>
            <span slot="title">{{ menuItem.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
</template>

<script>
import NavList from '../navConfig'
export default {
  data () {
    return {
      isCollapse: false,
      NavList
    }
  },

  mounted () {
    window.onresize = (e) => {
      if (e.target.innerWidth <= 1366) {
        this.isCollapse = true
      } else {
        this.isCollapse = false
      }
    }
  },

  beforeDestroy () {
    window.onresize = null
  }
}
</script>

<style lang="less">
.el-menu-vertical-menu {
  &:not(.el-menu--collapse) {
    width: 220px;
  }
  height: 100%;
  background-color: #fafafa !important;
  .el-menu-item {
    height: 48px;
    line-height: 48px;
    color: #4c4c4c;
    &.is-active {
      background-color: #ecf5ff;
    }
    i {
      font-size: 16px;
    }
  }
  .el-submenu {
    .el-menu {
      background: #fafafa;
    }
    .el-submenu__title {
      color: #4c4c4c;
      height: 48px;
      line-height: 48px;
      i {
        font-size: 16px;
      }
    }
    &.is-active:not(.is-opened) {
      background-color: #ecf5ff;
      .el-submenu__title {
        color: #2080f7;
      }
      i:first-child {
        color: #2080f7;
      }
    }
  }

  .el-menu-item-group__title {
    padding: 0;
  }
  .collapse_toggle {
    height: 48px;
    display: flex;
    align-items: center;
    padding-left: 23px;
    span {
      cursor: pointer;
      font-size: 23px;
    }
  }
}

.el-menu--vertical {
  .el-menu {
    min-width: 120px;
    padding: 0;
    margin-top: 2px;
    &.el-menu--popup-right-start {
      .el-submenu__title {
        height: 42px;
        line-height: 42px;
        color: #4c4c4c;
        .el-submenu__icon-arrow {
          font-size: 14px;
        }
      }
      .el-menu-item {
        height: 42px;
        line-height: 42px;
        min-width: 120px;
      }
    }
  }
}
</style>
