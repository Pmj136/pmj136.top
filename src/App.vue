<template>
  <div id="app">
    <router-view v-if="isActive"/>
    <el-backtop :visibility-height="150"></el-backtop>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: true
    }
  },
  beforeCreate() {
    this.$store.dispatch("user/auth").catch(e => {
    })
  },
  mounted() {
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler()
  },
  activated() {
    this.resizeHandler()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    reload() {
      this.isActive = false
      this.$nextTick(() => {
        this.isActive = true
      })
    },
    _checkDevice() {
      const width = window.innerWidth;
      if (width <= 960) return "mobile"
      return "pc"
    },
    resizeHandler() {
      if (!document.hidden) {
        this.$store.dispatch("common/setDevice", this._checkDevice())
      }
    },
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Comic Sans MS";
  background-color: $app-main-bg-color;
}
</style>