<template>
  <Header title="表现特征" />
  <div class="v-explain">
    <div class="pulse-num">
      <span class="pulse-span">指数</span>
      <span class="pulse-num-text" :style="getColor()">{{ indexNum }}</span>
    </div>

    <div v-if="detail.walk" class="cell-box">
      <span class="cell-title">基础释义</span>
      <div class="cell-text" v-for="text in detail.walk" :key="text">
        <span>{{ text }}</span>
      </div>
      <div class="cell-text" v-for="text in detail.performance" :key="text">
        <span>{{ text }}</span>
      </div>
    </div>

    <div v-if="detail.refer" class="cell-box">
      <span class="cell-title">基础释义</span>
      <div class="cell-text" v-for="text in detail.refer" :key="text">
        <span>{{ text }}</span>
      </div>
    </div>

    <div class="cell-box">
      <span class="cell-title">评估依据</span>
      <div class="cell-content">
        <!-- <img class="cell-img" :src="img01" alt="图片" /> -->
        <div class="cell-text-box">
          <span class="cell-text-title">{{ detail.name }}</span>
          <div v-for="text in detail.describe" :key="text">
            <span>{{ text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="cell-box">
      <span class="cell-title">可能原因</span>
      <div class="cell-text" v-for="text in detail.reason" :key="text">
        <span>{{ text }}</span>
      </div>
    </div>

    <div v-if="detail.summary" class="cell-box">
      <span class="cell-title">改善建议</span>
      <div class="cell-text" v-for="text in detail.summary" :key="text">
        <span>{{ text }}</span>
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
import img01 from "@/assets/img/h_img01.png";

// const props = defineProps({ data: { type: Object, required: false }  });

const { getPulse } = useDetection();
const { id } = getUrlParams();

const detail = ref({
  name: "XXX",
  performance: "暂无资料",
  describe: "暂无资料",
  reason: "暂无资料",
});
const indexNum = ref(0);

onMounted(() => {
  // console.log("onMounted ---> ", id);
  const list = getPulse().risk || [];
  const item = list.find((_, idx) => idx == id);
  if (item && item.describe) {
    const describe = item.describe;
    for (let key in describe) {
      const value = describe[key];
      if (value.includes("\n")) {
        describe[key] = value.split("\n");
      } else {
        describe[key] = [value];
      }
    }
    describe.name = item.risk_name;
    detail.value = describe;
  }
  indexNum.value = item.index_value;
  
});

function getColor() {
  const num = indexNum.value;
  // console.log("getColor ---> ", num);
  if(num > 20) {
    return 'color: #FFA500;';
  }else if(num < -20) {
    return 'color: #FFA500;';
  }else {
    return 'color: #52c41a;';
  }
}
</script>

<style scoped>
.v-explain {
  display: flex;
  flex-direction: column;
}

.pulse-num {
  position: fixed;
  top: 66px;
  right: 100px;
  z-index: 998;
  display: flex;
  align-items: baseline;

  color: var(--text);
}

.pulse-span {
  margin-right: 20px;
}

.pulse-num-text {
  font-size: 100px;
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
