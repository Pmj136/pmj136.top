<template>
  <div class="jiu-card">
    <div class="card-item" @click="$emit('change',6)">
      <span>关注</span>
      <span class="card-item--num">{{ item.notice_count || '0' }}</span>
    </div>
    <div class="card-item" @click="$emit('change',7)">
      <span>粉丝</span>
      <span class="card-item--num">{{ item.fans_count || '0' }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>
<style scoped lang="scss">
.jiu-card {
  padding: 16px 0;
  display: flex;
  font-size: 0.94rem;
}

.card-item {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.card-item--num {
  margin-top: 6px;
}

</style>