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

import Container from "@/components/Container.vue";
// import Outline from "@/components/Outline.vue";

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
      path: "/home",
      name: "Home",
      meta: { transition: "slide-left", title: "产品" },
      component: Container,
      children: [
        {
          path: "",
          name: "Workbench",
          meta: { transition: "slide-left", title: "工作台" },
          component: () => import("../pages/workbench/Index.vue"),
        }
      ]
    },
    {
      path: "/product",
      name: "Product",
      meta: { transition: "slide-left", title: "产品" },
      component: Container,
      children: [
        {
          path: "",
          name: "ProductList",
          meta: { transition: "slide-left", title: "产品列表" },
          component: () => import("../pages/product/List.vue"),
        },
        {
          path: "detail",
          name: "ProductDetail",
          meta: { transition: "slide-left", title: "产品详情" },
          component: () => import("../pages/product/Detail.vue"),
        }
      ]
    },
    {
      path: "/member",
      name: "Member",
      meta: { transition: "slide-left", title: "会员" },
      component: Container,
      children: [
        {
          path: "",
          name: "MemberList",
          meta: { transition: "slide-left", title: "会员列表" },
          component: () => import("../pages/member/List.vue"),
        },
        {
          path: "detail",
          name: "MemberDetail",
          meta: { transition: "slide-left", title: "会员详情" },
          component: () => import("../pages/member/Detail.vue"),
        }
      ]
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
