<template>
  <div class="quill_box">
    <quill-editor
      class="ql-editor"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'contentDefault',
    event: 'updateContent'
  },
  props: ['contentDefault', 'placeholder'],
  data () {
    return {
      content: '',
      editorOption: {
        placeholder: '',
        syntax: true,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['link', 'image', 'video'] // 链接、图片、视频
          ]
        }
      }
    }
  },

  created () {
    this.editorOption.placeholder = this.placeholder || '请输入内容'
    this.content = this.contentDefault || ''
  },

  methods: {
    onEditorBlur () {
      // 失去焦点事件
    },

    onEditorFocus () {
      // 获得焦点事件
    },

    onEditorChange () {
      this.$emit('updateContent', this.content)
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.$refs.myQuillEditor.quill.blur()
    })
  },

  watch: {
    contentDefault () {
      this.content = this.contentDefault
    }
  }
}
</script>

<style scoped lang="less">
/deep/.quill-editor {
  padding: 0;
  .ql-toolbar.ql-snow{
    border-color:#dcdfe6;
  }
  .ql-container{
    min-height:200px !important;
    border-color:#dcdfe6;
  }
  .ql-container.ql-snow{
    min-height: 200px !important;
  }
  .ql-snow .ql-picker-label::before {
    position: relative;
    // top: -10px;
  }
  .ql-snow .ql-color-picker .ql-picker-label svg, .ql-snow .ql-icon-picker .ql-picker-label svg{position: relative;top:0px;}
}
</style>
