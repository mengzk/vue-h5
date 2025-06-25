<template>
  <div class="page login">
    <div class="login">
      <h1>登录</h1>
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
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
