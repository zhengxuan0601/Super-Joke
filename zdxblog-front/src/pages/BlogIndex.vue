<template>
  <div class="content_width co_blogindex">
    <div class="_left">
      <div class="card_model">
        <WeatherModel />
      </div>
      <div class="card_model">
        <CalendarDate />
      </div>
      <div class="card_model">
        <div class="_title">
          <span class="el-icon-eleme icon"></span>
          <h4>Information</h4>
        </div>
        <div class="info_model">
          <div class="label_form">
            <p>昵称</p><span>{{ userInfo.nickName || '--' }}</span>
          </div>
          <div class="label_form">
            <p>职业</p><span>{{ userInfo.job || '--' }}</span>
          </div>
          <div class="label_form">
            <p>现居</p><span>{{ userInfo.address || '--' }}</span>
          </div>
          <div class="label_form">
            <p>Email</p><span>{{ userInfo.email || '--' }}</span>
          </div>
          <div class="label_form">
            <p>QQ</p><span>{{ userInfo.qq || '--' }}</span>
          </div>
        </div>
      </div>
      <div class="card_model">
        <div class="_title">
          <span class="iconfont_v iconremen icon hot"></span>
          <h4>Hot Articles</h4>
        </div>
        <div class="a_list" v-noData="!hotArticleList.length">
          <p
            @click="routerToArticleInfo(item)"
            :key="index"
            v-for="(item, index) in hotArticleList"><em>{{ index + 1 }}</em> {{ item.articleTitle }}</p>
        </div>
      </div>
      <div class="card_model">
        <div class="_title">
          <span class="iconfont_v iconguanxi icon links"></span>
          <h4>Article Tags Relations</h4>
        </div>
        <SvgTag />
      </div>
    </div>
    <div class="_right">
      <el-carousel indicator-position="outside" :interval="4000" height="288px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <img
            @click="openNewClient(item)"
            :style="`width: 100%; height: 100%; cursor: url(${require('../assets/images/link.png')}), default;`"
            :src="'data:image/png;base64,' + item.bannerImgSrc" alt="">
        </el-carousel-item>
      </el-carousel>
      <div class="article_list">
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
      </div>
      <p
        v-show="!loadState"
        class="p_showMode">{{ updateMoreText() }}</p>
    </div>
  </div>
</template>

<script>
import { findArticleList, updateReadTimes, findUserInfo, getHotTopArticle, findBanners } from '@/api/frontApi'
import SvgTag from './components/SvgTag'
import WeatherModel from '@/components/WeatherModel'
import CalendarDate from '@/components/CalendarDate'
export default {
  name: 'Index',
  components: { SvgTag, WeatherModel, CalendarDate },
  data () {
    return {
      pageNo: 1,
      loading: false,
      articleList: [],
      loadState: true,
      userInfo: '',
      hotArticleList: [],
      bannerList: []
    }
  },

  created () {
    this.findUserInfo()
    this.findArticleList()
    this.getHotTopArticle()
    this.findBanners()
  },

  methods: {
    findUserInfo () {
      findUserInfo().then(res => {
        this.userInfo = res.data || ''
      })
    },

    findBanners () {
      findBanners().then(res => {
        this.bannerList = res.data || []
      })
    },

    /* 查询所有文章分页列表 */
    findArticleList () {
      this.loadState = false
      this.loading = true
      findArticleList({ pageNo: this.pageNo, pageSize: 6 }).then(res => {
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

    /* 查询最热门8篇文章列表 */
    getHotTopArticle () {
      getHotTopArticle().then(res => {
        this.hotArticleList = res.data || []
      })
    },

    routerToArticleInfo (articleItem) {
      updateReadTimes(articleItem.id)
      this.$router.push({
        path: 'articledetails',
        query: {
          id: articleItem.id
        }
      })
    },

    updateMoreText () {
      if (this.loading) {
        return '正在加载中~~'
      }
      if (!this.articleList.length) {
        return '暂无数据'
      }
      return '没有更多了~~'
    },

    openNewClient (bannerItem) {
      window.open(bannerItem.bannerUrl)
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
    }
  },

  beforeRouteEnter (_from, _to, next) {
    next(vm => {
      vm.$nextTick(() => {
        window.addEventListener('scroll', vm.scrollOnload)
      })
    })
  },

  beforeRouteLeave (from, _to, next) {
    window.removeEventListener('scroll', this.scrollOnload)
    next()
  }
}
</script>

<style lang="less" scoped>
.co_blogindex {
  display: flex;
  padding-top: 20px;
  ._left {
    width: 320px;
    padding: 8px;
    .card_model {
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      font-size: 13px;
      border-radius: 2px;
      margin-bottom: 20px;
      background: rgba(255,255,255,.92);
      ._title {
        height: 50px;
        display: flex;
        padding: 0 10px;
        border-bottom: 1px solid #e5e5e5;
        align-items: center;
        font-size: 18px;
        h4 {
          font-family: cursive;
        }
        .icon {
          color: #3ce6cf;
          position: relative;
          top: 0px;
          margin-right: 8px;
          font-size: 20px;
          &.hot {
            color: #ff380b;
          }
          &.links {
            color: #2080f7;
          }
        }
      }
      .info_model {
        padding: 20px 0;
        .label_form {
          display: flex;
          padding: 8px 10px;
          align-items: center;
          font-size: 14px;
          p {
            width: 50px;
            text-align: right;
            color: #999;
            font-family: cursive;
          }
          span {
            display: inline-block;
            padding-left: 8px;
            font-family: cursive;
            color: #000;
          }
        }
      }
      .a_list {
        padding: 8px 0;
        height: 272px;
        p {
          color: #4c4c4c;
          line-height: 32px;
          padding: 0 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: url('~@/assets/images/link.png'), default;
          transition: .3s;
          font-family: cursive;
          font-size: 14px;
          &:hover {
            color: #2080f7;
          }
          em {
            margin-right: 5px;
            color: orangered;
            font-style: italic;
            font-weight: bold;
          }
        }
      }
    }
  }
  ._right {
    flex: 1;
    width: 0;
    padding: 8px;
    padding-bottom: 50px;
    .article_list {
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
