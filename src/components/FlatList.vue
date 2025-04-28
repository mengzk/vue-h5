<template>
  <div class="flat-list" @scroll="onScroll" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <!-- 下拉刷新提示 -->
    <div class="pull-to-refresh" :style="{ height: `${topHeight}px` }">
      {{ refreshText }}
    </div>
    <!-- 列表 -->
    <div class="flat-list-content">
      <slot></slot>
    </div>
    <!-- 上拉加载提示 -->
    <div v-if="isLoading" class="loading-more">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: false,
    default: [],
  },
});

// 下拉刷新
const pullToRefresh = ref(false);
const refreshText = ref('下拉刷新');
const topHeight = ref(0);
const threshold = 90; // 下拉刷新阈值
let startY = 0;

// 上拉加载
const isLoading = ref(false);

// 触摸开始
function onTouchStart(event) {
  startY = event.touches[0].clientY;
}

// 触摸移动
function onTouchMove(event) {
  const currentY = event.touches[0].clientY;
  const diffY = currentY - startY;

  if (diffY > 0 && topHeight.value < threshold) {
    topHeight.value = diffY;
    refreshText.value = diffY >= threshold ? '释放刷新' : '下拉刷新';
  }
}

// 触摸结束
function onTouchEnd() {
  if (topHeight.value >= threshold) {
    pullToRefresh.value = true;
    refreshText.value = '刷新中...';
    topHeight.value = threshold;

    // 模拟刷新完成
    setTimeout(() => {
      pullToRefresh.value = false;
      refreshText.value = '';
      topHeight.value = 0;
    }, 2000);
  } else {
    topHeight.value = 0;
  }
}

// 滚动事件
function onScroll(event) {
  const target = event.target;
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  const clientHeight = target.clientHeight;
  // 判断是否滚动到顶部
  const isFooter = scrollTop + clientHeight >= scrollHeight;
  const loading = isLoading.value;

  // 判断是否滚动到底部
  if (isFooter && !loading) {
    isLoading.value = true;

    // 模拟加载更多
    setTimeout(() => {
      console.log('加载更多数据');
      isLoading.value = false;
    }, 2000);
  }
}
</script>

<style scoped>
.flat-list {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  position: relative;
}

.pull-to-refresh {
  text-align: center;
  font-size: 14px;
  color: #84909D;
  line-height: 90px;
  height: 0;
  overflow: hidden;
  transition: height 0.5s;
}

.flat-list-content {
  display: flex;
  flex-direction: column;
}

.loading-more {
  text-align: center;
  font-size: 14px;
  color: #84909D;
  padding: 12px 0;
}
</style>