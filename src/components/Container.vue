<template>
  <Header />
  <div class="rc-container">
    <el-menu class="rc-menu" :default-active="curMenu" @open="onHandleOpen" @close="onHandleClose">
      <template v-for="menu in menuList" :key="menu.name">
        <el-sub-menu v-if="hasChildren(menu)" :index="menu.name">
          <template #title>
            <span>{{ menu.meta.title }}</span>
          </template>
          <template v-for="child in menu.children" :key="child.name">
            <el-menu-item v-if="!child.meta.hidden" :index="child.name" @click="onMenuClick(child)">
              <span>{{ child.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else-if="!menu.meta.hidden" :index="menu.name" @click="onMenuClick(menu)">
          <span>{{ menu.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <!-- 路由动画 -->
    <div class="rc-router">
      <RouterView v-slot="{ Component, route }">
        <Transition name="slide-fade" mode="out-in" appear>
          <KeepAlive :max="10" :exclude="keepAliveExclude">
            <component :is="Component" :key="route.path" v-if="route.meta.keep" />
          </KeepAlive>
        </Transition>

        <Transition name="slide-fade" mode="out-in" appear>
          <component :is="Component" :key="route.path" v-if="!route.meta.keep" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

// import { getUrlParams } from "@/utils";
import useMenuStore from "@/stores/menu";
import Header from "./Header.vue";

const route = useRoute();
const router = useRouter();
const menuConfig = useMenuStore();

const keepAliveExclude = ["Login", "Register", "ResetPassword", "NotFound"];

const curMenu = computed(() => { 
  return route.name 
});

const menuList = ref([]);

watch(
  () => menuConfig.menuList,
  (newList) => {
    menuList.value = newList;
  },
  { immediate: true }
);

//
function onHandleOpen(key) {
  console.log("Menu opened", key);
}
//
function onHandleClose(key) {
  console.log("Menu closed", key);
}

// 是否有子菜单
function hasChildren(menu) {
  const hidden = menu.meta.hidden;
  const children = menu.children||[];
  if(hidden) {
    return false;
  }
  return children.filter(e => !e.meta.hidden).length > 1;
}

// 菜单点击事件
function onMenuClick(menu) {
  // console.log("Menu clicked:", menu);
  router.push({ path: menu.path });
}
</script>

<style>
.rc-container {
  width: 100vw;
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: row;
}

.rc-menu {
  width: var(--menu-width);
  min-width: var(--menu-width);
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow-y: auto;
}

.rc-router {
  flex: 1;
  padding: 10px;
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  position: relative;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.rc-router::-webkit-scrollbar {
  display: none;
}
.page {
  height: 100%;
  padding: 16px 20px 12px 20px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
}
.search-box3 {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.search-btns3 {
  display: flex;
  margin-left: auto;
}
.action-box3 {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.list-table3 {
  flex: 1;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}
.list-pagination3 {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}
</style>

<style>
.rc-menu .el-sub-menu__title {
  --el-menu-item-height: 50px;
  font-size: 17px;
  font-weight: 600;
}
.rc-menu .el-menu-item {
  /* --el-menu-sub-item-height: 50px; */
  height: 44px;
  line-height: 44px;
  font-size: 16px;
}
.rc-menu .el-menu-item.is-active {
  color: white;
  background-color: var(--el-color-primary);
}

</style>