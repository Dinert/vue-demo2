<template>
  <div class="myTable">
    <d-table-page
      v-bind="{ table, form: searchForm, formItem: searchFormItem, pagination }"
      v-on="{
        'current-change': currentChange,
        'size-change': sizeChange,
      }"
    >
      <template #search>
        <el-button @click="search({ name: '查询' })" type="primary"
          >查询</el-button
        >
      </template>
    </d-table-page>
  </div>
</template>

<script>
import DtablePage from '@/mixins/dTablePage'

export default {
  name: "MyTable",
  mixins: [DtablePage],
  components: {},
  created() {
    this.search()
  },
  mounted() {},
  data() {
    return {
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
      // 953359269563961344
      // 查询栏的对象
      searchFormItem: {
          formGroupName: {
              type: 'input',
              label: '名称'
          }
      }
    };
  },
  computed: {},
  methods: {
        // 获取表格的参数
    getTableParams() {

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

<style lang="scss" scoped>
.myTable{
  height: 100%;
  .d-table-page{
    height: 100%;
    padding-bottom: 16px;
    box-sizing: border-box;
  }
}
</style>
