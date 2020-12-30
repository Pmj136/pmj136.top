<template>
  <div class="jiu-creation-edit">
    <div class="edit-header">
      <div class="edit-container">
        <input class="title-input" placeholder="输入文章标题" autofocus v-model="form.title"/>
        <div class="action">
          <router-link class="action-back" to="/" replace tag="a">回到主页</router-link>
          <button class="put-btn" :disabled="disableBtn" @click="dialogVisible = true">
            {{ articleId ? '保存更新' : '发布文章' }}
          </button>
        </div>
      </div>
    </div>
    <jiu-react-box full>
      <jiu-editor :value="form.content" @change="handleEditorChange" default-open='preview' min-height="100"/>
    </jiu-react-box>
    <el-dialog
        width="400px"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :title="articleId ? '更新文章' : '发布文章'"
        :visible.sync="dialogVisible">
      <el-form style="width: 100%" label-position="left" label-width="80px">
        <el-form-item label="文章类型:">
          <el-select v-model="form.type" filterable placeholder="请选择">
            <el-option
                v-for="item in base_types"
                :key="item.type"
                :label="item.text"
                :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签:">
          <el-select
              v-model="tags"
              multiple
              multiple-limit="3"
              filterable
              placeholder="添加文章标签">
            <el-option
                v-for="item in base_tags"
                :key="item.id"
                :label="item.title"
                :value="item.id+''">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button :loading="isFetch" type="success" @click="postArticle">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import JiuReactBox from "@/components/JiuReactBox"
import JiuEditor from "@/components/JiuEditor"
import {appMd} from "@/api/app"
import {addArticle, getArticleData, updateArticle} from "@/api/article"
import Msg from "@/utils/message";

export default {
  components: {JiuReactBox, JiuEditor},
  data() {
    return {
      form: {
        title: "",
        content: "",
        type: "",
        tag_ids: "",
        user_id: +this.$store.state.user.info.id
      },
      isFetch: false,
      tags: [],
      base_types: [],
      base_tags: [],
      dialogVisible: false,
    }
  },
  computed: {
    disableBtn() {
      return this.form.content.trim() === "" || this.form.title.trim() === ""
    },
    articleId() {
      return this.$route.params.article_id
    }
  },
  created() {
    appMd().then(res => {
      this.base_types = res.data.types
      this.base_tags = res.data.tags
    })
    if (this.articleId) {
      getArticleData({id: +this.articleId}).then(res => {
        const resp = res.data
        this.form = resp
        this.tags = resp.tag_ids.split(",")
      })
    }
  },
  methods: {
    handleEditorChange(obj) {
      this.form.content = obj.raw
      this.form.initial_img = this._getInitialImgUrl(obj.html)
    },
    _getInitialImgUrl(html) {
      let url = "";
      html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
        url = capture;
      });
      if (url === null) return url
      return url.replaceAll("&amp;", "&")
    },
    async postArticle() {
      this.isFetch = true
      this.form.tag_ids = this.tags.join(',')
      let res = null;
      try {
        if (this.articleId)
          res = await updateArticle(this.form)
        else
          res = await addArticle(this.form)

        this.isFetch = false
        Msg.tip(res.msg)
        if (this.articleId) this.$router.go(-1)
        else this.$router.replace("/")

      } catch (e) {
        this.isFetch = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.jiu-creation-edit {
  min-height: 100vh;
}

.edit-header {
  position: sticky;
  top: 0;
  height: $app-header-height;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
  z-index: 1500;
}

.edit-container {
  transition: width linear 0.3s;
  width: $wrap-base-width;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action {
  width: 10rem;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}

.action-back {
  text-decoration: none;
  outline: none;
}

.title-input {
  width: calc(100% - 11rem);
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
  border: none;
  outline: none;
}

.put-btn {
  white-space: nowrap;
  width: 4.7rem;
  height: 1.8rem;
  font-size: 0.8rem;
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ca0c16;
  color: #fff;
}

.put-btn:disabled {
  background-color: #ddd;
  color: #999;
  cursor: not-allowed;
}

.put-btn:active {
  opacity: 0.7;
}

@media all and (max-width: $wrap-width-1-trigger) {
  .edit-container {
    width: $wrap-width-1;
  }
}

@media all and (max-width: $wrap-width-2-trigger) {
  .edit-container {
    width: $wrap-width-2;
  }
}

@media all and (max-width: 500px) {
  ::v-deep .el-dialog {
    width: 84% !important;
  }
}
</style>