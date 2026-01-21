/**
* Author: Meng
 * Date: 2026-01-21
 * Modify: 2026-01-21
 * Desc: 
*/

const DEFAULT_THEME = {
  "theme": "#1890ff",
  "primary": "#1890ff",
  "primary-color-hover": "#40a9ff",
  "primary-color-active": "#096dd9",
  "el-primary-color": "#1890ff",
  "el-primary-color-hover": "#40a9ff",
  "el-primary-color-active": "#096dd9",
};

export function initTheme() {}

export function setTheme() {
  const style = document.documentElement.style;

  const color = '#40a9ff';

  for (const key in DEFAULT_THEME) {
    style.setProperty(`--${key}`, color);
  }

  
}