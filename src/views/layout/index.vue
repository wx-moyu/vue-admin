<template>
  <div id="layout" :class="!navMenuStatus ? 'open' : 'close'">
    <LayoutHeader></LayoutHeader>
    <LayoutNav></LayoutNav>
    <LayoutMain></LayoutMain>
  </div>
</template>
<script>
import LayoutHeader from "./components/header";
import LayoutNav from "./components/nav";
import LayoutMain from "./components/main";
import { computed } from "@vue/composition-api";
export default {
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup(props, { root }) {
    const navMenuStatus = computed(() => root.$store.state.app.isCollapse);
    return {
      navMenuStatus
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/config";
#layout {
}
</style>
