<template>
  <div class="container">
    <div v-if="isFetch" class="skeleton">
      <h1 class="title"></h1>
      <div class="tag"></div>
      <div class="user"></div>
      <div class="content"></div>
      <div class="extra"></div>
      <div class="desc"></div>
    </div>
    <div v-else class="none-data">
      文章不翼而飞了
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isFetch: Boolean
  }
}
</script>
<style lang="scss" scoped>
.container {
  min-height: calc(100vh - #{$app-header-height} - 30px);
}

.skeleton {
  width: 100%;
}

.skeleton > * {
  background-color: #eee;
}

.title {
  height: 30px;
  margin-top: 0;
}

.tag {
  width: 60px;
  height: 20px;
}

.user {
  margin: 18px 0;
  height: 60px;
}

.content {
  height: 400px;
}

.extra {
  width: 40%;
  margin: 30px 0 20px 0;
  height: 30px;
}

.desc {
  width: 60%;
  height: 20px;
}

.none-data {
  min-height: calc(100vh - #{$app-header-height} - 30px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1b688d;
  font-size: 1.6rem;
  letter-spacing: 2px;
}
</style>