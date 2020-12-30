<template>
  <ul v-if="list.length>0" :class="{'bg':parentId}" class="jiu-list">
    <li class="jiu-list-item" v-for="(item, index) in list" :key="index">
      <div class="container" :id="(parentId?'child':'root')+item.id">
        <el-avatar class="avatar" :size="35" :src="item.avatar_url"/>
        <div class="comment-entity">
          <div class="item-wrap">
            <div class="info-text">
              <a :href="'/user/'+item.user_id" target="_blank" class="user-link--author">{{ item.nick }}</a>
              <span style="color: #cb1010" v-if="authorId===item.user_id">（作者）</span>
            </div>
            <!--内容区-->
            <div class="comment-content">
              <template v-if="item.parent_id">
                <a :href="'/user/'+item.target_id" target="_blank" class="user-link--at">@{{ item.target_nick }}</a>:
              </template>
              {{ item.content }}
            </div>
            <!--end -->
            <!--底部-->
            <div class="comment-bottom">
              <div>
                <span class="comment-time">{{ item.time|getDiff }}</span>
                <el-popconfirm
                    v-if="userId!=null && userId===item.user_id"
                    placement="right-end"
                    title="确定删除这条评论吗？"
                    @confirm="delComment(item.id)">
                  <span slot="reference" class="comment-del">删除</span>
                </el-popconfirm>
              </div>
              <div class="reply-wrap" @click="fillState(item)">
                <svg-icon icon="reply"/>
                <span class="reply-text">回复</span>
              </div>
            </div>
            <child-input v-if="currentInputRef===(parentId ? 'child':'parent') + item.id"/>
          </div>
          <remark-list :list="item.children||[]" :parent-id="item.id"/>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import ChildInput from "./ChildInput";
import {delRoot, delChild} from "@/api/remark"
import burs from "./BursEvent"
import Msg from "@/utils/message"

export default {
  name: "RemarkList",
  components: {
    ChildInput
  },
  props: {
    list: Array,
    parentId: {
      type: Number,
      default: null
    }
  },
  computed: {
    authorId() {
      return this.$store.state.common.authorId
    },
    userId() {
      return this.$store.state.user.info.id
    },
    articleId() {
      return +this.$route.params.article_id
    },
    currentInputRef() {
      return this.$store.state.remark.input_ref
    }
  },
  methods: {
    fillState(item) {
      this.$store.dispatch("remark/setInputRef", (this.parentId ? 'child' : 'parent') + item.id)
      this.$store.dispatch("remark/setParams", {
        comment_id: this.parentId || item.id,
        parent_id: this.parentId ? item.id : null,
        target_id: item.user_id,
        target_nick: item.nick,
      })
    },
    delComment(id) {
      if (this.parentId) {
        delChild({article_id: this.articleId, id}).then(res => {
          if (res.data) {
            Msg.tip(res.msg)
            burs.$emit("delChild", id)
          } else Msg.warn(res.msg)
        })
      } else {
        delRoot({
          article_id: this.articleId,
          id,
          size: this.getDelSize(id),
        }).then(res => {
          if (res.data) {
            Msg.tip(res.msg)
            burs.$emit("delRoot", id)
          } else Msg.warn(res.msg)
        })
      }
    },
    getDelSize(id) {
      const item = this.list.find(v => v.id === id);
      if (item.children) return item.children.length + 1
      return 1
    },
  }
};
</script>
<style scoped lang="scss">
.jiu-list {
  border-radius: 4px;
  margin-top: 12px;
  padding: 0 10px;
  box-sizing: border-box;
}

.bg {
  background-color: #fafbfc;
}

.container {
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
}

.item-wrap:hover .comment-del {
  visibility: visible;
}

.user-link--author {
  text-decoration: none;
  color: #333;
}

.user-link--at {
  color: #78c40e;
  text-decoration: none;
}

.user-link--author:hover,
.user-link--at:hover {
  text-decoration: underline;
}

.comment-entity {
  width: calc(100% - 45px);
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-text {
  font-size: 0.88rem;
  display: flex;
  align-items: center;
}

.info-nick {
  cursor: pointer;
}

.info-nick:hover {
  color: #48adad;
}

/**/
.comment-content {
  font-size: 0.88rem;
  margin: 12px 0;
  line-height: 1.2em;
  letter-spacing: 1px;
  color: #505050;
  overflow: hidden;
}

/**/
.comment-bottom {
  display: flex;
  justify-content: space-between;
  user-select: none;
}


.comment-time, .comment-del {
  font-size: 0.88rem;
  color: #8a9aa9;
}

.comment-del {
  visibility: hidden;
  margin-left: 14px;
  cursor: pointer;
}

.comment-del:hover {
  color: #e50808;
}

.reply-wrap {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.83em;
  color: #a7b0bb;
}

.reply-text {
  margin-left: 3px;
}

</style>
