<template>
  <div class="frame-header">
    <h3>这是tab拦</h3>
    <div>-----</div>
    <div>
      <span>哈哈户</span>
    </div>
  </div>
  <!-- 路由动画 -->
  <div class="frame-layout">
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
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

const curMenu = computed(() => {
  return route.name;
});

const menuList = ref([]);


// 菜单点击事件
function onMenuClick(menu) {
  // console.log("Menu clicked:", menu);
  router.push({ path: menu.path });
}
</script>

<style scoped>
.frame-header {
  z-index: 999;
  height: var(--header-height);
  padding: 0 26px;
  display: flex;
  align-items: center;
  background-color: var(--header-bg);
}

.frame-layout {
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.frame-layout::-webkit-scrollbar {
  display: none;
}
</style>
