/**
 * Author: Meng
 * Date: 2025-03-23
 * Modify: 2025-03-23
 * Desc: 聊天模块
 * https://www.volcengine.com/docs/82379/1298454#%E9%89%B4%E6%9D%83%E6%96%B9%E5%BC%8F
 */
import { request } from "@/modules/network";
import Constants from "@/config/constant";

// 对话聊天
export function chatCompletions(params = {}) {
  return request({
    path: "/v3/chat/completions",
    method: "POST",
    tag: "ark",
    params: {
      model: "deepseek-r1-250120",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: "Hello!",
        },
      ],
    },
  });
}

// 对话聊天
export function chatV3Completions(data = []) {
  return request({
    path: "/v3/chat/completions",
    method: "POST",
    tag: "ark",
    loading: false,
    headers: {
      Authorization: Constants.FZHS,
    },
    params: {
      model: "deepseek-r1-250120",
      messages: [data],
    },
    onParseData: (res) => {
      if (res.error) {
        return { code: 1021, message: res.error.message };
      } else if (res.choices) {
        const choices = res.choices;
        
        return { code: 0, data: choices };
      } else {
        return { code: 1022, message: "请求失败" };
      }
    }
  });
}
