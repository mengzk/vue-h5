<template>
  <Header title="体质辩证" />
  <div class="v-tongue">
    <span class="tongue-tag">
      <span>您当前体征表现伴随</span>
      <span class="top-constitution">{{ constitution }}</span>
      <span>体质</span>
    </span>
    <div class="tongue-img">
      <img class="img-view" :src="zmImg||empty" alt="正脸照" />
      <img class="img-view" :src="stzImg||empty" alt="舌苔正面照" />
      <img class="img-view" :src="stfImg||empty" alt="舌苔反面照" />
    </div>
    <div class="tongue-text">
      <span class="list-title">体质分析</span>
      <div v-for="text in resultText" :key="text">
        <span>{{ text }}</span>
      </div>
      <div class="list-line"></div>
      <span class="list-title">症状表现</span>
      <div v-for="text in resultText2" :key="text">
        <span>{{ text }}</span>
      </div>
      <div class="list-line"></div>
      <span class="list-title">风险提示</span>
      <div v-for="text in resultText3" :key="text">
        <span>{{ text }}</span>
      </div>
      <div class="list-line"></div>
      <span class="list-title">体质介绍</span>
      <div v-for="text in resultText4" :key="text">
        <span>{{ text }}</span>
      </div>
    </div>
    <div class="tongue-action">
      <button class="btn" @click="gotoNurse">脉象分析</button>
      <button class="btn" @click="gotoDiscern">舌面分析</button>
      <button class="btn btn2" @click="goto28Tongue">体质分析</button>
    </div>
  </div>
</template>

<script setup>
// 体征辩证
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import Header from "@/components/Header.vue";

import useDetection from "@/stores/detection";
import useCommons from "@/stores/common";
import { splitText } from "@/utils";
import empty from "@/assets/img/empty.png";

const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});
const router = useRouter();

const { getTongue } = useDetection();

const constitution = ref("XXX");
const resultText = ref("");
const resultText2 = ref("暂无资料");
const resultText3 = ref("暂无资料");
const resultText4 = ref("暂无资料");
const stzImg = ref("");
const stfImg = ref("");
const zmImg = ref("");

onMounted(() => {
  console.log("onMounted ---> ");
  const info = getTongue() || {};
  // console.log("info", info);
  if (info.detectionImage) {
    const imgObj = info.detectionImage;
    stzImg.value = imgObj.tfImage;
    stfImg.value = imgObj.tbImage;
    zmImg.value = imgObj.ffImage;
  }
  constitution.value = info.physique_name || "XXX";
  resultText.value = splitText(info.physique_analysis || "暂无资料");
  resultText2.value = splitText(info.typical_symptom || "暂无资料");
  resultText3.value = splitText(info.risk_warning || "暂无资料");
  resultText4.value = splitText(info.syndrome_introduction || "暂无资料");
});

function goto28Tongue() {
  const info = getTongue() || {};
  sessionStorage.setItem("chat-text", `请一下解读：${info.physique_name||''}`);
  router.push({ path: "/chat" });
}

// Ai解读报告
function gotoDiscern() {
  router.push({ path: "/tongueAnalyse", query: { tag: 1 } });
}

function gotoFeature() {
  const { setList } = useCommons();
  const list = [];
  list.push({ title: "舌面分析", texts: resultText.value });
  list.push({ title: "症状表现", texts: resultText2.value });
  list.push({ title: "风险提示", texts: resultText3.value });
  list.push({ title: "症状说明", texts: resultText4.value });
  setList(list);
  router.push({ path: "/commons", query: { tag: 2 } });
}

function gotoNurse() {
  const { setList } = useCommons();
  const infos = getTongue().advices || [];
  const list = [];
  infos.forEach((info) => {
    for (let key in info) {
      const arr = info[key];
      if (arr && arr.length > 1) {
        list.push(...arr);
      }
    }
  });
  // console.log("gotoNurse", list);
  setList(list);
  router.push({ path: "/commons", query: { tag: 3 } });
}
</script>

<style scoped>
.v-tongue {
  flex: 1;
  max-height: calc(100vh - 260px);
  margin: 0 80px;
  display: flex;
  flex-direction: column;
}

.tongue-tag {
  /* display: flex; */
  /* flex-direction: row; */
  align-items: baseline;

  color: var(--text);
  font-weight: bold;
}

.top-constitution {
  font-size: 100px;
}

.tongue-img {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 70px;
}

.img-view {
  display: flex;
  margin: 120px 0;
  width: 300px;
  height: 300px;
  border-radius: 8px;
  transform: rotateZ(90deg);
  background-color: #323232;
}

.tongue-text {
  flex: 1;
  overflow-y: scroll;
  background-color: var(--box-color);
  padding: 30px 30px 0 30px;
  border-radius: 8px;

  color: var(--hint-color);
  line-height: 1.4;
}

.list-title {
  color: var(--text);
  font-size: 54px;
  font-weight: bold;
  line-height: 2;
}

.list-line {
  min-height: 80px;
}

/* .tongue-text::-webkit-scrollbar {
  display: none;
} */

.tongue-action {
  margin: 80px 0 130px 0;
  display: flex;
  justify-content: space-around;
}

.btn {
  flex: 1;
  min-width: 300px;
  height: 120px;
  font-size: 44px;
  border-radius: 56px;
  margin-right: 40px;
  border: solid 2px var(--text);
}

.btn2 {
  background-color: var(--text);
  color: var(--bg-color);
}

.btn:active {
  background-color: rgba(255, 255, 255, 0.1);
}
.tongue-action button:last-child {
  margin-right: 0;
}
</style>
