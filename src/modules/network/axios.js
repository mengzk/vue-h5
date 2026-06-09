import axios from "axios";

const instance = axios.create({
  timeout: 30000,
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

// 请求事例
export async function httpClient(options) {
  options.method = options.method.toUpperCase();
  if (options.method == "GET" || options.method == "DELETE" ) {
    options.params = options.data;
    delete options.data;
  }
  if (options.requestType == "form" && options.data) {
    let body = new FormData();
    for (const key in options.data) {
      const value = object[key];
      body.append(key, options.data[value]);
    }
    options.data = body;
    options.headers = {
      "Content-Type": "multipart/form-data",
      ...options.headers,
    };
  }
  // console.log("options--->", options);

  return instance
    .request(options)
    .then((response) => {
      const code = response.status;
      if (199 < code && code < 300) {
        return {success: true, ...response.data};
      } else {
        const message = parseErr(code);
        return { code, message, success: false, data: null };
      }
    })
    .catch((err) => {
      let status = -21;
      let message = "";
      if (err.response) {
        const res3 = err.response;
        if(res3.data) {
          status = res3.data.code || res3.status || -22;
          if(res3.data.message) {
            msg = res3.data.message;
          }else {
            message = parseErr(status);
          }
        }else {
          status = res3.status || -23;
          message = parseErr(status);
        }
        // console.warn("http response error:", err.response.data || err.response);
      } else if (err.request) {
        message = err.message || '请求超时，请稍后重试！';
        console.warn("http request error:", err);
      } else {
        message = err.message || "网络异常，请检查网络连接";
        console.warn("http client error:", err.message);
      }
      return { code: -1010, success: false, message, data: null };
    });
}

function parseErr(code) {
  let message = "";
  switch (code) {
    case 0:
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
      message = "权限不足, 请联系管理员";
      break;
    case 502:
      message = "服务重启中, 请稍后";
      break;
    case 504:
      message = "网关连接超时, 请稍后";
      break;
    default:
      message = `抱歉, 请求失败:${code}`;
      break;
  }
}
