<template>
  <ul class="jiu-list">
    <!---->
    <li class="setting-list-item">
      <span class="setting-list-item--title">头像</span>
      <div class="setting-list-item--content">
        <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :limit="1"
            :auto-upload="false"
            :on-change="avatarChange">
          <img :src="info.avatar_url" class="avatar"/>
          <div class="switch-avatar">上传头像</div>
        </el-upload>
        <div class="upload-wrap">
          <span class="upload-wrap--remark">支持 jpg、png、jpeg 格式大小 2M 以内的图片</span>
          <el-button type="info" size="mini" @click="showPopup('avatar_url')">
            添加头像链接
          </el-button>
        </div>
      </div>
    </li>
    <!---->
    <li class="setting-list-item">
      <span class="setting-list-item--title">昵称</span>
      <div class="setting-list-item--content">
        <span class="detail">{{ info.nick }}</span>
        <span class="action" style="margin-left: 0.8rem" @click="showPopup('nick')">
          {{ !!info.nick ? '修改' : '填写' }}
        </span>
      </div>
    </li>
    <li class="setting-list-item">
      <span class="setting-list-item--title">性别</span>
      <div class="setting-list-item--content">
        <el-radio-group v-model="info.gender" @change="updateInfo('gender',info.gender)">
          <el-radio :disabled="info.gender>0" :label="1">男</el-radio>
          <el-radio :disabled="info.gender>0" :label="2">女</el-radio>
        </el-radio-group>
        <span style="color:#aaa;user-select: none">设置性别后不可修改</span>
      </div>
    </li>
    <li class="setting-list-item">
      <span class="setting-list-item--title">所在地</span>
      <div class="setting-list-item--content">
        <span class="detail">{{ info.address || '设置地址' }}</span>
        <span class="action" style="margin-left: 0.8rem" @click="showPopup('address')">
          {{ !!info.address ? '修改' : '填写' }}
        </span>
      </div>
    </li>
    <li class="setting-list-item">
      <span class="setting-list-item--title">个人介绍</span>
      <div class="setting-list-item--content">
        <span class="detail">{{ info.intro || '说说自己的优点' }}</span>
        <span class="action" style="margin-left: 0.8rem" @click="showPopup('intro')">
          {{ !!info.intro ? '修改' : '填写' }}
        </span>
      </div>
    </li>
  </ul>
</template>
<script>
import {updateInfo, uploadAvatar} from "@/api/user";
import Msg from "@/utils/message";

export default {
  computed: {
    info() {
      return this.$store.state.user.info
    }
  },
  methods: {
    avatarChange(file) {
      const formdata = new FormData();
      formdata.append('img', file.raw);
      uploadAvatar(formdata).then(res => {
        Msg.tip(res.msg)
        this.$store.dispatch("user/auth")
      }).catch(e => {
      })
    },
    showPopup(key) {
      const kv = {
        'intro': {
          title: "输入个人介绍",
          config: {
            inputPlaceholder: "未输入代表清空个人介绍"
          }
        },
        'address': {
          title: "输入所在地",
          config: {
            inputPlaceholder: "未输入代表清空所在地"
          }
        },
        'nick': {
          title: "输入新昵称",
          config: {inputPattern: /\S/, inputErrorMessage: '昵称不能为空'}
        },
        'avatar_url': {
          title: "请输入头像地址",
          config: {inputPattern: /^https:\/\/(.*)\.(.*)/, inputErrorMessage: '必须为https私密链接图片'}
        }
      }
      const params = {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }
      Object.assign(params, kv[key].config)
      this.$prompt('', kv[key].title, params).then(({value}) => {
        if (value === this.info[key]) {
          Msg.warn("未作更改")
          return
        }
        this.updateInfo(key, value)
      }).catch(() => {
      });
    },
    updateInfo(key, value) {
      updateInfo({[key]: value || ""}).then(res => {
        this.info[key] = value
        Msg.tip(res.msg)
      }).catch(e => {
      })
    }
  }
}
</script>
<style scoped lang="scss">
$placeholder-color: #ccc;
.setting-list-item:first-child {
  padding: 0.8rem 0;
}

.avatar-uploader {
  position: relative;
}

.avatar-uploader:hover .switch-avatar {
  visibility: visible;
}

.switch-avatar {
  visibility: hidden;
  position: absolute;
  top: 0;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.8rem;
  background-color: rgba(250, 250, 250, .8);
}

.avatar {
  width: 72px;
  height: 72px;
  display: block;
}

.upload-wrap {
  flex: 1;
  margin-left: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2px 0;
  box-sizing: border-box;
}

.upload-wrap--remark {
  color: #666;
  font-size: 0.8rem;
}

.detail {
  flex: auto;
  color: #999;
}

.action {
  white-space: nowrap;
  cursor: pointer;
  color: #1a91ca;
}
</style>