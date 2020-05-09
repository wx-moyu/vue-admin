<template>
  <el-dialog
    title="新增"
    :visible.sync="dialog_add_flag"
    @close="close()"
    width="580px"
  >
    <el-form :model="updateFrom">
      <el-form-item label="类型:" :label-width="label_width">
        <el-select v-model="updateFrom.category" placeholder="请选择活动区域">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
          v-model="updateFrom.summary"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog_add_flag = false">取 消</el-button>
      <el-button type="danger" @click="dialog_add_flag = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch } from "@vue/composition-api";
export default {
  // 单项数据   父 = 》子 不能反向修改数据
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    /**********************************************************************************
     * 模块值
     * */
    //label-width
    const label_width = ref("70px");
    //dialog 显示/关闭状态
    const dialog_add_flag = ref(false);
    // 下拉列表选项
    const options = reactive([
      {
        value: 1,
        label: "国际信息"
      },
      {
        value: 2,
        label: "行业信息"
      },
      {
        value: 3,
        label: "国内信息"
      }
    ]);
    // 表单提交数据
    const updateFrom = reactive({
      category: "",
      title: "",
      summary: ""
    });
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
    return {
      // ref
      dialog_add_flag,
      label_width,
      //  reactive
      options,
      updateFrom,
      // function
      close
    };
  }
};
</script>

<style scoped></style>
