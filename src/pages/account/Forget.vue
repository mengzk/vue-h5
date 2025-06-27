<template>
  <div class="page">
    <div>
      <h1>Forget Password</h1>
      <p>This is the forget password page.</p>
      <button @click="router.push('/account/login')">Go to Login</button>
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
