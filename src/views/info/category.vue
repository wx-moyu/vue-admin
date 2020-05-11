<template>
  <div id="category">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <hr style="margin-left: -30px;margin-right: -30px" />
    <el-row>
      <el-col :span="10">
        <div class="category-wrap">
          <div
            class="category"
            v-for="(item, index) in category.item"
            :key="item.id"
          >
            <h4>
              <svg-icon icon-class="plus"></svg-icon>
              {{ item.category_name }}
              <div class="pull-right button-wrap">
                <el-button type="warning" size="mini" round>编辑</el-button>
                <el-button type="success" size="mini" round>添加子级</el-button>
                <el-button
                  size="mini"
                  round
                  @click="deleteFirst(item.id, index)"
                  >删除</el-button
                >
              </div>
            </h4>
            <ul type="none">
              <li v-for="list in item.children" :key="list.id">
                {{ list.category_name }}
                <div class="pull-right button-wrap">
                  <el-button type="warning" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <h4 class="menu-title">一级分类编辑</h4>
        <el-form
          label-width="142px"
          :model="menuTitle"
          style="width: 480px"
          ref="categoryForm"
        >
          <el-form-item label="一级菜单名称:" v-if="category_first_input">
            <el-input v-model="menuTitle.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="二级菜单名称:" v-if="category_children_input">
            <el-input v-model="menuTitle.secCategoryName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submit" :loading="submit_loading"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import { addFirstCategory, getCategoryAll, deleteCategory } from "@/api/news";
export default {
  setup(props, { root }) {
    /**
     *模块值
     * */
    // 表单数据项显示状态
    const category_first_input = ref(true); //一级标题
    const category_children_input = ref(true); //子标题
    //按钮事件加载效果
    const submit_loading = ref(false);
    // 表单数据
    const menuTitle = reactive({
      categoryName: "",
      secCategoryName: ""
    });
    let category = reactive({
      item: []
    });
    /**
     * 获取菜单信息 onMounted生命周期  页面挂载完成后执行
     * */
    onMounted(() => {
      getCategoryAllValue();
    });
    /*******************************************
     * function
     * */
    // 添加一级菜单 按钮事件
    const addFirst = () => {
      category_first_input.value = true;
      category_children_input.value = false;
    };
    // 表单提交事件
    const submit = () => {
      if (menuTitle.categoryName === "") {
        root.$message.error("请输入菜单名称");
        return;
      }
      submit_loading.value = true;
      addFirstCategory({ categoryName: menuTitle.categoryName })
        .then(res => {
          const data = res.data;
          if (data.resCode === 0) {
            category.item.push(data.data);
            root.$message.success(data.message);
          }
          menuTitle.categoryName = "";
          submit_loading.value = false;
        })
        .catch(res => {
          const data = res.data;
          root.$message.error(data.message);
          menuTitle.categoryName = "";
          submit_loading.value = false;
        });
    };
    // 获取分类信息
    const getCategoryAllValue = () => {
      getCategoryAll()
        .then(res => {
          let data = res.data;
          if (data.resCode === 0) {
            category.item = data.data;
          }
        })
        .catch(res => {
          let data = res.data;
          root.$message.error(data.message);
        });
    };
    // 删除菜单
    const deleteFirst = (id, sn) => {
      deleteCategory({ categoryId: id })
        .then(res => {
          let data = res.data;
          if (data.resCode === 0) {
            root.$message.success(data.message);
            category.item.splice(sn, 1);
          }
        })
        .catch(res => {
          console.log(res);
        });
    };
    return {
      //ref
      category_children_input,
      category_first_input,
      submit_loading,
      // reactive
      menuTitle,
      category,
      // function
      submit, // 表单提交
      addFirst, // 添加一级菜单按钮
      deleteFirst
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

  li,
  h4 {
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
