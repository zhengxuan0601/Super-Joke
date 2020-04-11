<template>
	<view class="content">
    <text @tap="showName">这是首页</text>
    <componentChild></componentChild>
	</view>
</template>

<script>
  import { getLogin } from '../../api/allHttpServe.js'
  import componentChild from '@/components/component.vue'
	export default {
    components: { componentChild },
		data() {
			return {
				
			}
		},
		onLoad() {
      getLogin('13857136520', '123456', '3211').then(res => {
        console.log(res)
      })
		},
		methods: {
      showName() {
        console.log(this.$store.state)
      }
		}
	}
</script>

<style>
</style>
