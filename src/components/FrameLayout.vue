<template>
  <div class="frame-header">
    <h1>这是tab拦</h1>
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
    height: 68px;
    padding: 0 26px;
    display: flex;
    align-items: center;
  }
.frame-layout {
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

.frame-layout::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari and Opera */
}
</style>
