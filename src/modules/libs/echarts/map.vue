<template>
  <div class="v-map">
    <div id="map-view" class="map"></div>
  </div>
</template>

<script setup>
// 体质预警列表
import { ref, onMounted } from 'vue';
import * as ECharts from 'echarts';

import gaoJson from '@/assets/shanghai.json';

// 默认高亮的区域
const defaultHighlightArea = '浦东新区';

// 生成地图数据，为默认高亮区域设置特殊样式
const generateMapData = (geoJson, highlightArea) => {
  return geoJson.features.map(feature => {
    const item = {
      name: feature.properties.name,
      value: feature.properties.adcode || 0
    };
    
    // 为默认高亮区域设置样式
    if (item.name === highlightArea) {
      item.itemStyle = {
        areaColor: '#4791F7', // 高亮颜色
        borderColor: '#6BECF5',
        borderWidth: 2
      };
      item.label = {
        color: '#fff',
        fontWeight: 'bold'
      };
    }
    
    return item;
  });
};

const option = {
  tooltip: {
    trigger: 'item',
    formatter: function(params) {
      return `
        <div style="padding: 10px;">
          <div style="font-weight: bold; margin-bottom: 5px;">${params.name}</div>
          <div>区域编码: ${params.value}</div>
          <div style="margin-top: 5px; font-size: 12px; color: #666;">
            ${params.name === defaultHighlightArea ? '✓ 默认高亮区域' : ''}
          </div>
        </div>
      `;
    },
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#4791F7',
    borderWidth: 1,
    borderRadius: 4,
    textStyle: {
      color: '#333'
    }
  },
  legend: {
    orient: 'horizontal',
    bottom: 10,
    left: 'center',
    data: [
      {
        name: '默认高亮区域',
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12
      },
      {
        name: '普通区域',
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12
      }
    ],
    textStyle: {
      color: '#666',
      fontSize: 12
    }
  },
  visualMap: {
    show: false,
    min: 0,
    max: 1000,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],
    calculable: true,
    inRange: {
      color: ['#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4']
    }
  },
  series: [
    {
      type: "map",
      map: "shanghai",
      data: generateMapData(gaoJson, defaultHighlightArea),
      itemStyle: {
        areaColor: '#4388ED',
        borderColor: '#6BECF5',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffsetX: 0,
        shadowOffsetY: 0
      },
      label: {
        show: true,
        color: '#333',
        fontSize: 12,
        fontWeight: 'normal',
        textShadowBlur: 2,
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowOffsetX: 0,
        textShadowOffsetY: 0
      },
      emphasis: {
        label: {
          show: true,
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 14,
          textShadowBlur: 5,
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffsetX: 0,
          textShadowOffsetY: 0
        },
        itemStyle: {
          areaColor: '#FF9800',
          borderColor: '#FFC107',
          borderWidth: 2,
          shadowBlur: 20,
          shadowColor: 'rgba(255, 152, 0, 0.5)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      // 添加动画效果
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut',
      animationDelay: function(idx) {
        return idx * 10;
      },
      animationDurationUpdate: 500,
      animationEasingUpdate: 'cubicInOut'
    },
  ],
};

let chartIns = null;

onMounted(() => {
  initCharts();
});

function initCharts() {
  const view = document.getElementById('map-view');
  chartIns = ECharts.init(view);

  ECharts.registerMap('shanghai', gaoJson);
  chartIns.setOption(option);
  
  // 监听窗口大小变化，自适应调整
  window.addEventListener('resize', () => {
    chartIns.resize();
  });
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
