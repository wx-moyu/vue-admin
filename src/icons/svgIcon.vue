<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  // props:["iconClass","className"],
  props: {
    // iconClass: {
    //   type: String, // 数据类型
    //   default: "user", // 默认值
    //   request: true, // 必填
    //   validator: value => {
    //     // 校验规则
    //     return value;
    //   }
    // },
    iconClass: {
      type: String, // 数据类型
      default: "" // 默认值
    },
    className: {
      type: String, // 数据类型
      default: "" // 默认值
    }
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return "svg-icon";
      }
    });
    return {
      iconName,
      svgClass
    };
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
