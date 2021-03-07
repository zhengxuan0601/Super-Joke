<template>
  <div class="co_login">
    <div class="login_block">
      <h4>用户管理系统登陆</h4>
      <div class="_model">
        <span class="el-icon-user icon"></span>
        <input type="text" v-model="userName" placeholder="请输入用户名">
      </div>
      <div class="_model">
        <span class="el-icon-unlock icon"></span>
        <input
          @keypress.enter="douserLogin"
          type="password" v-model="password" placeholder="请输入密码">
      </div>
      <button
        @click="douserLogin" :disabled="!canLoginState">登 录</button>
    </div>
  </div>
</template>

<script>
import { encryptionPassword } from '@/lib/util'
import { userLogin } from '@/api/frontApi'
export default {
  data () {
    return {
      userName: '',
      password: ''
    }
  },

  methods: {
    douserLogin () {
      if (!this.canLoginState) return
      const searchParams = {
        userName: this.userName,
        password: encryptionPassword(this.password)
      }
      userLogin(searchParams).then(res => {
        this.$router.replace('/adminindex/menuconfig')
      })
    }
  },

  computed: {
    canLoginState () {
      if (!this.userName || !this.password || this.userName.length < 5 || this.password.length < 5) {
        return false
      }
      return true
    }
  }
}
</script>

<style scoped lang="less">
.co_login {
  width: 100%;
  height: 100vh;
  background: #45136b;
  .login_block {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h4 {
      font-size: 20px;
      color: #fff;
      letter-spacing: 2px;
      text-align: center;
    }
    ._model {
      box-sizing: content-box;
      padding: 6px 10px;
      height: 24px;
      border: 1px solid #3c5587;
      margin-top: 20px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      .icon {
        margin-right: 10px;
        color: #999;
      }
      input {
        background: none;
        border: none;
        outline: none;
        font-size: 12px;
        color: #999;
        letter-spacing: 1px;
        height: 100%;
        width: 0;
        flex: 1;
      }
    }
    & > button {
      display: block;
      width: 80%;
      margin: 30px auto 80px;
      height: 36px;
      background: #684fb5;
      border-radius: 2px;
      border: none;
      color: #fff;
      font-size: 12px;
      cursor: url('~@/assets/images/link.png'), default;
      outline: none;
      transition: .2s;
      &:active {
        opacity: .6;
      }
      &:disabled {
        opacity: .6;
        cursor: not-allowed;
      }
    }
  }
}
</style>
