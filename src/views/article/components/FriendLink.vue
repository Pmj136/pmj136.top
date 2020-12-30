<template>
  <div class="jiu-card">
    <div class="jiu-card-header">
      <span class="jiu-card-header--text">友情链接</span>
    </div>
    <div class="jiu-card-body">
      <div class="link-item" v-for="item in data" :key="data.id">
        <a :href="item.link" class="link-item--link" target="_blank">{{ item.title }}</a>
      </div>

      <el-popover
          placement="right-start"
          width="100"
          trigger="hover"
          content="请发邮件至 1367559786@qq.com 或 点击上方qq直接联系">
        <div class="link-item" slot="reference">
          <span class="link-item--apply">申请友链</span>
        </div>
      </el-popover>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped lang="scss">
.jiu-title {
  border-left-color: #9e0ebf;
}

.jiu-card-body {
  padding: 10px 0 0 20px;
}

.link-item {
  display: inline-block;
  margin: 0 20px 10px 0;
}

.link-item--link {
  text-decoration: none;
  white-space: nowrap;
  font-size: 0.9rem;
  color: #848282;
}

.link-item--apply {
  white-space: nowrap;
  font-size: 0.9rem;
  cursor: pointer;
  color: #1a91ca;
  outline: none;
}

.link-item--link:hover {
  text-decoration: underline;
}
</style>