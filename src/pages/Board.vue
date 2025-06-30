<template>
  <div class="page board">
    <canvas id="boardCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const canvasRef = ref(null);
const ctxRef = ref(null);
const lastPosition = { x: 0, y: 0 }; // 上一次鼠标位置

// 画布上的元素列表
const itemList = [
  { id: 1, type: 'rectangle', x: 200, y: 300, width: 100, height: 100, color: '#FF0000' },
  { id: 2, type: 'circle', x: 500, y: 700, radius: 50, color: '#00FF00' },
];
const isEdit = ref(false); // 是否处于编辑状态
const isShow = ref(false); // 是否显示编辑器


onMounted(() => {
  initCanvas();
  window.addEventListener("resize", initCanvas);
  // 监听鼠标事件
  document.addEventListener("mousedown", (event) => {
    console.log("Mouse down at:", event.clientX, event.clientY);
    isEdit.value = true; // 设置为编辑状态
  });
  document.addEventListener("mousemove", (event) => {
    console.log("Mouse move at:", event.clientX, event.clientY);
    const mx = event.clientX;
    const my = event.clientY;
    showMousePosition(mx, my); // 显示鼠标位置
    if (isEdit.value) {
      listenMousePosition(mx, my); // 监听鼠标位置
    }
  });
  document.addEventListener("mouseup", (event) => {
    console.log("Mouse up at:", event.clientX, event.clientY);
    isEdit.value = false; // 取消编辑状态
  });
});

function initCanvas() {
  const canvas = document.getElementById("boardCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvasRef.value = canvas;
    ctxRef.value = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawItems(canvas, ctx); // 绘制所有元素
  }
}

function clearCanvas() {
  const canvas = canvasRef.value;
  const ctx = ctxRef.value;
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// 显示鼠标位置
function showMousePosition(x, y) {
  const canvas = canvasRef.value;
  if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    // 清除之前的文本
    ctx.clearRect(0, 0, canvas.width, 30);
    ctx.fillText(`(${x}, ${y})`, 10, 20);

    // 跟随鼠标位置绘制线条
    // ctx.lineTo(x, y);
    // ctx.strokeStyle = "#000";
    // ctx.lineWidth = 1;
    // ctx.stroke();

  }
}

// 绘制所有元素
function drawItems(canvas, ctx) {
  clearCanvas(); // 清除画布

  ctx.fillStyle = "#f6f6f6"; // 设置背景颜色
  ctx.fillRect(0, 0, canvas.width, canvas.height); // 填充背景

  itemList.forEach(item => {
    if (item.type === 'rectangle') {
      ctx.fillStyle = item.color;
      ctx.fillRect(item.x, item.y, item.width, item.height);
    } else if (item.type === 'circle') {
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
    }
  });
}


// 监听鼠标位置
function listenMousePosition(mx, my) {
  const item = getMouseOverItem(mx, my);
  if (item) {
    moveItem(item, mx, my); // 移动元素到鼠标位置
  }
}

// 移动元素
function moveItem(item, newX, newY) {
  const ctx = ctxRef.value;
  if (!ctx) return;
  const rectX = item.x + newX - lastPosition.x; // 假设元素的初始位置是 (50, 50)
  const rectY = item.y + newY - lastPosition.y; // 假设元素的初始位置是 (50, 50)
  const rectWidth = item.width; // 矩形的宽度
  const rectHeight = item.height; // 矩形的高度

  // 清除上一个矩形
  ctx.clearRect(item.x, item.y, rectWidth, rectHeight);
  ctx.fillStyle = "#FF6600"; // 如果在方块内，填充绿色
  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
  item.x = rectX; // 更新元素位置
  item.y = rectY; // 更新元素位置
  lastPosition.x = newX; // 更新上一次鼠标位置
  lastPosition.y = newY; // 更新上一次鼠标位置
}


// 检测鼠标是否在元素上
function getMouseOverItem(mx, my) {
  for (const item of itemList) {
    if (item.type === 'rectangle') {
      if (mx >= item.x && mx <= item.x + item.width && my >= item.y && my <= item.y + item.height) {
        return item; // 鼠标在矩形上
      }
    } else if (item.type === 'circle') {
      const dx = mx - item.x;
      const dy = my - item.y;
      if (dx * dx + dy * dy <= item.radius * item.radius) {
        return item; // 鼠标在圆形上
      }
    }
  }
}

</script>

<style scoped>
.board {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#boardCanvas {
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
}
</style>
