<template>
  <div class="base-info">
    <el-form class="form" label-width="80px" :rules="rules">
      <el-form-item class="item-cell" label="品牌名称" prop="name">
        <el-input v-model.trim="form.name" maxlength="20" style="width: 300px;" placeholder="请输入品牌名称" show-word-limit />
      </el-form-item>

      <el-form-item class="item-cell" label="行业" prop="industry">
        <el-select v-model="form.industry" style="width: 300px;" placeholder="请选择状态">
          <el-option v-for="item in industrys" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <div class="note-box">
        <span class="box-label">我的笔记</span>
        <div>
          <div class="add-btn">
            <span>添加笔记</span>
          </div>

          <template v-for="(item, index) in itemList" :key="index">
            <div class="account-box">
              <img class="account-avatar" :src="item.avatar" alt="账号头像" />
              <div class="account-info">
                <span class="account-name">{{ item.name }}</span>
                <span>小红书账号: {{ item.uid }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </el-form>

    <DialogAddNote :show="showAddNote" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// import { useRouter } from "vue-router";

import DialogAddNote from "./component/DialogAddNote.vue";

const form = ref({
  name: '',
  industry: '',
});
const rules = ref({
  name: [
    { required: true, message: '请输入知识库名称', trigger: 'blur' },
    { max: 20, message: '名称不能超过20个字符', trigger: 'blur' }
  ],
  industry: [
    { required: true, message: '请选择行业', trigger: 'change' }
  ]
});

const industrys = ref([
  { key: '1', label: '教育', value: 'education' },
  { key: '2', label: '科技', value: 'technology' },
  { key: '3', label: '医疗', value: 'healthcare' },
  { key: '4', label: '金融', value: 'finance' },
]);
const showAddNote = ref(false);
const itemList = ref([
  {
    name: '张三',
    avatar: 'https://example.com/avatar.jpg',
    uid: '123456',
  },
  {
    name: '张三',
    avatar: 'https://example.com/avatar.jpg',
    uid: '123456',
  }
]);

onMounted(() => { });
</script>

<style scoped>
.base-info {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.item-cell {
  margin-bottom: 24px;
}

.note-box {
  display: flex;
  /* align-items: center; */
}

.box-label {
  min-width: 80px;
  color: #232323;
  font-size: 16px;
}

.add-btn {
  color: #3579F6;
  font-size: 14px;
}

.account-box {
  margin: 12px 0;
  display: flex;
  align-items: center;
}

.account-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
  background-color: antiquewhite;
}

.account-info {
  display: flex;
  flex-direction: column;

  color: #878787;
  font-size: 14px;
}

.account-name {
  color: #333;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}
</style>
