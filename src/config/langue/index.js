/**
 * Author: Meng
 * Date: 2025-09-11
 * Modify: 2025-09-11
 * Desc: 
 */
import values from './value.json';

// 获取语言包
export function getLangue() {
  const lang = localStorage.getItem('lang') || 'cn';
  return values[lang] || values['cn'];
}
