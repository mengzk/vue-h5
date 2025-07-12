/**
 * Author: Meng
 * Date: 2025-03-22
 * Modify: 2025-03-22
 * Desc:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import "./styles/el_ui.css";
import "./main.css";
import "./utils/boot";

import App from "./App.vue";
import router from "./router/index";

// 创建 Vue 应用实例
const app = createApp(App);

app.use(ElementPlus, { size: "default", locale: zhCn, zIndex: 3000 });
app.use(createPinia());
app.use(router);

app.mount("#app");

app.config.errorHandler = (err, instance, info) => {
  // 向追踪服务报告错误
  console.log("---> error handler");
  console.warn(err, instance, info);
};
console.log("---> env", import.meta.env);