/**
 * Author: Meng
 * Date: 2025-06-15
 * Modify: 2025-06-15
 * Desc:
 */

// 验证手机号
export function checkPhone(phone) {
  const phoneRe = /(^1[3456789][0-9]{9}$)/;
  return phoneRe.test(phone);
}
/*
验证电话号码
验证规则：区号+号码，区号以0开头，3位或4位
号码由7位或8位数字组成
区号与号码之间可以无连接符，也可以“-”连接
如01088888888,010-88888888,0955-7777777
*/
export function checkTelephone(tel) {
  let re = /^0\d{2,3}-?\d{7,8}$/;
  return re.test(tel);
}
/**
 * 隐藏手机号 180****9999
 */
export function hidePhone(phone = "") {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

/**
 * 隐藏手机号 180****9999
 */
export function replaceStrStar(str) {
  let text = "";
  if (str && str.length > 4) {
    text = str.substring(0, str.length - 4) + "****";
  }
  return text;
}

// 是否是公司名称
export function hasEmoji(str) {
  const emoji = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
  return emoji.test(str);
}

// 是否是中文
export function hasCNChars(str) {
  const res = /^(([\u4e00-\u9fa5]{1,10}·?[\u4e00-\u9fa5]{1,10})|[A-z]+)$/;
  return res.test(str);
}

// 是否是数字
export function hasCoupon(code) {
  const coupon = /^(([0-9]|[A-z])+)$/;
  return coupon.test(code);
}

/**
 * 验证邮箱
 * @param {*} email
 * @returns
 */
export function checkEmail(email) {
  const res = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  return res.test(email);
}

// 格式化数字为：xx格式
export function formatNumber(num) {
  return `${num > 9 ? "" : "0"}${num}`;
}

/**
 * 获取url参数
 * @param {*} url
 */
export function getUrlParams(url) {
  let str = url || window.location.href;
  if (str.indexOf("#") > 0) {
    str = str.split("#")[1];
  }

  const query = str.split("?")[1];
  if (!query) {
    return {};
  }
  const search = query.split("&");
  const params = {};
  search.forEach((item) => {
    const arr = item.split("=");
    params[arr[0]] = arr[1];
  });
  return params;
}

/**
 * 更新url参数
 * @param {*} params
 */
export function updateHrefParams(params) {
  const url = window.location.href;
  const urlObj = new URL(url);
  for (const key in params) {
    urlObj.searchParams.set(key, params[key]);
  }
  window.history.replaceState(null, "", urlObj.href);
  // history.replaceState(null, "", window.location.href.split("?")[0]);
}

/**
 * 数字格式化
 * @param {*} e 数字
 * @param {*} flag 返回类型 integer正整数 number一位小数
 */
export function replaceNumber(e, flag) {
  // 大于0 的正整数
  if (flag == "integer") return e.replace(/^0|[^0-9]/g, "");
  // 大于0 的一位小数
  if (flag == "number") {
    e = e.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    e = e.replace(/^\./g, ""); //验证第一个字符是数字而不是
    e = e.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    e = e.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    return e.replace(/^(\\-)*(\d+)\.(\d).*$/, "$1$2.$3");
  }
}

/**
 * 数字格式化
 * @param {*} e 数字
 * @param {*} flag 返回类型 integer正整数 number两位小数
 */
export function replaceNumber2(e, flag) {
  // 大于0 的正整数
  if (flag == "integer") return e.replace(/^0|[^0-9]/g, "");
  // 大于0 的两位小数
  if (flag == "number") {
    e = e.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    e = e.replace(/^\./g, ""); //验证第一个字符是数字而不是
    e = e.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    e = e.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    return e.replace(/^(\\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
  }
}

/**
 * 获取cookie
 * @param {*} name
 */
export function getCookies(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : "";
}
