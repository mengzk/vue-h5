/**
 * Author: Meng
 * Date: 2024-08-01
 * Modify: 2024-08-01
 * Desc:
 */
import { request } from "../network/index";
import {pulseDate, tongueDate} from '../mock'

export function getHomeData(params={}) {
  return request({
    path: "/home",
    method: "GET",
  });
}

/**
 * 获取心率报告
 */
export function getPulseReport(rid='') {
  return request({
    path: `/api/healthDeviceDetection/getSamplingReport?reportId=${rid}`,
    method: "GET",
    params: {}
  }).then(res => {
    if(res.code == 0) {
      return res;
    }else {
      return {code: 0, data: pulseDate};
    }
  });
}

/**
 * 获取舌苔报告
 */
export function getTongueReport(sid='') {
  return request({
    path: `/api/facetongue/getDetectionReport?sessionId=${sid}`,
    method: "GET",
    params: {}
  }).then(res => {
    if(res.code == 0) {
      return res;
    }else {
      return {code: 0, data: tongueDate};
    }
  }); 
}