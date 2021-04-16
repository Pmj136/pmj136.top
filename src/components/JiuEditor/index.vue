<template>
  <mavon-editor
      ref="editor"
      :style="{'min-height':minHeight+'vh'}"
      :class="[border?'add-border':'clear-border']"
      :autofocus="focus"
      :boxShadow="boxShadow"
      :defaultOpen="onlyShow?'preview':defaultOpen"
      :editable="onlyShow?false:editable"
      :externalLink="externalLink"
      :subfield="editable&&!onlyShow"
      :placeholder="placeholder"
      :toolbarsFlag="onlyShow?false:showTools"
      :toolbars="toolbars"
      :value="value"
      previewBackground="transparent"
      boxShadowStyle="0 2px 2px 0 rgba(0, 0, 0, 0.1)"
      toolbarsBackground="#f1f1f1"
      @change="handleChange"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
  />
</template>
<script>
import {mavonEditor} from 'mavon-editor'
import {uploadImg, delImg} from "@/api/article"
import 'mavon-editor/dist/css/index.css'

export default {
  components: {mavonEditor},
  props: {
    value: String,
    placeholder: {
      type: String,
      default: '输入正文……'
    },
    boxShadow: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    onlyShow: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    focus: {
      type: Boolean,
      default: false
    },
    showTools: {
      type: Boolean,
      default: true
    },
    defaultOpen: {
      type: String,
      default: 'edit'
    },
    minHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      externalLink: {
        markdown_css: function () {
          return 'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css'
        },
        hljs_js: false,
        hljs_css: false,
        hljs_lang: false,
        katex_css: false,
        katex_js: false,
        dracula_css: false
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        // htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        // navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        // subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    }
  },
  methods: {
    handleChange(raw, html) {
      this.$emit('change', {raw, html})
    },
    imgAdd(fileName, imgFile) {
      const formdata = new FormData();
      formdata.append('img', imgFile);
      uploadImg(formdata).then(res => {
          this.$refs.editor.$img2Url(fileName, res.data)
      }).catch(e => {
        this.$refs.editor.$refs.toolbar_left.$imgDelByFilename(imgFile.name)
      })
    },
    imgDel(fileName) {
      delImg({name: fileName[0]})
    }
  }
}
</script>
<style scoped lang="scss">
.clear-border {
  border: none;
}

.add-border {
  border: 1px solid #ddddde;
}

</style>
