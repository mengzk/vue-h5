/**
 * Author: Meng
 * Date: 2025-06-16
 * Modify: 2025-06-16
 * Desc:
 */
import {
  createRouter,
  createWebHashHistory,
  // createWebHistory,
} from "vue-router";

import Constants from "@/config/constant";

// 创建路由
const routers = createRouter({
  strict: true,
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: "/",
      name: "Main",
      // redirect: "/home",
      meta: { title: "首页", keep: true },
      component: () => import("../pages/main/Home.vue"),
    },
    {
      path: "/login",
      name: "Login",
      meta: { title: "Login" },
      component: () => import("../pages/account/Login.vue"),
    },
    {
      path: "/forget",
      name: "Forget",
      meta: { title: "Forget" },
      component: () => import("../pages/account/Forget.vue"),
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
    // {
    //   path: "/test",
    //   name: "Test",
    //   meta: { title: "test" },
    //   component: () => import("../pages/warn/TestView.vue"),
    // },
    {
      path: "/denied",
      name: "Denied",
      meta: { title: "拒绝访问", hidden: true },
      component: () => import("../pages/warn/Denied.vue"),
    },
    {
      path: "/404",
      name: "NotFound",
      meta: { title: "404", hidden: true },
      component: () => import("../pages/warn/Notfound.vue"),
    },
  ],
});

function hasRoute(path) {
  const list = routers.getRoutes();
  if (list.length > 0) {
    // 遍历路由列表，检查是否存在当前路由
    // const exist =
    return list.some((route) => route.path === path);
  } else {
    return false;
  }
}

/**
 * 重置路由
 */
export function resetRouter() {
  routers.clearRoutes();
}

// 全局前置守卫
routers.beforeEach(async (to, from, next) => {
  // console.log("---> guard ", to.path, from.path);
  let isExist = hasRoute(to.path);
  // 如果是登录页面，则直接放行
  if (to.name === "Login") {
    return next();
  } else if (!Constants.token) {
    // 如果没有登录信息，则跳转到登录页面
    return next({ name: "Login" });
  }

  if (!isExist) {
    console.warn(`路由 ${to.path} 不存在`);
    return next({ name: "NotFound" });
  }
  next();
});

export default routers;
