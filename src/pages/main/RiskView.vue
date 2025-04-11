<template>
  <div class="v-pulse">
    <Header title="风险指数"/>
    <div class="pulse-hint">
      <span class="hint-title">越接近0越健康</span>
      <span>低风险</span>
      <div class="color-line hint-line" />
      <span>高风险</span>
    </div>

    <div class="group-box">
      <template v-for="(item, gid) in groupData" :key="item.title">
        <div class="group-item">
          <span class="group-title">{{ item.title }}</span>
          <div class="child-box">
            <template v-for="(child, cid) in item.list" :key="child.name">
              <div class="child-item">
                <div class="child-title" @click="onItemTap(gid, child.id)">
                  <span>{{ child.name }}</span>
                  <img class="child-next" :src="nextIc" alt=""/>
                </div>
                <div class="child-line">
                  <div class="color-line" :style="getLineStyle(child.value)" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
// 风险提醒
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Header from '@/components/Header.vue';

import useDetection from '@/stores/detection';
import nextIc from '@/assets/arrow.png';

// const props = defineProps({ data: { type: Object, required: false }  });
const router = useRouter();
const { getPulse } = useDetection();

const groupData = ref([
  {
    title: '神经系统', list: [
      { name: '压力', value: 1, id: 0 },
      { name: '疲劳', value: 1, id: 0 },
      { name: '睡眠质量', value: 1, id: 0 },
    ]
  },
  {
    title: '心血管系统', list: [
      { name: '心血管风险', value: 1, id: 0 },
      { name: '脑血管风险', value: 1, id: 0 },
      { name: '血压风险', value: 1, id: 0 },
      { name: '血脂风险', value: 1, id: 0 },
    ]
  },
  {
    title: '代谢系统', list: [
      { name: '血糖风险', value: 1, id: 0 },
      { name: '免疫力', value: 1, id: 0 },
      { name: '过敏风险', value: 1, id: 0 },
      { name: '感染风险', value: 1, id: 0 },
    ]
  },
  {
    title: '功能系统', list: [
      { name: '血糖风险', value: 1, id: 0 },
      { name: '免疫力', value: 1, id: 0 },
      { name: '过敏风险', value: 1, id: 0 },
      { name: '感染风险', value: 1, id: 0 },
    ]
  },
  {
    title: '消化系统', list: [
      { name: '消化力力', value: 1, id: 0 },
      { name: '胃食道逆流风险', value: 1, id: 0 },
      { name: '胃酸过多风险', value: 1, id: 0 },
    ]
  },
]);

onMounted(() => {
  const list = groupData.value;
  const risk = getPulse().risk||[];
  list.forEach((item) => {
    item.list.forEach((e) => {
      const data = risk.find((r) => r.risk_name == e.name);
      const index = risk.findIndex((r) => r.risk_name == e.name);
      if(data) {
        e.value = data.index_value||1;
        e.id = index;
      }
    });
  });
});

// 获取线条样式
function getLineStyle(value) {
  let red = '00ff66';
  let yellow = '00ff66';

  if(value > 20) {
    yellow = 'ffff00';
    red = 'ffff00';
    if(value > 50) {
      red = 'cc3333';
    }
  }
  let bg = `linear-gradient(90deg, #00ff33 15%, #${yellow} 70%, #${red} 100%)`;

  return {
    width: `${value}%`,
    background: bg,
  };
}


function onItemTap(gid, idx) {
  console.log('onItemTap ---> gid, cid', gid, idx);
  router.push({ path: '/unscramble', query: { gid, idx } })
}

</script>

<style scoped>
.v-pulse {
  display: flex;
  flex-direction: column;
}

.pulse-hint {
  padding: 30px 40px;
  display: flex;
  align-items: center;
  margin: 0 80px 40px 80px;
  border-radius: 8px;
  background-color: var(--box-color);

  color: var(--sut-color);
  font-size: 34px;
}

.hint-title {
  margin-right: auto;
}
.color-line {
  width: 100px;
  height: 24px;
  border-radius: 16px;
  background: var(--lg);
}

.hint-line {
  margin: 0 20px;
}

.group-box {
  margin: 0 80px;
  display: flex;
  flex-direction: column;
}

.group-item {
  display: flex;
  flex-direction: column;
  margin: 96px 0;
}

.group-title {
  font-size: 54px;
  font-weight: bold;
}

.child-box {
  display: flex;
  flex-direction: column;
}

.child-title {
  font-weight: bold;
  margin-top: 105px;
  margin-bottom: 56px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.child-item {
  display: flex;
  flex-direction: column;
}
.child-next {
  width: 34px;
  height: 34px;
  transform: rotateZ(180deg);
}
.child-line {
  display: flex;
  align-items: center;
  height: 24px;
  border-radius: 16px;
  background: var(--line-color);
}
</style>
