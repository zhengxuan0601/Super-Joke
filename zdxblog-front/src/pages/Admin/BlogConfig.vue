<template>
  <div class="co_blogconfig">
    <BreadCrumb :breadcrumb="['配置管理']" />
    <div class="config_model">
      <h3>页头LOGO图片</h3>
      <div>
        <el-upload
          :class="blogConfigForm.headlogoImg ? 'uploadLimit' : ''"
          ref="uploadImg"
          :on-change="onchangeImg"
          :on-remove="removeImg"
          :auto-upload="false"
          :file-list="fileList"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传png、jpg、jpeg文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
    <div class="config_model">
      <h3>网页描述信息</h3>
      <div>
        <el-input
          placeholder="请输入网页描述信息"
          v-model="blogConfigForm.blogTopDesc"
          clearable>
        </el-input>
      </div>
    </div>
    <div class="config_model">
      <h3>网页底部描述信息</h3>
      <div>
        <el-input
          placeholder="请输入网页描述信息"
          v-model="blogConfigForm.blogBottomDesc"
          clearable>
        </el-input>
      </div>
    </div>
    <footer>
       <el-button
        @click="setBlogConfig"
        :disabled="!blogConfigForm.blogTopDesc || !blogConfigForm.blogBottomDesc"
        type="primary">确认</el-button>
    </footer>
  </div>
</template>

<script>
import { findBlogConfig, setBlogConfig } from '@/api/backSystemApi'
export default {
  data () {
    return {
      blogConfigForm: {
        headlogoImg: '',
        headlogoImgFile: '',
        blogTopDesc: '',
        blogBottomDesc: ''
      },
      fileList: []
    }
  },

  created () {
    this.findBlogConfig()
  },

  methods: {
    findBlogConfig () {
      findBlogConfig().then(res => {
        if (res.data) {
          this.blogConfigForm = {
            blogTopDesc: res.data.blogTopDesc,
            blogBottomDesc: res.data.blogBottomDesc,
            headlogoImg: res.data.headlogoImgSrc
          }
          res.data.headlogoImgSrc && (this.fileList = [{ url: 'data:image/png;base64,' + res.data.headlogoImgSrc }])
        }
      })
    },

    setBlogConfig () {
      let data = new FormData()
      data.append('blogTopDesc', this.blogConfigForm.blogTopDesc)
      data.append('blogBottomDesc', this.blogConfigForm.blogBottomDesc)
      if (this.blogConfigForm.headlogoImgFile) {
        data.append('file', this.blogConfigForm.headlogoImgFile)
      }
      setBlogConfig(data).then(res => {
        this.$message({
          type: 'success',
          message: '更新配置成功'
        })
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
      } else if (file.size / 1024 > 500) {
        this.$message({
          message: '上传文件大小不能大于500kb',
          type: 'warning'
        })
        this.$refs.uploadImg.clearFiles()
        return
      }
      this.blogConfigForm = {
        ...this.blogConfigForm,
        headlogoImg: file.name,
        headlogoImgFile: file.raw
      }
    },

    removeImg () {
      this.blogConfigForm = {
        ...this.blogConfigForm,
        headlogoImg: '',
        headlogoImgFile: ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.co_blogconfig {
  height: 100%;
  overflow-y: scroll;
  position: relative;
  .config_model {
    margin-top: 30px;
    padding: 0 30px;
    /deep/.el-input {
      width: 500px;
    }
    h3 {
      padding-bottom: 20px;
    }
    /deep/.uploadLimit {
      .el-upload--picture-card {
        display: none;
      }
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
  }
}
</style>
