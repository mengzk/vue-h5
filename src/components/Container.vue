<template>
  <div class="container v-cotner">
    <div class="v-cotner-bg"></div>
    <v-header :title="props.title" :onBack="props.back">
      <slot name="action"></slot>
    </v-header>
    <div :class="`v-cotner-page ${props.class2}`">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  back: {
    type: Function,
    required: false,
  },
  class2: {
    type: String,
    required: false,
    default: ''
  }
});
</script>

<style scoped>
.v-cotner {
  position: relative;
}
.v-cotner-page {
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.v-cotner-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/img/app_bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
