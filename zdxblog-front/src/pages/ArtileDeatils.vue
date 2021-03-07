<template>
  <div class="co_articledettail content_width">
    <div class="article_block" v-loading="!articleInfo">
      <h5>{{ articleInfo.articleTitle || '--' }}</h5>
      <div class='_detail'>
        <div>
          <em class="icon el-icon-user"></em>
          <span>作者 {{ articleInfo.authorName || '--' }}</span>
        </div>
        <div>
          <em class="icon el-icon-time"></em>
          <span>发表于 {{ articleInfo.createTime || '--' }}</span>
        </div>
        <div>
          <em class="icon el-icon-chat-dot-round"></em>
          <span>浏览次数 {{ articleInfo.readTimes || 0 }}</span>
        </div>
      </div>
      <div class="article_info">
        <div class="_content ql-editor" v-html="articleInfo.articleContent" v-highlight></div>
        <div class="order_article">
          <div class='prev_article' @click="updateArticle(prevNextArticle.prev.id)" v-if="prevNextArticle.prev">
            <span>上一篇：</span>
            <p>{{ prevNextArticle.prev.articleTitle }}</p>
          </div>
          <div class='next_article' @click="updateArticle(prevNextArticle.next.id)" v-if="prevNextArticle.next">
            <span>下一篇：</span>
            <p>{{ prevNextArticle.next.articleTitle }}</p>
          </div>
        </div>
        <div class="article_from" v-if="articleInfo.articleFromAddress">
          <span>本文转载自：</span>
          <a target="_blank" :href="articleInfo.articleFromAddress">{{ articleInfo.articleFromAddress }}</a>
        </div>
      </div>
    </div>
    <MessageBlock
      :articleId="Number(articleId)" />
  </div>
</template>

<script>
import MessageBlock from '@/components/MessageBlock'
import { findArticleInfo, findBetweenArticle, updateReadTimes } from '@/api/frontApi'
export default {
  components: { MessageBlock },
  data () {
    return {
      articleId: this.$route.query.id,
      articleInfo: '',
      prevNextArticle: {}
    }
  },

  created () {
    this.findArticleInfo()
    this.findBetweenArticle()
  },

  methods: {
    /* 查询文章详情信息 */
    findArticleInfo () {
      findArticleInfo(this.articleId).then(res => {
        this.articleInfo = res.data
      })
    },

    /* 根据文章id查询上一篇和下一篇文章 */
    findBetweenArticle () {
      findBetweenArticle(this.articleId).then(res => {
        this.prevNextArticle = res.data
      })
    },

    /**
     * 更新上一篇文章或者下一篇文章
     * @param { Number } articleId 当前文章id
     */
    updateArticle (articleId) {
      this.articleId = articleId
      updateReadTimes(articleId)
      this.findArticleInfo()
      this.findBetweenArticle()
    }
  }
}
</script>

<style scoped lang="less">
.co_articledettail {
  padding-bottom: 50px;
  /deep/.hljs {
    border-radius: 4px;
    padding: 18px;
    line-height: 24px;
    margin: 8px 0;
  }
  .article_block {
    margin-top: 30px;
    padding: 30px 10px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    transition: .3s;
    background: rgba(250,250,250,.8);
    &:hover {
      background: rgba(250,250,250,.9);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    & > h5 {
      color: #000;
      text-align: center;
      font-size: 24px;
      letter-spacing: 2px;
    }
    ._detail {
      display: flex;
      padding: 10px 0 10px 0;
      font-size: 12px;
      justify-content: center;
      color: #999;
      & > div {
        padding-right: 10px;
        em {
          font-style: normal;
          margin-right: 4px;
        }
      }
    }
    .article_info {
      padding: 20px;
      ._content {
        padding: 0 20px;
      }
      .order_article {
        margin-top: 30px;
        .prev_article, .next_article {
          display: flex;
          font-size: 14px;
          line-height: 32px;
          span {
            color: #999;
          }
          p {
            cursor: url('~@/assets/images/link.png'), default;
            transition: .2s;
            &:hover {
              color: #2080f7;
            }
          }
        }
      }
      .article_from {
        display: flex;
        font-size: 14px;
        padding-top: 10px;
        align-items: center;
        span {
          color: #999;
        }
        a {
          color: #4c4c4c;
          position: relative;
          top: 1px;
          font-size: 16px;
          &:hover {
            color: #2080f7;
          }
        }
      }
    }
  }
}
</style>
