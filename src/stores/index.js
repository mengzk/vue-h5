/**
* Author: Meng
 * Date: 2026-01-07
 * Modify: 2026-01-07
 * Desc: 存储数据
*/

export function getLocalItem(key) {
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
export function setLocalItem(key, data) {
  if (typeof data == "object") {
    window.localStorage.setItem(key, JSON.stringify(data));
  } else {
    window.localStorage.setItem(key, `${data}`);
  }
}
export function removeLocal(key) {
  window.localStorage.removeItem(key);
}
export function clearLocal() {
  window.localStorage.clear();
}


export function getSessionItem(key) {

}
export function setSessionItem(key, data) {

}
export function removeSession(key) {

}
export function clearSession() {

}