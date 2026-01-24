<template>
  <div class="page">
    <h2 class="page-title">订单管理</h2>
    <el-form class="search-box3" :model="searchForm" ref="searchFormRef">
      <el-form-item label="关键词:" prop="keyword" style="width: 300px">
        <el-input v-model="searchForm.keyword" />
      </el-form-item>
      <el-form-item label="应用状态:" prop="appStatus">
        <el-select
          v-model="searchForm.appStatus"
          placeholder="全部"
          style="width: 200px"
        >
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建日期:" prop="date">
        <el-date-picker
          v-model="searchForm.date"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :clearable="false"
        />
      </el-form-item>
      <div class="search-btns3">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onResetForm">重置</el-button>
      </div>
    </el-form>

    <div class="action-box3">
      <el-button type="primary" @click="onCreate">新 建</el-button>
    </div>
    <div class="list-table3">
      <el-table :data="tableData" stripe border>
        <el-table-column fixed prop="appCode" label="应用Code" width="120" />
        <el-table-column prop="appName" label="应用名称" min-width="150" />
        <el-table-column prop="creatorName" label="创建人" width="150" />
        <el-table-column prop="createTime" label="创建时间" min-width="200" />
        <el-table-column prop="modifyTime" label="更新时间" min-width="200" />
        <el-table-column prop="modifierName" label="更新人" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" @click="onEdit(scope.row)"
              >编辑</el-button
            >
            <el-button link type="danger" @click="onDelAlert(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="list-pagination3">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 40]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>

    <AddApp
      v-model:show="showDialog"
      :data="tableRow"
      @close="showDialog = false"
      @update="onUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";

const searchFormRef = ref();
const searchForm = reactive({
  keyword: "",
  appStatus: "",
  date: [],
});

const tableData = ref([]);
const tableRow = ref({}); // 表格行数据
const showDialog = ref(false); // 弹窗
const currentPage = ref(1); // 当前页
const pageSize = ref(20); // 分页
const total = ref(100); // 总页数

const options = [
  { key: "0", label: "全部", value: "" },
  { key: "1", label: "停用", value: 0 },
  { key: "2", label: "启用", value: 1 },
];

onMounted(() => {
  loadData();
});

// 改变分页数
function onSizeChange(val: number) {
  pageSize.value = val;
  currentPage.value = 1;
  loadData();
}
// 跳到指定页
function onCurrentChange(val: number) {
  currentPage.value = val;
  loadData();
}

// 重置表单
function onResetForm() {
  const formEl = searchFormRef.value;
  if (formEl) {
    formEl.resetFields();

    onSearch(); // 重置后重新加载数据
  }
}
// 搜索
function onSearch() {
  currentPage.value = 1;
  loadData();
}

function onCreate() {
  tableRow.value = {}; // 清空编辑行
  showDialog.value = true; // 显示弹窗
}

function onEdit(row: any) {
  // console.log('edit', row)
  tableRow.value = row;
  showDialog.value = true;
}

// 删除弹窗
function onDelAlert(row: any) {
  ElMessageBox.confirm("删除之后不可恢复！", "确认删除", {
    confirmButtonClass: "custom-confirm-button",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error",
  })
    .then(() => {
      onDelete(row.id);
    })
    .catch(() => {
      console.log("取消");
    });
}

// 停用
// function onStopUse() {
//   console.log('停用', tableRow.value)
// }

// 删除
async function onDelete(id: number) {
  ElMessage.success("删除成功");
  loadData(); // 重新加载数据
}

// 获取数据
async function loadData() {
  const params: any = {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    createTimeStart: searchForm.date[0],
    createTimeEnd: searchForm.date[1],
    ...searchForm,
  };
  delete params.date;
}

// 更新数据
async function onUpdate(res: any) {
  // console.log('更新数据', res)
  if (!res) {
    ElMessage.error("更新数据失败");
    return;
  }
}
</script>

<style scoped>
.category {
  background-color: white;
}
.page-title {
  color: #333;
}
</style>
