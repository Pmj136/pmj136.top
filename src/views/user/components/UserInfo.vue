<template>
  <div class="jiu-card">
    <div class="container">
      <el-avatar class="avatar" :size="100" :src="item.avatar_url"/>
      <div class="user-info">
        <span class="nick">
          {{ item.nick || '我是昵称' }}
        </span>
        <span class="user-rank">Lv.{{ item.integral|getRank(item.create_at) }}</span>
        <svg-icon v-if="item.gender>0" style="font-size: 1rem;margin-left: 6px" :icon="'gender'+item.gender"/>
      </div>
      <ul class="user-main jiu-list">
        <li class="user-main-item">
          <svg-icon style="font-size: 1rem;margin-right: 2px" icon="time"/>
          {{ item.create_at || '0000-00-00' }} 加入
        </li>
        <li class="user-main-item">
          <svg-icon style="font-size: 1rem;margin-right: 2px" icon="location"/>
          {{ item.address || '似乎来自外星……' }}
        </li>
      </ul>
      <div class="user-intro">
        {{ item.intro || '这个人很懒啥也没有！' }}
      </div>
      <div class="edit">
        <el-button v-if="isMine" icon="el-icon-edit" plain
                   @click="$router.push('/user/setting/profile')">编辑
        </el-button>
        <el-button v-else :icon="noticeState.icon" @click="handleNoticeAction">
          {{ noticeState.text }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {addNotice, cancelNotice} from '@/api/user'

export default {
  props: {
    item: Object
  },
  computed: {
    isMine() {
      if (this.item === null) return false
      return this.item.id === this.$store.state.user.info.id
    },
    noticeState() {
      if (this.item.is_notice && this.item.is_fans)
        return {
          icon: 'el-icon-refresh',
          text: '互相关注',
        }
      else {
        if (this.item.is_notice)
          return {
            icon: 'el-icon-check',
            text: '已关注',
          }
        return {
          icon: 'el-icon-plus',
          text: '关注',
        }
      }
    }
  },
  methods: {
    handleNoticeAction() {
      const params = {
        target_id: this.item.id,
      }
      if (this.item.is_notice) {
        cancelNotice(params).then(() => {
          this.item.is_notice = 0
        }).catch(()=>{})
      } else {
        addNotice(params).then(() => {
          this.item.is_notice = 1
        }).catch(()=>{})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.jiu-card {
  padding: 30px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.user-info {
  margin-top: 14px;
  display: flex;
  align-items: center;
}

.nick {
  letter-spacing: 2px;
  color: #1a91ca;
  white-space: nowrap;
}

.avatar {
  animation: st ease 0.3s;
}

.user-main {
  display: flex;
  margin-top: 14px;
}

.user-main-item {
  display: flex;
  align-items: center;
  margin: 0 10px;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  color: #999;
  white-space: nowrap;
}

.user-intro {
  letter-spacing: 1px;
  font-size: 0.9rem;
  color: #999;
  margin-top: 8px;
  display: table-cell;
  text-align: center;
  line-height: 1.2rem;
  width: 100%;
}


.edit {
  position: absolute;
  top: 0;
  right: 0;
}

@keyframes st {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>