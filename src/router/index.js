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
      path: "/index",
      name: "Index",
      meta: { transition: "slide-left", title: "健康指数" },
      component: () => import("../pages/main/IndexView.vue"),
    },
    {
      path: "/meridian",
      name: "Meridian",
      meta: { transition: "slide-left", title: "经络分析" },
      component: () => import("../pages/main/MeridianView.vue"),
    },
    {
      path: "/meridianDesc",
      name: "MeridianDesc",
      meta: { transition: "slide-left", title: "经络介绍" },
      component: () => import("../pages/main/MeridianDesc.vue"),
    },
    {
      path: "/risk",
      name: "Risk",
      meta: { transition: "slide-left", title: "风险指数" },
      component: () => import("../pages/main/RiskView.vue"),
    },
    {
      path: "/alert",
      name: "Alert",
      meta: { transition: "slide-left", title: "重要提示" },
      component: () => import("../pages/main/AlertView.vue"),
    },
    {
      path: "/explain",
      name: "Explain",
      meta: { transition: "slide-left", title: "表现特征" },
      component: () => import("../pages/main/AlertExplainView.vue"),
    },
    {
      path: "/unscramble",
      name: "Unscramble",
      meta: { transition: "slide-left", title: "解读" },
      component: () => import("../pages/main/UnscrambleView.vue"),
    },
    {
      path: "/tongue",
      name: "Tongue",
      meta: { transition: "slide-left", title: "体质辩证" },
      component: () => import("../pages/main/TongueView.vue"),
    },
    {
      path: "/tongueAnalyse",
      name: "TongueAnalyse",
      meta: { transition: "slide-left", title: "体质辩证" },
      component: () => import("../pages/main/TongueAnalyse.vue"),
    },
    {
      path: "/commons",
      name: "Commons",
      meta: { transition: "slide-left", title: "解读" },
      component: () => import("../pages/main/CommonCellView.vue"),
    },
    {
      path: "/report",
      name: "Report",
      meta: { transition: "slide-left", title: "报告" },
      component: () => import("../pages/main/ReportView.vue"),
    },
    {
      path: "/nurse",
      name: "Nurse",
      meta: { transition: "slide-left", title: "调理建议" },
      component: () => import("../pages/main/NurseView.vue"),
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
      meta: { title: "test", hidden: true },
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
      component: () => import("../pages/warn/NotfoundView.vue"),
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
