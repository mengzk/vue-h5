<template>
  <div class="p-nurse">
    <Header title="调理建议"/>
    <template v-for="item in itemList" :key="item.name">
      <div class="cell-box">
        <span class="cell-title">{{item.title}}</span>
        <div class="cell-text">{{ item.advice }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
// 表现特征/调理方法
import { ref, onMounted } from 'vue';

import Header from '@/components/Header.vue';

import useDetection from '@/stores/detection';

// const props = defineProps({ data: { type: Object, required: false }  });

const { getPulse, getTongue } = useDetection();

const itemList = ref([]);
const pulseNurse = ref([]);

onMounted(() => {
  // console.log("onMounted ---> ", id);
  let arr = getPulse().physical_dialectics_list||[];
  const list = arr.map((item) => {
    const info = item.describe||{};
    return {
      title: item.physical_dialectics_cate_content,
      desc: info.signs,
      advice: info.conditioning,
    };
  });
  const arr2 = getTongue().advices||[];

  if(arr2.length > 0) {
    const info = arr2[0];
    const food = info.food;
    const music = info.music;
    const sleep = info.sleep;
    const sport = info.sport;

    list.push(...food);
    list.push(...music);
    list.push(...sleep);
    list.push(...sport);
  }

  itemList.value = list;
});

</script>

<style scoped>
.p-nurse {
  display: flex;
  flex-direction: column;
}

.cell-box {
  margin: 0 80px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;

  line-height: 1.3;
  color: var(--lab-color);
}

.cell-title {
  font-size: 54px;
  font-weight: bold;
  margin-bottom: 36px;
  color: var(--text);
}
</style>
