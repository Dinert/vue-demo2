import { DTablePage, filterNullStrUndefind } from "@dinert/element-ui";
import request from "@/service/request";
import { isEqual } from "lodash";

export default {
  components: {
    DTablePage,
  },
  created() {

    this.resetParams()
    this.resetPagination()
  },
  data() {
    return {
      // 需要提交的参数
      params: {},

      // 上一次的提交参数
      oldParams: {},

      // 表格
      table: {
        tableColumn: [],
        data: [],
        on: {
          "selection-change": (data) => {
            this.selectTableData = data;
          },
        },
      },

      // 默认分页
      defaultPagination: {
        total: 0,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50, 100],
        currentPage: 1,
      },

      // 分页
      pagination: {
       
      },

      // 选中的表格数据
      selectTableData: [],

      // 是否禁用
      isDisabled: false,

      // 查询的参数
      searchForm: {
        model: {},
      },

      // 默认的查询参数
      defaultSearchForm: {
        model: {}
      },

      // 查询栏的对象
      searchFormItem: {},
    };
  },
  methods: {
    isEqual, // 判断两个对象的值是否相等

    // 请求表格数据
    ajaxTableData(options = {}) {
      this.params = filterNullStrUndefind(this.searchForm.model); // 过滤null、空字符串和undefined
      const isSame = this.isEqual(this.params, this.oldParams); // 判断当前提交的参数和上一次提交的参数是否相同

      // 在查询按钮点击时才走当前提交的参数和上一次提交的参数是否相同
      if (options.name === "查询") {
        if (!isSame) {
          this.pagination.currentPage = 1;
        }
        this.oldParams = { ...this.params };
      } else if(options.name === '重置') {
        this.resetPagination()
      } else if (options.name === "删除") {
        if (this.table.data && this.table.data.length) {
          if (this.table.data.length === 1 && this.pagination.currentPage > 1) {
            this.pagination.currentPage = this.pagination.currentPage - 1;
          }
        }
      } else {
        this.params = { ...this.oldParams };
      }

      const params = this.getTableParams(options);
      return request(params);
    },

    // 获取表格数据
    async getTableData(options) {
      const res = await this.ajaxTableData(options);
      this.changeTableData(res);

      // 表格数据请求完成的回调
      typeof this.ajaxTableDataAfter === "function" &&
        this.ajaxTableDataAfter(res, options);
        return res
    },

    // 改变表格的数据
    changeTableData(res) {
      res.data = res.data || res.content;
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].index = i + 1 + res.pageNum * res.pageSize;
      }
      this.table.data = res.data;

      this.pagination.total = res.total;
      this.pagination.pageSize = res.pageSize;
      this.pagination.currentPage = res.pageNum;
    },

    // 重置表格请求的参数
    resetParams() {
      for (const prop in this.defaultSearchForm.model) {
        this.$set(this.searchForm.model, prop, this.defaultSearchForm.model[prop]);
      }
    },

    // 清空参数
    clearParams() {
      for (const prop in this.model) {
        this.model[prop] = "";
      }
    },

    // 重置分页参数
    resetPagination() {
      for(const prop in this.defaultPagination) {
        this.pagination[prop] = this.defaultPagination[prop]
      }
    },

    // 查询
    search(options) {
      return this.getTableData(options);
    },

    // 查询重置
    resetSearch(options) {
      this.resetParams();
      this.search(options);
    },

    // 切换页数
    currentChange(value) {
      this.pagination.currentPage = value;
      this.search();
    },

    // 切换每页条数
    sizeChange(value) {
      this.pagination.pageSize = value;
      this.search();
    },
  },
};
