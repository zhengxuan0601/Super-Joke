<template>
  <div class="co_selfresume">
    <Instroduction />

    <Concat />
  </div>
</template>

<script>
import Instroduction from './components/Instroduction'
import Concat from './components/Concat'
export default {
  components: { Instroduction, Concat },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.co_selfresume {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: url('~@/assets/images/bg5.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  padding-top: 50px;
  & > div {
    width: 70%;
    background: rgba(0, 0, 0, .2);
    margin: 20px auto 50px;
  }
}
</style>
