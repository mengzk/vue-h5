<template>
  <div class="v3-slot">
    <span class="label">{{ props.label }}</span>

    <slot name="value">
      <span class="value">{{ props.value }}</span>
    </slot>

    <div v-if="$slots.hint" class="hint">
      <slot name="hint" />
    </div>

    <ul>
      <li v-for="item in items">
        <slot name="item" v-bind="item"></slot>
      </li>
    </ul>

  </div>
</template>

<script setup>
/**
 * @description: 插槽演示组件
 * @param {String|Number} value - 值
 * @param {String} hint - 提示
 * @example:
 * https://cn.vuejs.org/guide/components/slots.html
 * <SlotDemo label="这是标题" value="这是内容" />
 * 
 * <SlotDemo label="自定义">
      <template #value>
        <strong>自定义内容</strong>
      </template>
    </SlotDemo>

  * <SlotDemo label="提示" hint="这是提示">
      <template #hint>
        <strong>自定义提示</strong>
      </template>

      动态插槽名
      <template v-slot:[dynamicSlotName]>
        ...
      </template>

      <!-- 缩写为 -->
      <template #[dynamicSlotName]>
        ...
      </template>
    </SlotDemo>

  * <SlotDemo label="列表">
      <template #item="{ body, username, likes }">
        <div class="item">
          <p>{{ body }}</p>
          <p>by {{ username }} | {{ likes }} likes</p>
        </div>
      </template>
    </SlotDemo>
 */

const props = defineProps({
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
.v3-slot {
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
