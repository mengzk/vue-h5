<template>
  <div class="content">
    <h1>repository content</h1>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => { });
</script>

<style scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: lightblue;
}
</style>
