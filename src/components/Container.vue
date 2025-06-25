<template>
  <div class="c-container">
    <div class="c-menu-box">
      <el-menu
        :default-active="curMenu"
        @open="onHandleOpen"
        @close="onHandleClose"
      >
        <template v-for="menu in menuList" :key="menu.name">
          <el-sub-menu v-if="hasChildren(menu)" :index="menu.name">
            <template #title>
              <span>{{ menu.title }}</span>
            </template>
            <template v-for="child in menu.children" :key="child.name">
              <el-menu-item :index="child.name" @click="onMenuClick(child)">
                {{ child.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item v-else :index="menu.name" @click="onMenuClick(menu)">
            <span>{{ menu.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>

    <!-- <Header /> -->
    <!-- 路由动画 -->
    <RouterView v-slot="{ Component, route }">
      <Transition name="slide-right" mode="out-in" appear>
        <KeepAlive :max="10" :exclude="keepAliveExclude">
          <component :is="Component" :key="route.path" v-if="route.meta.keep" />
        </KeepAlive>
      </Transition>

      <Transition name="slide-right" mode="out-in" appear>
        <component :is="Component" :key="route.path" v-if="!route.meta.keep" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

// import { getUrlParams } from "@/utils";
import useMenuStore from "@/stores/menu";
// import Header from "./Header.vue";

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
.c-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
}
.c-menu-box {
  width: 300px;
  display: flex;
  flex-direction: column;
}
</style>
