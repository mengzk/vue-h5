<template>
  <div>
    <div class="v-tongue" v-if="props.data">

    </div>
    <div v-else>
      <div class="empty">暂无数据</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});

</script>

<style scoped>
.v-tongue {
  display: flex;
  flex-direction: row;
}
</style>
