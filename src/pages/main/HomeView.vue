<template>
  <div class="home">
    <FlatList>
      <Cell label="这是什么" value="默认展示" />
      <Cell label="这是什么" value="默认展示" />
      <Cell label="这是什么">
        <template #value>
          <strong>自定义Value</strong>
        </template>
      </Cell>
    </FlatList>
  </div>
</template>

<script setup>
import { onMounted, onActivated, onDeactivated, ref } from "vue";
import { useRouter } from "vue-router";

import { Cell, FlatList } from "@/components";

import { getUrlParams } from "@/utils";

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

function gotoAi() {
  sessionStorage.setItem("chat-text", `如何解读： 并给出适当建议`);
  router.push({ path: "/chat" });
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.home-back {
  z-index: 9;
  width: 6.25rem;
  height: 6.25rem;
  margin: 5rem 3.5rem 5rem 5rem;
  border-radius: 2.5rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--box-color);
}

.back-icon {
  width: 4.375rem;
  height: 4.375rem;
}

.value-box {
  flex: 1;
  min-height: 18.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.value-box span:not(:first-child) {
  margin-top: 1.875rem;
}

.value-text {
  font-weight: 500;
  font-size: 3.75rem;
  line-height: 1;
  color: var(--text);
  max-height: 11.25rem;
  overflow-y: hidden;
}

.float-btn {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--theme);
}

/* 响应式调整 */
@media (max-width: 767px) {
  .home-back {
    width: 4.375rem;
    height: 4.375rem;
    margin: 3.125rem 2.1875rem 3.125rem 3.125rem;
    border-radius: 1.75rem;
  }

  .back-icon {
    width: 3.125rem;
    height: 3.125rem;
  }

  .value-text {
    font-size: 2.5rem;
  }

  .float-btn {
    bottom: 3.125rem;
    right: 3.125rem;
    width: 5rem;
    height: 5rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .home-back {
    width: 5rem;
    height: 5rem;
    margin: 3.75rem 2.5rem 3.75rem 3.75rem;
    border-radius: 2rem;
  }

  .back-icon {
    width: 3.5rem;
    height: 3.5rem;
  }

  .value-text {
    font-size: 3rem;
  }

  .float-btn {
    bottom: 3.75rem;
    right: 3.75rem;
    width: 6rem;
    height: 6rem;
  }
}
</style>
