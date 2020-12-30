<template>
  <ul class="jiu-list">
    <li class="setting-list-item">
      <span class="setting-list-item--title">邮箱</span>
      <div class="setting-list-item--content">
        <span class="value-wrap" :class="{'value-bold':!!info.email}">{{ info.email || '绑定邮箱' }}</span>
        <span class="action" v-if="!info.email" @click="bindEmailDialogVisible=true">绑定</span>
        <el-dialog
            v-if="!info.email"
            title="邮箱绑定"
            :visible.sync="bindEmailDialogVisible"
            @close="handleClose"
            @closed="handleClosed"
            width="340px"
            top="16vh"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
          <el-form :model="form" ref="form" :rules="emRules" size="medium" style="width: 100%">
            <el-form-item prop="email" :rules="[{ required: true, message: '昵称不能为空'},{max:12,message:'昵称不能超过12位'}]" :error="errEmail">
              <el-autocomplete
                  style="width: 100%"
                  ref="email"
                  v-model="form.email"
                  :fetch-suggestions="showLikeEmail"
                  placeholder="请输入邮箱"
                  :trigger-on-focus="false"
                  @select="selectEmail"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item prop="code">
              <el-input placeholder="请输入验证码" v-model="form.code">
                <template slot="append">
                  <el-button v-show="!is_posted" @click="postCode">获取验证码</el-button>
                  <div v-show="is_posted">{{ count }} s</div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
              <el-input placeholder="设置密码" v-model="form.password" show-password/>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" type="info" @click="bindEmail" :loading=isFetch>绑定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </li>
    <li class="setting-list-item">
      <span class="setting-list-item--title">GitHub</span>
      <div class="setting-list-item--content">
        <span class="value-wrap" :class="{'value-bold':!!info.github_nick}">{{ info.github_nick || '绑定GitHub' }}</span>
        <span class="action" @click="handleBind(!!info.github_nick,'github')">{{ !!info.github_nick ? '解绑' : '绑定' }}</span>
      </div>
    </li>
    <li class="setting-list-item">
      <span class="setting-list-item--title">Gitee</span>
      <div class="setting-list-item--content">
        <span class="value-wrap" :class="{'value-bold':!!info.gitee_nick}">{{ info.gitee_nick || '绑定Gitee' }}</span>
        <span class="action" @click="handleBind(!!info.gitee_nick,'gitee')">{{ !!info.gitee_nick ? '解绑' : '绑定' }}</span>
      </div>
    </li>
    <li class="setting-list-item">
      <span class="setting-list-item--title">钉钉</span>
      <div class="setting-list-item--content">
        <span class="value-wrap" :class="{'value-bold':!!info.dingtalk_nick}">{{ info.dingtalk_nick || '绑定钉钉' }}</span>
        <span class="action" @click="handleBind(!!info.dingtalk_nick,'dingtalk')">{{ !!info.dingtalk_nick ? '解绑' : '绑定' }}</span>
      </div>
    </li>
    <li class="setting-list-item" v-if="info.email">
      <span class="setting-list-item--title">密码</span>
      <div class="setting-list-item--content">
        <span class="value-bold">**********</span>
        <span class="action" @click="updatePwd">修改</span>
      </div>
    </li>
  </ul>
</template>
<script>
import {bindEmail, postCode, unbind, updatePwd, checkEmail} from "@/api/user";
import Msg from "@/utils/message";
import {oauthUrl, emailSuffix} from "@/utils/attribute";

export default {
  data() {
    const validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      if (value.length !== 4) callback(new Error('验证码有误'));
      callback();
    };
    return {
      bindEmailDialogVisible: false,
      form: {
        email: "",
        code: "",
        password: ""
      },
      errEmail: "",
      count: 59,
      timer: null,
      emRules: {
        code: [
          {validator: validateCode, trigger: 'change'}
        ],
      },
      is_posted: false,
      isFetch: false
    }
  },
  computed: {
    info() {
      return this.$store.state.user.info
    }
  },
  methods: {
    showLikeEmail(queryString, cb) {
      const arr = []
      for (const v of emailSuffix) {
        arr.push({value: queryString.replace(/(.*)@(.*)/, "$1") + v})
      }
      const results = queryString ? arr.filter(this.createFilter(queryString)) : arr;
      cb(results);
    },
    createFilter(queryString) {
      return item => {
        const prep = item.value.toLowerCase()
        const inputStr = queryString.toLowerCase()
        return prep.includes(inputStr) && (prep !== inputStr)
      }
    },
    selectEmail(obj) {
      this.form.email = obj.value
    },
    bindEmail() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isFetch = true
          const params = {
            email: this.form.email.trim(),
            password: this.form.password.trim() === "" ? null : md5(this.form.password),
            code: this.form.code.trim() === "" ? null : this.form.code,
          }
          bindEmail(params).then(res => {
            this.handleClose()
            this.info.email = this.form.email
            Msg.tip(res.msg)
          }).finally(() => {
            this.isFetch = false
          })
        }
      });
    },
    resetTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.is_posted = false
      this.count = 59
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.count === 1) {
          this.resetTimer()
          return
        }
        if (this.count < 60) this.count--;
      }, 1000)
    },
    postCode() {
      this.errEmail = ""
      this.$refs.form.validateField("email", err => {
        if (err) return
        /*验证邮箱是否为新用户*/
        checkEmail({email: this.form.email}).then(res => {
          if (res.data) {
            this.errEmail = "邮箱已被占用"
            return
          }
          this.is_posted = true
          this.startTimer()
          postCode({email: this.form.email}).then(resp => {
            if (resp.code === 200) Msg.tip(resp.msg)
            if (resp.code === 210) Msg.warn(resp.msg)
          }).catch(e => {
            this.resetTimer()
            Msg.error(e.msg)
          })
        }).catch(e => {
          this.resetTimer()
        })
      })
    },
    handleClose() {
      this.$refs.email.$children[0].blur()
      this.bindEmailDialogVisible = false
    },
    handleClosed() {
      this.$refs.form.resetFields()
    },
    handleBind(flag, key) {
      if (!flag) {
        const winObj = window.open(oauthUrl[key], "q", 'width=800,height=500');
        const loop = setInterval(() => {
          if (winObj.closed) {
            clearInterval(loop);
            location.reload();
          }
        }, 1);
      } else {
        const types = {
          'github': 1,
          'gitee': 2,
          'dingtalk': 3
        }
        unbind({type: types[key]}).then(res => {
          this.info[key + '_nick'] = null
          Msg.tip(res.msg)
        })
      }
    },
    updatePwd() {
      this.$prompt('', '输入新密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '不能为空'
      }).then(({value}) => {
        updatePwd({password: md5(value)}).then(res => {
            this.$router.replace("/")
            this.$store.dispatch("user/reset")
            Msg.tip(res.msg)
        })
      }).catch(() => {
      });
    }
  }
}
</script>
<style scoped lang="scss">
.value-wrap {
  flex: 1;
  color: #ccc;
}

.value-bold {
  color: #888;
}

.action {
  white-space: nowrap;
  cursor: pointer;
  color: #1a91ca;
}
</style>