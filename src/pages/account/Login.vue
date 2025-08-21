<template>
  <layout>
    <h2 class="title">账号登录</h2>
    <form class="form" ref="formRef">
      <div class="form-item">
        <input class="input" v-model="form.account" type="text" placeholder="请输入账号" />
      </div>
      <div class="form-item">
        <input class="input" v-model="form.password" type="password" placeholder="请输入密码" />
      </div>
      <div class="form-check">
        <label>
          <input v-model="form.remember" type="checkbox" /> 记住密码
        </label>
        <span class="forget" @click.prevent="onForget">忘记密码？</span>
      </div>
      <button class="btn1"  type="button" @click="onLogin">登录</button>
      <button class="btn2" type="button" @click="onRegister">注册</button>
    </form>
  </layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

const formRef = ref(null);
const form = ref({
  account: "",
  password: "",
  remember: false,
});

onMounted(() => { });

function onLogin() {

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
}
.title {
  text-align: center;
  margin: 56px 0;
}
.form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.form-item {
  display: flex;
  margin-top: 20px;
}

.input {
  width: 260px;
  height: 40px;
  padding: 0 10px;
  border-radius: 8px;
  border: solid 1px #ccc;
}
.input:focus {
  border-color: #007bff;
  outline: none;
}
.form-check {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
.forget {
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
}
.btn1 {
  color: white;
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  border-radius: 8px;
  margin-top: 32px;
  border: none;
  background-color: #007bff;
}
.btn2 {
  color: #007bff;
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  border-radius: 8px;
  margin-top: 16px;
  border: solid 1px #007bff;
  background-color: white;
}
</style>
