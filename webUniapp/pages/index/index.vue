<template>
  <view class="content">
    <text>这是首页</text>
    <componentChild :title="childTile"></componentChild>
  </view>
</template>

<script>
  import componentChild from '@/components/component.vue'
  export default {
    components: {
      componentChild
    },
    data() {
      return {
        childTile: ''
      }
    },
    created() {
      this.childTile = '子组件222'
    },
    methods: {
      onPullDownRefresh() {
        setTimeout(function() {
          uni.stopPullDownRefresh()
        }, 1000);
      }
    }
  }
</script>

<style>
</style>
