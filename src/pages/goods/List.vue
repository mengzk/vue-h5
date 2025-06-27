<template>
  <div class="page goods">
    <div>
      <h1>Product List</h1>
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
.goods {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
