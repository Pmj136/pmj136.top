<template>
  <el-popconfirm title="确认删除这条消息吗？" placement="right" @confirm="del">
    <svg-icon slot="reference" class="del-btn" icon="del"/>
  </el-popconfirm>
</template>
<script>
import {delMsg} from "@/api/msg"
import Msg from "@/utils/message"

export default {
  props: {
    msgId: Number,
    type: String,
    index: Number
  },
  methods: {
    del() {
      delMsg({type: this.type, msg_id: this.msgId}).then(res => {
        this.$emit("del", this.index)
        Msg.tip(res.msg)
      })
    }
  }
}
</script>
<style scoped lang="scss">

.del-btn {
  cursor: pointer;
}

.del-btn:hover {
  color: #0a76a4;
}
</style>