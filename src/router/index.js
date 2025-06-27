/**
 * Author: Meng
 * Date: 2024-04-16
 * Modify: 2024-04-16
 * Desc:
 */
import {
  createRouter,
  createWebHashHistory,
  // createWebHistory,
} from "vue-router";

// import Container from "@/components/Container.vue"
import useMenuStore from "@/stores/menu";
import Constants from "@/config/constant";
// import menuRouter from "./menu.js";

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
      path: "/reset",
      name: "Reset",
      meta: { title: "Reset" },
      component: () => import("../pages/account/Reset.vue"),
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

  let isExist = hasRoute(to.path);

  // 如果是登录页面，则直接放行
  if (to.name === "Login") {
    return next();
  } else if (!Constants.token) {
    // 如果没有登录信息，则跳转到登录页面
    return next({ name: "Login" });
  }

  // 如果是第一次访问菜单路由，则初始化菜单
  if (!isExist && !initMenu) {
    const menuStore = useMenuStore();
    const menus = await menuStore.queryMenu(); // 查询菜单
    if (!menus || menus.length === 0) {
      console.warn("菜单路由为空，请检查菜单配置");
      return next({ name: "Denied" });
    }

    initMenu = true;
    console.log("---> 菜单路由：", menus);

    // 添加菜单路由
    menus.forEach((route) => {
      routers.addRoute(route);
    });

    next({ ...to, replace: true }); // 重新导航到当前路由
    return;
  } else {
    isExist = hasRoute(to.path);

    if (!isExist) {
      console.warn(`路由 ${to.path} 不存在`);
      return next({ name: "NotFound" });
    }
    next();
  }
});

export default routers;
