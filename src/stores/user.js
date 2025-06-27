/**
 * Author: Meng
 * Date: 2024-04-16
 * Modify: 2024-04-16
 * Desc: 
 * watch配合pinia实现全局状态管理,需要的页面是keep-alive的
 */
import { ref } from "vue";
import { defineStore } from "pinia";

import Constants from "@/config/constant";

export const useUserStore = defineStore("userinfo", () => {
  const userInfo = ref({});

  /**
   * 登录
   * @param {*} params 
   */
  async function onLogin(params) {
    // 
  }

  /**
   * 退出登录
   */
  async function onLogout() {
    // 清除用户信息
    clearInfo();
    // 可能还需要清除其他状态
    
    // 跳转到登录页面或首页
  }

  function setUserInfo(info) {
    setInfo(info);
  }

  // function getUserInfo() {
  //   return userInfo.value;
  // }

  function isLogin() {
    return !!userInfo.value.token;
  }

  function getToken() {
    return userInfo.value.token;
  }

  /**
   * 清空用户信息
   * @param {*} res 
   */
  function clearInfo() {
    setInfo({});
  }

  function setInfo(res={}) {
    userInfo.value = res;
    // 更新全局常量
    Constants.userInfo = res;
    Constants.userId = res.id || "";
    Constants.token = res.token || "";
    Constants.userName = res.name || "";
    Constants.userPhone = res.phone || "";
  }

  return {
    userInfo,
    setUserInfo,
    clearInfo,
    isLogin,
    getToken,
    onLogin,
    onLogout,
  };
});
