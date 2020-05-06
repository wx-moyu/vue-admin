<!--导航头-->
<template>
  <div id="header-warp">
    <div class="pull-left" @click="setIsCollapse()">
      <svg-icon class="header-icon" class-name="menu" icon-class="menu" />
    </div>
    <div class="pull-right">
      <div class="pull-left user-info">{{ userName }}</div>
      <div class="pull-right" @click="exit()">
        <svg-icon class="header-icon" class-name="exit" icon-class="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie, removeCookie } from "@/utils/app";

export default {
  setup(props, { root }) {
    /**
     * 模块值
     *
     * */
    const userName = getCookie("username");
    /*******************************************************************************************************************
     * 方法
     *
     * */
    // 菜单栏缩放
    const setIsCollapse = () => {
      root.$store.commit("app/SET_IsCollapse");
    };
    //  退出登录
    const exit = () => {
      removeCookie("username");
      removeCookie("token");
      root.$router.push("/login");
    };
    return {
      setIsCollapse,
      userName,
      exit
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/config";

#header-warp {
  position: fixed;
  top: 0;
  right: 0;
  height: 75px;
  left: $navMenu;
  line-height: 75px;
  background-color: white;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 1);
  @include webkit(transition, all 0.3s ease 0s);
}

.header-icon {
  padding: 0 32px;
  font-size: 32px;
  margin-bottom: -8px;
  cursor: pointer;
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
}
.open {
  #header-warp {
    left: $navMenu;
  }
}
.close {
  #header-warp {
    left: $navMenuClose;
  }
}
</style>
