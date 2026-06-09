/**
 * 按钮权限
 */
import Vue from 'vue';

function init() {
  Vue.directive('rules', {
    inserted(el, binding) {
      const {value} = binding;
    }
  })
}
