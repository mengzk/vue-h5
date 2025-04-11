<template>
  <div class="v-pulse" v-if="props.data">
    <div class="pulse-hint">
      <div class="hint-title">越接近0越健康</div>
      <span>低风险</span>
      <div class="color-line hint-line" />
      <span>高风险</span>
    </div>

    <div class="group-box">
      <template v-for="(item, gid) in groupData">
        <div class="group-item">
          <div class="group-title">{{ item.title }}</div>
          <div class="child-box">
            <template v-for="(child, sid) in item.list">
              <div class="child-item">
                <div class="child-title">
                  <span>{{ child.name }}</span>
                  <span>></span>
                </div>
                <div class="child-line">
                  <div class="color-line" :style="getLineStyle(child.value)" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
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

const groupData = ref([
  {
    title: '神经系统', list: [
      { name: '压力', value: 90 },
      { name: '疲劳', value: 20 },
      { name: '睡眠质量', value: 60 },
    ]
  },
  {
    title: '心血管系统', list: [
      { name: '心血管风险', value: 80 },
      { name: '脑血管风险', value: 10 },
      { name: '血压风险', value: 60 },
      { name: '血脂风险', value: 70 },
    ]
  },
]);

// 获取线条样式
function getLineStyle(value) {
  let red = '00ff33';
  
  let yellow = '00ff33';
  if(value > 20) {
    yellow = 'ffff00';

    red = 'ffff00';
    if(value > 50) {
      red = 'ff0066';
    }
  }
  let bg = `linear-gradient(90deg, #00ff33 0%, #${yellow} 50%, #${red} 100%)`;

  return {
    width: `${value}%`,
    background: bg,
  };
}

</script>

<style scoped>
.v-pulse {
  display: flex;
  flex-direction: column;
}

.pulse-hint {
  margin: 0 16px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: var(--box-color);

  color: var(--sut-color);
  font-size: 16px;
  font-weight: 500;
}

.hint-title {
  margin-right: auto;
}
.color-line {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: var(--lg);
}

.hint-line {
  margin: 0 8px;
}

.group-box {
  margin: 0 16px;
  display: flex;
  flex-direction: column;
}

.group-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.group-item {
  display: flex;
  flex-direction: column;
  margin: 26px 0;
}

.child-box {
  display: flex;
  flex-direction: column;
}

.child-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.child-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.child-line {
  display: flex;
  align-items: center;
  height: 8px;
  border-radius: 5px;
  background: var(--line-color);
}
</style>
