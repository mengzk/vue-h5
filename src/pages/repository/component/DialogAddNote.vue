<template>
  <el-dialog v-model="localShow" :title="form.id ? '编辑笔记' : '新增笔记'" width="560px" @close="onClose">
    <el-form class="content" ref="formRef" :model="form" :rules="rules">
      <el-form-item class="item-url" label="主页地址" prop="url">
        <el-input class="input" v-model="form.url" maxlength="300" clearable />
      </el-form-item>
      <div class="account-box" v-if="itemData">
        <img class="account-avatar" :src="itemData.avatar" alt="账号头像" />
        <div class="account-info">
          <span class="account-name">{{ itemData.name }}</span>
          <span>小红书账号: {{ itemData.uid }}</span>
        </div>
      </div>
      <el-row>
        <el-form-item class="item-date-box" label="笔记创建时间:" prop="status">
          <el-select v-model="form.status" placeholder="不限" style="width: 150px">
            <el-option label="不限" value="all" />
            <el-option label="指定时间" value="date" />
          </el-select>
        </el-form-item>
        <el-form-item class="item-date" v-if="form.status == 'date'" prop="date">
          <el-date-picker v-model="form.date" type="date" placeholder="年/月/日" style="width: 200px"
            :disabled-date="disabledDate" />
          <span class="date-end">至今</span>
        </el-form-item>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onCommit">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

// 
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => { }
  }
})
// 
const emit = defineEmits(['update', 'close'])

const localShow = ref(props.show)
watch(
  () => props.show,
  (newVal) => {
    localShow.value = newVal
    if (formRef.value) {
      formRef.value.clearValidate()
    }
  }
)
const formRef = ref(null)
const form = ref({ id: 0, url: '', status: 'all', date: '' })
const rules = {
  url: [
    { required: true, message: '请输入主页地址', trigger: 'blur' },
    { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择笔记创建时间', trigger: 'change' },
  ],
  date: [
    { required: true, message: '请选择笔记创建时间', trigger: 'change' },
  ]
}
const itemData = ref({
  name: '张三',
  avatar: 'https://example.com/avatar.jpg',
  uid: '123456',
})

// onMounted(() => {  })

const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

function onCommit() {
  const formEl = formRef.value
  if (!formEl) {
    console.warn('formRef is not defined')
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      emit('update', form.value)
    } else {
      console.warn('Form validation failed')
    }
  })
}
function onClose() {
  emit('close')
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 20px;
}

.item-url {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input {
  width: 460px;
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

.item-date-box {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item-date {
  margin-top: 32px;
  margin-left: 20px;
}

.date-end {
  margin-left: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  margin-top: 26px;
}
</style>
