<template>
    <div class="jiu-card">
        <div class="jiu-card-header">
            <span>搜索结果</span>
        </div>
        <ul class="jiu-list">
            <li class="jiu-list-item" v-for="(item,index) in list" :key="index">
                <jiu-article-item v-if="item.t===1" :item="item" @del="del(index)"/>
                <jiu-user-item v-else :item="item"/>
            </li>
        </ul>

        <jiu-load
            :is-fetch="isFetch"
            :total="total"
            :current-data-size="list.length"/>
    </div>
</template>
<script>
import JiuArticleItem from "@/components/JiuArticleItem/index"
import JiuUserItem from "@/components/JiuUserItem/index"
import JiuLoad from "@/components/JiuLoad/index"
import {search} from "@/api/article";
import {ScrollBottomListener} from "@/utils/ScrollHandler"

let scrollHandler = new ScrollBottomListener();
export default {
    components: {
        JiuLoad,
        JiuArticleItem,
        JiuUserItem
    },
    data() {
        return {
            list: [],
            pageIndex: 1,
            pageSize: 18,
            total: 0,
            isFetch: false
        }
    },
    computed: {
        type() {
            return +this.$route.query.type
        },
        keyword() {
            return this.$route.query.query
        },
        watchVal() {
            return {
                type: this.type,
                keyword: this.keyword || ""
            }
        }
    },
    watch: {
        watchVal(v) {
            if (v.keyword.trim() !== "") {
                this.pageIndex = 1
                this.list = []
                this.fetchList().catch(() => {
                })
            }
        }
    },
    created() {
        this.fetchList()
        scrollHandler.registerListener(() => {
            if (this.total === this.list.length) return Promise.reject()
            this.pageIndex++
            return this.fetchList()
        })
    },
    beforeDestroy() {
        scrollHandler.removeListener()
        scrollHandler = null
    },
    methods: {
        del(i) {
            this.total--
            this.list.splice(i, 1)
        },
        async fetchList() {
            try {
                this.isFetch = true
                const res = await search({
                    type: this.type,
                    page: this.pageIndex,
                    size: this.pageSize,
                    keyword: this.keyword
                })
                this.isFetch = false
                this.total = res.data.total
                const newArr = res.data.record
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
