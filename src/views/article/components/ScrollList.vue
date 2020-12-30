<template>
  <div class="jiu-card">
    <div class="jiu-card-header">
      <ul class="jiu-split-list">
        <li :class="[{'jiu-active':order===1},'jiu-split-list-item']" @click="order=1">最新</li>
        <li :class="[{'jiu-active':order===2},'jiu-split-list-item']" @click="order=2">热门</li>
        <li v-if="isLogin" :class="[{'jiu-active':order===3},'jiu-split-list-item']" @click="order=3">关注</li>
      </ul>
    </div>
    <ul class="jiu-list" v-if="total>0">
      <li class="jiu-list-item" v-for="(item,index) in list" :key="index">
        <jiu-article-item :item="item" @del="del(index)"/>
      </li>
    </ul>

    <jiu-load :is-fetch="isFetch"
              :has-data="total>0"
              :load-completed="list.length === total"
              @load-more="handleLoadMore"/>
  </div>
</template>
<script>
import JiuArticleItem from "@/components/JiuArticleItem"
import JiuLoad from "@/components/JiuLoad"
import {getList} from "@/api/article";

export default {
  components: {
    JiuLoad,
    JiuArticleItem
  },
  data() {
    return {
      page: 1,
      size: 18,
      total: 0,
      list: [],
      order: 1,//排序方式  1:最新 2:热门 3:关注
      isFetch: false
    }
  },
  props: {
    type: {
      type: Number,
      default: -1
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.info.id
    }
  },
  watch: {
    type() {
      this.initData()
    },
    order() {
      this.initData()
    },
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.list = []
      this.page = 1
      this.fetchList()
    },
    del(i) {
      this.total--
      this.list.splice(i, 1)
    },
    handleLoadMore() {
      this.page++
      this.fetchList()
    },
    async fetchList() {
      try {
        this.isFetch = true
        const res = await getList({
          type: this.type,
          order: this.order,
          page: this.page,
          size: this.size
        })
        this.isFetch = false
        this.total = res.data.total
        this.list.push(...res.data.records)
      } catch (e) {

      } finally {
        this.isFetch = false
      }
    }
  }
}
</script>