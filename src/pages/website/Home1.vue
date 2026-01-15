<template>
  <div class="page home" id="homeBox">
    <img class="home-banner" :src="bg" />
    <div class="home-intro">宣传图</div>
    <div class="home-data"></div>
    <div class="home-scene" id="homeScene">
      <div class="scene scene1">竖向整屏滑动1</div>
      <div class="scene scene2">竖向整屏滑动2</div>
      <div class="scene scene3">竖向整屏滑动3</div>
      <div class="scene scene4">竖向整屏滑动4</div>
    </div>
    <div class="row-scene" id="rowScene">
      <div class="scene scene2">横向整屏滑动1</div>
      <div class="scene scene1">横向整屏滑动2</div>
      <div class="scene scene3">横向整屏滑动3</div>
      <div class="scene scene4">横向整屏滑动4</div>
    </div>

    <div class="home-data"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

import bg from "@/assets/imgs/Wallpaper.jpg";
import bg1 from "@/assets/imgs/Wallpaper1.jpg";
import bg2 from "@/assets/imgs/Wallpaper2.jpg";

let isScrolling = false;
let observer = null;
let onWheel = null;

onMounted(() => {
  init();
});

function init() {
  const div = document.getElementById("homeBox");
  if (!div) return;

  const homeScene = document.getElementById("homeScene");
  if (!homeScene) return;
    /**
     * 监听 homeScene 是否出现在可视区
     * 如果 home-scene 出现在可视区, 则页面切换到 home-scene 
     * 如果位置 大于 home-scene子元素总高, 则切换到 row-scene 区域
     */
   observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('元素出现在窗口中');
          // observer.unobserve(entry.target); // 只想触发一次的话，可以在这里取消观察
          div.scrollTo({
            top: homeScene.offsetTop,
            behavior: "smooth"
          })
        }
      });
    },
    {
      root: null,     // 以窗口为参照
      threshold: 0.2  // 20% 可见时触发
    }
  );
  observer.observe(homeScene);


  // 
  const rowScene = document.getElementById("rowScene");
  if (!rowScene) return;

  /**
   * 鼠标竖向滚轮转成横向滚动
   * 核心思路：监听 wheel 事件，用 deltaY 去改 scrollLeft ，并阻止默认竖滚行为
   */
  onWheel = (e) => {
    // 只处理竖向滚动量
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && div.scrollTop > (window.screen.height - 67)*2) {
      e.preventDefault(); // 阻止默认竖向滚动
      rowScene.scrollBy({
        top: 0,
        left: e.deltaY,
        behavior: "smooth"
      }); // 用竖向滚动量控制横向
    }
  };
  // passive: false 才能 preventDefault
  div.addEventListener('wheel', onWheel, { passive: false });
}
onBeforeUnmount(() => {
  if (observer) observer.disconnect();

  if (onWheel) {
    const rowScene = document.getElementById("rowScene");
    if (!rowScene) return;
    rowScene.removeEventListener('wheel', onWheel);
  }
});
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
