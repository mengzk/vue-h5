/**
 * Author: Meng
 * Date: 2025-03-24
 * Modify: 2025-03-24
 * Desc:
 */

class Dialog {

  setTitle(title) {
    this.title = title;
  }

  setMessage(message) {
    this.message = message;
  }

  setButtons(buttons) {
    this.buttons = buttons;
  }

  setCallback(callback) {
    this.callback = callback;
  }
  show() {
    // Show the dialog with the specified title, message, and buttons
    console.log("Showing dialog:", this.title, this.message, this.buttons);
    if (this.callback) {
      this.callback();
    }
  }
  hide() {
    // Hide the dialog
    console.log("Hiding dialog");
  }
}

Dialog.prototype.showLoading = function () {
  // Show loading indicator
  console.log("Showing loading indicator");
};
Dialog.prototype.hideLoading = function () {
  // Hide loading indicator
  console.log("Hiding loading indicator");
};
Dialog.prototype.showError = function (error) {
  // Show error message
  console.error("Error:", error);
};
Dialog.prototype.showSuccess = function (message) {
  // Show success message
  console.log("Success:", message);
};
Dialog.prototype.showWarning = function (message) {
  // Show warning message
  console.warn("Warning:", message);
};
Dialog.prototype.showInfo = function (message) {
  // Show info message
  console.info("Info:", message);
};
Dialog.prototype.showPrompt = function (message, callback) {
  // Show prompt dialog
  const userInput = prompt(message);
  callback(userInput);
};
Dialog.prototype.showConfirm = function (message, callback) {
  // Show confirm dialog
  const userConfirmed = confirm(message);
  callback(userConfirmed);
};
Dialog.prototype.showAlert = function (message) {
  // Show alert dialog
  alert(message);
};
Dialog.prototype.showToast = function (message) {
  // Show toast notification
  console.log("Toast:", message);
};
Dialog.prototype.showModal = function (message, callback) {
  // Show modal dialog
  const userConfirmed = confirm(message);
  callback(userConfirmed);
};
Dialog.prototype.showTooltip = function (message) {
  // Show tooltip
  console.log("Tooltip:", message);
};
Dialog.prototype.showSnackbar = function (message) {
  // Show snackbar notification
  console.log("Snackbar:", message);
};
