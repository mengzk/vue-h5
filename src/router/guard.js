/**
 * Author: Meng
 * Date: 2025-06-28
 * Modify: 2025-06-28
 * Desc: 路由守卫
 * _stack
 */
import router from "./index";

// 全局前置守卫
router.beforeEach(async (to, from) => {
  console.log("router beforeEach", to);
  return true;
});

// 全局解析守卫
// 每次导航时都会触发，不同的是，解析守卫刚好会在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用
router.beforeResolve(async (to, from) => {
  console.log("router beforeResolve", to);
  try {
    return true;
  } catch (error) {
    throw error;
  }
});

// 全局后置钩子
// 注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
// 对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。
router.afterEach((to, from) => {
  console.log("router afterEach", to);
  to.meta.transition = "slide-left";
});