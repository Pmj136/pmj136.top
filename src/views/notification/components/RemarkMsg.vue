<template>
  <div class="msg-container">
    <div class="post-info">
      <div class="info-wrap">
        <template v-if="msgData.is_exit">
          <el-tag v-if="msgData.is_review" size="mini" effect="info">已读</el-tag>
          <el-tag v-else size="mini" effect="danger">未读</el-tag>
        </template>
        <a class="user-nick" :style="{'margin-left':msgData.is_exit?'.5rem':'0'}"
           :href="'/user/'+msgData.user_id" target="_blank">{{ msgData.nick }}</a>
        <span v-if="msgData.action===1" class="item-type">评论了你的文章</span>
        <span v-else class="item-type">回复了你</span>
        <span>{{ msgData.time|getDiff }}</span>
      </div>
      <del-msg :msg-id="msgData.id" :index="index" type="remark" @del="$emit('del',$event)"/>
    </div>
    <span v-if="msgData.is_exit" class="article-title" @click="toDetail">{{ msgData.article_title }}</span>
    <span v-else>用户已删除此评论</span>
  </div>
</template>
<script>
import DelMsg from "./DelMsg"
import {readMsg} from "@/api/msg"

export default {
  components: {DelMsg},
  props: {
    msgData: Object,
    index: Number
  },
  methods: {
    toDetail() {
      let type = "#child"
      if (this.msgData.action === 1) type = "#root"
      readMsg({
        type: "remark",
        msg_id: this.msgData.id
      }).then(res => {
        this.$emit("update:item", Object.assign(this.msgData, {is_review: 1}))
        this.$store.dispatch("common/decreaseCount", "remark_count")
      })
      this.$router.open('/article/' + this.msgData.article_id + type + this.msgData.remark_id)
    }
  }
}
</script>
<style scoped lang="scss">
@import "./common.scss";
</style>