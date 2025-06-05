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

// 创建路由
const routers = createRouter({
  strict: true,
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: "/",
      name: "Main",
      // redirect: "/",
      meta: { title: "首页", keep: true },
      component: () => import("../pages/main/HomeView.vue"),
    },
    {
      path: "/alert",
      name: "Alert",
      meta: { transition: "slide-left", title: "风险" },
      component: () => import("../pages/main/AlertView.vue"),
    },
    {
      path: "/chat",
      name: "Chat",
      meta: { transition: "slide-left", title: "AI健康" },
      component: () => import("../pages/chat/ChatPage.vue"),
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
      component: () => import("../components/PageView.vue"),
      children: [
        {
          path: "",
          name: "Info",
          meta: { transition: "slide-left", title: "账号中心" },
          component: () => import("../pages/common/PDFView.vue"),
        },
        {
          path: "info",
          name: "UserInfo",
          meta: { transition: "slide-left", title: "个人信息" },
          component: () => import("../pages/common/PDFView.vue"),
        },
        {
          path: "reset",
          name: "AccountReset",
          meta: { transition: "slide-left", title: "账号重置" },
          component: () => import("../pages/common/PDFView.vue"),
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
routers.beforeEach((to, from, next) => {
  console.log("路由变化", to.path, from.path);

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
