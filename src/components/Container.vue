<template>
  <Header />
  <div class="rc-container">
    <el-menu class="rc-menu" :default-active="curMenu" @open="onHandleOpen" @close="onHandleClose">
      <template v-for="menu in menuList" :key="menu.name">
        <el-sub-menu v-if="hasChildren(menu)" :index="menu.name">
          <template #title>
            <span class="rc-menu-text">{{ menu.title }}</span>
          </template>
          <template v-for="child in menu.children" :key="child.name">
            <el-menu-item :index="child.name" @click="onMenuClick(child)">
              <span class="rc-menu-text2">{{ child.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.name" @click="onMenuClick(menu)">
          <span class="rc-menu-text">{{ menu.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <!-- 路由动画 -->
    <div class="rc-layout">
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
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

// import { getUrlParams } from "@/utils";
import useMenuStore from "@/stores/menu";
import Header from "./Header.vue";

const keepAliveExclude = ["Login", "Register", "ResetPassword", "NotFound"];

const curMenu = ref("");
const menuList = ref([]);
const router = useRouter();
const menuConfig = useMenuStore();

watch(
  () => menuConfig.menuList,
  (newList) => {
    menuList.value = newList;
    curMenu.value = menuConfig.getCurMenu();
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
  return menu.children && menu.children.length > 1;
}

// 菜单点击事件
function onMenuClick(menu) {
  // console.log("Menu clicked:", menu);
  router.push({ path: menu.path });
}
</script>

<style scoped>
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

.rc-menu-text {
  font-size: 17px;
}

.rc-menu-text2 {
  font-size: 16px;
}

.rc-layout {
  flex: 1;
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  overflow: auto;

  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer and Edge */
}

.rc-layout::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari and Opera */
}
</style>
