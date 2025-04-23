<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component v-if="route.meta.keep" :is="Component" />
    </keep-alive>
    <component v-if="!route.meta.keep" :is="Component" />
  </router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { getUrlParams } from "@/utils";

// 初始化账号信息
onMounted(() => {
  const res = getUrlParams();
  console.log("---> query", res);
});
</script>

<style scoped></style>
