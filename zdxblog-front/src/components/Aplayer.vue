<template>
  <div class="model_aplayer">
    <div id="aplayer"></div>
    </div>
</template>

<script>
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import axios from 'axios'
export default {
  data () {
    return {
      music: [],
      aplayer: null,
      playState: true
    }
  },
  created () {
    this.requestMusic()
  },

  methods: {
    createAplayer () {
      this.aplayer = new APlayer({
        container: document.getElementById('aplayer'),
        audio: this.music,
        mini: true,
        autoplay: true,
        theme: '#FADFA3',
        loop: 'all',
        order: 'random',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: true,
        listMaxHeight: 90,
        lrcType: 3
      })
    },

    requestMusic () {
      axios.get('https://api.i-meto.com/meting/api?server=netease&type=playlist&id=768991704&r=0.7108869416213444').then(res => {
        this.music = (res.data || []).map(o => {
          return {
            ...o,
            name: o.title,
            artist: o.author,
            cover: o.pic,
            type: 'auto'
          }
        })
        this.$nextTick(this.createAplayer)
      })
    }
  }
}
</script>

<style lang="less">
.model_aplayer {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 999;
}
</style>
