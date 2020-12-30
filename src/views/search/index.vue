<template>
  <section class="jiu-page--search">
    <div class="jiu-navigation">
      <ul class="jiu-nav jiu-dynamic-wrap">
        <li :class="['jiu-nav-item', { 'jiu-active': currentSearchType === -1 }]" @click="toggleSearchType(-1)">综合</li>
        <li :class="['jiu-nav-item', { 'jiu-active': currentSearchType === 1 }]" @click="toggleSearchType(1)">文章</li>
        <li :class="['jiu-nav-item', { 'jiu-active': currentSearchType === 2 }]" @click="toggleSearchType(2)">用户</li>
      </ul>
    </div>
    <jiu-react-box>
      <search-list/>
    </jiu-react-box>
  </section>
</template>
<script>
import JiuReactBox from "@/components/JiuReactBox"
import SearchList from "./components/SearchList";

export default {
  components: {
    JiuReactBox,
    SearchList,
  },
  computed: {
    currentSearchType() {
      return +this.$route.query.type
    },
  },
  methods: {
    toggleSearchType(value) {
      if (this.currentSearchType === value) return
      this.$router.replace({query: {type: value, query: this.$route.query.query}})
    }
  }
}
</script>