<template>
  <div class="jiu-card" v-if="list.length>0">
    <div class="jiu-card-header">
      <span class="jiu-card-header--text">相关推荐</span>
    </div>
    <ul class="jiu-list">
      <li v-for="item in list" :key="item.id">
        <div class="container" @click="$router.open('/article/'+item.id)">
          <span class="title">{{ item.title }}</span>
          <div class="count">
            <div class="count-item">
              <svg-icon icon="star"/>
              <span class="count-num">{{ item.star_count }}</span>
            </div>
            <div class="count-item">
              <svg-icon icon="comment"/>
              <span class="count-num">{{ item.comment_count }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {recommend} from "@/api/article"

export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    recommend({id: +this.$route.params.article_id}).then(res => {
      this.list = res.data
    })
  }
}
</script>
<style scoped lang="scss">
.container {
  padding: 10px 20px;
  box-sizing: border-box;
}

.title {
  color: #444;
  font-size: 0.9rem;
  letter-spacing: .5px;
}

.container:hover {
  cursor: pointer;
  background-color: #fafafa;
}

.count {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.count-item {
  display: flex;
  align-items: center;
  font-size: 0.82rem;
  color: #c2c2c2;
}

.count-item:last-child {
  margin-left: 1rem;
}

.count-num {
  margin-left: 4px;
}
</style>