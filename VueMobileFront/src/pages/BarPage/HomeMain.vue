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
  }
}
</script>

<style>
.co_homemain {
  height: 100vh;
  padding-bottom: 1.33rem;
}
</style>
