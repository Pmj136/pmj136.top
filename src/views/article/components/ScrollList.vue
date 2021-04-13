<template>
    <div class="jiu-card">
        <div class="jiu-card-header">
            <ul class="jiu-split-list">
                <li :class="[{'jiu-active':order===1},'jiu-split-list-item']" @click="handleOrderChange(1)">最新</li>
                <li :class="[{'jiu-active':order===2},'jiu-split-list-item']" @click="handleOrderChange(2)">热门</li>
                <li v-if="isLogin" :class="[{'jiu-active':order===3},'jiu-split-list-item']"
                    @click="handleOrderChange(3)">关注
                </li>
            </ul>
        </div>

        <JiuReachBottom
            :is-fetch="isFetch"
            :total="total"
            :current-data-size="list.length"
            :on-scroll-bottom="loadMore">
            <ul class="jiu-list" v-if="total>0">
                <li class="jiu-list-item" v-for="(item,index) in list" :key="index">
                    <jiu-article-item :item="item" @del="del(index)"/>
                </li>
            </ul>
        </JiuReachBottom>
    </div>
</template>
<script>
import JiuArticleItem from "@/components/JiuArticleItem"
import JiuLoad from "@/components/JiuLoad"
import {getList} from "@/api/article";
import JiuReachBottom from "@/components/JiuReachBottom"

const {mapState} = Vuex
export default {
    components: {
        JiuLoad,
        JiuArticleItem,
        JiuReachBottom
    },
    data() {
        return {
            page: 1,
            size: 18,
            total: 0,
            list: [],
            isFetch: false,
        }
    },
    computed: {
        ...mapState({
            isLogin: state => state.user.info.id,
            type: state => state.article.type,
            order: state => state.article.order //排序方式  1:最新 2:热门 3:关注
        }),
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
        loadMore() {
            if (this.total === this.list.length) return Promise.reject()
            this.page++
            return this.fetchList()
        },
        initData() {
            this.list = []
            this.page = 1
            this.fetchList().catch(() => {
            })
        },
        del(i) {
            this.total--
            this.list.splice(i, 1)
        },
        handleOrderChange(val) {
            if (this.order === val) return
            this.$store.dispatch("article/setOrder", val)
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
                this.total = res.data.total
                const newArr = res.data.records
                this.list.push(...newArr)
                if (newArr.length > 0) return Promise.resolve()
                return Promise.reject()
            } finally {
                this.isFetch = false
            }
        }
    }
}
</script>
