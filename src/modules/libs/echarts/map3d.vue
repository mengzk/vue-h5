<template>
  <div class="v-map">
    <div id="map-view"></div>
    <div class="back-btn" v-if="!isFirst" @click="onBack">上一级</div>
  </div>
</template>

<script setup>
// 体质预警列表
import { ref, onMounted } from "vue";
import * as ECharts from "echarts";
import "echarts-gl";
// https://geo.datav.aliyun.com/areas_v3/bound/370613.json
import gaoJson from "@/assets/yantai";
import gaoJson2 from "@/assets/laishan";

let chartIns = null;
const isFirst = ref(true);

// 默认高亮的区域
const defaultHighlightArea = '莱山区';

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
  series: [
    {
      type: "map3D",
      map: "yantai",
      data: [],
      groundPlane: {
        show: false, // 是否显示地面
        color: "#000", // 地面颜色
      },
      // 地图的颜色
      itemStyle: {
        color: "#4388ED", // 地图板块的颜色
        opacity: 1, // 图形的不透明度 [ default: 1 ]
        borderWidth: 1, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域
        borderColor: "#6BECF5", // 图形描边的颜色。[ default: #333 ]
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffsetX: 0,
        shadowOffsetY: 0
      },
      // 标签的相关设置
      label: {
        show: true, // (地图上的城市名称)是否显示标签
        distance: 5,
        formatter: function (params) {
          return params.name ? params.name : " ";
        },
        textStyle: {
          // 标签的字体样式
          color: "#fff", // 地图初始化区域字体颜色
          fontSize: 12, // 字体大小
          fontWeight: 'normal',
          textShadowBlur: 5,
          textShadowColor: 'rgba(0, 0, 0, 0.8)',
          textShadowOffsetX: 0,
          textShadowOffsetY: 0
        },
      },
      // hover 高亮时图形和标签的样式
      emphasis: {
        label: {
          // label 高亮时的配置
          show: true,
          textStyle: {
            color: "#fff", // 高亮时标签颜色变为 白色
            fontSize: 16, // 高亮时标签字体 变大
            fontWeight: 'bold',
            textShadowBlur: 10,
            textShadowColor: 'rgba(0, 0, 0, 0.8)',
            textShadowOffsetX: 0,
            textShadowOffsetY: 0
          },
        },
        itemStyle: {
          // itemStyle 高亮时的配置
          color: "#4791F7", // 高亮时地图板块颜色改变
          borderColor: "#FFC107",
          borderWidth: 2,
          shadowBlur: 20,
          shadowColor: 'rgba(255, 152, 0, 0.5)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        },
      },
      // 添加动画效果
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut',
      animationDelay: function(idx) {
        return idx * 10;
      },
      animationDurationUpdate: 500,
      animationEasingUpdate: 'cubicInOut',
      // 增强3D效果
      boxHeight: 50, // 地图高度
      regionHeight: 10, // 区域高度
      // 相机位置
      viewControl: {
        projection: 'perspective',
        autoRotate: true,
        autoRotateSpeed: 5,
        zoomSensitivity: 1,
        minDistance: 100,
        maxDistance: 500,
        minAlpha: 30,
        maxAlpha: 60,
        minBeta: -30,
        maxBeta: 30,
        center: [0, 0, 100],
        distance: 200
      },
      // 环境贴图
      // environment: new ECharts.graphic.LinearGradient(
      //   0,
      //   0,
      //   0,
      //   1,
      //   [
      //     {
      //       // 配置为垂直渐变的背景
      //       offset: 0,
      //       color: "#ffffff", // 天空颜色
      //     },
      //     {
      //       offset: 0.5,
      //       color: "#121212", // 地面颜色
      //     },
      //     {
      //       offset: 1,
      //       color: "#000000", // 地面颜色
      //     },
      //   ],
      //   false
      // ),
      // 光照相关的设置
      light: {
        main: {
          // 场景主光源的设置，在 globe 组件中就是太阳光。
          color: "#ffffff", // 主光源的颜色。
          intensity: 1, // 主光源的强度。
          shadow: false, // 主光源是否投射阴影。默认关闭。开启阴影可以给场景带来更真实和有层次的光照效果。会增加程序的运行开销。
          shadowQuality: "high", // 阴影的质量。可选'low', 'medium', 'high', 'ultra'
          alpha: 60, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。
          beta: 30, // 主光源绕 y 轴，即左右旋转的角度。
        },
        ambient: {
          // 全局的环境光设置。
          color: "white", // 环境光的颜色。[ default: #fff ]
          intensity: 0.5, // 环境光的强度。[ default: 0.2 ]
        },
      },
    },
  ],
};

onMounted(() => {
  initCharts();
});

function initCharts() {
  const view = document.getElementById("map-view");
  chartIns = ECharts.init(view);

  updateMap("yantai", gaoJson);

  chartIns.on("click", (res) => {
    const { value, name } = res.data;
    console.log(value, name);
    if (value == 370613) {
      updateMap("laishan", gaoJson2);
      isFirst.value = false;
    }
  });
}

function updateMap(name, gaoData) {
  ECharts.registerMap(name, gaoData);

  option.series[0].map = name;
  option.series[0].data = gaoData.features.map((feature) => {
    const item = {
      name: feature.properties.name,
      value: feature.properties.adcode,
    };
    
    // 为默认高亮区域设置样式
    if (item.name === defaultHighlightArea) {
      item.itemStyle = {
        color: '#ff0066', // 高亮颜色
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
  chartIns.setOption({ ...option });
}

function onBack() {
  isFirst.value = true;
  updateMap("yantai", gaoJson);
}
</script>

<style scoped>
.v-map {
  width: 900px;
  height: 900px;
  display: flex;
  flex-direction: column;
  background-color: black;
}
#map-view {
  width: 100%;
  height: 100%;
}
.back-btn {
  position: fixed;
  right: 60px;
  bottom: 120px;
  background-color: red;
}
</style>
