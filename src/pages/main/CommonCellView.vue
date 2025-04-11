<template>
  <div class="p-common">
    <Header :title="titles[tag||0]"/>
    <template v-for="item in itemList" :key="item.name">
      <div class="cell-box">
        <span class="cell-title">{{item.title}}</span>
        <div class="cell-text" v-for="text in item.texts" :key="text">
          <span>{{ text }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
// 表现特征/调理方法
import { ref, onMounted } from 'vue';

import Header from '@/components/Header.vue';

import useCommons from '@/stores/common';
import { getUrlParams } from '@/utils';

// const props = defineProps({ data: { type: Object, required: false }  });

const { getList } = useCommons();
const { id, tag=0 } = getUrlParams();

const titles = ['','', '舌苔分析', '体质分析', '']
const itemList = ref([{
  label: '基础释义',
  value: ['walk'],
}]);

onMounted(() => {
  // console.log("onMounted ---> ", id);
  const list = getList() || [];
  itemList.value = list;
});

</script>

<style scoped>
.p-common {
  display: flex;
  flex-direction: column;
}

.cell-box {
  margin: 0 80px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;

  line-height: 1.3;
  color: var(--lab-color);
}

.cell-title {
  font-size: 54px;
  font-weight: bold;
  margin-bottom: 36px;
  color: var(--text);
}
</style>
