<template>
  <el-dialog
    :title="operateUserForm ? '编辑' : '添加'"
    :close-on-click-modal="false"
    width="600px"
    :visible.sync="dialogVisible">
    <el-form :model="userFormInfo" :rules="userFormRule" ref="userFormInfo" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="accountName">
        <el-input :disabled="Boolean(operateUserForm)" v-model="userFormInfo.accountName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item
        v-if="!Boolean(operateUserForm)"
        label="密码"
        prop="password">
        <el-input v-model="userFormInfo.password" type="password" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickName">
        <el-input v-model="userFormInfo.nickName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="userFormInfo.email" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="职业" prop="job">
        <el-input v-model="userFormInfo.job" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="现居地" prop="address">
        <el-input v-model="userFormInfo.address" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="userFormInfo.qq" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="operateMenu">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { encryptionPassword } from '@/lib/util'
import { RULE_REQUIRED, RULE_INCORRECTEMAIL } from '@/lib/dic'
import { addNewPerson, updateuserInfo } from '@/api/backSystemApi'
export default {
  props: ['operateUserForm'],
  data () {
    return {
      dialogVisible: true,
      userFormInfo: {
        accountName: '',
        password: '',
        nickName: '',
        email: '',
        job: '',
        address: '',
        qq: ''
      },
      userFormRule: {
        accountName: [RULE_REQUIRED],
        password: [RULE_REQUIRED],
        email: [RULE_REQUIRED, RULE_INCORRECTEMAIL]
      }
    }
  },

  created () {
    this.initParams()
  },

  methods: {
    initParams () {
      if (this.operateUserForm) {
        this.userFormInfo = {
          ...this.userFormInfo,
          ...this.operateUserForm
        }
      }
    },

    operateMenu () {
      this.$refs.userFormInfo.validate(valid => {
        if (valid) {
          const API = this.operateUserForm ? updateuserInfo : addNewPerson
          const searchParams = {
            ...this.userFormInfo,
            password: encryptionPassword(this.userFormInfo.password) || undefined
          }
          API(searchParams).then(res => {
            this.$message({
              message: this.operateUserForm ? '编辑用户信息成功' : '添加用户成功',
              type: 'success'
            })
            this.$emit('close-model', true)
          })
        }
      })
    }
  },

  watch: {
    dialogVisible (newVal) {
      if (!newVal) {
        this.$emit('close-model')
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/.el-dialog__body {
  .el-form {
    padding-right: 30px;
    overflow-y: scroll;
  }
}
</style>
