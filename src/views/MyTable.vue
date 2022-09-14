<template>
  <div class="myTable">
    <d-table-page
      ref="table"
      v-bind="{
        table,
        form: searchForm,
        formItem: searchFormItem,
        pagination,
        tableSlot: true,
      }"
      v-on="{
        'current-change': currentChange,
        'size-change': sizeChange,
      }"
      class="near"
    >
      <template #search>
        <el-button @click="search({ name: '查询' })" type="primary"
          >查询</el-button
        >
        <el-button @click="resetSearch({ name: '重置' })"
          >重置</el-button
        >
      </template>

      <template #header-left>
        <el-button type="primary" icon="el-icon-circle-plus" @click="add"
          >新增</el-button
        >
      </template>

      <template #column_operations="scope">
        <el-link type="primary" style="margin-right: 8px">编缉</el-link>
        <el-link type="danger" @click="deleteData(scope)">删除</el-link>
      </template>
    </d-table-page>
  </div>
</template>

<script>
import DtablePage from "@/mixins/dTablePage";
import request from "@/service/request";
import {transform} from '@dinert/utils'
export default {
  name: "MyTable",
  mixins: [DtablePage],
  components: {},
  created() {
    this.search({name: '查询'});
  },
  mounted() {
  transform.underline('a')
  },
  data() {
    return {
      table: {
        // children: true,
        data: [],
        ref: 'table',
        tableColumn: [
          {
            label: "选择",
            type: "selection",
            align: "center",
          },
          {
            label: "序号",
            prop: "index",
            width: 60,
            align: "center",
          },
          {
            label: "行业名称",
            prop: "industryName",
          },
          {
            label: "数量",
            prop: "industryAmount",
          },
          {
            label: "占比率",
            prop: "percentString",
          },
          {
            label: "备注",
            prop: "remark",
          },
          {
            label: "操作",
            width: "200px",
            prop: "operations",
            align: "center",
            fixed: "right",
            setting: true,
          },
        ],
      },

      // 查询栏的对象
      searchFormItem: {
        industryName: {
          type: "input",
          label: "行业名称",
        },
      }
    };
  },
  computed: {},
  methods: {
    // 获取表格的参数
    getTableParams() {
      return {
        url: "/zwjd-system/bigScreenThreeNum1/selectPageThreeNum1",
        method: "POST",
        data: {
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          condition: {
            ...this.params,
          },
        },
      };
    },

    async add() {
      await request({
        url: "/zwjd-system/bigScreenThreeNum1/insertThreeNum1",
        method: "post",
        data: [
          {
            industryAmount: 123,
            industryName: "test",
            remark: "testttttttttttttt",
          },
        ],
      });
      this.search()
    },

    // 改变表格的数据
    changeTableData(res) {
      for (let i = 0; i < res.records.length; i++) {
        res.records[i].index = i + 1 + (res.current - 1) * res.size;
      }
      this.table.data = res.records;

      this.pagination.total = res.total;
      this.pagination.pageSize = res.size;
      this.pagination.currentPage = res.current;
    },

    // 删除数据
   async deleteData(scope) {
      await request({
        url: '/zwjd-system/bigScreenThreeNum1/deleteThreeNum1',
        method: 'post',
        data: [scope.row]
      })
      this.search({name: '删除'})
    }
  },
};
</script>

<style lang="scss" scoped>
.myTable {
  height: 100%;
  .d-table-page {
    height: 100%;
    padding-bottom: 16px;
    box-sizing: border-box;
  }
}
</style>
