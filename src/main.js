/**
 * Author: Meng
 * Date: 2025-06-22
 * Modify: 2025-06-22
 * Desc:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";

import "./main.css";
import "./utils/boot";
import { initResponsive } from "./utils/responsive";

import App from "./App.vue";
import router from "./router/index";

// 初始化响应式适配
initResponsive();

// 创建 Vue 应用实例
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

app.config.errorHandler = (err, instance, info) => {
  // 向追踪服务报告错误
  console.log("---> app error handler");
  console.warn(err, instance, info);
};
console.log("---> env", import.meta.env);