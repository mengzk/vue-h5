/**
* Author: Meng
 * Date: 2025-03-22
 * Modify: 2025-03-22
 * Desc: 
*/
import "./main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from "./App.vue";
import router from "./router/index";

import "./utils/boot";

const app = createApp(App);

app.use(ElementPlus)
app.use(createPinia());
app.use(router);

app.mount("#app");

app.config.errorHandler = (err, instance, info) => {
  // 向追踪服务报告错误
  console.log("---> error handler");
  console.warn(err, instance, info);
};
