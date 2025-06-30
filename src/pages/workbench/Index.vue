<template>
  <div class="page workbench">
    <div>
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

onMounted(() => { });
</script>

<style scoped>
.workbench {
  min-height: 100vh;
}
</style>
