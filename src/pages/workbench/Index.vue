<template>
  <div class="page">
    <div class="workbench">
      <h1>Workbench</h1>
      <p>This is the workbench page.</p>
      <button @click="router.push('/product')">Go to Product List</button>
      <button @click="router.push('/member')">Go to Member List</button>
      <button @click="router.push('/account')">Go to Account Info</button>
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
.workbench {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
