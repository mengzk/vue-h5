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
import "./utils/responsive";

import App from "./App.vue";
import Container from "./components/Container.vue";
import Header from "./components/Header.vue";
import Layout from "./components/Layout.vue";

import router from "./router/index";

// 创建 Vue 应用实例
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
app.component("container", Container);
app.component("v-header", Header);
app.component("layout", Layout);

app.config.errorHandler = (err, instance, info) => {
  // 向追踪服务报告错误
  console.log("---> app error handler");
  console.warn(err, instance, info);
};
console.log("---> env", import.meta.env);
