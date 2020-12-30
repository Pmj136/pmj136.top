<template>
  <div class="comment-input">
    <el-input
        ref="commentInput"
        :autosize="{minRows:4}"
        type="textarea"
        placeholder="说点什么吧!"
        v-model="comment"
        @focus="handleFocus"
        @keydown.ctrl.enter.native="send"
    />
    <div class="extra" v-show="show">
      <span class="desc">ctrl+enter 发送</span>
      <div>
        <el-button type="success" size="mini" @click="send" :disabled="comment.trim()===''">发送</el-button>
        <el-button type="warning" size="mini" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {addRoot} from "@/api/remark";
import Msg from "@/utils/message"
import burs from "./BursEvent"

export default {
  data() {
    return {
      comment: "",
      show: false
    }
  },
  computed: {
    targetId() {
      return +this.$store.state.common.authorId
    },
    articleId() {
      return +this.$route.params.article_id
    }
  },
  methods: {
    focus() {
      this.$refs.commentInput.focus()
    },
    send() {
      const entity = {
        action: 1,
        article_id: this.articleId,
        target_id: this.targetId,
        content: this.comment,
        time: Date.fmt()
      }
      addRoot(entity).then(res => {
        burs.$emit('addRemark', Object.assign(entity, res.data))
        this.comment = ""
        Msg.tip(res.msg)
      }).catch(e => {
      })
    },
    handleFocus() {
      this.show = true
      this.$store.dispatch("remark/reset")
    },
    cancel() {
      this.show = false
      this.comment = ""
    }
  }
}
</script>
<style scoped lang="scss">
.comment-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.extra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.desc {
  color: #999;
}
</style>