<template>
  <div class="page-content">
    <PageHeader title="添加租户" margin="16">
      <el-button type="primary" @click="$router.push({ name: 'tenant' })">返回</el-button>
    </PageHeader>
    <div class="scroll">
      <h3 class="label">基本信用</h3>
      <el-form class="top-content" :model="formModel" :rules="rules" ref="formRef">
        <el-col class="top-col">
          <el-form-item class="col-item" label="公司全称:" prop="name">
            <el-input v-model="formModel.name" maxlength="50" show-word-limit />
          </el-form-item>
          <el-form-item class="col-item" label="营业执照:" prop="imgs">
            <el-upload
              v-model:file-list="formModel.imgs"
              list-type="picture-card"
              :auto-upload="false"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item class="col-item" label="账号类型:" prop="accountType">
            <el-radio-group v-model="formModel.accountType" size="large">
              <el-radio value="1" size="large">租户</el-radio>
              <el-radio value="2" size="large">代理账号</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="col-item" label="租户状态:" prop="status">
            <el-radio-group v-model="formModel.status" size="large">
              <el-radio value="1" size="large">启用</el-radio>
              <el-radio value="2" size="large">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="col-item" label="租户使用到期日期:" prop="date">
            <el-date-picker v-model="formModel.date" type="date" clearable />
          </el-form-item>
        </el-col>
        <el-col class="top-col">
          <el-form-item class="col-item" label="公司简称:" prop="short">
            <el-input v-model="formModel.short" maxlength="20" show-word-limit />
          </el-form-item>
          <el-form-item class="col-item" label="统一社会信用代码:" prop="code">
            <el-input v-model="formModel.code" />
          </el-form-item>
          <el-form-item class="col-item" label="管理代理账号:" prop="account">
            <el-radio-group v-model="formModel.account" size="large">
              <el-radio value="1" size="large">关联</el-radio>
              <el-radio value="2" size="large">不关联</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="col-item" label="所属行业:" prop="industry">
            <el-select v-model="formModel.industry" placeholder="请选择" style="width: 230px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>

      <h3 class="label">应用权限信用</h3>
      <el-checkbox-group class="checkbox-group" v-model="formModel.auth">
        <el-checkbox size="large" label="lab1" value="level1">应用权限</el-checkbox>
        <el-checkbox size="large" label="lab2" value="level2">应用权限</el-checkbox>
        <el-checkbox size="large" label="lab3" value="level3">应用权限</el-checkbox>
        <el-checkbox size="large" label="lab4" value="level4">应用权限</el-checkbox>
        <el-checkbox size="large" label="lab5" value="level5">应用权限</el-checkbox>
      </el-checkbox-group>
    </div>
    <div>
      <el-button @click="onBack">取消</el-button>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'

  // const rules = {
  //   name: [
  //     { required: true, message: '请输入角色名称', trigger: 'blur' },
  //     { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  //   ],
  //   des: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
  // }

  const rules = reactive({
    name: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
      { min: 2, max: 50, message: 'Length should be 3 to 50', trigger: 'blur' }
    ],
    short: [
      { required: true, message: 'Please input Activity short name', trigger: 'blur' },
      { min: 2, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
    ],
    accountType: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change'
      }
    ],
    industry: [
      {
        required: true,
        message: 'Please select Activity count',
        trigger: 'change'
      }
    ],
    date: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'change'
      }
    ],
    code: [
      {
        required: true,
        message: 'Please select a location',
        trigger: 'change'
      }
    ],
    imgs: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change'
      }
    ],
    auth: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change'
      }
    ],
    account: [
      {
        required: true,
        message: 'Please select activity resource',
        trigger: 'change'
      }
    ],
    status: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
  })
  const formRef = ref()
  const formModel = reactive({
    name: '',
    short: '',
    // phone: '',
    date: '',
    code: '',
    accountType: '',
    industry: '',
    status: '',
    account: '',
    imgs: [],
    auth: []
  })
  const options = [
    {
      value: 'Option1',
      label: 'Option1'
    },
    {
      value: 'Option2',
      label: 'Option2'
    },
    {
      value: 'Option3',
      label: 'Option3'
    },
    {
      value: 'Option4',
      label: 'Option4'
    },
    {
      value: 'Option5',
      label: 'Option5'
    }
  ]

  function onBack() {
    console.log('onBack')
  }

  async function onSubmit() {
    const formEl = formRef.value
    await formEl.validate((valid) => {
      if (valid) {
        ElMessage.success('新增成功')
        formEl.resetFields()
      }
    })
  }
</script>

<style lang="scss" scoped>
  .page-content {
    display: flex;
    flex-direction: column;
  }

  .top-content {
    display: flex;
    margin: 0 24px;

    .top-col {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 0;
    }

    .col-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 500px;

      .el-form-item__label {
        font-size: 16px !important;
      }
    }
  }

  .label {
    margin: 20px 24px;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    margin: 0 24px;
  }
</style>
