<template>
  <section class="jiu-page--article">
    <jiu-react-box>
      <detail-content @loaded="isLoad=true" @comment="$refs.commentWrap.focus()"/>
      <detail-remark :visible="isLoad" ref="commentWrap"/>
      <template #extra>
        <recommend/>
      </template>
    </jiu-react-box>
  </section>
</template>
<script>
import JiuReactBox from "@/components/JiuReactBox";
import DetailRemark from "./components/DetailRemark";
import DetailContent from "./components/DetailContent";
import Recommend from "./components/Recommend"

export default {
  components: {
    JiuReactBox,
    DetailRemark,
    DetailContent,
    Recommend
  },
  data() {
    return {
      isLoad: false
    }
  },
  watch: {
    isLoad(v) {
      if (v) {
        const id = location.hash.slice(1)
        if (id) {
          const timer = setTimeout(() => {
            let dom = document.getElementById(id)
            if (dom) {
              dom.scrollIntoView({
                behavior: "smooth",
                block: "end"
              });
              dom = null
            }
            clearTimeout(timer)
          }, 0)
        }
      }
    }
  },
};
</script>