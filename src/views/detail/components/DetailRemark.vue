<template>
  <div v-show="visible" class="jiu-card">
    <div class="jiu-card-body">
      <root-input ref="commentInput"/>
      <div class="article-comments">
        <template v-if="commentList.length>0">
          <div class="jiu-title">
            <span class="jiu-title--text">全部评论</span>
          </div>
          <remark-list ref="commentWrap" :list="commentList"/>
          <div class="pagination-part">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                @current-change="handlePageChange">
            </el-pagination>
          </div>
        </template>
        <div v-if="commentList.length === 0" class="non-comment">
          消灭零回复
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RemarkList from "./RemarkList";
import RootInput from "./RootInput";
import {getRootList} from "@/api/remark";
import burs from "./BursEvent"

export default {
  components: {
    RemarkList,
    RootInput,
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      commentList: [], //评论数据
      total: 0,
      pageIndex: 1,
      pageSize: 20
    };
  },
  computed: {
    currentArticleId() {
      return +this.$route.params.article_id;
    },
  },
  created() {
    this.getList()
    this.initEvents()
  },
  beforeDestroy() {
    burs.$off()
  },
  methods: {
    handleLoadMore() {
      this.pageIndex++
      this.getList()
    },
    getList() {
      getRootList({
        article_id: this.currentArticleId,
        page: this.pageIndex,
        size: this.pageSize
      }).then(res => {
        this.commentList = res.data.records;
        this.total = res.data.total
        this.$store.dispatch("common/updateAuthor", res.data.author_id)
        this.$store.dispatch("detail/reset")
      }).catch(e => {
        console.log(e)
      })
    },
    initEvents() {
      burs.$on("addRemark", e => {
        const userData = this.$store.state.user.info
        if (!userData) return
        e.user_id = userData.id
        e.nick = userData.nick
        e.avatar_url = userData.avatar_url
        if (e.comment_id) {
          this.commentList = this.commentList.map(v => {
            if (v.id === e.comment_id) {
              if (v.children === undefined) v.children = []
              v.children.unshift(e)
            }
            return v
          })
        } else {
          this.total++
          this.commentList.unshift({...e, children: []})
        }
        this.$store.dispatch("remark/reset")
      })

      burs.$on("delRoot", id => {
        if (this.pageIndex < Math.ceil(this.total / this.pageSize)) {
          this.getList()
          return
        }
        if (this.commentList.length === 1 && this.pageIndex > 1) {
          this.pageIndex--
          this.getList()
          return
        }
        this.total--
        this._delItem(id, this.commentList)
      })
      burs.$on("delChild", id => {
        this._delReply(id, this.commentList)
      })
    },
    _delItem(id, data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          data.splice(i, 1)
          break;
        }
      }
    },
    _delReply(id, data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children) this._delItem(id, data[i].children)
      }
    },
    handlePageChange(i) {
      this.pageIndex = i
      this.getList()
    },
    focus() {
      this.$refs.commentInput.focus()
    }
  },
};
</script>
<style scoped lang="scss">
.jiu-card-body {
  padding-bottom: 10px;
}

.article-comments {
  width: 100%;
}

.non-comment {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #b4bccc;
}

::v-deep .el-popover {
  position: relative;
  width: fit-content !important;
}

::v-deep .el-popover--plain {
  padding: 10px;
}

.pagination-part {
  display: flex;
  justify-content: center;
}

.non-comment {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #b4bccc;
}
</style>
