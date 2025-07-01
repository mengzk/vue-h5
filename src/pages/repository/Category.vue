<template>
  <div class="category">
    <h1>repository category</h1>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => { });
</script>

<style scoped>
.category {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
