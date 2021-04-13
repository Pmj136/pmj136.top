<template>
    <section class="jiu-page--user">
        <div class="jiu-navigation" v-show="isScrollLow">
            <list-nav class="jiu-dynamic-wrap" :active.sync="activeIndex" :user-id="user?user.id:0"/>
        </div>
        <jiu-react-box>
            <user-info :item="user"/>
            <div class="jiu-card">
                <list-nav ref="listNav" :active.sync="activeIndex" :user-id="user?user.id:0"/>
                <JiuReachBottom
                    :is-fetch="isFetch"
                    :total="total"
                    :current-data-size="list.length"
                    :on-scroll-bottom="loadMore">
                    <ul class="jiu-list">
                        <li class="jiu-list-item" v-for="(item,index) in list" :key="index">
                            <jiu-user-item v-if="item.id" :item="item"/>
                            <jiu-article-item v-else :item="item" @del="del(index)"/>
                        </li>
                    </ul>
                </JiuReachBottom>
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
import JiuReachBottom from "@/components/JiuReachBottom"
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
        JiuLoad,
        JiuReachBottom
    },
    data() {
        return {
            list: [],
            page: 1,
            size: 14,
            total: 0,
            isFetch: false,
            user: {},
            isScrollLow: false,
            activeIndex: 1,
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
            this.fetchDynamics().catch(() => {
            })
        }
    },
    created() {
        this.fetchUserData()
    },
    mounted() {
        window.addEventListener("scroll", this._normalHandler);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this._normalHandler);
    },
    methods: {
        _normalHandler() {
            const sc = this.$refs.listNav.$el.getBoundingClientRect().top
            if (sc < 0 && !this.isScrollLow)
                this.isScrollLow = true
            if (sc > 0 && this.isScrollLow) this.isScrollLow = false
        },
        loadMore() {
            if (this.total === this.list.length) return Promise.reject()
            this.page++
            return this.fetchDynamics()
        },
        del(index) {
            this.list.splice(index, 1)
            this.total--
        },
        fetchUserData() {
            this.isFetch = true
            getDetail({id: this.userId}).then(res => {
                this.user = res.data
                this.fetchDynamics().catch(() => {
                })
            })
        },
        async fetchDynamics() {
            try {
                this.isFetch = true
                const res = await getDynamics(
                    {
                        find_id: this.user.id,
                        type: this.activeIndex,
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
        },
    }
}
</script>
