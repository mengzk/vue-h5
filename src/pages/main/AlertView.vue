<template>
  <div class="v-alert">
    <Header title="重要提示"/>
    <div class="list-box">
      <template v-for="(item, idx) in itemData" :key="item.name">
        <div class="list-item" @click="gotoExplain(idx)">
          <span class="item-title">{{ item.name }}</span>
          <span class="item-tag">{{ item.degree }}</span>
          <span>解读</span>
          <img class="item-ic" :src="nextIc" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
// 体质预警列表
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Header from '@/components/Header.vue';

import useDetection from '@/stores/detection';
import nextIc from '@/assets/arrow.png';

// const props = defineProps({ data: { type: Object, required: false }  });

const router = useRouter();
const { getPulse } = useDetection();

const itemData = ref([]);

onMounted(() => {
  console.log("onMounted ---> ");
  const list = getPulse().risk || [];
  
  itemData.value = list.map((item) => {
    return {
      name: item.risk_name,
      value: item.index_value,
      degree: item.degree,
    }
  });
});

// 
function gotoExplain(id) {
  router.push({
    path: '/explain',
    query: {id}
  });
}

function getColor(num) {
  // console.log("getColor ---> ", num);
  if(num > 50) {
    return 'color: #E55C5C;';
  }else if(num > 20) {
    return 'color: #FFA500;';
  }else {
    return 'color: #52c41a;';
  }
}


</script>

<style scoped>
.v-alert {
  display: flex;
  flex-direction: column;
}

.list-box {
  display: flex;
  flex-direction: column;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 60px 80px;

  font-size: 34px;
  color: var(--date-color);

  /* &:last-child {
    border-bottom: none;
  } */
}

.item-title {
  font-size: 54px;
  font-weight: bold;
  margin-right: 30px;
  color: var(--text);
}

.item-tag {
  color: var(--text);
  font-weight: 600;

  padding: 12px 24px;
  margin-right: auto;
  border-radius: 8px;
  /* background-color: var(--status2); */
}
.item-ic {
  width: 32px;
  height: 32px;
  opacity: 0.7;
  margin-left: 8px;
  transform: rotateZ(180deg);
}
</style>
