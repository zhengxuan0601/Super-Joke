export default {
  data () {
    return {
      pageContainerHeight: 0
    }
  },

  created () {
    this.$nextTick(() => {
      this.calcPageHeight()
    })
  },

  mounted () {
    window.onresize = () => {
      this.calcPageHeight()
    }
  },

  methods: {
    calcPageHeight () {
      const H = document.body.offsetHeight
      this.pageContainerHeight = H
    }
  }
}
