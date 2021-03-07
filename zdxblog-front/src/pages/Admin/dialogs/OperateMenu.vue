<template>
  <el-dialog
    :title="operateMenuForm ? '编辑' : '添加'"
    :close-on-click-modal="false"
    width="600px"
    :visible.sync="dialogVisible">
    <el-form :model="menuFormInfo" :rules="menuFormRule" ref="menuFormInfo" label-width="100px" class="demo-ruleForm">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="menuFormInfo.menuName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="menuIcon">
        <el-input v-model="menuFormInfo.menuIcon" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" prop="menuUrl">
        <el-input v-model="menuFormInfo.menuUrl" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="operateMenu">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { RULE_REQUIRED } from '@/lib/dic'
import { addMenu, updateMenu } from '@/api/backSystemApi'
export default {
  props: ['operateMenuForm'],
  data () {
    return {
      dialogVisible: true,
      menuFormInfo: {
        menuName: '',
        menuIcon: '',
        menuUrl: ''
      },
      menuFormRule: {
        menuName: [RULE_REQUIRED],
        menuIcon: [RULE_REQUIRED],
        menuUrl: [RULE_REQUIRED]
      }
    }
  },

  created () {
    this.initParams()
  },

  methods: {
    initParams () {
      if (this.operateMenuForm) {
        this.menuFormInfo = {
          ...this.menuFormInfo,
          ...this.operateMenuForm
        }
      }
    },

    operateMenu () {
      this.$refs.menuFormInfo.validate(valid => {
        if (valid) {
          const API = this.operateMenuForm ? updateMenu : addMenu
          const searchParams = this.menuFormInfo
          API(searchParams).then(res => {
            this.$message({
              message: this.operateMenuForm ? '编辑菜单成功' : '添加菜单成功',
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
