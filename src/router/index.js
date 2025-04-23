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
      path: "/test",
      name: "Test",
      meta: { title: "test" },
      component: () => import("../pages/warn/TestView.vue"),
      // children: [
      //   {
      //     path: "/home",
      //     name: "Home",
      //     meta: { transition: "slide-left", title: "首页" },
      //     component: () => import("../pages/main/HomeView3.vue"),
      //   },
      // ],
    },
    {
      path: "/*",
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
  const newRouter = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ left: 0, top: 0 }),
    strict: true,
    routes: [],
  });
  router.matcher = newRouter.matcher;
}

export default routers;
