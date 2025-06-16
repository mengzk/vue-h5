/**
 * Author: Meng
 * Date: 2024-04-16
 * Modify: 2024-04-16
 * Desc:
 */
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

// import Container from "@/components/Container.vue"
// 引入菜单路由
import menuRouter from "./menu.js";
let initMenu = false; // 是否初始化菜单路由

// 创建路由
const routers = createRouter({
  strict: true,
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: "/",
      name: "Main",
      redirect: "/home",
      meta: { title: "首页", keep: true },
      component: () => import("../pages/main/HomeView.vue"),
    },
    {
      path: "/preivew",
      name: "Preview",
      meta: { transition: "slide-left", title: "文件预览" },
      component: () => import("../pages/common/Preview.vue"),
      children: [
        {
          path: "pdf",
          name: "PDF",
          meta: { transition: "slide-left", title: "PDF预览" },
          component: () => import("../pages/common/PDFView.vue"),
        },
      ],
    },
    {
      path: "/account",
      name: "Account",
      meta: { transition: "slide-left", title: "账号", keep: true },
      component: () => import("../components/Outline.vue"),
      children: [
        {
          path: "",
          name: "AccountInfo",
          meta: { transition: "slide-left", title: "账号中心" },
          component: () => import("../pages/account/Info.vue"),
        },
        {
          path: "reset",
          name: "AccountReset",
          meta: { transition: "slide-left", title: "账号重置" },
          component: () => import("../pages/account/Reset.vue"),
        },
      ],
    },
    {
      path: "/test",
      name: "Test",
      meta: { title: "test" },
      component: () => import("../pages/warn/TestView.vue"),
    },
    {
      path: "/404",
      name: "NotFound",
      meta: { title: "404", hidden: true },
      component: () => import("../pages/warn/Notfound.vue"),
    },
  ],
});

/**
 * 重置路由
 */
export function resetRouter() {
  // const newRouter = createRouter({
  //   history: createWebHashHistory(),
  //   scrollBehavior: () => ({ left: 0, top: 0 }),
  //   strict: true,
  //   routes: [],
  // });
  routers.clearRoutes();
  // routers.addRoute({});
}

// 全局前置守卫
routers.beforeEach(async (to, from, next) => {
  console.log("---> guard ", to.path, from.path);

  // 如果是第一次访问菜单路由，则初始化菜单
  if (!initMenu && menuRouter && menuRouter.length > 0) {
    initMenu = true;
    // 添加菜单路由
    menuRouter.forEach((route) => {
      routers.addRoute(route);
    });

    next({ ...to, replace: true }); // 重新导航到当前路由
    return;
  }

  const list = routers.getRoutes();
  if (list.length > 0) {
    // 遍历路由列表，检查是否存在当前路由
    const exists = list.some((route) => route.path === to.path);
    if (!exists) {
      console.warn(`路由 ${to.path} 不存在`);
      return next({ name: "NotFound" });
    }
  }
  next();
});

export default routers;
