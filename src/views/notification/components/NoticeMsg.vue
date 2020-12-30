<template>
  <div class="notice-msg">
    <a class="user-nick" :href="'/user/'+msgData.user_id" target="_blank">{{ msgData.nick }}</a>
    <span v-if="msgData.action===1" class="item-type">关注了你</span>
    <span v-else class="item-type">取消关注了你</span>
    <span>{{ msgData.time|getDiff }}</span>
  </div>
</template>
<script>
export default {
  props: {
    msgData: Object
  }
}
</script>
<style scoped lang="scss">
.notice-msg {
  padding: 15px 20px;
  box-sizing: border-box;
  font-size: 0.9rem;
  color: #888;
}

.user-nick {
  text-decoration: none;
  color: #3399ea;
}

.user-nick:hover {
  text-decoration: underline;
}

.item-type {
  margin: 0 1rem 0 .2rem;
}
</style>