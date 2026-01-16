<template>
  <div class="page login">
    <img class="bg" :src="bgUrl" alt="Login Background" />
    <div class="content">
      <h1 class="title">账号登录</h1>
      <el-form class="login-form" ref="formRef" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="account">
          <el-input
            v-model="form.account"
            maxlength="20"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            maxlength="20"
            placeholder="请输入密码"
          />
        </el-form-item>
        <div class="code-box">
          <el-form-item label="验证码" prop="code">
            <el-input maxlength="6" placeholder="请输入验证码" />
          </el-form-item>
        </div>
        <div class="form-check">
          <el-checkbox v-model="form.remember">记住我</el-checkbox>
          <el-link type="primary" @click="onForget">忘记密码？</el-link>
        </div>
      </el-form>
      <div class="btn-group">
        <el-button class="btn1" type="primary" @click="onLogin">登 录</el-button>
        <el-button class="btn1" type="primary" @click="onRegister">注 册</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

const bgUrl = ref(
  "https://ts1.tc.mm.bing.net/th?id=OHR.WinterBegins_ZH-CN7638411804_1920x1080.webp"
);
const formRef = ref(null);
const form = ref({
  account: "",
  password: "",
  code: "",
  remember: false,
});
const rules = ref({
  account: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 20,
      message: "用户名长度在 3 到 20 个字符之间",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 20,
      message: "密码长度在 6 到 20 个字符之间",
      trigger: "blur",
    },
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    {
      min: 6,
      max: 6,
      message: "密码长度 6 个字符验证码",
      trigger: "blur",
    },
  ],
});

onMounted(() => {});

function onLogin() {
  formRef.value.validate((valid) => {
    if (valid) {
      const params = form.value;
      userStore.onLogin(params).then((res) => {
        router.push("/");
      });
    } else {
      console.log("表单验证失败");
    }
  });
}

function onRegister() {
  // router.push("/register");
}

function onForget() {
  // router.push("/forget");
}
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: #f6f6f6;
}

.bg {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  object-fit: cover;
  position: absolute;
}

.content {
  /* width: 450px; */
  /* height: 600px; */
  z-index: 1;
  right: 10%;
  padding: 20px 36px;
  border-radius: 16px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
}
.title {
  color: black;
  margin-bottom: 32px;
}

.form-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-group {
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
}

.btn1 {
  width: 120px;
  height: 40px;
  border-radius: 8px;
}
</style>
<style>
.login-form .el-input {
  --el-input-width: 260px;
  --el-input-text-color: #232323;
  --el-input-border-color: #989796;
  --el-input-hover-border-color: #ff6600;
  --el-input-focus-border-color: #ff6600;
}
.login-form .el-button {
  --el-button-text-color: #ffffff;
  --el-button-bg-color: #ff6600;
  --el-button-hover-bg-color: #ff6600;
  --el-button-active-bg-color: #ff6600;
  --el-button-border-color: transparent;
  --el-button-hover-border-color: transparent;
  --el-button-active-border-color: transparent;
  --el-font-size-base: 16px;
  --el-button-font-weight: 600;
  width: 100%;
  height: 36px;
}
.login-form .el-form-item {
  margin-bottom: 12px;
  flex-direction: column;
  align-items: flex-start;
}
.login-form .el-form-item__label {
  height: 24px;
  line-height: 24px;
}
.code-box .el-form-item {
  margin-bottom: 8px;
}
</style>
