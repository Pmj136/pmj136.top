<template>
  <div class="reply-input">
    <el-input
        ref="reply"
        :autosize="{minRows:2}"
        type="textarea"
        placeholder="回复"
        v-model="comment"
        @keydown.ctrl.enter.native="send"
    />
    <div class="extra">
      <span class="desc">ctrl+enter 发送</span>
      <div>
        <el-button type="success" size="mini" @click="send" :disabled="comment.trim()===''">发送</el-button>
        <el-button type="warning" size="mini" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {addChild} from "@/api/remark";
import Msg from "@/utils/message"
import burs from "./BursEvent"

const {mapState} = Vuex
export default {
  data() {
    return {
      comment: ""
    }
  },
  computed: {
    ...mapState({
      params: state => state.remark.params
    }),
  },
  mounted() {
    this.$refs['reply'].focus()
  },
  methods: {
    send() {
      const entity = {
        action: 2,
        ...this.params,
        article_id: +this.$route.params.article_id,
        content: this.comment,
        time: Date.fmt()
      }
      addChild(entity).then(res => {
        burs.$emit('addRemark', Object.assign(entity, res.data))
        this.$store.dispatch("remark/reset")
        this.comment = ""
        Msg.tip(res.msg)
      }).catch(() => {
      })
    },
    cancel() {
      this.$store.dispatch("remark/reset")
    }
  }
}
</script>
<style scoped lang="scss">
.reply-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
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