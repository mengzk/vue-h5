<template>
  <div class="frame-layout">
    <div class="frame-header">
      <WebHeader title="标题" />
    </div>
    <!-- 路由动画 -->
    <div class="frame-router">
      <RouterView v-slot="{ Component, route }">
        <Transition name="slide-fade" mode="out-in" appear>
          <KeepAlive :max="10" :exclude="keepAliveExclude">
            <component
              :is="Component"
              :key="route.path"
              v-if="route.meta.keep"
            />
          </KeepAlive>
        </Transition>

        <Transition name="slide-fade" mode="out-in" appear>
          <component
            :is="Component"
            :key="route.path"
            v-if="!route.meta.keep"
          />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import WebHeader from "./WebHeader.vue";

const route = useRoute();
const router = useRouter();

const curMenu = computed(() => {
  return route.name;
});

const menuList = ref([]);
const keepAliveExclude = ["Login", "Register", "ResetPassword", "NotFound"];

// 菜单点击事件
function onMenuClick(menu) {
  // console.log("Menu clicked:", menu);
  router.push({ path: menu.path });
}
</script>

<style scoped>
.frame-layout {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.frame-header {
  z-index: 999;
  top: 0;
  position: sticky;
  height: var(--header-height);
  padding: 0 26px;
  display: flex;
  align-items: center;
  background-color: var(--header-bg);
}

.frame-router {
  height: calc(100vh - var(--header-height));
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
}

.frame-router::-webkit-scrollbar {
  display: none;
}
</style>
