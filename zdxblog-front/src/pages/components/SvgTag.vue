<template>
  <div class="tag_svg_model">
    <svg id='svg' width="100%" ref="svg" height="100%" xmlns="http://www.w3.org/2000/svg" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Relation from '@/lib/relation'
export default {
  data () {
    return {
      svgRelation: null
    }
  },
  created () {
    this.$nextTick(this.drawTagsRelations)
  },

  methods: {
    drawTagsRelations () {
      const svg = this.$refs.svg
      const [width, height] = [svg.clientWidth, svg.clientHeight]
      this.svgRelation = new Relation({
        ...this.createdNodeLinksByTags(),
        width,
        height,
        id: '#svg'
      })
      this.svgRelation.init()
    },

    /**
     * 获取所有标签信息生成node节点和links数据信息
     */
    createdNodeLinksByTags () {
      const tagList = this.APIMAP.tagsOptions
      const nodes = [{
        id: 'ARTICLE',
        name: 'ARTICLE',
        img: require('@/assets/svgrelation/userlogo.png')
      }, ...tagList.map(item => {
        return {
          ...item,
          id: item.value,
          name: item.label
        }
      })]
      const links = tagList.map(item => {
        return {
          source: 'ARTICLE',
          target: item.label
        }
      })
      return { nodes, links }
    }
  }
}
</script>

<style scoped lang="less">
.tag_svg_model {
  width: 100%;
  height: 260px;
}
</style>
