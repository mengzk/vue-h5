<template>
  <div class="container v-cotner" :style="props.style2">
    <div class="v-cotner-bg" v-if="props.bg"></div>
    <Header :title="props.title" :back="props.back" :bg="props.bg">
      <slot name="action"></slot>
    </Header>
    <div :class="props.class2" v-if="props.class2">
      <slot></slot>
    </div>
    <div class="v-cotner-page" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue';

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  bg: {
    type: Boolean,
    required: false,
    default: true
  },
  class2: {
    type: String,
    required: false,
    default: ''
  },
  style2: {
    type: String,
    required: false,
    default: ''
  },
  back: {
    type: Function,
    required: false,
  },
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
