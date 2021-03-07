<template>
  <div class="model_instroduct">
    <div class="content">
      <h3>Welcome</h3>
      <p>
        幸会，我是郑轩
        <br />
        ————
        <br />
        一名前端开发工程师，打造一款成功的产品离不开持之以恒的照料，能成为你的搭档创造出别具一格的作品，我倍感荣幸。
        <br />
        <br />
        我能效劳
        <br />
        ————
        <br />
        前端开发，模块化开发，MVVM模式开发，利用各种技巧实现交互丰富的界面，能够承担主要开发工作，对代码质量及进度负责。
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
  .model_instroduct {
    min-height: 550px;
    display: flex;
    align-items: center;
    .content {
      width: 100%;
      padding: 30px;
      h3 {
        color: #e66f09;
        font-size: 30px;
        letter-spacing: 4px;
        margin-bottom: 20px;
        position: relative;
        &:after {
          position: absolute;
          content: "";
          width: 40px;
          height: 4px;
          background: #FF9E22;
          left: 0;
          right: auto;
          bottom: -20px;
        }
      }
      p {
        margin-top: 50px;
        color: #fff;
        font-weight: bold;
        line-height: 24px;
      }
    }
  }
</style>
