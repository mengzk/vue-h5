<template>
  <div class="page home">
    <div class="left-list">
      <template v-for="(item, index) in itemList" :key="index">
        <div class="list-item" @click="onItemTap(index)">
          <img class="item-ic" :src="item.icon" alt="icon" />
          <div class="item-content">
            <span>{{ item.label }}</span>
            <span class="item-value">{{ item.value }}</span>
          </div>
        </div>
      </template>
    </div>
    <div class="list-item" @click="onItemTap(5)">
      <!-- <img class="item-ic" :src="item5.icon" alt="icon" /> -->
      <div class="item-content">
        <span>{{ item5.label }}</span>
        <span class="item-value item-value5">{{ item5.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onActivated, onDeactivated, ref } from "vue";
import { useRouter } from "vue-router";

import Header from '@/components/Header.vue';

import { getPulseReport, getTongueReport } from "@/modules/api";
import { getUrlParams } from "@/utils";
import useDetection from '@/stores/detection';

import robot from "@/assets/robot.png";
import menu1Ic from "@/assets/menu01.png";
import menu2Ic from "@/assets/menu02.png";
import menu3Ic from "@/assets/menu03.png";
import menu4Ic from "@/assets/menu04.png";
import menu5Ic from "@/assets/menu05.png";
import menu6Ic from "@/assets/menu06.png";

const router = useRouter();
const { rid, sid } = getUrlParams();
const { setPulse, hasData, hasData2, setTongue, getPulse } = useDetection();

let pulseData = null;
let tongueData = null;

const item5 = ref({ label: "调理建议", path: "commons", icon: menu6Ic });
const itemList = ref([
  { label: "健康指数", path: "index", icon: menu1Ic },
  { label: "体征数据", path: "alert", icon: menu2Ic },
  { label: "风险指数", path: "risk", icon: menu3Ic },
  { label: "脉搏指数", path: "meridian", icon: menu4Ic },
  { label: "体质辩识", path: "tongue", icon: menu5Ic },
  // { label: "调理建议", path: "meridian", icon: menu6Ic },
]);

onMounted(() => {
  console.log("HomeView ---> ", window.innerHeight, window.innerWidth);

  initData();
});
// onActivated(() => {
//   console.log('组件已激活');
// });

// onDeactivated(() => {
//   console.log('组件已失活');
// });

async function initData() {
  await queryPulseDetail();
  await queryTongueDetail();

  setListData();
}


function onItemTap(index) {
  console.log("onTap --->", index);
  let path = '';
  if(index == 5) {
    path = item5.value.path;
  } else {
    path = itemList.value[index].path;
  }
  if (path) {
    router.push({ path: `/${path}`, query: { id: rid } });
  }
}

function setListData() {

  itemList.value[0].value = pulseData.heart_rate;
  itemList.value[1].value = pulseData.health_age;
  itemList.value[2].value = pulseData.health_risk_index?.degree;
  itemList.value[3].value = pulseData.health_risk_index?.index_value;
  itemList.value[4].value = pulseData.physique;
  item5.value.value = pulseData.report_summary;

  itemList.value = [...itemList.value];
}

async function queryPulseDetail() {
  if (hasData()) {
    pulseData = getPulse();
    return;
  }
  const res = await getPulseReport(rid);
  if (res.code == 0) {
    pulseData = res.data;
    setPulse(res.data);
  }
}

async function queryTongueDetail() {
  if (hasData2()) {
    return;
  }
  const res = await getTongueReport(sid);
  // console.log("queryTongueDetail ---> res", res);
  if (res.code == 0) {
    tongueData = res.data;
    setTongue(res.data);
  }
}

</script>

<style scoped>
.home {
  height: 100vh;
  padding: 0 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.left-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 48px 32px;
  margin-bottom: 48px;
}

.list-item {
  padding: 48px 32px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  background-color: var(--box-color);

  color: var(--text);
  font-size: 44px;
}

.item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;

  color: var(--text);
  font-size: 56px;
  font-weight: 500;
}

.item-ic {
  width: 180px;
  /* height: 150px; */
  padding-right: 24px;
}

.item-value {
  font-size: 44px;
  color: var(--b2-color);
  margin-top: 32px;
}
.item-value5 {
  white-space: wrap;
}
.robot-img {
  width: 330px;
  height: 260px;
}

.right-value {
  margin: 0 32px;
  font-weight: 500;
  font-size: 60px;
  color: var(--val-color);
}
</style>
