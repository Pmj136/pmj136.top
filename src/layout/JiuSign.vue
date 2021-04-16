<template>
    <el-dialog :title="dialogTitle"
               :visible.sync="visible"
               @close="handleClose"
               @closed="handleClosed"
               width="340px"
               top="16vh"
               :modal-append-to-body="false"
               :close-on-click-modal="false">
        <el-form v-if="loginType==='zm'" ref="zm" :model="form" size="medium" style="width: 100%">
            <el-form-item
                prop="email"
                key="1"
                :rules="[
          { required: true, message: '邮箱不能为空',trigger: 'change'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'change'}
          ]">
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
            <el-form-item
                key="2"
                prop="password"
                :rules="[{ required: true, message: '密码不能为空',trigger: 'change'}]">
                <el-input placeholder="请输入密码" v-model="form.password" show-password/>
            </el-form-item>
            <el-form-item key="3">
                <el-button style="width: 100%" type="info" @click="login('zm')" :loading=isLoginIng>{{
                        loginBtnText
                    }}
                </el-button>
                <div class="extra-action">
                    <span @click="loginType='em'" class="normal-link">免密登录</span>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="other-auth">
                    <span style="font-size: 1rem">社交账号快速登录</span>
                    <svg-icon class="svg" icon="qq" @click="oauthLogin('qq')"/>
                    <svg-icon class="svg" icon="github" @click="oauthLogin('github')"/>
                    <svg-icon class="svg" icon="gitee" @click="oauthLogin('gitee')"/>
                    <svg-icon class="svg" icon="dingtalk" @click="oauthLogin('dingtalk')"/>
                </div>
            </el-form-item>
        </el-form>

        <el-form v-if="loginType==='em'" ref="em" :model="form" size="medium" style="width: 100%">
            <el-form-item
                key="4"
                prop="email"
                :rules="[{ required: true, message: '邮箱不能为空',trigger: 'change'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'change'}
          ]">
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
            <el-form-item
                key="5"
                prop="code"
                :rules="[{ required: true, message: '验证码不能为空'},{min:4,max:4,message:'验证码有误'}]">
                <el-input placeholder="请输入验证码" v-model="form.code">
                    <template slot="append">
                        <el-button v-show="!is_posted" @click="postCode">获取验证码</el-button>
                        <div v-show="is_posted">{{ count }} s</div>
                    </template>
                </el-input>
            </el-form-item>
            <template v-if="isNewUser">
                <el-form-item
                    key="6"
                    prop="nick"
                    :rules="[{ required: true, message: '昵称不能为空'},{max:12,message:'昵称不能超过12位'}]">
                    <el-input placeholder="设置昵称" v-model="form.nick"/>
                </el-form-item>
                <el-form-item
                    key="7"
                    prop="password"
                    :rules="[{ required: true, message: '密码不能为空'}]">
                    <el-input placeholder="设置密码" v-model="form.password" show-password/>
                </el-form-item>
            </template>
            <el-form-item key="9">
                <el-button style="width: 100%" :type="isNewUser?'success':'info'" @click="login('em')"
                           :loading=isLoginIng>{{ loginBtnText }}
                </el-button>
                <div class="extra-action">
                    <span @click="loginType='zm'" class="normal-link">账密登录</span>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="other-auth">
                    <span style="font-size: 1rem">社交账号快速登录</span>
                    <svg-icon class="svg" icon="qq" @click="oauthLogin('qq')"/>
                    <svg-icon class="svg" icon="github" @click="oauthLogin('github')"/>
                    <svg-icon class="svg" icon="gitee" @click="oauthLogin('gitee')"/>
                    <svg-icon class="svg" icon="dingtalk" @click="oauthLogin('dingtalk')"/>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import Msg from "@/utils/message";
import {postCode, checkEmail} from "@/api/user"
import {oauthUrl, emailSuffix} from "@/utils/attribute"

export default {
    data() {

        return {
            isNewUser: false,
            isLoginIng: false,
            loginType: "zm",//em
            is_posted: false,
            count: 59,
            timer: null,
            form: {
                email: "",
                password: "",
                code: "",
                nick: "",
            },
        }
    },
    computed: {
        visible() {
            return this.$store.state.common.signVisible
        },
        dialogTitle() {
            return this.loginType === 'zm' ? '账密登录' : '免密登录'
        },
        loginBtnText() {
            return this.isLoginIng ? "登录中" : (this.loginType === 'em' ? (this.isNewUser ? "注册登录" : '立即登录') : "立即登录")
        }
    },
    watch: {
        loginType(v) {
            this.$refs[v === 'em' ? 'zm' : 'em'].resetFields()
            this.$nextTick(() => {
                this.$refs.email.focus()
            })
        },
        visible(v) {
            if (v)
                this.$nextTick(() => {
                    this.$refs.email.focus()
                })
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
        handleClose() {
            this.$refs.email.$children[0].blur()
            this.$store.dispatch("common/setSignVisible", false)
        },
        handleClosed() {
            this.$refs[this.loginType === 'em' ? 'em' : 'zm'].resetFields()
            this.isNewUser = false
        },
        postCode() {
            this.$refs.em.validateField("email", err => {
                if (err) return
                this.is_posted = true
                this.startTimer()
                /*验证邮箱是否为新用户*/
                checkEmail({email: this.form.email}).then(res => {
                    this.isNewUser = !res.data
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
        login(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.isLoginIng = true
                    const params = {
                        email: this.form.email.trim(),
                        password: this.form.password.trim() === "" ? null : md5(this.form.password),
                        code: this.form.code.trim() === "" ? null : this.form.code,
                        nick: this.form.nick.trim() === "" ? null : this.form.nick
                    }
                    this.$store.dispatch("user/login", params).then(() => {
                        this.handleClose()
                        this.$root.$children[0].reload()
                    }).catch(e => {
                    }).finally(() => {
                        this.isLoginIng = false
                    })
                }
            });
        },
        oauthLogin(type) {
            const winObj = window.open(oauthUrl[type], "q", 'width=800,height=500');
            const loop = setInterval(() => {
                if (winObj.closed) {
                    clearInterval(loop);
                    location.reload();
                }
            }, 1);
        },
    },
};
</script>
<style scoped lang="scss">
.el-form-item:last-child {
    margin-bottom: 0;
}

.normal-link {
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    color: #1b688d;
}


.normal-link:hover {
    text-decoration: underline;
}

.extra-action {
    margin-top: 4px;
}

.other-auth {
    display: flex;
    align-items: center;
}

.svg {
    margin-left: 12px;
    font-size: 1.4rem;
    cursor: pointer;
}

.svg:hover {
    transform: scale(1.1);
}

::v-deep .el-dialog__body {
    padding: 20px;
}

@media all and (max-width: 360px) {
    ::v-deep .el-dialog {
        width: 84% !important;
    }
}
</style>
