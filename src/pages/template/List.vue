<template>
  <div class="list3">
    <h2 class="title">租户管理</h2>
    <el-form class="list-search-box3" :model="searchForm" ref="searchRef">
      <el-form-item label="关键字" prop="word">
        <el-input v-model="searchForm.word" maxlenght="20" />
      </el-form-item>
      <el-form-item label="租户状态:" prop="status">
        <el-select v-model="searchForm.status" placeholder="请选择">
          <el-option label="停用" value="1" />
          <el-option label="启用" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="租户使用到期日期:" prop="date">
        <el-date-picker
          v-model="searchForm.date"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
        />
      </el-form-item>
      <div class="list-search-btns3">
        <el-botton type="primary" @click="onSearch">搜索</el-botton>
        <el-botton @click="onReset">搜索</el-botton>
      </div>
    </el-form>

    <div class="list-action-box3">
      <el-botton type="primary">新建</el-botton>
    </div>
    <div class="list-table3">
      <el-table :data="tableData" stripe @row-click="onRowClick">
        <el-table-column fixed prop="id" label="ID" width="100px" />
        <el-table-column fixed prop="name" label="姓名" width="100px" />
        <el-table-column fixed prop="phone" label="电话" width="100px" />
        <el-table-column fixed prop="status" label="状态" width="100px" />
        <el-table-column fixed prop="date" label="日期" width="100px" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { onMounted } from "vue";
import { ElMessageBox } from "element-plus";

// const rules = {
//   name: [
//     { required: true, message: '请输入角色名称', trigger: 'blur' },
//     { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
//   ],
//   des: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
// }

const tableData = [
  {
    id: 12,
    mode: 1,
    date: "2016-05-03",
    name: "Tom",
    cname: "和设计大奖",
    qname: "上的讲话方式大幅加快建设进度",
    status: "California",
    hang: "政府部门",
    account: "完全卡死你发空间纳斯达克家",
    endDate: "2026-03-09 23:00:00",
    createDate: "2026-03-09 23:00:00",
    createUser: "合适罚款",
    updateDate: "2026-03-09 23:00:00",
    updateUser: "合适罚款",
  },
];

const searchRef = ref();
const searchForm = reactive({
  word: "",
  status: "",
  date: "",
});

const currentPage = ref(1); // 当前页
const pageSize = ref(20); // 分页
const total = ref(100); // 总页数

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
function onReset() {
  const formEl = searchRef.value;
  if (formEl) {
    formEl.resetFields();
  }
}
// 搜索
function onSearch() {
  loadData();
}

function onRowClick(res: any) {
  console.log("click", res);
}

// 删除弹窗
function onDeleteAlert() {
  ElMessageBox.confirm("删除之后不可恢复！", "确认删除", {
    confirmButtonClass: "custom-confirm-button",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error",
  })
    .then(() => {
      onDelete();
    })
    .catch(() => {
      console.log("取消");
    });
}

// 删除
async function onDelete() {
  console.log("删除");
}

// 获取数据
async function loadData() {
  const params = {
    page: currentPage.value,
    size: pageSize.value,
    ...searchForm,
  };
}
</script>

<style scoped>
.list3 {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.list-search-box3 {
  display: flex;
}
.list-search-btns3 {
  display: flex;
  align-items: center;
}
.list-action-box3 {
  display: flex;
  justify-content: flex-end;
}
.list-table3 {
  flex: 1;
  display: flex;
}
.list-pagination3 {
  display: flex;
}
</style>
<style>
.list-search-box3 .el-input {
  --el-input-width: 130px;
  --el-input-text-color: #232323;
  /* --el-border-color: #989796;
  --el-input-border-color: #989796;
  --el-input-hover-border-color: #ff6600;
  --el-input-focus-border-color: #ff6600; */
}
.list-search-box3 .el-button {
  --el-button-text-color: #ffffff;
  --el-button-bg-color: #ff6600;
  --el-button-hover-bg-color: #ff6600;
  --el-button-active-bg-color: #ff6600;
  --el-button-border-color: transparent;
  --el-button-hover-border-color: transparent;
  --el-button-active-border-color: transparent;
  --el-font-size-base: 16px;
  --el-button-font-weight: 600;
  width: 100%;
  height: 36px;
}
.list-search-box3 .el-select {
  --el-select-width: 130px;
  /* --el-fill-color-blank: #ff6600; */
  --el-input-text-color: #232323;
  /* --el-border-color: transparent; */
}
.list-search-box3 .el-date-editor {
  --el-date-editor-width: 130px;
  /* --el-fill-color-blank: #ff6600; */
  --el-input-text-color: #232323;
  /* --el-border-color: transparent; */
}
.list-table3 .el-table {
  /* --el-table-border: 1px solid #e3e3e3;
  --el-table-row-hover-bg-color: #e3e3e3;
  --el-table-tr-bg-color: #e3e3e3; */
  --el-table-header-bg-color: #e3e3e3;
  --el-table-header-text-color: #e3e3e3;
  --el-table-text-color: #e3e3e3;
  --el-table-size-base: 14px;
}
</style>
