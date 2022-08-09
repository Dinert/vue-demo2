<template>
  <div id="app">
    <!-- <d-echart :chart-data="aaa"></d-echart> -->

    <d-table-page v-bind="{table, form: searchForm, formItem: searchFormItem, pagination}" v-on="{
      'current-change': currentChange,
      'size-change': sizeChange
    }">
      <template #search>
      <el-button @click="search" type="primary">查询</el-button>
      </template>
    </d-table-page>
  </div>
</template>

<script>
// import {DEchart} from '@dinert/echarts'
// import {DTablePage} from '@dinert/element-ui'
import DtablePage from '@/mixins/d-table-page'
import {filterNullStrUndefind} from '@dinert/element-ui'
// import dayjs from 'dayjs'
export default {
  name: "App",
  mixins: [DtablePage],
  async created() {
    this.search()
  },
  data() {
    return {
      aaa: {series: [ {type: 'line', data: [32132,312312,321]}]},
      table: {
        data: [],
        tableColumn: [
          {
            label: '选择',
            type: 'selection'
          },
          {
            label: '序号',
            prop: 'index',
            width: 60,
            align: 'center'
          },
          {
            label: '表单名称',
            prop: 'formName',
            width: 300
          },
          {
            label: '表单类型',
            prop: 'formBusinessTypeName'
          },
          {
            label: '报送小组',
            prop: 'formGroupName'
          },
          {
            label: '填表人',
            prop: 'createUser'
          },
          {
            label: '审批人',
            prop: 'approverName'
          },
          {
            label: '报送时间',
            prop: 'submitTime'
          },
          {
            label: '填表时间',
            prop: 'createTime'
          }
        ]
      },
      
      // 查询栏的对象
      searchFormItem: {
          name: {
              type: 'input',
              label: '名称'
          }
      }
    }
  },
  methods: {

    // 获取表格的参数
    getTableParams() {
      this.params = filterNullStrUndefind(this.searchForm.model)  // 过滤null、空字符串和undefined
      const isSame = this.isEqual(this.params, this.oldParams) // 判断当前提交的参数和上一次提交的参数是否相同
      if(!isSame) {
        this.pagination.currentPage = 1
      }
      this.oldParams = {...this.params}

      return {
        url: '/zwjd-system/workflow/personal/list',
        params: {
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          isCreateByMe: true,
          defaultSort: {"prop": "submitTime", "order": null},
          ...this.params
        }
      }
    },

    // 改变表格的数据
    changeTableData(res) {
        for (let i = 0; i < res.content.length; i++) {
            res.content[i].index = i + 1 + (res.size) * res.number
        }
        this.table.data = res.content

        this.pagination.total = res.totalElements
        this.pagination.pageSize = res.size
        this.pagination.currentPage = res.number + 1
    },
  },
};
</script>

<style scoped></style>
<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app,
#app > * {
  height: 100%;
}
.d-table{
  padding: 16px !important;
}
</style>
