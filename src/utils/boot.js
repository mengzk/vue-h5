/**
 * Author: Meng
 * Date: 2025-03-23
 * Modify: 2025-03-23
 * Desc: 
 */
import VConsole from "vconsole";

import { initDevice, isInApp, isInEmulator } from "./device";

const isApp = isInApp();

let VCInstance = null;
// 非登录态初始化
export function initConfig() {
  // sessionStorage.clear(); // 清除缓存
  initDevice();
  consoleInit();
}

function consoleInit() {
  if (!isApp) {
    const plat = isInEmulator();
    if(plat) {
      VCInstance = new VConsole();
    }
  } else {
    if (process.env.NODE_ENV != "production") {
      VCInstance = new VConsole();
      
    } else {
      
    }
  }
}
