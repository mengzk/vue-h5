<template>
  <div class="page home">
    <img class="home-banner" :src="bg" />
    <div class="home-intro">宣传图</div>
    <div class="home-data"></div>
    <div class="home-scene">
      <div class="scene scene1">竖向整屏滑动1</div>
      <div class="scene scene2">竖向整屏滑动2</div>
      <div class="scene scene3">竖向整屏滑动3</div>
      <div class="scene scene4">竖向整屏滑动4</div>
    </div>
    <div class="row-scene">
      <div class="scene scene2">横向整屏滑动1</div>
      <div class="scene scene1">横向整屏滑动2</div>
      <div class="scene scene3">横向整屏滑动3</div>
      <div class="scene scene4">横向整屏滑动4</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import bg from "@/assets/imgs/Wallpaper.jpg";
import bg1 from "@/assets/imgs/Wallpaper1.jpg";
import bg2 from "@/assets/imgs/Wallpaper2.jpg";

onMounted(() => { });
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;

  font-size: 50px;
}

.home-banner {
  top: 67px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 66px);
  position: fixed;
  background-color: #FF6600;
}

.home-intro {
  z-index: 3;
  width: 100vw;
  min-height: calc(100vh - 66px);
  background-color: #FF0066;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-data {
  z-index: 3;
  width: 100vw;
  min-height: calc(100vh - 66px);
  background-color: transparent;
  /* background-color: #6600FF; */
}

.home-scene {
  z-index: 3;
  width: 100vw;
  min-height: calc(100vh - 66px);

  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
.row-scene {
  z-index: 3;
  width: 100vw;
  min-height: calc(100vh - 66px);
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}
.scene {
  min-width: 100vw;
  height: calc(100vh - 66px);
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scene1 {
  background-color: #00FF66;
}

.scene2 {
  background-color: #FF6600;
}

.scene3 {
  background-color: #0066FF;
}

.scene4 {
  background-color: #FF0066;
}
</style>
