<template>
  <div class="v-head">
    <img class="v-head-logo" src="@/assets/logo.svg" />
    <span class="v-head-title">{{ props.title }}</span>
    <el-popover popper-class="v-popover" placement="bottom-end" :hide-after="0" :offset="10" trigger="hover"
      :show-arrow="false">
      <template #reference>
        <div class="v-head-user">
          <span>{{ titleStr }}</span>
          <img class="v-head-user-icon" :src="userIc" />
        </div>
      </template>
      <template #default>
        <div class="v-user-popover">
          <div class="v-user-popover-info">
            <img class="v-head-user-icon" :src="userIc" />
            <span>{{ titleStr }}</span>
          </div>
          <div class="v-user-popover-item">个人中心</div>
          <div class="v-user-popover-item">账号设置</div>
          <div class="v-user-popover-item">退出登录</div>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
// 顶部工具栏
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import userIc from '../assets/header.png';

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '标题'
  },
  onBack: {
    type: Function,
    required: false,
  }
});

const router = useRouter();
const route = useRoute();
const titleStr = ref('哈哈哈');

onMounted(() => {});

// watch(route, (newRoute, oldRoute) => {
//   console.log('---> from', oldRoute.fullPath, 'to', newRoute.fullPath);
//   // titleStr.value = newRoute.meta?.title || props.title;
// });

</script>

<style scoped>
.v-head {
  width: 100vw;
  height: var(--header-height);
  display: flex;
  align-items: center;
}

.v-head-logo {
  width: 32px;
  height: 32px;
  margin-left: 20px;
  margin-right: 12px;
}

.v-head-title {
  margin-right: auto;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.v-head-user {
  margin: 0 20px 0 26px;
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: white;
}

.v-head-user-icon {
  width: 32px;
  height: 32px;
  margin: 0 6px;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.v-head-user:hover {
  transform: scale(1.1);
}

.v-popover {
  padding: 0 20px !important;
  border-radius: 8px !important;
}

.v-user-popover {
  padding: 0 8px;
  display: flex;
  flex-direction: column;
}

.v-user-popover-info {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
/* 
.v-user-popover-info span {
  margin-left: 12px;
} */

.v-user-popover-item {
  height: 36px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.v-user-popover-item:hover {
  background-color: #f5f7fa;
  color: #409eff;
}
</style>
