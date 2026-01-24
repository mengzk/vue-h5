<template>
  <div class="v3-label">
    <div class="v3-label-line"></div>
    <h3 class="v3-label-text">{{ props.text }}</h3>
    <slot name="desc">
      <span class="v3-label-desc">{{ props.desc }}</span>
    </slot>
  </div>
</template>

<script setup>
/**
 * @description: Cell 组件
 * @param {String} label - 标签
 * @param {String|Number} value - 值
 * @param {String} hint - 提示
 * @example:
 * <Cell label="这是标题" value="这是内容" />
 * <Cell label="自定义">
      <template #value>
        <strong>自定义内容</strong>
      </template>
    </Cell>
 */

const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
});

</script>

<style scoped>
.v3-label {
  display: flex;
  align-items: center;
}
.v3-label-line {
  width: 3px;
  height: 18px;
  border-radius: 3px;
  background-color: var(--primary);
}
.v3-label-text {
  margin-right: 8px;
  font-size: 18px;
}

.v3-label-desc {
  margin-left: 8px;
  font-size: 12px;
  color: #766776;
}
</style>
