/**
 * Author: Meng
 * Date: 2024-07-17
 * Modify: 2024-07-17
 * Desc: 打开场景
 */
import Consts from '@/config/const';
import { getUrlParams } from './index';

/**
 * 设置应用参数
 */
function setAppAgent(res) {
  localStorage.setItem('app-auth', res);
  if(res) {
    const obj = JSON.parse(res);
    if(obj.token){
      Consts.token = `Bearer ${obj.token}`;
    }
    if (obj.sn) {
      Consts.sn = obj.sn;
    }
  }
}
window.setAppAgent = setAppAgent;

// 获取应用参数
window.addEventListener('load', function () {
  const params = getUrlParams(window.location.href);

  localStorage.setItem('app-params', JSON.stringify(params));
  if (params.token) {
    Consts.token = `Bearer ${params.token}`;
  }
  if (params.code) {
    Consts.sn = params.code;
  }
  console.log('---> app params', params);
});

function openScene() {
  console.log('---> openScene');
}