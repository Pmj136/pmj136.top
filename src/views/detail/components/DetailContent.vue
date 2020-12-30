<template>
  <div class="jiu-card">
    <div class="jiu-card-body">
      <Skeleton v-show="obj===null" :is-fetch="isFetch"/>
      <template v-if="obj!=null">
        <h1 class="article-title">{{ obj.acticle_title }}</h1>
        <div class="article-info">
          <el-tag size="mini" effect="dark" type="success">{{ obj.article_type }}</el-tag>
          <div class="article-tags">
            <el-tag size="mini" type="info" v-for="(item,index) in getTasArr(obj)" :key="index">{{ item }}</el-tag>
          </div>
        </div>
        <div class="author-info">
          <div class="author-info-desc">
            <el-avatar class="avatar" :size="45" :src="obj.user_avatar"/>
            <div class="author-text">
              <div>
                <a class="author-nick" :href="'/user/'+obj.user_id" target="_blank">{{ obj.user_nick }}</a>
                <span class="user-rank">Lv.{{ obj.integral|getRank(obj.create_at) }}</span>
              </div>
              <div class="article-read-info">
                <span>{{ obj.release_time }}</span>
                <span class="read-num">阅读: {{ obj.view_count || 1 }}</span>
              </div>
            </div>
          </div>
          <div class="add" v-if="onLineUserId!==obj.user_id">
            <button
                :class="['jiu-button','jiu-button--'+noticeState.type]"
                @click="handleNoticeAction">{{ noticeState.text }}
            </button>
          </div>
          <div class="add" v-else>
            <button class="jiu-button jiu-button--primary jiu-button--small"
                    @click="$router.push('/creation/update/'+obj.article_id)">
              编辑
            </button>
          </div>
        </div>
        <div class="tools">
          <el-badge :value="obj.star_count" :max="99" type="warning">
            <div class="like-btn" @click="executeStar(obj)">
              <svg-icon :style="{color:obj.is_star?'#6cbd45':'#b2bac2','font-size': '14px'}" icon="star"/>
            </div>
          </el-badge>
          <el-badge :value="obj.comment_count" :max="99" type="info">
            <div class="like-btn" @click="$emit('comment')">
              <svg-icon style=" font-size: 14px" icon="comment"/>
            </div>
          </el-badge>
          <div class="like-btn" @click="executeCollect(obj)">
            <svg-icon :style="{color:obj.is_collect?'#6cbd45':'#b2bac2','font-size': '14px'}" icon="collect"/>
          </div>
        </div>
        <md-editor only-show navigation :value="obj.content"/>
        <small style="color:#999;">注意：本文归作者所有，未经作者允许，不得转载</small>
      </template>
    </div>
  </div>
</template>
<script>
import MdEditor from "@/components/JiuEditor/index";
import Skeleton from './Skeleton';
import {getDetailById} from "@/api/article";
import {addNotice, cancelNotice,} from "@/api/user"
import {addArticleCollect, cancelArticleCollect} from "@/api/article"

import starFun from "@/mixins/star"

export default {
  components: {
    MdEditor,
    Skeleton
  },
  data() {
    return {
      obj: null,
      isFetch: true
    };
  },
  mixins: [starFun],
  computed: {
    onLineUserId() {
      return this.$store.state.user.info.id
    },
    noticeState() {
      if (this.obj.is_notice && this.obj.is_fans)
        return {
          type: 'remind',
          text: '已互关',
        }
      else {
        if (this.obj.is_notice)
          return {
            type: "success",
            text: '已关注',
          }
        return {
          type: 'default',
          text: '关注',
        }
      }
    }
  },
  created() {
    getDetailById({
      article_id: +this.$route.params.article_id,
    }).then(res => {
      this.obj = res.data;
      this.isFetch = false
      document.title = res.data.acticle_title
      this.$nextTick(() => {
        this.$emit("loaded")
      })
    }).catch(err => {
      this.isFetch = false
      console.log(err)
    })
  },
  methods: {
    getTasArr(obj) {
      if (obj.tags == null) return []
      return obj.tags.split(",")
    },
    executeCollect(obj) {
      if (!!obj.is_collect) {
        cancelArticleCollect({user_id: this.onLineUserId, article_id: obj.article_id}).then(() => {
          obj.is_collect = 0
        }).catch(()=>{})
      } else {
        addArticleCollect({user_id: this.onLineUserId, article_id: obj.article_id}).then(() => {
          obj.is_collect = 1
        }).catch(()=>{})
      }
    },
    handleNoticeAction() {
      const params = {
        notice_id: +this.$store.state.user.info.id,
        target_id: this.obj.user_id,
      }
      if (this.obj.is_notice) {
        cancelNotice(params).then(() => {
          this.obj.is_notice = 0
        }).catch(()=>{})
      } else {
        addNotice(params).then(() => {
          this.obj.is_notice = 1
        }).catch(()=>{})
      }
    }
  },
};
</script>
<style scoped lang="scss">
.article-title {
  letter-spacing: 1px;
  font-size: 26px;
  font-weight: 600;
  margin-top: 0;
}

.article-info {
  display: flex;
  align-items: center;
  margin: 18px 0;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 13px;
  margin-left: 18px;
  position: relative;
}

.article-tags::before {
  content: "";
  position: absolute;
  width: 1px;
  height: 88%;
  background-color: #ccc;
  left: -7px;
}

.article-tags > * {
  margin: 0 4px;
}

.author-info {
  border-radius: 4px;
  background-color: #f5f5f1;
  margin: 18px 0;
  padding: 8px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.author-info-desc {
  display: flex;
}

.author-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2px 0;
  box-sizing: border-box;
  margin-left: 20px;
}

.author-nick {
  color: #54aa4a;
  font-weight: bold;
  font-size: 0.94em;
  cursor: pointer;
  text-decoration: none;
}

.user-rank {
  margin-left: 8px;
}

.author-nick:hover {
  color: #daae6c;
}

.article-read-info {
  font-size: 0.8em;
  color: #909090;
}

.read-num {
  margin-left: 20px;
}

.add {
  display: flex;
  align-items: center;
}

.tools {
  position: fixed;
  top: 200px;
  margin-left: -90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .like-btn {
    width: 2.4rem;
    height: 2.4rem;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .04);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-bottom: 16px;
    cursor: pointer;
    transition: transform linear 0.1s;

    &:hover {
      transform: scale(1.1);
    }

    .svg-icon {
      color: #c3c6cc;
    }
  }
}

@media all and (max-width: 1300px) {
  .tools {
    display: none;
  }
}

@media all and (max-width: 640px) {
  .article-title {
    font-size: 22px;
  }
}

</style>
