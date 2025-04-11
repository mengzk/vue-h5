/**
 * Author: Meng
 * Date: 2023-06-09
 * Modify: 2023-06-09
 * Desc:
 */
const envData = import.meta.env // 环境变量

import Configs from "@/config/index";
import Consts from "@/config/const";


console.log('------> envData', envData);
// 环境及服务器设置
const requestDomains = {
  prod: {
    api: "https://aimlai.com/healthcare",
    ark: "https://ark.cn-beijing.volces.com/api",
    order: "https://order.demo.com"
  },
  dev: {
    api: "/care",
    ark: "/ark",
    order: "/order"
  },
};

// 获取指定标签环境域名
export function getRequestUrl(tag, path) {
  const domain = tag || "api";
  return requestDomains[Configs.env][domain];
}

// 获取指定标签环境域名
export function getDomainFromTag(tag) {
  // const envTag = env || Configs.env;
  // const domain = tag || "api";
  return requestDomains[envData.VITE_ENV][tag];
  // return envData.VITE_API;
}

// 请求头及参数处理
export function mergeHeaders(headers={}) {
  const token = Consts.token || 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijg0MWNjNDI4LTE2ZjMtNDVhNi04MWEzLWQyY2NmM2IyNDY2NCJ9.lUAMmF7KhH80_DqheFc1xT37OsfY6sHhiT4up2qFleOrXzExU2KpBK8xAZTmrcv1KzND9aLjhmgYft6nMyVGvg';
  return {
    Authorization: token,
    sn: Consts.sn,
    // token,
    ...headers
  };
}

// 请求头及参数处理
export function mergeParams(params={}) {
  return params;
}

// 配置 
export function network(options) {
  if (options.method == "POST") {
    options.body = JSON.stringify(options.data);
    delete options.data;
  }

  return fetch(options.url, options)
  .then((res) => res.json());
}