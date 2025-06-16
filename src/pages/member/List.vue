<template>
  <div class="page">
    <div class="home">
      <h1>Member List</h1>
      <p>This is the member list page.</p>
    </div>
  </div>
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
