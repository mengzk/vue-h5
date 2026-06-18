import axios from "axios";
import { downloadFile } from "./file";

const instance = axios.create({
  timeout: 30000,
  withCredentials: true,
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

instance.interceptors.request.use((config) => {
  return config;
}, (error) => Promise.reject(error));

instance.interceptors.response.use((response) => {
  return response;
}, (error) => Promise.reject(error));

export async function httpClient(options) {
  const { method = "GET", requestType, responseType, data, fileName } = options;
  const opts = { ...options };

  if (method === "GET" || method === "DELETE") {
    opts.params = data;
    delete opts.data;
  }

  if (requestType === "blob") {
    opts.responseType = "arraybuffer";
  } else if (requestType === "form" && data) {
    const body = new FormData();
    for (const key in data) {
      body.append(key, data[key]);
    }
    opts.data = body;
    opts.headers = {
      "Content-Type": "multipart/form-data",
      ...opts.headers,
    };
  }

  return instance.request(opts).then((response) => {
    if (requestType === "blob" && response.data) {
      return handleBlobResponse(response, fileName);
    }
    const { status, data: resData } = response;
    if (status >= 200 && status < 300) {
      return { success: true, ...resData };
    }
    return { code: status, message: parseErr(status), success: false, data: null };
  }).catch((err) => {
    return handleError(err);
  });
}

function handleBlobResponse(response, fileName) {
  const disposition = response.headers["content-disposition"];
  const contentType = response.headers["content-type"];
  const isFileStream =
    (disposition && disposition.includes("attachment")) ||
    (contentType && !contentType.includes("application/json"));
  let code = 0;
  let message = "下载成功";
  let name = fileName || "downloaded_file";
  if (disposition && disposition.includes("attachment")) {
    const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
    if (match?.[1]) {
      name = decodeURIComponent(match[1].replace(/['"]/g, ""));
    }
  }
  if (isFileStream) {
    downloadFile(window.URL.createObjectURL(new Blob([response.data])), name);
  } else {
    try {
      const json = JSON.parse(new TextDecoder("utf-8").decode(response.data));
      code = json?.code || 1;
      message = json?.msg || "文件下载失败";
    } catch (_) {}
  }
  return { code, message, data: null };
}

function handleError(err) {
  if (err.response) {
    const { status, data } = err.response;
    let code = status;
    let message = data?.msg || data?.message || parseErr(status) || "服务异常";
    if (status === 401) message = "账号未登录，请重新登录";
    else if (status === 403) message = "没有权限访问该资源";
    return { code, message, data: null };
  } else if (err.request) {
    return { code: -1, message: err.message || "请求超时，请稍后重试", data: null };
  }
  return { code: -1, message: err.message || "网络异常，请检查网络连接", data: null };
}

function parseErr(code) {
  const map = {
    401: "账号未登录",
    403: "请求地址不能访问",
    404: "请求地址不存在",
    405: "请求方式错误，请联系开发人员",
    500: "权限不足, 请联系管理员",
    502: "服务重启中, 请稍后",
    504: "网关连接超时, 请稍后",
  };
  return map[code] || `抱歉, 请求失败:${code}`;
}
