<template>
  <div class="page-layout">
    <!-- 左侧：可以滚动的内容区 -->
    <div class="page-main" ref="scrollEl">
      <section v-for="(block, index) in sections" :key="block.key" class="page-section" :data-index="index">
        <h2>{{ block.title }}</h2>
        <p>{{ block.desc }}</p>
      </section>
    </div>

    <!-- 右侧：固定的预览 + 滑动条 -->
    <div class="page-side">
      <div class="preview">
        <transition name="fade">
          <img v-if="currentSection" :key="currentSection.key" :src="currentSection.image" alt="" />
        </transition>
      </div>

      <div class="side-progress">
        <div v-for="(block, index) in sections" :key="block.key" class="progress-dot"
          :class="{ active: index === activeIndex }" @click="scrollTo(index)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const sections = [
  {
    key: 's1',
    title: 'AI 成为可信赖的研发伙伴',
    desc: '大仓库索引、企业级性能、实时更新……',
    image: '/images/trae-enterprise-1.png'
  },
  {
    key: 's2',
    title: '全场景适配',
    desc: 'IDE、插件、CLI，多形态接入现有研发体系。',
    image: '/images/trae-enterprise-2.png'
  },
  {
    key: 's3',
    title: '效能可视化',
    desc: 'AI 生成率、代码量、成本一目了然。',
    image: '/images/trae-enterprise-3.png'
  }
  // ……按需继续加
];

const scrollEl = ref(null);
const activeIndex = ref(0);
const currentSection = computed(() => sections[activeIndex.value]);

let observer;

const setupObserver = () => {
  if (!scrollEl.value) return;

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index || 0);
          activeIndex.value = index;
        }
      });
    },
    {
      root: scrollEl.value, // 只关心左侧滚动容器
      threshold: 0.6        // 超过 60% 可见就算“当前页”
    }
  );

  scrollEl.value
    .querySelectorAll('.page-section')
    .forEach(el => observer.observe(el));
};

const scrollTo = index => {
  if (!scrollEl.value) return;
  const list = scrollEl.value.querySelectorAll('.page-section');
  const target = list[index];
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

onMounted(setupObserver);

onBeforeUnmount(() => {
  observer && observer.disconnect();
});
</script>
<style scoped>
.page-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* 左侧：可滚动区域 */
.page-main {
  flex: 1;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  /* 一屏一屏吸附 */
  scroll-behavior: smooth;
}

.page-section {
  height: 100vh;
  scroll-snap-align: start;
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 右侧：固定在视口里 */
.page-side {
  width: 420px;
  padding: 40px 40px 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
}

/* 设备预览图区域 */
.preview {
  width: 100%;
  height: 70vh;
  border-radius: 16px;
  overflow: hidden;
  background: #05060a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

/* 右侧竖向进度条 */
.side-progress {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-dot {
  width: 6px;
  height: 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.25s ease;
}

.progress-dot.active {
  background: #3579f6;
  height: 40px;
}

/* 图片淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>