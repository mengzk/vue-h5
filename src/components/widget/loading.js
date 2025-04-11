/**
 * Author: Meng
 * Date: 2025-03-24
 * Modify: 2025-03-24
 * Desc: 
 */

class Loading {
  /**
   * 显示加载框
   */
  static show(text) {
    Loading.hide(); // 先隐藏之前的加载框

    const ele = document.getElementById("loading");
    const box = document.createElement("div");

    ele.style.display = "flex";
    ele.className = "app-loading";
    box.className = "loading-box";
    box.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">${text||'加载中...'}</div>
    `;
    ele.appendChild(box);
  }
  /**
   * 隐藏加载框
   */
  static hide() {
    const ele = document.getElementById("loading");
    const box = ele.querySelector(".loading-box");
    if (box) {
      ele.className = "";
      ele.style.display = "none";
      ele.removeChild(box);
    }
  }
}

export default Loading;