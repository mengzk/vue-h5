/**
 * Author: Meng
 * Date: 2025-03-23
 * Modify: 2025-03-23
 * Desc: 
 */

import Loading from "@/components/widget/loading";
import { httpClient } from "./http";
import { getDomainFromTag, mergeHeaders, mergeParams } from "./config";

let loadingCount = 0;

export async function request({
  path,
  tag = "api",
  method = "GET",
  requestType,
  responseType,
  params = {},
  headers = {},
  toast = true,
  loading = true,
  loadingText = "加载中...",
  onParseData,
} = {}) {
  if (loading) {
    onShowLoading(true, loadingText);
  }

  const options = {
    method,
    requestType,
    responseType,
    url: getDomainFromTag(tag, path),
    data: mergeParams(params),
    headers: mergeHeaders(headers),
  };

  const res = await httpClient(options);
  const result = onParseData ? onParseData(res, path) : parseData(res, path);

  if (loading) {
    onShowLoading(false);
  }
  if (toast && result.code != 0) {
    onShowToast(result.message);
  }
  return result;
}

// 解析response数据 -
function parseData(res, path) {
  let code = res.code;
  let message = res.message || "ok";
  let data = res.data;
  return { code, data, message };
}

function onShowToast(msg) {
  if (msg) {
    // TODO: 接入 Toast 组件
  }
}

// 显示加载中
function onShowLoading(loading, msg) {
  // console.log(loading, text);
  if (loading) {
    loadingCount++;
    Loading.show(msg);
  } else {
    loadingCount--;
    if (loadingCount <= 0) {
      loadingCount = 0;
      Loading.hide();
    }
  }
}
