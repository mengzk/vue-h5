<template>
  <router-view v-if="inited" v-slot="{ Component, route }">
    <keep-alive>
      <component v-if="route.meta.keep" :is="Component" />
    </keep-alive>
    <component v-if="!route.meta.keep" :is="Component" />
  </router-view>
  <div class="loading" v-else>
    <div class="loading-view"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// import { useRouter } from "vue-router";
import { getUrlParams } from "@/utils";

// const router = useRouter();
const inited = ref(false);

// 初始化账号信息
onMounted(() => {
  const res = getUrlParams();
  console.log("---> query", res);
  // 初始化-信息
  const timer = setTimeout(() => {
    inited.value = true;
    clearTimeout(timer);
  }, 1500);
});
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-view {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid transparent; /* 设置透明边框 */
  border-top: 10px solid #3579f6; /* 顶部边框颜色 */
  border-right: 10px solid #4caf50; /* 右侧边框颜色 */
  border-bottom: 10px solid #ff6600; /* 底部边框颜色 */
  border-left: 10px solid #f44336; /* 左侧边框颜色 */
  animation: spin 2s linear infinite; /* 旋转动画 */
}
</style>
