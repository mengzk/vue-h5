<template>
  <Header title="健康指数" />
  <div class="p-index">
    <div class="top-box"></div>
    <div class="icon-grid">
      <template v-for="(item, idx) in list" :key="idx">
        <img v-if="indexNum == idx" class="icon icon2" :src="item.icon" />
        <img v-else class="icon" :src="item.def" />
      </template>
    </div>
    <div class="line-box">
      <div class="color-line" :style="lineBg"></div>
    </div>

    <span class="hint-text">
      <span>健康年龄</span>
      <span class="hint-age">{{ ageNum }}</span>
      <span>岁，超过</span>
      <span class="hint-num">{{ levelNum }}</span>
      <span>%的同龄用户.</span>
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Header from "@/components/Header.vue";

import useDetection from "@/stores/detection";

import idx1Ic from "@/assets/index/index01.png";
import idx2Ic from "@/assets/index/index02.png";
import idx3Ic from "@/assets/index/index03.png";
import idx4Ic from "@/assets/index/index04.png";
import idx5Ic from "@/assets/index/index05.png";
import idx6Ic from "@/assets/index/index06.png";
import idx7Ic from "@/assets/index/index07.png";
import idx10Ic from "@/assets/index/index010.png";
import idx20Ic from "@/assets/index/index020.png";
import idx30Ic from "@/assets/index/index030.png";
import idx40Ic from "@/assets/index/index040.png";
import idx50Ic from "@/assets/index/index050.png";
import idx60Ic from "@/assets/index/index060.png";
import idx70Ic from "@/assets/index/index070.png";

const { getPulse } = useDetection();

const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});

const lineBg = ref({});
const list = [
  {icon: idx10Ic, def: idx1Ic}, 
  {icon: idx20Ic, def: idx2Ic}, 
  {icon: idx30Ic, def: idx3Ic}, 
  {icon: idx40Ic, def: idx4Ic}, 
  {icon: idx50Ic, def: idx5Ic}, 
  {icon: idx60Ic, def: idx6Ic}, 
  {icon: idx70Ic, def: idx7Ic}];
const ageNum = ref(30);
const levelNum = ref(1);
const indexNum = ref(1);

onMounted(() => {
  const pulse = getPulse();
  if (pulse) {
    let level = 100 - pulse.health_risk_index?.index_level || 20;
    levelNum.value = level;
    ageNum.value = pulse.health_age;

    if (level < 20) {
      indexNum.value = 0;
    } else if (level < 30) {
      indexNum.value = 1;
    } else if (level < 50) {
      indexNum.value = 2;
    } else if (level < 60) {
      indexNum.value = 3;
    } else if (level < 70) {
      indexNum.value = 4;
    } else if (level < 80) {
      indexNum.value = 5;
    } else {
      indexNum.value = 6;
    }

    lineBg.value = getLineStyle(level);
  }
});

// 获取线条样式
function getLineStyle(value) {
  let red = "00ff66";
  let yellow = "00ff66";

  if (value > 20) {
    yellow = "ffff00";
    red = "ffff00";
    if (value > 50) {
      red = "cc3333";
    }
  }
  let bg = `linear-gradient(90deg, #00ff33 15%, #${yellow} 70%, #${red} 100%)`;

  return {
    width: `${value}%`,
    background: bg,
  };
}
</script>

<style scoped>
.p-index {
  flex: 1;
  margin: 0 80px;
  display: flex;
  flex-direction: column;
}

.icon-grid {
  justify-content: center;
  align-items: baseline;
  display: grid;
  grid-template-columns: repeat(7, 150px);
  margin-bottom: 70px;
}

.icon-box {
  display: flex;
  justify-content: center;
}

.icon {
  width: 70px;
  /* height: auto; */
  object-fit: contain;
}

.icon2 {
  transform: scale(1.3);
}

.top-box {
  height: 160px;
  margin-top: 20px;
  margin-bottom: 320px;
  border-radius: 8px;
  background: var(--box-color);
}

.line-box {
  display: flex;
  align-items: center;
  height: 20px;
  margin-bottom: 200px;
  border-radius: 10px;
  background: var(--line-color);
}

.color-line {
  height: 20px;
  border-radius: 10px;
  background: var(--lg);
}

.hint-text {
  color: var(--text);
  font-weight: bold;
}

.hint-age {
  font-size: 100px;
}
.hint-num {
  font-size: 110px;
}
</style>
