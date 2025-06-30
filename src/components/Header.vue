<template>
  <div class="v-header">
    <img class="v-header-logo" src="@/assets/logo.svg" />
    <span class="v-header-title">{{ props.title }}</span>

    <el-popover placement="bottom-end" width="200px" :offset="8" trigger="click" :show-arrow="false">
      <template #reference>
        <img class="v-header-icon" src="@/assets/notify.png" />
      </template>
      <template #default>
        <div>
          <h1>精神的风景</h1>
          <h1>精神的风景</h1>
          <h1>精神的风景</h1>
          <h1>精神的风景</h1>
        </div>
      </template>
    </el-popover>

    <el-popover placement="bottom-end" :hide-after="0" :offset="8" trigger="hover" :show-arrow="false">
      <template #reference>
        <div class="v-header-user">
          <img class="v-header-user-icon" :src="userIc" />
        </div>
      </template>
      <template #default>
        <div>
          <h3>管理员</h3>
          <p>个人中心</p>
          <p>账号设置</p>
          <p>退出登录</p>
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
const titleStr = ref('');

watch(() => props.title, (value) => {
  titleStr.value = value;
});

onMounted(() => {
  titleStr.value = props.title || '';
});

// watch(route, (newRoute, oldRoute) => {
//   console.log('---> from', oldRoute.fullPath, 'to', newRoute.fullPath);
//   // titleStr.value = newRoute.meta?.title || props.title;
// });

function onBack() {
  if (props.onBack) {
    props.onBack();
  } else {
    router.back();
  }
}
</script>

<style scoped>
.v-header {
  width: 100vw;
  height: var(--header-height);
  top: 0;
  left: 0;
  z-index: 3;
  position: sticky;
  display: flex;
  align-items: center;
  background-color: var(--header-color);
  /* border-bottom: solid 1px #f3f3f3; */
}

.v-header-logo {
  width: 36px;
  height: 36px;
  margin-left: 20px;
  margin-right: 12px;
}

.v-header-title {
  margin-right: auto;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.v-header-icon {
  width: 36px;
  height: 36px;
  padding: 6px;
  margin-left: 12px;
}

.v-header-user {
  margin: 0 20px 0 26px;
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
}

.v-header-user-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
