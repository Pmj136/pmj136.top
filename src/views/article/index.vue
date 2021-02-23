<template>
  <section class="jiu-page--index">
    <nav class="jiu-navigation">
      <ul class="jiu-nav jiu-dynamic-wrap">
        <li v-for="(item, index) in article_types"
            :key="index"
            :class="['jiu-nav-item', { 'jiu-active': currentArticleType === item.type }]"
            @click="toggleArticleType(item.type)">
          {{ item.text }}
        </li>
      </ul>
    </nav>
    <jiu-react-box>
      <scroll-list/>
      <template #extra>
        <hot-tags :data="allData.hot_tags"/>
        <sign-in :info="allData.sign_info"/>
        <div :class="['jiu-sticky-box',isScrollLow?'sticky':'normal']">
          <advertising ref="advert"/>
        </div>
        <friend-link :data="allData.friend_links" ref="bottom"/>
      </template>
    </jiu-react-box>
  </section>
</template>
<script>
import JiuReactBox from "@/components/JiuReactBox"
import ScrollList from "./components/ScrollList";
import HotTags from "./components/HotTags"
import SignIn from "./components/SignIn"
import Advertising from "./components/Advertising"
import FriendLink from "./components/FriendLink"
import {appIndex} from "@/api/app"

export default {
  components: {
    JiuReactBox,
    ScrollList,
    HotTags,
    SignIn,
    Advertising,
    FriendLink
  },
  data() {
    return {
      isScrollLow: false,
      article_types: [{type: -1, text: "综合"}],
      allData: {
        hot_tags: [],
        friend_links: [],
        sign_info: null,
      },
    }
  },
  computed: {
    currentArticleType() {
      return this.$store.state.article.type
    }
  },
  beforeMount() {
    window.addEventListener("scroll", this.scrollInstance)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollInstance)
  },
  created() {
    appIndex().then(res => {
      this.article_types.push(...res.data.article_types)
      Object.assign(this.allData, res.data)
    })
  },
  methods: {
    toggleArticleType(value) {
      if (this.currentArticleType === value) return
      window.scrollTo(0, 0)
      this.$store.dispatch("article/setType", value)
    },
    scrollInstance() {
      const sc = this.$refs.bottom.$el.getBoundingClientRect().bottom
      if (sc < 3.6 * 16 && !this.isScrollLow)
        this.isScrollLow = true
      if (sc > 3.6 * 16 && this.isScrollLow) this.isScrollLow = false
    }
  }
}
</script>
<style scoped lang="scss">
.normal {
  top: -7.6rem;
}

.sticky {
  top: calc(6.4rem + 15px);
}
</style>
