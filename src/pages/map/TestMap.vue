<template>
  <div class="test-map">
    <h1 class="title">ECharts 地图默认区域高亮测试</h1>
    
    <div class="map-container">
      <h2 class="subtitle">2D 地图测试</h2>
      <div class="map-wrapper">
        <!-- <Map2D /> -->
      </div>
    </div>
    
    <div class="map-container">
      <h2 class="subtitle">3D 地图测试</h2>
      <div class="map-wrapper map3d-wrapper">
        <Map3D />
      </div>
    </div>
  </div>
</template>

<script setup>
import Map2D from '@/modules/libs/echarts/map.vue';
import Map3D from '@/modules/libs/echarts/map3d.vue';
</script>

<style scoped>
.test-map {
  padding: 2rem;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 3rem;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  color: #666;
  margin-bottom: 1rem;
}

.map-container {
  margin-bottom: 4rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.map-wrapper {
  width: 100%;
  height: 600px;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.map3d-wrapper {
  background-color: #000;
}
</style>