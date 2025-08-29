/**
 * Author: Meng
 * Date: 2025-06-16
 * Modify: 2025-06-16
 * Desc:
 */
import { ref } from "vue";
import { defineStore } from "pinia";

import menuRouter from "@/router/menu"; // 导入解析路由的函数

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

    setMenu(parseRouter(menuRouter));
    return menuRouter;
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
    if (item.children && item.children.length > 1) {
      const children = parseRouter(item.children, item.path);
      menu.push({
        title: item.meta.title,
        path: item.path,
        name: item.name,
        children,
      });
    } else {
      const meta = item.meta || {};
      if (meta.hidden) {
        return; // 如果菜单被隐藏，则不添加到菜单列表
      }
      let itemPath = path ? `${path}/${item.path}` : item.path;
      if (itemPath.lastIndexOf("/") == itemPath.length - 1) {
        itemPath = itemPath.slice(0, -1); // 去掉结尾的斜杠
      }
      menu.push({
        title: meta.title,
        path: itemPath,
        name: item.name,
      });
    }
  });
  return menu;
}

export default useMenuStore;
