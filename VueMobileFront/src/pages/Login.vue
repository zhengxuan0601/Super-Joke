<template>
  <div>登录</div>
</template>

<script>
import { getUserLogin } from '@/api/allServeMethods'
export default {
  data () {
    return {

    }
  },
  created () {
    this.getUserLogin()
  },
  methods: {
    getUserLogin () {
      getUserLogin().then(res => {
      })
    }
  }
}
</script>

<style>

</style>
