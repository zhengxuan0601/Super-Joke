<template>
  <el-dialog title="登录" :visible.sync="dialogFormVisible" width="600px">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="loginForm.userName" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="loginAdmin">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { RULE_REQUIRED } from '@/lib/dic'
import { userLogin } from '@/api/frontApi'
import { encryptionPassword } from '@/lib/util'
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [RULE_REQUIRED],
        password: [RULE_REQUIRED]
      },
      dialogFormVisible: true
    }
  },

  methods: {
    loginAdmin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const searchParams = {
            ...this.loginForm,
            password: encryptionPassword(this.loginForm.password),
            nosession: true
          }
          userLogin(searchParams).then(res => {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            localStorage.setItem('adminuserInfo', JSON.stringify(res.data))
            this.$emit('close-model', true)
          })
        }
      })
    }
  },

  watch: {
    dialogFormVisible (newVal) {
      if (!newVal) {
        this.$emit('close-model')
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/.el-dialog {
  .el-dialog__body {
    padding: 30px 100px;
  }
}
</style>
