/**
 * Author: Meng
 * Date: 2025-09-11
 * Modify: 2025-09-11
 * Desc: 
 */
import values from './value.json';

// 获取主题包
export function getTheme() {
  const theme = localStorage.getItem('theme') || 'white';
  return values[theme] || values['white'];
}