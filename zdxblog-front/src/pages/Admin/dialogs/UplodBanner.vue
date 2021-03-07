<template>
  <el-dialog
    title="添加Banner"
    :visible.sync="dialogVisible"
    width="670px">
    <el-form ref="bannerForm" :model="bannerForm" :rules="bannerRule" label-width="130px">
      <el-form-item label="Banner名称" prop="bannerName">
        <el-input v-model="bannerForm.bannerName" placeholder="请输入Banner名称"></el-input>
      </el-form-item>
      <el-form-item label="Banner图片" prop="bannerImg">
        <el-upload
          ref="uploadImg"
          :class="Boolean(bannerForm.bannerImg) ? 'uploadLimit' : ''"
          :on-remove="removeImg"
          :on-change="onchangeImg"
          :auto-upload="false"
          :file-list="fileList"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">请上传JPG、JPEG、PNG格式图片，建议尺寸720px*200px</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="Banner跳转路径" prop="bannerUrl">
        <el-input v-model="bannerForm.bannerUrl" placeholder="请输入Banner图跳转路径"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitBanner">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { RULE_REQUIRED, RULE_HTTPURL } from '@/lib/dic'
import { uploadBanner, updateBanner } from '@/api/backSystemApi'
export default {
  props: ['bannerInfo'],
  data () {
    return {
      dialogVisible: true,
      bannerForm: {
        bannerName: '',
        bannerImg: '',
        bannerImgFile: '',
        bannerUrl: ''
      },
      bannerRule: {
        bannerName: [RULE_REQUIRED],
        bannerImg: [RULE_REQUIRED],
        bannerUrl: [RULE_REQUIRED, RULE_HTTPURL]
      },
      fileList: []
    }
  },

  created () {
    this.initParams()
  },

  methods: {
    initParams () {
      if (this.bannerInfo) {
        this.bannerRule.bannerImg = []
        this.bannerForm = {
          ...this.bannerInfo,
          bannerImg: this.bannerInfo.bannerImgSrc
        }
        this.fileList = [{ url: 'data:image/png;base64,' + this.bannerInfo.bannerImgSrc }]
      }
    },

    submitBanner () {
      this.$refs.bannerForm.validate(valid => {
        if (valid) {
          let data = new FormData()
          data.append('bannerName', this.bannerForm.bannerName)
          data.append('bannerUrl', this.bannerForm.bannerUrl)
          if (this.bannerForm.bannerImgFile) {
            data.append('file', this.bannerForm.bannerImgFile)
          }
          if (this.bannerInfo) {
            data.append('id', this.bannerForm.id)
          }
          const API = this.bannerInfo ? updateBanner : uploadBanner
          API(data).then(res => {
            this.$message({
              type: 'success',
              message: this.bannerInfo ? '编辑Banner配置成功' : '添加Banner配置成功'
            })
            this.$emit('close-model', true)
          })
        }
      })
    },

    onchangeImg (file) {
      const imgReg = /\.(png|PNG|jpg|JPG|jpeg|JPEG)$/
      if (!imgReg.test(file.name)) {
        this.$message({
          message: '上传图片格式只支持png、jpg、jpeg格式',
          type: 'warning'
        })
        this.$refs.uploadImg.clearFiles()
        return
      }
      this.bannerForm = {
        ...this.bannerForm,
        bannerImg: file.url,
        bannerImgFile: file.raw
      }
    },

    removeImg () {
      this.bannerForm = {
        ...this.bannerForm,
        bannerImg: '',
        bannerImgFile: ''
      }
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
/deep/.el-form {
  padding-right: 50px;
  .uploadLimit {
    .el-upload {
      display: none;
    }
  }
}
</style>
