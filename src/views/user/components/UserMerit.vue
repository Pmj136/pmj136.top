<template>
  <div class="jiu-card">
    <div class="jiu-card-header">
      <span style="font-weight: bold">{{item.user_id===onLineId?'个人成就':'关于他'}}</span>
    </div>
    <div class="container">
      <ul class="jiu-list">
        <li class="merit-item">
          <svg-icon style="color: #1a91ca" icon="star"/>
          <span class="count-label">文章共获赞</span>
          <span class="count-num"> {{ item.article_star_count || '0' }}</span>
        </li>
        <li class="merit-item">
          <svg-icon style="color: #1a91ca" icon="read"/>
          <span class="count-label">文章被阅读</span>
          <span class="count-num">{{ item.article_view_count || '0' }}</span>
        </li>
        <li class="merit-item">
          <svg-icon style="color: #1a91ca" icon="integral"/>
          <span class="count-label">久久贡献值</span>
          <span class="count-num">{{ item.integral||'0' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  computed: {
    onLineId() {
      return this.$store.state.user.info.id
    }
  }
}
</script>
<style scoped lang="scss">
.merit-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
  font-size: 0.94rem;
}

.container {
  padding: 10px 20px;
  box-sizing: border-box;
}

.count-label {
  margin-left: 0.8rem;
  color: #666;
}

.count-num {
  margin-left: 0.8rem;
  color: #0c9557;
}

</style>