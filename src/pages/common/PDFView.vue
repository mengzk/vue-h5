<template>
  <!-- <div class="container"> -->
  <div class="pdf-page">
    <div v-show="showMenu" ref="barRef" class="pdf-menu-bar">
      <template v-for="num in pageList" v-key="num">
        <div class="pdf-menu-item" @click="onMoveTo(num)">
          <img :class="`pdf-menu-img ${curNum == num ? 'select' : ''}`" :id="`pdf-menu-img-${num}`" />
          <span class="pdf-menu-num">{{ num }}</span>
        </div>
      </template>
      <canvas hidden id="pdf-canvas"></canvas>
    </div>
    <div :class="`pdf-box ${showMenu ? '' : 'pdf-box-full'}`">
      <div ref="pdfRef" class="pdf-view">
        <template v-for="num in pageList" :key="num">
          <div :id="`pdf-item-${num}`" class="pdf-view-item">
            <canvas :id="`pdf-canvas-${num}`"></canvas>
          </div>
        </template>
      </div>
      <div class="pdf-pagination" v-show="status > 0">{{ curNum }}/{{ pageNum }}</div>
      <!-- <div class="pdf-menu-float" v-show="status > 0" @click="onChangeShow">目录</div> -->
      <div class="pdf-alert" v-show="status < 1">{{ status == 0 ? '加载中...' : '加载失败，请重新打开！' }}</div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue';
import * as PDFJS from 'pdfjs-dist';
// import * as PDFWorker from "pdfjs-dist/legacy/build/pdf.worker"
import * as PDFWorker from "pdfjs-dist/build/pdf.worker.min.mjs"

const loopSize = 2; //
let loopNum = 0; //
let isLoop = true; //
let lastScrollY = 0; //
let loopTimer = 0; //
let scrollTimer = 0; //
let rendList = []; //
let renderedList = []; // rendered page list


const url = ref("https://dhstatic.bthome.com/prod/images/bigscreen/pdf/2023Yearbook.pdf"); // pdf url
const barRef = ref(null); // menu bar ref
const pdfRef = ref(null); // pdf ref
const pageList = ref([]); // page number list
const pageNum = ref(0); // total page number
const curNum = ref(0); // current page number
const status = ref(0); // 0: loading, 1: loaded, 2: error
const showMenu = ref(false); // show menu

onMounted(() => {
  // download(params.url).then((res) => {
  //   console.log("res:", res)
  //   const blob = new Blob([res], { type: "application/pdf" })
  //   const url = URL.createObjectURL(blob)
  //   console.log("------> pdf down ok", url)
  //   initPdf(url)
  // })
  // setWorkerSrc();
  initPdf();
});

// 跳转到指定页
function onMoveTo(num) {
  // console.log('---> onMoveTo:', num);
  console.log('---> renderedList:', pdfRef.value.scrollHeight);
  if (num >= 0 && num <= pageNum.value) {
    const SH = pdfRef.value.scrollHeight;
    let total = pageNum.value;
    const top = (num - 1) / total * SH
    pdfRef.value.scrollTo({ top, behavior: 'smooth' });
  }
}

// 获取菜单图片
async function getMenuImg(pdfRes, num) {
  const page = await pdfRes.getPage(num)
  const viewport = page.getViewport({ scale: 0.1 })
  const canvasDiv = document.getElementById("pdf-canvas")
  const context = canvasScale(canvasDiv, viewport, num)

  const renderContext = { canvasContext: context, viewport: viewport }
  await page.render(renderContext).promise

  const proviewImg = document.getElementById(`pdf-menu-img-${num}`)
  proviewImg.src = canvasDiv.toDataURL("image/png", 0.3)

  if (num < pageNum.value) {
    getMenuImg(pdfRes, num + 1)
  }
}

function setWorkerSrc() {
  PDFJS.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();
}

/**
 * 初始化pdf
 * 可以通过下载文件的方式获取pdf文件
 * 可以目录加载完毕，再开始渲染
 */
async function initPdf() {
  try {
    const loadingTask = PDFJS.getDocument({ url: url.value, rangeChunkSize: 128 * 1024 }); // 设置块大小，默认是（64KB）网络好可以设置大点
    const loadRes = await loadingTask.promise;

    const total = loadRes.numPages;
    pageList.value = Array.from({ length: total }, (_, k) => k + 1);
    pageNum.value = total;
    status.value = 1;
    curNum.value = 1;
    nextTick(() => {
      startRender(loadRes);
      scrollListener(loadRes);
      // getMenuImg(loadRes, 1); // 获取缩略图
    }); // wait for render
  } catch (err) {
    console.warn('---> initPdf err', err);
    status.value = -1;
  }
}

async function startRender(loadRes) {
  rendList = getPageList(2, 2);
  await renderDocs(loadRes, 0, rendList);
  loopRender(loadRes, 4, false, 3600);
}

function scrollListener(loadRes) {
  if (pdfRef.value) {
    let total = pageNum.value;
    const height2 = pdfRef.value.clientHeight - 100;
    pdfRef.value.addEventListener('scroll', (e) => {
      const { scrollTop, scrollHeight } = e.target;
      // console.log('---> scroll:', scrollTop, scrollHeight);
      const validHeight = scrollHeight - height2;
      let isUp = scrollTop < lastScrollY;
      const loads = renderedList;
      lastScrollY = scrollTop;
      let position = Math.ceil((total * (scrollTop + 1)) / validHeight);
      if (position >= total) {
        if (loads.length < total) {
          onScrollEnd(loadRes, total - 2, isUp);
        }
        curNum.value = total;
        return;
      }
      curNum.value = position;
      if (position > 0) {
        const SH2 = barRef.value.scrollHeight;
        const top = (position - 2) / total * SH2
        barRef.value.scrollTo({ top, behavior: 'auto' });
      }

      if (Math.abs(scrollTop - lastScrollY) < 500) {
        isLoop = false;
        if (loopTimer) {
          clearTimeout(loopTimer);
        }
      }
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }

      scrollTimer = setTimeout(() => {
        clearTimeout(scrollTimer);
        onScrollEnd(loadRes, position, isUp);
      }, 300);
    });
  }
}

async function onScrollEnd(loadRes, position, isUp) {
  let total = pageNum.value;
  if (position > 0 && position < total) {
    rendList = getPageList(position, loopSize);
    await renderDocs(loadRes, 0, rendList);
    isLoop = true;
    let nextIdx = position + (loopSize + 1) * (isUp ? -1 : 1);
    loopRender(loadRes, nextIdx, isUp, 10);
  }
}

function loopRender(loadRes, num, order, time = 3600) {
  if (isLoop) {
    let list = pageList.value.filter((e) => !renderedList.includes(e));
    if (renderedList.length >= pageList.length) {
      return;
    }
    if (loopTimer) {
      clearTimeout(loopTimer);
    }
    loopNum = num;
    loopTimer = setTimeout(() => {
      clearTimeout(loopTimer);
      // console.log('---> loopRender:', num);
      let idx = renderedList.indexOf(num);
      if (list.length > 0) {
        if (list.length > 3) {
          // 处理加载优先级
          idx = list.indexOf(num); // 当前页位置
          if (num > list[0] && idx > 0) {
            list = list.slice(idx, idx + 3);
          } else {
            list = list.slice(0, 3);
          }
        }
        // console.log("---> loopRender list:", idx, list);
        let nextIdx = order ? list[0] : list[list.length - 1];
        nextIdx += order ? -3 : 1;
        renderDocs(loadRes, 0, list).finally(() => {
          loopRender(loadRes, nextIdx, order, 300);
        });
      }
    }, time);
  }
}

async function renderDocs(loadRes, index, list) {
  await renderPage(loadRes, list[index]);
  if (index < list.length - 1) {
    renderDocs(loadRes, index + 1, list);
  } else {
    return true;
  }
}

async function renderPage(loadRes, num) {
  try {
    const total = pageNum.value;
    if (num < 1 || num > total) {
      console.log('---> page more than:', num);
      return true;
    } else {
      // console.log("------> renderPage:", num);
      if (renderedList.includes(num)) {
        return true;
      }
      const page = await loadRes.getPage(num);
      // page.cleanup();
      const viewport = page.getViewport({ scale: 1 });
      const canvasDiv = document.getElementById(`pdf-canvas-${num}`);

      if (canvasDiv) {
        const context = canvasScale(canvasDiv, viewport);
        const renderContext = { canvasContext: context, viewport: viewport };
        renderedList.push(num);
        status.value = Date.now();
        await page.render(renderContext).promise;
        return true;
      }
    }
  } catch (err) {
    console.warn('---> render err:', num, err);
  }
  return false;
}

// 画布缩放
function canvasScale(canvasDiv, viewport) {
  if (canvasDiv) {
    const ctx = canvasDiv.getContext('2d', { willReadFrequently: false });

    const dpr = window.devicePixelRatio || 1;
    const ratio = dpr / 1;
    canvasDiv.width = viewport.width * ratio;
    canvasDiv.height = viewport.height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return ctx;
  }
}

// 获取需要加载列表
function getPageList(num, len) {
  let list = [];
  for (let i = -len; i <= len; i++) {
    list.push(num + i);
  }
  return list;
}

function onChangeShow() {
  showMenu.value = !showMenu.value;
}
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.pdf-page {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.pdf-box {
  width: calc(100% - 152px);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.pdf-box-full {
  width: 100%;
}

.pdf-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #5d5d5d;
}

.pdf-view-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1px;
  background-color: white;
}

.pdf-pagination {
  position: absolute;
  top: 32px;
  right: 12px;
  z-index: 10;
  min-width: 44px;
  padding: 5px 0;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 12px;
  text-align: center;
}

.pdf-menu-float {
  position: absolute;
  top: 32px;
  left: 16px;
  z-index: 10;
  padding: 6px 12px;
  border-radius: 4px 0 0 4px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 14px;
  text-align: center;
}

.pdf-alert {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 16px 20px;
  border-radius: 8px;
  /* background-color: rgba(0, 0, 0, 0.6); */
  color: white;
  font-size: 18px;
  font-weight: 500;
}

.pdf-menu-bar {
  width: 152px;
  height: 100%;
  min-width: 152px;
  padding: 16px 16px 0 16px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #4d4d4d;
}

.pdf-menu-item {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 16px;
}

.pdf-menu-img {
  width: 120px;
  /* height: 200px; */
  min-height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.pdf-menu-img.select {
  /* transition: 0.1s; */
  transform: scale(1.16);
  border: 2px solid #4e89ffc9;
}

.pdf-menu-num {
  color: white;
  font-size: 14px;
  position: absolute;
  z-index: 1;
  right: 6px;
  bottom: 6px;
  padding: 2px 8px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
