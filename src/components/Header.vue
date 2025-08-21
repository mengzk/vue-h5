<template>
  <div class="v-header">
    <div class="v-header-bg" v-if="props.bg">
      <div class="v-header-bg-img"></div>
    </div>
    <div class="v-header-action">
      <img class="v-header-icon" src="@/assets/icon/header_back.png" @click="onBack" />
    </div>
    <span class="v-header-title">{{ props.title }}</span>
    <div class="v-header-menu">
      <slot name="action"></slot>
    </div>
  </div>
  <div class="v-header-height"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  bg: {
    type: Boolean,
    required: false,
    default: true
  },
  back: {
    type: Function,
    required: false,
    default: null
  }
});

// onMounted(() => {});

function onBack() {
  if (props.back) {
    props.back();
  } else {
    router.back();
  }
}
</script>

<style scoped>
.v-header-height {
  width: 1px;
  height: var(--header-height);
}

.v-header {
  width: 100%;
  height: var(--header-height);
  top: 0;
  left: 0;
  z-index: 9;
  position: fixed;
  display: flex;
  align-items: center;
}

.v-header-bg {
  width: 100%;
  height: 100%;
  z-index: -1;
  display: flex;
  position: absolute;
  overflow: hidden;
}

.v-header-bg-img {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/img/app_bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.v-header-icon {
  width: 24px;
  height: 24px;
  margin-left: 8px;
}

.v-header-title {
  flex: 1;
  color: var(--title);
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-header-action {
  min-width: 90px;
}

.v-header-menu {
  min-width: 90px;
  display: flex;
  justify-content: flex-end;
}
</style>
