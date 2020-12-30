<template>
  <section class="jiu-page--music">
    <jiu-react-box>
      <iframe class="iframe" frameborder="no" border="0" marginwidth="0" marginheight="0"
              src="//music.163.com/outchain/player?type=0&id=5117894676&auto=1&height=430"></iframe>
    </jiu-react-box>
  </section>
</template>
<script>
import JiuReactBox from "@/components/JiuReactBox"

export default {
  components: {JiuReactBox}
}
</script>
<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 90vh;
}

::v-deep .iframe .player{
  box-shadow: none;
}
.iframe #player .player {

}
</style>