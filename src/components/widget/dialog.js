/**
 * Author: Meng
 * Date: 2025-03-24
 * Modify: 2025-03-24
 * Desc:
 */

class Dialog {
  /**
   * 显示加载框
   */
  static show({
    title = "提示",
    content = "",
  }) {
    Dialog.hide();

    const ele = document.getElementById("popup");
    const box = document.createElement("div");

    const titleEle = document.createElement("div");
    const cententEle = document.createElement("div");
    const actionsEle = document.createElement("div");
    const buttonEle = document.createElement("button");

    ele.style.display = "flex";
    ele.className = "app-popup";
    box.className = "dialog-box";

    titleEle.className = "dialog-title";
    cententEle.className = "dialog-content";
    actionsEle.className = "dialog-actions";
    buttonEle.className = "dialog-button";

    titleEle.innerText = title;
    cententEle.innerText = content;
    buttonEle.innerText = "确 认";

    buttonEle.onclick = function () {
      Dialog.hide();
    };

    actionsEle.appendChild(buttonEle);
    box.appendChild(titleEle);
    box.appendChild(cententEle);
    box.appendChild(actionsEle);

    ele.appendChild(box);
  }
  /**
   * 隐藏加载框
   */
  static hide() {
    const ele = document.getElementById("popup");
    const box = ele.querySelector(".dialog-box");
    if (box) {
      ele.className = "";
      ele.style.display = "none";
      ele.removeChild(box);
    }
  }
}

// Dialog.prototype.showLoading = function () {
//   // Show loading indicator
//   console.log("Showing loading indicator");
// };
// Dialog.prototype.hideLoading = function () {
//   // Hide loading indicator
//   console.log("Hiding loading indicator");
// };
// Dialog.prototype.showError = function (error) {
//   // Show error message
//   console.error("Error:", error);
// };
// Dialog.prototype.showSuccess = function (message) {
//   // Show success message
//   console.log("Success:", message);
// };
// Dialog.prototype.showWarning = function (message) {
//   // Show warning message
//   console.warn("Warning:", message);
// };
// Dialog.prototype.showInfo = function (message) {
//   // Show info message
//   console.info("Info:", message);
// };
// Dialog.prototype.showPrompt = function (message, callback) {
//   // Show prompt dialog
//   const userInput = prompt(message);
//   callback(userInput);
// };
// Dialog.prototype.showConfirm = function (message, callback) {
//   // Show confirm dialog
//   const userConfirmed = confirm(message);
//   callback(userConfirmed);
// };
// Dialog.prototype.showAlert = function (message) {
//   // Show alert dialog
//   alert(message);
// };
// Dialog.prototype.showToast = function (message) {
//   // Show toast notification
//   console.log("Toast:", message);
// };
// Dialog.prototype.showModal = function (message, callback) {
//   // Show modal dialog
//   const userConfirmed = confirm(message);
//   callback(userConfirmed);
// };
// Dialog.prototype.showTooltip = function (message) {
//   // Show tooltip
//   console.log("Tooltip:", message);
// };
// Dialog.prototype.showSnackbar = function (message) {
//   // Show snackbar notification
//   console.log("Snackbar:", message);
// };

export default Dialog;