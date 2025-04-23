<template>
  <div class="v-toolbar">
    <div class="v-toolbar-action" @click="onBack">
      <img class="v-toolbar-back" :src="backIc" />
    </div>
    <span class="v-toolbar-title">{{ props.title }}</span>
    <div class="v-toolbar-action v-toolbar-action2">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
// 顶部工具栏
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import backIc from '@/assets/arrow.png';

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '标题'
  },
  onBack: {
    type: Function,
    required: false,
  }
});

const router = useRouter();
const route = useRoute();
const titleStr = ref('');

watch(() => props.title, (value) => {
  titleStr.value = value;
});

onMounted(() => {
  titleStr.value =  props.title || '';
});

// watch(route, (newRoute, oldRoute) => {
//   console.log('---> from', oldRoute.fullPath, 'to', newRoute.fullPath);
//   // titleStr.value = newRoute.meta?.title || props.title;
// });

function onBack() {
  if(props.onBack) {
    props.onBack();
  }else {
    router.back();
  }
}
</script>

<style scoped>
.v-toolbar {
  width: 100vw;
  height: 56px;
  top: 0;
  left: 0;
  z-index: 3;
  position: sticky;
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  /* border-bottom: solid 1px #f3f3f3; */
}

.v-toolbar-action {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-toolbar-action2 {
  background-color: transparent;
}

.v-toolbar-title {
  font-size: 16px;
  font-weight: bold;
}

.v-toolbar-back {
  width: 20px;
  height: 20px;
  margin-left: 16px;
  margin-right: 16px;
}

.v-toolbar-height {
  height: 56px;
}
</style>
