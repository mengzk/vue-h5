/**
 * Author: Meng
 * Date: 2026-01-19
 * Modify: 2026-01-19
 * Desc:
 */
import { ref } from "vue";

export default function useScroll(el, callback) {
  // const position = ref({ x: 0, y: 0 });
  const onScroll = (e) => {
    const y = e.scrollTop;
    const x = e.scrollLeft;
    callback && callback(x, y);
  };

  const removeEvent = () => {
    el.removeEventListener("scroll", onScroll);
  };

  el.addEventListener("scroll", onScroll);

  return { position, removeEvent };
}
