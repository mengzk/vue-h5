/**
 * Author: Meng
 * Date: 2025-06-01
 * Modify: 2025-06-01
 * Desc:
 */
import { request } from "@/modules/network";

export function getHomeData(params={}) {
  return request({
    path: "/home",
    method: "GET",
  }).then(res => {
    if(res.code == 0) {
      return res;
    }else {
      return {code: 0, data: {}};
    }
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
  });
}