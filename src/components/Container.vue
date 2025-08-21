<template>
  <div class="container">
    <v-header :title="props.title" :onBack="props.onBack">
      <slot name="action"></slot>
    </v-header>
    <div :class="`v-container-page ${props.class2}`">
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
  onBack: {
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
.v-container-page {
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
