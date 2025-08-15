<template>
  <div class="container category">
    <h2 class="page-title">品类管理</h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";


onMounted(() => {
});

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
