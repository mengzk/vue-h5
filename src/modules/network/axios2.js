/**
 * Author: Meng
 * Date: 2025-05-08
 * Modify: 2025-05-08
 * Desc:
 */
import axios from "axios";
import { downloadFile } from "./file";

const instance = axios.create({
  timeout: 20000,
  withCredentials: true, // 允许携带跨域 Cookie
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

// 请求事例
export async function httpClient(options) {
  // console.log('---> options', options)
  if (options.method == "GET" || options.method == "DELETE") {
    options.params = options.data;
    delete options.data;
  }
  const isFile = options.requestType == 'blob';
  // 下载文件
  if (isFile) {
    options.responseType = "arraybuffer";
  }else if (options.requestType == "form" && options.data) {
    let body = new FormData();
    for (const key in options.data) {
      const value = object[key];
      body.append(key, options.data[value]);
    }
    options.data = body;
    options.headers = {
      ...options.headers,
      "Content-Type": "multipart/form-data",
    };
  }
  return instance
    .request(options)
    .then((response) => {
      // console.log('---> response', response.data)
      if (isFile && response.data) {
        const disposition = response.headers["content-disposition"];
        const contentType = response.headers["content-type"];
        const isFileStream =
          (disposition && disposition.includes("attachment")) ||
          (contentType && !contentType.includes("application/json"));
        let code = 0;
        let message = "下载成功";

        let fileName = options.fileName || "downloaded_file";
        if (disposition && disposition.indexOf("attachment") !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            fileName = decodeURIComponent(matches[1].replace(/['"]/g, ""));
          }
        }
        if (isFileStream) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          downloadFile(url, fileName);
        } else {
          const resText = new TextDecoder("utf-8").decode(response.data);
          let resJson = null;
          try {
            resJson = JSON.parse(resText);
            code = resJson?.code || 1;
            message = resJson?.msg || "文件下载失败";
          } catch (e) {
            resJson = null;
          }
        }
        return { code, message, data: null };
      }
      const code = response.status;
      if (response.status > 199 && response.status < 300) {
        return response.data;
      } else {
        const message = parseErr(code);
        return { code, message, data: null };
      }
    })
    .catch((err) => {
      let message = "";
      let code = -1010;
      if (err.response) {
        message =
          err.response.data.message ||
          err.response.message ||
          err.response.statusText ||
          err.message ||
          "服务异常，请检查网络";
        code = err.response.status || -1010;
        if (err.response.status === 401) {
          message = "账号未登录，请重新登录";
        } else if (err.response.status === 403) {
          message = "没有权限访问该资源";
        } else if (err.response.status === 404) {
          message = "请求地址不存在";
        } else if (err.response.status === 500) {
          message = "服务器内部错误，请稍后再试";
        }
        if (err.response.data) {
          code = err.response.data.code || code;
          message = err.response.data.msg || message;
        }
        console.warn("response error:", err.response.data);
      } else if (err.request) {
        message = err?.message || "请求超时，请稍后再试";
        console.warn("request error2:", err);
      } else {
        message = err.message || "网络异常，请检查网络连接";
        console.warn("client error3:", err.message);
      }

      return { code, message, data: null };
    });
}

function parseErr(code) {
  let message = "";
  switch (code) {
    case 0:
      message = "网络异常，请重新连接";
      break;
    case 401:
      message = "账号未登录";
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
      message = "权限不足, 请联系管理员";
      break;
    case 502:
      message = "服务重启中, 请稍后";
      break;
    case 504:
      message = "网关连接超时, 请稍后";
      break;
    default:
      message = `抱歉, 请求失败: ${code}`;
      break;
  }
  return message;
}
