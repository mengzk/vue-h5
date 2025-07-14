<template>
  <div class="container category">
    <h2 class="page-title">薪资列表</h2>
    <el-form class="search-wrap" :model="searchForm">
      <el-form-item class="search-item" label="日期:" prop="date">
        <el-date-picker v-model="searchForm.date" type="daterange" value-format="YYYY-MM-DD" range-separator="至"
          start-placeholder="开始时间" end-placeholder="结束时间" :clearable="false" />
      </el-form-item>
      <div class="search-btns">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onResetForm">重置</el-button>
      </div>
    </el-form>

    <div class="table-list">
      <el-table :data="tableData" stripe header-cell-class-name="table-header" cell-class-name="table-cell">
        <el-table-column fixed prop="appCode" label="工号" width="150" />
        <el-table-column prop="appName" label="姓名" width="150" />
        <el-table-column prop="createName" label="月份" width="150" />
        <el-table-column prop="createTime" label="创建时间" width="200" />
        <el-table-column prop="modifieName" label="实发" width="150" />
      </el-table>
    </div>

    <div class="list-pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[12, 24, 48]"
        :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="onSizeChange"
        @current-change="onCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
// import { ElMessage } from "element-plus";

const searchForm = reactive({
  keyword: "",
  date: [],
});

const tableData = ref([]);
const currentPage = ref(1); // 当前页
const pageSize = ref(12); // 分页
const total = ref(0); // 总页数

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
  onSearch(); // 重置后重新加载数据
}
// 搜索
function onSearch() {
  currentPage.value = 1;
  loadData();
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

</script>

<style scoped>
.category {
  background-color: white;
}

.page-title {
  margin-bottom: 24px;
  color: #333;
}

.search-wrap {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 0 0;
  margin-bottom: 26px;
}

.search-item {
  margin: 8px 24px 8px 0 !important;
}

.search-btns {
  /* position: absolute; */
  margin: 8px 0;
  margin-left: auto;
  display: flex;
}

.label-box {
  display: flex;
  justify-content: flex-end;
  margin: 8px 0 20px;
}

.table-list {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.table-header {
  font-size: 15px !important;
  font-weight: 500 !important;
  color: #232323;
  background-color: #f3f5fa !important;
}

.table-cell {
  padding: 16px 8px !important;
  font-size: 15px !important;
}

.list-pagination {
  display: flex;
  justify-content: end;
  margin-top: auto;
  margin-bottom: 24px;
}

.tag-layout {
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  max-width: 150px;
  margin: 4px 4px;
  padding: 2px 4px;
  border-radius: 4px;

  color: #539bff;
  font-size: 12px;
  font-weight: 500;
  background-color: #f0f5ff;
}
</style>
