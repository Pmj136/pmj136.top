<template>
  <section class="jiu-page--feed">
    <jiu-react-box full>
      <div class="jiu-card">
        <a class="link" href="https://gitee.com/MrPengMJ/pmj136.top" target="_blank">前端代码开源地址</a>
        <el-image
            class="feed-img"
            :src="wx" fit="cover"
            :preview-src-list="[wx]"/>
      </div>
    </jiu-react-box>
  </section>
</template>
<script>
import JiuReactBox from "@/components/JiuReactBox"
import wx from "@/assets/wx.png"

export default {
  components: {JiuReactBox},
  data() {
    return {
      wx,
    }
  }
}
</script>
<style lang="scss" scoped>
.jiu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.link {
  font-size: 1.6rem;
  margin: 20px 0;
}

.feed-img {
  width: 200px;
}
</style>