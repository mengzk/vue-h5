<template>
  <div class="slider">
    <div class="slider-track">
      <div class="slide" v-for="n in 4" :key="n">
        {{ n }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  max-width: 600px;
  /* 轮播宽度 */
  height: 300px;
  /* 轮播高度 */
  overflow: hidden;
  margin: 0 auto;
  border-radius: 8px;
}

/* 轨道：宽度 = 张数 * 100% */
.slider-track {
  display: flex;
  width: 400%;
  /* 4 张图，所以 4 * 100% */
  height: 100%;
  animation: slide 16s infinite;
  /* 总时长可按需要调整 */
}

/* 每一张轮播图 */
.slide {
  flex: 0 0 100%;
  /* 每张图宽度 = 容器宽度 */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #fff;
}

/* 你可以在这里用 background-image 替换背景色 */
.slide:nth-child(1) {
  background: #ff6b6b;
}

.slide:nth-child(2) {
  background: #4ecdc4;
}

.slide:nth-child(3) {
  background: #1a535c;
}

.slide:nth-child(4) {
  background: #ffa600;
}

/* 关键帧：控制每一屏停留和切换的时间点 */
@keyframes slide {
  0% {
    transform: translateX(0);
  }

  /* 第1张 */
  20% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-100%);
  }

  /* 第2张 */
  45% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(-200%);
  }

  /* 第3张 */
  70% {
    transform: translateX(-200%);
  }

  75% {
    transform: translateX(-300%);
  }

  /* 第4张 */
  95% {
    transform: translateX(-300%);
  }

  100% {
    transform: translateX(0);
  }

  /* 回到第1张 */
}
</style>