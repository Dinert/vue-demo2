<template>
  <el-table :data="data">
    <recuve-table-column
      v-for="column in tableColumn"
      :tableColumn="column"
      :key="column.prop"
    >
      <template slot-scope="scope">
        <slot v-bind="scope" :name="scope.prop"></slot>
      </template>
    </recuve-table-column>
  </el-table>
</template>

<script>
import RecuveTableColumn from "./recuve-table-column.vue";
export default {
  name: "ComplexTable",
  props: {
    tableColumn: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    RecuveTableColumn,
  },
};
</script>

<style lang="scss" scoped></style>
