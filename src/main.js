/**
 * Author: Meng
 * Date: 2025-03-22
 * Modify: 2025-03-22
 * Desc:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";

// import zhCn from "element-plus/es/locale/lang/zh-cn";
import "./styles/el_ui.css";
import "./main.css";
import "./utils/boot";

import App from "./App.vue";
import router from "./router/index";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

app.config.errorHandler = (err, instance, info) => {
  console.warn(err, instance, info);
};