<template>
  <div class="v-explain">
    <Header :title="title" />
    <div class="pulse-num">
      <span class="pulse-span">经络分析</span>
      <span class="pulse-num-text">{{ detail.name }} ({{ detail.index }})</span>
    </div>

    <div class="cell-box">
      <span class="cell-title">经络描述</span>
      <div class="img-cell">
        <img class="cell-img" :src="imgUrl" alt="图片" />
        <div class="cell-text">
          <span>{{ detail.walk }}</span>
        </div>
      </div>
    </div>

    <div class="cell-box">
      <span class="cell-title">穴位</span>
      <div class="cell-text">
        <span>{{ detail.walk }}</span>
      </div>
    </div>

    <div class="cell-box">
      <span class="cell-title">表现特征</span>
      <div class="cell-text">
        <span>{{ detail.performance }}</span>
      </div>
    </div>

    <div class="cell-box">
      <span class="cell-title">概要</span>
      <div class="cell-text">
        <span>{{ detail.summary }}</span>
      </div>
    </div>

    <div class="cell-box">
      <span class="cell-title">症状原因</span>
      <div class="cell-text">
        <span>{{ detail.reason }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
// 预警解读
import { ref, onMounted } from "vue";

import Header from "@/components/Header.vue";

import useDetection from "@/stores/detection";
import { getUrlParams } from "@/utils";
// const props = defineProps({ data: { type: Object, required: false }  });

const { getPulse } = useDetection();
const { idx } = getUrlParams();

const jlGif = [
  {name: '心包经', url: 'https://file.jt-health.cn/jt-maizhen/clragqbhbuq4v55glsm0.gif'},
  {name: '肝经', url: 'https://file.jt-health.cn/jt-maizhen/clragqbhbuq4v55glsmg.gif'},
  {name: '肾经', url: 'https://file.jt-health.cn/jt-maizhen/clragqbhbuq4v55glsn0.gif'},
  {name: '脾经', url: 'https://file.jt-health.cn/jt-maizhen/clragqbhbuq4v55glsng.gif'},
  {name: '肺经', url: 'https://file.jt-health.cn/jt-maizhen/clragqbhbuq4v55glso0.gif'},
  {name: '胃经', url: 'https://file.jt-health.cn/image2/clragqbhbuq4v55glsog.gif'},
  {name: '胆经', url: 'https://file.jt-health.cn/image2/clragqbhbuq4v55glsp0.gif'},
  {name: '膀胱经', url: 'https://file.jt-health.cn/jt-maizhen/clragqbhbuq4v55glspg.gif'},
]

const detail = ref({
  describe: "暂无资料",
  reason: "暂无资料",
  refer: "暂无资料",
});
const title = ref("解读");
const imgUrl = ref("");

onMounted(() => {
  // console.log("onMounted ---> ", id);
  const risk = getPulse().meridians || [];
  const item = risk[idx || 0] || {};
  // console.log("detail ---> ", item);
  if (item && item.describe) {
    const desc = item.describe || {};
    desc.index = item.date;
    desc.name = item.name;

    imgUrl.value = jlGif.find(g => g.name === item.name)?.url || "";

    detail.value = desc;

    title.value = `${item.name}解读`;
  }
});

function getStyle() {
  const value = detail.value.index;
  let co = "#00ff66";
  if (value > 50) {
    co = "#cc3333";
  } else if (value > 30) {
    co = "#ffff00";
  }
  return `color: ${co}`;
}
</script>

<style scoped>
.v-explain {
  display: flex;
  flex-direction: column;
}

.pulse-num {
  margin: 56px 0 90px 80px;
  display: flex;
  align-items: baseline;

  color: var(--text);
}

.pulse-span {
  font-size: 56px;
  margin-right: 40px;
}

.pulse-num-text {
  font-size: 80px;
  color: var(--status);
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
  margin-bottom: 46px;
  color: var(--text);
}

.cell-content {
  display: flex;
}

.cell-img {
  width: 250px;
  height: 430px;
  min-width: 250px;
  border-radius: 12px;
  margin-right: 50px;
  background-color: #323232;
}

.cell-text-box {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  color: var(--lab-color);
}

.cell-text-title {
  font-weight: 500;
  color: var(--text);
  margin-bottom: 46px;
}

.img-cell {
  display: flex;
}
.cell-img {
  width: 360px;
  min-width: 360px;
  height: 600px;
  border-radius: 12px;
  margin-right: 32px;
  background-color: #323232;
}
</style>
