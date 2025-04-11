/**
 * Author: Meng
 * Date: 2025-03-24
 * Modify: 2025-03-24
 * Desc: 
 */

class Toast {
  static duration = 3000;
  static position = "center";
  static text = "";

  static show(text, duration, position) {

    setTimeout(() => {
      this.hide();
    }, this.duration);
  }
  static hide() {
  }
}