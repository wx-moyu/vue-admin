<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr style="margin-left: -30px;margin-right: -30px"/>
    <el-row>
      <el-col :span="10">
        <div class="category-wrap">
          <div class="category">
            <h4>
              <svg-icon icon-class="plus"></svg-icon>
              新闻
              <div class="pull-right button-wrap">
                <el-button type="warning" size="mini" round>编辑</el-button>
                <el-button type="success" size="mini" round>添加子级</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul type="none">
              <li>111
                <div class="pull-right button-wrap">
                  <el-button type="warning" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div></li>
            </ul>
          </div>

        </div>
      </el-col>
      <el-col :span="14">
        <h4 class="menu-title">一级分类编辑</h4>
        <el-form  label-width="142px" :model="menuTitle"  style="width: 480px">
          <el-form-item label="一级菜单名称:">
            <el-input v-model="menuTitle.name"></el-input>
          </el-form-item>
          <el-form-item label="二级菜单名称:">
            <el-input v-model="menuTitle.region"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success">确定</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import {reactive} from "@vue/composition-api"
  export default {
  setup() {
    const menuTitle = reactive({
           name: '',
          region: '',
          type: ''
    });
    return {
      //ref
      // reactive
      menuTitle
    };
  }
};
</script>

<style lang="scss" scoped>
  .menu-title {
    line-height: 44px;
    background-color: #f3f3f3;
    padding-left: 19px;
  }
.category-wrap {
  cursor: pointer; // 手势
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 22px;
    }
  }
}

.category {
  position: relative; //  相对定位
  line-height: 44px;
  &:before {
    //伪元素
    content: "";
    top: 0;
    position: absolute; // 绝对定位
    left: 22px;
    bottom: 0;
    width: 0;
    border-left: 1px dotted #000;
  }

  h4 {
    margin: auto;
    position: relative;
    padding-left: 40px;

  }

  svg {
    position: absolute;
    top: 16px;
    left: 15px;
    font-size: 17px;
  }
  ul {
    padding: 0;
    margin-bottom: 0;
  }
  li {
    padding-left: 37px;
    margin-left: 23px;
    position: relative;
    &:before {
      //伪元素
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 44px;
      border-bottom: 1px dotted #000;
    }
  }
  .button-wrap {
    display: none;
  }
  li, h4 {
    @include webkit(transition, all 0.5s ease 0);
    &:hover {
      background-color: #f3f3f3;
      .button-wrap {
        display: block;
      }
    }
  }
}
</style>
