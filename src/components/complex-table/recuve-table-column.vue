<template>
  <el-table-column v-bind="tableColumn">
    <template slot-scope="scope">
      <slot v-bind="scope" :data="tableColumn" :prop="tableColumn.prop">{{
        scope.row[tableColumn.prop]
      }}</slot>
    </template>
    <template v-if="tableColumn.children && tableColumn.children.length">
      <template v-for="item in tableColumn.children">
        <recuve-table-column :key="item.prop" :tableColumn="item">
          <template slot-scope="scope">
            <slot v-bind="scope"></slot>
          </template>
        </recuve-table-column>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "RecuveTableColumn",
  props: {
    tableColumn: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped></style>
