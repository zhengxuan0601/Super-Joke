<template>
  <div class="co_operatearticle">
    <BreadCrumb
      return-icon
      :breadcrumb="['文章配置', articleId ? '编辑文章' : '添加文章']" />
    <div class="article_content" ref="articleContent" :style="`height: ${pageContainerHeight - 49}px`">
      <el-form id="articleForm" :model="articleForm" :rules="articleRules" ref="articleForm" label-width="100px">
        <el-form-item label="文章标题" prop="articleTitle">
          <el-input v-model="articleForm.articleTitle" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="文章描述" prop="articleDesc">
          <el-input v-model="articleForm.articleDesc" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="articleContent" :class="fixedState ? 'fixed' : ''">
          <QuillEdit
            v-model="articleForm.articleContent" />
        </el-form-item>
        <el-form-item label="文章标签" prop="articleTag">
          <el-select
            v-model="articleForm.articleTag"
            multiple
            style="width: 100%;"
            placeholder="请选择">
            <el-option
              v-for="item in APIMAP.tagsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章出处链接" prop="articleFromAddress">
          <el-input v-model="articleForm.articleFromAddress" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="footer">
          <el-button type="primary" @click="submitArticle">确认</el-button>
          <el-button @click="$refs.articleForm.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import QuillEdit from '@/components/QuillEdit'
import { RULE_REQUIRED, RULE_MUSTSELECT_ARRAY } from '@/lib/dic'
import { addArticle, findArticleInfo, editArticle } from '@/api/backSystemApi'
export default {
  components: { QuillEdit },
  data () {
    return {
      articleForm: {
        articleTitle: '',
        articleDesc: '',
        articleContent: '',
        articleTag: []
      },
      articleRules: {
        articleTitle: [RULE_REQUIRED],
        articleDesc: [RULE_REQUIRED],
        articleContent: [RULE_REQUIRED],
        articleTag: [RULE_MUSTSELECT_ARRAY]
      },
      articleId: this.$route.query.id,
      fixedState: false
    }
  },

  created () {
    if (this.articleId) {
      this.findArticleInfo()
    }
  },

  methods: {
    submitArticle () {
      this.$refs.articleForm.validate(valid => {
        if (valid) {
          const API = this.articleId ? editArticle : addArticle
          API(this.articleForm).then(res => {
            this.$message({
              message: this.articleId ? '编辑文章成功' : '添加文章成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          })
        }
      })
    },

    /* 根据文章Id获取文章详细信息 */
    findArticleInfo () {
      findArticleInfo(this.articleId).then(res => {
        this.articleForm = {
          ...this.articleForm,
          ...res.data || {}
        }
      })
    },

    scrollFixed () {
      const articleForm = document.querySelector('#articleForm')
      articleForm.onscroll = () => {
        if (articleForm.scrollTop >= 160) {
          this.fixedState = true
          return
        }
        this.fixedState = false
      }
    }
  },

  mounted () {
    this.$nextTick(this.scrollFixed)
  }
}
</script>

<style scoped lang="less">
.co_operatearticle {
  .article_content {
    background: #fff;
    position: relative;
  }
  /deep/.el-form {
    padding: 20px 20px 50px 0;
    height: 100%;
    overflow-y: scroll;
    .fixed {
      /deep/.el-form-item__content {
        position: static;
      }
      /deep/.ql-toolbar {
        position: absolute;
        top: -1px;
        background: #fff;
        z-index: 999;
        right: 26px;
        left: 100px;
      }
      .ql-editor {
        padding-top: 60px;
      }
    }
    .footer {
      position: absolute;
      z-index: 999;
      bottom: 0;
      left: 0;
      right: 0;
      margin-bottom: 0;
      height: 56px;
      border-top: 1px solid #e5e5e5;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fafafa;
    }
  }
}
</style>
