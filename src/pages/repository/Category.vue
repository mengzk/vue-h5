<template>
  <div class="category">
    <div>
      <el-button type="primary" @click="onEdit">编辑分类</el-button>
    </div>
    <div class="table-list">
      <el-table :data="tableData" border header-cell-class-name="table-header" cell-class-name="table-cell">
        <el-table-column fixed prop="content" label="一级分类" width="200" />
        <el-table-column prop="content2" label="二级分类" width="200">
          <!-- 多行类目列表 -->
          <template #default="scope">
            <div class="row-item" v-for="(item, index) in scope.row.list" :key="index">
              <span>{{ item.content }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="contentDesc" label="内容要点">
          <template #default="scope">
            <div class="row-item" v-for="(item, index) in scope.row.list" :key="index">
              <span>{{ item.content }}</span>
            </div>
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
    list: [
      { content: '二级分类1' },
      { content: '二级分类2' },
      { content: '二级分类3' },
    ],
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
.category {
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

.row-item {
  padding: 12px 12px;
  border-bottom: 1px solid #eaeaea;
  text-align: left;
  font-size: 14px;
  color: #333;
}
.row-item:last-child {
  border-bottom: none;
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
  margin: 0 !important;
  padding: 0 0 !important;
  font-size: 15px !important;
  text-align: center !important;
}
.table-cell .cell {
  padding: 0;
}
</style>