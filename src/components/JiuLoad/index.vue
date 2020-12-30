<template>
  <div class="jiu-load">
    <!--load-more-->
    <template v-if="auto">
      <div class="load-container" v-show="loadCompleted">
        <span class="no-more">没有更多了</span>
      </div>
    </template>
    <template v-else>
      <div class="load-container" v-show="!isFetch && hasData">
        <span :class="[loadCompleted?'no-more':'load-more']" @click="handleClick">
          {{ loadCompleted ? "没有更多了" : loadText }}
        </span>
      </div>
    </template>

    <!--loading-->
    <div v-show="isFetch" class="loading-card" :style="{'height':wrapHeight+'px'}">
      <div class="load-line" v-for="item in lines" :key="item"></div>
    </div>
    <!--data-empty-->
    <div v-show="!isFetch && !hasData" class="data-empty" :style="{'height':wrapHeight+'px'}">
      {{ noDataText }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    auto: {
      type: Boolean,
      default: false
    },
    isFetch: {
      type: Boolean,
      default: false
    },
    hasData: {
      type: Boolean,
      default: false
    },
    loadCompleted: {
      type: Boolean,
      default: false
    },
    lines: {
      type: Number,
      default: 5
    },
    wrapHeight: {
      type: String,
      default: '200'
    },
    loadText: {
      type: String,
      default: "阅读更多"
    },
    noDataText: {
      type: String,
      default: "暂无数据"
    }
  },
  methods: {
    handleClick() {
      if (this.loadCompleted) return
      this.$emit('load-more')
    }
  }
}
</script>
<style scoped lang="scss">
.jiu-load {
  height: 100%;
}

.load-container {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.load-more {
  align-items: center;
  user-select: none;
  color: #1782b3;
  cursor: pointer;
}

.no-more {
  color: #c3c6cc;
  cursor: not-allowed;
}


/*loading*/
.loading-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  padding: 10px 20px;
  box-sizing: border-box;
}

.load-line {
  height: 14px;
  background: linear-gradient(90deg, #fff, #edeff1, #fff);
  background-size: 480px 480px;
  animation: blinds .6s linear infinite;
}

.load-line:first-child {
  width: 40%;
}

.load-line:nth-child(2) {
  width: 100%;
}

.load-line:nth-child(3) {
  width: 80%;
}

.load-line:last-child {
  width: 60%;
}

@keyframes blinds {
  to {
    background-position: 480px 0;
  }
}

/*empty*/
.data-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #919399;
}

/**/
</style>