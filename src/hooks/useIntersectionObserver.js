/**
 * Author: Meng
 * Date: 2026-01-19
 * Modify: 2026-01-19
 * Desc:
 */
import { ref } from "vue";

export default function useScroll(el, callback) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("元素出现在窗口中");
          // observer.unobserve(entry.target); // 只想触发一次的话，可以在这里取消观察
        }
      });
    },
    {
      root: null, // 以窗口为参照
      threshold: 0.2, // 20% 可见时触发
    }
  );

  observer.observe(el);

  // 移除监听
  const removeObserver = () => {
    observer.disconnect();
  };

  return { position, removeObserver };
}
