<template>
  <div class="v-header">
    <div class="v-header-action">
      <img class="v-header-logo" src="@/assets/logo.svg" @click="onBack" />
    </div>

    <span class="v-header-title">{{ props.title }}</span>
    <div class="v-header-menu">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  onBack: {
    type: Function,
    required: false,
  }
});

const router = useRouter();

// onMounted(() => {});

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
  z-index: 9;
  position: sticky;
  display: flex;
  align-items: center;
  /* background-color: var(--header-bg); */
}

.v-header-logo {
  width: 20px;
  height: 20px;
  margin-left: 12px;
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
  min-width: 100px;
}
.v-header-menu {
  min-width: 100px;
  display: flex;
  justify-content: flex-end;
}
</style>
