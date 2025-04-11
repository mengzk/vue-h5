<template>
  <div class="v-meridian">
    <Header title="经络分析" />
    <div class="meridian-hint">
      <span class="hint-title">越接近0越健康</span>
    </div>

    <div class="group-box">
      <template v-for="(item, index) in itemData" :key="item.name">
        <div class="group-item" @click="onItemTap(item, index)">
          <div class="top-box">
            <span class="group-title">{{ item.name }}</span>
            <img class="child-next" :src="nextIc" alt=""/>
          </div>
          <div class="value-line">
            <div class="left-line">
              <div v-if="item.value <= 0" class="color-line jc-start" :style="getLineStyle(item.value)">
                <span class="color-num">{{ item.value||0 }}</span>
                <div class="color-span"></div>
              </div>
            </div>
            <div class="line-zero"></div>
            <div class="right-line">
              <div v-if="item.value > 0" class="color-line" :style="getLineStyle(item.value)">
                <span class="color-num">{{ item.value }}</span>
                <div class="color-span"></div>
              </div>
            </div>
          </div>
          <div class="scale-box">
            <span>-100</span>
            <span>100</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
// 脉诊报告
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Header from '@/components/Header.vue';

import useDetection from '@/stores/detection';

import nextIc from '@/assets/arrow.png';

const router = useRouter();
// const props = defineProps({ data: { type: Object, required: false }  });
const { getPulse } = useDetection();

const itemData = ref([]);

onMounted(() => {
  // console.log("onMounted ---> MeridianView");
  const list = getPulse().meridians || [];
  
  itemData.value = list.map((item) => {
    // console.log("item", item.name, item.date);
    return {
      name: item.name,
      value: item.date,
    }
  });
});

function onItemTap(item, idx){
  router.push({path: '/meridianDesc', query: { idx }})
}

// 获取线条样式
function getLineStyle(value) {
  let bg = '#00ff66';
  const num = Math.abs(value);

  if (num > 50) {
    bg = '#cc4545';
  } else if (num > 20) {
    bg = '#ffff00';
  }
  return {
    width: `${num}%`,
    background: bg,
  };
}


</script>

<style scoped>
.v-meridian {
  display: flex;
  flex-direction: column;
}

.meridian-hint {
  display: flex;
  align-items: center;
  padding: 30px 40px;
  margin: 0 80px 120px 80px;
  border-radius: 8px;
  background-color: var(--box-color);

  color: var(--sut-color);
  font-size: 34px;
}

.hint-title {
  margin-right: auto;
}

.group-box {
  margin: 0 80px;
  display: flex;
  flex-direction: column;
}

.group-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 136px;
}
.top-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.group-title {
  font-size: 54px;
  font-weight: bold;
  margin-bottom: 70px;
}
.child-next {
  width: 34px;
  height: 34px;
  transform: rotateZ(180deg);
}
.value-line {
  display: flex;
  align-items: center;
  height: 26px;
  border-radius: 16px;
  background: var(--line-color);
}

.left-line {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.right-line {
  flex: 1;
  display: flex;
}

.color-line {
  height: 26px;
  /* border-radius: 5px; */
  overflow: visible;
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.jc-start {
  justify-content: flex-start;
}

.color-num {
  position: absolute;
  bottom: 34px;
  /* transform: translateX(-50%); */
  font-weight: bold;
  color: var(--text);
}

.color-span {
  top: -12px;
  width: 6px;
  height: 50px;
  position: absolute;
  background-color: var(--text);
}
.line-zero {
  width: 24px;
  height: 36px;
  margin-bottom: -96px;
  border-radius: 50%;
  border: solid 6px var(--hint-color);
  /* background-color: white; */
}
.scale-box {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  color: var(--hint-color);
}
</style>
