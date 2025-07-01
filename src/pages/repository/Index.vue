<template>
  <div class="repository">
    <div class="tab-layout">
      <template v-for="(tab, idx) in tabList" :key="idx">
        <div :class="`tab-view ${curIndex == idx ? 'active' : ''}`" @click="onTabClick(idx)">{{ tab.name }}</div>
      </template>
      <div class="tab-line"></div>
    </div>
    <div class="tab-page">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const curIndex = ref(0);
const tabList = [
  { name: '基础信息', path: '/repository' },
  { name: '笔记分类', path: '/repository/category' },
  { name: '内容要点', path: '/repository/content' },
]

onMounted(() => {
  const currentPath = router.currentRoute.value.path;
  curIndex.value = tabList.findIndex(tab => tab.path === currentPath);
  if (curIndex.value === -1) {
    curIndex.value = 0; // 默认选中第一个标签
    router.push(tabList[0].path);
  }
});

function onTabClick(index) {
  curIndex.value = index;
  router.push(tabList[index].path);
}
</script>

<style scoped>
.repository {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.tab-layout {
  margin: 20px 20px 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.tab-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #d3d3d3;
}

.tab-view {
  z-index: 1;
  padding: 15px 20px;
  cursor: pointer;
  color: #878787;
  font-size: 16px;
  border: 1px solid #d3d3d3;
}

.tab-view:not(:first-child) {
  border-left: none;
}

.tab-view:hover {
  background-color: #f9f9f9;
}

.tab-view.active {
  background-color: white;
  border-bottom: 1px solid white;
  color: #3579F6;
  font-weight: bold;
}

.tab-page {
  flex: 1;
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
}
</style>
