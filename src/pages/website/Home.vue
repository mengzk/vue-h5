<template>
  <div class="page-layout">
    <!-- 左侧：可以滚动的内容区 -->
    <div class="page-main" ref="scrollEl">
      <section
        v-for="(block, index) in sections"
        :key="block.key"
        class="page-section"
        :data-index="index"
      >
        <h2>{{ block.title }}</h2>
        <p>{{ block.desc }}</p>
      </section>

      <div class="row-section" id="rowSection">
        <section
          v-for="(block, index) in sections2"
          :key="block.key"
          class="page-section"
          :data-index="index + 3"
        >
          <h2>{{ block.title }}</h2>
          <p>{{ block.desc }}</p>
        </section>
      </div>
      <section
        class="page-section"
        :data-index="6"
      >
        <h2>最后的</h2>
        <p>哈哈哈哈哈哈哈哈</p>
      </section>
    </div>

    <!-- 右侧：固定的预览 + 滑动条 -->
    <div class="page-side">
      <div class="side-progress">
        <div
          v-for="(block, index) in '1234567'"
          :key="block"
          class="progress-dot"
          :class="{ active: index === activeIndex }"
          @click="scrollTo(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

/**
 * 页面滑动逻辑：先垂向滑动，滑动到最后一个元素，改成横向滑动，横向滑动到最后一个元素改成继续垂向滑动，
 * 向上滑动，到横向滑动的第一个元素，改成垂向滑动
 */
const sections = [
  {
    key: "s1",
    title: "AI 成为可信赖的研发伙伴",
    desc: "大仓库索引、企业级性能、实时更新……",
    image: "/images/trae-enterprise-1.png",
  },
  {
    key: "s2",
    title: "全场景适配",
    desc: "IDE、插件、CLI，多形态接入现有研发体系。",
    image: "/images/trae-enterprise-2.png",
  },
  {
    key: "s3",
    title: "效能可视化",
    desc: "AI 生成率、代码量、成本一目了然。",
    image: "/images/trae-enterprise-3.png",
  },
];
const sections2 = [
  {
    key: "r1",
    title: "成为可信赖的研发伙伴1",
    desc: "大仓库索引、企业级性能、实时更新……",
    image: "/images/trae-enterprise-1.png",
  },
  {
    key: "r2",
    title: "全场景适配2",
    desc: "IDE、插件、CLI，多形态接入现有研发体系。",
    image: "/images/trae-enterprise-2.png",
  },
  {
    key: "r3",
    title: "效能可视化3",
    desc: "AI 生成率、代码量、成本一目了然。",
    image: "/images/trae-enterprise-3.png",
  },
];

const scrollEl = ref(null);
const activeIndex = ref(0);

let isDown = false; // 向下滑动
let horizontal = false; // 横向滑动
let observer; //
let onWheel; //

const setupObserver = () => {
  if (!scrollEl.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index || 0);
          activeIndex.value = index;
          horizontal = index >= 3 && index < 6;
        }
      });
    },
    {
      root: scrollEl.value, // 只关心左侧滚动容器
      threshold: 0.5, // 超过 60% 可见就算“当前页”
    }
  );

  scrollEl.value
    .querySelectorAll(".page-section")
    .forEach((el) => observer.observe(el));
};

const scrollTo = (index) => {
  if (!scrollEl.value) return;
  const list = scrollEl.value.querySelectorAll(".page-section");
  const target = list[index];
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

onMounted(() => {
  setupObserver();
  const div = scrollEl.value;

  const rowScene = document.getElementById("rowSection");
  /**
   * 鼠标竖向滚轮转成横向滚动
   * 核心思路：监听 wheel 事件，用 deltaY 去改 scrollLeft ，并阻止默认竖滚行为
   */
  onWheel = (e) => {
    // 只处理竖向滚动量
    if (horizontal && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const scrollLeft = rowScene.scrollLeft;
      const offSise = rowScene.scrollLeft - window.innerWidth*2;
      // console.log(scrollLeft, offSise)

      if((e.deltaY <= 0 && scrollLeft < 1) || (e.deltaY >= 0 && offSise >= 0)) {
        return
      }
      e.preventDefault(); // 阻止默认竖向滚动
      // console.log(e)
      // 用竖向滚动量控制横向
      rowScene.scrollBy({
        top: 0,
        left: Math.round(e.deltaY/10),
        // behavior: "smooth",
      });
    }
  };
  // passive: false 才能 preventDefault
  div.addEventListener("wheel", onWheel, { passive: false });
});

onBeforeUnmount(() => {
  observer && observer.disconnect();
  const div = scrollEl.value;
  div.removeEventListener("wheel", onWheel);
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
.row-section {
  width: 100vw;
  height: 100vh;
  display: flex;
  scroll-snap-align: start;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  /* 一屏一屏吸附 */
  scroll-behavior: smooth;
}
.page-section {
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  scroll-snap-align: start;
  /* padding: 80px 60px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 右侧：固定在视口里 */
.page-side {
  height: 100vh;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 12px;
}

/* 右侧竖向进度条 */
.side-progress {
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
  transition: all 0.2s ease;
}

.progress-dot.active {
  background: #3579f6;
  height: 40px;
}
</style>
