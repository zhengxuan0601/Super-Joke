<template>
  <div class="co_myself">
    <BreadCrumb :breadcrumb="['关于我配置']" />
    <div class="content">
      <el-form label-width="80px" ref="myselfForm" :model="myselfForm" :rules="myselfRule">
        <el-form-item label="关于我" prop="aboutMessage">
          <QuillEdit v-model="myselfForm.aboutMessage" />
        </el-form-item>
      </el-form>
    </div>
    <footer>
      <el-button
        @click="saveAboutSelfMes"
        type="primary">确认</el-button>
    </footer>
  </div>
</template>

<script>
import { RULE_REQUIRED } from '@/lib/dic'
import QuillEdit from '@/components/QuillEdit'
import { findAoutselfMessage, saveAboutSelfMes } from '@/api/backSystemApi'
export default {
  components: { QuillEdit },
  data () {
    return {
      myselfForm: {
        aboutMessage: ''
      },
      myselfRule: {
        aboutMessage: [RULE_REQUIRED]
      }
    }
  },

  created () {
    this.findAoutselfMessage()
  },

  methods: {
    findAoutselfMessage () {
      findAoutselfMessage().then(res => {
        this.myselfForm.aboutMessage = res.data ? res.data.aboutMessage : ''
      })
    },

    saveAboutSelfMes () {
      this.$refs.myselfForm.validate(valid => {
        if (valid) {
          saveAboutSelfMes(this.myselfForm).then(res => {
            this.$message({
              type: 'success',
              message: '保存信息成功'
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.co_myself {
  position: relative;
  .content {
    height: ~"calc(100vh - 48px)";
    position: relative;
    overflow: scroll;
    padding: 30px 30px 56px 30px;
    /deep/.ql-editor {
      padding-top: 0;
    }
  }
   footer {
    bottom: 0;
    height: 56px;
    border-top: 1px solid #f1f1f1;
    left: 0;
    right: 0;
    position: absolute;
    text-align: center;
    line-height: 56px;
    z-index: 99;
    background: #fafafa;
  }
}

</style>
