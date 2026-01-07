<template>
  <div class="v-map">
    <div id="map-view"></div>
  </div>
</template>

<script setup>
// 体质预警列表
import { ref, onMounted } from "vue";
import * as ECharts from "echarts";
import "echarts-gl";

import gaoJson from "@/assets/yantai";
import gaoJson2 from '@/assets/laishan'

const regions = gaoJson.features.map((feature) => {
  return {
    name: feature.properties.name,
    value: feature.properties.adcode,
  };
});

const option = {
  series: [
    {
      type: "map3D",
      map: "yantai",
      data: regions,
      groundPlane: {
        show: false, // 是否显示地面
        color: "#aaa", // 地面颜色
      },
      // 地图的颜色
      itemStyle: {
        color: "#6600ff", // 地图板块的颜色
        opacity: 1, // 图形的不透明度 [ default: 1 ]
        borderWidth: 0.5, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域
        borderColor: "#286ECA", // 图形描边的颜色。[ default: #333 ]
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
          fontSize: 8, // 字体大小
        },
      },
      // hover 高亮时图形和标签的样式
      emphasis: {
        label: {
          // label 高亮时的配置
          show: true,
          textStyle: {
            color: "#fff", // 高亮时标签颜色变为 白色
            fontSize: 15, // 高亮时标签字体 变大
          },
        },
        itemStyle: {
          // itemStyle 高亮时的配置
          color: "#66ffff", // 高亮时地图板块颜色改变
        },
      },
      // 环境贴图
      environment: new ECharts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            // 配置为垂直渐变的背景
            offset: 0,
            color: "#ff6600", // 天空颜色
          },
          {
            offset: 0.5,
            color: "#040829", // 地面颜色
          },
          {
            offset: 1,
            color: "#ff0066", // 地面颜色
          },
        ],
        false
      ),
      // 光照相关的设置
      light: {
        main: {
          // 场景主光源的设置，在 globe 组件中就是太阳光。
          color: "#FF0066", // 主光源的颜色。
          intensity: 1.2, // 主光源的强度。
          shadow: false, // 主光源是否投射阴影。默认关闭。开启阴影可以给场景带来更真实和有层次的光照效果。会增加程序的运行开销。
          shadowQuality: "high", // 阴影的质量。可选'low', 'medium', 'high', 'ultra'
          alpha: 55, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。
          beta: 10, // 主光源绕 y 轴，即左右旋转的角度。
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
  const chart = ECharts.init(view);

  ECharts.registerMap("yantai", gaoJson);
  chart.setOption(option);

  chart.on('click', (res) => {
    const { value, name } = res.data;
    console.log(value, name)
  })
}
</script>

<style scoped>
.v-map {
  width: 900px;
  height: 900px;
  display: flex;
  flex-direction: column;
}
#map-view {
  width: 100%;
  height: 100%;
}
</style>
