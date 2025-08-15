/**
 * Author: Meng
 * Date: 2023-06-09
 * Modify: 2023-06-09
 * Desc:
 */
const envData = import.meta.env;

import Configs from "@/config/index";
import Constants from "@/config/constant";

// 环境及服务器设置
const requestDomains = {
  prod: {
    api: "https://xxx.com",
    ark: "https://ark.com/api",
  },
  dev: {
    api: "/care",
    ark: "/ark",
  },
};

// 获取指定标签环境域名
export function getRequestUrl(tag, path) {
  const domain = tag || "api";
  return requestDomains[Configs.env][domain] + path;
}

// 获取指定标签环境域名
export function getDomainFromTag(tag, path) {
  const key = tag || "api";
  let domain = "";
  switch (key) {
    case "api":
      domain = envData.VITE_API;
      break;
    case "ark":
      domain = envData.VITE_ARK;
      break;
    default:
      domain = envData.VITE_API;
      break;
  }

  return domain + path;
}

// 请求头及参数处理
export function mergeHeaders(headers={}) {
  const token = Constants.token || '...';
  return {
    Authorization: token,
    sn: Constants.sn,
    // token,
    ...headers
  };
}

// 请求头及参数处理
export function mergeParams(params={}) {
  return params;
}

// 配置 
export async function network(options) {
  if (options.method == "POST") {
    options.body = JSON.stringify(options.data);
    delete options.data;
  }

  return fetch(options.url, options)
  .then((res) => res.json());
}