/**
 * Author: Meng
 * Date: 2025-05-08
 * Modify: 2025-05-08
 * Desc:
 */
import axios from "axios";

const instance = axios.create({
  timeout: 20000,
  withCredentials: true, // 允许携带跨域 Cookie
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

// instance.interceptors.request.use((info) => {}, (err) => {});
// instance.interceptors.response.use((info) => {}, (err) => {});

// 请求事例
export async function httpClient(options) {
  // console.log('---> options', options)
  if (options.method == "GET" || options.method == "DELETE") {
    options.params = options.data;
    delete options.data;
  }

  return instance
    .request(options)
    .then((response) => {
      // console.log('---> response', response.data)
      const code = response.status || -11;
      if (response.status > 199 && response.status < 300) {
        if (options.responseType == "blob") {
          return {
            success: true,
            data: response.data,
            header: response.headers,
          };
        }
        return { success: true, ...response.data };
      } else {
        const msg = parseFail(code);
        return { code, msg, success: false, data: null };
      }
    })
    .catch((err) => {
      let msg = "";
      let code = -21;
      if (err.response) {
        const res3 = err.response;
        if (res3.data) {
          code = res3.data.code || res3.status || -31;
          msg = res3.data.msg || res3.data.message;
          if (!msg) {
            msg = parseFail(code);
          }
        } else {
          code = res3.status || -32;
          msg = parseFail(code);
        }
      } else if (err.request) {
        msg = err?.message || "请求超时，请稍后再试";
        console.warn("request error2:", err);
      } else {
        msg = err.message || "网络异常，请检查网络连接";
        console.warn("client error3:", err.message);
      }

      return { code, msg, success: false, data: null };
    });
}

function parseFail(code) {
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
