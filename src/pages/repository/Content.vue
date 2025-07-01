<template>
  <div class="content">
    <div>
      <el-button type="primary" @click="onAdd">添加要点</el-button>
    </div>
    <div class="table-list">
      <el-table :data="tableData" border header-cell-class-name="table-header" cell-class-name="table-cell">
        <el-table-column fixed prop="content" label="内容要点" width="200" />
        <el-table-column prop="contentDesc" label="要点说明" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" @click="onEdit(scope.row)">编辑</el-button>
            <el-button link type="danger" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// import { useRouter } from "vue-router";

const tableData = ref([
  {
    content: '管理员',
    contentDesc: '应用1',
  },
]);

// onMounted(() => { });

function onAdd() {
  console.log('添加内容要点');
}

function onEdit(row) {
  console.log('编辑:', row);
}

function onDelete(row) {
  console.log('删除:', row);
}

</script>

<style scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-list {
  flex: 1;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
</style>
<style>
.table-header {
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #363636;
  background-color: #f3f5fa !important;
}

.table-cell {
  padding: 16px 8px !important;
  font-size: 15px !important;
}
</style>