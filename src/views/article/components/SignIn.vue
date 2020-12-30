<template>
  <div class="jiu-card">
    <div class="jiu-card-header">
      <span class="jiu-card-header--text">每日签到</span>
      <el-tooltip placement="bottom-end" effect="light">
        <span class="sign-rank">说明</span>
        <div slot="content">
          <el-table
              stripe
              :data="introData"
              style="width: 100%"
              :header-cell-style="{textAlign: 'center'}"
              :cell-style="{ textAlign: 'center' }">
            <el-table-column
                prop="days"
                label="签到天数"
                width="80">
            </el-table-column>
            <el-table-column
                prop="num"
                label="可获贡献值"
                width="80">
            </el-table-column>
          </el-table>
        </div>
      </el-tooltip>
    </div>
    <div class="container">
      <template v-if="info!==null">
        <el-button v-if="info.is_signed" size="medium" type="success" disabled>
          已连续签到 <span style="color: #e50945">{{ info.signed_days }}</span> 天
        </el-button>
        <el-button v-else size="medium" type="danger" @click="sign">
          点我签到
        </el-button>
      </template>
      <template v-else>
        <span class="tip">请先登录</span>
      </template>
    </div>
  </div>
</template>
<script>
import {sign} from "@/api/user"

export default {
  data() {
    return {
      introData: [{
        days: '<5',
        num: '2',
      }, {
        days: '≥5',
        num: '3',
      }, {
        days: '≥15',
        num: '4',
      }, {
        days: '≥30',
        num: '5',
      }]
    }
  },
  props: {
    info: Object,
  },
  methods: {
    sign() {
      sign().then(res => {
        const resp = res.data;
        let message = '您已连续签到 ' + resp.days + ' 天'
        if (resp.days > 31) message = '您已连续签到 ' + resp.days + '天了，久久社区感恩有你！'
        if (resp.days > 100) message = '您已连续签到 ' + resp.days + '天了，久久社区感谢你的一路陪伴！'
        this.$emit("update:data", Object.assign(this.info, {is_signed: 1, signed_days: resp.days}))
        this.$notify({
          title: '签到成功 积分+' + resp.add_integral,
          message,
          type: 'success',
          offset: 80,
          duration: 6000
        });
      })
    }
  }
}
</script>
<style scoped lang="scss">
.sign-rank {
  font-size: 0.96rem;
  color: #1a91ca;
  cursor: pointer;
  outline: none;
}

.sign-rank::before {
  content: "|";
  margin: 0 6px;
  color: #999;
  font-size: 14px;
}

.container {
  display: flex;
  justify-content: center;
  padding: 30px 0;
  box-sizing: border-box;
}

.tip {
  color: #999;
  cursor: pointer;
}
</style>