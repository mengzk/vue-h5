<template>
  <div class="v-map">
    <div id="map-view3d" class="map"></div>
  </div>
</template>

<script setup>
// 体质预警列表
import { ref, onMounted } from 'vue';
import * as ECharts from 'echarts';

import gaoJson from '@/assets/shanghai.json';

const option = {
  series: [
    {
      type: "map",
      map: "shanghai",
    },
  ],
};

onMounted(() => {
  initCharts();
});


function initCharts() {
  const view = document.getElementById('map-view3d');
  const chart = ECharts.init(view);

  ECharts.registerMap('shanghai', gaoJson);
  chart.setOption(option)
}

</script>

<style scoped>
.v-map {
  width: 900px;
  height: 900px;
  display: flex;
  flex-direction: column;
}
.map {
  width: 100%;
  height: 100%;
}
</style>
