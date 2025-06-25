/**
 * Author: Meng
 * Date: 2024-07-06
 * Modify: 2024-07-06
 * Desc: 常量配置
 * 监听刷新动作,刷新时存储数据,刷新结束后读取数据
 */

const Constants = {
  platform: "web",
  version: "1.0.0",
  secret: "",
  appId: "",
  token: "test token",
  userId: "",
  userName: "",
  userPhone: "",
  userInfo: {},

  screen: {
    width: window.innerWidth,
    height: window.innerHeight,
    statusHeight: getProperty("--status-bar-height"),
  },
};

// 获取css变量值
function getProperty(propertyKey = "") {
  const num =
    getComputedStyle(document.documentElement).getPropertyValue(propertyKey) ||
    "0";
  return parseInt(num);
}
// 设置css变量值
function setProperty(propertyKey = "", value = "") {
  document.documentElement.style.setProperty(propertyKey, value);
}

export default Constants;
