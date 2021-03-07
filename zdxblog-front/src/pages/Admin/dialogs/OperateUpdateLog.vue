<template>
  <el-dialog
    :title="operateLogForm ? '编辑' : '添加'"
    :close-on-click-modal="false"
    width="600px"
    :visible.sync="dialogVisible">
    <el-form :model="updateLogFormInfo" :rules="updateLogFormRule" ref="updateLogFormInfo" label-width="100px" class="demo-ruleForm">
      <el-form-item label="更新时间" prop="updateBlogTime">
        <el-date-picker
          :disabled="Boolean(operateLogForm)"
          style="width: 100%;"
          v-model="updateLogFormInfo.updateBlogTime"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新内容" prop="updateContent">
        <el-input v-model="updateLogFormInfo.updateContent" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="operateUpdateLog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { RULE_REQUIRED } from '@/lib/dic'
import { addupdateLog, editUpdateLogs } from '@/api/backSystemApi'
export default {
  props: ['operateLogForm'],
  data () {
    return {
      dialogVisible: true,
      updateLogFormInfo: {
        updateBlogTime: '',
        updateContent: ''
      },
      updateLogFormRule: {
        updateBlogTime: [RULE_REQUIRED],
        updateContent: [RULE_REQUIRED]
      }
    }
  },

  created () {
    this.initParams()
  },

  methods: {
    initParams () {
      if (this.operateLogForm) {
        this.updateLogFormInfo = {
          ...this.updateLogFormInfo,
          ...this.operateLogForm
        }
      }
    },

    operateUpdateLog () {
      this.$refs.updateLogFormInfo.validate(valid => {
        if (valid) {
          const API = this.operateLogForm ? editUpdateLogs : addupdateLog
          const searchParams = this.updateLogFormInfo
          API(searchParams).then(res => {
            this.$message({
              message: this.operateLogForm ? '编辑更新日志成功' : '添加更新日志成功',
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
