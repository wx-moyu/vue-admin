<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="3">
        <div class="label-warp category">
          <label>类型:</label>
          <div class="warp-content">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions.item"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-warp date">
          <label>日期: &nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-date-picker
              style="width: 100%"
              v-model="date_time"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-warp key-word">
          <label>关键字: &nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-select
              v-model="key_value"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in key_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-warp">
          <div class="warp-content">
            <el-input placeholder="请输入内容" style="width: 100%"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="label-warp">
          <div class="warp-content">
            <el-button type="success" style="width: 100%">搜索</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="3"><label>&nbsp;&nbsp;&nbsp;</label></el-col>
      <el-col :span="2">
        <div class="label-warp">
          <div class="warp-content">
            <el-button
              type="success"
              @click="dialogFormVisible = true"
              class="pull-right"
              style="width: 100%"
              >添加
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="black-place-30"></div>
    <!--表格数据-->
    <el-table :data="tableData.item" border style="width: 100%">
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column prop="title" label="标题" width="840"> </el-table-column>
      <el-table-column prop="categoryId" label="类别" width="130">
      </el-table-column>
      <el-table-column prop="createDate" label="日期" width="137">
      </el-table-column>
      <el-table-column prop="content" label="管理人" width="115">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <!--            @click="handleDelete(scope.$index, scope.row)"-->
          <el-button
            size="mini"
            type="danger"
            @click="deleteClick(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="black-place-30"></div>
    <!--底部分页-->
    <el-row>
      <el-col :span="12">
        <el-button size="medium" class="pull-left">批量删除</el-button>
      </el-col>
      <el-col :span="12"></el-col>
      <el-pagination
        class="pull-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, prev, pager, next, jumper, sizes"
        :total="200"
      >
      </el-pagination>
    </el-row>
    <add-info
      :flag.sync="dialogFormVisible"
      @close="closeDialog"
      :categoryOptions="categoryOptions.item"
    />
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import addInfo from "./dialog/add";
import { common } from "@/utils/common";
import { getListApi } from "@/api/news";

export default {
  components: { addInfo },
  setup(props, { root }) {
    const { categoryInfo, getInfoCategory } = common();

    /***********************************************************************************************
     * 模块值
     *
     * */
    // 类型下拉选项
    const categoryOptions = reactive({ item: [] });
    // 关键字下拉选项
    const key_options = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
    // 类型下拉选项值
    const value = ref("");
    //关键字下拉选项值
    const key_value = ref("id");
    // 日期
    const date_time = ref("");
    // 表格数据
    const tableData = reactive({ item: [] });
    // dialog 显示/影藏
    const dialogFormVisible = ref(false);
    /*************************************************************************************************
     * 方法
     * */
    // 分页方法
    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
    };
    //分页方法
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
    };
    //
    const closeDialog = () => {
      dialogFormVisible.value = false;
    };
    // 删除按钮事件
    const deleteClick = (index, row) => {
      console.log(index);
      console.log(row);
      root.confirm({
        title: "确定要删除该条记录码？",
        fn: deleteItem,
        num: index
      });
    };
    // 删除单行记录
    const deleteItem = i => {

      tableData.splice(i, 1);
    };
    // 删除多行记录
    const batchDel = () => {
      root.$refs.multipleTable.toggleRowSelection(0);
      root.$refs.multipleTable.toggleRowSelection(1);
    };
    //  表单checkout 选中事件
    const selectCheckout = () => {};
    // 获取信息列表
    const getInfoList = () => {
      getListApi({ pageNumber: 1, pageSize: 10 })
        .then(res => {
          const data = res.data;
          if (data.resCode === 0) {
            tableData.item = data.data.data;
          }
        })
        .catch();
    };
    /**
     * 生命周期
     * */
    onMounted(() => {
      getInfoCategory();
      getInfoList();
    });
    watch(
      () => categoryInfo.item,
      value => {
        categoryOptions.item = value;
      }
    );
    return {
      categoryOptions,
      value,
      date_time,
      key_options,
      key_value,
      tableData,
      dialogFormVisible,
      handleCurrentChange, //分页
      handleSizeChange, //分页
      closeDialog, //子组件回调父组件方法
      deleteClick, // 删除按钮确认弹框
      batchDel, // 批量删除
      selectCheckout
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/config";

.label-warp {
  &.category {
    @include labelDom(left, 60, 40);
  }

  &.date {
    @include labelDom(right, 93, 40);
  }

  &.key-word {
    @include labelDom(right, 99, 40);
  }
}
</style>
