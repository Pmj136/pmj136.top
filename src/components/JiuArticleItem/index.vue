<template>
    <div class="container" @mouseleave="actionItemVisible=false">
        <svg-icon icon="top" class="top-icon" v-if="item.is_top"></svg-icon>
        <template v-if="device==='mobile'">
            <el-avatar
                style="margin-right: 15px;"
                :size="50"
                :src="item.avatar_url"/>
            <div class="main--mobile">
                <div class="title-wrap--mobile">
                    <a class="title--mobile" :href="'/article/'+item.article_id" target="_blank">{{ item.title }}</a>
                    <div v-if="isMine&&!item.is_del"
                         class="handle--mobile"
                         style="position: relative"
                         @click="actionItemVisible=!actionItemVisible">
                        <svg-icon icon="more"/>
                        <div v-if="actionItemVisible" class="action-handle action-handle--mobile">
                            <router-link tag="div" :to="'/creation/update/'+item.article_id">编辑</router-link>
                            <div @click="concealArticle">删除</div>
                        </div>
                    </div>
                </div>
                <div class="extra-wrap--mobile">
                    <div class="user--mobile">
                        <a class="info--mobile" :href="'/user/'+item.user_id" target="_blank">{{ item.nick }}</a>
                        <span class="info--mobile">{{ item.release_time|getDiff }}</span>
                    </div>
                    <div class="action--mobile" v-if="!item.is_del">
                        <div class="star--mobile" :style="{color:item.is_star?'#6cbd45':'#b2bac2'}"
                             @click="executeStar(item)">
                            <svg-icon icon="star"/>
                            <span class="num--mobile">{{ item.star_count|calcCount }}</span>
                        </div>
                        <a class="comment--mobile" :href="'/article/'+item.article_id" target="_blank">
                            <svg-icon icon="comment"/>
                            <span class="num--mobile">{{ item.comment_count|calcCount }}</span>
                        </a>
                    </div>
                    <div v-else>
                        <span class="action-extra" @click="restoreArticle">恢复</span>
                        <span class="action-extra" @click="delArticle">永久删除</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="main--pc" :style="{'width':item.initial_img?'calc(100% - 90px)':'100%'}">
                <div>
                    <a class="info--pc" :href="'/user/'+item.user_id" target="_blank">{{ item.nick }}</a>
                    <span class="plot">-</span>
                    <span class="info--pc">{{ item.release_time|getDiff }}</span>
                    <span class="plot">-</span>
                    <span class="info--pc">{{ item.tags.replaceAll(',', '/') }}</span>
                </div>
                <div class="title-wrap--pc">
                    <a class="title--pc" :href="'/article/'+item.article_id" target="_blank">{{ item.title }}</a>
                </div>
                <div class="action-wrap--pc">
                    <template v-if="!item.is_del">
                        <div class="action--pc" :style="{color:item.is_star?'#6cbd45':'#b2bac2'}"
                             @click="executeStar(item)">
                            <svg-icon icon="star"/>
                            <span class="action-num--pc">{{ item.star_count|calcCount }}</span>
                        </div>
                        <a class="action--pc" :href="'/article/'+item.article_id" target="_blank">
                            <svg-icon icon="comment"/>
                            <span class="action-num--pc">{{ item.comment_count|calcCount }}</span>
                        </a>
                        <div v-if="isMine"
                             class="action--pc"
                             style="position: relative"
                             @click="actionItemVisible=!actionItemVisible">
                            <svg-icon icon="more"/>
                            <div v-if="actionItemVisible" class="action-handle action-handle--pc">
                                <router-link tag="div" :to="'/creation/update/'+item.article_id">编辑</router-link>
                                <div @click="concealArticle">删除</div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="action--pc" @click="restoreArticle">恢复</div>
                        <div class="action--pc" @click="delArticle">永久删除</div>
                    </template>
                </div>
            </div>
            <el-image
                v-if="item.initial_img"
                :src="item.initial_img"
                fit="cover"
                :preview-src-list="[item.initial_img]"/>
        </template>
    </div>
</template>
<script>
import starFun from "@/mixins/star"
import {delArticle, restoreArticle, concealArticle} from "@/api/article"
import Msg from "@/utils/message"

export default {
    mixins: [starFun],
    props: {
        item: Object,
    },
    data() {
        return {
            extraVisible: true,
            actionItemVisible: false
        }
    },
    computed: {
        isMine() {
            return this.$store.state.user.info.id === this.item.user_id
        },
        device() {
            return this.$store.state.common.device
        },
    },
    methods: {
        delArticle() {
            this.$confirm('删除后不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delArticle({id: this.item.article_id}).then(res => {
                    Msg.tip(res.msg)
                    this.$emit("del")
                })
            }).catch(() => {
            });
        },
        restoreArticle() {
            restoreArticle({id: this.item.article_id}).then(res => {
                Msg.tip(res.msg)
                this.$emit("del")
            })
        },
        concealArticle() {
            concealArticle({id: this.item.article_id}).then(res => {
                Msg.tip(res.msg)
                this.actionItemVisible = false
                this.$emit("del")
            })
        },
    }
}
</script>

<style scoped lang="scss">
@import "./style-pc.scss";
@import "./style-mobile.scss";

.container {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
}

.container:hover {
    background-color: rgba(251, 251, 251);
}
.top-icon{
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1.8rem;
}
.action-handle {
    position: absolute;
    width: 4rem;
    margin-top: .5rem;
    white-space: nowrap;
    color: #8f969c;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 #e0e4e9;
    border-radius: 2px;
    border: 1px solid rgba(217, 222, 224, .99);
    z-index: 10;
    user-select: none;
}

.action-handle > * {
    padding: 4px 10px;
    font-size: 1rem;
}

.action-handle > *:hover {
    background-color: #f9f9f9;
}

</style>
