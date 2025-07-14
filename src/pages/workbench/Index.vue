<template>
  <div class="workbench">
    <div class="grid">
      <template v-for="item in itemList" :key="item.path">
        <div class="item">
          <h2>{{ item.name }}</h2>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const itemList = ref([
  { name: "Salary Management", path: "/salary/list" },
  { name: "Product Management", path: "/product/list" },
  { name: "Product Management", path: "/product/list" },
  { name: "Product Management", path: "/product/list" },
  { name: "Product Management", path: "/product/list" },
  { name: "Product Management", path: "/product/list" },
  // Add more items as needed
]);

onMounted(() => { });
</script>

<style scoped>
.workbench {
  height: 100%;
  padding: 20px;
  background-color: #f9f9f9;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.item {
  height: 400px;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: column;
}
.item:hover {
  cursor: pointer;
  box-shadow: 0 8px 12px 3px rgba(0, 0, 0, 0.1);
}
</style>
