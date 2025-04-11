<template>
  <div class="v-explain">
    <Header :title="title" />
    <div class="pulse-num">
      <span class="pulse-span">风险等级</span>
      <span class="pulse-num-text">{{ detail.degree }} ({{ detail.index }})</span>
    </div>

    <div class="cell-box">
      <span class="cell-title">风险描述</span>
      <div class="cell-text">
        <span>{{ detail.describe }}</span>
      </div>
    </div>

    <div class="cell-box">
      <span class="cell-title">诊断参照</span>
      <div class="cell-text">
        <span>{{ detail.refer }}</span>
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

const detail = ref({
  describe: "暂无资料",
  reason: "暂无资料",
  refer: "暂无资料",
});
const title = ref("说明");

onMounted(() => {
  // console.log("onMounted ---> ", id);
  const risk = getPulse().risk || [];
  const item = risk[idx || 0] || {};
  // console.log("detail ---> ", item);
  if (item && item.describe) {
    const desc = item.describe || {};
    desc.index = item.index_value;
    desc.degree = item.degree;

    detail.value = desc;

    title.value = `${item.risk_name}说明`;
  }
});

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
  color: var(--status2);
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
</style>
