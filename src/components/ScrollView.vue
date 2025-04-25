<template>
  <div class="scroll-view">
    <div class="scroll-view-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: false,
    default: [],
  },
});

</script>

<style scoped>
.scroll-view {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
</style>
