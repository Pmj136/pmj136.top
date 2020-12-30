<template>
  <section class="jiu-page--user_edit">
    <div class="jiu-navigation">
      <div class="jiu-nav jiu-dynamic-wrap">
        <div class="jiu-nav-item" :class="{'jiu-active':infoType===1}" @click="toggleType('profile')">个人资料</div>
        <div class="jiu-nav-item" :class="{'jiu-active':infoType===2}" @click="toggleType('account')">账号设置</div>
      </div>
    </div>
    <jiu-react-box>
      <div class="jiu-card">
        <div class="jiu-card-body">
          <h2>{{ infoType === 1 ? '个人资料' : '账号设置' }}</h2>
          <router-view/>
        </div>
      </div>
    </jiu-react-box>
  </section>
</template>
<script>
import JiuReactBox from "@/components/JiuReactBox"

export default {
  components: {
    JiuReactBox,
  },
  computed: {
    route() {
      return this.$route.path
    },
    infoType() {
      if (this.route === '/user/setting/profile') return 1
      return 2
    },
  },
  methods: {
    toggleType(type) {
      this.$router.replace('/user/setting/' + type)
    },
  }
}
</script>