<template>
  <div class="jiu-layout">
    <header class="jiu-header">
      <jiu-header/>
    </header>
    <main>
      <router-view/>
    </main>
    <footer class="jiu-footer">
      <p>Copyright (2019-2021) PengMingJiu All rights reserved.</p>
      <span>赣ICP备号20004413号-1</span>
    </footer>
    <jiu-sign/>
  </div>
</template>
<script>
import JiuHeader from "./JiuHeader";

export default {
  components: {
    JiuHeader,
    JiuSign: () => import("./JiuSign")
  },
};
</script>
<style lang="scss">
.jiu-header {
  position: sticky;
  top: 0;
  height: $app-header-height;
  background-color: #fff;
  display: flex;
  justify-content: center;
  user-select: none;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  z-index: 1500;
}

.jiu-footer {
  height: 90px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid #e2e2e2;
  box-sizing: border-box;
  color: #737573;
  font-size: 13px;
  user-select: none;
}
</style>
