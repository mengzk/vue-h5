<template>
  <el-dialog v-model="localShow" title="新增角色" width="600px" @close="onClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="选择租户" prop="tenant">
        <el-input v-model="form.tenant" />
      </el-form-item>

      <el-form-item label="选择角色" prop="rules">
        <el-input v-model="form.rules" />
      </el-form-item>
      <!-- <el-form-item label="选择角色" prop="rules">
          <el-input v-model="form.rules" type="textarea" :rows="3" />
        </el-form-item> -->
      <!-- <el-form-item label="状态">
          <el-switch v-model="form.status" />
        </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onCommit">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch, reactive } from 'vue'

  const emit = defineEmits(['submit', 'close'])
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  // 本地状态，用于代理 props.show
  const localShow = ref(props.show)

  // 监听 props.show 的变化，更新 localShow
  watch(
    () => props.show,
    (newVal) => {
      localShow.value = newVal
    }
  )
  const formRef = ref()
  const form = reactive({
    id: '',
    name: '',
    tenant: '',
    rules: ''
    // status: true
  })
  const rules = ref({
    name: [
      { required: true, message: '请输入角色名称', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    tenant: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
  })

  onMounted(() => {
    console.log('DialogRuleEdit component mounted')
  })

  function onCommit() {
    const form = formRef.value
    if (!form) {
      console.error('formRef is not defined')
      return
    }
    form.validate((valid) => {
      console.log('form validate', valid)
      // if (valid) {
      //   emit('submit', form.value)
      // } else {
      //   console.log('error submit!!')
      //   return false
      // }
    })
  }
  function onClose() {
    emit('close')
  }
</script>

<style scoped>
  .container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
</style>
