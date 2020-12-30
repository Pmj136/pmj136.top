<template>
  <div class="jiu-navs">
    <div class="jiu-navs-item" v-for="(item,index) in navs" :key="index"
         :class="{'jiu-active':active===index+1}" @click="handleClick(index+1)">
      {{ item }}
    </div>
    <div v-if="isMine" class="jiu-navs-item" :class="{'jiu-active':active===5}" @click="handleClick(5)">
      回收站
    </div>
    <div v-if="active===6" class="jiu-navs-item" :class="{'jiu-active':active===6}">
      关注
    </div>
    <div v-if="active===7" class="jiu-navs-item" :class="{'jiu-active':active===7}">
      粉丝
    </div>
  </div>
</template>
<script>

export default {
  props: {
    active: {
      type: Number,
      default: 1
    },
    userId: Number
  },
  data() {
    return {
      navs: ["创作", "评论", "点赞", "收藏"]
    }
  },
  computed: {
    isMine() {
      const id = this.$store.state.user.info.id
      if (!id) return false
      return id === this.userId
    }
  },
  methods: {
    handleClick(index) {
      this.$emit("update:active", index)
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style scoped lang="scss">
.jiu-active {
  box-shadow: inset 0 -2px 0 #3780f7;
}
</style>