<template>
  <div class="page-content">
    <h2 class="page-title">租户管理</h2>
    <el-form class="search-wrap" :model="searchForm" ref="searchFormRef">
      <el-form-item class="search-wrap-item" label="关键词:" prop="word">
        <el-input v-model="searchForm.word" />
      </el-form-item>
      <el-form-item class="search-wrap-item" label="所属行业:" prop="industry">
        <el-select v-model="searchForm.industry" multiple placeholder="请选择" style="width: 230px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="search-wrap-item" label="租户状态:" prop="status">
        <el-select v-model="searchForm.status" placeholder="请选择" style="width: 230px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="search-wrap-item" label="代理账号:" prop="account">
        <el-input v-model="searchForm.account" />
      </el-form-item>
      <el-form-item class="search-wrap-item" label="租户版本:" prop="version">
        <el-select v-model="searchForm.version" placeholder="请选择" style="width: 230px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="search-wrap-item" label="创建日期:" prop="date">
        <el-date-picker
          v-model="searchForm.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item class="search-wrap-item" label="是否到期:" prop="invalid">
        <el-select v-model="searchForm.invalid" placeholder="请选择" style="width: 230px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div class="search-btns-box"></div>
      <div class="search-btns">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onResetForm">重置</el-button>
      </div>
    </el-form>

    <div class="table-list">
      <el-table
        :data="tableData"
        stripe
        header-cell-class-name="table-header"
        cell-class-name="table-cell"
        @row-click="onTableClick"
      >
        <el-table-column fixed prop="id" label="租户ID" width="100" />
        <el-table-column fixed prop="cname" label="公司简称" width="130" />
        <el-table-column prop="mode" label="账户类型" width="120" />
        <el-table-column prop="status" label="账户状态" width="120">
          <template #default="scope">
            <!-- <el-switch v-model="scope.row.status" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-color="#13ce66" inactive-color="#ff4949" active-text="开" inactive-text="关" inline-prompt /> -->
            <el-switch
              v-model="scope.row.status"
              size="large"
              active-text="开"
              inactive-text="关"
              inline-prompt
              @click="onSwitchState(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="qname" label="公司全称" min-width="200" />
        <el-table-column prop="hang" label="所属行业" width="120" />
        <el-table-column prop="account" label="代理账号" min-width="200" />
        <el-table-column prop="endDate" label="账号到期时间" width="192" />
        <el-table-column prop="createDate" label="创建时间" width="192" />
        <el-table-column prop="createUser" label="创建人" width="120" />
        <el-table-column prop="updateDate" label="更新时间" width="192" />
        <el-table-column prop="updateUser" label="更新人" width="120" />
        <el-table-column fixed="right" label="操作" min-width="136">
          <template #default="scope">
            <el-button link type="primary" @click="onEditItem(scope.row)">编辑</el-button>
            <el-button link type="danger" @click="onDeleteAlert">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="list-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 40]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>

    <!-- <el-dialog v-model="showAlert" title="新增角色" width="30%">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="描述" prop="des">
          <el-input v-model="form.des" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showAlert = false">取消</el-button>
          <el-button type="primary" @click="onStopUse">提交</el-button>
        </div>
      </template>
    </el-dialog> -->

    <el-dialog v-model="showAlert" title="租户停用" width="380" align-center>
      <div>
        <span>租户停用后，是否允许用户登录！</span>
        <el-radio-group v-model="allowLogin" size="large">
          <el-radio value="1" size="large">不允许登录</el-radio>
          <el-radio value="2" size="large">允许登录</el-radio>
        </el-radio-group>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showAlert = false">取消</el-button>
          <el-button type="primary" @click="onStopUse">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { onMounted } from 'vue'
  import { ElMessageBox } from 'element-plus'

  // const rules = {
  //   name: [
  //     { required: true, message: '请输入角色名称', trigger: 'blur' },
  //     { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  //   ],
  //   des: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
  // }

  const tableData = [
    {
      id: 12,
      mode: 1,
      date: '2016-05-03',
      name: 'Tom',
      cname: '和设计大奖',
      qname: '上的讲话方式大幅加快建设进度',
      status: 'California',
      hang: '政府部门',
      account: '完全卡死你发空间纳斯达克家',
      endDate: '2026-03-09 23:00:00',
      createDate: '2026-03-09 23:00:00',
      createUser: '合适罚款',
      updateDate: '2026-03-09 23:00:00',
      updateUser: '合适罚款'
    }
  ]

  const searchFormRef = ref()
  const searchForm = reactive({
    word: '',
    industry: '',
    status: '',
    account: '',
    version: '',
    date: '',
    invalid: ''
  })

  // const formRef = ref<FormInstance>()
  // const form = reactive({
  //   id: '',
  //   name: '',
  //   des: '',
  //   status: true
  // })

  const showAlert = ref(false)
  const allowLogin = ref('1') // 停用状态
  const tableRow = ref({}) // 表格行数据

  const currentPage = ref(1) // 当前页
  const pageSize = ref(20) // 分页
  const total = ref(100) // 总页数

  const options = [
    {
      value: 'Option1',
      label: 'Option1'
    },
    {
      value: 'Option2',
      label: 'Option2'
    },
    {
      value: 'Option3',
      label: 'Option3'
    },
    {
      value: 'Option4',
      label: 'Option4'
    },
    {
      value: 'Option5',
      label: 'Option5'
    }
  ]

  onMounted(() => {
    loadData()
  })

  // 改变分页数
  function onSizeChange(val: number) {
    pageSize.value = val
    currentPage.value = 1
    loadData()
  }
  // 跳到指定页
  function onCurrentChange(val: number) {
    currentPage.value = val
    loadData()
  }

  // 重置表单
  function onResetForm() {
    const formEl = searchFormRef.value
    if (formEl) {
      formEl.resetFields()
    }
  }
  // 搜索
  function onSearch() {
    loadData()
  }

  function onTableClick(res: any) {
    console.log('click', res)
  }

  function onEditItem(row: any) {
    console.log('edit', row)
  }

  // 显示弹窗
  // function onShowDialog() {}

  // 停用切换状态
  async function onSwitchState(row: any): Promise<boolean> {
    // console.log('switch', row)
    tableRow.value = row
    showAlert.value = true
    return false
    // ElMessageBox.confirm('租户停用后，是否允许用户登录！', '停用租户', {
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    // }).then(() => {
    //   onStopUse()
    // }).catch(() => {
    //   console.log('取消')
    // })
  }

  // 删除弹窗
  function onDeleteAlert() {
    ElMessageBox.confirm('删除之后不可恢复！', '确认删除', {
      confirmButtonClass: 'custom-confirm-button',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    })
      .then(() => {
        onDelete()
      })
      .catch(() => {
        console.log('取消')
      })
  }

  // 停用
  function onStopUse() {
    console.log('停用', tableRow.value)
    showAlert.value = false
  }

  // 删除
  async function onDelete() {
    console.log('删除')
  }

  // 获取数据
  async function loadData() {
    const params = {
      page: currentPage.value,
      size: pageSize.value,
      ...searchForm
    }
    
  }
</script>

<style lang="scss" scoped>
  .page-content {
    display: flex;
    flex-direction: column;
  }
</style>
