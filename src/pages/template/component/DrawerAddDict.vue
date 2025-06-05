<template>
  <el-drawer
    v-model="localShow"
    :title="form.id ? '编辑字典' : '新增字典'"
    size="810"
    @close="onClose"
    :with-header="false"
    :close-on-click-modal="true"
  >
    <el-form class="content" ref="formRef" :model="form" :rules="rules">
      <el-row class="col-box">
        <el-form-item class="col-item" label="字段名称" prop="dictName">
          <el-input
            class="input"
            v-model="form.dictName"
            placeholder="请输入"
            maxlength="20"
            show-word-limit
          />
        </el-form-item>

        <el-form-item class="col-item" label="字段Code" prop="dictCode">
          <el-input
            class="input"
            v-model="form.dictCode"
            placeholder="请输入"
            maxlength="20"
            show-word-limit
            :disabled="form.id > 0"
          />
        </el-form-item>
      </el-row>
      <el-row class="col-box">
        <el-form-item class="col-item" label="字段类型" prop="dictType">
          <el-select
            v-model="form.dictType"
            placeholder="请选择"
            style="width: 350px"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="col-item" label="单/多选" prop="choiceType	">
          <el-select
            v-model="form.choiceType"
            placeholder="请选择"
            style="width: 350px"
          >
            <el-option
              v-for="item in checkOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-row>

      <h3 class="label">
        <span>选项列表</span>
        <el-button class="add-button" @click="onAddItem">添加选项</el-button>
      </h3>
      <div class="field-box">
        <el-row class="col-box2">
          <span class="field-item">选项名称</span>
          <span class="field-item">选项Code</span>
          <span class="field-sort">排序</span>
        </el-row>
        <template v-for="(item, index) in itemList" :key="index">
          <div class="col-box3">
            <el-form-item class="field-item" :prop="'itemName' + index">
              <el-input
                class="field-input"
                v-model="item.itemName"
                maxlength="20"
                show-word-limit
              />
            </el-form-item>
            <el-form-item class="field-item" :prop="'itemCode' + index">
              <el-input
                class="field-input"
                v-model="item.itemCode"
                maxlength="20"
                show-word-limit
                :disabled="item.id"
              />
            </el-form-item>
            <el-form-item class="field-sort" :prop="'seq' + index">
              <el-input-number
                v-model="item.seq"
                :step="1"
                :min="0"
                :max="9999"
                style="width: 100px"
                controls-position="right"
              />
            </el-form-item>
            <div class="field-del" @click="itemList.splice(index, 1)">
              <el-icon :size="24" color="#ff3a67"><DeleteFilled /></el-icon>
            </div>
          </div>
        </template>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onCommit">提交</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["submit", "close"]);

// 本地状态，用于代理 props.show
const localShow = ref(props.show);
// 监听 props.show 的变化，更新 localShow
watch(
  () => props.show,
  (newVal) => {
    localShow.value = newVal;
  }
);
watch(
  () => props.data,
  (newVal) => {
    if (newVal) {
      const id = newVal.id || 0;
      form.value = {
        id,
        dictName: newVal.dictName || "",
        dictType: newVal.dictType || 0,
        choiceType: newVal.choiceType,
        dictCode: newVal.dictCode || "",
      };
      // itemList.value = props.data.itemList || []
    }
  }
);

const itemList = ref([]);
const formRef = ref();
const form = ref({
  id: 0,
  dictName: "",
  dictCode: "",
  dictType: 0,
  choiceType: "",
});
const rules = {
  dictName: [
    { required: true, message: "请输入字段名称", trigger: "blur" },
    { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
  ],
  dictCode: [
    { required: true, message: "请输入字段Code", trigger: "blur" },
    { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
  ],
  dictType: [{ required: true, message: "请选择字段类型", trigger: "change" }],
  choiceType: [{ required: true, message: "请选择单/多选", trigger: "change" }],
};

onMounted(() => {
  // console.log('DialogRuleEdit component mounted')
});

function onClose() {
  emit("close");
}

function onAddItem() {
  const seq = itemList.value.length;
  itemList.value.push({
    dictCode: form.value.dictCode,
    itemCode: "",
    itemName: "",
    seq,
  });
}

function onCommit() {
  const formEl = formRef.value;
  if (!formEl) {
    console.warn("formRef is not defined");
    return;
  }

  let emptyNum = 0;
  itemList.value.forEach((item) => {
    if (!item.itemName || !item.itemCode) {
      emptyNum += 1;
    }
    item.dictCode = form.value.dictCode;
  });

  formEl.validate((valid) => {
    if (valid) {
      if (emptyNum > 0) {
        ElMessage.error("选项名称和选项Code不能为空");
        return;
      }
      const options = form.value;
      options.itemList = itemList.value;

      emit("submit", options);
      // localShow.value = false // 关闭对话框
    }
  });
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 20px;
}

.col-box {
  align-items: center;
}

.col-box2 {
  margin-bottom: 16px;
}

.col-box3 {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.col-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
}

.col-item:first-child {
  margin-left: 0;
}

.input {
  width: 350px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}

.label {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}

.add-button {
  padding: 6px 8px;
  margin-left: auto;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.field-box {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.field-item {
  min-width: 280px;
  margin: 0 20px 0 0 !important;
}

.field-input {
  width: 280px;
}

.field-sort {
  margin: 0 !important;
}

.field-del {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  cursor: pointer;
}
</style>
