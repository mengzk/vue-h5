<template>
  <div class="container">
    <!-- <router-view v-slot="{ Component, route }">
      <KeepAlive>
        <component v-if="route.meta.keep" :is="Component" />
      </KeepAlive>
      <component v-if="!route.meta.keep" :is="Component" />
    </router-view> -->

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

// import Toolbar from "./Toolbar.vue";
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
