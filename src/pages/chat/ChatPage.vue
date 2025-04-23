<template>
  <div class="chat">
    <Header title="AI解读" />

    <div class="scroll-box" ref="scrollBox">
      <!-- 聊天内容列表 -->
      <div v-for="(item, index) in chatList" :key="index">
        <div v-if="item.role != 'user'" class="chat-item">
          <div class="avatar">
            <img class="avatar-img" :src="robot" alt="" />
          </div>
          <div class="content">
            <div class="text" v-html="parseMarkdown(item.text)"></div>
          </div>
        </div>

        <div v-else class="chat-item-right">
          <div class="content">
            <!-- <div class="name">小猫</div> -->
            <div class="text">{{ item.text }}</div>
          </div>
          <div class="avatar-right">
            <img class="avatar-img" :src="avatar" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="input-box">
      <input type="input-view" placeholder="请输入聊天内容" v-model="keyword" @keydown.enter="onSend" />
      <button @click="onSend">发送</button>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { marked } from "marked";

import Header from "@/components/Header.vue";

import Loading from "@/components/widget/loading";

import { chatV3Completions } from "@/apis/chat";

// const avatar = "https://img.yzcdn.cn/vant/cat.jpeg";
import robot from "@/assets/robot.png";
import avatar from "@/assets/user.svg";

const chatList = ref([]);
const keyword = ref("");
const scrollBox = ref(null);
const isLoading = ref(false);

onMounted(() => {
  const text = sessionStorage.getItem("chat-text");
  if (text) {
    Loading.show('解读中...');
    sessionStorage.removeItem("chat-text");
    queryAnswer(text, true);
  }
});

function onBack() {
  console.log("onBack");
}

// function onEnter(e) {
//   if (e.keyCode === 13) {}
// }

async function onSend() {
  const text = keyword.value;
  if(isLoading.value) {
    return;
  }
  queryAnswer(text);
}

// 发送消息
async function queryAnswer(text, frist) {
  isLoading.value = true;
  const list2 = [].concat(chatList.value);
  if (text) {
    keyword.value = "";
    if(!frist) {
      const item = { text, role: "user" };
      list2.push(item);
    }

    list2.push({ text: "正在思考中...", role: "loading" });
    chatList.value = list2;
    // 滚动到最后一条数据
    if (scrollBox.value) {
      scrollBox.value.scrollTop = scrollBox.value.scrollHeight;
    }
    const {code, data} = await chatV3Completions({ role: "user", content: text, });
    // console.log(code, data);
    isLoading.value = false;
    if(code == 0) {
      const item = data[0].message;
      // let value = item.content.replace(/\n/g, "<br/>");
      // value = value.replace(/\**/g, "<strong>");
      // 替换数据最后一条数据
      list2.pop();
      list2.push({ text: item.content, role: "robot" });
    }else {
      // 替换数据最后一条数据
      list2.pop();
      list2.push({ text: "思考失败，请稍后再试", role: "error" });
    }
    chatList.value = [].concat(list2);
    // 滚动到最后一条数据
    if (scrollBox.value) {
      scrollBox.value.scrollTop = Math.min(scrollBox.value.scrollHeight, 200);
    }

    Loading.hide();
  }
}

// 解析 Markdown 文本
function parseMarkdown(text) {
  return marked(text);
}
</script>

<style>
.chat {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.scroll-box {
  flex: 1;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.chat-item {
  display: flex;
  border-radius: 8px;
  margin-right: 24px;
  margin-bottom: 32px;
}
.chat-item-right {
  display: flex;
  justify-content: flex-end;
  margin-left: 96px;
  margin-bottom: 32px;
}
.avatar {
  width: 88px;
  height: 88px;
  min-width: 88px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 24px;
}
.avatar-right {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 24px;
}
.avatar-img {
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;

  background-color: var(--box-color);
  border-radius: 16px;
  padding: 26px 32px;
}
.name {
  margin-bottom: 16px;
  font-size: 32px;
  color: var(--date-color);
}
.text {
  font-size: 40px;
  color: white;
  font-weight: 400;
  /* white-space: pre-line; */
  user-select: text;
}
.input-box {
  display: flex;
  padding: 32px;
}
input {
  flex: 1;
  height: 88px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 0 24px;
  font-size: 36px;
}
button {
  width: 160px;
  height: 88px;
  border-radius: 12px;
  margin-left: 16px;
  background-color: #1989fa;
  border: none;
  color: #fff;
  font-size: 38px;
}
</style>
