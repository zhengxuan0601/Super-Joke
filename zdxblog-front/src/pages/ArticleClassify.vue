<template>
  <div class="co_article_archive content_width">
    <div class="archive_content">
      <div class="l_menu" :class="{ _fixed: isFixed }">
        <ul>
          <li
            :class="{ _active: currentClassify === item.value }"
            v-for="(item, index) in articleClassifyOptions"
            @click="updateArticle(item.value)"
            :key="index">
            <img :src="item.img" alt="">
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
      <div class="r_list" :class="{ _padding: isFixed }">
        <div class="article_block"
          v-for="(item, index) in articleList"
          @click="routerToArticleInfo(item)"
          :key="index">
          <h4>{{ item.articleTitle }}</h4>
          <div class='_detail'>
            <div>
              <em class="icon el-icon-user"></em>
              <span>作者 {{ item.authorName }}</span>
            </div>
            <div>
              <em class="icon el-icon-time"></em>
              <span>发表于 {{ item.createTime }}</span>
            </div>
            <div>
              <em class="icon el-icon-chat-dot-round"></em>
              <span>浏览次数 {{ item.readTimes }}</span>
            </div>
          </div>
          <div class="article_desc">
            <p :title="item.articleDesc">{{ item.articleDesc }}</p>
          </div>
          <div class="tag_classfiy">
            <span
              :style="`background: ${APIMAP.tagColorMap[itemName]}`"
              :key="idx"
              v-for="(itemName, idx) in (item.articleTag || []).map(o => o)">
              <em class="before" :style="`border-right-color: ${APIMAP.tagColorMap[itemName]}`"></em>
              {{ itemName }}
            </span>
          </div>
        </div>
        <p
          v-show="!loadState"
          class="p_showMode">{{ updateMoreText() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { findArticleList } from '@/api/frontApi'
export default {
  data () {
    return {
      articleClassifyOptions: [{ label: '全部', value: '' }].concat(this.APIMAP.tagsOptions),
      currentClassify: '',
      articleList: [],
      isFixed: false,
      pageNo: 1,
      loading: false,
      loadState: true
    }
  },

  created () {
    this.findArticleList()
  },

  methods: {
    /* 查询所有文章分页列表 */
    findArticleList () {
      this.loadState = false
      this.loading = true
      const searchParams = {
        pageNo: this.pageNo,
        pageSize: 6,
        articleClassify: this.currentClassify
      }
      findArticleList(searchParams).then(res => {
        this.loading = false
        this.articleList = [...this.articleList, ...res.data.list || []]
        if (this.pageNo < Math.ceil(res.data.total / 6)) {
          this.loadState = true
          return
        }
        this.loadState = false
      }).catch(() => {
        this.loading = false
      })
    },

    updateArticle (classifyItem) {
      if (classifyItem === this.currentClassify) return
      this.currentClassify = classifyItem
      this.articleList = []
      this.pageNo = 1
      this.loadState = true
      this.findArticleList()
    },

    scrollOnload () {
      let H = document.documentElement.offsetHeight
      let screenH = window.screen.height
      let scrollTop = document.documentElement.scrollTop
      if (screenH + scrollTop >= H) {
        if (this.loadState) {
          this.pageNo++
          this.findArticleList()
        }
      }
      if (scrollTop >= 76) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },

    updateMoreText () {
      if (this.loading) {
        return '正在加载中~~'
      }
      if (!this.articleList.length) {
        return '暂无数据'
      }
      return '没有更多了~~'
    }
  },

  mounted () {
    window.addEventListener('scroll', this.scrollOnload)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollOnload)
  }
}
</script>

<style scoped lang="less">
.co_article_archive {
  .archive_content {
    padding: 30px 100px;
    min-height: ~"calc(100vh - 56px)";
    display: flex;
    .l_menu {
      width: 240px;
      background: rgba(255,255,255,.9);
      border-radius: 2px;
      height: 594px;
      &._fixed {
        position: fixed;
        top: 10px;
        bottom: 150px;
      }
      ul {
        li {
          line-height: 42px;
          cursor: url('~@/assets/images/link.png'), default;
          display: flex;
          align-items: center;
          padding-left: 60px;
          img {
            width: 18px;
            margin-right: 12px;
            border-radius: 50%;
          }
          span {
            font-size: 14px;
            letter-spacing: 2px;
          }
          &._active, &:hover {
            background: #88ecf1;
            &:hover {
              opacity: .6;
            }
            span {
              color: #fff;
            }
          }
        }
      }
    }
    .r_list {
      width: 0;
      flex: 1;
      margin-left: 30px;
      &._padding {
        padding-left: 240px;
      }
      .article_block {
        padding: 30px 20px;
        box-shadow: 0 0 4px rgba(0,0,0,.1);
        border-radius: 2px;
        transition: .3s;
        cursor: url('~@/assets/images/link.png'), default;
        background: rgba(255,255,255,.9);
        &:hover {
          box-shadow: 0 0 4px 1px #aea6df;
          transform: scale(1.015);
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
        &:hover {
          h4 {
            color: #2080f7;
          }
        }
        h4 {
          font-size: 20px;
          padding-bottom: 2px;
          display: inline-block;
          transition: .3s;
          font-family: cursive;
        }
        ._detail {
          display: flex;
          padding: 5px 0 10px 0;
          font-size: 12px;
          color: #999;
          & > div {
            padding-right: 10px;
            em {
              font-style: normal;
              margin-right: 4px;
            }
          }
        }
        .article_desc {
          color: #999;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            line-height: 24px;
            font-size: 13px;
            text-indent: 18px;
          }
        }
        .tag_classfiy {
          margin-top: 16px;
          display: flex;
          span {
            display: inline-block;
            text-decoration: none;
            font-weight: normal;
            font-size: 12px;
            color: #fff;
            height: 18px;
            line-height: 18px;
            padding: 0 5px 0px 10px;
            position: relative;
            border-radius: 0 5px 5px 0;
            margin: 5px 9px 5px 8px;
            transition: .3s;
            &:hover {
              opacity: .6;
            }
            .before {
              display: block;
              width: 0px;
              height: 0px;
              position: absolute;
              top: 0;
              left: -18px;
              border: 9px solid transparent;
            }
            &:after {
              content: " ";
              width: 4px;
              height: 4px;
              background-color: #fff;
              border-radius: 4px;
              -webkit-box-shadow: 0px 0px 0px 1px rgb(0 0 0 / 30%);
              box-shadow: 0px 0px 0px 1px rgb(0 0 0 / 30%);
              position: absolute;
              top: 7px;
              left: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
