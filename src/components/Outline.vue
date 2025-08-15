<template>
  <!-- 路由动画 -->
  <RouterView v-slot="{ Component, route }">
    <Transition name="slide-right" mode="out-in" appear>
      <KeepAlive :max="10" :exclude="excludePages">
        <component :is="Component" :key="route.path" v-if="route.meta.keep" />
      </KeepAlive>
    </Transition>

    <Transition name="slide-right" mode="out-in" appear>
      <component :is="Component" :key="route.path" v-if="!route.meta.keep" />
    </Transition>
  </RouterView>
</template>

<script setup>
const excludePages = ['ChatPage', 'Settings'];
  console.log("Outline.vue");
</script>

<style scoped></style>
