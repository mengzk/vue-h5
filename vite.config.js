/**
 * Author: Meng
 * Date: 2025-03-23
 * Modify: 2025-03-23
 * Desc:
 * 文档: https://vitejs.dev/config/
 */
import path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import pxToRem from "./pxtorem.config.js";

const isDev = process.env.NODE_ENV !== "production";

const buildConfig = isDev ? {} : {
  minify: "terser",
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },
};

export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), "");
  console.log("---> env:", env.VITE_ENV);

  return {
    base: isDev ? "" : "./", // 设置资源相对路径下加载资源。
    build: {
      emptyOutDir: true,
      assetsDir: 'assets',
      outDir: '.output/demo/',
      ...buildConfig,
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      legacy({
        targets: ["chrome >= 80", "edge >= 85"],
        modernPolyfills: true,
      }),
    ],
    resolve: {
      alias: {
        // "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      // postcss: {
      //   plugins: [pxToRem],
      // },
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 8930,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      proxy: {
        // "/api": {
        //   target: "https://aim.com",
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ""),
        // },
        "/care": {
          target: "https://aimlai.com/healthcare",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/care/, ""),
        },
        "/ark": {
          target: "https://ark.cn-beijing.volces.com/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ark/, ""),
        },
      },
      hmr: {
        overlay: false,
      },
    },
    // build: {
    //   outDir: "dist",
    //   assetsDir: "assets",
    //   minify: isDev ? false : "terser",
    //   sourcemap: isDev ? "inline" : false,
    //   target: "es2015",
    //   terserOptions: {
    //     compress: {
    //       drop_console: !isDev,
    //       drop_debugger: !isDev,
    //     },
    //   },
    // },
    // // 编译混淆器
    // esbuild: {
    //   target: "es2015",
    //   minify: false,
    //   jsxFactory: "h",
    //   jsxFragment: "Fragment"
    // },
  };
});
