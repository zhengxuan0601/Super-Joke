<template>
  <view class="content">
    <text @tap="toInfoPage">这是首订单页</text>
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
      toInfoPage () {
        uni.navigateTo({
          url: '../detail/detail'
        })
      },
      
      onPullDownRefresh () {
        setTimeout(function() {
          uni.stopPullDownRefresh()
        }, 1000);
      }
    }
  }
</script>

<style>
</style>
