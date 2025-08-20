/**
 * Author: Meng
 * Date: 2023-06-09
 * Modify: 2023-06-09
 * Desc:
 */
const envData = import.meta.env;

import Constants from "@/config/constant";

// 获取指定标签环境域名
export function getDomainFromTag(tag, path) {
  const key = tag || "api";
  let domain = "";
  switch (key) {
    case "auth":
      domain = envData.VITE_AUTH;
      break;
    case "order":
      domain = envData.API_ORDER;
      break;
    default:
      domain = envData.API_BASE;
      break;
  }

  return domain + path;
}

// 请求头及参数处理
export function mergeHeaders(headers={}) {
  const token = Constants.token || '...';
  return {
    Authorization: token,
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