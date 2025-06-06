<template>
  <div class="container">
    <Header />
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
import { RouterView } from "vue-router";

import Header from "./Header.vue";
</script>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  /* overflow-y: scroll; */
}
</style>
