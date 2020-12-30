<template>
  <div class="jiu-react-box">
    <template v-if="full">
      <div class="jiu-react-box--full">
        <slot/>
      </div>
    </template>
    <template v-else>
      <div class="jiu-react-box--grid">
        <div class="box-main">
          <slot/>
        </div>
        <!--right-->
        <div class="box-extra">
          <slot name="extra"/>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    full: {
      type: Boolean,
      default: false
    },
  },
}
</script>
<style scoped lang="scss">
.jiu-react-box {
  display: flex;
  justify-content: center;
}

.jiu-react-box--full, .jiu-react-box--grid {
  width: $wrap-base-width;
}

.jiu-react-box--grid {
  display: flex;
  justify-content: space-between;
}

.box-main {
  width: calc(73% - 15px);
}

.box-extra {
  width: 27%;
}

@media all and (max-width: $wrap-width-1-trigger) {
  .jiu-react-box--full, .jiu-react-box--grid {
    width: $wrap-width-1;
  }
  .jiu-react-box--grid {
    flex-direction: column;
  }
  .box-main {
    width: 100%;
  }
  .box-extra {
    display: none;
  }
}

@media all and (max-width: $wrap-width-2-trigger) {
  .jiu-react-box--full, .jiu-react-box--grid {
    width: $wrap-width-2;
  }
}

</style>