<template>
  <div class="jiu-card" v-if="data.length">
    <div class="jiu-card-header">
      <span class="jiu-card-header--text">热门标签</span>
    </div>
    <div class="jiu-card-body">
      <el-tag
          effect="plain"
          v-for="item in data"
          :key="item.id"
          @click="search(item.title)">{{ item.title }}
      </el-tag>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    data: Array
  },
  methods: {
    search(keyword) {
      this.$router.push({path: '/search', query: {type: 1, query: keyword}});
    }
  }
}
</script>
<style scoped lang="scss">
.jiu-title {
  border-left-color: #e00a3b;
}

.jiu-card-body {
  padding: 10px 0 0 20px;
}

.el-tag {
  margin: 0 10px 10px 0;
  cursor: pointer;
}

.el-tag:hover {
  color: #1a91ca;
  border-color: #1a91ca;
}
</style>