/**
 * Author: Meng
 * Date: 2026-01-19
 * Modify: 2026-01-19
 * Desc:
 */
import { ref } from "vue";

export default function useWheel(el, callback) {
  // const position = ref({ x: 0, y: 0 });
  const onWheel = (e) => {
    const y = e.scrollTop;
    const x = e.scrollLeft;

    callback && callback(x, y);
  };

  const removeEvent = () => {
    el.removeEventListener("wheel", onWheel);
  };

  el.addEventListener("wheel", onWheel);

  return { position, removeEvent };
}
