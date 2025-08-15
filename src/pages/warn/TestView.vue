<template>
  <div class="test">
    <h1>This is an test page</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { uploadImgs } from '../../modules/network/upload';

import Loading from '@/components/widget/loading';
import Dialog from '@/components/widget/dialog';

onMounted(() => {
  // Loading.show('');
  Dialog.show({title: '提示撒', content: '传达啊是打算打算的'})

  setTimeout(() => {
    Loading.hide();
  }, 6000);
});

function onFileChange(e) {
  const files = e.target.files;
  console.log(files);
  const list = [];
  for (let i = 0; i < files.length; i++) {
    list.push(files[i]);
  }

  if(list.length > 0) {
    uploadImgs(list);
  }
}
</script>

<style>
.test {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
