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
  height: 100%;
  display: flex;
  flex-direction: column;
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
