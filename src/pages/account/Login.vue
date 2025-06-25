<template>
  <div class="page login">
    <img class="bg" :src="bgUrl" alt="Login Background" />
    <div class="content">
      <h1>登录</h1>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item class="form-item" label="用户名" prop="account">
          <el-input
            class="input"
            v-model="form.account"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item class="form-item" label="密码" prop="password">
          <el-input
            class="input"
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-row class="form-check" part="remember">
          <el-checkbox v-model="form.remember">记住我</el-checkbox>
          <span class="forget" @click="onForget">忘记密码？</span>
        </el-row>
        <!-- <el-row>
          <el-button type="text">扫码登录</el-button>
        </el-row> -->
        <el-row class="btn-group">
          <el-button class="btn1" type="primary" @click="onLogin"
            >登 录</el-button
          >
          <el-button class="btn1" type="primary" @click="onRegister"
            >注 册</el-button
          >
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";

const router = useRouter();

const bgUrl = ref(
  "https://ts1.tc.mm.bing.net/th?id=OHR.WinterBegins_ZH-CN7638411804_1920x1080.webp"
);
const formRef = ref(null);
const form = ref({
  account: "",
  password: "",
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
});

onMounted(() => {});

function onLogin() {
  formRef.value.validate((valid) => {
    if (valid) {
    }
  });
}

function onRegister() {
  // router.push("/register");
}

function onForget() {
  // router.push("/forget-password");
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
  width: 450px;
  height: 600px;
  z-index: 1;
  right: 10%;
  border-radius: 16px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
}
.form-item {
  width: 360px;
  margin-top: 24px;
}
.input {
  width: 360px;
  height: 40px;
  border-radius: 4px;
}
.form-check {
  width: 360px;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}
.btn-group {
  margin-top: 36px;
}
.btn1 {
  flex: 1;
  height: 40px;
  border-radius: 8px;
}
</style>
