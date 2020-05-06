<!--内容区-->
<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content"><router-view /></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../../style/config";
#main-wrap {
  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding: $layoutHeader + 30 30px 0 $navMenu + 30;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-left: 30px;
  padding-bottom: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: white;
  .open {
    .main-content {
      padding: $layoutHeader + 30 30px 0 $navMenu + 30;
    }
  }
}
.close {
  .main-content {
    padding: $layoutHeader + 30 30px 0 $navMenuClose + 30;
  }
}
</style>
