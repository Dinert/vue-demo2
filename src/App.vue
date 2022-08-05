<template>
  <div id="app">
    <!-- <d-echart :chart-data="aaa"></d-echart> -->

    <d-table-page v-bind="{table, form: searchForm, formItem: searchFormItem, pagination}">
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
            width: 80,
            align: 'center'
          },
          {
            label: '表单名称',
            prop: 'formName'
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
      }
    }
  },
  methods: {
    getTableParams() {
      return {
        url: '/zwjd-system/workflow/personal/list',
        params: {
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          isCreateByMe: true,
          defaultSort: {"prop":"submitTime","order":null}
        }
      }
    }
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
