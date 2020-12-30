<template>
  <div class="user-container">
    <div class="user-info">
      <el-avatar
          class="avatar"
          :size="50"
          :src="item.avatar_url"/>
      <div>
        <a class="nick" :href="'/user/'+item.id" target="_blank">{{ item.nick }}</a>
        <span class="user-rank">Lv.{{ item.integral|getRank(item.create_at) }}</span>
      </div>
    </div>
    <template v-if="item.id!==$store.state.user.info.id">
      <button :class="['jiu-button','jiu-button--'+noticeState.type]" @click="handleNoticeAction">{{ noticeState.text }}</button>
    </template>
  </div>
</template>
<script>
import {addNotice, cancelNotice} from '@/api/user'

export default {
  props: {
    item: Array
  },
  computed: {
    noticeState() {
      if (this.item.is_notice && this.item.is_fans)
        return {
          type: 'remind',
          text: '已互关',
        }
      else {
        if (this.item.is_notice)
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
  methods: {
    handleNoticeAction() {
      const params = {
        notice_id: +this.$store.state.user.info.id,
        target_id: this.item.id,
      }
      if (this.item.is_notice) {
        cancelNotice(params).then(() => {
          this.item.is_notice = 0
        })
      } else {
        addNotice(params).then(() => {
          this.item.is_notice = 1
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.user-container, .user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.user-container {
  justify-content: space-between;
  padding: 15px 20px;
  box-sizing: border-box;
}

.nick {
  margin-left: 1rem;
  text-decoration: none;
  color: #48adad;
}

.nick:hover {
  text-decoration: underline;
}

.user-rank {
  margin-left: 10px;
}
</style>