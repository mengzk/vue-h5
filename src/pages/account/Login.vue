<template>
  <div class="page"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {});
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
