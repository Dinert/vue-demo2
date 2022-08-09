import {DTablePage} from '@dinert/element-ui'
import request from '@/service/request'
import {isEqual} from 'lodash'
export default {
    components: {
        DTablePage
    },
    data() {
        return {
            // 需要提交的参数
            params: {

            },

            // 默认参数
            defaultParams: {

            },

            // 上一次的提交参数
            oldParams: {

            },

            // 表格
            table: {
                tableColumn: [],
                data: [],
                on: {
                    'selection-change': data => {
                        this.selectTableData = data
                    }
                }
            },

            // 分页
            pagination: {
                total: 0,
                pageSize: 10,
                pageSizes: [10, 20, 30, 50, 100],
                currentPage: 1
            },

            // 选中的表格数据
            selectTableData: [],

            // 是否禁用
            isDisabled: false,

            // 查询的默认参数
            searchForm: {
                model: {}
            },

            // 查询栏的对象
            searchFormItem: {
            }
        }
    },
    methods: {
        isEqual, // 判断两个对象的值是否相等

        // 请求表格数据
        ajaxTableData() {
            const params = this.getTableParams()
            return request(params)
        },

        // 获取表格数据
        async getTableData() {
            const res = await this.ajaxTableData()
            this.changeTableData(res)
        },

        // 改变表格的数据
        changeTableData(res) {
            res.data = res.data || res.content
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].index = i + 1 + (res.pageNum) * res.pageSize
            }
            this.table.data = res.data

            this.pagination.total = res.total || res.totalElements
            this.pagination.pageSize = res.pageSize || res.size
            this.pagination.currentPage = res.pageNum || res.number + 1
        },

        // 重置表格请求的参数
        resetParams() {
            for (const prop in this.defaultParams) {
                this.$set(this.params, prop, this.defaultParams[prop])
            }
        },

        // 清空参数
        clearParams() {
            for (const prop in this.params) {
                this.params[prop] = ''
            }
        },

        // 查询
        search(options) {
            this.getTableData(options)
        },

        // 查询重置
        resetSearch() {
            this.resetParams()
            this.search()
        },

        // 切换页数
        currentChange(value) {
            this.pagination.currentPage = value
            this.search()
        },

        // 切换每页条数
        sizeChange(value) {
            this.pagination.pageSize = value
            this.search()
        }
    }
}
