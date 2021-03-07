<template>
  <div id="app" style="overflow-x: hidden;">
    <BlogHead
      v-if="$route.meta.showHeader" />
    <el-container class="el_co_page">
      <el-main class="el_co_main">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </el-main>
    </el-container>
    <div class="bg"
      v-if="$route.meta.showHeader"></div>
    <BlogBottom v-if="$route.meta.showHeader" />
    <Canvas />
    <div class="o_scroll"
      v-if="$route.meta.showHeader"
      @click="animateScrollTop"
      :style="`top: ${isScroll ? '-220px' : '-1500px'}`"></div>
    <Aplayer v-if="$route.meta.showHeader" />
  </div>
</template>

<script>
import BlogHead from '@/components/BlogHead'
import BlogBottom from '@/components/BlogBottom'
import Canvas from '@/components/Canvas'
import Aplayer from '@/components/Aplayer'
import { debounce } from '@/lib/util'
export default {
  components: { BlogHead, Canvas, BlogBottom, Aplayer },
  data () {
    return {
      isScroll: false
    }
  },

  created () {
    this.$nextTick(() => {
      window.addEventListener('scroll', debounce(this.scrollTopBar, 200))
    })
  },

  methods: {
    animateScrollTop () {
      let scrollTop = document.documentElement.scrollTop
      document.documentElement.scrollTop = scrollTop * 0.6
      if (scrollTop <= 0) {
        document.documentElement.scrollTop = 0
        return
      }
      setTimeout(() => {
        this.animateScrollTop()
      }, 36)
    },

    scrollTopBar () {
      if (document.documentElement.scrollTop > 200) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    }
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollTopBar)
  }
}
</script>

<style lang="less">
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/bg5.jpeg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: -1;
}
.o_scroll {
  width: 70px;
  height: 900px;
  background: url('~@/assets/images/scroll.png');
  position: fixed;
  top: -220px;
  right: 80px;
  z-index: 9999;
  cursor: url('~@/assets/images/link.png'), default;
  background-size: cover;
  transition: .8s;
}
</style>
