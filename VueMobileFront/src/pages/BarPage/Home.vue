<template>
  <div>首页</div>
</template>

<script>
import { getuserInfo, userLogin } from '@/api/allServeMethods'
export default {
  data () {
    return {

    }
  },

  created () {
    this.getuserInfo()
    this.userLogin()
  },

  methods: {
    getuserInfo () {
      getuserInfo().then(res => {
        console.log(res)
      })
    },

    userLogin () {
      const searchParams = {
        userName: 'zhengxuan',
        password: '12345'
      }
      userLogin(searchParams).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>
