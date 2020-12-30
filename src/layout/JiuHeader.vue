<template>
  <div class="jiu-dynamic-wrap">
    <ul class="jiu-list list-wrap">
      <li class="list-item">
        <a href="/">
          <img src="~@/assets/logo.png" class="jiu-logo" alt="logo"/>
        </a>
      </li>
      <li class="list-item">
        <el-dropdown v-if="device==='mobile'" trigger="click">
          <div class="dropdown-title">
            <span class="menu-list-item-link" :class="{ 'jiu-active': route === currentItem.path }">{{ currentItem.title }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in docTitles" :key="index" :class="[{ 'jiu-active': route === item.path }]">
              <router-link :to="item.path" tag="span" class="menu-list-item-link">{{ item.title }}</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <ul v-else class="menu-list jiu-list">
          <li v-for="(item, index) in docTitles" :key="index" class="menu-list-item" :class="{'jiu-active': route === item.path }">
            <router-link :to="item.path" tag="span" class="menu-list-item-link">{{ item.title }}</router-link>
          </li>
        </ul>
      </li>
      <li class="list-item">
        <el-input
            size="small"
            :style="{'width':device==='mobile'?'120px':'150px',transition:'width 0.3s linear'}"
            placeholder="搜索"
            v-model="keyword"
            @keydown.enter.native="search"/>
      </li>
    </ul>
    <div class="user-action-wrap">
      <template v-if="isLogin">
        <el-badge :is-dot="msgTotal>0" style="margin-right: 25px">
          <svg-icon icon="msg" :class="{'jiu-active': route.includes('/notification')}" class="msg-icon" @click="$router.push('/notification/remark')"/>
        </el-badge>
        <el-dropdown v-if="device==='mobile'" key="mobile" trigger="click" @command="handleCommand">
          <div class="dropdown-title">
            <el-avatar :src="userAvatar"></el-avatar>
            <svg-icon icon="downpull"/>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="md">写文章</el-dropdown-item>
            <el-dropdown-item command="user">我的主页</el-dropdown-item>
            <el-dropdown-item command="msg">我的消息</el-dropdown-item>
            <el-dropdown-item command="setting">账号管理</el-dropdown-item>
            <el-dropdown-item divided command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-else key="pc" :show-timeout="30" trigger="hover" @command="handleCommand">
          <div class="dropdown-title">
            <el-avatar :src="userAvatar"></el-avatar>
            <svg-icon icon="downpull"/>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user">我的主页</el-dropdown-item>
            <el-dropdown-item command="msg">我的消息</el-dropdown-item>
            <el-dropdown-item command="setting">账号管理</el-dropdown-item>
            <el-dropdown-item divided command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <span v-else class="login-text" @click="$store.dispatch('common/setSignVisible',true)">登录</span>
      <el-button
          v-if="device==='pc'"
          style="margin-left: 20px"
          type="danger"
          size="medium"
          round
          icon="el-icon-edit"
          @click="toCreation">
        写文章
      </el-button>
    </div>
  </div>
</template>
<script>
import {navTitles} from "@/utils/attribute"
import {countMsg} from "@/api/msg"

const {mapState} = Vuex
export default {
  data() {
    return {
      docTitles: navTitles,
      keyword: "",
    }
  },
  watch: {
    route(v) {
      if (v === '/search')
        this.fillInput()
      else this.keyword = ""
    }
  },
  created() {
    countMsg().then(res => {
      this.$store.dispatch("common/fillMsgCount", res.data)
    })
    this.fillInput()
  },
  computed: {
    ...mapState({
      msgCount: state => state.common.msgCount,
      loginId: state => state.user.info.id,
      userAvatar: state => state.user.info.avatar_url,
      device: state => state.common.device
    }),
    msgTotal() {
      const {notice_count, remark_count, star_count} = this.msgCount
      return notice_count + remark_count + star_count
    },
    route() {
      return this.$route.path;
    },
    currentItem() {
      return this.docTitles.find(v => v.path === this.route) || navTitles[0]
    },
    isLogin() {
      return !!this.loginId
    }
  },
  methods: {
    fillInput() {
      const keyword = this.$route.query.query
      if (keyword) this.keyword = keyword
    },
    toCreation() {
      if (!!this.userAvatar)
        this.$router.push('/creation/add')
      else
        this.$store.dispatch('common/setSignVisible', true)
    },
    handleCommand(command) {
      switch (command) {
        case "md":
          this.toCreation();
          break;
        case "user":
          this.$router.push("/user/" + this.loginId)
          break;
        case "setting":
          this.$router.push('/user/setting/profile');
          break;
        case "msg":
          this.$router.push('/notification/remark')
          break;
        case "exit":
          this.$confirm('将退出系统, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.$store.dispatch("user/logout").then(() => {
              const verify = this.$route.meta.verify;
              if (verify) this.$router.replace("/")
              else this.$root.$children[0].reload()
            })
          }).catch(e => {})
          break;
      }
    },
    search() {
      const c_type = this.$route.query.type
      if (this.keyword.trim() !== "")
        this.$router.push({path: '/search', query: {type: c_type || -1, query: this.keyword}});
    }
  },
}
</script>
<style scoped lang="scss">
.jiu-dynamic-wrap {
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.list-wrap {
  display: flex;
  height: 100%;
  justify-content: space-between;
}

.list-item {
  display: flex;
  align-items: center;
}

.jiu-logo {
  height: 2.8rem;
}

.list-item:nth-child(2) {
  margin: 0 1.2rem;
}

.menu-list {
  height: 100%;
  display: flex;
  align-items: center;
}

.menu-list-item {
  margin: 0 1.2rem;
}

.menu-list-item:hover {
  color: #1a91ca;
  //background-color: rgb(245, 245, 245);
}

.menu-list-item-link, .login-text {
  font-size: 1.05rem;
  cursor: pointer;
}

.user-action-wrap {
  display: flex;
  height: 100%;
  align-items: center;
}

.msg-icon {
  cursor: pointer;
  position: relative;
  top: 2px;
  color: #8a8a8a;
}

.msg-icon:hover {
  color: #1a91ca;
}

.login-text:hover {
  text-decoration: underline;
  color: #1a91ca;
}

.dropdown-title {
  cursor: pointer;
  display: flex;
  align-items: center;
}


@media all and (max-width: 530px) {
  .list-item:nth-child(3) {
    display: none;
  }
}
</style>