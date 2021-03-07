 <template>
  <div class="co_messageboard content_width">
    <h5>留下你的脚印吧~</h5>
    <div class="img_model">
      <img class="_gif" src="@/assets/images/title1.gif" alt="">
    </div>
    <MessageBlock />
  </div>
</template>

<script>
import MessageBlock from '@/components/MessageBlock'
export default {
  components: { MessageBlock }
}
</script>

<style scoped lang="less">
.co_messageboard {
  padding-bottom: 50px;
  & > h5 {
    text-align: center;
    font-size: 30px;
    letter-spacing: 2px;
    padding: 50px 0 30px;
    font-weight: bold;
    background: linear-gradient(to right, red, blue);
    background-clip: text;
    color: transparent;
    animation: blink 2s linear infinite;
  }
  .img_model {
    position: relative;
    overflow: hidden;
    width: 500px;
    height: 280px;
    margin: 0 auto;
    border-radius: 4px;
    &::after {
      content: '';
      position: absolute;
      left: -50%;
      top: -50%;
      width: 200%;
      height: ~"calc(200% + 20px)";
      background-repeat: no-repeat;
      background-size: 50% 50%, 50% 50%;
      background-position: 0 0, 100% 0, 100% 100%, 0 100%;
      background-image: linear-gradient(rgba(242,20,233,.52), rgba(242,20,233,1)), linear-gradient(rgba(237,181,137,.52),rgba(237,181,137,1)), linear-gradient(rgba(117,210,241,.52), rgba(117,210,241,1)), linear-gradient(rgba(55,122,245,.52), rgba(55,122,245,1));
      animation: rotate 16s linear infinite;
    }
    ._gif {
      display: block;
      position: absolute;
      z-index: 2;
      width: ~"calc(100% - 8px)";
      height: ~"calc(100% - 8px)";
      top: 4px;
      left: 4px;
    }
  }
}
@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

@keyframes blink{
  0%{opacity: 1;}
  50%{opacity: 0.5;}
  100%{opacity: 0.8;}
}
</style>
