<template>
    <section class="jiu-page--notification">
        <div class="jiu-navigation">
            <div class="jiu-nav jiu-dynamic-wrap">
                <div class="jiu-nav-item" :class="{'jiu-active':type==='remark'}" @click="toggleItem('remark')">
                    <template v-if="msgObj.remark_count>0">
                        <el-badge :value="msgObj.remark_count">评论消息</el-badge>
                    </template>
                    <template v-else>评论消息</template>
                </div>
                <div class="jiu-nav-item" :class="{'jiu-active':type==='star'}" @click="toggleItem('star')">
                    <template v-if="msgObj.star_count>0">
                        <el-badge :value="msgObj.star_count">点赞消息</el-badge>
                    </template>
                    <template v-else>点赞消息</template>
                </div>
                <div class="jiu-nav-item" :class="{'jiu-active':type==='notice'}" @click="toggleItem('notice')">
                    <template v-if="msgObj.notice_count>0">
                        <el-badge :value="msgObj.notice_count">关注消息</el-badge>
                    </template>
                    <template v-else>关注消息</template>
                </div>
            </div>
        </div>
        <jiu-react-box>
            <div class="jiu-card">
                <div class="jiu-card-header">
                    <span>消息列表</span>
                    <span v-if="total>0" class="clear-btn" @click="estimateMsg">清空</span>
                </div>

                <JiuReachBottom
                    :is-fetch="isFetch"
                    :total="total"
                    :current-data-size="list.length"
                    :on-scroll-bottom="loadMore">
                    <ul class="jiu-list" v-if="list.length>0">
                        <li class="jiu-list-item" v-for="(item,index) in list" :key="index">
                            <template v-if="type==='remark'">
                                <remark-msg :msg-data="item" :index="index" @del="fillData"/>
                            </template>
                            <template v-if="type==='star'">
                                <star-msg :msg-data="item" :index="index" @del="fillData"/>
                            </template>
                            <template v-if="type==='notice'">
                                <notice-msg :msg-data="item"/>
                            </template>
                        </li>
                    </ul>
                </JiuReachBottom>
            </div>
        </jiu-react-box>
    </section>
</template>
<script>
import JiuReactBox from "@/components/JiuReactBox"
import JiuLoad from "@/components/JiuLoad"
import RemarkMsg from "./components/RemarkMsg"
import StarMsg from "./components/StarMsg"
import NoticeMsg from "./components/NoticeMsg"
import JiuReachBottom from "@/components/JiuReachBottom"
import {queryMsg, estimateMsg} from "@/api/msg"

export default {
    components: {
        JiuReactBox,
        JiuLoad,
        RemarkMsg,
        StarMsg,
        NoticeMsg,
        JiuReachBottom
    },
    data() {
        return {
            pageIndex: 1,
            pageSize: 20,
            total: 0,
            list: [],
            isFetch: false,
        }
    },
    created() {
        this.queryMsg().catch(() => {
        })
    },
    computed: {
        type() {
            return this.$route.params.type
        },
        msgObj() {
            return this.$store.state.common.msgCount
        }
    },
    watch: {
        type(v) {
            this.pageIndex = 1
            this.list = []
            this.queryMsg().catch(() => {
            })
            if (v === 'notice') {
                this.$store.dispatch("common/clearMsgCount", "notice_count")
            }
        },
    },
    methods: {
        fillData(index) {
            this.list.splice(index, 1)
            const maxPage = Math.ceil(this.total / this.pageSize)
            if (this.pageIndex !== maxPage)
                queryMsg({
                    type: this.type,
                    page: this.pageIndex,
                    size: this.pageSize
                }).then(res => {
                    this.total = res.data.total
                    this.list.push(res.data.records.pop())
                })
            else this.total--
        },
        loadMore() {
            if (this.total === this.list.length) return Promise.reject()
            this.pageIndex++
            return this.queryMsg()
        },
        estimateMsg() {
            this.$confirm('确定清空所有消息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                estimateMsg({
                    type: this.type
                }).then(res => {
                    this.list = []
                    this.total = 0
                    this.$store.dispatch("common/clearMsgCount", this.type + "_count")
                })
            }).catch(() => {
            });
        },
        async queryMsg() {
            try {
                this.isFetch = true
                const res = await queryMsg({
                    type: this.type,
                    page: this.pageIndex,
                    size: this.pageSize
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
        toggleItem(type) {
            if (type === this.type) return
            this.$router.replace("/notification/" + type)
        }
    }
}
</script>
<style scoped lang="scss">
.jiu-card-header {
    display: flex;
    justify-content: space-between;
}

.clear-btn {
    cursor: pointer;
    color: #4a90e2;
}

::v-deep .el-badge__content.is-fixed {
    right: 2px;
}
</style>
