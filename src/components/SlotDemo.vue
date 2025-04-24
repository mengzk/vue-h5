<template>
  <div class="v3-cell">
    <span class="label">{{ props.label }}</span>
    <slot name="value">
      <span class="value">{{ props.value }}</span>
    </slot>

    <div v-if="$slots.hint" class="hint">
      <slot name="hint" />
    </div>
  </div>
</template>

<script setup>
/**
 * @description: 插槽演示组件
 * @param {String} label - 标签
 * @param {String|Number} value - 值
 * @param {String} hint - 提示
 * @example:
 * <Cell label="这是标题" value="这是内容" />
 * 
 * <Cell label="自定义">
      <template #value>
        <strong>自定义内容</strong>
      </template>
    </Cell>

  * <Cell label="提示" hint="这是提示">
      <template #hint>
        <strong>自定义提示</strong>
      </template>
    </Cell>
 */

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  value: {
    type: [String, Number],
    required: false,
  },
  hint: {
    type: String,
    required: false,
  },
});

</script>

<style scoped>
.v3-cell {
  padding: 12px 0;
  display: flex;
  flex-direction: row;
}

.label {
  margin-right: 8px;
  min-width: 88px;
  font-size: 16px;
  color: #666;
}

.value {
  font-size: 16px;
  color: #333;
}
</style>
