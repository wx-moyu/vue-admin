<template>
  <el-dialog
    title="新增"
    :visible.sync="dialog_add_flag"
    @close="close()"
    width="580px"
    @open="openDialog"
  >
    <el-form :model="updateFrom" ref="updateFrom">
      <el-form-item label="类型:" :label-width="label_width">
        <el-select v-model="updateFrom.category" placeholder="请选择活动区域">
          <el-option
            v-for="item in categoryInfo.item"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="label_width">
        <el-input v-model="updateFrom.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="概括：" :label-width="label_width">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="updateFrom.content"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog_add_flag = false">取 消</el-button>
      <el-button type="danger" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch } from "@vue/composition-api";
import { addApi } from "@/api/news";

export default {
  // 单项数据   父 = 》子 不能反向修改数据
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    categoryOptions: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit, root }) {
    /**********************************************************************************
     * 模块值
     * */
    //label-width
    const label_width = ref("70px");
    //dialog 显示/关闭状态
    const dialog_add_flag = ref(false);
    // 表单提交数据
    const updateFrom = reactive({
      category: "",
      title: "",
      content: ""
    });
    // 下拉列表选项
    const categoryInfo = reactive({ item: [] });
    /*****************************************************************
     * 方法
     * */
    //dialog 关闭回调
    const close = () => {
      emit("update:flag", false);
      dialog_add_flag.value = false;
    };
    //watch
    watch(() => {
      dialog_add_flag.value = props.flag;
    });
    const openDialog = () => {
      categoryInfo.item = props.categoryOptions;
    };
    //确定按钮事件
    const submit = () => {
      if (!updateFrom.category) {
        root.$message.error("请选择类型");
        return;
      }
      if (!updateFrom.title) {
        root.$message.error("请输入标题");
        return;
      }
      if (!updateFrom.content) {
        root.$message.error("请输入内容");
        return;
      }
      addApi(updateFrom)
        .then(res => {
          let data = res.data;
          if (data.resCode === 0) {
            root.$message.error(data.message);
            dialog_add_flag.value = false;
            root.$refs["updateFrom"].resetFields();
          }
        })
        .catch(res => {
          console.log(res);
          // let data = res.data;
          // root.$message.error(data.message);
        });
    };
    return {
      // ref
      dialog_add_flag,
      label_width,
      //  reactive
      updateFrom,
      categoryInfo,
      // function
      close,
      openDialog,
      submit
    };
  }
};
</script>

<style scoped></style>
