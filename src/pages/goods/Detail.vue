<template>
  <div class="page goods-detail">
    <div>
      <h1>Product Detail</h1>
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
.goods-detail {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
