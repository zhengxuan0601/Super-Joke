<template>
  <div class="model_concat">
    <div>
      <div>
        <i class="iconfont iconweibo"></i>
        <p>吃条鱼再学习</p>
      </div>
    </div>
    <div>
      <div>
        <i class="iconfont iconzhihu"></i>
      </div>
    </div>
    <div>
      <div>
        <i class="iconfont iconGitHub"></i>
      </div>
    </div>
    <div>
      <div>
        <i class="iconfont iconios-email-outline"></i>
        <p>1071401902@qq.com</p>
      </div>
    </div>
    <div>
      <div>
        <i class="iconfont iconqq"></i>
        <p>1071401902</p>
      </div>
    </div>
    <div>
      <div>
        <i class="iconfont iconweixin"></i>
        <p>zx1071401902</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.model_concat {
  display: flex;
  flex-wrap: wrap;
  & > div {
    cursor: pointer;
    width: ~"calc(100% / 3)";
    position: relative;
    height: 274px;
    transition: .3s;
    &:hover {
      border: none;
    }
    &:nth-child(1):hover {
      background-color: #32CCFE;
    }
    &:nth-child(2):hover {
      background-color: #317BC7;
    }
    &:nth-child(3):hover {
      background-color: #3B5997;
    }
    &:nth-child(4):hover {
      background-color: #EC4A89;
    }
    &:nth-child(5):hover {
      background-color: #CA252B;
    }
    &:nth-child(6):hover {
      background-color: #F4511E;
    }
    &:nth-child(-n + 3) {
      border-bottom: .5px solid rgba(0,0,0,.5);
    }
    &:not(:nth-child(3n)) {
      border-right: .5px solid rgba(0,0,0,.5);
    }
    & > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      i {
        color: #fff;
        font-size: 46px;
      }
      p {
        color: #fff;
        margin-top: 5px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
