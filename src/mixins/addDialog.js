import request from '@/service/request'
import {DForm} from '@dinert/element-ui'

export default {
    components: {
        AddDialog: () => import('@/base-ui/add-dialog'),
        DForm
    },
    data() {
        return {

            // 弹窗状态
            addVisible: false,

            // 新增的form数据
            addForm: {
                model: {}
            },
            isOldAddFormModel: false, // 是否保存上一次输入的状态数据

            // 默认的数据
            defaultAddFormModel: {

            },

            // col布局
            addDialogColLayout: {
                xl: 24, // ≥1920px
                lg: 24, // ≥1200px
                md: 24, // ≥992px
                sm: 24, // ≥768px
                xs: 24 // <768px
            }
        }
    },
    methods: {
        // 打开新增的弹窗
        async addDialogFn() {
            if (!this.isOldAddFormModel) {
                this.addForm.model = {...this.defaultAddFormModel}
            }

            await this.$refs.addForm && this.$refs.addForm.$children[0].clearValidate()
            this.addVisible = true
        },

        // 关闭新增的弹窗
        closeAddDialogFn() {
            this.addVisible = false
        },

        // 新增的请求
        async ajaxAdd(options) {
            let isValidate = null
            try {
                isValidate = await this.$refs.addForm.$children[0].validate()
            } catch (error) {
                // console.log(error)
            }
            if (isValidate) {
                const params = this.getAddParams()
                const data = await request({
                    method: 'post',
                    ...params,
                    ...options
                })

                if (data) {
                    this.closeAddDialogFn()
                    this.$message.success('新增成功')
                    this.search({
                        headers: {
                            hideLoading: true
                        }
                    })

                    typeof this.addDataCallback === 'function' && this.addDataCallback({
                        headers: {
                            hideLoading: true
                        }
                    })
                }
            }

        }
    }
}
