<template>
  <div class="p-report">
    <Header title="下载报告">
      <template #action>
        <div class="v-toolbar-action" @click="onDownReport">
          <span>下载</span>
        </div>
      </template>
    </Header>
    <div class="scroll-box">
      <GeneratePDF ref="pdfRef" @on-capture="onCapture">
        <div class="user-profile">
          <div>姓名：</div>
          <div>年龄：</div>
          <div>身高：</div>
          <div>体重：</div>
        </div>
        <div>
          
        </div>
      </GeneratePDF>
    </div>
  </div>
</template>

<script setup>
/**
 * 报告页面
 */
import { ref, onMounted } from 'vue';

import Header from '@/components/Header.vue';
import GeneratePDF from '@/components/GeneratePDF.vue';

// const props = defineProps({ data: { type: Object, required: false }  });
const pdfRef = ref(null);
const itemList = ref([{
  label: '基础释义',
  value: ['walk'],
}]);

onMounted(() => {
  // console.log("onMounted ---> ", id);
  const list = getList() || [];
  itemList.value = list;
});

// 下载报告
function onDownReport() {
  console.log('onDownReport');
  if(pdfRef.value) {
    pdfRef.value.onCreate();
  }
}

// 生成报告
function onCapture(blob) {
  console.log('onCapture',);

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'report.pdf';
  a.click();
}

</script>

<style scoped>
.p-report {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.scroll-box {
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.user-profile {
  display: grid;
  padding: 56px 80px;
  grid-gap: 60px 0;
  grid-template-columns: repeat(2, 1fr);
}
.profile-item {
  padding: 10px;

}
</style>
