<template>
  <div class="page home">
    <div class="home-back" @click="onBack">
      <img class="back-icon" :src="backIc" />
    </div>
    <div class="float-btn" @click="gotoAi">AI</div>
  </div>
</template>

<script setup>
import { onMounted, onActivated, onDeactivated, ref } from "vue";
import { useRouter } from "vue-router";

import { getUrlParams } from "@/utils";

import backIc from "@/assets/arrow.png";

const router = useRouter();
const { rid, sid } = getUrlParams();

onMounted(() => {
  console.log("HomeView ---> ", window.innerHeight, window.innerWidth);
  
});

onActivated(() => {
  console.log("组件已激活");
  
});

onDeactivated(() => {
  console.log("组件已失活");
});

function onBack() {
  if (window.ql) {
    window.ql.close();
  } else {
    console.log("--------> app close not found");
  }
}

function gotoAi() {
  sessionStorage.setItem("chat-text", `如何解读： 并给出适当建议`);
  router.push({ path: "/chat" });
}
</script>

<style scoped>
.home {
  height: 100vh;
  flex-direction: row;
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
