<template>
  <container title="这是很长1很长2很长3很长的标题" :bg="false">
    <template #action>
      <button @click="$router.push('/category/add')">新增</button>
    </template>
    <div class="home">品类管理123</div>
  </container>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";


onMounted(() => {
});

</script>

<style scoped>
.home {
  flex: 1;
  padding: 20px;
  background-color: aqua;
}

.page-title {
  margin-top: 24px;
  color: #333;
}
</style>
