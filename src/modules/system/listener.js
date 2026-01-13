/**
 * Author: Meng
 * Date: 2024-08-02
 * Modify: 2026-01-13
 * Desc: 系统事件监听器，包含屏幕分辨率监听
 */

// 屏幕分辨率信息
const screenInfo = {
  width: 0,
  height: 0,
  pixelRatio: 0,
  orientation: 'portrait',
  isMobile: false,
  isTablet: false,
  isDesktop: false
};

// 响应式断点
const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
};

// 屏幕尺寸变化回调函数
const resizeCallbacks = [];

/**
 * 更新屏幕信息
 */
function updateScreenInfo() {
  screenInfo.width = window.innerWidth;
  screenInfo.height = window.innerHeight;
  screenInfo.pixelRatio = window.devicePixelRatio || 1;
  screenInfo.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  screenInfo.isMobile = window.innerWidth < breakpoints.mobile;
  screenInfo.isTablet = window.innerWidth >= breakpoints.mobile && window.innerWidth < breakpoints.tablet;
  screenInfo.isDesktop = window.innerWidth >= breakpoints.tablet;
  
  // 更新根元素字体大小（用于rem单位）
  updateRootFontSize();
  
  // 触发回调
  resizeCallbacks.forEach(callback => callback(screenInfo));
}

/**
 * 更新根元素字体大小
 */
function updateRootFontSize() {
  const baseWidth = 375; // 设计稿基准宽度
  const baseFontSize = 16; // 基准字体大小
  const fontSize = (window.innerWidth / baseWidth) * baseFontSize;
  document.documentElement.style.fontSize = Math.min(fontSize, 24) + 'px'; // 限制最大字体大小
}

/**
 * 添加屏幕尺寸变化回调
 * @param {Function} callback 回调函数
 */
export function addResizeCallback(callback) {
  if (typeof callback === 'function') {
    resizeCallbacks.push(callback);
  }
}

/**
 * 移除屏幕尺寸变化回调
 * @param {Function} callback 回调函数
 */
export function removeResizeCallback(callback) {
  const index = resizeCallbacks.indexOf(callback);
  if (index > -1) {
    resizeCallbacks.splice(index, 1);
  }
}

/**
 * 获取屏幕信息
 * @returns {Object} 屏幕信息
 */
export function getScreenInfo() {
  return { ...screenInfo };
}

/**
 * 初始化监听器
 */
function listenerInit() {
  // beforeunload事件, 在用户即将离开页面（包括刷新页面）时触发
  window.addEventListener("beforeunload", function (event) {
    console.log("页面即将刷新或关闭");
  });

  // unload事件, 当页面已经卸载（关闭）时触发
  window.addEventListener("unload", function (event) {
    console.log("页面已经卸载");
  });

  // load事件, 当页面完全加载完毕时触发
  window.addEventListener("load", function (event) {
    console.log("页面加载完成");
    updateScreenInfo(); // 初始化屏幕信息
  });

  // pagehide事件, 当页面隐藏时触发
  window.addEventListener("pagehide", function (event) {
    console.log("页面隐藏");
  });

  // pageshow事件, 当页面显示时触发
  window.addEventListener("pageshow", function (event) {
    console.log("页面显示");
    updateScreenInfo(); // 页面显示时更新屏幕信息
  });

  // 切换窗口
  window.addEventListener("visibilitychange", function (event) {
    if (document.hidden) {
      console.log("窗口隐藏");
    } else {
      console.log("窗口显示");
      updateScreenInfo(); // 窗口显示时更新屏幕信息
    }
  });

  // resize事件, 当窗口或框架的大小调整时触发
  window.addEventListener("resize", function (event) {
    console.log("窗口大小调整");
    updateScreenInfo(); // 更新屏幕信息
  });

  // scroll事件, 当用户滚动指定的元素时触发

  // focus事件, 当元素获得焦点时触发
  window.addEventListener("focus", function (event) {
    console.log("元素获得焦点");
  });

  // blur事件, 当元素失去焦点时触发
  window.addEventListener("blur", function (event) {
    console.log("元素失去焦点");
  });

  // online事件, 当浏览器检测到网络连接时触发
  window.addEventListener("online", function (event) {
    console.log("网络连接");
  });

  // offline事件, 当浏览器检测到网络断开时触发
  window.addEventListener("offline", function (event) {
    console.log("网络断开");
  });

  // hashchange事件, 当当前 URL 的锚部分发生变化时触发
  window.addEventListener("hashchange", function (event) {
    console.log("URL锚部分变化");
  });

  // popstate事件, 当浏览器的历史记录发生变化时触发
  window.addEventListener("popstate", function (event) {
    console.log("历史记录变化");
  });

  // message事件, 当在不同的窗口或框架间发送消息时触发
  window.addEventListener("message", function (event) {
    console.log("消息发送");
  });

  // storage事件, 当存储区域改变时触发
  window.addEventListener("storage", function (event) {
    console.log("存储区域改变");
  });

  // error事件, 当在页面中发生 JavaScript 错误时触发
  window.addEventListener("error", function (event) {
    console.log("JavaScript错误");
  });

  // DOMContentLoaded事件, 当初始的 HTML 文档被完全加载和解析完成之后触发
  window.addEventListener("DOMContentLoaded", function (event) {
    console.log("HTML文档加载完成");
    updateScreenInfo(); // 初始化屏幕信息
  });

  // DOMNodeInserted事件, 当一个节点被插入到文档中时触发

  // DOMNodeRemoved事件, 当一个节点从文档中被移除时触发
}

export { screenInfo, breakpoints };
