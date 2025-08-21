<template>
  <div class="container v-layout">
    <div class="v-layout-bg"></div>
    <slot></slot>
  </div>
</template>

<script setup>
// const props = defineProps({});
</script>

<style scoped>
.v-layout {
  position: relative;
}
.v-layout-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/logo.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
