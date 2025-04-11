/**
 * Author: Meng
 * Date: 2024-07-15
 * Modify: 2024-07-15
 * Desc:
 */

let _stack = [];

function getStack(index) {
  return _stack[index];
}

function setStack(route) {
  _stack.push(route);
}

function popStack() {
  _stack.pop();
}

function clearStack() {
  _stack = [];
}
