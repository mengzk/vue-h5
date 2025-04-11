<template>
  <div class="page home">
    <div class="home-back" @click="onBack">
      <img class="back-icon" :src="backIc" />
    </div>
    <div class="home-left">
      <canvas id="bg-canvas" :height="SH" :width="SW"></canvas>
      <div ref="listRef" class="left-list">
        <template v-for="(item, index) in itemList" :key="index">
          <div
            :class="`list-item ${curIndex == index ? 'active' : ''}`"
            :style="item.style"
            @click="onItemTap(index)"
          >
            <span>{{ item.label }}</span>
            <img class="item-ic" v-if="item.icon" :src="item.icon" alt="icon" />
          </div>
        </template>
      </div>
    </div>
    <div class="home-right">
      <!-- <img class="robot-img" v-if="!valueStr" :src="robot" alt="logo" /> -->
      <div class="right-value" @click="onItemClick()">
        <div class="value-box">
          <template v-for="item in getItemValue()" :key="item">
            <span class="value-text">{{ item }}</span>
          </template>
        </div>
        <img class="next-icon" :src="next6Ic" alt="icon" />
      </div>
      <div class="float-btn" @click="gotoAi">AI</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onActivated, onDeactivated, ref } from "vue";
import { useRouter } from "vue-router";

import { getPulseReport, getTongueReport } from "@/modules/api";
import { getUrlParams } from "@/utils";
import useDetection from "@/stores/detection";

import backIc from "@/assets/arrow.png";
import robot from "@/assets/robot.png";
import menu1Ic from "@/assets/menu01.png";
import menu2Ic from "@/assets/menu02.png";
import menu3Ic from "@/assets/menu03.png";
import menu4Ic from "@/assets/menu04.png";
import menu5Ic from "@/assets/menu05.png";
import menu6Ic from "@/assets/menu06.png";
import next6Ic from "@/assets/arrow.png";

const router = useRouter();
const { rid, sid } = getUrlParams();
const { setPulse, hasData, hasData2, setTongue, getPulse } = useDetection();

let pulseData = null;
let tongueData = null;
const SH = window.screen.height;
const SW = window.screen.width;
const height2 = window.innerHeight; //1920
const width2 = window.innerWidth;
// 半径
const radius = 800;

const listRef = ref(null);
const curIndex = ref(0);
const hasNext = ref(true);
let lastScrollTop = 0;

const itemList = ref([
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "健康指数", path: "index", icon: menu1Ic, style: "" },
  { label: "体征数据", path: "alert", icon: menu2Ic, style: "" },
  { label: "体质辩识", path: "tongue", icon: menu5Ic, style: "" },
  { label: "经络分析", path: "meridian", icon: menu4Ic, style: "" },
  { label: "风险指数", path: "risk", icon: menu3Ic, style: "" },
  { label: "调理建议", path: "nurse", icon: menu6Ic, style: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
  { label: "", path: "" },
]);

onMounted(() => {
  console.log("HomeView ---> ", window.innerHeight, window.innerWidth);
  onTranslate();
  onDraw();

  queryPulseDetail();
  queryTongueDetail();

  listRef.value.addEventListener("scroll", getPosition);
});

onActivated(() => {
  console.log("组件已激活");
  const top = lastScrollTop;
  if (top > 0) {
    listRef.value.scrollTo({ top });
  }
});

onDeactivated(() => {
  console.log("组件已失活");
});

async function queryPulseDetail() {
  if (hasData()) {
    pulseData = getPulse();
  } else if (rid) {
    const res = await getPulseReport(rid);
    if (res.code == 0) {
      setPulse(res.data);
      pulseData = res.data;
    }
  }
  setListValue();
}

async function queryTongueDetail() {
  if (hasData2()) {
    return;
  }
  if (sid) {
    const res = await getTongueReport(sid);
    // console.log("queryTongueDetail ---> res", res);
    if (res.code == 0) {
      tongueData = res.data;
      setTongue(res.data);
    }
  }
}

// 现实文案
function getItemValue() {
  const list = itemList.value;
  const item = list[curIndex.value] || {};
  const value = item.value || "";
  if (value.includes("&@&")) {
    return value.split("&@&");
  }
  return [value];
}

function onItemClick() {
  // console.log("onChangeItem --->");
  onItemTap(curIndex.value);
}

function onItemTap(index) {
  const path = itemList.value[index].path;
  if (path) {
    router.push({ path: `/${path}`, query: { id: rid } });
  }
}

function onDraw() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  // ctx.beginPath();
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.arc(
    -1 * radius + width2 / 2,
    height2 / 2,
    radius,
    Math.PI / -2,
    Math.PI / 2
  );
  ctx.fill();
}

// 位置计算
function onTranslate() {
  const list = itemList.value;
  itemList.value = [...list];
  listRef.value.scroll({ top: 20, behavior: "smooth" });
}

// 计算位置 - 旋转加偏移(不是根据上面的园形)
function getPosition(e) {
  const count = itemList.value.length;
  const { scrollTop, scrollHeight } = e.target;
  lastScrollTop = scrollTop;
  const itemHeight = scrollHeight / count;
  const center = height2 / 2 + scrollTop;
  const index = Math.floor(center / itemHeight);
  if (index > 3 && index < 10 && index != curIndex.value) {
    curIndex.value = index;
    // hasNext.value = index > 6;
    // console.log("getPosition --->", center, index);
  }
  const childs = itemList.value;
  for (let i = 0; i < count; i++) {
    const item = childs[i];
    const itemValue = itemList.value[i].path;
    if (itemValue == "") {
      continue;
    }
    const itemC = itemHeight * (i + 0.5);
    const deg = (itemC > center ? center - itemC : itemC - center) * 0.12;
    const num = Math.cos(deg * (Math.PI / 180)) * radius - radius;
    item.style = `transform: rotate(0deg) translate(${num}px, 0)`;
  }
  itemList.value = [...childs];
}

function setListValue() {
  if (pulseData) {
    const risk3 = pulseData.health_risk_index || {};
    const newList = [...itemList.value];
    newList[4].value = `健康年龄：${pulseData.health_age}`;
    newList[5].value = `血氧：${pulseData.blood_oxygen}&@&心率：${pulseData.heart_rate}`;
    newList[6].value = pulseData.physique;
    newList[7].value = `风险指数：${risk3.index_value}`;
    newList[8].value = risk3.degree;
    newList[9].value = pulseData.report_summary;

    itemList.value = newList;
  }
}
function onBack() {
  if (window.ql) {
    window.ql.close();
  } else {
    console.log("--------> app close not found");
  }
}

function gotoAi() {
  sessionStorage.setItem("chat-text", `如何解读：${pulseData?.physique||''} 并给出适当建议`);
  router.push({ path: "/chat" });
}
</script>

<style scoped>
.home {
  height: 100vh;
  flex-direction: row;
}

#bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.home-back {
  z-index: 9;
  width: 100px;
  height: 100px;
  margin: 80px 56px 80px 80px;
  border-radius: 40px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--box-color);
}
.back-icon {
  width: 70px;
  height: 70px;
}
.home-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: var(--box-color); */
}

.left-list {
  z-index: 6;
  overflow-y: scroll;
  padding-right: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.left-list::-webkit-scrollbar {
  display: none;
}

.list-item {
  height: 10vh;
  min-height: 10vh;
  margin: 16px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;

  color: var(--date-color);
  font-size: 44px;
  white-space: nowrap;
}

.list-item.active {
  color: var(--text);
  font-size: 50px;
}

.item-ic {
  width: 200px;
  height: 200px;
  margin-left: 36px;
}

.home-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}

.robot-img {
  width: 330px;
  height: 260px;
}

.right-value {
  display: flex;
  align-items: center;
  padding: 0 48px;
  z-index: 3;
}
.value-box {
  flex: 1;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.value-box span:not(:first-child) {
  margin-top: 30px;
}
.value-text {
  /* text-align: center; */
  font-weight: 500;
  font-size: 60px;
  line-height: 1;
  color: var(--text);
  max-height: 180px;
  overflow-y: hidden;
}

.next-icon {
  width: 64px;
  height: 64px;
  /* margin-left: 36px; */
  transform: rotateZ(180deg);
}
.float-btn {
  position: fixed;
  bottom: 80px;
  right: 80px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--theme);
}
</style>
