<template>
  <section class="container">
    <router-view v-slot="{ Component, route }">
      <KeepAlive>
        <component v-if="route.meta.keep" :is="Component" />
      </KeepAlive>
      <component v-if="!route.meta.keep" :is="Component" />
    </router-view>
  </section>
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
