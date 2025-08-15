/**
 * Author: Meng
 * Date: 2025-06-26
 * Modify: 2025-06-26
 * Desc: 数据存储
 */

export default class Local {
  // 获取存储数据
  static getData(key) {
    const data = window.localStorage.getItem(key);
    if (data === null) {
      return null;
    } else {
      try {
        const size = data.length - 1;
        if (data.indexOf("{") == 0 && data.lastIndexOf("}") == size) {
          return JSON.parse(data);
        } else if (data.indexOf("[") == 0 && data.lastIndexOf("]") == size) {
          return JSON.parse(data);
        } else {
          return data;
        }
      } catch (err) {
        return null;
      }
    }
  }
  // 存储数据
  static setData(key, data) {
    if (typeof data == "object") {
      window.localStorage.setItem(key, JSON.stringify(data));
    } else {
      window.localStorage.setItem(key, `${data}`);
    }
    // window.dispatchEvent(new Event("storage"));
  }

  // 获取存储数据 -异步
  static getAsyncData(key) {
    const data = window.localStorage.getItem(key);
    if (data === null) {
      return null;
    } else {
      const size = data.length - 1;
      if (data.indexOf("{") == 0 && data.lastIndexOf("}") == size) {
        return JSON.parse(data);
      } else if (data.indexOf("[") == 0 && data.lastIndexOf("]") == size) {
        return JSON.parse(data);
      } else {
        return data;
      }
    }
  }
  // 存储数据 -异步
  static setAsyncData(key, data) {
    if (typeof data == "object") {
      window.localStorage.setItem(key, JSON.stringify(data));
    } else {
      window.localStorage.setItem(key, `${data}`);
    }
    // window.dispatchEvent(new Event("storage"));
  }

  // 移除指定的数据
  static remove(key) {
    window.localStorage.removeItem(key);
  }

  // 清空存储
  static clear() {
    window.localStorage.clear();
  }
}
