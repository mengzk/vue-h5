/**
 * Author: Meng
 * Date: 2025-06-16
 * Modify: 2025-06-16
 * Desc: 
 */
import { ref } from "vue";
import { defineStore } from "pinia";

import FrameLayout from "@/components/FrameLayout.vue";

import menuRouter from "@/router/menu"; // 导入解析路由的函数
import tabRouter from "@/router/tab"; // 导入解析路由的函数

// 1. 预先获取所有页面组件的映射 { path: () => import(...) }
const modules = import.meta.glob('../pages/**/*.vue');

let isLoaded = false; // 是否已加载过菜单

const useMenuStore = defineStore("app-menu", () => {
  const curMenu = ref(""); // 当前菜单
  const menuList = ref([]);

  /**
   * 查询菜单
   */
  async function queryMenu() {
    if(isLoaded) {
      return menuList.value; // 如果菜单已加载，直接返回
    }
    isLoaded = true; // 标记菜单已加载
    // 获取路由列表
    const list = parseRouter(tabRouter);
    setMenu(list);
    return list;
  }

  // function getMenuFormRouter(list) {
  //   return parseRouter(list);
  // }

  function setMenu(res) {
    menuList.value = res;
  }
  // function getMenu() {
  //   return menuList.value;
  // }
  function hasMenu() {
    return Object.keys(menuList.value).length > 0;
  }
  function clearMenu() {
    menuList.value = [];
  }

  return {
    menuList,
    setMenu,
    queryMenu,
    hasMenu,
    clearMenu,
  };
});

// 解析路由列表为菜单格式
function parseRouter(list, path) {
  const menu = [];
  list.forEach((item) => {
    let children = item.children || [];
    if (children.length > 1) {
       children = parseRouter(children, item.path);
      menu.push({
        meta: item.meta,
        path: item.path,
        name: item.name,
        children,
        component: FrameLayout
      });
    } else {
      const child = children[0] || item;
      const meta = child.meta || {};
      if (meta.hidden) {
        return; // 如果菜单被隐藏，则不添加到菜单列表
      }
      let itemPath = path ? `${path}/${item.path}` : item.path;
      if (itemPath.lastIndexOf("/") == itemPath.length - 1) {
        itemPath = itemPath.slice(0, -1); // 去掉结尾的斜杠
      }
      // const pathArr = item.component.split('/');
      // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      // const component = () => import(`../pages/${pathArr[0]}/${pathArr[1]}.vue`);

      const component = modules[child.component];
      if(!component) {
        console.warn(`未找到组件 ${child.component}`);
        // return;
      }

      menu.push({
        meta,
        path: itemPath,
        name: child.name,
        component
      });
    }
  });
  return menu;
}

export default useMenuStore;
