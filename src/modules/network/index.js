/**
 * Author: Meng
 * Date: 2023-06-09
 * Desc: 2023-06-09
 */

import Loading from "@/components/widget/loading";
import { httpClient } from "./axios";
import { getDomainFromTag, mergeHeaders, mergeParams } from "./config";

let loadingCount = 0;
// 请求入口
export function request({
  path,
  tag = "api",
  method = "GET",
  params = {},
  headers = {},
  loading = true,
  loadingText = "加载中...",
  toast = true,
  onParseData,
} = {}) {
  // 显示加载中
  if (loading) {
    onShowLoading(true, loadingText);
  }

  return new Promise((resolve) => {
    let result = null;
    const options = {
      method,
      url: getDomainFromTag(tag) + path,
      data: mergeParams(params),
      headers: mergeHeaders(headers),
    };

    httpClient(options)
      .then((res) => {
        if (onParseData) {
          result = onParseData(res, path);
        } else {
          result = parseData(res, path);
        }
      })
      .catch((err) => {
        result = parseError(err, path);
      })
      .finally(() => {
        if (loading) {
          onShowLoading(false);
        }
        if (toast && result.code != 0) {
          onShowToast(result.message);
        }
        resolve(result);
      });
  });
}

// 解析response数据 -
function parseData(res, path) {
  let code = res.code;
  let message = res.message || "ok";
  let data = res.data;
  return { code, data, message };
}

// 解析错误信息 -
function parseError(res, path) {
  let code = res.code,
    message = "",
    status = -1;
  const reqInfo = res.request || {};

  if (reqInfo) {
    code = (code || "").toLowerCase();
    status = reqInfo.status;
    // url = reqInfo.responseURL || reqInfo._url;
    switch (status) {
      case 0:
        status = -1;
        message = `${
          code == "econnaborted" ? "请求超时" : "网络异常"
        }，请重新连接`;
        break;
      case 403:
        message = "请求地址不能访问";
        break;
      case 404:
        message = "请求地址不存在";
        break;
      case 405:
        message = "请求方式错误，请联系开发人员";
        break;
      case 500:
      case 502:
        message = "服务重启中, 请稍后";
        break;
      case 504:
        message = "网关连接超时, 请稍后";
        break;
      default:
        message = `抱歉, 请求失败:${status}`;
        break;
    }
  }
  return { code: status, message };
}

// 显示toast
function onShowToast(msg) {
  // console.log(msg)
  if (msg) {
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
