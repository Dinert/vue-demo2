<template>
    <d-dialog
        class="addDialog"
        title="新增"
        :visible="visible"
        width="600px"
        @close="close"
        @opened="opened"
        @open="open"
    >
        <slot></slot>
        <!-- 尾部 -->
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </d-dialog>
</template>

<script>
import {DDialog} from '@dinert/element-ui'
export default {
    name: 'AddDialog',
    props: {
        visible: {
            type: Boolean
        }
    },
    mixins: [],
    components: {
        DDialog
    },
    created() {},
    mounted() {},
    data() {
        return {}
    },
    computed: {},
    methods: {
        close() {
            this.$emit('close')
        },
        opened() {
            this.$emit('opened')
        },
        open() {
            this.$emit('open')
        }
    }
}
</script>

<style lang="scss" scoped>
.addDialog {
  &::v-deep {
    div.el-dialog__body {
      padding-bottom: 0;
      .el-textarea__inner {
        height: 120px;
      }
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>
