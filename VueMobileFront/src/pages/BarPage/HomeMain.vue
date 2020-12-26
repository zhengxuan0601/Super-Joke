<template>
  <div class="co_homemain">
    <router-view></router-view>
    <van-tabbar v-model="selectActiveIndex">
      <van-tabbar-item
      :name="item.name"
      v-for="item in tabBarList"
      :key="item.router"
      :to="item.router"
      :icon="item.icon">{{item.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import tabBarList from '@/tabBarConfig'
export default {
  data () {
    return {
      tabBarList: tabBarList,
      selectActiveIndex: tabBarList[0].name
    }
  },

  created () {
    this.createNavHightLight()
  },

  methods: {
    /**
     * 刷新页面时若当前tab存在则继续保留当前tab高亮状态
     */
    createNavHightLight () {
      let curRoute = this.$route.path
      if (tabBarList.findIndex(item => item.router === curRoute) > -1) {
        const idx = tabBarList.findIndex(item => item.router === curRoute)
        this.selectActiveIndex = tabBarList[idx].name
      }
    }
  }
}
</script>

<style>
.co_homemain {
  height: 100vh;
  padding-bottom: 1.33rem;
}
</style>
