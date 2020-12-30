<template>
  <section class="jiu-page--user">
    <div class="jiu-navigation" v-show="isScrollLow">
      <list-nav class="jiu-dynamic-wrap" :active.sync="activeIndex" :user-id="user?user.id:0"/>
    </div>
    <jiu-react-box>
      <user-info :item="user"/>
      <div class="jiu-card">
        <list-nav ref="listNav" :active.sync="activeIndex" :user-id="user?user.id:0"/>
        <ul class="jiu-list">
          <li class="jiu-list-item" v-for="(item,index) in list" :key="index">
            <jiu-user-item v-if="item.id" :item="item"/>
            <jiu-article-item v-else :item="item" @del="del(index)"/>
          </li>
        </ul>
        <jiu-load
            :is-fetch="isFetch"
            :has-data="total>0"
            :load-completed="list.length === total"
            @load-more="handleLoadMore"/>
      </div>
      <template #extra>
        <div class="jiu-sticky-box" :style="{'top':isScrollLow?'7.6rem':'4.6rem'}">
          <user-merit :item="meritData"/>
          <user-relation :item="relationData" @change="v=>{activeIndex=v}"/>
        </div>
      </template>
    </jiu-react-box>
  </section>
</template>
<script>
import JiuReactBox from "@/components/JiuReactBox"
import UserInfo from "./components/UserInfo"
import UserMerit from "./components/UserMerit";
import UserRelation from "./components/UserRelation";
import ListNav from "./components/ListNav"
import JiuArticleItem from "@/components/JiuArticleItem"
import JiuUserItem from "@/components/JiuUserItem/index"
import JiuLoad from "@/components/JiuLoad"
import {getDetail, getDynamics} from "@/api/user";

export default {
  components: {
    JiuReactBox,
    ListNav,
    UserInfo,
    UserMerit,
    UserRelation,
    JiuArticleItem,
    JiuUserItem,
    JiuLoad
  },
  data() {
    return {
      list: [],
      page: 1,
      size: 20,
      total: 0,
      isFetch: false,
      user: {},
      isScrollLow: false,
      activeIndex: 1
    }
  },
  computed: {
    userId() {
      return +this.$route.params.user_id
    },
    meritData() {
      return {
        user_id: this.user.id,
        article_star_count: this.user.article_star_count,
        article_view_count: this.user.article_view_count,
        integral: this.user.integral
      }
    },
    relationData() {
      return {
        notice_count: this.user.notice_count,
        fans_count: this.user.fans_count
      }
    }
  },
  watch: {
    userId() {
      this.activeIndex = 1
      this.page = 1
      this.list = []
      this.fetchUserData()
    },
    activeIndex() {
      this.page = 1
      this.list = []
      this.fetchDynamics()
    }
  },
  created() {
    this.fetchUserData()
  },
  beforeMount() {
    window.addEventListener("scroll", this.scrollInstance)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollInstance)
  },
  methods: {
    del(index) {
      this.list.splice(index, 1)
      this.total--
    },
    fetchUserData() {
      this.isFetch = true
      getDetail({id: this.userId}).then(res => {
        this.user = res.data
        this.fetchDynamics()
      })
    },
    fetchDynamics() {
      this.isFetch = true
      getDynamics(
          {
            find_id: this.user.id,
            type: this.activeIndex,
            page: this.page,
            size: this.size
          }).then(res => {
        this.total = res.data.total
        this.list.push(...res.data.records)
      }).finally(() => {
        this.isFetch = false
      })
    },
    handleLoadMore() {
      this.page++
      this.fetchDynamics()
    },
    scrollInstance() {
      const sc = this.$refs.listNav.$el.getBoundingClientRect().top
      if (sc < 0 && !this.isScrollLow)
        this.isScrollLow = true
      if (sc > 0 && this.isScrollLow) this.isScrollLow = false
    }
  }
}
</script>