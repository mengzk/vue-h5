/**
 * Author: Meng
 * Date: 2025-06-23
 * Modify: 2025-06-23
 * Desc:
 * 文档: https://vitejs.dev/config/
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";

const isDev = process.env.NODE_ENV !== "production";

export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), "");
  const suffix = env.VITE_ENV;
  console.log("---> env:", suffix);

  return {
    base: isDev ? "" : "./", // 设置资源相对路径下加载资源。
    plugins: [
      vue(),
      // vueJsx(),
      legacy({
        targets: ["chrome < 60", "edge < 15"],
        modernPolyfills: true,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        // "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        // "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
        // "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      },
    },
    css: {
      postcss: {
        plugins: [],
      },
    },
    server: {
      host: true,
      /** 端口号 */
      port: 8930,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      strictPort: false,
      proxy: {
        "/care": {
          target: `https://care-${suffix}.com`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/care/, ""),
        },
        "/auth": {
          target: `https://auth-${suffix}.com`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth/, ""),
        },
        "/order": {
          target: `https://order-${suffix}.com`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/order/, ""),
        },
      },
      hmr: {
        overlay: false,
      },
    },
  };
});
