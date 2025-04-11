<template>
  <div class="p-common">
    <Header title="舌面分析" />
    <template v-for="group in itemList" :key="group.title">
      <div class="group-box">
        <span class="group-title">{{ group.title }}</span>
        <template v-for="item in group.list" :key="item.value">
          <div class="cell-box">
            <div class="cell-line">
              <span class="cell-name">{{ item.label }}：</span>
              <span class="cell-value">{{ item.value }}</span>
              <span :class="`cell-status ${item.situation == '异常'?'red':'' }`">{{ item.situation }}</span>
            </div>
            <span class="cell-text">{{ item.desc }}</span>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
// 表现特征/调理方法
import { ref, onMounted } from "vue";

import Header from "@/components/Header.vue";

import useDetection from "@/stores/detection";
import { getUrlParams } from "@/utils";

// const props = defineProps({ data: { type: Object, required: false }  });

const { getTongue } = useDetection();
const { id } = getUrlParams();

const itemList = ref([
  {
    title: "基础释义",
    list: ["walk"],
  },
]);

onMounted(() => {
  // console.log("onMounted ---> ", id);
  const list = getTongue().features || [];

  const group = [];
  list.forEach((e) => {
    let arr = [];
    const title = e.feature_category || "";
    const item = group.find((g) => g.title == title);
    if (item) {
      arr = item.list;
    }
    arr.push({
      label: e.feature_group,
      value: e.feature_name,
      situation: e.feature_situation,
      desc: e.feature_interpret,
    });
    if(item) {
      item.list = arr;
    }else {
      group.push({ title, list: arr });
    }
  });

  itemList.value = group;
});
</script>

<style scoped>
.p-common {
  display: flex;
  flex-direction: column;
}
.group-box {
  margin: 0 80px 56px 80px;
  padding: 46px;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  background-color: var(--box-color);
}
.group-title {
  font-size: 72px;
  font-weight: bold;
  margin-bottom: 56px;
  /* color: var(--text); */
  color: var(--status5);
}
.cell-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 46px;
  padding: 32px;
  border-radius: 24px;
  border: solid 3px white;

  line-height: 1.3;
  color: var(--lab-color);
}
.cell-line {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}
.cell-name {
  font-weight: bold;
  color: var(--lab-text);
}
.cell-value {
  font-weight: bold;
  color: var(--text);
}
.cell-status {
  margin-left: auto;
  font-size: 42px;
  color: #00ff66;
}
.cell-status.red {
  color: #cc3333;
}
</style>
