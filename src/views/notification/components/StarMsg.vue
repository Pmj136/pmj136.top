<template>
  <div class="msg-container">
    <div class="post-info">
      <div class="info-wrap">
        <el-tag v-if="msgData.is_review" size="mini" type="info">已读</el-tag>
        <el-tag v-else size="mini" type="danger">未读</el-tag>
        <a class="user-nick" :href="'/user/'+msgData.user_id" target="_blank">{{ msgData.nick }}</a>
        <span class="item-type">赞了你的文章</span>
        <span>{{ msgData.time|getDiff }}</span>
      </div>
      <del-msg :msg-id="msgData.id" :index="index" type="star" @del="$emit('del',$event)"/>
    </div>
    <span class="article-title" @click="toDetail">{{ msgData.article_title }}</span>
  </div>
</template>
<script>
import DelMsg from "./DelMsg";
import {readMsg} from "@/api/msg";

export default {
  components: {DelMsg},
  props: {
    msgData: Object
  },
  methods: {
    toDetail() {
      readMsg({
        type: "star",
        msg_id: this.msgData.id
      }).then(res => {
        this.$emit("update:item", Object.assign(this.msgData, {is_review: 1}))
        this.$store.dispatch("common/decreaseCount", "star_count")
      })
      this.$router.open('/article/' + this.msgData.article_id)
    }
  }
}
</script>
<style scoped lang="scss">
@import "./common.scss";
</style>