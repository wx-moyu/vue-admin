<!--导航页-->
<template>
  <div id="nav-warp">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="getCollapse"
      text-color="#fff"
      background-color="transparent"
      active-text-color="#fff"
      router
    >
      <template v-for="item in routerAll">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="item.path">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <el-menu-item-group>
            <template v-for="cList in item.children">
              <el-menu-item
                v-if="!cList.hidden"
                :index="cList.path"
                :key="cList.id"
                >{{ cList.meta.name }}
              </el-menu-item>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, computed } from "@vue/composition-api";

export default {
  setup(props, { root }) {
    /**
     * 模块值
     * */
    //获取路由
    const routerAll = reactive(root.$router.options.routes);
    /*************************************************************************************
     * 方法
     * */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const getCollapse = computed(() => {
      return root.$store.state.app.isCollapse;
    });
    return {
      handleClose,
      handleOpen,
      routerAll,
      getCollapse
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../style/config";

#nav-warp {
  position: fixed;
  width: $navMenu;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
}
.el-menu {
  border: none;
}
svg {
  font-size: 20px;
  margin-right: 10px;
}
.open {
  #nav-warp {
    width: $navMenu;
  }
}
.close {
  #nav-warp {
    width: $navMenuClose;
  }
}
</style>
